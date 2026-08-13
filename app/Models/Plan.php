<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Plan extends Model
{
    use SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'label',
        'amount',
        'reward_rate',
        'period',
        'type',
        'options',
    ];

    protected $casts = [
        'options' => 'array', 
    ];

    protected $appends = [
        'user_count'
    ];

    /**
     * =========================================================
     * Relationships
     * =========================================================
     */
    // has many relationships
    public function profiles(): HasMany
    {
        return $this->hasMany(Profile::class);
    }

    public function getUserCountAttribute() 
    {
        return $this->profiles()->count();
    }
}
