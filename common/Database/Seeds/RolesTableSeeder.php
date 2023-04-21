<?php namespace Common\Database\Seeds;

use App\Models\User;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Contracts\Filesystem\FileNotFoundException;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Filesystem\Filesystem;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolesTableSeeder extends Seeder
{

    /**
     * @var Role
     */
    private $role;

    /**
     * @var User
     */
    private $user;

    /**
     * @var Permission
     */
    private $permission;

    /**
     * @var Filesystem
     */
    private $fs;

    /**
     * @var array
     */
    private $commonConfig;

    /**
     * @var array
     */
    private $appConfig;

    /**
     * @param Role $role
     * @param User $user
     * @param Permission $permission
     * @param Filesystem $fs
     */
    public function __construct(Role $role, User $user, Permission $permission, Filesystem $fs)
    {
        $this->user = $user;
        $this->role = $role;
        $this->permission = $permission;
        $this->fs = $fs;
    }

    /**
     * @return void
     * @throws FileNotFoundException
     */
    public function run(): void
    {
        $this->commonConfig = $this->fs->getRequire(app('path.common') . '/resources/config/permissions.php');

        foreach ($this->commonConfig['roles'] as $appRole) {
            $this->createOrUpdateRole($appRole);
        }

        $this->attachUsersRoleToExistingUsers();
    }


    /**
     * @param $commonRole
     * @return Role
     */
    private function createOrUpdateRole($commonRole): Role
    {
        $defaultPermissions = collect($commonRole['permissions'])->map(function($permission) {
            return is_string($permission) ? ['name' => $permission] : $permission;
        });

        $dbPermissions = $this->permission->whereIn('name', $defaultPermissions->pluck('name'))->get();
        $dbPermissions->map(function(Permission $permission) use($defaultPermissions) {
            return $permission;
        });

        if (Arr::get($commonRole, 'default')) {
            $attributes = ['default' => true];
            $this->role->where('name', $commonRole['name'])->update(['default' => true]);
        } else if (Arr::get($commonRole, 'guests')) {
            $attributes = ['guests' => true];
            $this->role->where('name', $commonRole['name'])->update(['guests' => true]);
        } else {
            $attributes = ['name' => $commonRole['name']];
        }

        $role = $this->role->firstOrCreate($attributes, Arr::except($commonRole, ['permissions']));
        $role->syncPermissions($dbPermissions);
        $role->save();

        return $role;
    }

    /**
     * Attach default user's role to all existing users.
     */
    private function attachUsersRoleToExistingUsers()
    {
        $role = $this->role->where('default', true)->first();

        $this->user->with('roles')->whereDoesntHave('roles', function(Builder $query) use($role) {
            return $query->where('roles.id', $role->id);
        })->select('id')->chunk(500, function(Collection $users) use($role) {
            $insert = $users->map(function(User $user) use($role) {
                return ['user_id' => $user->id, 'role_id' => $role->id, 'created_at' => Carbon::now()];
            })->toArray();
            DB::table('user_role')->insert($insert);
        });
    }
}
