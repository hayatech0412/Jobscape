<?php

namespace App\Repositories;

use App\Enums\TransactionScheduleValues;
use App\Enums\TransactionStatus;
use App\Models\Transaction;
use App\Models\TransactionSchedule;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class TransactionRepository extends BaseRepository implements TransactionRepositoryInterface
{
    public function model()
    {
        return Transaction::class;
    }
    
    public function getOrders($request)
    {
        $query = $this->model->with(['product', 'user.profile']);
        $query->whereHas('product', function($query) {
            $query->where('company_id', auth('company')->user()->company->id);
        });

        if ($request->duration == 1) {
            $query->where('created_at', '>=', now()->subWeek());
        } elseif ($request->duration == 2) {
            $query->where('created_at', '>=', now()->subMonth());
        }
        if ($request->status != null && $request->status != "9") {
            $query->where('status', $request->status);
        }

        return $query;
    }

    function response($id, $request) {
        $transaction = $this->model->find($id);
        DB::beginTransaction();
        try {
            $targetStatus = $request->value == TransactionScheduleValues::ACCEPTED ? TransactionStatus::RESPONDING : TransactionStatus::REQUESTED;
            $schedule = TransactionSchedule::firstOrCreate([
                'transaction_id' => $transaction->id,
                'status' => TransactionStatus::REQUESTED,
            ]);
            
            if ($targetStatus == TransactionStatus::RESPONDING) {
                $transaction->update([
                    'status' => $targetStatus,
                    'not_complete_reason' => null,
                ]);
                $schedule->update([
                    'value' => $request->value,
                    'canceled_reason' => null,
                    'change_reason' => null,
                    'schedule_date' => now(),
                ]);
            } else {
                $transaction->update([
                    'status' => $targetStatus,
                    'not_complete_reason' => $request->canceled_reason,
                ]);
                $schedule->update([
                    'value' => $request->value,
                    'canceled_reason' => $request->canceled_reason,
                    'change_reason' => $request->change_reason,
                    'schedule_date' => now(),
                ]);
            }
            DB::commit();
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            DB::rollBack();
            throw $e;
            return null;
        }
        return $transaction;
    }

    function success($id, $request) {
        DB::beginTransaction();
        $transaction = $this->model->find($id);
        try {
            $transaction->update([
                'status' => TransactionStatus::ACCEPTED,
                'not_complete_reason' => null,
                'not_complete_reason_detail' => null,
                'accepted_at' => $request->accepted_at,
                'total_amount' => $request->total_amount,
                'sales_amount' => $request->sales_amount,
                'fee_amount' => $request->fee_amount,
                'bill_amount' => $request->bill_amount,
            ]);

            $schedule = $transaction->schedules()->firstOrCreate([
                'transaction_id' => $transaction->id,
                'status' => TransactionStatus::RESPONDING,
            ]);
            $schedule->update([
                'value' => $request->value,
                'canceled_reason' => null,
                'change_reason' => null,
                'schedule_date' => $request->accepted_at,
            ]);
            DB::commit();
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            DB::rollBack();
            throw $e;
            return null;
        }

        return $transaction;
    }

    function fail($id, $request) {
        DB::beginTransaction();
        $transaction = $this->model->find($id);
        try {
            $transaction->update([
                'status' => TransactionStatus::REJECTED,
                'not_complete_reason' => $request->canceled_reason,
                'not_complete_reason_detail' => $request->change_reason,
                'total_amount' => 0,
                'sales_amount' => 0,
                'fee_amount' => 0,
                'bill_amount' => 0,
            ]);

            $schedule = $transaction->schedules()->firstOrCreate([
                'transaction_id' => $transaction->id,
                'status' => TransactionStatus::RESPONDING,
            ]);
            $schedule->update([
                'value' => $request->value,
                'canceled_reason' => $request->canceled_reason,
                'change_reason' => $request->change_reason,
                'schedule_date' => now(),
            ]);

            DB::commit();
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            DB::rollBack();
            throw $e;
            return null;
        }

        return $transaction;
    }

    function reportPayed($id, $request) {
        DB::beginTransaction();
        try {
            $transaction = $this->model->find($id);
            $transaction->update([
                'status' => TransactionStatus::COMPLETE,
                'completed_at' => now(),
            ]);

            $schedule = $transaction->schedules()->create([
                'transaction_id' => $id, 
                'status' => TransactionStatus::ACCEPTED]
            );
            $schedule->update([
                'schedule_date' => now(),
                'value' => 1
            ]);
            
            DB::commit();
            return $transaction;
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            DB::rollBack();
            throw $e;
            return null;
        }
    }

    function proposeUpdate($id, $request) {
        DB::beginTransaction();
        $transaction = $this->model->find($id);

        try {
            $transaction->update([
                'propose_updated_at' => now(),
                'proposed_at' => $request->proposed_at,
                'propose_update_reason' => $request->propose_update_reason,
            ]);
            
            DB::commit();
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            DB::rollBack();
            throw $e;
            return null;
        }
        
        return $transaction;
    }
}
