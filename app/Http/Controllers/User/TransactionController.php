<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Product;
use App\Models\Transaction;
use App\Http\Requests\IntroductionRequest;
use App\Http\Requests\IntroductionFormRequest;
use App\Enums\TransactionStatus;
use Illuminate\Support\Facades\Log;
use App\Enums\PeriodUnit;
use Carbon\Carbon;
use DB;

class TransactionController extends Controller
{
    public function index(Request $request) {
        $status  = $request->status;
        $user = auth('web')->user();

        $query = Transaction::where('user_id', $user->id);
        if ($status) {
            switch ($status) {
                case 0:
                    $query = $query->where('status', TransactionStatus::REQUESTED);
                    break;
                case 1:
                    $query = $query->whereNotIn('status', [TransactionStatus::REQUESTED, TransactionStatus::COMPLETE]);
                    break;
                case 2:
                    $query = $query->where('status', TransactionStatus::COMPLETE);
                    break;
                default:
                    break;
            }
        }
        $transactions = $query->with('product')->orderByRaw('COALESCE(completed_at, created_at) DESC')->paginate(6);
        return Inertia::render('User/Transaction/Index', [
            'transactions' => $transactions,
            'status' => $status ?? 0
        ]);
    }

    public function more(Request $request, $status) {
        $user = auth('web')->user();

        $query = Transaction::where('user_id', $user->id);
        if ($status) {
            switch ($status) {
                case 0:
                    $query = $query->where('status', TransactionStatus::REQUESTED);
                    break;
                case 1:
                    $query = $query->whereNotIn('status', [TransactionStatus::REQUESTED, TransactionStatus::COMPLETE]);
                    break;
                case 2:
                    $query = $query->where('status', TransactionStatus::COMPLETE);
                    break;
                default:
                    break;
            }
        }
        $transactions = $query->with('product')
                                ->orderByRaw('COALESCE(completed_at, created_at) DESC')
                                ->paginate(20)
                                ->withQueryString();
        return Inertia::render('User/Transaction/more', [
            'transactions' => $transactions,
            'status' => $status ?? 0
        ]);
    }

    /**
     * Display the user's transaction form.
     */
    public function introduction(Request $request): Response
    {
        $user = auth('web')->user();
        $product = Product::find($request->product);

        return Inertia::render('User/Transaction/Introduction', [
            'product' => $product,
            'company' => $product->company->load('user'),
            'plan' => $user->profile->plan,
            'RewardTypes' => \App\Enums\RewardType::toArrayCustom(),
        ]);
    }

    /**
     * Update the user's transaction information.
     */
    public function store(IntroductionRequest $request): RedirectResponse
    {
        $request->session()->put('introduction_info', $request->all());
        return Redirect::route('transaction.introduction.form', [$request->product_id]);
    }

    /**
     * Display the user's transaction form.
     */
    public function introductionForm(Request $request, $product_id)
    {
        $user = auth('web')->user();
        $prefectures = config('values.prefectures');

        $product = Product::find($request->product);

        return Inertia::render('User/Transaction/IntroductionForm', [
            'product' => $product,
            'prefs' => $prefectures,
            'company' => $product->company->load('user'),
            'Approaches' => \App\Enums\Approach::getArray(),
            'plan' => $user->profile->plan,
            'RewardTypes' => \App\Enums\RewardType::toArrayCustom(),
        ]);
    }

    /**
     * Update the user's transaction information.
     */
    public function introductionStore(IntroductionFormRequest $request): RedirectResponse
    {
        $product_id = $request->product_id;
        $product = Product::find($product_id);

        try {
            DB::beginTransaction();

            $session_data = $request->session()->pull('introduction_info');
            if (!$session_data) {
                return Redirect::route('transaction.introduction', [$product_id]);
            }

            $transaction = Transaction::create([
                'user_id' => Auth::id(),
                'product_id' => $product_id,
            ]);
            $transaction->update($session_data);
            $transaction->update($request->all());            
           
            $now = now();
            switch ($product->transaction_period_unit) {
                case PeriodUnit::DAY:
                    $proposed_at = $now->addDays($product->transaction_period);
                    break;
                case PeriodUnit::WEEK:
                    $proposed_at = $now->addWeeks($product->transaction_period);
                    break;
                case PeriodUnit::MONTH:
                    $proposed_at = $now->addMonths($product->transaction_period);
                    break;
                case PeriodUnit::YEAR:
                    $proposed_at = $now->addYears($product->transaction_period);
                    break;
                default:
                    $proposed_at = $now; // デフォルトは現在時刻
            }
            $transaction->update(['proposed_at' => $proposed_at]);
            
            $this->notificationService->sendTransactionStartNotification($transaction);

            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
            Log::error($e->getMessage());

            return back()->with('error', __('操作が失敗しました。'));
        }

        return Redirect::route('transaction', [$transaction->id])->with('success', __('ご紹介がスタートしました'));
    }

    /**
     * Display the user's transaction form.
     */
    public function transaction(Request $request, $id): Response
    {
        $transaction = Transaction::find($id);

        return Inertia::render('User/Transaction/Transaction', [
            'plan' => auth('web')->user()->profile->plan,
            'transaction' => $transaction,
            'product' => $transaction->product,
            'company' => $transaction->product->company->load('user'),
            'RewardTypes' => \App\Enums\RewardType::toArrayCustom(),
            'TransactionStatus' => \App\Enums\TransactionStatus::toArrayCustom(),
        ]);
    }

    public function introductions(Request $request)
    {
        return Inertia::render('User/Product/Index');
    }
}
