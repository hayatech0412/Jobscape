<?php

namespace App\Repositories;

use App\Enums\TransactionScheduleValues;
use App\Enums\ProductsFilterType;
use App\Enums\ProductSortType;
use App\Enums\ProductStatus;
use App\Enums\TransactionStatus;
use App\Models\Company;
use Illuminate\Support\Facades\DB;

class CompanyRepository extends BaseRepository implements CompanyRepositoryInterface
{
    public function model()
    {
        return Company::class;
    }

    public function search($request)
    {
        $query = $this->model->query();
        $sort  = $request->input('sort', ProductSortType::RECOMMEND);
        $filter  = $request->input('filter', ProductsFilterType::ALL);
        $category  = $request->input('category', []);
        $area  = $request->input('area', []);

        // 1度だけ whereHas('products') を使用
        $query->whereHas('products', function ($query) use ($filter, $category, $area) {
            if ($category) {
                // products.categories 経由でカテゴリフィルタリング
                $query->whereHas('categories', function ($query) use ($category) {
                    $query->whereIn('categories.id', $category); // categories.id と明記
                });
            }

            if($area) {
                $query->where(function($query) use ($area) {
                    foreach($area as $pref) {
                        $query->orWhere('response_prefs', 'like', "%$pref%");
                    }
                });
            }

            // フィルタリング
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
        });

        // 作成日順でソート
        $query->orderBy('created_at', 'desc');

        // 関連する Product を最大10件までロード
        $query->with([
            'products' => function ($query) use ($category, $filter, $area) {
                if ($category) {
                    // categories でフィルタリング
                    $query->whereHas('categories', function ($query) use ($category) {
                        $query->where('categories.id', $category); // categories.id と明記
                    });
                }

                if($area) {
                    $query->where(function($query) use ($area) {
                        foreach($area as $pref) {
                            $query->orWhere('response_prefs', 'like', "%$pref%");
                        }
                    });
                }

                // フィルタリング
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

                $query->take(10); // 最大10件に制限
                $query->with('categories'); // products に関連する categories も一緒にロード
            },
        ]);

        // 関連する user をロード
        $query->with('user');

        // ページネーション
        return $query->paginate(5)->withQueryString();
    }

}
