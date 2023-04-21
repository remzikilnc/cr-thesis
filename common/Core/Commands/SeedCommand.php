<?php namespace Common\Core\Commands;

use Illuminate\Console\Command;
use Illuminate\Contracts\Container\BindingResolutionException;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;

class SeedCommand extends Command
{
    /**
     * @var string
     */
    protected $signature = 'common:seed';

    /**
     * @var string
     */
    protected $description = 'Execute all common package seeders.';

    /**
     * @return void
     * @throws BindingResolutionException
     */
    public function handle(): void
    {
        $paths = collect(File::files(__DIR__ . '/../../Database/Seeds'));

        $paths->filter(function($path) {
            return Str::endsWith($path, '.php');
        })->each(function($path) {
            Model::unguarded(function () use ($path) {
                $namespace = 'Common\Database\Seeds\\'.basename($path, '.php');
                $this->getSeeder($namespace)->__invoke();
            });
        });

        $this->info('Seeded database successfully.');
    }

    /**
     * Get a seeder instance from the container.
     *
     * @param string $namespace
     * @return Seeder
     * @throws BindingResolutionException
     */
    protected function getSeeder(string $namespace): Seeder
    {
        $class = $this->laravel->make($namespace);

        return $class->setContainer($this->laravel)->setCommand($this);
    }
}
