<?php

namespace App\Http\Controllers;

use App\Actions\PaginateUsers;
use App\Models\User;
use App\Repositories\UserRepository;
use App\Services\Settings;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\Request;

class UserController extends BaseController
{

    public function __construct(
        User           $user,
        UserRepository $userRepository,
        Request        $request,
        Settings       $settings
    ) {
        $this->user = $user;
        $this->request = $request;
        $this->userRepository = $userRepository;
        $this->settings = $settings;
        /*   $this->middleware('auth', ['except' => ['show']]);*/
    }

    /**
     * @throws AuthorizationException
     */
    public function index(Request $request)
    {
        $this->authorize('index', User::class);

        return response()->ok('indexMethod');

    }

    public function show(User $user)
    {
        $this->authorize('show', $user);

        $relations = array_filter(
            explode(',', $this->request->get('with', '')),
        );
        $relations = array_merge(['roles'], $relations);

        $user->load($relations);

        return response()->ok(['user' => $user]);

    }
}
