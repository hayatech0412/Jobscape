<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CompanyManager extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'company_id',
        'first_name',
        'last_name',
        'first_kana',
        'last_kana',
        'phone_number',
        'email',
        'card_front',
        'card_front_path',
        'card_back',
        'card_back_path',
    ];

    protected $appends = [
        'full_name',
        'full_name_kana',
    ];

    /**
     * =========================================================
     * Relationships
     * =========================================================
     */
    // belongs to relationships
    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }

    // attributes
    public function getFullNameAttribute(): string
    {
        return $this->first_name . ' ' . $this->last_name;
    }

    public function getFullNameKanaAttribute(): string
    {
        return $this->first_kana . ' ' . $this->last_kana;
    }

    
}
