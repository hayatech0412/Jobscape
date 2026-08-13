<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote')->hourly();

Schedule::command('app:calculate-withholding-tax')->monthlyOn(1, '03:00');
Schedule::command('app:pay-withholding-tax')->monthlyOn(10, '00:00');
