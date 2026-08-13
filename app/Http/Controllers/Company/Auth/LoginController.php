<?php

namespace App\Http\Controllers\Company\Auth;

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
        $this->middleware('guest')->except('logout');
    }

    public function showLoginForm()
    {
        return Inertia::render('Company/Login/Login');
    }

    public function login(LoginRequest $request)
    {
        $credintials = $request->only('email', 'password');
        $credintials['role'] = Role::COMPANY;

        if (auth('company')->attempt($credintials)) {
            $userId = auth('company')->user()->id;
            $user = User::find($userId);
            if (is_null($user->company) || $user->company->regist_step < CompanyRegistStep::STEP_WORKSINFO) {
                return redirect()->route('company.register.coporate_code.show');
            }

            return redirect()->route('company.mypage.dashboard');
        }

        return back()->withErrors([
            'email' => 'メールアドレスまたはパスワードが違います。',
        ]);
    }

    // Logout
    public function logout()
    {
        auth('company')->logout();
        return redirect()->route('company.login');
    }
}
