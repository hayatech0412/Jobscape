<?php

namespace App\Http\Resources;

use App\Enums\TransactionStatus;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TransactionScheduleResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        \Log::info($this->all());

        return [
            'id' => $this->id,
            'transaction_id' => $this->transaction_id,
            'status' => $this->status,
            'status_text' => TransactionStatus::$d2v[$this->status],
            'schedule_date' => date_format(date_create($this->schedule_date), 'Y/m/d H:i'),
            'change_reason' => $this->change_reason,
            'canceled_reason' => $this->canceled_reason,
            'canceled_reason_text' => $this->canceled_reason_text,
            'value' => $this->value,
            'created_at_date' => $this->created_at->format('Y/m/d H:i'),
            'updated_at_date' => $this->updated_at->format('Y/m/d H:i'),
        ];
    }
}
