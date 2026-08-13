<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Enums\ProductStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Notifications\Notifiable;
use App\Enums\Role;
use App\Enums\UserStatus;
use Illuminate\Support\Carbon;
use App\Enums\TransactionStatus;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'email',
        'password',
        'email_verified_at',
        'verify_token',
        'verify_token_expire_at',
        'role',
        'is_notify',
        'status',
        'avatar',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'verify_token_expire_at' => 'datetime',
        'password' => 'hashed',
    ];

    protected $appends = [
        'avatar_url',
        'user_status',
        'last_transaction_date',
        'total_sales_amount',
        'requested_orders_count',
        'responding_orders_count',
        'accepted_orders_count',
        'rejected_orders_count',
        'completed_orders_count',
        'total_orders_count',
        'total_products_count',
        'total_reviews_products_count',
        'total_public_products_count',
        'total_stopped_products_count',
        'total_blocked_products_count',
        'total_expired_products_count',
    ];

    /**
     * =========================================================
     * Relationships
     * =========================================================
     */
    // has one relationship
    public function profile(): HasOne
    {
        return $this->hasOne(Profile::class);
    }

    public function getTotalProductsCountAttribute()
    {
        if ($this->company && $this->company->products()->count() > 0) {
            return $this->company->products()->count();
        } else {
            return 0;
        }
    }

    public function getTotalReviewsProductsCountAttribute()
    {
        if ($this->company && $this->company->products()->count() > 0) {
            return $this->company->products()->where('status', ProductStatus::REVIEW)->count();
        } else {
            return 0;
        }
    }

    public function getTotalPublicProductsCountAttribute()
    {
        if ($this->company && $this->company->products()->count() > 0) {
            return $this->company->products()->where('status', ProductStatus::PUBLIC)->count();
        } else {
            return 0;
        }
    }

    public function getTotalStoppedProductsCountAttribute()
    {
        if ($this->company && $this->company->products()->count() > 0) {
            return $this->company->products()->where('status', ProductStatus::STOPPED)->count();
        } else {
            return 0;
        }
    }

    public function getTotalBlockedProductsCountAttribute()
    {
        if ($this->company && $this->company->products()->count() > 0) {
            return $this->company->products()->where('status', ProductStatus::BLOCKED)->count();
        } else {
            return 0;
        }
    }

    public function getTotalExpiredProductsCountAttribute()
    {
        if ($this->company && $this->company->products()->count() > 0) {
            return $this->company->products()->where('status', ProductStatus::EXPIRED)->count();
        } else {
            return 0;
        }
    }

    public function getTotalSalesAmountAttribute()
    {
        return $this->transactions->sum('total_amount');
    }

    public function getTotalOrdersCountAttribute()
    {
        return $this->transactions()->count();
    }

    public function getRequestedOrdersCountAttribute()
    {
        return $this->transactions()->where('status', TransactionStatus::REQUESTED)->count();
    }

    public function getRespondingOrdersCountAttribute()
    {
        return $this->transactions()->where('status', TransactionStatus::RESPONDING)->count();
    }

    public function getAcceptedOrdersCountAttribute()
    {
        return $this->transactions()->where('status', TransactionStatus::ACCEPTED)->count();
    }

    public function getRejectedOrdersCountAttribute()
    {
        return $this->transactions()->where('status', TransactionStatus::REJECTED)->count();
    }

    public function getCompletedOrdersCountAttribute()
    {
        return $this->transactions()->where('status', TransactionStatus::COMPLETE)->count();
    }

    public function bank_account(): HasOne
    {
        return $this->hasOne(BankAccount::class);
    }

    public function company(): HasOne
    {
        return $this->hasOne(Company::class);
    }

    // has many relationship
    public function creditcards(): HasMany
    {
        return $this->hasMany(Creditcard::class);
    }

    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }

    public function payments(): HasMany
    {
        return $this->hasMany(Payment::class)->orderBy('paid_at', 'desc');
    }

    public function invites(): HasMany
    {
        return $this->hasMany(Invite::class, 'source_id');
    }

    public function invitedBy(): HasMany
    {
        return $this->hasMany(Invite::class, 'target_id');
    }

    // public function notifications(): HasMany
    // {
    //     return $this->hasMany(Notification::class, 'target_id')->orderByDesc('created_at');;
    // }

    public function notificatedBy(): HasMany
    {
        return $this->hasMany(Notification::class, 'source_id');
    }

    public function points(): HasMany
    {
        return $this->hasMany(Point::class);
    }

    public function transactions(): HasMany
    {
        return $this->hasMany(Transaction::class);
    }

    public function withdrawals(): HasMany
    {
        return $this->hasMany(Withdrawal::class);
    }

    public function paymentMethods(): HasMany
    {
        return $this->hasMany(PaymentMethod::class)->orderBy('updated_at', 'desc');
    }

    // many to many relationship
    public function visitedProducts(): BelongsToMany
    {
        return $this->belongsToMany(Product::class, 'visit_histories');
    }

    public function inviteUsers(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'invites', 'source_id', 'target_id');
    }

    public function invitedUsers(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'invites', 'target_id', 'source_id');
    }

    public function notificatedUsers(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'notifications', 'source_id', 'target_id');
    }

    public function notificatedByUsers(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'notifications', 'target_id', 'source_id');
    }

    public function scopeOnlyUsers($query)
    {
        return $query->where('role', Role::USER);
    }

    public function scopeOnlyCompanies($query)
    {
        return $query->where('role', Role::COMPANY);
    }

    /**
     * =========================================================
     * Attributes
     * =========================================================
     */
    public function getAvatarUrlAttribute()
    {
        return $this->avatar ? asset('storage/' . $this->avatar) : asset('assets/images/no-user.png');
    }

    public function getUserStatusAttribute()
    {
        return UserStatus::getLabel($this->status);
    }

    public function getLastTransactionDateAttribute()
    {
        if (auth('company')->check()) {
            $companyUser = User::find(auth('company')->user()->id);
            if ($companyUser->company) {
                $lastTransaction = Transaction::where('user_id', $this->id)
                    ->whereIn('product_id', function ($query) use ($companyUser) {
                        $query->select('id')
                            ->from(with(new Product())->getTable())
                            ->where('company_id', $companyUser->company->id);
                    })
                    ->orderByDesc('updated_at')
                    ->first();

                return $lastTransaction ? Carbon::parse($lastTransaction->updated_at)->format('Y年m月d日 H:i:s') : '';
            }
        }

        return '';
    }

    /**
     * =========================================================
     * Scopes
     * =========================================================
     */

     public function scopeActive(Builder $query) 
     {
        return $query->whereIn('status', [UserStatus::ACTIVE, UserStatus::REST]);
     }

     public function scopeInActive(Builder $query) 
     {
        return $query->where('status', UserStatus::INACTIVE);
     }

     public function scopeQuit(Builder $query) 
     {
        return $query->where('status', UserStatus::QUIT);
     }

    /**
     * =========================================================
     * Methods
     * =========================================================
     */

    public function notifications()
    {
        return Notification::where('target_id', $this->id)
            ->orWhereNull('target_id')
            ->orderByDesc('created_at');
    }

    public function unreadNotifications()
    {
        return Notification::where(function ($query) {
            $query->where('target_id', $this->id)
                ->orWhereNull('target_id');
            })
            ->unread($this->id)
            ->get();
    }

    public function unopenedNofications()
    {
        return Notification::where(function ($query) {
            $query->where('target_id', $this->id)
                ->orWhereNull('target_id');
            })
            ->unopened($this->id)
            ->get();
    }
}
