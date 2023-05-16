<?php

namespace App\Policies;

use App\Abstracts\BaseUser as User;
use Illuminate\Http\Request;

class ImagePolicy
{
    public function __construct(Request $request)
    {
        $this->request = $request;
    }

    public function index(User $user)
    {
        return $user->hasPermissionTo('image.index');
    }

    public function show(User $user)
    {
        return $user->hasPermissionTo('image.show');
    }

    public function store(User $user)
    {
        return $user->hasPermissionTo('image.store');
    }

    public function update(User $user)
    {
        return $user->hasPermissionTo('image.update');
    }

    public function destroy(User $user)
    {
        return $user->hasPermissionTo('image.delete');
    }

}
