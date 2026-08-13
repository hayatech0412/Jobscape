<?php declare(strict_types=1);

namespace App\Enums;

use BenSampo\Enum\Enum;

/**
 * @method static static OptionOne()
 * @method static static OptionTwo()
 * @method static static OptionThree()
 */
final class CompanyRegistStep extends Enum
{
    const STEP_START = 0;           // メールアドレス認証済み
    const STEP_COPORATECODE = 1;    // 法人番号登録済み
    const STEP_COPORATEINFO = 2;    // 法人事業者情報登録済み
    const STEP_OFFICEINFO = 3;      // 事務所情報登録
    const STEP_WORKSINFO = 4;       // 事業内容登録
}
