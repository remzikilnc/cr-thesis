<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

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


        //default admin
        $this->call(DefaultAdminSeeder::class);

        // \App\Models\User::factory(10)->create();

    }
}
