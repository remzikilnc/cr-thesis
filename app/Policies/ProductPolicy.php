<?php

namespace App\Policies;

use App\Abstracts\BaseUser as User;
use Illuminate\Http\Request;

class ProductPolicy
{
    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    public function index(User $user)
    {
        return $user->hasPermissionTo('products.view');
    }

    public function show(User $user)
    {
        return $user->hasPermissionTo('products.view');
    }

    public function store(User $user)
    {
        return $user->hasPermissionTo('products.create');
    }

    public function update(User $user)
    {
        return $user->hasPermissionTo('products.update');
    }

    public function destroy(User $user)
    {
        return $user->hasPermissionTo('products.delete');
    }

}
