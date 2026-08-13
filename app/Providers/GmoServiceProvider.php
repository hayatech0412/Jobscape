<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Services\GMO\Payment as GmoPayment;

class GmoServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        $this->app->singleton(GmoPayment::class, function ($app) {
            return new GmoPayment([
                'SiteID' => config('services.gmo.site_id'),
                'SitePass' => config('services.gmo.site_password'),
                'ShopID' => config('services.gmo.shop_id'),
                'ShopPass' => config('services.gmo.shop_password'),
                'Environment' => config('services.gmo.environment', 'test')
            ]);
        });
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
} 