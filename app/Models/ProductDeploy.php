<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductDeploy extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'product_deploies';

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'product_id',
        'deploy_name',
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
