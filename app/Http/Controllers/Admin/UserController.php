<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProfileUpdateRequest;
use App\Enums\ProductsFilterType;
use App\Enums\ProductSortType;
use App\Enums\RewardFilterType;
use App\Enums\Role;
use App\Enums\TransactionStatus;
use App\Models\User;
use App\Models\Profile;
use App\Models\Category;
use App\Repositories\ProductRepository;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use App\Http\Requests\AccountInfoRequest;
use App\Http\Requests\BusinessInfoStoreRequest;
use App\Http\Requests\EmailStoreRequest;
use App\Http\Requests\PasswordStoreRequest;
use App\Http\Requests\PersonalInfoStoreRequest;
use App\Http\Requests\PhoneNumberStoreRequest;
use Inertia\Inertia;
use Inertia\Response;
use Carbon\Carbon;
use Illuminate\Support\Facades\Storage;
use DB;

class UserController extends Controller
{
    protected $perPage = 10;
    protected $productRepository;

    function __construct(ProductRepository $productRepository)
    {
        $this->productRepository = $productRepository;
    }

    public function index(Request $request)
    {
        $keyword = $request->keyword;

        $query = User::onlyUsers()->with('profile');

        if ($keyword) {
            $query->where(function($query) use ($keyword) {
                $query->where('email', 'like', "%$keyword%")
                        ->orWhereHas('profile', function($query) use ($keyword) {
                            $query->where('first_name', 'like', "%$keyword%")
                                ->orWhere('last_name', 'like', "%$keyword%")
                                ->orWhere('first_kana', 'like', "%$keyword%")
                                ->orWhere('last_kana', 'like', "%$keyword%")
                                ->orWhere('nickname', 'like', "%$keyword%")
                                ->orWhere('appeal_statement', 'like', "%$keyword%")
                                ->orWhere('introduction', 'like', "%$keyword%");
                        });
            });
        }

        $query->orderBy("created_at", "desc");
        $users = $query->paginate($this->perPage)->withQueryString();

        return Inertia::render('Admin/Users/Index', [
            'users' => $users
        ]);
    }

    public function filter(Request $request)
    {
        $keyword = $request->keyword;
        $has = $request->has;

        $query = User::onlyUsers()->with('profile');

        if ($keyword) {
            $query->where(function($query) use ($keyword) {
                $query->where('email', 'like', "%$keyword%")
                        ->orWhereHas('profile', function($query) use ($keyword) {
                            $query->where('first_name', 'like', "%$keyword%")
                                ->orWhere('last_name', 'like', "%$keyword%")
                                ->orWhere('first_kana', 'like', "%$keyword%")
                                ->orWhere('last_kana', 'like', "%$keyword%")
                                ->orWhere('nickname', 'like', "%$keyword%")
                                ->orWhere('appeal_statement', 'like', "%$keyword%")
                                ->orWhere('introduction', 'like', "%$keyword%");
                        });
            });
        }

        if ($has) {
            $query->whereHas($has);
        }

        $users = $query->limit($this->perPage)->get();

        return response()->json($users);
    }

    public function show($id) {
        $user = User::findOrFail($id);
        $prefectures = config('values.prefectures');
        $profile = Profile::where('user_id', $id)->with(['plan', 'categories'])->first();
        return Inertia::render('Admin/Users/Show', [
            'user' => $user,
            'profile' => $profile,
            'now' => Carbon::now(),
            'prefs' => $prefectures,
        ]);
    }

    public function delete($id)
    {
        $user = User::find($id);
        DB::beginTransaction();
        try {
            $user->delete();
            DB::commit();
        } catch (\Throwable $e) {
            DB::rollBack();
            Log::error($e->getMessage());

            return redirect(route('admin.users'))->with(['error', __('操作が失敗しました。')]);
        }

        return redirect(route('admin.users'))->with('success', __('ユーザーを削除しました。'));
    }

    public function edit($id) {
        $user = User::findOrFail($id);
        $prefectures = config('values.prefectures');
        $profile = Profile::where('user_id', $id)->with('plan', 'categories')->first();
        return Inertia::render('Admin/Users/Edit', [
            'user' => $user,
            'profile' => $profile,
            'categories' => Category::get(),
            'Genders' => \App\Enums\Gender::getArray(),
            'category_ids' => $user->profile?->categories->pluck('id')->toArray() ?? [],
            'area_categories' => config('values.area_categories'),
            'prefs' => $prefectures,
        ]);
    }

