<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BankAccount extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'bank_name',
        'account_type',
        'account_code',
        'shop_code',
        'account_last_name',
        'account_first_name',
    ];

    /**
     * The attributes that are mass cast.
     *
     * @var list<string, string>
     */
    protected $casts = [
        'withdraw_at' => 'datetime',
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
}
