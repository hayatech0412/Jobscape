<?php

namespace App\Models;

use App\Enums\ProductStatus;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Carbon\Carbon;

class Product extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'company_id',
        'name',
        'image',
        'image_path',
        'overview',
        'introduction1',
        'introduction2',
        'youtube_url',
        'response_prefs',
        'overseas',
        'target_type',
        'condition',
        'approach',
        'benefits',
        'capacity_license',
        'capacity_code',
        'product_code',
        'publish_at',
        'is_recurit_period',
        'recurit_start',
        'recurit_end',
        'apply_count',
        'introduction_type',
        'reward_type',
        'reward_amount',
        'introduction_condition',
        'introduction_memo',
        'transaction_period',
        'transaction_period_unit',
        'is_draft',
        'is_pickup',
        'status',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'publish_at' => 'datetime',
        'introduction1' => 'array',
        'introduction2' => 'array',
        'response_prefs' => 'array',
        'overseas' => 'array',
        'is_pickup' => 'boolean',
        // 'recurit_start' => 'date',
        // 'recurit_end' => 'date',
    ];

    protected $appends = [
        'images',
        'main_image',
        'left_date',
        'recurit_period',
        'rewards',
        'publish_at_label',
        'status_label',
        'apply_remainder',
        'time_left',
    ];

    /**
     * =========================================================
     * Relationships
     * =========================================================
     */
    // belongs to relationship
    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }

    // many to many relationship
    public function attachments(): BelongsToMany
    {
        return $this->belongsToMany(Attachment::class, 'product_attachments');
    }

    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(Category::class, 'product_categories');
    }

    public function visitedUsers(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'visit_histories');
    }

    public function histories(): HasMany
    {
        return $this->hasMany(VisitHistory::class)->orderByDesc('created_at');
    }

    // has many relationship
    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }

    public function payments(): HasMany
    {
        return $this->hasMany(Payment::class);
    }

    public function points(): HasMany
    {
        return $this->hasMany(Point::class);
    }

    public function deploies(): HasMany
    {
        return $this->hasMany(ProductDeploy::class);
    }

    public function faqs(): HasMany
    {
        return $this->hasMany(ProductFaq::class);
    }

    public function schedules(): HasMany
    {
        return $this->hasMany(ProductSchedule::class);
    }

    public function transactions(): HasMany
    {
        return $this->hasMany(Transaction::class);
    }

    /**
     * =========================================================
     * Local Scopes
     * =========================================================
     */
    public function scopeIsDraft(Builder $query)
    {
        $query->where('status', ProductStatus::DRAFT);
    }

    public function scopeIsPublished(Builder $query)
    {
        $query->whereNot('status', ProductStatus::DRAFT);
    }

    /**
     * =========================================================
     * Attributes
     * =========================================================
     */
    public function getImagesAttribute()
    {
        return $this->attachments->map(function ($attachment) {
            return [
                'image' => $attachment->filename,
                'image_path' => $attachment->url,
            ];
        });
    }

    public function getLeftDateAttribute()
    {
        // 有効期限
        $expireDate = Carbon::parse($this->recurit_end);
        // 現在時刻
        $now = Carbon::now();

        // 残り時間の計算
        if ($now->greaterThanOrEqualTo($expireDate)) {
            return 0;
        }

        return ceil($now->diffInDays($expireDate));
    }

    public function calculateTimeLeft()
    {
        // 有効期限
        $expireDate = Carbon::parse($this->recurit_end);

        // 現在時刻
        $now = Carbon::now();

        // 残り時間の計算
        if ($now->greaterThanOrEqualTo($expireDate)) {
            return "期限が切れています。";
        }

        $diffInDays = $now->diffInDays($expireDate);
        $diffInHours = $now->copy()->addDays($diffInDays)->diffInHours($expireDate);
        $diffInMinutes = $now->copy()->addDays($diffInDays)->addHours($diffInHours)->diffInMinutes($expireDate);

        return "{$diffInDays}日{$diffInHours}時間{$diffInMinutes}分残りました。";
    }

    public function getVisitHisoryAttribute()
    {
        if (auth('web')->check()) {
            $history = VisitHistory::where('user_id', auth('web')->user()->id)
                ->where('product_id', $this->id)
                ->first();
            return $history;
        }
        return null;
    }

    public function getRecuritPeriodAttribute()
    {
        if (!$this->is_recurit_period) {
            return "常時";
        }

        $start = Carbon::parse($this->recurit_start);
        $end = Carbon::parse($this->recurit_end);
        return $start->format('Y年m月d日') . " ~ " . $end->format('Y年m月d日');
    }

    public function getMainImageAttribute()
    {
        return $this->image_path ? asset($this->image_path) : asset('assets/images/no-photo.jpg');
    }

    public function getRewardsAttribute()
    {
        // $this->reward_amount = number_format($this->reward_amount);
        return $this->reward_type == 1 ? "￥" . number_format($this->reward_amount) : $this->reward_amount . "％";
    }

    public function getPublishAtLabelAttribute()
    {
        return Carbon::parse($this->publish_at)->format("Y年m月d日");
    }

    public function getStatusLabelAttribute()
    {
        return ProductStatus::getLabel($this->status);
    }

    public function getThumbPathAttribute()
    {
        return $this->image ? $this->image_path : asset('assets/images/no-user.png');
    }

    public function getApplyRemainderAttribute()
    {
        if ($this->apply_count == 0) {
            return "制限なし";
        }
        return $this->apply_count - $this->transactions->count();
    }

    public function scopeIsReleased(Builder $query)
    {
        return $query->whereIn('status', [ProductStatus::PUBLIC, ProductStatus::STOPPED, ProductStatus::EXPIRED]);
    }

    public function getTimeLeftAttribute()
    {
        if (!$this->recurit_end) {
            return '募集期限が設定されていません';
        }

        $now = Carbon::now();
        $expireAt = Carbon::parse($this->recurit_end);

        if ($expireAt->isPast()) {
            return '募集は終了しました';
        }

        $diff = $now->diff($expireAt);

        if ($diff->d > 0) {
            return sprintf(
                'あと%d日と%d時間%d分で募集完了',
                $diff->d,
                $diff->h,
                $diff->i
            );
        }
        return sprintf(
            'あと%d時間%d分で募集完了',
            $diff->h,
            $diff->i
        );
    }
}
