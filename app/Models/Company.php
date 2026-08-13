<?php

namespace App\Models;

use App\Enums\BusinessType;
use App\Enums\OfficeType;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;

class Company extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'regist_step',
        'nickname',
        'coporate_code',
        'coporate_name',
        'coporate_kana',
        'postal_code',
        'pref',
        'city',
        'area',
        'street',
        'building',
        'pref_kana',
        'city_kana',
        'area_kana',
        'street_kana',
        'building_kana',
        'phone_number',
        'first_name',
        'last_name',
        'first_kana',
        'last_kana',
        'site_url',
        'pamphlet',
        'pamphlet_path',
        'invoice_number',
        'operator_type',
        'office_type',
        'office_name',
        'office_name_kana',
        'office_postal_code',
        'office_pref',
        'office_city',
        'office_area',
        'office_street',
        'office_building',
        'office_phone_number',
        'office_master_first_name',
        'office_master_last_name',
        'office_master_first_kana',
        'office_master_last_kana',
        'employee_count',
        'earning_amount',
        'category_id',
        'overview',
        'summary',
    ];

    protected $appends = [
        'full_name',
        'full_kana',
        'full_address',
        'full_kana_address',
        'full_office_name',
        'full_office_kana_name',
        'full_office_address',
        'full_office_kana_address',
        'full_office_master_name',
        'full_office_master_kana_name',
        'full_office_master_address',
        'full_office_master_kana_address',
        'office_type_name',
        'performance_count',
        'business_type_label',
        'operator_type_label',
        'month_sales',
        'total_sales',
        'final_payment_deadline',
        'final_payment_deadline_amount',
    ];

    /**
     * =========================================================
     * Relationships
     * =========================================================
     */
    // belongs to relationship
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function main_category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    // has many relationship
    public function products(): HasMany
    {
        return $this->hasMany(Product::class);
    }

    public function managers(): HasMany
    {
        return $this->hasMany(CompanyManager::class);
    }

    public function transactions(): HasManyThrough
    {
        return $this->hasManyThrough(Transaction::class, Product::class);
    }

    // attributes
    public function getFullNameAttribute(): string
    {
        return $this->last_name . ' ' . $this->first_name ?? '';
    }

    public function getFullKanaAttribute(): string
    {
        return $this->last_kana . ' ' . $this->first_kana ?? '';
    }

    public function getFullAddressAttribute(): string
    {
        return $this->pref . $this->city . $this->area . $this->street . $this->building ?? '';
    }

    public function getFullKanaAddressAttribute(): string
    {
        return $this->pref_kana . $this->city_kana . $this->area_kana . $this->street_kana . $this->building_kana ?? '';
    }

    public function getFullOfficeNameAttribute(): string
    {
        return $this->office_name ?? '';
    }

    public function getFullOfficeKanaNameAttribute()
    {
        return $this->office_name_kana ?? '';
    }

    public function getFullOfficeAddressAttribute(): string
    {
        return $this->office_pref . $this->office_city . $this->office_area . $this->office_street . $this->office_building ?? '';
    }

    public function getFullOfficeKanaAddressAttribute(): string
    {
        return $this->office_pref_kana . $this->office_city_kana . $this->office_area_kana . $this->office_street_kana . $this->office_building_kana ?? '';
    }

    public function getFullOfficeMasterNameAttribute(): string
    {
        return $this->office_master_last_name . ' ' . $this->office_master_first_name ?? '';
    }

    public function getFullOfficeMasterKanaNameAttribute(): string
    {
        return $this->office_master_last_kana . ' ' . $this->office_master_first_kana ?? '';
    }

    public function getFullOfficeMasterAddressAttribute(): string
    {
        return $this->office_master_pref . $this->office_master_city . $this->office_master_area . $this->office_master_street . $this->office_master_building ?? '';
    }

    public function getFullOfficeMasterKanaAddressAttribute(): string
    {
        return $this->office_master_pref_kana . $this->office_master_city_kana . $this->office_master_area_kana . $this->office_master_street_kana . $this->office_master_building_kana ?? '';
    }

    public function getOfficeTypeNameAttribute(): string
    {
        return OfficeType::getLabel($this->office_type);
    }

    public function getBusinessTypeLabelAttribute(): string
    {
        return BusinessType::getLabel($this->business_type);
    }

    public function getPerformanceCountAttribute(): int
    {
        return $this->transactions()
                    ->where('transactions.status', \App\Enums\TransactionStatus::COMPLETE)
                    ->count();
    }

    public function getOperatorTypeLabelAttribute() : string
    {
        return \App\Enums\OperatorType::getLabel($this->operator_type);
    }

    public function getFinalPaymentDeadlineAttribute(): string
    {
        return $this->transactions()
                    ->where('transactions.status', \App\Enums\TransactionStatus::ACCEPTED)
                    ->orderBy('transactions.proposed_at')
                    ->first()
                    ->proposed_at ?? '';
    }

    public function getFinalPaymentDeadlineAmountAttribute(): string
    {
        return $this->transactions()
                    ->where('transactions.status', \App\Enums\TransactionStatus::ACCEPTED)
                    ->orderBy('transactions.proposed_at')
                    ->first()
                    ->bill_amount ?? 0;
    }

    public function getMonthSalesAttribute(): int
    {        
        return $this->transactions()
                ->where('transactions.status', \App\Enums\TransactionStatus::COMPLETE)
                ->whereYear('transactions.completed_at', now()->year)
                ->whereMonth('transactions.completed_at', now()->month)
                ->sum('transactions.total_amount');
    }

    public function getTotalSalesAttribute(): int
    {
        return $this->transactions()
                ->where('transactions.status', \App\Enums\TransactionStatus::COMPLETE)
                ->sum('transactions.total_amount');
    }

}
