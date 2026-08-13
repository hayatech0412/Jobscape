<?php

namespace App\Http\Controllers\Company;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Transaction;
use App\Enums\TransactionStatus;
use App\Http\Resources\TransactionResource;

class PaymentController extends Controller
{
    protected $perPage = 10;

    public function index(Request $request)
    {
        $query = Transaction::query()
            ->whereHas('product', function($query) {
                $query->where('company_id', auth('company')->user()->company->id);
            })
            ->with(['product', 'user.profile'])
            ->orderByDesc('created_at');

        $transactions = TransactionResource::collection($query->paginate($this->perPage)->withQueryString());

        return Inertia::render('Company/Payments/Index', [
            'transactions' => $transactions,
            'statuses' => TransactionStatus::getArray(),
        ]);
    }
}
