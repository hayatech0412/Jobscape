<?php

namespace App\Enums;

/**
 * @method static static ACTIVE()
 * @method static static REST()
 * @method static static WITHDRAWAL()
 */
final class UserStatus extends BaseEnum
{
    const INACTIVE = 0;         // 確認中
    const ACTIVE = 1;           // 活動
    const REST = 2;             // 休会
    const QUIT = 3;             // 退会

    protected static $d2v = [
        self::INACTIVE  => '確認中',
        self::ACTIVE    => '対応可能',
        self::REST      => '利用停止中',
        self::QUIT      => '退会',
    ];

    // 企業の側のステータスラベル
    public static function getLabel(int $status): string
    {
        switch ($status) {
            case self::INACTIVE:
                return '確認中';
            case self::ACTIVE:
                return '対応可能';
            case self::REST:
                return '利用停止中';
            default:
                return '退会';
        }
    }
}

