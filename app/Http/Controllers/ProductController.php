<?php

namespace App\Http\Controllers;

use App\Actions\PaginateProducts;
use App\Http\Requests\Post\StoreProductRequest;
use App\Http\Requests\Post\UpdateProductRequest;
use App\Jobs\IncrementModelViews;
use App\Models\Category;
use App\Models\Image;
use App\Models\Product;
use App\Services\Product\StoreProductData;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\Request;

class ProductController extends BaseController
{

    private Request $request;

    public function __construct(Request $request, Product $product)
    {
        $this->request = $request;
    }

    /**
     * @throws AuthorizationException
     */
    public function index()
    {
        // params:
        // category_name,
        // (orderBy) id // title // created_at // popularity // updated_at-> asc, desc
        // query
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
            $product = Product::query()->findOrFail($productId);
        }

        $product->load(['images']);

        $this->dispatch(
            new IncrementModelViews(
                Product::MODEL_TYPE,
                $product->id,
            ),
        );


        return response()->ok($product);
    }


    public function update(Product $product, Request $request)
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

        $product->load(['images']);

        $product->load('categories.ancestorsWithNormalized');

        return response()->ok($product);
    }

    /**
     * @throws AuthorizationException
     */
    public function destroy(Product $product)
    {
        $this->authorize('destroy', Product::class);


        // Find the product


        // Delete associated images
        app(Image::class)
            ->where('model_id', $product->id)
            ->where('model_type', Product::class)
            ->delete();

        // Detach associated categories
        $product->categories()->detach();

        /* TODO: Delete associated reviews & comments
            app(Review::class)
                ->where('product_id', $productId)
                ->delete();
        */

        $product->delete();

        return response()->noContent();

    }

}
