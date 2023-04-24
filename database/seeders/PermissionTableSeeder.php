<?php namespace Database\Seeders;

use App\Helpers\GetStaticPermissions;
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
