<?php

// database/seeders/UserSeeder.php

namespace Database\Seeders;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class DefaultAdminSeeder extends Seeder
{
    public function run()
    {
        $adminRole = Role::create([
            'name' => 'admin',
            'guard_name' => 'api',
        ]);

        $adminPermission = Permission::create([
            'name' => 'admin.access',
            'guard_name' => 'api',
            'group' => 'admin',
            'display_name' => 'Super Admin',
            'description' => 'Give all permissions to user.',
        ]);

        $adminRole->givePermissionTo($adminPermission);

        $adminUser = new User([
            'first_name' => 'Admin',
            'last_name' => 'Admin',
            'email' => 'admin@admin.com',
            'email_verified_at' => Carbon::now(),
            'password' => Hash::make('adminadmin'),
        ]);
        $adminUser->save();
        $adminUser->assignRole($adminRole);
    }
}
