<?php

namespace App\Enums;

/**
 * @method static static UPTO5()
 * @method static static UPTO1O()
 */
final class BusinessType extends BaseEnum
{
    const CORPORATION = 1;  //'法人'
    const INDIVIDUAL = 2;  //'〜1億円'

    protected static $d2v = [
        self::CORPORATION => '法人',
        self::INDIVIDUAL => '個人事業主',
    ];
}
