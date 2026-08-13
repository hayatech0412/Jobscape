# Jobscape ローカル環境テストガイド

このドキュメントは、Jobscapeシステムをローカル環境で動作確認するための詳細な手順とテストアカウント情報を提供します。

## 📋 目次

1. [環境構築](#環境構築)
2. [データベースセットアップ](#データベースセットアップ)
3. [テストデータの作成](#テストデータの作成)
4. [テストアカウント情報](#テストアカウント情報)
5. [ログイン手順](#ログイン手順)
6. [各ユーザータイプの特徴](#各ユーザータイプの特徴)
7. [トラブルシューティング](#トラブルシューティング)

## 🚀 環境構築

### 前提条件
- PHP 8.1以上
- Composer
- Node.js & npm
- SQLite

### 初期セットアップ
```bash
# 依存関係のインストール
composer install
npm install

# 環境設定ファイルのコピー
cp .env.example .env

# アプリケーションキーの生成
php artisan key:generate

# アセットのビルド
npm run build
```

## 🗄️ データベースセットアップ

### マイグレーションの実行
```bash
# データベースマイグレーション
php artisan migrate
```

### シーダーファイルの修正について
SQLite環境での互換性のため、以下のシーダーファイルが修正されています：
- `DatabaseSeeder.php` - SQLite対応の外部キー制約処理
- `ProductSeeder.php` - SQLite対応の外部キー制約処理
- `TransactionSeeder.php` - SQLite対応の外部キー制約処理

## 📊 テストデータの作成

### 基本テストデータの生成
```bash
# 全テストデータの生成（推奨）
php artisan db:seed

# 個別シーダーの実行（必要に応じて）
php artisan db:seed --class=UserSeeder
php artisan db:seed --class=PlanSeeder
php artisan db:seed --class=CategorySeeder
```

### 生成されるデータ
- **管理者**: 1名
- **一般ユーザー**: 20名（自動的にユーザーまたは企業ロールが割り当て）
- **プラン情報**: 複数のプラン
- **カテゴリ**: 商品カテゴリ
- **商品情報**: 20件のサンプル商品
- **取引情報**: サンプル取引データ

## 👥 テストアカウント情報

### 🔑 管理者アカウント

| 項目 | 値 |
|------|-----|
| **ログインURL** | `http://127.0.0.1:8000/admin/login` |
| **メールアドレス** | `admin@email.com` |
| **パスワード** | `password` |
| **ロール** | Admin（管理者）|
| **権限** | 全システム機能へのアクセス |

### 👤 一般ユーザーアカウント

| 項目 | 値 |
|------|-----|
| **ログインURL** | `http://127.0.0.1:8000/login` |
| **メールアドレス** | `user1@email.com` ～ `user20@email.com` |
| **パスワード** | `password`（全アカウント共通）|
| **ロール** | User（一般ユーザー）|
| **備考** | 一部のユーザーは企業ロールに割り当てられている場合があります |

#### 確実に一般ユーザーロールのアカウント
- `user2@email.com` / `password`
- `user3@email.com` / `password`
- `user4@email.com` / `password`

### 🏢 企業アカウント

| 項目 | 値 |
|------|-----|
| **ログインURL** | `http://127.0.0.1:8000/company/login` |
| **メールアドレス** | 以下のいずれか |
| **パスワード** | `password`（全アカウント共通）|
| **ロール** | Company（企業）|

#### 確実に企業ロールのアカウント
- `user1@email.com` / `password` ✅ **推奨**
- `user5@email.com` / `password`
- `user6@email.com` / `password`
- `user11@email.com` / `password`
- `user13@email.com` / `password`
- `user14@email.com` / `password`
- `user18@email.com` / `password`

## 🔐 ログイン手順

### 1. アプリケーションの起動
```bash
# 開発サーバーの起動
php artisan serve
```

アプリケーションは `http://127.0.0.1:8000` でアクセス可能になります。

### 2. 各ユーザータイプでのログイン

#### 管理者ログイン
1. ブラウザで `http://127.0.0.1:8000/admin/login` にアクセス
2. メールアドレス: `admin@email.com`
3. パスワード: `password`
4. 「ログイン」ボタンをクリック

#### 一般ユーザーログイン
1. ブラウザで `http://127.0.0.1:8000/login` にアクセス
2. メールアドレス: `user2@email.com`（または他の一般ユーザー）
3. パスワード: `password`
4. 「ログイン」ボタンをクリック

#### 企業ユーザーログイン
1. ブラウザで `http://127.0.0.1:8000/company/login` にアクセス
2. メールアドレス: `user1@email.com`（または他の企業ユーザー）
3. パスワード: `password`
4. 「ログイン」ボタンをクリック

## 🎭 各ユーザータイプの特徴

### 管理者（Admin）
- **ロール値**: 1
- **アクセス可能機能**: 
  - 全ユーザー管理
  - システム設定
  - 全取引データの閲覧・管理
  - 統計情報とレポート

### 一般ユーザー（User）
- **ロール値**: 3
- **アクセス可能機能**:
  - プロフィール管理
  - 商品閲覧・購入
  - 取引履歴確認
  - 通知設定

### 企業ユーザー（Company）
- **ロール値**: 2
- **アクセス可能機能**:
  - 企業プロフィール管理
  - 商品・サービス登録
  - 取引管理
  - 企業向け機能

## 🔍 データベース確認方法

### ユーザー情報の確認
```bash
# 全ユーザーの一覧表示
php artisan tinker --execute="App\Models\User::select('id', 'email', 'role')->get()->each(function(\$user) { echo \$user->id . ': ' . \$user->email . ' (role: ' . \$user->role . ')' . PHP_EOL; });"

# 特定ロールのユーザー確認
php artisan tinker --execute="App\Models\User::where('role', 2)->select('id', 'email')->get();"
```

### ロール値の対応
- **1**: Admin（管理者）
- **2**: Company（企業）
- **3**: User（一般ユーザー）

## 🛠️ トラブルシューティング

### よくある問題と解決方法

#### 1. ログインできない（認証エラー）
**症状**: 正しいメールアドレスとパスワードを入力してもログインできない

**解決方法**:
```bash
# メール認証の確認・修正
php artisan tinker --execute="App\Models\User::whereNull('email_verified_at')->update(['email_verified_at' => now()]);"
```

#### 2. シーダー実行時のSQLエラー
**症状**: `SQLSTATE[HY000]: General error: 1 near "SET": syntax error`

**解決方法**: 
既に修正済みですが、SQLite環境では `SET FOREIGN_KEY_CHECKS` がサポートされていないため、シーダーファイルで条件分岐を追加しています。

#### 3. 企業ユーザーでログインできない
**症状**: 企業ロールのユーザーなのにログインできない

**解決方法**:
```bash
# 企業プロフィールの作成
php artisan db:seed --class=CompanyUserSeeder
```

#### 4. ページが見つからない（404エラー）
**症状**: ログイン後にページが表示されない

**確認事項**:
- ルーティング設定の確認
- 各ユーザータイプに適したURLでアクセスしているか
- 開発サーバーが正常に起動しているか

### デバッグ用コマンド

```bash
# アプリケーションのキャッシュクリア
php artisan cache:clear
php artisan config:clear
php artisan route:clear

# ログの確認
tail -f storage/logs/laravel.log

# データベースの状態確認
php artisan migrate:status
```

## 📝 追加情報

### 重要なファイル
- **環境設定**: `.env`
- **ルーティング**: `routes/web.php`, `routes/admin.php`
- **認証設定**: `config/auth.php`
- **データベース設定**: `config/database.php`

### 開発時の注意点
1. **セッション管理**: 各ユーザータイプで異なるセッション管理が行われる可能性があります
2. **ミドルウェア**: ロールベースのアクセス制御がミドルウェアで実装されています
3. **データベース**: SQLite使用時は外部キー制約の動作が MySQL と異なる場合があります

### サポート情報
- **Laravel バージョン**: 確認は `php artisan --version` で行えます
- **PHP バージョン**: 確認は `php --version` で行えます
- **データベース**: SQLite（ローカル開発環境）

---

## ⚡ クイックスタート

初回セットアップから動作確認まで：

```bash
# 1. 基本セットアップ
composer install && npm install
cp .env.example .env
php artisan key:generate

# 2. データベースとテストデータ
php artisan migrate
php artisan db:seed

# 3. アプリケーション起動
php artisan serve
```

**テストログイン**:
- 管理者: `http://127.0.0.1:8000/admin/login` → `admin@email.com` / `password`
- 一般: `http://127.0.0.1:8000/login` → `user2@email.com` / `password`
- 企業: `http://127.0.0.1:8000/company/login` → `user1@email.com` / `password`

---

*最終更新: 2025年6月23日*