<?php declare(strict_types=1);

namespace App\Enums;

use BenSampo\Enum\Contracts\LocalizedEnum;
use BenSampo\Enum\Enum;

/**
 * @method static static OptionOne()
 * @method static static OptionTwo()
 * @method static static OptionThree()
 */
abstract class BaseEnum extends Enum implements LocalizedEnum
{
    /**
     * 言語ファイル -> Enum Valueの逆引き辞書
     *
     * @var array
     */
    protected static $d2v;

    /**
     * @param int $targetValue
     *
     * @return array
     */
    public static function getEnumObject(int $targetValue)
    {
        foreach (static::getValues() as $value) {
            if ($value === $targetValue) {
                return [
                    'value' => $value,
                    'label' => static::getDescription($value),
                    'key' => static::getKey($value),
                ];
            }
        }
    }

    /**
     * 言語ファイルのテキストからEnum Valueを取得する
     *
     * @param string $description
     *
     * @return mixed
     */
    public static function description2Value(string $description)
    {
        if (!isset(static::$d2v[static::class])) {
            if (isset(static::$d2v)) {
                static:: $d2v = [];
            }

            static::$d2v[static::class] = [];

            foreach (static::getValues() as $value) {
                static::$d2v[static::class][static::getDescription($value)] = $value;
            }
        }

        return static::$d2v[static::class][$description] ?? null;
    }

    public static function toArrayCustom(): array
    {
        $cases = static::getValues();  // enumの値を取得
        $array = [];

        foreach ($cases as $key => $value) {
            $array[static::getKey($value)] = $value;
        }

        return $array;
    }

    public static function getArray()
    {
        foreach (static::$d2v as $key => $value) {
            $result[] = [
                'value' => $key,
                'label' => $value,
                'key' => $key,
            ];
        }
        return $result;
    }

    // Static method to get the label from the value
    public static function getLabel(int $status): string
    {
        return static::$d2v[$status] ?? '';
    }

}
