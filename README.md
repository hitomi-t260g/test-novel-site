# Novel Frontend

小説投稿ダッシュボード

## 概要

このプロジェクトは、小説の投稿・管理を行うためのダッシュボードアプリケーションです。最新の投稿内容をユーザーに届けるため、Server-Side Rendering (SSR) を採用しています。

## 技術スタック

### Next.js を採用した理由

- **SSR対応**: 最新の小説投稿内容を常に反映するため、サーバーサイドレンダリングが必須
- **拡張性**: 今後の画像アップロード機能や複雑なUI要件に対応可能
- **開発体験**: ファイルベースルーティング、APIルート、最適化機能など、モダンな開発機能を提供
- **次候補**: react-router v7のas フレームワーク（今後画像添付などの拡張を考えた際、next/Imageの使い勝手の良さをとりました）

### 使用技術

- Next.js 15.5.6
- React 19.1.0
- TypeScript
- Tailwind CSS 4
- Biome (Linter & Formatter)
- Playwright (E2Eテスト)

## ディレクトリ構成

```text
src/
├── app/                  # Next.jsのApp Router
│   └── contents/          # 小説投稿関連のルーティング
│       └── [slug]/       # 動的ルート
├── _features/            # 機能別コンポーネント
│   ├── common/           # 共通機能
│   └── contents/            # コンテンツ投稿機能
│       └── TitleListItem/         # コンテンツタイトルリスト
├── _components/          # 共有UIコンポーネント
│                         # (サイドメニュー、ボタンなど)
└── _constants/           # 定数定義
```

### 設計思想

- **app/**: Next.jsのルーティング機能を活用し、ページレベルのコンポーネントを配置
- **_features/**: 小説投稿に関連する機能単位でコンポーネントをまとめ、ドメインロジックを整理
- **_components/**: レイアウト用のサイドメニューやボタンなど、汎用的なUIコンポーネントを配置

## スクリプト

### 開発コマンド

```bash
pnpm dev
```

Turbopackを使用した開発サーバーを起動します。高速なHMR (Hot Module Replacement) が利用可能です。

### ビルド

```bash
pnpm build
```

本番環境用に最適化されたアプリケーションをビルドします。Turbopackを使用して高速にビルドを実行します。

### 本番起動

```bash
pnpm start
```

ビルド済みのアプリケーションを本番モードで起動します。

### コード品質管理

```bash
pnpm lint
```

Biomeを使用してコードの静的解析を実行し、潜在的な問題を検出します。

```bash
pnpm format
```

Biomeのフォーマッターを使用してコードを自動整形します。

### テスト

```bash
pnpm test
```

Playwrightを使用してE2Eテストを実行します。

```bash
pnpm test:ui
```

Playwrightのインタラクティブなテストランナーを起動し、テストをUIモードで実行・デバッグできます。

## セットアップ

```bash
# 依存関係のインストール
pnpm install

# 開発サーバーの起動
pnpm dev
```

ブラウザで [http://localhost:3001](http://localhost:3001) を開いてアプリケーションを確認できます。
