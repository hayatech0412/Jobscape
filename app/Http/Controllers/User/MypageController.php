<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;
use DB;
use Carbon\Carbon;
use App\Models\Product;
use App\Models\Notice;
use App\Models\Opinion;
use App\Models\Contact;
use App\Models\Transaction;
use App\Enums\PlanType;
use App\Enums\UserStatus;
use App\Http\Requests\AccountInfoRequest;
use App\Http\Requests\BusinessInfoStoreRequest;
use App\Http\Requests\ContactRequest;
use App\Http\Requests\EmailStoreRequest;
use App\Http\Requests\PasswordStoreRequest;
use App\Http\Requests\PersonalInfoStoreRequest;
use App\Http\Requests\PhoneNumberStoreRequest;
use App\Http\Requests\OpinionRequest;
use App\Models\Category;

class MypageController extends Controller
{
    /**
     * Display the user's mypage.
     */
    public function index(Request $request): Response
    {
        $user = auth('web')->user();
        $visited_prodcuts = $user->visitedProducts()->with('company')->with('categories')->paginate(10);
        $notices = Notice::orderBy('created_at', 'desc')->paginate(5);
        return Inertia::render('User/Mypage/Index', [
            'visited_prodcuts' => $visited_prodcuts,
            'notices' => $notices,
            'profile' => $user->profile,
            'plan' => $user->profile->plan,
            'now' => Carbon::now(),
        ]);
    }

    public function accountInfo(Request $request): Response
    {
        $user = auth('web')->user();

        return Inertia::render('User/Mypage/AccountInfo', [
            'profile' => $user->profile,
            'categories' => Category::get(),
            'category_ids' => $user->profile?->categories->pluck('id')->toArray() ?? [],
            'area_categories' => config('values.area_categories'),
        ]);
    }

    public function accountInfoStore(AccountInfoRequest $request): RedirectResponse
    {
        $user = auth('web')->user();
        $params = $request->all();

        try {
            DB::beginTransaction();            

            $user->profile->update($params);
            
            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
            \Log::error($e->getMessage());

            return back()->with('error', __('操作が失敗しました。'));
        }      

        return back()->with('success', __('アカウント情報を保存しました。'));
    }

    public function emailStore(EmailStoreRequest $request): RedirectResponse
    {
        $user = auth('web')->user();
        $email = $request->email;
        try {
            DB::beginTransaction();            

            $user->update(['email' => $email]);
            
            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
            \Log::error($e->getMessage());

            return back()->with('error', __('操作が失敗しました。'));
        }      

        return back()->with('success', __('メールアドレスを保存しました。'));
    }

    public function passwordStore(PasswordStoreRequest $request): RedirectResponse
    {
        $user = auth('web')->user();
        $password = $request->password ?? 'password';
        try {
            DB::beginTransaction();            

            $user->update(['password' => Hash::make($password)]);
            
            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
            \Log::error($e->getMessage());

            return back()->with('error', __('操作が失敗しました。'));
        }      

        return back()->with('success', __('パスワードを保存しました。'));
    }

    public function phoneNumberStore(PhoneNumberStoreRequest $request): RedirectResponse
    {
        $user = auth('web')->user();
        $phone_number = $request->phone_number;
        try {
            DB::beginTransaction();            

            $user->profile->update(['phone_number' => $phone_number]);
            
            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
            \Log::error($e->getMessage());

            return back()->with('error', __('操作が失敗しました。'));
        }      

        return back()->with('success', __('電話番号を保存しました。'));
    }

    public function categoryStore(Request $request): RedirectResponse
    {
        $profile = auth('web')->user()->profile;
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

            return back()->with('error', __('操作が失敗しました。'));
        }      

