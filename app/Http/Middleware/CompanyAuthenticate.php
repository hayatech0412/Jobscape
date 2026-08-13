<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class CompanyAuthenticate
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (auth('admin')->check()) {
            return redirect(route('admin.dashboard'));
        }
        if (auth('web')->check()) {
            return redirect(route('home'));
        }
        if (!auth('company')->check()) {
            return redirect(route('company.login'));
        }

        return $next($request);
    }
}
