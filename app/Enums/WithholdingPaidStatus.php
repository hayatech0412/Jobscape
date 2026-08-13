<?php

namespace App\Enums;

/**
 * @method static static NOTPAID()
 * @method static static PAID()
 */
final class WithholdingPaidStatus extends BaseEnum
{
    const NOTPAID = 0;            
    const PAID = 1;       

    public static $d2v = [
        self::NOTPAID => '未払',
        self::PAID => '支払済',
    ];
}

