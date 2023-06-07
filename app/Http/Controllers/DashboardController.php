<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Comment;
use App\Models\Product;
use App\Models\User;
use Carbon\Carbon;

class DashboardController extends BaseController
{
    public function __construct()
    {
        $this->middleware('can:viewAny,App\Http\Controllers\DashboardController');
    }

    public function index()
    {
        // Son 30 günde kayıt olan kullanıcı sayısı
        $newUsersCount = User::where('created_at', '>=', Carbon::now()->subDays(30))->count();

        // Son 7 günlük kayıt olan kullanıcı sayısı
        $now = Carbon::now();
        $userDataByDay = [];

        for ($day = -6; $day <= 0; $day++) {
            $date = $now->copy()->addDays($day);
            $startDate = $date->copy()->startOfDay();
            $endDate = $date->copy()->endOfDay();

            $users = User::where('created_at', '>=', $startDate)
                ->where('created_at', '<=', $endDate)
                ->count();

            $userDataByDay[$date->format('Y-m-d')] = $users;
        }

        //Son 14 günlük kayıt olan kullanıcı sayısı
        $endOfWeek = Carbon::now()->subDays(7); // 1 hafta önce
        $startOfWeek = $endOfWeek->copy()->subDays(14); // 2 hafta önce

        $usersThisWeek = User::whereBetween('created_at', [$endOfWeek, Carbon::now()])->count();
        $usersLastWeek = User::whereBetween('created_at', [$startOfWeek, $endOfWeek])->count();

        $percentChange = 0;
        if ($usersLastWeek > 0) {
            $percentChange = (($usersThisWeek - $usersLastWeek) / $usersLastWeek) * 100;
        } else if ($usersThisWeek > 0) {
            $percentChange = 100;
        }

        // Parent Kategorilerin sahip olduğu ürün sayısı

        $CategoriesHaveProduct = $this->countItemsInAllParentCategories();


        // Toplam kayıtlı kullanıcı sayısı
        $totalUsersCount = User::count();

        // Toplam ürün sayısı
        $totalProductsCount = Product::count();

        // Statusu 1 olan ürün sayısı
        $activeProductsCount = Product::where('status', 1)->count();

        // Comments data
        $commentsData = $this->commentsData();

        $data = [
            'newUsersCount' => $newUsersCount,
            'totalUsersCount' => $totalUsersCount,
            'UserDataByDay' => $userDataByDay,
            'UserDataWeeklyChange' => $percentChange,
            'totalProductsCount' => $totalProductsCount,
            'activeProductsCount' => $activeProductsCount,
            'parentCategoriesHasItem' => $CategoriesHaveProduct,
            'commentsData' => $commentsData,
        ];

        return response()->ok($data);
    }

    private function countItemsInCategoryAndSubcategories($category)
    {
        $count = $category->products()->count();

        foreach ($category->children as $childCategory) {
            $count += $this->countItemsInCategoryAndSubcategories($childCategory);
        }

        return $count;
    }

    private function countItemsInAllParentCategories(): array
    {
        $categories = Category::whereNull('parent_id')->get();

        $result = [];

        foreach ($categories as $category) {
            $count = $this->countItemsInCategoryAndSubcategories($category);
            $result[] = [
                'category' => $category->name,
                'count' => $count,
            ];
        }
        $response['categories'] = $result;
        $response['parent_categories'] = $categories->count();
        $response['child_categories'] = Category::whereNotNull('parent_id')->count();

        return $response;
    }

    private function commentsData(): array
    {
            // Statusu 0 olan yorum sayısı
            $inactiveCommentsCount = Comment::where('status', 0)->count();

            // Statusu 1 olan yorum sayısı
            $activeCommentsCount = Comment::where('status', 1)->count();

            // Toplam yorum sayısı
            $totalCommentsCount = Comment::count();

            // Son 30 günde eklenen yorum sayısı
            $newCommentsCount = Comment::where('created_at', '>=', Carbon::now()->subDays(30))->count();

        return [
            'newCommentsCount' => $newCommentsCount,
            'totalCommentsCount' => $totalCommentsCount,
            'inactiveCommentsCount' => $inactiveCommentsCount,
            'activeCommentsCount' => $activeCommentsCount,
        ];
    }
}
