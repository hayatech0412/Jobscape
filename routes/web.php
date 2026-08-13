<?php

use App\Http\Controllers\User\Auth\RegisteredUserController;
use App\Http\Controllers\User\CompanyController;
use App\Http\Controllers\User\ProfileController;
use App\Http\Controllers\User\MypageController;
use App\Http\Controllers\User\HomeController;
use App\Http\Controllers\User\ProductController;
use App\Http\Controllers\User\TransferController;
use App\Http\Controllers\User\TransactionController;
use App\Http\Controllers\User\NoticeController;
use App\Http\Controllers\User\NotificationController;
use App\Http\Controllers\User\PaymentController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/dashboard', function () {
    return redirect(route('home'));
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('guest')->group(function () {
    Route::post('/register', [RegisteredUserController::class, 'store']);
    Route::get('/register/{user}/email/verify', [RegisteredUserController::class, 'email'])->name('register.email');   
    Route::post('/register/email/verify', [RegisteredUserController::class, 'emailVerify'])->name('register.email.verify');
    Route::post('/register/email/resend', [RegisteredUserController::class, 'resend'])->name('register.email.resend');

});

Route::middleware('user_auth')->group(function () {
    // ユーザー情報登録
    Route::get('/register/plans', [RegisteredUserController::class, 'selectPlan'])->name('register.plans');
    Route::post('/register/plans', [RegisteredUserController::class, 'registerPlan'])->name('register.plans.store');
    Route::get('/register/payment-methods', [RegisteredUserController::class, 'paymentMethods'])->name('register.payment.methods');
    Route::post('/register/payment-methods', [RegisteredUserController::class, 'registerPaymentMethods'])->name('register.payment.methods.store');
    Route::get('/register/nickname', [RegisteredUserController::class, 'nickname'])->name('register.nickname');
    Route::post('/register/nickname', [RegisteredUserController::class, 'nicknameStore'])->name('register.nickname.store');
    Route::get('/register/phone-number', [RegisteredUserController::class, 'phoneNumber'])->name('register.phone.number');
    Route::post('/register/phone-number', [RegisteredUserController::class, 'phoneNumberSend'])->name('register.phone.number.send');
    Route::get('/register/phone-number/verify', [RegisteredUserController::class, 'phoneNumberVerify'])->name('register.phone.number.verify');
    Route::post('/register/phone-number/verify', [RegisteredUserController::class, 'verify'])->name('register.phone.number.verify.send');
    Route::get('/register/maininfo', [RegisteredUserController::class, 'maininfo'])->name('register.maininfo');
    Route::post('/register/maininfo', [RegisteredUserController::class, 'maininfoStore'])->name('register.maininfo.store');
    Route::post('/register/maininfo/after', [RegisteredUserController::class, 'registerAfter'])->name('register.maininfo.after');
    Route::get('/register/area', [RegisteredUserController::class, 'area'])->name('register.area');
    Route::post('/register/area', [RegisteredUserController::class, 'areaStore'])->name('register.area.store');
    Route::get('/register/category', [RegisteredUserController::class, 'category'])->name('register.category');
    Route::post('/register/category', [RegisteredUserController::class, 'categoryStore'])->name('register.category.store');
    Route::get('/register/complete', [RegisteredUserController::class, 'complete'])->name('register.complete');
    
    Route::middleware('user_register_step')->group(function () {
        //ホーム
        Route::get('/', [HomeController::class, 'index'])->name('home');

        //マイページ
        Route::get('/mypage', [MypageController::class, 'index'])->name('mypage');

        // 振込申請
        Route::get('/mypage/transfer/amount', [TransferController::class, 'amount'])->name('transfer.amount');
        Route::post('/mypage/transfer/amount', [TransferController::class, 'amountStore'])->name('transfer.amount.store');
        Route::get('/mypage/transfer/info', [TransferController::class, 'index'])->name('transfer');
        Route::get('/mypage/transfer/info/edit', [TransferController::class, 'edit'])->name('transfer.info.edit');
        Route::post('/mypage/transfer/info/edit', [TransferController::class, 'store'])->name('transfer.store');
        Route::get('/mypage/transfer/amount/confirm', [TransferController::class, 'confirm'])->name('transfer.confirm');
        Route::post('/mypage/transfer/amount/confirm', [TransferController::class, 'confirmStore'])->name('transfer.confirm.store');
        Route::get('/mypage/transfer/amount/verify', [TransferController::class, 'goVerify'])->name('transfer.verify');
        Route::post('/mypage/transfer/amount/verify', [TransferController::class, 'verified'])->name('transfer.verified');
        // 取引管理
        Route::get('/transaction/introduction/{product}', [TransactionController::class, 'introduction'])->name('transaction.introduction');
        Route::post('/transaction/introduction', [TransactionController::class, 'store'])->name('transaction.introduction.store');
        Route::get('/transaction/introduction/form/{product}', [TransactionController::class, 'introductionForm'])->name('transaction.introduction.form');
        Route::post('/transaction/introduction/form', [TransactionController::class, 'introductionStore'])->name('transaction.introduction.form.store');
        Route::get('/transaction/{transaction}', [TransactionController::class, 'transaction'])->name('transaction');
        Route::get('/transactions', [TransactionController::class, 'index'])->name('transactions');
        Route::get('/transactions/more/{status}', [TransactionController::class, 'more'])->name('transactions.more');
        Route::get('/transactions/balance/history', [TransferController::class, 'balanceHistory'])->name('transactions.balance.history');

        // 本人情報設定
        Route::get('/mypage/account/info', [MypageController::class, 'accountInfo'])->name('account.info');
        Route::post('/mypage/account/image', [MypageController::class, 'updateImage'])->name('account.info.image');
        Route::post('/mypage/account/info', [MypageController::class, 'accountInfoStore'])->name('account.info.store');
        Route::post('/mypage/account/info/email', [MypageController::class, 'emailStore'])->name('account.info.email.store');
        Route::post('/mypage/account/info/password', [MypageController::class, 'passwordStore'])->name('account.info.password.store');
        Route::post('/mypage/account/info/phonenumber', [MypageController::class, 'phoneNumberStore'])->name('account.info.phonenumber.store');
        Route::post('/mypage/account/info/category', [MypageController::class, 'categoryStore'])->name('account.info.category.store');
        Route::post('/mypage/account/info/area', [MypageController::class, 'areaStore'])->name('account.info.area.store');
        Route::get('/mypage/account/business', [MypageController::class, 'businessInfo'])->name('account.business');
        Route::post('/mypage/account/business/personal/store', [MypageController::class, 'personalInfoStore'])->name('account.business.personal.store');
        Route::post('/mypage/account/business/store', [MypageController::class, 'businessInfoStore'])->name('account.business.store');

        // プランの管理
        Route::post('/mypage/active', [MypageController::class, 'active'])->name('mypage.active');
        Route::get('/mypage/payments/plan', [PaymentController::class, 'plan'])->name('payments.plan');
        Route::get('/mypage/payments/plan/change', [PaymentController::class, 'planChange'])->name('payments.plan.change');
        Route::post('/mypage/payments/plan/change', [PaymentController::class, 'planChageStore']);
        Route::get('/mypage/payments/methods', [PaymentController::class, 'paymentMethods'])->name('payments.methods');


        // 探す, 商材一覧
        Route::get('/search', [ProductController::class, 'index'])->name('search');
        Route::get('/search/products/{product}', [ProductController::class, 'show'])->name('search.show');
        Route::get('/search/companies', [CompanyController::class, 'index'])->name('companies');

        // 閲覧履歴
        Route::get('search/history', [ProductController::class, 'history'])->name('history');        

        // 紹介案件
        Route::get('/introductions', [TransactionController::class, 'introductions'])->name('introductions');

        // お知らせ
        Route::get('/notices', [NoticeController::class, 'index'])->name('notices');

        // 通知
        Route::get('/notifications', [NotificationController::class, 'index'])->name('notifications');
        Route::get('/notifications/open', [NotificationController::class, 'open'])->name('notifications.open');
        Route::get('/notifications/{notification}', [NotificationController::class, 'show'])->name('notifications.show');
        
        // ヘルプ
        Route::get('/privacy', [MypageController::class, 'privacy'])->name('privacy');
        Route::get('/contact', [MypageController::class, 'contact'])->name('contact');
        Route::post('/contact/store', [MypageController::class, 'contactStore'])->name('contact.store');
        Route::get('/help', [MypageController::class, 'help'])->name('help');
        Route::get('/opinion', [MypageController::class, 'opinion'])->name('opinion');
        Route::post('/opinion/store', [MypageController::class, 'opinionStore'])->name('opinion.store');
    });
    
    Route::post('/payment/subscription/callback', [App\Http\Controllers\User\PaymentController::class, 'subscriptionCallback'])->name('payment.subscription.callback');
});


require __DIR__.'/auth.php';
