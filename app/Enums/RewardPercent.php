<?php

namespace App\Enums;

/**
 * @method static static ONE()
 * @method static static TEN()
 * @method static static TWENTY()
 * @method static static THIRTY()
 * @method static static FORTY()
 * @method static static FIRTY()
 * @method static static UNLIMITED()
 */
final class RewardPercent extends BaseEnum
{
    const ONE = 1;          // 1%
    const TEN = 10;          // 10%
    const TWENTY = 20;       // 20%
    const THIRTY = 30;       // 30%
    const FORTY = 40;        // 40%
    const FIRTY = 50;        // 50%
    const UNLIMITED = -1;    // 上限なし
}

