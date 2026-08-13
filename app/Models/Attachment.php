<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Attachment extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'filename',
        'url',
        'size',
    ];

    /**
     * =========================================================
     * Relationships
     * =========================================================
     */
    // many to many polymorphic relationship
    public function products(): BelongsToMany
    {
        return $this->belongsToMany(Product::class, 'product_attachments');
    }
}
