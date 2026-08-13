<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class AdminHandleInertiaRequests extends Middleware
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
        $user = auth('admin')->user();

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $user,
                'guard' => 'admin'
            ],
            'notify' => [
                'unopen' => $user ? $user->unopenedNofications()->count() : null,
                'unread' => $user ? $user->unreadNotifications()->count() : null,
                'notifications' => $user ? $user->notifications()->limit(5)->get() : [],
            ],
            'flash' => [
                'success' => $request->session()->get('success'),
                'error' => $request->session()->get('error'),
            ],
        ];
    }
}
