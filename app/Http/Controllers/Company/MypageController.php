<?php

namespace App\Http\Controllers\Company;

use App\Enums\CompanyRegistStep;
use App\Enums\ProductStatus;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MypageController extends Controller
{
    public function __construct()
    {
        // 
    }

    public function index()
    {
        return Inertia::render('Company/Mypage/Index', [
            'user' => auth('company')->user(),
            'products' => auth('company')->user()->company->products()->where('status', ProductStatus::REVIEW)->with(['categories', 'company'])->get(),
        ]);
    }
}
