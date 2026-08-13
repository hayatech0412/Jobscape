<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProfileUpdateRequest;
use App\Enums\ProductsFilterType;
use App\Enums\ProductSortType;
use App\Enums\UseType;
use App\Enums\Role;
use App\Enums\TransactionStatus;
use App\Models\Opinion;
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

class OpinionController extends Controller
{
    protected $perPage = 15;

    public function index(Request $request)
    {
        $keyword = $request->keyword;
        $use_type = $request->use_type;

        $query = Opinion::query();

        if ($use_type && $use_type != 9) {
            $query->where('use_type', $use_type);
        }

        if ($keyword) {
            $query->where(function($query) use ($keyword) {
                $query->where('title', 'like', "%$keyword%")
                        ->orWhere('content', 'like', "%$keyword%")
                        ->orWhere('nickname', 'like', "%$keyword%")
                        ->orWhere('use_type_other', 'like', "%$keyword%");
            });
        }

        $query->orderBy("updated_at", "desc");
        $opinions = $query->paginate($this->perPage)->withQueryString();

        return Inertia::render('Admin/Opinions/Index', [
            'opinions' => $opinions,
            'use_types' => UseType::getArray(),
        ]);
    }

    public function show($id) {
        $opinion = Opinion::findOrFail($id);
        return Inertia::render('Admin/Opinions/Show', [
            'opinion' => $opinion,
        ]);
    }

    public function delete($id)
    {
        $opinion = Opinion::find($id);
        DB::beginTransaction();
        try {
            $opinion->delete();
            DB::commit();
        } catch (\Throwable $e) {
            DB::rollBack();
            Log::error($e->getMessage());

            return back()->with(['error', __('操作が失敗しました。')]);
        }

        return redirect(route('admin.opinions'))->with('success', __('意見項目を削除しました。'));
    }

    public function store(ContactRequest $request)
    {
        $opinion = Opinion::find($request->id);
        DB::beginTransaction();
        try {
            if ($opinion) {
                $opinion->update([
                    'title' => $request->title,
                    'content' => $request->content
                ]);
            } else {
                Opinion::create([
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

        return redirect(route('admin.Opinions'))->with('success', __('意見項目を保存しました。'));
    }
}
