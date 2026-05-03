<x-mail::message>
# {{ $user->name }} さん、Proプランへのアップグレードが完了しました！

この度はLoop Video Proプランへのご加入ありがとうございます。

## Proプランでできること

- ループ設定を無制限に保存
- 広告なし
- お気に入り登録・ゴミ箱機能

<x-mail::button :url="config('app.url')">
Loop Video を使ってみる
</x-mail::button>

ご不明な点があればお気軽にお問い合わせください。

Loop Video チーム
</x-mail::message>
