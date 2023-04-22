<?php

namespace App\Events;

use App\Models\User;
use Illuminate\Database\Eloquent\Collection;

class UsersDeleted
{
    /**
     * @var User[]|Collection
     */
    public array|Collection $users;

    /**
     * @param Collection|User[] $users
     */
    public function __construct(Collection|array $users)
    {
        $this->users = $users;
    }
}
