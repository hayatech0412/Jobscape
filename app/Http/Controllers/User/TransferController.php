<?php

namespace App\Http\Controllers\User;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Http\Requests\BankInfoRequest;
use App\Http\Requests\AmountInfoRequest;
use App\Models\Withdrawal;
use App\Models\BankAccount;
use App\Enums\WithDrawalStatus;
use App\Enums\TransactionStatus;

class TransferController extends Controller
{
    /**
     * Display the user's transfer form.
     */
    public function index(Request $request)
    {
        $user = auth('web')->user();
        if ($user->bank_account) {
            return Inertia::render('User/Transfer/Index', [
                'bank_account' => $user->bank_account,
            ]);
        }
        return Redirect::route('transfer.info.edit')->with('error', __('振込先口座情報をしてください。'));
    }

    public function edit(Request $request): Response
    {
        $user = auth('web')->user();
        return Inertia::render('User/Transfer/Edit', [
            'bank_account' => $user->bank_account,
        ]);
    }

    /**
     * Update the user's transfer information.
     */
    public function store(BankInfoRequest $request): RedirectResponse
    {
        $user = auth('web')->user();
        $params = $request->all();

        try {
            DB::beginTransaction();
            
            $bank_account = BankAccount::firstOrCreate(['user_id' => $user->id]);        
            $bank_account->update($params);

            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
            \Log::error($e->getMessage());

            return back()->with('error', __('操作が失敗しました。'));
        }

        return Redirect::route('transfer')->with('success', __('振込先口座情報を保存しました。'));
    }

    /**
     * Display the user's transfer form.
     */
    public function amount(Request $request)
    {
        $user = auth('web')->user();
        if ($user->bank_account) {
            return Inertia::render('User/Transfer/Amount', [
                'tax_deduction_threshold' => config('values.tax_deduction_threshold', 120000),
                'withdrawal_rate' => config('values.withdrawal_rate', 0.121),
                'profile' => $user->profile,
            ]);
        }
        return Redirect::route('transfer.info.edit')->with('error', __('振込先口座情報をしてください。'));
    }

    /**
     * Update the user's transfer information.
     */
    public function amountStore(AmountInfoRequest $request): RedirectResponse
    {
        $params = $request->all();

        $request->session()->put('amount_info', $params);
        return Redirect::route('transfer.confirm');
    }

    /**
     * Display the user's transfer form.
     */
    public function confirm(Request $request): Response
    {
        $user = auth('web')->user();
        return Inertia::render('User/Transfer/Confirm', [
            'profile' => $user->profile,
            'bank_account' => $user->bank_account,
        ]);
    }


    /**
     * Confirm the user's transfer information.
     */
    public function confirmStore(Request $request): RedirectResponse
    {        
        $bank_account = auth('web')->user()->bank_account;
        try {
            DB::beginTransaction();
            
            $withdrawal = Withdrawal::create(['user_id' => auth('web')->user()->id]);
            $withdrawal->update([
                'bank_name' => $bank_account->bank_name,
                'account_type' => $bank_account->account_type,
                'account_code' => $bank_account->account_code,
                'shop_code' => $bank_account->shop_code,
                'account_last_name' => $bank_account->account_last_name,
                'account_first_name' => $bank_account->account_first_name,
            ]);
            $withdrawal->update($request->session()->pull('amount_info'));

            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
            \Log::error($e->getMessage());

            return back()->with('error', __('操作が失敗しました。'));
        }
        return Redirect::route('mypage')->with('success', __('振込申請を完了しました。'));
    }
    
    public function goVerify(Request $request): Response
    {
        $user = auth('web')->user();
        return Inertia::render('User/Transfer/Verify', [
            'profile' => $user->profile,
            'bank_account' => $user->bank_account,
        ]);
    }

    public function verified(Request $request): RedirectResponse
    {
        $bank_account = auth('web')->user()->bank_account;
        try {
            DB::beginTransaction();
            
            $withdrawal = Withdrawal::create(['user_id' => auth('web')->user()->id]);
            $withdrawal->update([
                'bank_name' => $bank_account->bank_name,
                'account_type' => $bank_account->account_type,
                'account_code' => $bank_account->account_code,
                'shop_code' => $bank_account->shop_code,
                'account_last_name' => $bank_account->account_last_name,
                'account_first_name' => $bank_account->account_first_name,
            ]);
            $withdrawal->update($request->session()->pull('amount_info'));

            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
            \Log::error($e->getMessage());

            return back()->with('error', __('操作が失敗しました。'));
        }
        return Redirect::route('mypage')->with('success', __('振込申請を完了しました。'));
    }

    public function balanceHistory(Request $request)
    {
        $userId = auth('web')->user()->id;
        $query = DB::table(DB::raw("
            (
                SELECT created_at AS date, '売上' AS note, sales_amount AS income, 0 AS outgo, 0 AS fee, 0 AS tax, NULL AS request_amount
                FROM transactions
                WHERE user_id = ? AND status = 4
                UNION ALL
                SELECT created_at AS date, '振込申請' AS note, 0 AS income, amount AS outgo, 0 AS fee, 0 AS tax, request_amount
                FROM withdrawals
                WHERE user_id = ?
                UNION ALL
                SELECT withdraw_at AS date, '引き出し' AS note, 0 AS income, amount AS outgo, 0 AS fee, 0 AS tax, request_amount
                FROM withdrawals
                WHERE user_id = ?
                UNION ALL
                SELECT withdraw_at AS date, '取扱手数料' AS note, 0 AS income, amount_fee AS outgo, amount_fee AS fee, 0 AS tax, NULL AS request_amount
                FROM withdrawals
                WHERE user_id = ? AND status = 1
                UNION ALL
                SELECT withdraw_at AS date, '源泉徴収税' AS note, 0 AS income, tax_amount AS outgo, 0 AS fee, tax_amount AS tax, NULL AS request_amount
                FROM withdrawals
                WHERE user_id = ? AND status = 1
            ) AS ledger
        "))
        ->selectRaw('
            date, note, request_amount, income, outgo, fee, tax,
            SUM(income - outgo - fee - tax) OVER (ORDER BY date) AS balance
        ')
        ->addBinding([$userId, $userId, $userId, $userId, $userId])
        ->orderByDesc('date')
        ->paginate(12);

        return Inertia::render('User/Transfer/HistoryBalance', [
            'historyData' => $query,
            'summary' => $this->summary()
        ]);
    }

    public function summary()
    {
        $userId = auth('web')->user()->id; 
        return [
            'request_amount' => DB::table('withdrawals')
                ->where('user_id', $userId)
                ->sum('request_amount'),

            'income' => DB::table('transactions')
                ->where('user_id', $userId)
                ->where('status', TransactionStatus::COMPLETE)
                ->sum('sales_amount'),

            'outgo' => DB::table('withdrawals')
                ->where('user_id', $userId)
                ->sum('amount'),

            'withdrawal_fee' => DB::table('transactions')
                ->where('user_id', $userId)
                ->where('status', TransactionStatus::COMPLETE)
                ->sum('fee_amount'),

            'handling_fee' => DB::table('withdrawals')
                ->where('user_id', $userId)
                ->where('status', WithDrawalStatus::APPROVED)
                ->sum('amount_fee'),

            'tax' => DB::table('withdrawals')
                ->where('user_id', $userId)
                ->where('status', WithDrawalStatus::APPROVED)
                ->sum('tax_amount'),
        ];

    }

}
