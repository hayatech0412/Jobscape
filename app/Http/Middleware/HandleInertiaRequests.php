<?php

namespace App\Http\Middleware;

use App\Enums\TransactionPeriod;
use Illuminate\Http\Request;
use Inertia\Middleware;
use App\Models\Category;

class HandleInertiaRequests extends Middleware
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
        $user = $request->user();
        if($user) $user->load(['profile.plan']);
        return [
            ...parent::share($request),
            'search_options' => [
                'categories' => Category::all(),
                'areas' => config('values.filter_areas'),
                'prefs' => config('values.area_categories'),
                'transaction_periods' => TransactionPeriod::getArray(),
            ],
            'auth' => [
                'user' => $user,
                'guard' => 'web'
            ],
            'notify' => [
                'unopen' => $user ? $user->unopenedNofications()->count() : null,
                'unread' => $user ? $user->unreadNotifications()->count() : null,
                'notifications' => $user ? $user->notifications()->limit(5)->get() : null,
            ],
            'flash' => [
                'success' => $request->session()->get('success'),
                'error' => $request->session()->get('error'),
                'bank_info' => $request->session()->get('bank_info'),
                'introduction_info' => $request->session()->get('introduction_info'),
                'amount_info' => $request->session()->get('amount_info'),
            ],
        ];
    }
}
