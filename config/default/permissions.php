<?php

return [
    'roles' => [
        [
            'name' => 'users',
            'default' => true,
            'guard_name'=> 'api',
            'permissions' => [
                'products.view',
                'categories.view',
                'comments.view',
                'comments.create'
            ],
        ],
        [
            'name' => 'guests',
            'guests' => true,
            'guard_name'=> 'api',
            'permissions' => [
                'products.view',
                'categories.view',
                'comments.view'
            ],
        ]
    ],
    'all' => [
        'users' => [
            [
                'name' => 'users.view',
                'description' => 'Allow viewing user profile pages on the site. User can view their own profile without this permission.'
            ],
            [
                'name' => 'users.create',
                'description' => 'Allow creating users from admin area. Users can register for new accounts without this permission. Registration can be disabled from settings page.',
            ],
            [
                'name' => 'users.update',
                'description' => 'Allow editing details of any user on the site. User can edit their own details without this permission.',
            ],
            [
                'name' => 'users.delete',
                'description' => 'Allow deleting any user on the site. User can request deletion of their own account without this permission.',
            ],
        ],
        'products' => [
            [
                'name' => 'products.view',
                'description' =>
                    'Allow viewing products on the site.',
            ],
            [
                'name' => 'products.create',
                'description' =>
                    'Allow creating products on the site.',
            ],
            [
                'name' => 'products.update',
                'description' =>
                    'Allow updating products on the site.',
            ],
            [
                'name' => 'products.delete',
                'description' =>
                    'Allow deleting products on the site.',
            ],
        ],
        'categories' => [
            [
                'name' => 'categories.view',
                'description' =>
                    'Allow viewing products on the site.',
            ],
            [
                'name' => 'categories.create',
                'description' =>
                    'Allow creating products on the site.',
            ],
            [
                'name' => 'categories.update',
                'description' =>
                    'Allow updating products on the site.',
            ],
            [
                'name' => 'categories.delete',
                'description' =>
                    'Allow deleting products on the site.',
            ],
        ],
        'comment' => [
            [
                'name' => 'comments.view',
                'description' =>
                    'Allow viewing comments on the site, where status 1. User can view own comments.',
            ],
            [
                'name' => 'comments.view_inactive',
                'description' =>
                    'Allow viewing ALL comments on the site, for this permission comments.view permission is needed.',
            ],
            [
                'name' => 'comments.create',
                'description' =>
                    'Allow creating comments on the site.',
            ],
            [
                'name' => 'comments.update',
                'description' =>
                    'Allow updating comments on the site. User can update own comments',
            ],
            [
                'name' => 'comments.delete',
                'description' =>
                    'Allow deleting comments on the site. User can delete own comments',
            ],
        ],
        'role' => [
            [
                'name' => 'role.view',
                'description' =>
                    'Allow viewing user roles on the site.',
            ],
        ],

    ],
];
//dashboard.view
//image view, create, update ,delete
