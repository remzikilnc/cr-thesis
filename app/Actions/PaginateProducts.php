<?php

namespace App\Actions;

use App\QueryBuilders\CustomQueryBuilder;
use Illuminate\Database\Eloquent\Builder;
use App\Models\Product;
use App\Services\Settings;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Arr;

class PaginateProducts
{

    private Product $product;

    private Settings $settings;

    public function __construct(Product $product, Settings $settings)
    {
        $this->product = $product;
        $this->settings = $settings;
    }

    public function execute(array $params): LengthAwarePaginator
    {
        $query = $this->product->newQuery();

        if ($category = Arr::get($params, 'category_name')) {
            $query->whereHas('categories', function (Builder $q) use ($category) {
                $q->where('categories.name', $category);
            });
        }

        $datasource = new CustomQueryBuilder($query, $params);
        $order = $datasource->getOrder();

        if ($order['col'] === 'updated_at') {
            $order = [
                'col' => 'popularity',
                'dir' => 'desc',
            ];
        }
        $datasource->order = $order;

        return $datasource->paginate();
    }
}
