<?php

namespace App\Enums;

/**
 * @method static static REQUESTED()
 * @method static static RESPONDING()
 * @method static static ACCEPTED()
 * @method static static CANCELLED()
 * @method static static REPORTED()
 * @method static static CONFIRMING()
 * @method static static COMPLETE()
 */
final class RewardStatus extends BaseEnum
{
    const REQUESTED = 1;          // 未対応
    const RESPONDING = 2;         // 商談中
    const ACCEPTED = 3;           // 成立
    const CANCELLED = 4;          // 不成立
    const REPORTED = 5;           // 売上報告中
    const CONFIRMING = 6;         // 入金確認中
    const COMPLETE = 7;           // 完了
}

