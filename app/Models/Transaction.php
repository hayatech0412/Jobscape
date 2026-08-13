<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;
use App\Enums\TransactionStatus;

class Transaction extends Model
{
    use SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'product_id',
        'code',
        'agency_code',
        'contact_type',
        'is_target_agree',
        'is_encrypt',
        'user_memo',
        'target_memo',
        'target_last_name',
        'target_first_name',
        'target_last_kana',
        'target_first_kana',
        'target_email',
        'target_phone_number',
        'target_post_number',
        'target_pref',
        'target_city',
        'target_area',
        'target_street',
        'target_building',
        'target_company_name',
        'target_position',
        'contact_with',
        'status',
        'no_response_reason',
        'no_response_reason_detail',
        'reported_at',
        'not_complete_reason',
        'not_complete_reason_detail',
        'total_amount',
        'sales_amount',
        'fee_amount',
        'bill_amount',
        'bill_url',
        'accepted_at',
        'completed_at',
        'proposed_at',
        'propose_update_reason',
        'propose_updated_at',
    ];

    protected $appends = [
        'last_payed_date',
        'payed_status_text',
        'status_label'
    ];

    /**
     * The attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected $casts = [
        'reported_at' => 'datetime',
        'contact_type' => 'bool',
        'is_target_agree' => 'bool',
        'is_encrypt' => 'bool',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->code = self::generateUniqueCode();
            $model->agency_code = self::generateUniqueAgencyCode(8);
        });
    }

    /**
     * 支払状況のテキストを取得
     */
    public function getPayedStatusTextAttribute()
    {
        return $this->status == TransactionStatus::COMPLETE ? '支払済' : '未払い';
    }

    public function getLastPayedDateAttribute()
    {
        return $this->schedules()->where('status', TransactionStatus::COMPLETE)->first()?->schedule_date ?? '';
    }

    /**
     * ユニークなコードを生成
     */
    private static function generateUniqueCode(): string
    {
        $prefix = self::generatePrefix(); // 2桁のプレフィックスを生成
        $randomNumber = self::generateUniqueNumber(); // ユニークな11桁のランダムな数字を生成
        return $prefix . $randomNumber;
    }

    /**
     * 小文字の2桁プレフィックスを生成
     */
    private static function generatePrefix(): string
    {
        return strtolower(Str::random(2)); // ランダムな2文字の小文字
    }

    /**
     * 11桁のユニークな数字を生成
     */
    private static function generateUniqueNumber(): string
    {
        // 11桁のユニークな数字を生成する方法
        do {
            $randomNumber = str_pad(random_int(0, 99999999999), 11, '0', STR_PAD_LEFT); // 11桁の数字
        } while (self::where('code', $randomNumber)->exists()); // 重複チェック

        return $randomNumber;
    }

    /**
     * 8桁のrandom文字列を生成
     */
    private static function generateUniqueAgencyCode(int $length = 8): string
    {
        do {
            // 文字数と数字数をランダムに決定（最低1つは含める）
            $letterCount = rand(1, $length - 1);
            $numberCount = $length - $letterCount;

            // 英字を生成
            $letters = strtolower(Str::random($letterCount));

            // 数字をランダムに取得（配列にキャスト）
            $numbers = array_map('strval', (array) array_rand(array_flip(range(0, 9)), $numberCount));

            // 文字と数字を結合してシャッフル
            $codeArray = str_split($letters . implode('', $numbers));
            shuffle($codeArray);

            $code = implode('', $codeArray);
        } while (self::where('agency_code', $code)->exists()); // 重複チェック

        return $code;
    }

    /**
     * =========================================================
     * Relationships
     * =========================================================
     */
    // belongs to relationships
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    // has many relationships
    public function schedules()
    {
        return $this->hasMany(TransactionSchedule::class);
    }



    public function getStatusLabelAttribute()
    {
        return TransactionStatus::getLabel($this->status);
    }
}
