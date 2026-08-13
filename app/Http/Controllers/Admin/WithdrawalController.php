<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProfileUpdateRequest;
use App\Enums\TargetType;
use App\Enums\RewardFilterType;
use App\Enums\Role;
use App\Enums\WithDrawalStatus;
use App\Models\User;
use App\Models\Withdrawal;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;
use Carbon\Carbon;
use DB;

class WithdrawalController extends Controller
{
    protected $perPage = 10;

    public function index(Request $request)
    {
        $from = $request->from;
        $to = $request->to;
        $status = $request->status;
        $user = $request->user;


        $query = Withdrawal::with('user.profile');

        if ($status && $status != 9) {
            $query->where('status', $status);
        }

        if ($user && $user != 0) {
            $query->whereHas('user', function($query) use ($user) {
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

        $query->orderBy("created_at", "desc");
        $withdrawals = $query->paginate($this->perPage)->withQueryString();

        return Inertia::render('Admin/Withdrawals/Index', [
            'withdrawals' => $withdrawals,
            'statuses' => WithDrawalStatus::getArray(),
            'selectedUser' => User::where('id', $user)?->with('profile')->first(),
        ]);
    }

    public function show(Request $request, Withdrawal $withdrawal) {
        $withdrawal->load(['user.profile']);
        return Inertia::render('Admin/Withdrawals/Show', [
            'target_types' => TargetType::getArray(),
            'withdrawal' => $withdrawal,
        ]);
    }

    public function delete($id)
    {
        $withdrawal = Withdrawal::find($id);
        DB::beginTransaction();
        try {
            $withdrawal->delete();
            DB::commit();
        } catch (\Throwable $e) {
            DB::rollBack();
            Log::error($e->getMessage());

            return back()->with(['error', __('操作が失敗しました。')]);
        }

        return redirect(route('admin.withdrawals'))->with('success', __('振り込み申請内容を削除しました。'));
    }

    public function accept($id)
    {
        $withdrawal = Withdrawal::find($id);
        DB::beginTransaction();
        try {
            $withdrawal->update([
                'status' => WithDrawalStatus::APPROVED,
                'withdraw_at' => Carbon::now()->toDateString(),
            ]);
            DB::commit();
        } catch (\Throwable $e) {
            DB::rollBack();
            Log::error($e->getMessage());

            return back()->with(['error', __('操作が失敗しました。')]);
        }

        return back()->with('success', __('振り込み申請を許可しました。'));
    }

    public function reject($id)
    {
        $withdrawal = Withdrawal::find($id);
        DB::beginTransaction();
        try {
            $withdrawal->update(['status' => WithDrawalStatus::REJECTED]);
            DB::commit();
        } catch (\Throwable $e) {
            DB::rollBack();
            Log::error($e->getMessage());

            return back()->with(['error', __('操作が失敗しました。')]);
        }

        return back()->with('success', __('振り込み申請を不許しました。'));
    }
}
