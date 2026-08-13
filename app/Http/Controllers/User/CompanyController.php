<?php

namespace App\Http\Controllers\User;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Enums\ProductsFilterType;
use App\Enums\ProductSortType;
use App\Enums\RewardFilterType;
use App\Http\Controllers\Controller;
use App\Http\Resources\CompanyListCollection;
use App\Repositories\CompanyRepository;

class CompanyController extends Controller
{
    protected $companyRepository;

    function __construct(CompanyRepository $companyRepository)
    {
        $this->companyRepository = $companyRepository;
    }

    public function index(Request $request)
    {
        $companies = new CompanyListCollection($this->companyRepository->search($request));

        return Inertia::render('User/Company/Index', [
            'companies' => $companies,
            'products_filter_types' =>  ProductsFilterType::getArray(),
            'products_sort_types' =>  ProductSortType::getArray(),
            'reward_filter_type' =>  RewardFilterType::getArray(),
        ]);
    }
}
