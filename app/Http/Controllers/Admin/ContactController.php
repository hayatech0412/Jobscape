<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProfileUpdateRequest;
use App\Enums\ProductsFilterType;
use App\Enums\ProductSortType;
use App\Enums\RewardFilterType;
use App\Enums\Role;
use App\Enums\TransactionStatus;
use App\Models\Contact;
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

class ContactController extends Controller
{
    protected $perPage = 15;

    public function index(Request $request)
    {
        $keyword = $request->keyword;

        $query = contact::query();

        if ($keyword) {
            $query->where(function($query) use ($keyword) {
                $query->where('title', 'like', "%$keyword%")
                    ->orWhere('content', 'like', "%$keyword%");
            });
        }

        $query->orderBy("created_at", "desc");
        $contacts = $query->paginate($this->perPage)->withQueryString();

        return Inertia::render('Admin/Contacts/Index', [
            'contacts' => $contacts
        ]);
    }

    public function show($id) {
        $contact = contact::findOrFail($id);
        return Inertia::render('Admin/Contacts/Show', [
            'contact' => $contact,
        ]);
    }

    public function delete($id)
    {
        $contact = contact::find($id);
        DB::beginTransaction();
        try {
            $contact->delete();
            DB::commit();
        } catch (\Throwable $e) {
            DB::rollBack();
            Log::error($e->getMessage());

            return back()->with(['error', __('操作が失敗しました。')]);
        }

        return redirect(route('admin.contacts'))->with('success', __('問い合わせ内容を削除しました。'));
    }
}
