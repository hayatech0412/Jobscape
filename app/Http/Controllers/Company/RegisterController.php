<?php

namespace App\Http\Controllers\Company;

use App\Enums\CompanyEarning;
use App\Enums\CompanyEmployee;
use App\Enums\CompanyRegistStep;
use App\Enums\CoporateType;
use App\Enums\Role;
use App\Enums\UserStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Requests\CompanyRequest;
use App\Http\Requests\CoporateCodeRequest;
use App\Http\Requests\OfficeInfoRequest;
use App\Http\Requests\OfficeRequest;
use App\Http\Requests\VerifyCodeRequest;
use App\Models\Category;
use App\Models\Company;
use App\Models\CompanyManager;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

class RegisterController extends Controller
{
    public function index(Request $request)
    {
        return inertia('Company/Register/Index', [
            'back_url' => route('company.login')
        ]);
    }

    public function store(LoginRequest $request)
    {
        // $token = sprintf('%06d', random_int(0, 999999));
        $token = 674053;
        try {
            DB::beginTransaction();
            $user = User::create([
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'verify_token' => $token,
                'verify_token_expire_at' => now()->addMinutes(10),
                'role' => Role::COMPANY,
                'status' => UserStatus::INACTIVE,
            ]);

            $request->session()->put('email', $request->email);

            $data = [
                'verify_token' => $token,
            ];

            $this->notificationService->sendEmail($user->email, 'company.verify', $data);
            DB::commit();
        } catch (Throwable $e) {
            DB::rollBack();
            Log::error($e->getMessage());

            return back()->withErrors([
                'email' => $e->getMessage(),
            ]);
        }

        return redirect()->route('company.register.code_verify.show');
    }

    public function regenerateToken()
    {
        $token = sprintf('%06d', random_int(0, 999999));
        $email = session('email');
        try {
            DB::beginTransaction();

            $user = User::where('email', $email)->first();
            $user->verify_token = $token;
            $user->verify_token_expire_at = now()->addMinutes(10);
            $user->save();

            DB::commit();

            $data = [
                'verify_token' => $token,
            ];
            $this->notificationService->sendEmail($user->email, 'company.verify', $data);
        } catch (\Throwable $th) {
            Log::error($th->getMessage());

            return back()->withErrors([
                'verify_code' => $th->getMessage(),
            ]);
        }

        return back()->withSuccess('認証コードを再送りました。');
    }

    public function showVerifyForm(Request $request)
    {
        return inertia('Company/Register/CodeVerify', [
            'back_url' => route('company.register.index')
        ]);
    }

    public function verifyCode(VerifyCodeRequest $request)
    {
        $email = session('email');
        $user = User::where('email', $email)->first();
        if ($user->verify_token !== $request->verify_code) {
            return back()->withErrors([
                'verify_code' => '認証コードが一致しません。',
            ]);
        }

        if ($user->verify_token_expire_at->isPast()) {
            return back()->with(['error' => '認証コードの有効期限が切れました。']);
        }

        $user->update([
            'verify_token' => null,
            'verify_token_expire_at' => null,
            'email_verified_at' => now(),
        ]);

        auth('company')->login($user);

        return redirect()->route('company.register.coporate_code.show');
    }

    public function showCoporateCodeForm(Request $request)
    {
        $user = auth('company')->user();

        if ($request->has('coporate_code') && !empty($request->coporate_code)) {
            $coporateInfo = $this->getCoporateInfoFromAPI($request->coporate_code);
            $company['coporate'] = $coporateInfo;
            $company['coporate_code'] = $request->coporate_code;

            return response()->json([
                'company' => $company,
                'back_url' => route('company.register.coporate_code.show')
            ]);
        }

        if (!is_null($user->company) && $user->company->regist_step == CompanyRegistStep::STEP_WORKSINFO) {
            return redirect()->route('company.mypage.dashboard');
        }

        return inertia('Company/Register/CoporateCode', [
            'company' => $user->company,
            'regist_step' => CompanyRegistStep::STEP_START,
            'back_url' => route('company.login')
        ]);
    }

