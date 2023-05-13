<?php

namespace App\Http\Controllers;

use App\Http\Requests\Category\StoreCategoryRequest;
use App\Models\Category;
use App\Models\Image;
use App\Models\Product;
use App\Services\Product\StoreProductData;
use App\Services\Traits\StoresMediaImages;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\Request;

class CategoryController extends BaseController
{
    use  StoresMediaImages;

    private Request $request;
    private Category $category;

    public function __construct(Request $request, Category $category)
    {
        $this->request = $request;
        $this->category = $category;
    }

    /**
     * @throws AuthorizationException
     */
    public function index()
    {
        $this->authorize('index', Category::class);
        $categories = $this->category::tree()->get();
        return response()->ok($categories->toTree());
    }

    /**
     * @throws AuthorizationException
     */
    public function show(Category $category)
    {
        $this->authorize('show', Category::class);

        $category->load(['images']);

        return response()->ok($category);
    }


    public function update(Category $category, $request)
    {
        //todo !!BUG!! form-data olarak gönderilmiyor -> IMAGE uploadı ayrı bir api endpointiyle yapmak lazım..
        $this->authorize('update', Category::class);
        /*
                $product = app(StoreProductData::class)->execute($product, $request->all(), [
                    'overrideWithEmptyValues' => true,
                ]);

                return response()->ok($product);*/
    }


    /**
     * @throws AuthorizationException
     */
    public function store(StoreCategoryRequest $request)
    {
        $this->authorize('store', Product::class);

        $category = new Category;
        $category->parent_id = $request->parent_id;
        $category->name = $request->name;
        $category->description = $request->description;
        $category->status = $request->status;
        $category->saveOrFail();

        $category->images = $this->storeImages($request->images, $category);

        return response()->ok($category);
    }

    /**
     * @throws AuthorizationException
     */
    public function destroy()
    {
        $this->authorize('destroy', Product::class);

        $categoryIds = $this->request->get('ids');

        // images
        app(Image::class)
            ->whereIn('model_id', $categoryIds)
            ->where('model_type', Product::class)
            ->delete();

        /*        todo reviews & comments
                app(Review::class)
                    ->delete();*/

        $this->category->whereIn('id', $categoryIds)->delete();

        return response()->noContent();

    }

}