        return back()->with('success', __('関心のあるカテゴリを保存しました。'));
    }

    public function areaStore(Request $request) {
        $profile = auth('web')->user()->profile;
        try {
            DB::beginTransaction();
            $profile->update([
                'prefectures' => $request->prefectures,
            ]);
            
            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
            \Log::error($e->getMessage());

            return back()->with('error', __('登録が失敗しました。'));
        }
        return back()->with('success', __('希望する商材の地域を保存しました。'));
    }

    public function updateImage(Request $request)
    {
        $request->validate(
            [
                'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            ],
            [
                'image.required' => '画像は必須です。',
                'image.image' => 'アップロードされたファイルは画像形式でなければなりません。',
                'image.mimes' => '画像は jpeg, png, jpg, gif のいずれかの形式である必要があります。',
                'image.max' => '画像のサイズは 2MB 以下でなければなりません。',
            ]
        );

        $user = auth('web')->user();

        if ($user->avatar) {
            Storage::disk('public')->delete($user->avatar);
        }

        // 新しい画像を保存
        $path = $request->file('image')->store('user/avatar', 'public');

        // ユーザー情報を更新
        $user->update(['avatar' => $path]);

        return redirect()->back()->with('success', 'プロフィール画像が更新されました。');
    }

    public function businessInfo(Request $request): Response
    {
        $user = auth('web')->user();
        $prefectures = config('values.prefectures');
        return Inertia::render('User/Mypage/BusinessInfo', [
            'profile' => $user->profile,
            'prefs' => $prefectures,
            'Genders' => \App\Enums\Gender::getArray(),
        ]);
    }

    public function personalInfoStore(PersonalInfoStoreRequest $request) {
        $profile = auth('web')->user()->profile;
        $params = $request->all();
        try {
            DB::beginTransaction();
            $profile->update($params);
            
            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
            \Log::error($e->getMessage());

            return back()->with('error', __('登録が失敗しました。'));
        }
        return back()->with('success', __('本人情報を保存しました。'));
    }

    public function businessInfoStore(BusinessInfoStoreRequest $request) {
        $profile = auth('web')->user()->profile;
        $params = $request->all();
        try {
            DB::beginTransaction();
            $profile->update($params);
            
            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
            \Log::error($e->getMessage());

            return back()->with('error', __('登録が失敗しました。'));
        }
        return back()->with('success', __('事業者情報を保存しました。'));
    }

    public function active(): RedirectResponse
    {
        $user = auth('web')->user();
        if (!in_array($user->status, [UserStatus::ACTIVE, UserStatus::REST])) {
            return back()->with('error', __('操作が失敗しました。'));
        }

        try {
            DB::beginTransaction();            

            if ($user->status == UserStatus::REST) {
                $user->update(['status' => UserStatus::ACTIVE]);
            } else {
                $user->update(['status' => UserStatus::REST]);
            }

            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
            \Log::error($e->getMessage());

            return back()->with('error', __('操作が失敗しました。'));
        }      

        return back()->with('success', __('操作が成功しました。'));
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }

    public function plan() : Response
    {
        $user = auth('web')->user();
        return Inertia::render('User/Mypage/Plan', [
            'plan' => $user->profile->plan,
            'profile' => $user->profile,
            'plans' => PlanType::getArray(),
        ]);
    }

    public function paymentMethods() : Response
    {
        $user = auth('web')->user();

        return Inertia::render('User/Mypage/PaymentMethods', [
            'payments' => $user->payments,
            'status' => \App\Enums\PaymentStatus::toArrayCustom(),
        ]);
    }


    public function privacy() : Response
    {
        // dd('adfasd');
        return Inertia::render('User/Mypage/Privacy', [
            
        ]);
    }


    public function contact() : Response
    {
        $user = auth('web')->user();

        return Inertia::render('User/Mypage/Contact', [
            
        ]);
    }

    public function contactStore(ContactRequest $request): RedirectResponse
    {
        $user = auth('web')->user();
        $params = $request->validated();
        try {
            DB::beginTransaction();            

            Contact::create(array_merge($params, ['email' => $user->email]));

            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
            \Log::error($e->getMessage());

            return back()->with('error', __('操作が失敗しました。'));
        }      

        return back()->with('success', __('お問い合わせ内容を送信しました。'));
    }


    public function help() : Response
    {
        $user = auth('web')->user();

        return Inertia::render('User/Mypage/Help', [
            
        ]);
    }

    public function opinion() : Response 
    {
        $user = auth('web')->user();

        return Inertia::render('User/Mypage/Opinion', [
            'use_types' => \App\Enums\UseType::getArray(),
        ]);
    }

    public function opinionStore(OpinionRequest $request): RedirectResponse
    {
        $user = auth('web')->user();
        $params = $request->validated();
        try {
            DB::beginTransaction();            

            Opinion::create(array_merge($params, ['user_id' => $user->id]));

            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
            \Log::error($e->getMessage());

            return back()->with('error', __('操作が失敗しました。'));
        }      

        return back()->with('success', __('ご意見内容を送信しました。'));
    }
}