    public function storeCoporate(CoporateCodeRequest $request)
    {
        try {
            DB::beginTransaction();
            $user = auth('company')->user();
            $company = Company::firstOrCreate([
                'user_id' => $user->id
            ]);

            $coporateInfo = $this->getCoporateInfoFromAPI($request->coporate_code);
            $coporateInfo['coporate_code'] = $request->coporate_code;
            $coporateInfo['regist_step'] = CompanyRegistStep::STEP_COPORATECODE;
            $company->update($coporateInfo);

            DB::commit();
        } catch (Throwable $e) {
            DB::rollBack();
            Log::error($e->getMessage());

            return back()->with([
                'errors' => $e->getMessage(),
            ]);
        }
        return redirect()->route('company.register.company.show');
    }

    public function showCompanyForm(Request $request)
    {
        $user = auth('company')->user();
        $company = $user->company;
        $coporate_types = CoporateType::getArray();
        return inertia('Company/Register/Company', [
            'company' => $company,
            'coporate_types' => $coporate_types,
            'back_url' => route('company.register.coporate_code.show')
        ]);
    }

    public function storeCompany(CompanyRequest $request)
    {
        DB::beginTransaction();
        try {
            $data = $request->all();

            if (!$data['is_site_url']) $data['site_url'] = null;
            $isPamphlet = $data['is_pamphlet'] == true;
            if (!$isPamphlet) $data['pamphlet'] = null;

            $user = auth('company')->user();
            $company = Company::firstOrcreate([
                'user_id' => $user->id
            ]);
            $data['regist_step'] = CompanyRegistStep::STEP_COPORATEINFO;
            $company->update($data);

            if ($isPamphlet) {
                if (isset($data['pamphlet_file'])) {
                    $file = $data['pamphlet_file'];
                    $path = Storage::disk('public')->put('/uploads/pamphlets/', $file);
                    $company->pamphlet_path = $path;
                    $company->save();
                }
            } else {
                $company->pamphlet_path = null;
                $company->save();
            }

            DB::commit();
        } catch (\Throwable $e) {
            DB::rollBack();
            Log::error($e->getMessage());

            return back()->with('error', $e->getMessage());
        }
        return redirect()->route('company.register.office.show');
    }

    public function showOfficeForm(Request $request)
    {
        $user = auth('company')->user();
        $company = $user->company;
        return inertia('Company/Register/Office', [
            'company' => $company,
            'back_url' => route('company.register.company.show')
        ]);
    }

    public function storeOffice(OfficeRequest $request)
    {
        DB::beginTransaction();
        try {
            $data = $request->all();
            $user = auth('company')->user();
            $company = Company::firstOrCreate([
                'user_id' => $user->id
            ]);
            $data['regist_step'] = CompanyRegistStep::STEP_OFFICEINFO;
            $company->update($data);

            DB::commit();
        } catch (\Throwable $e) {
            DB::rollBack();
            Log::error($e->getMessage());

            return back()->with(['error', $e->getMessage()]);
        }

        return redirect()->route('company.register.office.info.show');
    }

    public function showOfficeInfoForm(Request $request)
    {
        $user = auth('company')->user();
        $company = $user->company->load(['managers']);
        $categories = Category::get()->toArray();

        return inertia('Company/Register/OfficeInfo', [
            'back_url' => route('company.register.office.show'),
            'originCompany' => $company,
            'employee_counts' => CompanyEmployee::getArray(),
            'earning_amounts' => CompanyEarning::getArray(),
            'categories' => $categories,
        ]);
    }

    public function storeOfficeInfo(OfficeInfoRequest $request)
    {
        DB::beginTransaction();
        try {
            $user = auth('company')->user();
            $company = Company::firstOrCreate([
                'user_id' => $user->id
            ]);

            $company->employee_count = $request->employee_count;
            $company->earning_amount = $request->earning_amount;
            $company->category_id = $request->main_category;
            $company->regist_step = CompanyRegistStep::STEP_WORKSINFO;
            $company->save();

            if ($request->is_exist_other == "1") {
                $managers = $request->managers;

                CompanyManager::where('company_id', $company->id)->delete();
                foreach ($managers as $manager) {
                    if (
                        !(is_null($manager['first_name']) &&
                            is_null($manager['last_name']) &&
                            is_null($manager['first_kana']) &&
                            is_null($manager['last_kana']) &&
                            is_null($manager['phone_number']) &&
                            is_null($manager['email']) &&
                            is_null($manager['card_front']) &&
                            is_null($manager['card_back']))
                    ) {
                        $manager['company_id'] = $company->id;
                        $newManager = CompanyManager::create($manager);
                        if (isset($manager['card_front_file']) && !is_null($manager['card_front_file'])) {
                            $file = $manager['card_front_file'];
                            $path = Storage::disk('public')->put('/uploads/companies/' . $company->id . '/managers/', $file);
                            $newManager->card_front_path = '/storage/' . $path;
                            $newManager->save();
                        }

                        if (isset($manager['card_back_file']) && !is_null($manager['card_back_file'])) {
                            $file = $manager['card_back_file'];
                            $path = Storage::disk('public')->put('/uploads/companies/' . $company->id . '/managers/', $file);
                            $newManager->card_back_path = '/storage/' . $path;
                            $newManager->save();
                        }
                    }
                }
            }

            DB::commit();
        } catch (\Throwable $e) {
            DB::rollBack();
            Log::error($e->getMessage());

            dd($e->getMessage());

            return back()->with(['error' => $e->getMessage()]);
        }
        return redirect()->route('company.register.complete');
    }

