# youtube-loop_laravel

YouTube動画の指定秒数間を自動ループ再生できるWebアプリ。楽器練習・語学学習などのユースケースを想定。

## 技術スタック

- **バックエンド**: Laravel
- **フロントエンド**: Inertia.js + React (TypeScript) + Tailwind CSS
- **認証**: Laravel Breeze

## 現在のフェーズ

**コア機能実装中** — デザイン・SEO・広告まで実装済み。ループ設定の保存・一覧表示が次の山。

実装済み：
- 認証（ログイン・新規登録）
- ループ区間スライダー
- OGP / SEO対応
- AdSense実装
- 全体デザインのリッチ化（PR#17）

## 次にやること

- [ ] ループ設定の保存・一覧表示（API / コントローラー）
- [ ] お気に入り機能
- [ ] Proプラン・課金
- [ ] デプロイ・公開

## コーディングルール

- PHPファイルでクラスを参照する際はインライン記述を避け、ファイル上部で `use` 文を使うこと
- コントローラーはスリムに。ロジックはサービス層やモデルに切り出す

## 収益モデル

- **無料プラン**: 広告収入、ループ保存4件まで
- **Proプラン**: 保存5件以上（サブスク）

## 参照

- 会社PMファイル: `~/.company/pm/projects/youtube-loop.md`
- GitHub: https://github.com/73darse73/youtube-loop_laravel
