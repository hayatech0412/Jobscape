<?php

namespace App\Enums;

/**
 * @method static static Type1()
 * @method static static Type2()
 */
final class FilterServiceType extends BaseEnum
{
    const DURATION1 = 0;  // 全ての期間を表示
    const DURATION2 = 1;  // 

    protected static $d2v = [
        self::DURATION1 => '全てのサービスを表示',
        self::DURATION2 => 'サービス1',
    ];
}

