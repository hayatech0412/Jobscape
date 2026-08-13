<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Mailgun, Postmark, AWS and more. This file provides the de facto
    | location for this type of information, allowing packages to have
    | a conventional file to locate the various service credentials.
    |
    */

    'postmark' => [
        'token' => env('POSTMARK_TOKEN'),
    ],

    'ses' => [
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],

    'resend' => [
        'key' => env('RESEND_KEY'),
    ],

    'slack' => [
        'notifications' => [
            'bot_user_oauth_token' => env('SLACK_BOT_USER_OAUTH_TOKEN'),
            'channel' => env('SLACK_BOT_USER_DEFAULT_CHANNEL'),
        ],
    ],
    'houjin_bangou' => [
        'app_id' => env('APP_ID'),  // .env から APP_ID を取得
    ],

    'gmo' => [
        'site_id' => env('GMO_SITE_ID'),
        'site_password' => env('GMO_SITE_PASSWORD'),
        'shop_id' => env('GMO_SHOP_ID'),
        'shop_password' => env('GMO_SHOP_PASSWORD'),
        'shop_mail' => env('GMO_SHOP_MAIL', 'payments@jobscape.jp'),
        'environment' => env('GMO_ENVIRONMENT', 'test'),
    ],

    'cpaasnow' => [
        'token' => env('CPAASNOW_TOKEN', 'moA27cQfU1RybwHNdwApktEBNCNPoSm_8K_lBkqw2r4'),
        'url' => env('CPAASNOW_URL', 'https://sandbox.cpaasnow.com/api/v1'),
    ],
];
