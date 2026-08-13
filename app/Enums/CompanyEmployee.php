<?php

namespace App\Enums;

/**
 * @method static static UPTO5()
 * @method static static UPTO1O()
 * @method static static UPTO3O()
 * @method static static UPTO5O()
 * @method static static UPTO10O()
 * @method static static OVER100()
 */
final class CompanyEmployee extends BaseEnum
{
    const UPTO5 = 5;  //'〜5人'
    const UPTO1O = 10;  //'〜10人'
    const UPTO3O = 30;  //'〜30人'
    const UPTO5O = 50;  //'〜50人'
    const UPTO10O = 100;  //'〜100人'
    const OVER100 = 101;  //'100人以上'

    protected static $d2v = [
        self::UPTO5 => '〜5人',
        self::UPTO1O => '〜10人',
        self::UPTO3O => '〜30人',
        self::UPTO5O => '〜50人',
        self::UPTO10O => '〜100人',
        self::OVER100 => '100人以上',
    ];
}
