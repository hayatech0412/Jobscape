<?php declare(strict_types=1);

namespace App\Enums;

use BenSampo\Enum\Enum;

/**
 * @method static static DAY()
 * @method static static WEEK()
 * @method static static MONTH()
 */
final class PeriodUnit extends BaseEnum
{
    const DAY = 0;      //日
    const WEEK = 1;     //週間
    const MONTH = 2;    //ヶ月
    const YEAR = 3;     //年

    protected static $d2v = [
        self::DAY   => '日',
        self::WEEK  => '週間',
        self::MONTH => 'ヶ月',
        self::YEAR  => '年',
    ];
}
