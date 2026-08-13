<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProfileUpdateRequest;
use App\Enums\ProductsFilterType;
use App\Enums\ProductSortType;
use App\Enums\UserStatus;
use App\Enums\Role;
use App\Enums\TransactionStatus;
use App\Enums\ProductStatus;
use App\Http\Requests\CompanyBusinessInfoUpdateRequest;
use App\Http\Requests\CompanyAccountInfoUpdateRequest;
use App\Models\Company;
use App\Models\User;
use App\Models\Profile;
use App\Models\Transaction;
use App\Repositories\ProductRepository;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;
use Carbon\Carbon;

class CompanyController extends Controller
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

        $query = User::onlyCompanies()->active()->with('company');

        if ($keyword) {
            $query->where(function($query) use ($keyword) {
                $query->where('email', 'like', "%$keyword%")
                        ->orWhereHas('company', function($query) use ($keyword) {
                            $query->where('first_name', 'like', "%$keyword%")
                                ->orWhere('last_name', 'like', "%$keyword%")
                                ->orWhere('first_kana', 'like', "%$keyword%")
                                ->orWhere('last_kana', 'like', "%$keyword%")
                                ->orWhere('nickname', 'like', "%$keyword%")
                                ->orWhere('coporate_name', 'like', "%$keyword%")
                                ->orWhere('coporate_kana', 'like', "%$keyword%")
                                ->orWhere('overview', 'like', "%$keyword%")
                                ->orWhere('summary', 'like', "%$keyword%");
                        });
            });
        }

        $query->orderBy("created_at", "desc");
        $users = $query->paginate($this->perPage)->withQueryString();

        return Inertia::render('Admin/Companies/Index', [
            'users' => $users
        ]);
    }

    public function requested(Request $request)
    {
        $keyword = $request->keyword;

        $query = User::onlyCompanies()->inActive()->with('company');

        if ($keyword) {
            $query->where(function($query) use ($keyword) {
                $query->where('email', 'like', "%$keyword%")
                        ->orWhereHas('company', function($query) use ($keyword) {
                            $query->where('first_name', 'like', "%$keyword%")
                                ->orWhere('last_name', 'like', "%$keyword%")
                                ->orWhere('first_kana', 'like', "%$keyword%")
                                ->orWhere('last_kana', 'like', "%$keyword%")
                                ->orWhere('nickname', 'like', "%$keyword%")
                                ->orWhere('coporate_name', 'like', "%$keyword%")
                                ->orWhere('coporate_kana', 'like', "%$keyword%")
                                ->orWhere('overview', 'like', "%$keyword%")
                                ->orWhere('summary', 'like', "%$keyword%");
                        });
            });
        }

        $query->orderBy("created_at", "desc");
        $users = $query->paginate($this->perPage)->withQueryString();

        return Inertia::render('Admin/Companies/Requests', [
            'users' => $users
        ]);
    }

    public function show($id) {
        $user = User::findOrFail($id);
        $prefectures = config('values.prefectures');
        $profile = Profile::where('user_id', $id)->with('plan')->first();
        return Inertia::render('Admin/Companies/Show', [
            'user' => $user,
            'managers' => $user->company?->managers ?? [],
            'products' => $user->company?->products()->where('status', ProductStatus::REVIEW)->with(['categories', 'company'])->get() ?? [],
        ]);
    }

    public function accept($id)
    {
        DB::beginTransaction();
        try {
            $user = User::find($id);
            $user->update(['status' => UserStatus::ACTIVE]);
            DB::commit();
        } catch (\Throwable $e) {
            DB::rollBack();
            Log::error($e->getMessage());

            return back()->with(['error', __('操作が失敗しました。')]);
        }

        return back()->with('success', __('商材を許可しました。'));
    }

    public function reject($id)
    {
        DB::beginTransaction();
        try {
            $user = User::find($id);
            $user->delete();
            DB::commit();
        } catch (\Throwable $e) {
            DB::rollBack();
            Log::error($e->getMessage());

            return back()->with(['error', __('操作が失敗しました。')]);
        }

        return redirect()->route('admin.companies.requested')->with('success', __('商材を不許しました。'));
    }

    public function delete($id)
    {
        $user = User::find($id);
        DB::beginTransaction();
        try {
            $user->delete();
            DB::commit();
        } catch (\Throwable $e) {
            DB::rollBack();
            Log::error($e->getMessage());

            return redirect(route('admin.companies'))->with(['error', __('操作が失敗しました。')]);
        }

        return redirect(route('admin.companies'))->with('success', __('企業を削除しました。'));
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

    public function products($id)
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

    public function edit($id) {
        $user = User::findOrFail($id);
        $prefectures = config('values.prefectures');
        return Inertia::render('Admin/Companies/Edit', [
            'user' => $user,
            'company' => $user->company,
            'managers' => $user->company->managers,
            'prefs' => $prefectures,
            'coporate_types' => \App\Enums\CoporateType::getArray(),
            'business_types' => \App\Enums\BusinessType::getArray(),
            'operator_types' => \App\Enums\OperatorType::getArray(),
        ]);
    }

    public function update(CompanyAccountInfoUpdateRequest $request) {
        $params = $request->all();
        $user_id = $request->route('company');
        $user = User::find($user_id);
        DB::beginTransaction();
        try {
            $user->company->update($params);
            
            DB::commit();
        } catch (\Throwable $e) {
            DB::rollBack();
            Log::error($e->getMessage());

            return back()->with(['error', __('操作が失敗しました。')]);
        }

        return back()->with('success', __('企業情報を保存しました。'));
    }

    public function updateBusinessInfo(CompanyBusinessInfoUpdateRequest $request) {
        $params = $request->all();
        $user_id = $request->route('company');
        $user = User::find($user_id);
        DB::beginTransaction();
        try {
            // 会社情報を更新
            $user->company->update($params);


            // 新しい管理者情報を保存（空データを除外）
            $managers = collect($params['managers'])
                        ->filter(fn($manager) => !empty(array_filter($manager))) // 空データを除外
                        ->toArray();
                        // 既存の管理者情報を削除
            $user->company->managers()->delete();
            $user->company->managers()->createMany($managers);
            
            DB::commit();
        } catch (\Throwable $e) {
            DB::rollBack();
            Log::error($e->getMessage());

            return back()->with(['error', __('操作が失敗しました。')]);
        }

        return back()->with('success', __('企業情報を保存しました。'));
    }
}
