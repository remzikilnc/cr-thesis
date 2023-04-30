<?php namespace Database\Seeders;

use App\Helpers\GetStaticPermissions;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\PermissionRegistrar;

class PermissionTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(): void
    {
        app()[PermissionRegistrar::class]->forgetCachedPermissions();
        $allPermissions = app(GetStaticPermissions::class)->execute();
        foreach ($allPermissions as $groupName => $group) {
            foreach ($group as $permission) {
                $permission['group'] = $groupName;
                app(Permission::class)->updateOrCreate(['name' => $permission['name'], 'guard_name' => $permission['guard_name'] ?? 'api'], $permission);
            }
        }

        // delete legacy permissions
        app(Permission::class)->whereNull('group')->delete();
    }
}
