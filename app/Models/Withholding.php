<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Enums\WithholdingPaidStatus;

class Withholding extends Model
{
    use SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id', 
        'total_earnings', 
        'tax_amount', 
        'tax_period', 
        'is_paid'
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
        return WithholdingPaidStatus::getLabel($this->is_paid);
    }

}
