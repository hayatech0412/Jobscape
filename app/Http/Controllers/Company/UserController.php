<?php

namespace App\Http\Controllers\Company;

use App\Enums\UserStatus;
use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use App\Models\Profile;
use App\Models\Transaction;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function search($category = null, $startDate = null, $endDate = null, $status = null)
    {
        $companyUser = User::find(auth('company')->user()->id);
        if ($companyUser->has('company')) {
            $userQuery = User::whereIn('id', function ($query) use ($companyUser) {
                $query->select('user_id')
                    ->from(with(new Transaction())->getTable())
                    ->whereIn('product_id', function ($subquery) use ($companyUser) {
                        $subquery->select('id')
                            ->from(with(new Product())->getTable())
                            ->where('company_id', $companyUser->company->id);
                    });
            });

            if ($category) {
                $userQuery->whereHas('profile', function ($query) use ($category) {
                    $query->whereHas('categories', function ($subquery) use ($category) {
                        $subquery->where('category_id', $category);
                    });
                });
            }

            if ($startDate) {
                $userQuery->whereHas('transactions', function ($query) use ($startDate, $companyUser) {
                    $query->whereIn('product_id', function ($subquery) use ($companyUser) {
                        $subquery->select('id')
                            ->from(with(new Product())->getTable())
                            ->where('company_id', $companyUser->company->id);
                    })
                        ->where('updated_at', '>=', Carbon::parse($startDate));
                });
            }
            if ($endDate) {
                $userQuery->whereHas('transactions', function ($query) use ($endDate, $companyUser) {
                    $query->whereIn('product_id', function ($subquery) use ($companyUser) {
                        $subquery->select('id')
                            ->from(with(new Product())->getTable())
                            ->where('company_id', $companyUser->company->id);
                    })
                        ->where('updated_at', '<=', Carbon::parse($endDate));
                });
            }

            $userQuery->where('status', $status ?? 0);

            return $userQuery->with('profile.categories')->paginate(20);
        }

        return [];
    }

    public function index(Request $request)
    {
        $category = $request->get('category');
        $startDate = $request->get('startDate');
        $endDate = $request->get('endDate');
        $status = $request->get('status');

        $users = $this->search($category, $startDate, $endDate, $status);

        return Inertia::render('Company/Users/Index', [
            'users' => $users,
            'statusList' => UserStatus::getArray(),
            'categories' => Category::all(),
            'paramCategory' => $category ?? 0,
            'paramStatus'   => $status ?? 0,
            'paramStartDate' => $startDate,
            'paramEndDate'   => $endDate,
        ]);
    }

    public function show(Request $request, User $user)
    {
        return Inertia::render('Company/Users/Show', [
            'user' => $user,
            'categories' => Category::get(),
            'category_ids' => $user->profile->categories->pluck('id')->toArray(),
            'area_categories' => config('values.area_categories'),
        ]);
    }
}
