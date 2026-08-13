<?php

namespace App\Enums;

/**
 * @method static static DISABLE()
 * @method static static WAITING()
 * @method static static TROUBLE()
 * @method static static CONDITION()
 * @method static static OTHER()
 */
final class NoResponseReason extends BaseEnum
{
    const DISABLE = 1;        //紹介を受けた方と連絡が取れない      
    const WAITING = 2;        //紹介を受けた方からの連絡待ち      
    const TROUBLE = 3;        //紹介を受けた方とのトラブル      
    const CONDITION = 4;      //自社都合      
    const OTHER = 5;          //その他      
    
    protected static $d2v = [
        self::DISABLE => '紹介を受けた方と連絡が取れない',
        self::WAITING => '紹介を受けた方からの連絡待ち',
        self::TROUBLE => '紹介を受けた方とのトラブル',
        self::CONDITION => '自社都合',
        self::OTHER => 'その他',
    ];
}

