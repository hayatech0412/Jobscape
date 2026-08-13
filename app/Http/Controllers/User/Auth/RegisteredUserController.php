<?php

namespace App\Http\Controllers\User\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rules;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;
use Carbon\Carbon;
use App\Services\GMO\Payment as GmoPayment;
use App\Http\Requests\Auth\PaymentMethodRequest;
use App\Http\Requests\Auth\SmsVerifyRequest;
use App\Http\Requests\Auth\StoreUserRequest;
use App\Http\Requests\Auth\PhoneNumberRequest;
use App\Http\Requests\Auth\MainInfoRequest;
use App\Http\Requests\Auth\NicknameRequest;
use App\Enums\UserRegisterStep;
use App\Enums\PaymentStatus;
use App\Enums\PaymentType;
use App\Enums\UserStatus;
use App\Http\Requests\Auth\EmailVerifyRequest;
use App\Models\User;
use App\Models\Category;
use App\Models\PaymentMethod;
use App\Models\Plan;
use App\Models\Payment;
use App\Models\Profile;
use App\Services\CPaaSNowService;
use App\Models\Subscription;


class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('User/Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(StoreUserRequest $request): RedirectResponse
    {
        $email = $request->email;

        $token = strtoupper(Str::random(6));

        $user = User::create([
            'email' => $email,
            'password' => Hash::make($request->password),
            'verify_token' => $token,
            'verify_token_expire_at' => Carbon::now()->addMinutes(10),
        ]);

        Profile::firstOrCreate([
            'user_id' => $user->id,
            'vite_code' => $request->vite_code
        ]);

        // event(new Registered($user));

        $data = [
            'url_verify' => route('register.email', [$user->id]),
            'verify_token' => $token,
        ];

        $this->notificationService->sendEmail($email, 'user.verify', $data);

        return redirect(route('register.email', [$user->id]))->with(['success' => '認証コードを送信しました!']);
    }

    /**
     * Display the registration view.
     */
    public function email($user_id): Response
    {
        return Inertia::render('User/Auth/EmailVerify', [
            'user_id' => $user_id,
        ]);
    }

    public function resend(Request $request): RedirectResponse
    {
        $user = User::find($request->user_id);

        $token = strtoupper(Str::random(6));

        $user->update([
            'verify_token' => $token,
            'verify_token_expire_at' => Carbon::now()->addMinutes(10),
        ]);
        $data = [
            'url_verify' => route('register.email', [$user->id]),
            'verify_token' => $token,
        ];

        $this->notificationService->sendEmail($user->email, 'user.verify', $data);

        return redirect(route('register.email', [$user->id]))->with(['success' => '認証コードを再送しました!']);
    }

    public function emailVerify(EmailVerifyRequest $request) {
        $user = User::find($request->user_id);
        $token = $request->verify_token;

        if (!$user) {
            return back()->with('error', __('メール認証が失敗しました。'));
        }

        if ($user->verify_token != $token) {
            return back()->with('error', __('メール認証が失敗しました。'));
        }

        if ($user->verify_token_expire_at < now()) {
            // $user->delete();
            return back()->with('error', __('メール認証が失敗しました。'));
        }

        $user->update(['email_verified_at' => now()]);
        auth('web')->login($user);

        return redirect(route('register.plans'))->with(['success' => 'メール認証が成功しました!']);;
    }

    public function redirectByStep($step)
    {
        switch ($step) {
            case UserRegisterStep::PLAN:
                return redirect()->route('register.plans');
            case UserRegisterStep::PAYMENTMETHOD:
                return redirect()->route('register.payment.methods');
            case UserRegisterStep::NICKNAME:
                return redirect()->route('register.nickname');
            case UserRegisterStep::SMS:
                return redirect()->route('register.phone.number');
            case UserRegisterStep::SMSVERIFY:
                return redirect()->route('register.phone.number.verify');
            case UserRegisterStep::MAININFO:
                return redirect()->route('register.maininfo');
            case UserRegisterStep::AREA:
                return redirect()->route('register.area');
            case UserRegisterStep::CATEGORY:
                return redirect()->route('register.category');
            default:
                return redirect()->route('register.plans');
        }
    }

    public function checkStep($profile, $step)
    {
        if (!$profile || $profile->step < $step) {
            return false;
        }

        return true;
    }

    public function selectPlan(Request $request) {
        $type = $request->get('type') ?? \App\Enums\PlanType::MONTHLY;
        $plans = Plan::where('type', $type)->get();
        $topPlan = Plan::where('type', $type)
                        ->withCount('profiles')
                        ->orderByDesc('profiles_count')
                        ->first();

        return Inertia::render('User/Auth/RegisterPlans', [
            'isMonitor' => auth('web')->user()->profile?->is_monitor,
            'plans' => $plans,
            'topPlan' => $topPlan,
            'planType' => \App\Enums\PlanType::toArrayCustom(),
            'currentType' => $type
        ]);
    }

    public function registerPlan(Request $request) {
        $is_trial = $request->is_trial;
        try {
            DB::beginTransaction();

            $profile = Profile::firstOrCreate([
                'user_id' => auth('web')->user()->id,
            ]);

            $profile->update([
                'plan_id' => $request->plan_id,
            ]);

            if ($is_trial && $is_trial == 1) {
                $profile->update([
                    'is_trial' => $is_trial,
                    'trial_end_at' => now()->addDays(10),
                ]);
            } else {
                $profile->update([
                    'is_trial' => 0,
                    'trial_end_at' => null,
                ]);
            }

            if ($profile->step == UserRegisterStep::PLAN) {
                $profile->update(['step' => UserRegisterStep::PAYMENTMETHOD]);
            }

            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
            \Log::error($e->getMessage());

            return back()->with('error', __('message.front.matching.request.accept.error'));
        }

        return $this->redirectByStep(UserRegisterStep::PAYMENTMETHOD);
    }

    public function paymentMethods() {
        $profile = auth('web')->user()->profile;
        $checked = $this->checkStep($profile, UserRegisterStep::PAYMENTMETHOD);
        if ($checked) {
            return Inertia::render('User/Auth/PaymentMethods', [
                'PaymentType' => \App\Enums\PaymentType::getArray(),
                'Profile' => $profile,
                'Plan' => $profile->plan,
                'gmoShopId' => config('services.gmo.shop_id'),
            ]);
        } else {
            $this->redirectByStep($profile->step);
        }
    }

    public function registerPaymentMethods(PaymentMethodRequest $request) {
        $params = $request->validated();
        $token = $params['token'] ?? null;

        if (!$token) {
            return back()->with('error', __('決済トークンの取得に失敗しました。'));
        }

        try {
            DB::beginTransaction();

            $user = auth('web')->user();
            $profile = $user->profile;
            $plan = $profile->plan;

            // GMO Payment Gateway subscription process
            $gmoPayment = new GmoPayment([
                'SiteID' => config('services.gmo.site_id'),
                'SitePass' => config('services.gmo.site_password'),
                'ShopID' => config('services.gmo.shop_id'),
                'ShopPass' => config('services.gmo.shop_password'),
                'ShopMail' => config('services.gmo.shop_mail'),
                'Environment' => config('services.gmo.environment', 'test')
            ]);

            $customerId = 'Jobscape_USER_' . $user->id;

            // 会員の存在確認
            $memberResponse = $gmoPayment->searchMember([
                'MemberID' => $customerId
            ]);

            if ($memberResponse->isError()) {
                // 会員が存在しない場合は新規作成
                $customerResponse = $gmoPayment->createCustomer([
                    'MemberID' => $customerId,
                    'MemberName' => $user->email,
                    'Token' => $token
                ]);
            } else {
                // 会員が存在する場合は既存カードを削除
                $cardsResponse = $gmoPayment->searchCard([
                    'MemberID' => $customerId,
                    'SeqMode' => '0'
                ]);

                if (!$cardsResponse->isError()) {
                    $cardData = $cardsResponse->getData();
                    $cardSeqs = explode('|', $cardData['CardSeq']);
                    $deleteFlags = explode('|', $cardData['DeleteFlag']);

                    foreach ($cardSeqs as $index => $cardSeq) {
                        if ($deleteFlags[$index] === '0') {  // 削除フラグが0の場合のみ削除
                            $gmoPayment->deleteCard([
                                'MemberID' => $customerId,
                                'CardSeq' => $cardSeq,
                                'SeqMode' => '0'
                            ]);
                        }
                    }
                }

                // 新しいカードを登録（会員が存在する場合）
                $customerResponse = $gmoPayment->updateCard([
                    'MemberID' => $customerId,
                    'Token' => $token,
                    'SeqMode' => '0',
                    // 'CardSeq' => 0,
                    'DefaultFlag' => '1'
                ]);
            }
            
            if ($customerResponse->isError()) {
                throw new \Exception($customerResponse->getMessage(). "createCustomer");
            }

            $paymentMethod = PaymentMethod::firstOrCreate(['user_id' => $user->id]);
            $expireDate = explode('|', $customerResponse->Expire)[0]; // Get first date from the list
            $paymentMethod->update([
                'customer_id' => $customerId,
                'card_number' => $customerResponse->CardNo,
                'card_seq' => 0,
                'default_flag' => 1,
                'limit_at' => Carbon::createFromFormat('ym', $expireDate)->endOfMonth()->format('Y-m-d'),
            ]);

            $orderId = $user->id . '-' . $paymentMethod->id . '-' . (string)now()->timestamp;

            // 決済実行
            $tranResponse = $gmoPayment->execTran([
                'user' => $user,
                'CustomerID' => $customerId,
                'OrderID' => $orderId,
                'Amount' => $plan->amount,
                'Tax' => floor($plan->amount * 0.1), // 10% tax
            ]);

            if ($tranResponse->isError()) {
                throw new \Exception($tranResponse->getMessage(). "execTran");
            }

            $payment_limit_at = $plan->type === 'yearly' ? now()->addYear() : now()->addMonth(); 
            
            $firstPayment = Payment::create([
                'user_id' => $user->id,
                'plan_id' => $plan->id,
                'subscription_id' => null,
                'payment_method_id' => $paymentMethod->id,
                'access_id' => $tranResponse->AccessID,
                'access_pass' => $tranResponse->AccessPass,
                'order_id' => $orderId,
                'amount' => $plan->amount,
                'tax' => floor($plan->amount * 0.1),
                'description' => 'JOBSCAPE スタンダードプラン（' . Carbon::now()->format('Y/m/d') . '～' . Carbon::parse($payment_limit_at)->format('Y/m/d' ) . '）',
                'status' => PaymentStatus::COMPLETE,
                'type' => PaymentType::FIRST,
                'limit_at' => $payment_limit_at,
                'paid_at' => now(),
            ]);
            
            // Create subscription
            $subscriptionResponse = $gmoPayment->createSubscription([
                'CustomerID' => $customerId,
                'Amount' => $plan->amount,
                'Tax' => floor($plan->amount * 0.1),
                'ChargeDay' => Carbon::now()->day,
                'RecurringID' => $orderId,
            ]);

            if ($subscriptionResponse->isError()) {
                throw new \Exception($subscriptionResponse->getMessage(). "createSubscription");
            }

            // Create subscription record
            $subscription = Subscription::create([
                'user_id' => $user->id,
                'plan_id' => $plan->id,
                'plan_type' => $plan->type,
                'gmo_access_id' => $subscriptionResponse->AccessID,
                'gmo_access_pass' => $subscriptionResponse->AccessPass,
                'gmo_order_id' => $orderId,
                'amount' => $plan->amount,
                'tax' => floor($plan->amount * 0.1), // 10% tax
                'status' => 'active',
                'subscribed_at' => now(),
                'expired_at' => $plan->type === 'yearly' ? now()->addYear() : now()->addMonth()
            ]);
            $firstPayment->subscription_id = $subscription->id;
            $firstPayment->save();

            if ($profile->step == UserRegisterStep::PAYMENTMETHOD) {
                $profile->update(['step' => UserRegisterStep::NICKNAME]);
            }

            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
            \Log::error($e->getMessage());

            return back()->with('error', __('決済処理に失敗しました。') . $e->getMessage());
        }

        return $this->redirectByStep(UserRegisterStep::NICKNAME);
    }

    public function nickname() {
        $profile = auth('web')->user()->profile;
        $checked = $this->checkStep($profile, UserRegisterStep::NICKNAME);

        if ($checked) {
            return Inertia::render('User/Auth/Nickname', [
                'profile' => $profile,
            ]);
        } else {
            $this->redirectByStep($profile->step);
        }
    }

    public function nicknameStore(NicknameRequest $request) {
        $nickname = $request->nickname;
        $profile = auth('web')->user()->profile;

        try {
            DB::beginTransaction();

            $profile->update(['nickname' => $nickname]);

            if ($profile->step == UserRegisterStep::NICKNAME) {
                $profile->update(['step' => UserRegisterStep::SMS]);
            }

            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
            \Log::error($e->getMessage());

            return back()->with('error', __('登録が失敗しました。'));
        }

        return $this->redirectByStep(UserRegisterStep::SMS);
    }

    public function phoneNumber() {
        $profile = auth('web')->user()->profile;
        $checked = $this->checkStep($profile, UserRegisterStep::SMS);

        if ($checked) {
            return Inertia::render('User/Auth/PhoneNumber', [
                'Profile' => $profile
            ]);
        } else {
            $this->redirectByStep($profile->step);
        }
    }

    public function phoneNumberSend(PhoneNumberRequest $request) {
        $phone_number = $request->validated()['phone_number'];
        $profile = auth('web')->user()->profile;
        $sms_verify_code = strtoupper(Str::random(6));

        try {
            DB::beginTransaction();

            $profile->update([
                'phone_number' => $phone_number,
                'sms_verify_code' => $sms_verify_code,
                'sms_verify_code_expire_at' => now()->addMinutes(10)
            ]);

            // Send SMS using CPaaSNow
            $smsService = app(\App\Services\SMS\CPaaSNowService::class);
            $smsService->sendVerificationCode($phone_number, $sms_verify_code);

            if ($profile->step == UserRegisterStep::SMS) {
                $profile->update(['step' => UserRegisterStep::SMSVERIFY]);
            }

            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
            \Log::error('SMS verification failed: ' . $e->getMessage(), [
                'phone' => $phone_number,
                'user_id' => auth('web')->id()
            ]);

            return back()->with('error', __('SMS送信に失敗しました。'));
        }

        return $this->redirectByStep(UserRegisterStep::SMSVERIFY)
            ->with('success', __('認証コードを送信しました。'));
    }

    public function phoneNumberVerify() {
        $profile = auth('web')->user()->profile;
        $checked = $this->checkStep($profile, UserRegisterStep::SMSVERIFY);

        if ($checked) {
            return Inertia::render('User/Auth/PhoneNumberVerify', [
                'profile' => $profile
            ]);
        } else {
            $this->redirectByStep($profile->step);
        }
    }

    public function verify(SmsVerifyRequest $request) {
        $sms_verify_code = $request->validated()['sms_verify_code'];
        $profile = auth('web')->user()->profile;

        if ($profile->sms_verify_code != $sms_verify_code) {
            return back()->with('error', __('認証コードが一致しません。'));
        }

        if ($profile->sms_verify_code_expire_at < now()) {
            return back()->with('error', __('認証コードの有効期限が切れています。'));
        }

        try {
            DB::beginTransaction();

            $profile->update([
                'sms_verified_at' => now(),
                'sms_verify_code' => null,
                'sms_verify_code_expire_at' => null
            ]);

            if ($profile->step == UserRegisterStep::SMSVERIFY) {
                $profile->update(['step' => UserRegisterStep::MAININFO]);
            }

            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
            \Log::error('SMS verification failed: ' . $e->getMessage(), [
                'user_id' => auth('web')->id()
            ]);

            return back()->with('error', __('認証に失敗しました。'));
        }
        return $this->redirectByStep(UserRegisterStep::MAININFO);
    }

    public function maininfo() {
        $profile = auth('web')->user()->profile;
        $checked = $this->checkStep($profile, UserRegisterStep::MAININFO);
        $prefectures = config('values.prefectures');

        if ($checked) {
            return Inertia::render('User/Auth/MainInfo', [
                'Genders' => \App\Enums\Gender::getArray(),
                'Profile' => $profile,
                'UserType' => \App\Enums\UserType::getArray(),
                'CorporateTypes' => \App\Enums\CoporateType::getArray(),
                'prefs' => $prefectures,
            ]);
        } else {
            $this->redirectByStep($profile->step);
        }
    }

    public function registerAfter(Request $request) {
        $profile = auth('web')->user()->profile;
        try {
            DB::beginTransaction();

            $profile->update(['user_type' => $request->user_type]);

            if ($profile->step == UserRegisterStep::MAININFO) {
                $profile->update(['step' => UserRegisterStep::AREA]);
            }

            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
            \Log::error($e->getMessage());

            return back()->with('error', __('登録が失敗しました。'));
        }
        return $this->redirectByStep(UserRegisterStep::AREA);
    }

    public function maininfoStore(MainInfoRequest $request) {
        $profile = auth('web')->user()->profile;
        $params = $request->all();
        try {
            DB::beginTransaction();

            $profile->update($params);

            if ($profile->step == UserRegisterStep::MAININFO) {
                $profile->update(['step' => UserRegisterStep::AREA]);
            }

            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
            \Log::error($e->getMessage());

            return back()->with('error', __('登録が失敗しました。'));
        }
        return $this->redirectByStep(UserRegisterStep::AREA);
    }

    public function area() {
        $profile = auth('web')->user()->profile;
        $checked = $this->checkStep($profile, UserRegisterStep::AREA);
        $area_categories = config('values.area_categories');

        if ($checked) {
            return Inertia::render('User/Auth/Area', [
                'AreaCategories' => $area_categories,
                'Profile' => $profile,
            ]);
        } else {
            $this->redirectByStep($profile->step);
        }
    }

    public function areaStore(Request $request) {
        $profile = auth('web')->user()->profile;
        try {
            DB::beginTransaction();
            $profile->update([
                'prefectures' => $request->prefectures,
            ]);

            if ($profile->step == UserRegisterStep::AREA) {
                $profile->update(['step' => UserRegisterStep::CATEGORY]);
            }

            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
            \Log::error($e->getMessage());

            return back()->with('error', __('登録が失敗しました。'));
        }
        return $this->redirectByStep(UserRegisterStep::CATEGORY);
    }

    public function category() {
        $profile = auth('web')->user()->profile;
        $checked = $this->checkStep($profile, UserRegisterStep::CATEGORY);
        $categories = Category::get();

        if ($checked) {
            return Inertia::render('User/Auth/Category', [
                'Categories' => $categories,
                'CategoryIds' => $profile->categories->pluck('id')->toArray()
            ]);
        } else {
            $this->redirectByStep($profile->step);
        }
    }

    public function categoryStore(Request $request) {
        $user = auth('web')->user();
        $profile = $user->profile;
        $caregoryIds = json_decode($request->category_ids);
        try {
            DB::beginTransaction();

            $profile->categories()->detach();
            foreach ($caregoryIds as $categoryId) {
                $profile->categories()->attach($categoryId);
            }

            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
            \Log::error($e->getMessage());

            return back()->with('error', __('登録が失敗しました。'));
        }
        if ($user->status == UserStatus::INACTIVE) {
            $user->update(['status' => UserStatus::ACTIVE]);
            // return redirect(route('mypage'))->with('success', __('登録が完了しました。'));
        }
        return redirect(route('register.complete'));
    }

    public function complete(Request $request) {
        return Inertia::render('User/Auth/Complete');
    }
}
