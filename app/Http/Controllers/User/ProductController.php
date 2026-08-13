<?php

namespace App\Http\Controllers\User;

use App\Enums\ProductsFilterType;
use App\Enums\ProductSortType;
use App\Enums\RewardType;
use App\Enums\ProductStatus;
use App\Enums\TargetType;
use App\Enums\RewardFilterType;
use App\Enums\PeriodUnit;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Plan;
use App\Models\Product;
use App\Models\Category;
use App\Models\VisitHistory;
use DB;

class ProductController extends Controller
{
    protected $perPage = 20;

    public function index(Request $request)
    {
        $category  = $request->input('category', null);
        $area  = $request->input('area', null);
        $percent  = $request->input('percent', RewardFilterType::ALL);
        $sort  = $request->input('sort', ProductSortType::RECOMMEND);
        $filter  = $request->input('filter', ProductsFilterType::ALL);

        $products = Product::query();

        if ($percent !== null && in_array($percent, [RewardType::MONEY, RewardType::PERCENT])) {
            $products = Product::with(['company', 'categories'])
                ->where('reward_type', $percent);
        }

        if($category) {
            $products->whereHas('categories', function($query) use ($category) {
                $query->whereIn('categories.id', $category);
            });
        }

        if($area) {
            $products->where(function($query) use ($area) {
                foreach($area as $pref) {
                    $query->orWhere('response_prefs', 'like', "%$pref%");
                }
            });
        }

        switch ($sort) {
            case ProductSortType::NEW:
                $products->orderBy('created_at', 'desc');
                break;
            default:
                break;
        }

        switch ($filter) {
            case ProductsFilterType::ALL:
                $products->whereIn('status', [ProductStatus::PUBLIC, ProductStatus::STOPPED, ProductStatus::EXPIRED]);
                break;
            case ProductsFilterType::PUBLIC:
                $products->where('status', ProductStatus::PUBLIC);
                break;
            case ProductsFilterType::STOPPED:
                $products->where('status', ProductStatus::STOPPED);
                break;
            case ProductsFilterType::FINISHED:
                $products->where('status', ProductStatus::EXPIRED);
                break;
            default:
                $products->whereIn('status', [ProductStatus::PUBLIC, ProductStatus::STOPPED, ProductStatus::EXPIRED]);
                break;
        }

        $products = $products->orderBy('reward_amount', 'desc')->paginate($this->perPage);

        return Inertia::render('User/Product/Items', [
            'products' => $products,
            'selected_category' => Category::find($category),
            'reward_filter_type' =>  RewardFilterType::getArray(),
            'products_sort_types' => ProductSortType::getArray(),
            'products_filter_types' => ProductsFilterType::getArray(),
            'category' => $category,
            'area' => $area,
            'percent' => $percent,
            'sort' => $sort,
            'filter' => $filter,
        ]);
    }

    public function show(Request $request, Product $product) {
        $user = auth('web')->user();
        $plans = Plan::where('type', $user->profile->plan->type)->get();
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
            },
            'categories',
            'attachments',
        ]);


        $otherProducts = $product->company->products()
            ->with(['company', 'categories'])
            ->whereNotIn('id', [$product->id])
            ->get();

        try {
            DB::beginTransaction();

            $history = VisitHistory::firstOrCreate([
                'user_id' => $user->id,
                'product_id' => $product->id,
            ]);
            $history->update(['visited_at' => now()]);

            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
            Log::error($e->getMessage());

            return back()->with('error', __('操作が失敗しました。'));
        }
    
        return Inertia::render('User/Product/Show', [
            'target_types' => TargetType::getArray(),
            'period_units' => PeriodUnit::getArray(),
            'plans' => $plans,
            'product' => $product,
            'otherProducts' => $otherProducts,
        ]);
    }

    public function history(Request $request)
    {
        $user = auth('web')->user();

        $products = Product::join('visit_histories', 'products.id', '=', 'visit_histories.product_id')
                            ->where('visit_histories.user_id', $user->id)
                            ->orderByDesc('visit_histories.visited_at')
                            ->select('products.*')  // productsテーブルのカラムだけを取得
                            ->with('histories')
                            ->paginate($this->perPage);
        
        return Inertia::render('User/Product/History', [
            'products' => $products,
        ]);
    }
}
