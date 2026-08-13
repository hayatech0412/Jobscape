<?php

namespace App\Enums;

/**
 * @method static static PERCENT()
 * @method static static MONEY()
 */
final class RewardType extends BaseEnum
{
    const MONEY = 1;          // ￥
    const PERCENT = 2;        // %
}

