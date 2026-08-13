<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductSchedule extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'product_id',
        'order',
        'start_amount',
        'start_unit',
        'end_amount',
        'end_unit',
        'title',
    ];

    protected $appends = [
        'from',
        'to'
    ];

    /**
     * =========================================================
     * Relationships
     * =========================================================
     */
    // belongs to relationships
    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    // attributes
    public function getFromAttribute()
    {
        return $this->start_amount . $this->start_unit;
    }

    public function getToAttribute()
    {
        return $this->end_amount . $this->end_unit;
    }
}
