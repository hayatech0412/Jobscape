<?php

namespace App\Enums;

/**
 * @method static static REQUESTED()
 * @method static static RESPONDING()
 * @method static static ACCEPTED()
 * @method static static REJECTED()
 * @method static static REPORTED()
 * @method static static CONFIRMING()
 * @method static static COMPLETE()
 */
final class TransactionScheduleValues extends BaseEnum
{
    const ACCEPTED = 1;            // 紹介済み(未対応)
    const REJECTED = 2;           // 商談中

    public static $d2v = [
        self::ACCEPTED => '許可',
        self::REJECTED => '不成立'
    ];
}

