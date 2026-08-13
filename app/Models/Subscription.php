<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Subscription extends Model
{
    protected $fillable = [
        'user_id',
        'plan_id',
        'plan_type',
        'gmo_access_id',
        'gmo_access_pass',
        'gmo_order_id',
        'amount',
        'tax',
        'status',
        'subscribed_at',
        'cancelled_at',
        'expired_at'
    ];

    protected $casts = [
        'subscribed_at' => 'datetime',
        'cancelled_at' => 'datetime',
        'expired_at' => 'datetime',
        'amount' => 'decimal:2',
        'tax' => 'decimal:2'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function plan(): BelongsTo
    {
        return $this->belongsTo(Plan::class);
    }
} 