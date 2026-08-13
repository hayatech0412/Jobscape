<?php

namespace App\Enums;

/**
 * @method static static UPTO5()
 * @method static static UPTO1O()
 * @method static static UPTO5O()
 * @method static static UPTO10O()
 * @method static static UPTO50O()
 * @method static static UPTO100O()
 * @method static static OVER100O()
 */
final class CompanyEarning extends BaseEnum
{
    const UPTO5 = 1;  //'〜5000万円'
    const UPTO1O = 2;  //'〜1億円'
    const UPTO5O = 3;  //'〜5億円'
    const UPTO10O = 4;  //'〜10億円'
    const UPTO50O = 5;  //'〜50億円'
    const UPTO100O = 6;  //'〜100億円'
    const OVER100O = 7;  //'100億円以上'

    protected static $d2v = [
        self::UPTO5 => '〜500万円',
        self::UPTO1O => '〜1億円',
        self::UPTO5O => '〜5億円',
        self::UPTO10O => '〜10億円',
        self::UPTO50O => '〜50億円',
        self::UPTO100O => '〜100億円',
        self::OVER100O => '100億円以上',
    ];
}
