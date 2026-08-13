<?php

namespace App\Enums;

/**
 * @method static static RECOMMEND()
 * @method static static NEW()
 * @method static static POPULAR()
 */
final class ProductSortType extends BaseEnum
{
    const RECOMMEND = 1;  
    const NEW = 2;  
    const POPULAR = 3;  

    public static $d2v = [
        self::RECOMMEND => 'おすすめ順',
        self::NEW => '新しい順',
        self::POPULAR => '人気順',
    ];
}

