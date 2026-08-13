<?php

namespace App\Enums;

/**
 * @method static static NOTEMERGENCY()
 * @method static static EMERGENCY()
 */
final class Emergency extends BaseEnum
{
    const NOTEMERGENCY = 0;         
    const EMERGENCY = 1;          

    protected static $d2v = [
        self::NOTEMERGENCY => '利用しない',
        self::EMERGENCY => '利用する',
    ];
}

