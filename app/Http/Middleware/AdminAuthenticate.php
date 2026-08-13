<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminAuthenticate
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (auth('web')->check()) {
            return redirect(route('home'));
        }
        if (auth('company')->check()) {
            return redirect(route('company.mypage.dashboard'));
        }
        if (!auth('admin')->check()) {
            return redirect(route('admin.login'));
        }
        return $next($request);
    }
}
