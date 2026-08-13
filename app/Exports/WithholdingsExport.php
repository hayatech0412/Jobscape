<?php

namespace App\Exports;

use App\Models\Withholding;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class WithholdingsExport implements FromCollection, WithHeadings, WithMapping
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return Withholding::orderByDesc('created_at')->get();
    }

    public function headings(): array
    {
        return [
            "会員名",
            "取得金(円）",
            "源泉徴収税(円）",
            "対象月",
            "ステータス",
        ];
    }

    /**
    * @param MatchingRequest $mr
    */
    public function map($mr): array
    {
        return [
            // 会員名
            $mr->user->profile->full_name,
            // 取得金
            $mr->total_earnings,
            // 源泉徴収税
            $mr->tax_amount,
            // 対象月
            \Carbon\Carbon::parse($mr->tax_period)->format('Y年m月'),
            // ステータス
            $mr->status_label,
        ];
    }
}
