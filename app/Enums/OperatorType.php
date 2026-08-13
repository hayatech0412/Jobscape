<?php

namespace App\Enums;

/**
 * @method static static ADMIN()
 * @method static static COMPANY()
 * @method static static USER()
 */
final class OperatorType extends BaseEnum
{
    const NO = 0;
    const TAXABLE = 1;
    const TAXFREE = 2;

    protected static $d2v = [
        self::NO => '未選択',
        self::TAXABLE => '課税事業者',
        self::TAXFREE => '非課税事業者',
    ];
}