    public function showComplete(Request $request)
    {
        return inertia('Company/Register/Complete', [
            'back_url' => route('company.register.office.info.show'),
        ]);
    }

    private function getCoporateInfoFromAPI($coporate_code)
    {
        // try {
        //     $appID = config('services.houjin_bangou.app_id');
        //     $url = 'https://api.houjin-bangou.nta.go.jp/4/num';
        //     $params = [
        //         'id' => $appID,          // APIキー
        //         'number' => $coporate_code,     // 法人番号
        //         'type' => '12',                 // パラメータ type
        //         'history' => '0',               // パラメータ history
        //     ];
        //     // APIリクエストの送信
        //     $response = Http::get($url, $params);

        //     if (!$response->successful()) {
        //         return null;
        //     }

        //     // XMLの内容を取得
        //     $xmlContent = $response->body();

        //     // XMLをSimpleXMLでパース
        //     $xml = simplexml_load_string($xmlContent);

        //     // "法人情報を取得
        //     $coporate_name = (string) $xml->data->name;
        //     $coporate_code = (string) $xml->data->corporateNumber;
        //     $postal_code = (string) $xml->data->postCode;
        //     $pref = (string) $xml->data->prefectureName;
        //     $city = (string) $xml->data->cityName;
        //     $area = '';
        //     $street = (string) $xml->data->streetNumber;
        //     $building = '';
        //     $address = $pref . $city . $area . $street . $building;
        // } catch (\Throwable $e) {
        //     Log::error($e->getMessage());

        //     return null;
        // }
        // return [
        //     'coporate_name' => $coporate_name,
        //     'coporate_code' => $coporate_code,
        //     'postal_code' => $postal_code,
        //     'address' => $address,
        //     'pref' => $pref,
        //     'city' => $city,
        //     'area' => '',
        //     'street' => $street,
        //     'building' => '',
        // ];

        // *******  Test  ********
        return [
            'coporate_name' => 'JOBSCAPE',
            'coporate_code' => $coporate_code,
            'postal_code' => '123-4567',
            'address' => '東京都中央区築地 T-3-4-13 電気工事会館 5階',
            'pref' => '東京都',
            'city' => '中央区',
            'area' => '築地',
            'street' => '3-4-13',
            'building' => '電気工事会館 5階',
        ];
    }

    public function checkRegistStep()
    {
        $user = User::find(auth('company')->user()->id);
        if ($user->has('company') == false) {
            return CompanyRegistStep::STEP_COPORATECODE;
        }

        $company = $user->company;
        return $company->regist_step;
    }

    public function redirectByStep()
    {
        $user = User::find(auth('company')->user()->id);
        if ($user->has('company') == false) {
            return redirect()->route('company.register.coporate_code.show');
        }

        $company = $user->company;
        if ($company->regist_step == CompanyRegistStep::STEP_COPORATECODE) {
            return redirect()->route('company.register.company.show');
        } elseif ($company->regist_step == CompanyRegistStep::STEP_COPORATEINFO) {
            return redirect()->route('company.register.office.show');
        } elseif ($company->regist_step == CompanyRegistStep::STEP_OFFICEINFO) {
            return redirect()->route('company.register.office.info.show');
        } elseif ($company->regist_step == CompanyRegistStep::STEP_WORKSINFO) {
            return redirect()->route('company.register.complete');
        }
    }
}
