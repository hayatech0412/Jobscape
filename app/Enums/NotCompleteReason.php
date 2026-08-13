<?php

namespace App\Enums;

/**
 * @method static static CONTENTION()
 * @method static static NUTUALESTIMATE()
 * @method static static TEASING()
 * @method static static ALREADY()
 * @method static static CUSTOMERTROUBLE()
 * @method static static MEMBERTROUBLE()
 * @method static static OTHER()
 */
final class NotCompleteReason extends BaseEnum
{
    const CONTENTION = 1;  //'競合' 
    const NUTUALESTIMATE = 2;  //'相見積'    
    const TEASING = 3;  //'冷やかし'
    const ALREADY = 4;  //'過去に取引あり'
    const CUSTOMERTROUBLE = 5;  //'紹介を受けた方とのトラブル'
    const MEMBERTROUBLE = 6;  //'紹介会員とのトラブル'
    const OTHER = 7;  //'その他'

    protected static $d2v = [
        self::CONTENTION => '競合',
        self::NUTUALESTIMATE => '相見積',
        self::TEASING => '冷やかし',
        self::ALREADY => '過去に取引あり',
        self::CUSTOMERTROUBLE => '紹介を受けた方とのトラブル',
        self::MEMBERTROUBLE => '紹介会員とのトラブル',
        self::OTHER => 'その他',
    ];
}