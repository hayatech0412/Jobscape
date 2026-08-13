<?php

namespace App\Enums;

/**
 * @method static static PHONE()
 */
final class Approach extends BaseEnum
{
    const PHONE = 1;          //電話
    const EMAIL = 2;          //メール
    const BOTH = 3;          //その他

    protected static $d2v = [
        self::PHONE => '電話',
        self::EMAIL => 'メール',
        self::BOTH => 'どちらでもよい',
    ];
}

