<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use Carbon\Carbon;
use App\Models\Product;
use App\Models\Notice;

class NoticeController extends Controller
{
    /**
     * Display the user's mypage.
     */
    public function index(Request $request): Response
    {
        $user = auth('web')->user();
        $visited_prodcuts = $user->visitedProducts()->paginate(10);
        $notices = Notice::orderBy('created_at', 'desc')->paginate(5);
        return Inertia::render('User/Notice/Index', [
            'notices' => $notices,
        ]);
    }
}
