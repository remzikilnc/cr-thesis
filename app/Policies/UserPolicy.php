<?php

namespace App\Policies;

use App\Abstracts\BaseUser as User;
use Illuminate\Http\Request;

/**
 * @property Request $request
 */
class UserPolicy
{
    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    public function index(User $user)
    {
        return $user->hasPermissionTo('users.view');
    }

    public function show(User $current, User $requested)
    {
        return $current->hasPermissionTo('users.view') || $current->id === $requested->id;
    }

    public function store(User $user)
    {
        return $user->hasPermissionTo('users.create');
    }

    public function update(User $current, User $toUpdate = null)
    {
        // user has proper permissions
        if ($current->hasPermissionTo('users.update')) {
            return true;
        }

        return true;
    }

    public function destroy(User $user, array $userIds)
    {
        $deletingOwnAccount = collect($userIds)->every(function (
            int $userId
        ) use ($user) {
            return $userId === $user->id;
        });

        return $deletingOwnAccount || $user->hasPermissionTo('users.delete');
    }

}
