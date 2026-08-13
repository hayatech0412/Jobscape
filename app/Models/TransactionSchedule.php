<?php

namespace App\Models;

use App\Enums\NoResponseReason;
use App\Enums\NotCompleteReason;
use Illuminate\Database\Eloquent\Model;

class TransactionSchedule extends Model
{
    protected $fillable = [
        'transaction_id',
        'schedule_date',
        'change_reason',
        'canceled_reason',
        'status',
        'value',
    ];

    protected $appends = [
        'canceled_reason_text'
    ];

    public function transaction()
    {
        return $this->belongsTo(Transaction::class);
    }

    public function getCanceledReasonTextAttribute()
    {
        if ($this->canceled_reason) {
            switch ($this->status) {
                case 0:
                    return NoResponseReason::getLabel($this->canceled_reason);
                case 1:
                    return NotCompleteReason::getLabel($this->canceled_reason);
                
                default:
                    # code...
                    break;
            }
            return '';
        }
    }
}
