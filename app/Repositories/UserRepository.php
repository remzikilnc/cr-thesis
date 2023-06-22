<?php namespace App\Repositories;

use App\Models\User;
use App\Events\UserCreated;
use App\Events\UsersDeleted;
use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Exceptions\RoleDoesNotExist;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Throwable;

class UserRepository
{

    protected $user;
    protected $role;
    protected $permission;

    public function __construct(User $user, Role $role, Permission $permission)
    {
        $this->user = $user;
        $this->role = $role;
        $this->permission = $permission;
    }

    /**
     * Find user with given id or throw an error.
     *
     * @param integer $id
     * @param array $lazyLoad
     * @return Builder|Builder[]|Collection|Model
     */
    public function findOrFail($id, array $lazyLoad = [])
    {
        return $this->user->with($lazyLoad)->findOrFail($id);
    }

    /**
     * Return first user matching attributes or create a new one.
     *
     * @param array $params
     * @return User
     */
    public function firstOrCreate($params): User
    {
        $user = $this->user->where('email', $params['email'])->first();

        if (is_null($user)) {
            $user = $this->create($params);
        }

        return $user;
    }

    /**
     * @param array $params
     * @return User
     * @throws Throwable
     */
    public function create(array $params): User
    {
        /** @var User $user */
        $user = $this->user->forceCreate($this->formatParams($params));

        try {
            if (!isset($params['roles']) || !$this->syncRoles($user, $params['roles'])) {
                $this->assignDefaultRole($user);
            }
        } catch (Exception $e) {
            //delete user if there were any errors creating/assigning
            $user->delete();
            throw($e);
        }

        event(new UserCreated($user));

        return $user;
    }

    /**
     * @param User $user
     * @param array $params
     *
     * @return User
     */
    public function update(User $user, $params): User
    {
        $user->forceFill($this->formatParams($params, 'update'))->save();
        // todo may be bug in role & perms
        // make sure roles and permission are not removed
        // if they are not specified at all in params
        if (array_key_exists('roles', $params)) {
            $user->attachRoles($user, Arr::get($params, 'roles'));
        }
        if (array_key_exists('permissions', $params)) {
            $user->syncPermissions($user, Arr::get($params, 'permissions'));
        }

        return $user->load(['roles', 'permissions']);
    }

    /**
     * @param \Illuminate\Support\Collection $ids
     * @return integer
     * //todo
     */
    public function deleteMultiple($ids): int
    {
        $users = $this->user->whereIn('id', $ids)->get();

        $users->each(function (User $user) {
            $user->roles()->detach();
            $user->permissions()->detach();
            $user->tokens()->delete();
            $user->delete();
            //todo comment review

        });

        event(new UsersDeleted($users));

        return $users->count();
    }

    /**
     * Prepare given params for inserting into database.
     *
     * @param array $params
     * @param string $type
     * @return array
     */
    protected function formatParams(array $params, $type = 'create'): array
    {
        $formatted = [
            'first_name' => $params['first_name'] ?? null,
            'last_name' => $params['last_name'] ?? null,
            'address' => $params['address'] ?? null,
            'city' => $params['city'] ?? null,
            'postcode' => $params['postcode'] ?? null,
        ];

        $formatted['email'] = $params['email'];

        if (isset($params['email_verified_at'])) {
            $formatted['email_verified_at'] = $params['email_verified_at'];
        }

        if (isset($params['gender'])) {
            $formatted['gender'] = $params['gender'];
        }

        if ($type === 'create') {
            $formatted['password'] = Arr::get($params, 'password') ? Hash::make(($params['password'])) : null;
        } else if ($type === 'update' && Arr::get($params, 'old_password') && Arr::get($params, 'new_password')) {
            $formatted['password'] = Hash::make($params['new_password']);
        }

        return $formatted;
    }

    /**
     * @param User $user
     * @param string|array $roles
     * @return User|false
     */
    protected function syncRoles(User $user, string|array $roles): bool|User
    {
        $validRoles = [];
        if (empty($roles)) {
            // if $roles is a string, tek elemanlı bir diziye dönüştür
            if (is_string($roles)) {
                $roles = [$roles];
            }
            foreach ($roles as $roleName) {
                try {
                    $role = $this->role->findByName($roleName, 'api');
                    $validRoles[] = $role->name;
                } catch (RoleDoesNotExist $e) {
                    continue;
                }
            }
        }

        if (empty($validRoles)) {
            return false;
        } else return $user->syncRoles($validRoles);
    }

    /**
     * Detach specified roles from user.
     *
     * @param User $user
     * @param $roles
     * @return User
     */
    public function detachRoles(User $user, $roles): User
    {
        return $user->removeRole($roles);

    }

    /**
     * Add specified permissions to user.
     *
     * @param User $user
     * @param $permissions
     * @return User
     */
    public function addPermissions(User $user, $permissions): User
    {
        return $user->givePermissionTo($permissions);
    }

    /**
     * Remove specified permissions from user.
     *
     * @param User $user
     * @param $permissions
     * @return User
     */
    public function removePermissions(User $user, $permissions): User
    {
        return $user->revokePermissionTo($permissions);
    }

    /**
     * Assign default role to given user.
     *
     * @param User $user
     */
    protected function assignDefaultRole(User $user): void
    {

        $defaultRole = $this->getDefaultRole();

        if ($defaultRole) {
            $user->assignRole($defaultRole);
        }
    }

    private function getDefaultRole()
    {

        return $this->role->where('default', 1)->where('guard_name', 'api')->first();
    }
}
