<?php

namespace App\Http\Controllers\Admin\Auth;

use App\Enums\CompanyRegistStep;
use App\Enums\Role;
use App\Enums\UserStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LoginController extends Controller
{
    public function __construct()
    {
        $this->middleware('admin_guest')->except('logout');
    }

    public function showLoginForm()
    {
        return Inertia::render('Admin/Auth/Login');
    }

    public function login(LoginRequest $request)
    {
        $credintials = $request->only('email', 'password');
        $credintials['role'] = Role::ADMIN;

        if (auth('admin')->attempt($credintials)) {
            $userId = auth('admin')->user()->id;
            $user = User::find($userId);

            return redirect()->route('admin.dashboard');
        }

        return back()->withErrors([
            'email' => 'メールアドレスまたはパスワードが違います。',
        ]);
    }

    // Logout
    public function logout()
    {
        auth('admin')->logout();
        return redirect()->route('admin.login');
    }
}
