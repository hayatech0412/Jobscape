<?php

namespace App\Http\Resources;

use App\Enums\TransactionStatus;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TransactionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'user' => $this->when($this->user, fn() => new UserResource($this->user)),
            'product' => $this->when($this->product, fn() => new ProductResource($this->product)),
            'productSchedules' => ScheduleResource::collection($this->product->schedules),
            'schedules' => TransactionScheduleResource::collection($this->schedules),
            'product_id' => $this->product_id,
            'code' => $this->code,
            'name' => $this->product->name,
            'status' => $this->status,
            'status_text' => TransactionStatus::$d2v[$this->status],
            'referrer' => $this->user->profile ? $this->user->profile->first_name . ' ' . $this->user->profile->last_name : '',
            'referrer_kana' => $this->user->profile ? $this->user->profile->first_kana . ' ' . $this->user->profile->last_kana : '',
            'note' => $this->user_memo,
            'commission' => $this->fee_amount,
            'last_payment_period' => $this->completed_at,
            'accepted_at' => $this->accepted_at,
            'completed_at' => $this->completed_at,
            'proposed_at' => $this->proposed_at,
            'propose_updated_at' => $this->propose_updated_at,
            'propose_update_reason' => $this->propose_update_reason,
            'total_amount' => $this->total_amount,
            'bill_amount' => $this->bill_amount,
            'fee_amount' => $this->fee_amount,
            'sales_amount' => $this->sales_amount,
            'created_at_date' => $this->created_at->format('Y/m/d H:i'),
            'updated_at_date' => $this->updated_at->format('Y/m/d H:i'),
            'last_payed_date' => $this->last_payed_date,
            'payed_status_text' => $this->payed_status_text,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
