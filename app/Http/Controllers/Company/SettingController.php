<?php

namespace App\Http\Controllers\Company;

use App\Http\Controllers\Controller;
use App\Http\Requests\CompanyAccountRequest;
use App\Http\Requests\OfficeUpdateRequest;
use App\Models\User;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class SettingController extends Controller
{
    public function index()
    {
        $user = auth('company')->user();
        $user = User::find($user->id);
        if ($user->has('company')) {
            $user->load('company');
        }
        return Inertia::render('Company/Settings/Index', [
            'user' => $user,
        ]);
    }

    public function updateAccount(CompanyAccountRequest $request)
    {
        $user = auth('company')->user();
        $user = User::find($user->id);
        $users = User::where('email', $request->email)->get();
        if (count($users) > 1) {
            return redirect()->back()->with('error', 'このメールアドレスは既に登録されています。');
        } else {
            $user->email = $request->email;
        }

        if ($request->has('password')) {
            $user->password = Hash::make($request->password);
        }

        if ($request->has('avatar_file')) {
            $path = Storage::disk('public')->put('/uploads/avatars/' . $user->id . "/", $request->file('avatar_file'));
            $user->avatar = $path;
        }
        $user->save();

        if ($request->has('company')) {
            $company = $request->get('company');
            $user->company->summary = $company['summary'];
            $user->company->overview = $company['overview'];
            $user->company->save();
        }

        return redirect()->route('company.settings.account');
    }

    public function deleteAccount(Request $request)
    {
        $user = auth('company')->user();
        User::find($user->id)->delete();

        auth('company')->logout();
    }

    public function profile()
    {
        return Inertia::render('Company/Settings/Profile');
    }

    public function office()
    {
        $user = auth('company')->user();
        $company = User::find($user->id)->company;
        $managers = $company->managers;
        return Inertia::render('Company/Settings/Office', [
            'company' => $company,
            'managers' => $managers,
            'operator_types' => \App\Enums\OperatorType::getArray(),
        ]);
    }

    // public function updateOffice(OfficeUpdateRequest $request)
    public function updateOffice(Request $request)
    {
        $user = auth('company')->user();
        $company = User::find($user->id)->company;

        DB::beginTransaction();
        try {
            $company->update($request->all());

            DB::commit();
        } catch (\Throwable $e) {
            DB::rollBack();
            Log::error($e->getMessage());

            return back()->with(['error' => $e->getMessage()]);
        }

        return back()->with(['success' => '保存しました。']);
    }
}
