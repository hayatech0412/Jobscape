<?php

namespace App\Exports;

use App\Models\Withdrawal;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class WithdrawalsExport implements FromCollection, WithHeadings, WithMapping
{
    protected $from;
    protected $to;
    protected $status;
    protected $user;

    public function __construct($from, $to, $status, $user)
    {
        $this->from = $from;
        $this->to = $to;
        $this->status = $status;
        $this->user = $user;
    }

    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        $from = $this->from;
        $to = $this->to;
        $status = $this->status;
        $user = $this->user;

        $query = Withdrawal::with('user.profile');

        if ($status && $status != 9) {
            $query->where('status', $status);
        }

        if ($user && $user != 0) {
            $query->whereHas('user', function ($query) use ($user) {
                return $query->where('id', $user);
            });
        }

        if (($from || $to) && $from == $to) {
            $query->whereDate('created_at', '=', $from);
        } else {
            if ($from) {
                $query->where('created_at', '>=', $from);
            }

            if ($to) {
                $query->where('created_at', '<=', $to);
            }
        }

        $data = $query->orderBy("created_at", "desc")->get();

        // Calculate the sum of the amount column
        $totalRequestAmount = $data->sum('amount');

        // Calculate total number of records
        $totalRecords = $data->count();

        // Add totalRecords to each record
        $data->each(function ($item) use ($totalRecords) {
            $item->totalRecords = $totalRecords;
        });

        // Create a collection for additional rows
        $additionalRows = collect([
            [8, $totalRecords, $totalRequestAmount, ""], // Ensure numeric values are not strings
            [9, "", "", ""]
        ]);

        // Convert $data to a regular collection before merging
        return collect($data)->merge($additionalRows);
    }

    public function headings(): array
    {
        return [
            1,
            21,
            "0",
            "0101234567", // Remove quotes for numeric values
            "ﾗｸﾃﾝ ｷﾞﾝｺｳ ｶﾌﾞｼｷｶﾞｲｼｬ", // Keep as string for non-numeric values
            "0820", // Remove quotes for numeric values
            "0036", // Remove quotes for numeric values
            "",
            202,
            "",
            1,
            7654321,
            " ",
        ];
    }

    /**
     * @param MatchingRequest $mr
     */
    public function map($mr): array
    {
        // Check if $mr is an array (additional row)
        if (is_array($mr)) {
            return $mr;
        }

        // If $mr is an Eloquent object, process normally
        return [
            // Total records
            2,
            // Random number (you can generate or fetch this value)
            rand(1000, 9999), // Example random number
            // Fixed empty value
            "",
            // Shop code
            $mr->shop_code,
            // Fixed empty value
            "",
            // Fixed empty value
            "",
            // Fixed value 1 or 2
            $mr->type ?? 1, // Example: default to 1
            // Account code
            $mr->account_code,
            // Account first name + account last name
            $mr->account_first_name . $mr->account_last_name,
            // Amount
            $mr->amount,
            // Fixed value 1
            1,
            // Fixed string "0000000000,1234567890" or "11111111111111111111"
            "0000000000,1234567890", // Example default value
            // Fixed empty value
            " ",
            // Fixed empty value
            " ",
            " ",
        ];
    }
}
