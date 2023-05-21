<?php

return [
    'roles' => [
        [
            'name' => 'users',
            'default' => true,
            'guard_name'=> 'api',
            'permissions' => [
                'products.view',
                'category.view'
            ],
        ],
        [
            'name' => 'guests',
            'guests' => true,
            'guard_name'=> 'api',
            'permissions' => [
                'products.view',
                'category.view'
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
        'category' => [
            [
                'name' => 'category.view',
                'description' =>
                    'Allow viewing products on the site.',
            ],
            [
                'name' => 'category.create',
                'description' =>
                    'Allow creating products on the site.',
            ],
            [
                'name' => 'category.update',
                'description' =>
                    'Allow updating products on the site.',
            ],
            [
                'name' => 'category.delete',
                'description' =>
                    'Allow deleting products on the site.',
            ],
        ],

    ],
];
//dashboard.view
//image view, create, update ,delete
