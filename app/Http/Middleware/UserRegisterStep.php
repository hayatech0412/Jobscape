<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Enums\UserRegisterStep as Step;

class UserRegisterStep
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = auth('web')->user();
        if ($user->status == \App\Enums\UserStatus::INACTIVE) {
            if (!$user->profile || $user->profile->step == Step::PLAN) {
                return redirect()->route('register.plans');
            }
            
            if (!$user->profile || $user->profile->step == Step::PAYMENTMETHOD) {
                return redirect()->route('register.payment.methods');
            }
            
            if (!$user->profile || $user->profile->step == Step::NICKNAME) {
                return redirect()->route('register.nickname');
            }
            
            if (!$user->profile || $user->profile->step == Step::SMS) {
                return redirect()->route('register.phone.number');
            }
            
            if (!$user->profile || $user->profile->step == Step::SMSVERIFY) {
                return redirect()->route('register.phone.number.verify');
            }
            
            if (!$user->profile || $user->profile->step == Step::MAININFO) {
                return redirect()->route('register.maininfo');
            }

            if (!$user->profile || $user->profile->step == Step::AREA) {
                return redirect()->route('register.area');
            }

            if (!$user->profile || $user->profile->step == Step::CATEGORY) {
                return redirect()->route('register.category');
            }
        }

        return $next($request);
    }
}
