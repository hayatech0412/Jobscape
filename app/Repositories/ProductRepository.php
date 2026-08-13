<?php

namespace App\Repositories;

use App\Enums\TransactionScheduleValues;
use App\Enums\ProductsFilterType;
use App\Enums\RewardFilterType;
use App\Enums\ProductSortType;
use App\Enums\ProductStatus;
use App\Enums\TransactionStatus;
use App\Models\Product;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class ProductRepository extends BaseRepository implements ProductRepositoryInterface
{
    public $perpage = 10;

    public function model()
    {
        return Product::class;
    }

    public function filter($query)
    {
        $sort  = request()->get('sort', ProductSortType::RECOMMEND);
        $filter  = request()->get('filter', ProductsFilterType::ALL);
        $percent  = request()->get('percent', RewardFilterType::ALL);

        switch ($filter) {
            case ProductsFilterType::ALL:
                $query->whereIn('status', [ProductStatus::PUBLIC, ProductStatus::STOPPED, ProductStatus::EXPIRED]);
                break;
            case ProductsFilterType::PUBLIC:
                $query->where('status', ProductStatus::PUBLIC);
                break;
            case ProductsFilterType::STOPPED:
                $query->where('status', ProductStatus::STOPPED);
                break;
            case ProductsFilterType::FINISHED:
                $query->where('status', ProductStatus::EXPIRED);
                break;
            default:
                $query->whereIn('status', [ProductStatus::PUBLIC, ProductStatus::STOPPED, ProductStatus::EXPIRED]);
                break;
        }

        return $query->take($this->perpage)->get();
    }

    public function getHighPercentProducts($request)
    {
        $query = $this->model->isReleased();
        $sort  = $request->input('sort', ProductSortType::RECOMMEND);
        $filter  = $request->input('filter', ProductsFilterType::ALL);
        $percent  = $request->input('percent', RewardFilterType::ALL);

        $query->where('reward_type', \App\Enums\RewardType::PERCENT)
                ->orderBy('reward_amount', 'desc')
                ->with('company')
                ->with('categories')
                ->take($this->perpage);
        // ページネーション
        return $query->get();
    }

    public function getInterestedProducts($request)
    {
        $user = \Auth::guard('web')->user();
        $userCategoryIds = $user->profile->categories->pluck('id');

        $matchingProducts = $this->model->isReleased()
                            ->with('categories')
                            ->with('company')
                            ->whereHas('categories', function ($query) use ($userCategoryIds) {
                                $query->whereIn('categories.id', $userCategoryIds);
                            })
                            ->withCount(['categories as matching_categories_count' => function ($query) use ($userCategoryIds) {
                                $query->whereIn('categories.id', $userCategoryIds);
                            }])
                            ->orderByDesc('matching_categories_count')
                            ->orderByDesc('created_at')
                            ->take($this->perpage) // 最大10件取得
                            ->get();

        // 不足分を一般商材で補充
        $missingCount = $this->perpage - $matchingProducts->count();
        if ($missingCount > 0) {
            $generalProducts = $this->model->isReleased()
                ->where(function($query) use ($userCategoryIds) {
                    $query->whereDoesntHave('categories') // カテゴリがない商品
                    ->orWhereDoesntHave('categories', function ($query) use ($userCategoryIds) {
                        $query->whereIn('categories.id', $userCategoryIds);
                    });
                })                    
                ->orderByDesc('created_at')
                ->take($missingCount)
                ->get();

            $matchingProducts = $matchingProducts->merge($generalProducts);
        }

        return $matchingProducts;
    }

    public function getPickupProducts($request)
    {
        $query = $this->model->isReleased();

        $query->where('is_pickup', true)
                ->orderBy('created_at', 'desc')
                ->with('company')
                ->with('categories')
                ->take($this->perpage);
        // ページネーション
        return $query->get();
    }

    public function getRealtimeProducts($request)
    {
        $query = $this->model->isReleased();

        $query->where('is_pickup', true)
                ->orderBy('reward_amount', 'desc')
                ->with('company')
                ->with('categories')
                ->take($this->perpage);
        // ページネーション
        return $query->get();
    }

    public function getExpiringProducts($request)
    {
        $threeDaysFromNow = Carbon::now()->addDays(3);

        $query = $this->model->isReleased();
        $products = $query->where('recurit_end', '>=', Carbon::now()) // 現在以降
                            ->where('recurit_end', '<=', $threeDaysFromNow) // 3日以内
                            ->orderBy('recurit_end', 'asc') // 掲載期間終了が近い順
                            ->take($this->perpage)->get();

        return $products;
    }

    public function getFeaturedCotents($request)
    {
        $query = $this->model->isReleased();
        $sort  = $request->input('sort', ProductSortType::RECOMMEND);
        $filter  = $request->input('filter', ProductsFilterType::ALL);
        $percent  = $request->input('percent', RewardFilterType::ALL);

        $query->where('is_pickup', true)
                ->orderBy('reward_amount', 'desc')
                ->with('company')
                ->with('categories')
                ->take($this->perpage);
        // ページネーション
        return $query->get();
    }

    public function getAllProducts($request)
    {
        $query = $this->model->isReleased();
        $sort  = $request->input('sort', ProductSortType::RECOMMEND);
        $filter  = $request->input('filter', ProductsFilterType::ALL);
        $percent  = $request->input('percent', RewardFilterType::ALL);

        $query->where('is_pickup', true)
                ->orderBy('reward_amount', 'desc')
                ->with('company')
                ->with('categories')
                ->take(30);
        // ページネーション
        return $query->get();
    }

}
