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
        if ($current->hasPermissionTo('users.update')) {
            return true;
        }

        if ($toUpdate !== null && $current->id === $toUpdate->id) {
            return true;
        }

        return false;
    }

    public function destroy(User $current, User $toDelete)
    {
        // user has proper permissions
        if ($current->hasPermissionTo('users.delete')) {
            return true;
        }

        // user is deleting own profile
        if ($current->id === $toDelete->id) {
            return true;
        }

        return false;
    }
}
