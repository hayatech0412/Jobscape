<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductFaq extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'product_id',
        'question',
        'answer',
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
}
