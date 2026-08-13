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
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;
use Carbon\Carbon;
use DB;

class PaymentController extends Controller
{
    protected $perPage = 10;
    protected $productRepository;

    function __construct(ProductRepository $productRepository)
    {
        $this->productRepository = $productRepository;
    }
    
    public function index(Request $request)
    {
        $keyword = $request->keyword;
        $status = $request->status;
        $company = $request->company;
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
                        ->orWhere('target_position', 'like', "%$keyword%");
            });
        }

        $query->whereHas('user', function ($query) {
                    $query->whereNull('deleted_at'); // 削除されていないユーザーのみ
                })->with([
                    'product.company', // リレーションをそのまま取得
                    'user.profile'     // ユーザーとそのプロフィールを取得
                ]);
        $query->orderByDesc('updated_at');
        $transactions = $query->paginate($this->perPage)->withQueryString();

        $companies = Company::whereNot('coporate_code', NULL)
                            ->orderByDesc('coporate_name')
                            ->whereHas('products', function($query) {
                                $query->whereIn('status', [ProductStatus::PUBLIC, ProductStatus::STOPPED, ProductStatus::EXPIRED]);
                            })
                            ->get();

        return Inertia::render('Admin/Payments/Index', [
            'transactions' => $transactions,
            'companies' => $companies,
            'statuses' => TransactionStatus::getArray(),
            'selectedUser' => User::where('id', $user)?->with('profile')->first(),
        ]);
    }

    public function show(Request $request, Product $product) {
        $product->load([
            'company' => function($query) {
                return $query->with('user');
            },
            'deploies',
            'faqs',
            'company.products' => function($query) use($product) {
                return $query->whereNotIn('id', [$product->id]);
            },
            'schedules' => function($query) {
                return $query->orderBy('order', 'asc');
            }
        ]);
        return Inertia::render('Admin/Products/Show', [
            'target_types' => TargetType::getArray(),
            'product' => $product,
        ]);
    }

    public function delete(Product $product)
    {
        DB::beginTransaction();
        try {
            $product->delete();
            DB::commit();
        } catch (\Throwable $e) {
            DB::rollBack();
            Log::error($e->getMessage());

            return back()->with(['error', __('操作が失敗しました。')]);
        }

        return back()->with('success', __('商材を削除しました。'));
    }

    public function block(Product $product)
    {
        DB::beginTransaction();
        try {
            if ($product->status == ProductStatus::BLOCKED) {
                $product->update(['status' => ProductStatus::PUBLIC]);
            } else {
                $product->update(['status' => ProductStatus::BLOCKED]);
            }
            DB::commit();
        } catch (\Throwable $e) {
            DB::rollBack();
            Log::error($e->getMessage());

            return back()->with(['error', __('操作が失敗しました。')]);
        }

        return back()->with('success', __('操作が成功しました。'));
    }

    public function accept(Product $product)
    {
        DB::beginTransaction();
        try {
            $product->update(['status' => ProductStatus::PUBLIC]);
            DB::commit();
        } catch (\Throwable $e) {
            DB::rollBack();
            Log::error($e->getMessage());

            return back()->with(['error', __('操作が失敗しました。')]);
        }

        return back()->with('success', __('商材を許可しました。'));
    }

    public function reject(Product $product)
    {
        DB::beginTransaction();
        try {
            $product->update(['status' => ProductStatus::DRAFT]);
            DB::commit();
        } catch (\Throwable $e) {
            DB::rollBack();
            Log::error($e->getMessage());

            return back()->with(['error', __('操作が失敗しました。')]);
        }

        return back()->with('success', __('商材を不許しました。'));
    }

    public function transactions($id)
    {
        $user = User::findOrFail($id);
        $status = request('status');
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
        return Inertia::render('Admin/Users/Transactions', [
            'transactions' => $transactions,
            'status' => $status ?? 0,
            'user' => $user,
        ]);
    }

}
