<?php

namespace App\Enums;

/**
 * @method static static NO()
 * @method static static COMPLETE()
 */
final class PaymentStatus extends BaseEnum
{
    const NO = 0;          
    const COMPLETE = 1;   
    
    protected static $d2v = [
        self::NO => '未完了',
        self::COMPLETE => '完了',
    ];        
}

