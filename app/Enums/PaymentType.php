<?php

namespace App\Enums;

/**
 * @method static static BATCH()
 * @method static static INDIVIDUAL()
 */
final class PaymentType extends BaseEnum
{
    const FIRST = 1;          // 一括支払い
    const NORMAL = 2;       
    
    protected static $d2v = [
        self::FIRST => '初回課金',
        self::NORMAL => '定期課金',
    ];
}

