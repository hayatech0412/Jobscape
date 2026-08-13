<?php

namespace App\Http\Controllers\User\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('User/Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $params = $request->only(['password', 'email']);
        $params['role'] = \App\Enums\Role::USER;

        if (!auth('web')->attempt($params, $request->boolean('remember'))) {
            return back()->withErrors([
                'email' => 'メールアドレスまたはパスワードが違います。',
            ]);
        }

        $user = auth('web')->user();
        if ($user->status == \App\Enums\UserStatus::QUIT) {
            auth('web')->logout();
            return back()->withErrors([
                'email' => '認証されていないユーザーもしくは退会されたユーザーです。',
            ]);
        }

        return redirect()->route('home')->with('success', 'ログインしました。');
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }

    protected function failedLoginResponse(Request $request, string $message)
    {
        if ($request->expectsJson()) {
            return response()->json(['message' => $message], 401);
        }

        return redirect()->route('login')->with('error', $message);
    }
}
