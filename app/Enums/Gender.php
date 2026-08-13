<?php

namespace App\Enums;

/**
 * @method static static FEMALE()
 * @method static static MALE()
 * @method static static NO_ANSWER()
 */
final class Gender extends BaseEnum
{
    const FEMALE = 1;
    const MALE = 2;
    const NO_ANSWER = 0;

    protected static $d2v = [
        self::MALE => '男性',
        self::FEMALE => '女性',
        self::NO_ANSWER => '無回答',
    ];
}
