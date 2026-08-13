<?php

namespace App\Enums;

/**
 * @method static static ALL()
 * @method static static MONEY()
 * @method static static PERCENT()
 */
final class RewardFilterType extends BaseEnum
{
    const ALL = 3;  
    const MONEY = 1;  
    const PERCENT = 2;  

    public static $d2v = [
        self::ALL => 'すべて',
        self::MONEY => '¥',
        self::PERCENT => '%',
    ];
}

