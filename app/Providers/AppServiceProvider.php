<?php

namespace App\Providers;

use App\Services\Bootstrap\BaseBootstrapData;
use App\Services\Bootstrap\BootstrapData;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{


    /**
     * Register any application services.
     */
    public function register(): void
    {
        parent::register();
        // bootstrap data
        $this->app->bind(BootstrapData::class, BaseBootstrapData::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->registerCustomValidators();
    }

    private function registerCustomValidators()
    {
        Validator::extend(
            'email_verified',
            'App\Rules\EmailVerifiedValidator@validate',
        );
    }
}
