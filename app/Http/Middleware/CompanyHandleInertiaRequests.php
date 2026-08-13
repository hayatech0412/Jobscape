<?php

namespace App\Http\Middleware;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Middleware;

class CompanyHandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        if (auth('company')->check()) {
            $user = User::find(auth('company')->user()->id);

            if ($user->has('company')) $user->load('company');
        } else {
            $user = null;
        }

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $user,
                'guard' => 'company'
            ],
            'notify' => [
                'unopen' => $user ? $user->unopenedNofications()->count() : null,
                'unread' => $user ? $user->unreadNotifications()->count() : null,
                'notifications' => $user ? $user->notifications()->limit(5)->get() : null,
            ],
            'flash' => [
                'success' => $request->session()->get('success'),
                'error' => $request->session()->get('error'),
            ],
        ];
    }
}
