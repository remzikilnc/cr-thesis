<?php

return [
    // dates
    ['name' => 'dates.format', 'value' => 'dd-MM-yyyy'],
    ['name' => 'dates.locale', 'value' => 'tr_TR'],

    // social login
    ['name' => 'social.google.enable', 'value' => true],
    ['name' => 'social.twitter.enable', 'value' => true],
    ['name' => 'social.facebook.enable', 'value' => true],

    // real time
    ['name' => 'realtime.enable', 'value' => false],

    // temp
    ['name' => 'registration.disable', 'value' => false],

    // cache
    ['name' => 'cache.report_minutes', 'value' => 60],

    // branding
    ['name' => 'branding.favicon', 'value' => 'client/favicon/icon-144x144.png'],
    ['name' => 'branding.site_description', 'value' => "CRThe."],

    // logos
    ['name' => 'branding.logo_dark', 'value' => 'client/assets/images/logo-dark.png'],
    ['name' => 'branding.logo_light', 'value' => 'client/assets/images/logo-light.png'],


    // homepage
    ['name' => 'homepage.type', 'value' => 'default'],

    // themes
    ['name' => 'themes.default_mode', 'value' => 'light'],
    ['name' => 'themes.user_change', 'value' => true],

    // uploading
    ['name' => 'uploads.chunk', 'value' => true],
    ['name' => 'uploads.chunk_size', 'value' => 5242880],

    // GDPR
    ['name' => 'cookie_notice.enable', 'value' => true],
    ['name' => 'cookie_notice.position', 'value' => 'bottom'],

    // menus
    ['name' => 'menus', 'value' => json_encode([
        ['name' => 'Primary', 'position' => 'primary', 'items' => [
            ['type' => 'route', 'order' => 1, 'label' => 'Test', 'action' => 'test'],
            ['type' => 'route', 'order' => 2, 'label' => 'Test1', 'action' => 'test1'],
            ['type' => 'route', 'order' => 3, 'label' => 'Test2', 'action' => 'test2'],
            ['type' => 'route', 'order' => 4, 'label' => 'Test3', 'action' => 'test3']
        ]],

        ['name' => 'test2', 'position' => 'footer-1', 'items' => [
            ['type' => 'route', 'order' => 1, 'label' => '2 Test 1', 'action' => '2test1'],
            ['type' => 'route', 'order' => 2, 'label' => '2 Test 2', 'action' => '2test2'],
            ['type' => 'route', 'order' => 3, 'label' => '2 Test 3', 'action' => '2test3'],
            ['type' => 'route', 'order' => 4, 'label' => '2 Test 4', 'action' => '2test4'],
            ['type' => 'route', 'order' => 3, 'label' => '2 Test 5', 'action' => '2test5'],
        ]],
    ])],

    // uploads
    ['name' => 'uploads.max_size', 'value' => 52428800],
    ['name' => 'uploads.available_space', 'value' => 104857600],
    ['name' => 'uploads.blocked_extensions', 'value' => json_encode(['exe', 'application/x-msdownload', 'x-dosexec'])],

    // content
    ['name' => 'product.enable_reviews', 'value' => true],
    ['name' => 'product.enable_comments', 'value' => true],
    ['name' => 'homepage.list_product_count', 'value' => 10],
    ['name' => 'homepage.slider_product_count', 'value' => 5],
    ['name' => 'homepage.autoslide', 'value' => true],
    ['name' => 'content.search_provider', 'value' => 'local'],
    ['name' => 'content.product_provider', 'value' => 'local'],
    ['name' => 'browse.category', 'value' => json_encode([
        'category1', 'category2', 'category3', 'category4',
        'category5', 'category6', 'category7', 'category8',
        ])
    ],
];
