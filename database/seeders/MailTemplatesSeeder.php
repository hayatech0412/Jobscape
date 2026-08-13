<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MailTemplatesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('mail_templates')->truncate();

        DB::table('mail_templates')->insert([
            [
                'title' => '会員仮登録完了',
                'subject' => config('app.name') . ' 会員仮登録完了',
                'slug' => 'user.verify',
                'content' => '<p>お客様</p>
                <p>メールアドレスを確認するために、下記の認証コードを確認欄にご入力してください。</p>
                <p>{verify_token}</p>
                <p><a href="{url_verify}">{url_verify}</a></p>
                <p>10分以内で認証コードを送りない場合はこの認証コードは無視となってしまいます。</p>
                <p>よろしくお願いいたします。</p>
                <p>{app_name} 運営事務局です。</p>',
            ],
            [
                'title' => '企業仮登録完了',
                'subject' => config('app.name') . ' 企業仮登録完了',
                'slug' => 'company.verify',
                'content' => '<p>お客様</p>
                    <p>メールアドレスを確認するために、下記の認証コードを確認欄にご入力してください。</p>
                    <p>{verify_token}</p>
                    <p>10分以内で認証コードを送りない場合はこの認証コードは無視となってしまいます。</p>
                    <p>よろしくお願いいたします。</p>
                    <p>{app_name} 運営事務局です。</p>',
            ],
            [
                'title' => 'ご紹介のスタート',
                'subject' => config('app.name') . ' ご紹介のスタート',
                'slug' => 'company.orders.start',
                'content' => '<p>お客様</p>
                    <p>{user_name}さんが{product_name}の紹介をスタートしました。下記のURLより確認してください。</p>
                    <a href="{url_order_show}">{url_order_show}</a>'
            ],
        ]);
    }
}
