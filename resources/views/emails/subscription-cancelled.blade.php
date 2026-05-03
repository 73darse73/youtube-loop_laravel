<x-mail::message>
# {{ $user->name }} さん、解約のお手続きを受け付けました

Proプランの解約を受け付けました。

**{{ $endsAt }}** までは引き続きProプランの全機能をご利用いただけます。

期間終了後は自動的に無料プランへ移行します。再度ご利用を希望される場合はいつでもアップグレードいただけます。

<x-mail::button :url="config('app.url') . '/plan'">
プラン画面を確認する
</x-mail::button>

またのご利用をお待ちしております。

Loop Video チーム
</x-mail::message>
