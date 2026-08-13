<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Enums\WithDrawalStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Withdrawal extends Model
{
    use SoftDeletes, HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'withdraw_at',
        'amount',
        'request_amount',
        'amount_fee',
        'tax_amount',
        'bank_name',
        'account_type',
        'account_code',
        'shop_code',
        'account_last_name',
        'account_first_name',
        'status',
    ];

    protected $appends = [
        'status_label',
    ];

    /**
     * =========================================================
     * Relationships
     * =========================================================
     */
    // belongs to relationships
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function getStatusLabelAttribute()
    {
        return WithDrawalStatus::getLabel($this->status);
    }
}
