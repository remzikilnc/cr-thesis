<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Database\Factories\UserFactory;
use Illuminate\Database\Seeder;
use App\Models\Role;


class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        app(PermissionTableSeeder::class)->__invoke();
        app(RolesTableSeeder::class)->__invoke();
        app(SettingsTableSeeder::class)->__invoke();
        app(CategorySeeder::class)->__invoke();
        app(ProductsTableSeeder::class)->__invoke();


        //default admin
        $this->call(DefaultAdminSeeder::class);

        //FakeUsers
        UserFactory::new()->count(25)->create()->each(function ($fakeUser){
            $fakeUser->assignRole(Role::where('default',true)->first());
        });



    }
}
