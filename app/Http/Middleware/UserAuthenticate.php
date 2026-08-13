<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class UserAuthenticate
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (auth('admin')->check()) {
            return redirect(route('admin.dashboard'));
        }
        if (auth('company')->check()) {
            return redirect(route('company.mypage.dashboard'));
        }
        if (!auth('web')->check()) {
            return redirect(route('login'));
        }
        // if (!auth('web')->user()->email_verified_at) {
        //     return redirect(route('verification.notice'));
        // }

        return $next($request);
    }
}
