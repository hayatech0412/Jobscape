<?php

namespace App\Enums;

/**
 * @method static static ADMIN()
 * @method static static COMPANY()
 * @method static static USER()
 */
final class Role extends BaseEnum
{
    const ADMIN = 1;
    const COMPANY = 2;
    const USER = 3;
}
