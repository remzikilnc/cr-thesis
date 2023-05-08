<?php

namespace App\Http\Controllers;

use App\Actions\PaginateUsers;
use App\Events\UsersDeleted;
use App\Models\User;
use App\Repositories\UserRepository;
use App\Services\Settings;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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

        // params:
        // role_name,
        // permission,
        // (orderBy) last_name // first-name // created_at -> asc, desc
        // query

        $pagination = app(PaginateUsers::class)->execute($this->request->all());


        return response()->ok($pagination);

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

    /**
     * @throws AuthorizationException
     */
    public function destroy(string $UserID)
    {
        $this->authorize('destroy', [User::class, $UserID]);

        $user = $this->user->where('id', $UserID)->first();

        /*todo
            if ($user is_admin) {
                return response()->error(
                    "Could not delete admin user",
                );
            }
        */

        if ($user){
            $user->roles()->detach();
            $user->permissions()->detach();
            $user->tokens()->delete();
            $user->delete();
            //todo comment & review
            event(new UsersDeleted([$user]));
            return response()->noContent(200);
        }else {
            return response()->notFound();
        }

        //Todo Currently, a single user can be deleted, configure it to be multiple.

/*        $this->userRepository->deleteMultiple($user->pluck('id'));*/

    }
}
