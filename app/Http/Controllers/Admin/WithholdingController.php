<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Enums\TargetType;
use App\Enums\TransactionStatus;
use App\Enums\ProductStatus;
use App\Models\User;
use App\Models\Company;
use App\Models\Withholding;
use App\Models\Transaction;
use App\Repositories\ProductRepository;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;
use Carbon\Carbon;
use DB;

class WithholdingController extends Controller
{
    protected $perPage = 10;
    protected $productRepository;

    function __construct(ProductRepository $productRepository)
    {
        $this->productRepository = $productRepository;
    }
    
    public function index(Request $request)
    {
        $year = $request->year;
        $month = $request->month;

        $query = Withholding::with('user.profile');

        if ($year && $month) {
            $query->whereYear('tax_period', $year)
                    ->whereMonth('tax_period', $month);
        }
        
        $query->orderByDesc('tax_period')
                ->orderByDesc('tax_amount');
        $results = $query->paginate($this->perPage)->withQueryString();

        return Inertia::render('Admin/Withholdings/Index', [
            'withholdings' => $results,
        ]);
    }

    public function delete(Withholding $withholding)
    {
        DB::beginTransaction();
        try {
            $withholding->delete();
            DB::commit();
        } catch (\Throwable $e) {
            DB::rollBack();
            Log::error($e->getMessage());

            return back()->with(['error', __('操作が失敗しました。')]);
        }

        return back()->with('success', __('項目を削除しました。'));
    }

}
