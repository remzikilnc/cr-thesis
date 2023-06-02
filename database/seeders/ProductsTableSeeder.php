<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Image;
use App\Models\Product;
use Exception;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ProductsTableSeeder extends Seeder
{
    public function run()
    {
        $faker = Faker::create();
        $productNames = [
            'Apple iPhone 13',
            'Apple iPhone 12',
            'Apple iPhone 11',
            'Apple iPhone X',
            'Samsung Galaxy S22',
            'HP Laptop Pro',
            'Sony Headphones X1',
            'Microsoft Surface Pro',
            'Canon EOS 700D',
            'Samsung 55 Inch TV',
            'Apple Watch Series 7',
            'Nintendo Switch',
            'Sony Playstation 5',
            'Sony Playstation 4',
            'Sony Playstation 3',
            'LG OLED TV',
            'Dell XPS 15 Laptop',
            'Bose QuietComfort 35 II',
            'GoPro Hero 9 Black',
            'Nike Air Max 270',
            'Adidas Ultraboost',
            'Sony WH-1000XM4',
            'Samsung Galaxy Tab S7',
            'Amazon Echo Dot',
            'Fitbit Versa 3',
            'LG 65 Inch 4K TV',
            'Microsoft Xbox Series X',
            'Google Pixel 6',
            'Apple MacBook Pro',
            'Canon EOS R5',
            'Sony A7 III',
            'Bose SoundLink Revolve',
            'Nintendo Switch Lite',
            'Samsung Galaxy Buds Pro',
            'HP Envy 13 Laptop',
            'Sony WF-1000XM4',
            'LG NanoCell TV',
            'DJI Mavic Air 2',
            'Apple iPad Pro',
            'Fitbit Charge 5',
            'Microsoft Surface Laptop 4',
            'Google Nest Hub',
            'Sony WH-1000XM3',
            'Samsung Galaxy Watch 4',
            'Amazon Kindle Paperwhite',
        ];
        foreach (range(1, 15) as $index) {
            $status = $index % 5 === 0 ? 0 : 1;
            $product = Product::create([
                'title' => $productNames[array_rand($productNames)],
                'description' => $faker->text,
                'price' => $faker->randomFloat(2, 3000, 15000),
                'quantity' => $faker->numberBetween(1, 100),
                'rating' => $faker->randomFloat(2, 0, 5),
                'vote_count' => $faker->numberBetween(1, 100),
                'status' => $status
            ]);

            // Attach random category to the product
            $categoryId = rand(1, 10);
            $category = Category::find($categoryId);
            $product->categories()->attach($category);

            // Create poster image for the product
            $this->createImage($product, 'poster');

            // Create 3 backdrop images for the product
            for ($i = 0; $i < 3; $i++) {
                $this->createImage($product, 'backdrop');
            }
        }
    }

    private function createImage($product, $type)
    {
        try {
            $response = Http::withHeaders([
                'Authorization' => 'Client-ID ' . config('services.unsplash.access_key')
            ])->get('https://api.unsplash.com/photos/random', [
                'query' => $product->title
            ]);

            if ($response->failed()) {
                throw new Exception('API request failed: ' . $response->body());
            }

            $imageUrl = $response->json()['urls']['small'];
            $imageData = Http::get($imageUrl)->body();
            $path = 'media-images/' . $type . '/' . Str::random(40) . '/original.png';
            Storage::disk('public')->put($path, $imageData);
            Image::create([
                'url' => 'storage/' . $path,
                'model_id' => $product->id,
                'model_type' => Product::class,
                'type' => $type
            ]);

        } catch (Exception $e) {
            // Log the error and continue
            Log::error('Unsplash API request failed: ' . $e->getMessage());
        }
    }
}
