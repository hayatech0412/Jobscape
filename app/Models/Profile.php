<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use App\Enums\TransactionStatus;
use App\Enums\WithDrawalStatus;
use Carbon\Carbon;

class Profile extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'plan_id',
        'payment_method_id',
        'step',
        'nickname',
        'phone_number',
        'sms_verify_code',
        'sms_verify_code_expire_at',
        'sms_verified_at',
        'subscription_id',
        'subscribed_at',
        'subscription_status',
        'is_trial',
        'trial_end_at',
        'vite_code',
        'user_type',
        'appeal_statement',
        'introduction',
        'extra_email',
        'first_name',
        'last_name',
        'first_kana',
        'last_kana',
        'post_number',
        'pref',
        'city',
        'area',
        'street',
        'building',
        'birthday',
        'gender',
        'prefectures',
        'card_number',
        'limit_at',
        'security_code',
        'payment_type',
        'is_notify',
        'is_monitor',
        'business_company_name',
        'business_name',
        'business_kana',
        'business_number',
        'business_post_number',
        'business_pref',
        'business_city',
        'business_area',
        'business_street',
        'business_building',
        'business_phone_number',
        'business_invoice_number',
        'business_master_first_name',
        'business_master_last_name',
        'business_master_first_kana',
        'business_master_last_kana',
        'country',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var list<string, string>
     */
    protected $casts = [
        'birthday' => 'datetime',
        'is_notify' => 'bool',
        'is_monitor' => 'bool',
        'prefectures' => 'json',
        'sms_verify_code_expire_at' => 'datetime',
        'sms_verified_at' => 'datetime',
        'subscribed_at' => 'datetime',
        'trial_end_at' => 'datetime',
    ];

    protected $appends = [
        'amount',
        'full_name',
        'display_name',
        'month_amount',
        'transaction_total_count',
        'transaction_requested_count',
        'transaction_responding_count',
        'transaction_accepted_count',
        'transaction_rejected_count',
        'transaction_complete_count',
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

    public function plan(): BelongsTo
    {
        return $this->belongsTo(Plan::class);
    }

    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(Category::class, 'profile_categories');
    }

    public function getPrefecturesAttribute($value)
    {
        return json_decode($value, true);
    }

    public function setPrefecturesAttribute($value)
    {
        $this->attributes['prefectures'] = json_encode($value);
    }

    public function getAmountAttribute()
    {
        // dd($this->user->transactions()->sum('total_amount'));
        $amount_sum = 0;
        $withdrawal_sum = 0;

        if ($this->user) {
            $amount_sum = $this->user->transactions()->where('status', TransactionStatus::COMPLETE)->sum('total_amount');
            $withdrawal_sum = $this->user->withdrawals()->where('status', WithDrawalStatus::APPROVED)->sum('request_amount');
        }
        return $amount_sum - $withdrawal_sum;
    }

    public function getMonthAmountAttribute()
    {
        $currentMonth = Carbon::now()->month;
        $currentYear = Carbon::now()->year;

        $amountSum = 0;

        if ($this->user) {
            $amountSum = $this->user->transactions()
                        ->whereYear('completed_at', $currentYear)
                        ->whereMonth('completed_at', $currentMonth)
                        ->sum('total_amount');
        }

        return $amountSum;
    }

    public function getTransactionTotalCountAttribute()
    {
        $count = 0;
        if ($this->user) {
            $count = $this->user->transactions()->count();
        }
        return $count;
    }

    public function getTransactionRequestedCountAttribute()
    {
        $count = 0;
        if ($this->user) {
            $count = $this->user->transactions()
                ->where('status', TransactionStatus::REQUESTED)
                ->count();
        }
        return $count;
    }

    public function getTransactionRespondingCountAttribute()
    {
        $count = 0;
        if ($this->user) {
            $count = $this->user->transactions()
                ->where('status', TransactionStatus::RESPONDING)
                ->count();
        }
        return $count;
    }

    public function getTransactionAcceptedCountAttribute()
    {
        $count = 0;
        if ($this->user) {
            $count = $this->user->transactions()
                ->where('status', TransactionStatus::ACCEPTED)
                ->count();
        }
        return $count;
    }

    public function getTransactionRejectedCountAttribute()
    {
        $count = 0;
        if ($this->user) {
            $count = $this->user->transactions()
                ->where('status', TransactionStatus::REJECTED)
                ->count();
        }
        return $count;
    }

    public function getTransactionCompleteCountAttribute()
    {
        $count = 0;
        if ($this->user) {
            $count = $this->user->transactions()
                ->where('status', TransactionStatus::COMPLETE)
                ->count();
        }
        return $count;
    }

    public function getDisplayNameAttribute()
    {
        return $this->nickname ?? $this->last_name . ' ' . $this->first_name;
    }

    public function getFullNameAttribute()
    {
        return $this->last_name . ' ' . $this->first_name;
    }

    public function paymentMethod()
    {
        return $this->hasOne(PaymentMethod::class);
    }
}
