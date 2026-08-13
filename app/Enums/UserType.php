<?php

namespace App\Enums;

/**
 * @method static static PERSON()
 * @method static static CORPORATION()
 * @method static static PROPRIETOR()
 */
final class UserType extends BaseEnum
{
    const PERSON = 1;
    const CORPORATION = 2;
    const PROPRIETOR = 3;

    protected static $d2v = [
        self::PERSON => '個人',
        self::CORPORATION => '法人',
        self::PROPRIETOR => '個人事業主',
    ];
}
