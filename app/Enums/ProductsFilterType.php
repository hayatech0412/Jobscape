<?php

namespace App\Enums;

/**
 * @method static static TEST()
 * @method static static PUBLIC()
 * @method static static STOPPED()
 * @method static static BLOCKED()
 */
final class ProductsFilterType extends BaseEnum
{
    const ALL = 1;  
    const PUBLIC = 2;  
    const STOPPED = 3;  
    const FINISHED = 4;

    public static $d2v = [
        self::ALL => 'すべて',
        self::PUBLIC => '募集中',
        self::STOPPED => '休止中',
        self::FINISHED => '募集終了',
    ];
}

