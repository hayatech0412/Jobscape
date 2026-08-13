<?php

namespace App\Enums;

/**
 * @method static static MONTHLY()
 * @method static static YEARLY()
 */
final class PlanType extends BaseEnum
{
    const MONTHLY = 1;          // 月次
    const YEARLY = 2;           // 年次

    protected static $d2v = [
        self::MONTHLY => '月間プラン',
        self::YEARLY => '年間プラン',
    ];
}

