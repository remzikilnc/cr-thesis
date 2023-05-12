<?php

// database/seeders/UserSeeder.php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
    public function run()
    {
        $prevCategoryId = null;
        for ($i = 1; $i <= 10; $i++) {
            $categoryId = DB::table('categories')->insertGetId([
                'parent_id' => $i === 1 ? null : ($i % 2 === 0 ? $prevCategoryId : null),
                'name' => 'Category ' . $i,
                'description' => 'Description for Category ' . $i,
                'image' => null,
                'status' => true,
            ]);
            $prevCategoryId = $categoryId;
        }
    }
}