    public function accountInfoStore(AccountInfoRequest $request, User $user): RedirectResponse
    {       
        $params = $request->all();

        try {
            DB::beginTransaction();            

            $user->profile->update($params);
            
            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
            \Log::error($e->getMessage());

            return back()->with('error', __('操作が失敗しました。'));
        }      

        return back()->with('success', __('アカウント情報を保存しました。'));
    }

    public function emailStore(EmailStoreRequest $request, User $user): RedirectResponse
    {       
        $email = $request->email;
        try {
            DB::beginTransaction();            

            $user->update(['email' => $email]);
            
            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
            \Log::error($e->getMessage());

            return back()->with('error', __('操作が失敗しました。'));
        }      

        return back()->with('success', __('メールアドレスを保存しました。'));
    }

    public function passwordStore(PasswordStoreRequest $request, User $user): RedirectResponse
    {       
        $password = $request->password ?? 'password';
        try {
            DB::beginTransaction();            

            $user->update(['password' => Hash::make($password)]);
            
            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
            \Log::error($e->getMessage());

            return back()->with('error', __('操作が失敗しました。'));
        }      

        return back()->with('success', __('パスワードを保存しました。'));
    }

    public function phoneNumberStore(PhoneNumberStoreRequest $request, User $user): RedirectResponse
    {       
        $phone_number = $request->phone_number;
        try {
            DB::beginTransaction();            

            $user->profile->update(['phone_number' => $phone_number]);
            
            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
            \Log::error($e->getMessage());

            return back()->with('error', __('操作が失敗しました。'));
        }      

        return back()->with('success', __('電話番号を保存しました。'));
    }

    public function categoryStore(Request $request, User $user): RedirectResponse
    {
        $profile = $user->profile;
        $caregoryIds = json_decode($request->category_ids);
        try {
            DB::beginTransaction();
            
            $profile->categories()->detach();
            foreach ($caregoryIds as $categoryId) {
                $profile->categories()->attach($categoryId);
            }
            
            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
            \Log::error($e->getMessage());

            return back()->with('error', __('操作が失敗しました。'));
        }      

        return back()->with('success', __('関心のあるカテゴリを保存しました。'));
    }

    public function areaStore(Request $request, User $user) {
        $profile = $user->profile;
        try {
            DB::beginTransaction();
            $profile->update([
                'prefectures' => $request->prefectures,
            ]);
            
            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
            \Log::error($e->getMessage());

            return back()->with('error', __('操作が失敗しました。'));
        }
        return back()->with('success', __('希望する商材の地域を保存しました。'));
    }

    public function updateImage(Request $request, User $user)
    {
        $request->validate(
            [
                'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            ],
            [
                'image.required' => '画像は必須です。',
                'image.image' => 'アップロードされたファイルは画像形式でなければなりません。',
                'image.mimes' => '画像は jpeg, png, jpg, gif のいずれかの形式である必要があります。',
                'image.max' => '画像のサイズは 2MB 以下でなければなりません。',
            ]
        );

       

        if ($user->avatar) {
            Storage::disk('public')->delete($user->avatar);
        }
        // 新しい画像を保存
        $path = $request->file('image')->store('user/avatar', 'public');

        // ユーザー情報を更新
        $user->update(['avatar' => $path]);

        return redirect()->back()->with('success', 'プロフィール画像が更新されました。');
    }

    public function personalInfoStore(PersonalInfoStoreRequest $request, User $user) {
        $profile = $user->profile;
        $params = $request->all();
        try {
            DB::beginTransaction();
            $profile->update($params);
            
            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
            \Log::error($e->getMessage());

            return back()->with('error', __('操作が失敗しました。'));
        }
        return back()->with('success', __('本人情報を保存しました。'));
    }

    public function businessInfoStore(BusinessInfoStoreRequest $request, User $user) {
        $profile = $user->profile;
        $params = $request->all();
        try {
            DB::beginTransaction();
            $profile->update($params);
            
            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
            \Log::error($e->getMessage());

            return back()->with('error', __('操作が失敗しました。'));
        }
        return back()->with('success', __('事業者情報を保存しました。'));
    }
}
