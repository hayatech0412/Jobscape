<?php

namespace App\Http\Controllers\Company;

use App\Http\Controllers\Controller;
use App\Http\Resources\NotificationResource;
use App\Models\Notification;
use App\Repositories\NotificationRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class NotificationController extends Controller
{
    protected $notificationRepository;
    protected $perPage = 10;

    public function __construct(NotificationRepository $notificationRepository)
    {
        $this->notificationRepository = $notificationRepository;
    }

    public function index()
    {
        return inertia('Company/Notifications/Index', [
            'pageData' => $this->getNotifications(),
            'headers' => [
                [
                    'text' => 'タイトル',
                    'value' => 'title'
                ],
                [
                    'text' => '送信日時',
                    'value' => 'created_at'
                ],
            ],
        ]);
    }

    public function show($id)
    {
        $user = auth('company')->user();
        if ($user) {
            try {
                $this->notificationRepository->markAsRead($user, $id);
            } catch (\Throwable $e) {
                Log::error($e->getMessage());

                return back()->with(['error' => $e->getMessage()]);
            }
        }

        return inertia('Company/Notifications/Show', [
            'notification' => $this->getNotificationById($id)
        ]);
    }

    public function open()
    {
        $user = auth('company')->user();
        if ($user) {
            try {
                $result = $this->notificationRepository->markAsOpen($user);

                if (!$result) {
                    return response()->json(['result' => 'error']);
                }
            } catch (\Throwable $e) {
                Log::error($e->getMessage());

                return response()->json(['result' => 'error']);
            }
        }

        return response()->json(['result' => 'success']);
    }

    public function getNotifications()
    {
        return NotificationResource::collection($this->notificationRepository->getNotifications()->paginate($this->perPage));
    }

    public function getNotificationById($id)
    {
        return new NotificationResource($this->notificationRepository->find($id));
    }
}
