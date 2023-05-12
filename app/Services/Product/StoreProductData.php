<?php

namespace App\Services\Product;

use App\Models\Image;
use App\Models\Product;
use App\Services\Traits\StoresMediaImages;
use Carbon\Carbon;

class StoreProductData
{
    use StoresMediaImages;

    private Product $product;
    private array $data;
    private Image $image;

    public function __construct(
        Image $image,
    )
    {
        $this->image = $image;
    }

    public function execute(Product $product, array $data, $config = []): Product
    {
        $this->product = $product;
        $this->data = $data;
        $this->config = $config;

        $this->persistData();
        $this->persistRelations();

        return $this->product;
    }

    private function persistData(): void
    {
        $titleData = array_filter($this->data, function ($value) {
            // Boş veya null değerlerin var olan değerlerin üzerine yazılmasını önlüyooruz
            return !is_array($value) && ($this->config['overrideWithEmptyValues'] ?? !is_null($value));
        });

        $this->product->fill($titleData)->save();
    }

    private function persistRelations(): void
    {
        $relations = array_filter($this->data, function ($value) {
            return is_array($value);
        });

        foreach ($relations as $name => $values) {
            switch ($name) {
                case 'categories':
                    $this->persistCategories($values);
                    break;
                case 'images':
                    $this->storeImages($values, $this->product);
                    break;
            }
        }
    }


    private function persistCategories(array $values)
    {
        $this->product->categories()->sync($values);
    }
}
