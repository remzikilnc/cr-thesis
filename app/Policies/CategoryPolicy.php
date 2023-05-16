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
        return $user->hasPermissionTo('category.view');
    }

    public function show(User $user)
    {
        return $user->hasPermissionTo('category.view');
    }

    public function store(User $user)
    {
        return $user->hasPermissionTo('category.create');
    }

    public function update(User $user)
    {
        return $user->hasPermissionTo('category.update');
    }

    public function destroy(User $user)
    {
        return $user->hasPermissionTo('category.delete');
    }

}
