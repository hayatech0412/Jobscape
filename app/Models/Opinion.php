<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Enums\UseType;

class Opinion extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'use_type',
        'use_type_other',
        'nickname',
        'title',
        'content',
    ];

    protected $appends = [
        'use_type_label',
    ];

    public function getUseTypeLabelAttribute()
    {
        if ($this->user_type == UseType::OTHER) return $this->use_type_other;
        return UseType::getLabel($this->use_type);
    }

}
