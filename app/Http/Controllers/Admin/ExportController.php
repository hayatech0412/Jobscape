<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Exports\WithholdingsExport;
use App\Exports\WithdrawalsExport;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Http\Request;

class ExportController extends Controller
{
    public function withholdings()
    {
        $filename = 'withholdings_' . date('YmdHis') . '.csv';
        return Excel::download(new WithholdingsExport, $filename, \Maatwebsite\Excel\Excel::CSV);
    }

    public function withDrawls(Request $request)
    {
        $filename = 'withDrawls_' . date('YmdHis') . '.csv';
        $from = $request->query('from');
        $to = $request->query('to');
        $status = $request->query('status');
        $user = $request->query('user');
        return Excel::download(new WithdrawalsExport($from, $to, $status, $user), $filename, \Maatwebsite\Excel\Excel::CSV, [
            'use_bom' => true,
            'input_encoding' => 'UTF-8',
            'output_encoding' => 'SJIS-win',
        ]);
    }
}
