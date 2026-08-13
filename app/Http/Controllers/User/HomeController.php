<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProfileUpdateRequest;
use App\Enums\ProductsFilterType;
use App\Enums\ProductSortType;
use App\Enums\RewardFilterType;
use App\Models\Product;
use App\Repositories\ProductRepository;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    protected $productRepository;

    function __construct(ProductRepository $productRepository)
    {
        $this->productRepository = $productRepository;
    }

    public function index(Request $request)
    {
        $user = auth('web')->user();

        if (!isset($user->profile)) {
            return redirect()->route('account.info')->with('info', 'プロフィールを登録してください。');
        }

        $high_rate_products = $this->productRepository->getHighPercentProducts($request);
        $interested_products = $this->productRepository->getInterestedProducts($request);
        $pickup_products = $this->productRepository->getPickupProducts($request);
        $realtime_products = $this->productRepository->getRealtimeProducts($request);
        $expiring_products = $this->productRepository->getExpiringProducts($request);
        $all_products = Product::isReleased()->orderByDesc('updated_at')->paginate(30);

        return Inertia::render('User/Home/Index', [
            'profile' => $user->profile,
            'high_rate_products' => $high_rate_products,
            'interested_products' => $interested_products,
            'pickup_products' => $pickup_products,
            'realtime_products' => $realtime_products,
            'expiring_products' => $expiring_products,
            'all_products' => $all_products,
            'products_filter_types' =>  ProductsFilterType::getArray(),
            'products_sort_types' =>  ProductSortType::getArray(),
            'reward_filter_type' =>  RewardFilterType::getArray(),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
