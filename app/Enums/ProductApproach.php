<?php declare(strict_types=1);

namespace App\Enums;

use BenSampo\Enum\Enum;

/**
 * @method static static OptionOne()
 * @method static static OptionTwo()
 * @method static static OptionThree()
 */
final class ProductApproach extends Enum
{
    const EMAIL = 1;  //メール
    const PHONE = 2;  //電話
    const OTHER = 3;  //その他

    protected static $d2v = [
        self::PHONE => '電話',
        self::EMAIL => 'メール',
        self::OTHER => 'その他',
    ];
}
