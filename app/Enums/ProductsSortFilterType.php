<?php

namespace App\Enums;

/**
 * @method static static TEST()
 * @method static static PUBLIC()
 * @method static static STOPPED()
 * @method static static BLOCKED()
 */
final class ProductsSortFilterType extends BaseEnum
{
    const RECOMMEND = 1;  
    const ARRIVED  = 2;  
    const HIGH_PRICE = 3;  
    const LOW_PRICE = 4;
    const GUESTS = 5;

    public static $d2v = [
        self::RECOMMEND => 'おすすめ順',
        self::ARRIVED => '新着順',
        self::HIGH_PRICE => '紹介料の高い順',
        self::LOW_PRICE => '紹介料の低い順',
        self::GUESTS => '初心者向け',
    ];
}

