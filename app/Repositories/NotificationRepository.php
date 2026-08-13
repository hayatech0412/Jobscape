<?php

namespace App\Repositories;

use App\Models\Notification;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class NotificationRepository extends BaseRepository implements NotificationRepositoryInterface
{
    public function model()
    {
        return Notification::class;
    }

    public function getNotifications()
    {
        $query = $this->model->orderByDesc('created_at')->with(['source', 'product']);

        return $query;
    }

    public function markAsOpen($user) {
        DB::beginTransaction();
        try {
            $notifications = $this->model->where(function ($query) use ($user) {
                $query->where('target_id', $user->id)
                    ->orWhereNull('target_id');
            })->unopened($user->id)->get();

            foreach ($notifications as $notification) {
                $openIds = $notification->open_ids;
                if ($notification->open_ids == 0 || !in_array($user->id ?? 0, $openIds)) {
                    $openIds[] = $user->id;
                    $notification->open_ids = $openIds;
                    $notification->save();
                }
            }
            DB::commit();
        } catch (\Throwable $th) {
            DB::rollBack();
            Log::error($th->getMessage());

            return false;
        }

        return true;
    }

    public function markAsRead($user, $id)
    {
        DB::beginTransaction();
        try {
            $notification = $this->model->find($id);
            $readIds = $notification->read_ids;
            if ($notification->is_read == 0 || !in_array($user->id ?? 0, $readIds)) {
                $readIds[] = $user->id;
                $notification->is_read = 1;
                $notification->read_ids = $readIds;
                $notification->save();
                DB::commit();
            }
        } catch (\Throwable $th) {
            DB::rollBack();
            Log::error($th->getMessage());
        }
    }
}
