<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProfileUpdateRequest;
use App\Enums\ProductsFilterType;
use App\Enums\ProductSortType;
use App\Enums\RewardFilterType;
use App\Enums\Role;
use App\Enums\TransactionStatus;
use App\Models\Notice;
use App\Models\Profile;
use App\Models\Transaction;
use App\Http\Requests\ContactRequest;
use App\Repositories\ProductRepository;
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

class NoticeController extends Controller
{
    protected $perPage = 15;

    public function index(Request $request)
    {
        $keyword = $request->keyword;

        $query = Notice::query();

        if ($keyword) {
            $query->where(function($query) use ($keyword) {
                $query->where('title', 'like', "%$keyword%")
                    ->orWhere('content', 'like', "%$keyword%");
            });
        }

        $query->orderBy("updated_at", "desc");
        $notices = $query->paginate($this->perPage)->withQueryString();

        return Inertia::render('Admin/Notices/Index', [
            'notices' => $notices
        ]);
    }

    public function create() {
        $notice = new Notice();
        return Inertia::render('Admin/Notices/Show', [
            'notice' => $notice,
        ]);
    }

    public function show($id) {
        $notice = Notice::findOrFail($id);
        return Inertia::render('Admin/Notices/Show', [
            'notice' => $notice,
        ]);
    }

    public function delete($id)
    {
        $notice = Notice::find($id);
        DB::beginTransaction();
        try {
            $notice->delete();
            DB::commit();
        } catch (\Throwable $e) {
            DB::rollBack();
            Log::error($e->getMessage());

            return back()->with(['error', __('操作が失敗しました。')]);
        }

        return back()->with('success', __('お知らせ項目を削除しました。'));
    }

    public function store(ContactRequest $request)
    {
        $notice = Notice::find($request->id);
        DB::beginTransaction();
        try {
            if ($notice) {
                $notice->update([
                    'title' => $request->title,
                    'content' => $request->content
                ]);
            } else {
                Notice::create([
                    'title' => $request->title,
                    'content' => $request->content
                ]);
            }
            DB::commit();
        } catch (\Throwable $e) {
            DB::rollBack();
            Log::error($e->getMessage());

            return back()->with(['error', __('操作が失敗しました。')]);
        }

        return redirect(route('admin.notices'))->with('success', __('お知らせを保存しました。'));
    }
}
