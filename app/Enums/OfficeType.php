<?php

namespace App\Enums;

/**
 * @method static static COMPANY()
 * @method static static OFFICE()
 * @method static static OTHER()
 */
final class OfficeType extends BaseEnum
{
    const COMPANY = 1;
    const OFFICE = 2;
    const OTHER = 3;

    protected static $d2v = [
        self::COMPANY => '代表本社',
        self::OFFICE => '支社・支店',
        self::OTHER => 'その他',
    ];
}
