<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Support\Facades\Route;

Route::middleware([\App\Http\Middleware\AdminGuestMiddleware::class])->group(function () {
    Route::get('/login', [Auth\LoginController::class, 'showLoginForm'])->name('login');
    Route::post('/login', [Auth\LoginController::class, 'login']);
});


Route::middleware('admin_auth')->group(function () {
    Route::get('/', function () {return redirect(route('admin.dashboard'));})->name('home');
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // ユーザー管理
    Route::get('/users', [UserController::class, 'index'])->name('users');
    Route::get('/users/filter', [UserController::class, 'filter'])->name('users.filter');
    Route::post('/users/{user}/delete', [UserController::class, 'delete'])->name('users.delete');
    Route::get('/users/{user}', [UserController::class, 'show'])->name('users.show');
    Route::get('/users/{user}/edit', [UserController::class, 'edit'])->name('users.edit');
    Route::post('/users/{user}/account/image', [UserController::class, 'updateImage'])->name('account.info.image');
    Route::post('/users/{user}/account/info', [UserController::class, 'accountInfoStore'])->name('account.info.store');
    Route::post('/users/{user}/account/info/email', [UserController::class, 'emailStore'])->name('account.info.email.store');
    Route::post('/users/{user}/account/info/password', [UserController::class, 'passwordStore'])->name('account.info.password.store');
    Route::post('/users/{user}/account/info/phonenumber', [UserController::class, 'phoneNumberStore'])->name('account.info.phonenumber.store');
    Route::post('/users/{user}/account/info/category', [UserController::class, 'categoryStore'])->name('account.info.category.store');
    Route::post('/users/{user}/account/info/area', [UserController::class, 'areaStore'])->name('account.info.area.store');
    Route::post('/users/{user}/account/business/personal/store', [UserController::class, 'personalInfoStore'])->name('account.business.personal.store');
    Route::post('/users/{user}/account/business/store', [UserController::class, 'businessInfoStore'])->name('account.business.store');
    
    // 企業管理
    Route::get('/companies', [CompanyController::class,'index'])->name('companies');
    Route::get('/companies/accepted', [CompanyController::class,'index'])->name('companies.accepted');
    Route::get('/companies/requested', [CompanyController::class,'requested'])->name('companies.requested');
    Route::post('/companies/{company}/accept', [CompanyController::class, 'accept'])->name('companies.accept');
    Route::post('/companies/{company}/reject', [CompanyController::class, 'reject'])->name('companies.reject');
    Route::post('/companies/{company}/delete', action: [CompanyController::class, 'delete'])->name('companies.delete');
    Route::get('/companies/{company}', [CompanyController::class, 'show'])->name('companies.show');
    Route::get('/companies/{company}/transactions', [CompanyController::class, 'transactions'])->name('companies.transactions');
    Route::get('/companies/{company}/products', [CompanyController::class, 'products'])->name('companies.products');
    Route::get('/companies/{company}/edit', [CompanyController::class, 'edit'])->name('companies.edit');
    Route::post('/companies/{company}/update', [CompanyController::class, 'update'])->name('companies.update');
    Route::post('/companies/{company}/business/info', [CompanyController::class, 'updateBusinessInfo'])->name('companies.business.info');

    // 商材管理
    Route::get('/products', function () { return redirect(route('admin.products.requested')); })->name('products');
    Route::get('/products/requested', [ProductController::class, 'requested'])->name('products.requested');
    Route::get('/products/accepted', [ProductController::class, 'index'])->name('products.accepted');
    Route::get('/products/blocked', [ProductController::class, 'blocked'])->name('products.blocked');
    Route::get('/products/{product}', [ProductController::class, 'show'])->name('products.show');
    Route::post('/products/{product}/delete', [ProductController::class, 'delete'])->name('products.delete');
    Route::post('/products/{product}/block', [ProductController::class, 'block'])->name('products.block');
    Route::post('/products/{product}/accept', [ProductController::class, 'accept'])->name('products.accept');
    Route::post('/products/{product}/reject', [ProductController::class, 'reject'])->name('products.reject');
    Route::get('/products/{product}/edit', [ProductController::class, 'edit'])->name('products.edit');
    Route::post('/products/{product}/update', [ProductController::class, 'update'])->name('products.update');

    // 取引管理
    Route::get('/transactions', [TransactionController::class, 'index'])->name('transactions');
    Route::get('/transactions/{transaction}', [TransactionController::class, 'show'])->name('transactions.show');
    Route::post('/transactions/{transaction}/delete', [TransactionController::class, 'delete'])->name('transactions.delete');

    // 支払い管理
    Route::get('/payments', [PaymentController::class, 'index'])->name('payments');
    Route::get('/payments/{payment}', [TransactionController::class, 'show'])->name('payments.show');

    // 振り込み申請管理
    Route::get('/withdrawals', [WithdrawalController::class, 'index'])->name('withdrawals');
    Route::get('/withdrawals/{withdrawal}', [WithdrawalController::class, 'show'])->name('withdrawals.show');
    Route::post('/withdrawals/{withdrawals}/delete', [WithdrawalController::class, 'delete'])->name('withdrawals.delete');
    Route::post('/withdrawals/{withdrawals}/reject', [WithdrawalController::class, 'reject'])->name('withdrawals.reject');
    Route::post('/withdrawals/{withdrawals}/accept', [WithdrawalController::class, 'accept'])->name('withdrawals.accept');
    
    // 源泉徴収税の管理
    Route::get('/withholdings', [WithholdingController::class, 'index'])->name('withholdings');
    Route::post('/withholdings/{withholding}/delete', [WithholdingController::class, 'delete'])->name('withholdings.delete');

    // お知らせ管理
    Route::get('/notices', [NoticeController::class, 'index'])->name('notices');
    Route::get('/notices/create', [NoticeController::class, 'create'])->name('notices.create');
    Route::get('/notices/{notice}', [NoticeController::class, 'show'])->name('notices.show');
    Route::post('/notices/store', [NoticeController::class, 'store'])->name('notices.store');
    Route::post('/notices/{notice}/delete', [NoticeController::class, 'delete'])->name('notices.delete');

    // 問い合わせ管理
    Route::get('/contacts', [ContactController::class, 'index'])->name('contacts');
    Route::get('/contacts/{contact}', [ContactController::class, 'show'])->name('contacts.show');
    Route::post('/contacts/{contact}/delete', [ContactController::class, 'delete'])->name('contacts.delete');

    // 意見箱管理
    Route::get('/opinions', [OpinionController::class, 'index'])->name('opinions');
    Route::get('/opinions/create', [OpinionController::class, 'create'])->name('opinions.create');
    Route::get('/opinions/{opinion}', [OpinionController::class, 'show'])->name('opinions.show');
    Route::post('/opinions/store', [OpinionController::class, 'store'])->name('opinions.store');
    Route::post('/opinions/{opinion}/delete', [OpinionController::class, 'delete'])->name('opinions.delete');

    // csv 出力
    Route::get('/export/withholdings', [ExportController::class, 'withholdings'])->name('export.withholdings');
    Route::get('/export/withDrawls', [ExportController::class, 'withDrawls'])->name('export.withDrawls');

    Route::post('/logout', function () { auth('admin')->logout(); })->name('logout');
});
