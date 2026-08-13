<?php

namespace App\Enums;

/**
 * @method static static REQUESTED()
 * @method static static APPROVED()
 * @method static static REJECTED()
 */
final class WithDrawalStatus extends BaseEnum
{
    const REQUESTED = 0;          // 申請
    const APPROVED = 1;          // 承認
    const REJECTED = 2;           // 非承認

    protected static $d2v = [
        self::REQUESTED => '申請中',
        self::APPROVED => '承認',
        self::REJECTED => '非承認',
    ];
}

