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
final class TransactionStatus extends BaseEnum
{
    const REQUESTED = 0;            // 紹介済み(未対応)
    const RESPONDING = 1;           // 商談中
    const ACCEPTED = 2;             // 成立
    const REJECTED = 3;             // 不成立
    const COMPLETE = 4;             // 完了

    public static $d2v = [
        self::REQUESTED => '未対応',
        self::RESPONDING => '商談中',
        self::ACCEPTED => '成立',
        self::REJECTED => '不成立',
        self::COMPLETE => '完了',
    ];
}

