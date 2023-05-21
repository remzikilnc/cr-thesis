<?php

// database/seeders/UserSeeder.php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
    public function run()
    {
        $categoryNames = [
            'Category A',
            'Category B',
            'Category C',
            'Category D',
            'Category E',
            'Category F',
            'Category G',
            'Category H',
            'Category I',
            'Category J',
        ];

        $prevCategoryId = null;
        foreach ($categoryNames as $index => $categoryName) {
            $categoryId = DB::table('categories')->insertGetId([
                'parent_id' => $index === 0 ? null : ($index % 2 === 0 ? $prevCategoryId : null),
                'name' => $categoryName,
                'description' => 'Description for ' . $categoryName,
                'image' => null,
                'status' => true,
            ]);
            $prevCategoryId = $categoryId;
        }
    }
}
