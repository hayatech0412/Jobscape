<?php

namespace App\Http\Controllers\User;

use App\Enums\PlanType;
use App\Enums\PaymentStatus;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\Inertia;
use App\Models\Payments;
use App\Models\PaymentMethod;
use App\Models\Plan;
use App\Models\Product;
use App\Services\GMO\Payment as GmoPayment;
use Illuminate\Support\Facades\Log;

class PaymentController extends Controller
{
    
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
            'payment_methods' => $user->paymentMethods,
            'status' => \App\Enums\PaymentStatus::toArrayCustom(),
        ]);
    }

    public function planChange(Request $request) : Response
    {
        $user = auth('web')->user();
        $type = $request->get('type') ?? \App\Enums\PlanType::MONTHLY;
        $plans = Plan::where('type', $type)->get();
        $topPlan = Plan::where('type', $type)
                        ->withCount('profiles')
                        ->orderByDesc('profiles_count')
                        ->first();

        return Inertia::render('User/Mypage/ChangePlan', [
            'planType' => \App\Enums\PlanType::toArrayCustom(),
            'plans' => $plans,
            'topPlan' => $topPlan,
            'currentType' => $type,
            'profile' => $user->profile,
            'plan' => $user->profile->plan,
        ]);
    }

    public function planChageStore(Request $request)
    {
        $user = auth('web')->user();
        $user->profile->update([
            'plan_id' => $request->plan_id,
        ]);

        // Change GMO Subscription
        $gmo = new GmoPayment([
            'SiteID' => config('services.gmo.site_id'),
            'SitePass' => config('services.gmo.site_password'),
            'ShopID' => config('services.gmo.shop_id'),
            'ShopPass' => config('services.gmo.shop_password'),
            'ShopMail' => config('services.gmo.shop_mail'),
            'Environment' => config('services.gmo.environment', 'test')
        ]);

        $gmo->changeSubscription($user->profile->subscription_id, $request->plan_id);

        return redirect()->route('payments.plan')->with('success', 'プラン変更が完了しました。');
    }

    public function subscriptionCallback(Request $request)
    {
        Log::info('GMO Subscription Callback', $request->all());

        // 決済結果の確認
        if ($request->Status === 'SUCCESS') {
            // 決済成功時の処理
            return redirect()->route('register.nickname')->with('success', '決済が完了しました。');
        } else {
            // 決済失敗時の処理
            return redirect()->route('register.payment.methods')->with('error', '決済に失敗しました。');
        }
    }
}
