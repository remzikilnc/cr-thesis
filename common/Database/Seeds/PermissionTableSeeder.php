<?php namespace Common\Database\Seeds;

use Common\Core\Values\GetStaticPermissions;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class PermissionTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(): void
    {
        $allPermissions = app(GetStaticPermissions::class)->execute();
        $allPermissions['admin'][] = [
            'name' => 'admin',
            'guard_name' => 'web',
            'display_name' => 'Super Admin',
            'description' => 'Give all permissions to user.',
        ];

        foreach ($allPermissions as $groupName => $group) {
            foreach ($group as $permission) {
                $permission['group'] = $groupName;
                app(Permission::class)->updateOrCreate(['name' => $permission['name']], $permission);
            }
        }

        // delete legacy permissions
        app(Permission::class)->whereNull('group')->delete();
    }
}
