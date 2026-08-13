<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProfileUpdateRequest;
use App\Enums\ProductsFilterType;
use App\Enums\ProductSortType;
use App\Enums\TargetType;
use App\Enums\RewardFilterType;
use App\Enums\Role;
use App\Enums\TransactionStatus;
use App\Enums\ProductStatus;
use App\Models\User;
use App\Models\Company;
use App\Models\Product;
use App\Models\Transaction;
use App\Repositories\ProductRepository;
use App\Http\Resources\TransactionResource;
use App\Repositories\TransactionRepository;
use App\Enums\NotCompleteReason;
use App\Enums\NoResponseReason;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;
use Carbon\Carbon;
use DB;

class TransactionController extends Controller
{
    protected $perPage = 10;
    protected $transactionRepository;

    function __construct(TransactionRepository $transactionRepository)
    {
        $this->transactionRepository = $transactionRepository;
    }

    public function index(Request $request)
    {
        $keyword = $request->keyword;
        $company = $request->company;
        $status = $request->status;
        $sortBy = $request->query('sort_by', 'updated_at');
        $sortDirection = $request->query('sort_direction', 'desc');

        $user = $request->user;

        $query = Transaction::query();

        if (($status && $status != 9) || $status == '0') {
            $query->where('status', $status);
        }

        if ($company && $company != 0) {
            $query->whereHas('product.company', function($query) use ($company) {
                return $query->where('id', $company);
            });
        }

        if ($user) {
            $query->whereHas('user', function($query) use ($user) {
                return $query->where('id', $user);
            });            
        }

        if ($keyword) { 
            $query->where(function($query) use ($keyword) {
                $query->where('user_memo', 'like', "%$keyword%")
                        ->orWhere('target_memo', 'like', "%$keyword%")
                        ->orWhere('target_last_name', 'like', "%$keyword%")
                        ->orWhere('target_first_name', 'like', "%$keyword%")
                        ->orWhere('target_last_kana', 'like', "%$keyword%")
                        ->orWhere('target_first_kana', 'like', "%$keyword%")
                        ->orWhere('target_email', 'like', "%$keyword%")
                        ->orWhere('target_phone_number', 'like', "%$keyword%")
                        ->orWhere('target_company_name', 'like', "%$keyword%")
                        ->orWhere('target_position', 'like', "%$keyword%")
                        ->orWhere('code', 'like', "%$keyword%");
            });
        }

        $query->whereHas('user', function ($query) {
                    $query->whereNull('deleted_at'); // 削除されていないユーザーのみ
                })->with([
                    'product.company', // リレーションをそのまま取得
                    'user.profile'     // ユーザーとそのプロフィールを取得
                ]);
        $query->orderBy($sortBy, $sortDirection);

        $transactions = $query->paginate($this->perPage)->withQueryString();

        $companies = Company::whereNot('coporate_code', NULL)
                            ->orderByDesc('coporate_name')
                            ->whereHas('products', function($query) {
                                $query->whereIn('status', [ProductStatus::PUBLIC, ProductStatus::STOPPED, ProductStatus::EXPIRED]);
                            })
                            ->get();

        return Inertia::render('Admin/Transactions/Index', [
            'transactions' => $transactions,
            'companies' => $companies,
            'statuses' => TransactionStatus::getArray(),
            'selectedUser' => User::where('id', $user)?->with('profile')->first(),
            'sort_by' => $sortBy,
            'sort_direction' => $sortDirection
        ]);
    }

    public function getOrdersById($id)
    {
        return new TransactionResource($this->transactionRepository->find($id));
    }

    public function show(Request $request, $id)
    {
        return inertia('Admin/Transactions/Show', [
            'order' => $this->getOrdersById($id),
            'notCompleteReasons' => NotCompleteReason::getArray(),
            'noResponseReasons' => NoResponseReason::getArray(),
            'tax_rate' => config('values.tax_rate'),
            'service_fee_rate' => config('values.service_fee_rate'),
            'period_units' => \App\Enums\PeriodUnit::getArray(),
        ]);
        return inertia('Admin/Transactions/Show', [
            'order' => $this->getOrdersById($id),
            'notCompleteReasons' => \App\Enums\NotCompleteReason::getArray(),
            'noResponseReasons' => \App\Enums\NoResponseReason::getArray(),
            'tax_rate' => config('values.tax_rate'),
            'service_fee_rate' => config('values.service_fee_rate'),
        ]);
    }

    public function delete(Transaction $transaction)
    {
        DB::beginTransaction();
        try {
            $transaction->delete();
            DB::commit();
        } catch (\Throwable $e) {
            DB::rollBack();
            Log::error($e->getMessage());

            return back()->with(['error', __('操作が失敗しました。')]);
        }

        return back()->with('success', __('取引履歴を削除しました。'));
    }
}
