<x-mail::message>
# {{ $user->name }} さん、ご登録ありがとうございます！

**Loop Video** へようこそ。

YouTubeの好きな区間をくり返し再生できるサービスです。楽器の練習や語学学習にぜひ活用してください。

## 無料プランでできること

- ループ再生（開始・終了時間を指定）
- ループ設定を3件まで保存
- お気に入り登録・ゴミ箱機能

さらに多くのループを保存したい場合は、**Proプラン（¥300/月）** へのアップグレードをご検討ください。

<x-mail::button :url="config('app.url')">
Loop Video を使ってみる
</x-mail::button>

Loop Video チーム
</x-mail::message>
