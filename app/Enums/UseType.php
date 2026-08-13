<?php

namespace App\Enums;

/**
 * @method static static ADMIN()
 * @method static static COMPANY()
 * @method static static USER()
 */
final class UseType extends BaseEnum
{
    const USER = 1;
    const COMPANY = 2;
    const OTHER = 3;

    protected static $d2v = [
        self::USER => '紹介会員',
        self::COMPANY => '提供企業',
        self::OTHER => 'その他',
    ];
}
