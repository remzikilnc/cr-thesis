<?php

namespace App\Policies;

use App\Abstracts\BaseUser as User;
use Illuminate\Http\Request;

class CategoryPolicy
{
    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    public function index(User $user)
    {
        return $user->hasPermissionTo('categories.view');
    }

    public function show(User $user)
    {
        return $user->hasPermissionTo('categories.view');
    }

    public function store(User $user)
    {
        return $user->hasPermissionTo('categories.create');
    }

    public function update(User $user)
    {
        return $user->hasPermissionTo('categories.update');
    }

    public function destroy(User $user)
    {
        return $user->hasPermissionTo('categories.delete');
    }

}
