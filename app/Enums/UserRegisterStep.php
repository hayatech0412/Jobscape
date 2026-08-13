<?php

namespace App\Enums;

/**
 * @method static static PLAN()
 * @method static static PAYMENTMETHOD()
 * @method static static SMS()
 * @method static static SMSVERIFY()
 * @method static static MAININFO()
 * @method static static AREA()
 * @method static static CATEGORY()
 */
final class UserRegisterStep extends BaseEnum
{
    const PLAN = 1;
    const PAYMENTMETHOD = 2;
    const NICKNAME = 3;
    const SMS = 4;
    const SMSVERIFY = 5;
    const MAININFO = 6;
    const AREA = 7;
    const CATEGORY = 8;
}
