<?php

namespace App\Enums;

/**
 * @method static static UPTODAY()
 * @method static static UPTOWEEK()
 * @method static static UPTOMONTH()
 * @method static static UPTOMONTH3()
 * @method static static UPTOMONTH6()
 * @method static static UPTOYEAR()
 */
final class TransactionPeriod extends BaseEnum
{
    const UPTODAY = 1;  
    const UPTOWEEK = 2;  
    const UPTOMONTH = 3;  
    const UPTOMONTH3 = 4;
    const UPTOMONTH6 = 5;
    const UPTOYEAR = 6;

    public static $d2v = [
        self::UPTODAY => '1日以内',
        self::UPTOWEEK => '1週間以内',
        self::UPTOMONTH => '1ヶ月以内',
        self::UPTOMONTH3 => '3ヶ月以内',
        self::UPTOMONTH6 => '6ヶ月以内',
        self::UPTOYEAR => '1年以内',
    ];
}

