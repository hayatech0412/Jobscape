<?php

namespace App\Enums;

/**
 * @method static static TEST()
 * @method static static PUBLIC()
 * @method static static STOPPED()
 * @method static static BLOCKED()
 */
final class ProductStatus extends BaseEnum
{
    const DRAFT = 1;
    const REVIEW = 2;
    const PUBLIC = 3;
    const STOPPED = 4;
    const BLOCKED = 5;
    const EXPIRED = 6;

    protected static $d2v = [
        self::DRAFT     => '下書き',
        self::REVIEW    => '審査中',
        self::PUBLIC    => '公開中',
        self::STOPPED   => '停止中',
        self::BLOCKED   => 'ブロック',
        self::EXPIRED   => '終了',
    ];
}

