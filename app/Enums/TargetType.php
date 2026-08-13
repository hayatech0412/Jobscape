<?php declare(strict_types=1);

namespace App\Enums;

use BenSampo\Enum\Enum;

/**
 * @method static static ALL()
 * @method static static COPORATOR()
 * @method static static INDIVIDUAL()
 */
final class TargetType extends BaseEnum
{
    const ALL = 0;       
    const COPORATOR = 1; 
    const INDIVIDUAL = 2;

    public static $d2v = [
        self::ALL => '全対応',
        self::COPORATOR => '法人',
        self::INDIVIDUAL => '個人',
    ];
}
