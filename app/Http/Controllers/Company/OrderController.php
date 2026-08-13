<?php

namespace App\Http\Controllers\Company;

use App\Enums\FilterDurationOptions;
use App\Enums\FilterServiceType;
use App\Enums\NotCompleteReason;
use App\Enums\NoResponseReason;
use App\Enums\TransactionStatus;
use App\Http\Controllers\Controller;
use App\Http\Resources\TransactionResource;
use App\Repositories\TransactionRepository;
use App\Services\NotificationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    protected $transactionRepository;
    protected $perPage = 10;

    function __construct(TransactionRepository $transactionRepository, NotificationService $notificationService)
    {
        parent::__construct($notificationService);
        $this->transactionRepository = $transactionRepository;
    }
    //
    public function index(Request $request)
    {
        $query = $request->query();
        return inertia('Company/Orders/Index', [
            'filter_durations' => FilterDurationOptions::getArray(),
            'filter_types' => FilterServiceType::getArray(),
            'statuses' => TransactionStatus::getArray(),
            'results' => $this->getOrders($request),
            'query' => $query,
            'headers' => [
                [
                    'text' => '取引ID',
                    'value' => 'code',
                ],
                [
                    'text' => '商材名',
                    'value' => 'name',
                ],
                [
                    'text' => '対応状況',
                    'value' => 'status',
                ],
                [
                    'text' => '紹介者',
                    'value' => 'referrer',
                ],
                [
                    'text' => '特記事項',
                    'value' => 'note',
                ],
                [
                    'text' => '紹介手数料',
                    'value' => 'commission',
                ],
                [
                    'text' => '最終支払期間',
                    'value' => 'last_payed_date',
                ],
                [
                    'text' => '入金状況',
                    'value' => 'payed_status_text',
                ],
            ],
        ]);
    }

    public function show(Request $request, $id)
    {
        return inertia('Company/Orders/Show', [
            'order' => $this->getOrdersById($id),
            'notCompleteReasons' => NotCompleteReason::getArray(),
            'noResponseReasons' => NoResponseReason::getArray(),
            'tax_rate' => config('values.tax_rate'),
            'service_fee_rate' => config('values.service_fee_rate'),
            'period_units' => \App\Enums\PeriodUnit::getArray(),
        ]);
    }

    public function update(Request $request, $id) {
        return redirect()->route('company.orders.show', $id);
    }

    function response(Request $request, $id) {
        $transaction = $this->transactionRepository->response($id, $request);

        $sourceUser = auth('company')->user();        
        $notification = $this->notificationService->sendTransactionResponseNotification($sourceUser, $transaction);
        return back()->with(['status' => $transaction->status]);
    }

    function success(Request $request, $id) {
        $transaction = $this->transactionRepository->success($id, $request);

        $sourceUser = auth('company')->user();        
        $notification = $this->notificationService->sendTransactionSuccessNotification($sourceUser, $transaction);

        return back()->with(['status' => $transaction->status]);
    }

    function fail(Request $request, $id) {
        $transaction = $this->transactionRepository->fail($id, $request);

        $sourceUser = auth('company')->user();        
        $notification = $this->notificationService->sendTransactionFailNotification($sourceUser, $transaction);

        return back()->with(['status' => $transaction->status]);
    }

    function reportPayed(Request $request, $id) {
        $transaction = $this->transactionRepository->reportPayed($id, $request);

        $sourceUser = auth('company')->user();        
        $notification = $this->notificationService->sendTransactionPayedNotification($sourceUser, $transaction);

        return back()->with(['status' => $transaction->status]);
    }

    function proposeUpdate(Request $request, $id) {
        $transaction = $this->transactionRepository->proposeUpdate($id, $request);

        $sourceUser = auth('company')->user();        
        $notification = $this->notificationService->sendTransactionProposeUpdateNotification($sourceUser, $transaction);

        return back()->with(['success' => '取引完了予定日が更新されました。']);
    }

    public function getOrders(Request $request)
    {
        return TransactionResource::collection($this->transactionRepository->getOrders($request)->paginate($this->perPage));
    }

    public function getOrdersById($id)
    {
        return new TransactionResource($this->transactionRepository->find($id));
    }
}
