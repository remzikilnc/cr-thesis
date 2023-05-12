<?php

namespace App\Http\Controllers;

use App\Actions\PaginateProducts;
use App\Http\Requests\Post\StoreProductRequest;
use App\Http\Requests\Post\UpdateProductRequest;
use App\Jobs\IncrementModelViews;
use App\Models\Image;
use App\Models\Product;
use App\Services\Product\StoreProductData;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\Request;

class ProductController extends BaseController
{

    private Request $request;
    private Product $product;

    public function __construct(Request $request, Product $product)
    {
        $this->request = $request;
        $this->product = $product;
    }

    /**
     * @throws AuthorizationException
     */
    public function index()
    {
        $this->authorize('index', Product::class);

        $pagination = app(PaginateProducts::class)->execute(
            $this->request->all(),
        );

        return response()->ok(['pagination' => $pagination]);
    }

    /**
     * @throws AuthorizationException
     */
    public function show(Request $request, int $productId)
    {
        $this->authorize('show', Product::class);

        if ($request->get('with') === 'categories') {
            $product = Product::with('categories.ancestorsWithNormalized')->findOrFail($productId);
        } else {
            $product = $this->product->where('id', $productId)->findOrFail();
        }

        $response = $product->load(['images']);

        $this->dispatch(
            new IncrementModelViews(
                Product::MODEL_TYPE,
                $product->id,
            ),
        );

        return response()->ok($product);
    }


    public function update(Product $product, UpdateProductRequest $request)
    {
        //todo !!BUG!! form-data olarak gönderilmiyor -> IMAGE uploadı ayrı bir api endpointiyle yapmak lazım..
        $this->authorize('update', Product::class);

        $product = app(StoreProductData::class)->execute($product, $request->all(), [
            'overrideWithEmptyValues' => true,
        ]);

        return response()->ok($product);
    }


    /**
     * @throws AuthorizationException
     */
    public function store(StoreProductRequest $request)
    {
        $this->authorize('store', Product::class);

        $product = new Product();

        $product = app(StoreProductData::class)->execute($product, $request->all(), [
            'overrideWithEmptyValues' => true,
        ]);

        return response()->ok($product);
    }

    /**
     * @throws AuthorizationException
     */
    public function destroy()
    {
        $this->authorize('destroy', Product::class);

        $productIds = $this->request->get('ids');

        // images
        app(Image::class)
            ->whereIn('model_id', $productIds)
            ->where('model_type', Product::class)
            ->delete();

        /*        todo reviews & comments
                app(Review::class)
                    ->delete();*/

        $this->product->whereIn('id', $productIds)->delete();

        return response()->noContent();

    }

}
