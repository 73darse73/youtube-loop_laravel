# youtube-loop_laravel

YouTube動画の指定秒数間を自動ループ再生できるWebアプリ。楽器練習・語学学習などのユースケースを想定。

## 技術スタック

- **バックエンド**: Laravel
- **フロントエンド**: Inertia.js + React (TypeScript) + Tailwind CSS
- **認証**: Laravel Breeze

## 本番環境

- **URL**: https://loop-video.com
- **サーバー**: EC2 (`ubuntu@18.180.46.254`)
- **デプロイ**: GitHub Actions → EC2

## コーディングルール

- PHPファイルでクラスを参照する際はインライン記述を避け、ファイル上部で `use` 文を使うこと
- コントローラーはスリムに。ロジックはサービス層やモデルに切り出す

## アナリティクス

- **GA4 プロパティID**: `535797799`（GA4ツール使用時は常にこのIDを使う）
- **GSC サイトURL**: `sc-domain:loop-video.com`

## 参照

- 会社PMファイル: `~/.company/pm/projects/youtube-loop.md`
- GitHub: https://github.com/73darse73/youtube-loop_laravel
