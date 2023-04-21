<?php

return [
    'roles' => [
        [
            'name' => 'users',
            'default' => true,
            'permissions' => [
                'users.view',
                'titles.view',
                'review.view',
                'review.create',
            ],
        ],
        [
            'name' => 'guests',
            'guests' => true,
            'permissions' => [
                'users.view',
            ],
        ],
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
        'titles' => [
            [
                'name' => 'titles.view',
                'guard_name' => 'web',
                'description' =>
                    'Allow viewing titles on the site.',
            ],
            [
                'name' => 'titles.create',
                'guard_name' => 'web',
                'description' =>
                    'Allow user to create titles from admin area.',
            ],
            [
                'name' => 'titles.update',
                'guard_name' => 'web',
                'description' => 'Allow user to update all titles on the site.',
            ],
            [
                'name' => 'titles.delete',
                'guard_name' => 'web',
                'description' => 'Allow user to delete all titles on the site.',
            ],
        ],
        'review' => [
            [
                'name' => 'review.view',
                'guard_name' => 'web',
                'description' => 'Allow viewing review on the site.',
            ],
            [
                'name' => 'review.create',
                'guard_name' => 'web',
                'description' => 'Allow creating new review.',
            ],
            [
                'name' => 'review.update',
                'guard_name' => 'web',
                'description' =>
                    'Allow editing of all review, whether user created that comment or not. User can edit their own review without this permission.',
            ],
            [
                'name' => 'review.delete',
                'guard_name' => 'web',
                'description' =>
                    'Allow deleting any review, whether user created that comment or not. User can delete their own review without this permission.',
            ],
        ],
    ],
];
