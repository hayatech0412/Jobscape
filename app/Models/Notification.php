<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Auth;

class Notification extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'source_id',
        'target_id',
        'product_id',
        'title',
        'content',
        'open_ids',
        'is_read',
        'read_ids',
    ];

    // The attributes that should be cast.
    protected $casts = [
        'open_ids' => 'array',
        'read_ids' => 'array',
    ];

    // The attributes that should be appended.
    protected $appends = [
        'is_read_by_auth',
        'created_at_jp',
    ];

    /**
     * =========================================================
     * Relationships
     * =========================================================
     */
    // belongs to relationships
    public function source(): BelongsTo
    {
        return $this->belongsTo(User::class, 'source_id');
    }

    public function target(): BelongsTo
    {
        return $this->belongsTo(User::class, 'target_id');
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    /**
     * =========================================================
     * Attributes
     * =========================================================
     */
    public function getIsReadByAuthAttribute()
    {
        // if (!Auth::check()) return false;
        // $user = Auth::user();

        $user = auth('web')->check() ? auth('web')->user() :
                (auth('company')->check() ? auth('company')->user() :
                (auth('admin')->check() ? auth('admin')->user() : null));

        $readIds = $this->read_ids ?? [];

        return in_array($user->id, $readIds);
    }

    public function getCreatedAtJpAttribute()
    {
        return $this->created_at->format('Y年m月d日 H:i');
    }

    /**
     * =========================================================
     * Scopes
     * =========================================================
     */
    public function scopeUnread($query, $userId)
    {
        return $query->where(function ($subquery) use ($userId) {
            $subquery->whereJsonDoesntContain('read_ids', $userId)
                ->orWhereNull('read_ids');
        });
    }

    public function scopeUnopened($query, $userId)
    {
        return $query->where(function ($subquery) use ($userId) {
            $subquery->whereJsonDoesntContain('open_ids', $userId)
                ->orWhereNull('open_ids');
        });
    }
}
