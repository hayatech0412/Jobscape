<?php

namespace App\Http\Controllers\Company;

use Illuminate\Support\Facades\Route;
use PHPUnit\TextUI\Help;

Route::middleware([\App\Http\Middleware\CompanyGuestMiddleware::class])->group(function () {
    Route::get('/login', [Auth\LoginController::class, 'showLoginForm'])->name('login');
    Route::post('/login', [Auth\LoginController::class, 'login']);

    Route::get('/register', [RegisterController::class, 'index'])->name('register.index');
    Route::post('/register', [RegisterController::class, 'store'])->name('register.store');
    Route::post('/register/regenerate_code', [RegisterController::class, 'regenerateToken'])->name('register.regenerate_code');
    Route::get('/register/code_verify', [RegisterController::class, 'showVerifyForm'])->name('register.code_verify.show');
    Route::post('/register/code_verify', [RegisterController::class, 'verifyCode'])->name('register.code_verify');
});

Route::middleware('company_auth')->group(function () {
    Route::get('/', function() {
        return redirect(route('company.mypage.dashboard'));
    })->name('company.home');

    Route::group(['prefix' => 'register', 'as' => 'register.'], function() {
        Route::get('/coporate_code', [RegisterController::class, 'showCoporateCodeForm'])->name('coporate_code.show');
        Route::post('/coporate_code', [RegisterController::class, 'storeCoporate'])->name('coporate_code');
        Route::get('/company', [RegisterController::class, 'showCompanyForm'])->name('company.show');
        Route::post('/company', [RegisterController::class, 'storeCompany'])->name('company');
        Route::get('/office', [RegisterController::class, 'showOfficeForm'])->name('office.show');
        Route::post('/office', [RegisterController::class, 'storeOffice'])->name('office');
        Route::get('/office/info', [RegisterController::class, 'showOfficeInfoForm'])->name('office.info.show');
        Route::post('/office/info', [RegisterController::class, 'storeOfficeInfo'])->name('office.info');
        Route::get('/complete', [RegisterController::class, 'showComplete'])->name('complete');
    });

    Route::post('/logout', [Auth\LoginController::class, 'logout'])->name('logout');

    Route::group(['prefix' => 'orders', 'as' => 'orders.'], function () {
        Route::get('/', [OrderController::class, 'index'])->name('index');
        Route::get('/{id}', [OrderController::class, 'show'])->name('show');
        Route::get('/edit', [OrderController::class, 'edit'])->name('edit');
        Route::post('/update', [OrderController::class, 'update'])->name('update');
        Route::post('/response/{id}', [OrderController::class, 'response'])->name('response');
        Route::post('/success/{id}', [OrderController::class, 'success'])->name('success');
        Route::post('/fail/{id}', [OrderController::class, 'fail'])->name('fail');
        Route::post('/report_payed/{id}', [OrderController::class, 'reportPayed'])->name('report_payed');
        Route::post('/propose_update/{id}', [OrderController::class, 'proposeUpdate'])->name('propose_update');
    });

    Route::group(['prefix' => 'mypage', 'as' => 'mypage.'], function () {
        Route::get('/', [MypageController::class, 'index'])->name('dashboard');
    });

    Route::group(['prefix' => 'settings', 'as' => 'settings.'], function () {
        Route::get('/account', [SettingController::class, 'index'])->name('account');
        Route::post('/update/account', [SettingController::class, 'updateAccount'])->name('update.account');
        Route::post('/delete/account', [SettingController::class, 'deleteAccount'])->name('delete.account');
        Route::get('/profile', [SettingController::class, 'profile'])->name('profile');
        Route::get('/office', [SettingController::class, 'office'])->name('office');
        Route::post('/update/office', [SettingController::class, 'updateOffice'])->name('update.office');
    });

    Route::group(['prefix' => 'products', 'as' => 'products.'], function () {
        Route::get('/', [ProductController::class, 'index'])->name('index');
        Route::get('/search', [ProductController::class, 'index'])->name('search');
        Route::get('/search/keyword', [ProductController::class, 'searchKeyword'])->name('search.keyword');
        Route::get('/create', [ProductController::class, 'create'])->name('create');
        Route::post('/store', [ProductController::class, 'store'])->name('store');
        Route::post('/draft', [ProductController::class, 'storeDraft'])->name('draft');
        Route::get('/{product}', [ProductController::class, 'show'])->name('show');
        Route::post('/{product}/publish', [ProductController::class, 'publish'])->name('publish');
        Route::get('/{product}/edit', [ProductController::class, 'edit'])->name('edit');
        Route::post('/{product}/update', [ProductController::class, 'update'])->name('update');
        Route::post('/{product}/update_draft', [ProductController::class, 'updateDraft'])->name('update_draft');
        Route::post('/{product}/delete', [ProductController::class, 'delete'])->name('delete');
    });

    Route::group(['prefix' => 'users', 'as' => 'users.'], function () {
        Route::get('/', [UserController::class, 'index'])->name('index');
        Route::get('/{user}', [UserController::class, 'show'])->name('show');
    });

    Route::group(['prefix' => 'contacts', 'as' => 'contacts.'], function () {
        Route::get('/', [ContactController::class, 'index'])->name('index');
        Route::get('/{contact}', [ContactController::class, 'show'])->name('show');
        Route::post('/{contact}/reply', [ContactController::class, 'reply'])->name('reply');
    });

    Route::group(['prefix' => 'payments', 'as' => 'payments.'], function () {
        Route::get('/', [PaymentController::class, 'index'])->name('index');
    });

    Route::group(['prefix' => 'notifications', 'as' => 'notifications.'], function () {
        Route::get('/', [NotificationController::class, 'index'])->name('index');
        Route::get('/open', [NotificationController::class, 'open'])->name('open');
        Route::get('/{notification}', [NotificationController::class, 'show'])->name('show');
    });

    Route::get('/help', [HelpController::class, 'index'])->name('help');
    Route::get('/terms', [HelpController::class, 'rule'])->name('terms');
    Route::get('/center', [HelpController::class, 'index'])->name('center');
});

