<?php

namespace App\Http\Controllers;

use App\Http\Requests\Category\StoreCategoryRequest;
use App\Http\Requests\Category\UpdateCategoryRequest;
use App\Models\Category;
use App\Models\Image;
use App\Models\Product;
use App\Services\Product\StoreProductData;
use App\Services\Traits\StoresMediaImages;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\Request;

class CategoryController extends BaseController
{
    use StoresMediaImages;

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


    public function update(Category $category, UpdateCategoryRequest $request)
    {
        $this->authorize('update', Category::class);

        //todo !!BUG!! form-data olarak gönderilmiyor -> IMAGE uploadı ayrı bir api endpointiyle yapmak lazım..
        $this->authorize('update', Category::class);

        $categoryData = array_filter($request->all(), function ($value) {
            // Boş veya null değerlerin var olan değerlerin üzerine yazılmasını önlüyooruz
            return !is_array($value) && (!is_null($value));
        });

        $category->fill($categoryData)->save();

        return response()->ok($category);
    }


    /**
     * @throws AuthorizationException|\Throwable
     */
    public function store(StoreCategoryRequest $request)
    {
        $this->authorize('store', Category::class);

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
    public function destroy(Category $category)
    {
        $this->authorize('destroy', Category::class);

        // images
        app(Image::class)
            ->where('model_id', $category->id)
            ->where('model_type', Category::class)
            ->delete();

        $category->delete();

        return response()->noContent();

    }

}
