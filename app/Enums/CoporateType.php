<?php

declare(strict_types=1);

namespace App\Enums;

/**
 * @method static static OptionOne()
 * @method static static OptionTwo()
 * @method static static OptionThree()
 */
final class CoporateType extends BaseEnum
{
    const COP_TYPE_1 = 1;
    const COP_TYPE_2 = 2;
    const COP_TYPE_3 = 3;
    const COP_TYPE_4 = 4;
    const COP_TYPE_5 = 5;
    const COP_TYPE_6 = 6;
    const COP_TYPE_7 = 7;
    const COP_TYPE_8 = 8;
    const COP_TYPE_9 = 9;
    const COP_TYPE_10 = 10;
    const COP_TYPE_11 = 11;
    const COP_TYPE_12 = 12;
    const COP_TYPE_13 = 13;

    protected static $d2v = [
        self::COP_TYPE_1 => '株式会社',
        self::COP_TYPE_2 => '合名会社',
        self::COP_TYPE_3 => '合資会社',
        self::COP_TYPE_4 => '合同会社',
        self::COP_TYPE_5 => '有限会社（特例有限会社）',
        self::COP_TYPE_6 => '相互会社',
        self::COP_TYPE_7 => '一般社団法人',
        self::COP_TYPE_8 => '学校法人',
        self::COP_TYPE_9 => '医療法人',
        self::COP_TYPE_10 => '社会福祉法人',
        self::COP_TYPE_11 => '独立行政法人',
        self::COP_TYPE_12 => '地方独立行政法人',
        self::COP_TYPE_13 => 'その他',
    ];
}
