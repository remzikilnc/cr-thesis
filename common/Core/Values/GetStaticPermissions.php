<?php

namespace Common\Core\Values;

use Common\Settings\Settings;
use Illuminate\Contracts\Filesystem\FileNotFoundException;
use Illuminate\Filesystem\Filesystem;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use Psr\Container\ContainerExceptionInterface;
use Psr\Container\NotFoundExceptionInterface;

class GetStaticPermissions
{
    /**
     * @var Filesystem
     */
    private Filesystem $fs;

    /**
     * @param Filesystem $fs
     */
    public function __construct(Filesystem $fs)
    {
        $this->fs = $fs;
    }

    /**
     * @throws FileNotFoundException
     */
    public function execute(): array
    {
        $permissions = array_merge_recursive(
            $this->fs->getRequire(app('path.common') . '/resources/config/permissions.php'),
        )['all'];

        $compiled = [];
        foreach ($permissions as $key => $permissionGroup) {
            // format permissions and add generic description, if needed
            $compiled[$key] = collect($permissionGroup)->map(function($item) {
                if ( ! is_array($item)) {
                    $item = ['name' => $item];
                }

                if ( ! Arr::get($item, 'display_name')) {
                    $item['display_name'] = $this->getDisplayName($item['name']);
                }

                if ( ! Arr::get($item, 'description')) {
                    $item['description'] = $this->getGenericDescription($item['name']);
                }

                return $item;
            });
        }

        return $compiled;
    }

    private function getDisplayName($original)
    {
        // files.create => Create Files
        if ( ! Str::contains($original, '.')) return $original;
        list($resource, $action) = explode('.', $original);
        return ucfirst($action) . ' ' . ucwords(str_replace('_', ' ', $resource));
    }

    /**
     * @param string $permission
     * @return string|null
     */
    private function getGenericDescription(string $permission): ?string
    {
        if ( ! Str::contains($permission, '.')) return null;

        list($resource, $action) = explode('.', $permission);
        $pluralAction = Str::plural(str_replace('_', ' ', $resource));
        $verb = $this->getGenericVerb($action, $resource);

        return "Allow $verb $pluralAction.";
    }

    /**
     * @param string $action
     * @param string $resource
     * @return string|null
     */
    private function getGenericVerb(string $action, string $resource): ?string
    {
        if ($resource === 'file' && $action === 'create') {
            return 'uploading new';
        }

        return match ($action) {
            'view' => 'viewing ALL',
            'create' => 'creating new',
            'update' => 'updating ALL',
            'delete' => 'deleting ALL',
            'download' => 'downloading ALL',
            default => null,
        };
    }
}
