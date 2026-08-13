<?php

namespace App\Repositories;

use App\Models\AppliedJob;
use App\Models\CancelJobRequest;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class UserRepository extends BaseRepository implements UserRepositoryInterface
{
    public function model()
    {
        return User::class;
    }

}
