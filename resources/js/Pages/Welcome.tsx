import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';

const YoutubeIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
);

const GoogleLoginButton = ({ className }: { className?: string }) => (
    <a
        href="/auth/redirect"
        className={`inline-flex items-center gap-3 rounded-xl bg-gray-900 px-8 py-4 text-base font-semibold text-white shadow-lg transition-colors hover:bg-gray-700 ${className ?? ''}`}
    >
        <svg className="h-5 w-5" viewBox="0 0 24 24">
            <path
                fill="#fff"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
                fill="#fff"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
                fill="#fff"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
                fill="#fff"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
        </svg>
        Googleで無料登録
    </a>
);

export default function Welcome({ auth }: PageProps) {
    return (
        <>
            <Head title="Loop Player — YouTube区間ループ再生" />
            <div className="min-h-screen bg-white text-gray-900">
                {/* ナビゲーション */}
                <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white/90 backdrop-blur">
                    <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3">
                        <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-red-500 to-purple-600">
                                <YoutubeIcon className="h-5 w-5 text-white" />
                            </div>
                            <span className="text-lg font-bold">
                                Loop Player
                            </span>
                        </div>
                        {auth.user ? (
                            <Link
                                href={route('home.index')}
                                className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700"
                            >
                                ホームへ →
                            </Link>
                        ) : (
                            <a
                                href="/auth/redirect"
                                className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700"
                            >
                                無料で始める
                            </a>
                        )}
                    </div>
                </nav>

                {/* ヒーロー */}
                <section className="mx-auto max-w-5xl px-6 py-24 text-center">
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-4 py-1.5 text-sm font-medium text-red-600">
                        <span>🎵</span> 語学学習・楽器練習・ダンスの振付確認に
                    </div>
                    <h1 className="mb-6 text-5xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-6xl">
                        好きな場面を、
                        <br />
                        <span className="bg-gradient-to-r from-red-500 to-purple-600 bg-clip-text text-transparent">
                            何度でも。
                        </span>
                    </h1>
                    <p className="mx-auto mb-10 max-w-xl text-xl text-gray-500">
                        YouTube動画の指定区間をループ再生・保存できるサービスです。
                        聴き込みたいフレーズ、練習したいシーン。何度でも繰り返せます。
                    </p>
                    <GoogleLoginButton />
                    <p className="mt-4 text-sm text-gray-400">
                        無料で使えます・クレジットカード不要
                    </p>
                </section>

                {/* ユースケース */}
                <section className="bg-gray-50 py-20">
                    <div className="mx-auto max-w-5xl px-6">
                        <h2 className="mb-3 text-center text-3xl font-bold">
                            こんな時に使えます
                        </h2>
                        <p className="mb-12 text-center text-gray-500">
                            繰り返し見たいシーンがあるなら、Loop Player
                            が役に立ちます。
                        </p>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {[
                                {
                                    icon: '🎸',
                                    title: '楽器の練習',
                                    desc: '弾けないフレーズを何度もループ。速度は YouTube のままで再生区間だけ絞り込めます。',
                                },
                                {
                                    icon: '🗣️',
                                    title: '語学・リスニング',
                                    desc: '聞き取れないセリフをピンポイントでループ。シャドーイングの練習にも最適です。',
                                },
                                {
                                    icon: '💃',
                                    title: 'ダンスの振付確認',
                                    desc: '覚えたい振付部分だけをくり返し再生。細かい動きも見逃しません。',
                                },
                                {
                                    icon: '🎬',
                                    title: '好きなシーンを堪能',
                                    desc: 'お気に入りのシーンを保存して、いつでも呼び出せます。',
                                },
                                {
                                    icon: '📖',
                                    title: '講義・解説動画の復習',
                                    desc: '理解できなかった部分だけを繰り返して学習効率アップ。',
                                },
                                {
                                    icon: '🎵',
                                    title: '音楽の聴き込み',
                                    desc: 'サビだけ・イントロだけなど、聴き込みたいパートを保存して繰り返し再生。',
                                },
                            ].map((item) => (
                                <div
                                    key={item.title}
                                    className="rounded-2xl bg-white p-6 shadow-sm"
                                >
                                    <div className="mb-3 text-3xl">
                                        {item.icon}
                                    </div>
                                    <h3 className="mb-2 text-lg font-semibold">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm leading-relaxed text-gray-500">
                                        {item.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 機能紹介 */}
                <section className="py-20">
                    <div className="mx-auto max-w-5xl px-6">
                        <h2 className="mb-3 text-center text-3xl font-bold">
                            主な機能
                        </h2>
                        <p className="mb-16 text-center text-gray-500">
                            シンプルな操作で、すぐに使えます。
                        </p>
                        <div className="space-y-20">
                            <div className="flex flex-col items-center gap-10 sm:flex-row">
                                <div className="flex h-48 w-full flex-1 items-center justify-center rounded-2xl bg-gradient-to-br from-red-50 to-orange-50 text-7xl">
                                    🔁
                                </div>
                                <div className="flex-1">
                                    <div className="mb-2 inline-block rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-500">
                                        LOOP
                                    </div>
                                    <h3 className="mb-3 text-2xl font-bold">
                                        区間を指定してループ再生
                                    </h3>
                                    <p className="leading-relaxed text-gray-500">
                                        YouTube の URL
                                        を貼り付けて、開始・終了時間を秒単位で指定するだけ。
                                        指定した区間を自動でくり返し再生します。
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col items-center gap-10 sm:flex-row-reverse">
                                <div className="flex h-48 w-full flex-1 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-50 to-blue-50 text-7xl">
                                    💾
                                </div>
                                <div className="flex-1">
                                    <div className="mb-2 inline-block rounded-full bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-500">
                                        SAVE
                                    </div>
                                    <h3 className="mb-3 text-2xl font-bold">
                                        ループ設定を保存・管理
                                    </h3>
                                    <p className="leading-relaxed text-gray-500">
                                        気に入ったループ区間はタイトルやメモを付けて保存。
                                        サムネイル一覧から1タップで再生できます。
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col items-center gap-10 sm:flex-row">
                                <div className="flex h-48 w-full flex-1 items-center justify-center rounded-2xl bg-gradient-to-br from-yellow-50 to-amber-50 text-7xl">
                                    ⭐
                                </div>
                                <div className="flex-1">
                                    <div className="mb-2 inline-block rounded-full bg-yellow-50 px-3 py-1 text-xs font-semibold text-yellow-600">
                                        FAVORITE
                                    </div>
                                    <h3 className="mb-3 text-2xl font-bold">
                                        よく使うループをお気に入り登録
                                    </h3>
                                    <p className="leading-relaxed text-gray-500">
                                        特によく使うループをお気に入りに登録すると、一覧の上部に表示されます。
                                        練習中の曲や講座をすぐに見つけられます。
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* プラン比較 */}
                <section className="bg-gray-50 py-20">
                    <div className="mx-auto max-w-3xl px-6">
                        <h2 className="mb-3 text-center text-3xl font-bold">
                            料金プラン
                        </h2>
                        <p className="mb-12 text-center text-gray-500">
                            まずは無料で試せます。
                        </p>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div className="rounded-2xl border border-gray-200 bg-white p-8">
                                <div className="mb-1 text-sm font-semibold text-gray-400">
                                    FREE
                                </div>
                                <div className="mb-6 text-4xl font-bold">
                                    ¥0
                                </div>
                                <ul className="space-y-3 text-sm text-gray-600">
                                    {[
                                        'ループ再生（無制限）',
                                        'ループ設定の保存（3件まで）',
                                        'お気に入り登録',
                                        'ゴミ箱機能',
                                    ].map((f) => (
                                        <li
                                            key={f}
                                            className="flex items-center gap-2"
                                        >
                                            <span className="text-green-500">
                                                ✓
                                            </span>{' '}
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="relative rounded-2xl border-2 border-purple-500 bg-white p-8">
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-1 text-xs font-bold text-white">
                                    おすすめ
                                </div>
                                <div className="mb-1 text-sm font-semibold text-purple-500">
                                    PRO
                                </div>
                                <div className="mb-6 text-4xl font-bold">
                                    近日公開
                                </div>
                                <ul className="space-y-3 text-sm text-gray-600">
                                    {[
                                        'Freeプランの全機能',
                                        'ループ設定の保存（無制限）',
                                    ].map((f) => (
                                        <li
                                            key={f}
                                            className="flex items-center gap-2"
                                        >
                                            <span className="text-purple-500">
                                                ✓
                                            </span>{' '}
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 最終CTA */}
                <section className="py-24 text-center">
                    <h2 className="mb-4 text-3xl font-bold">
                        さっそく使ってみましょう
                    </h2>
                    <p className="mb-8 text-gray-500">
                        無料・登録30秒・クレジットカード不要
                    </p>
                    <GoogleLoginButton />
                </section>

                <footer className="border-t border-gray-100 py-8 text-center text-sm text-gray-400">
                    © 2026 Loop Player
                </footer>
            </div>
        </>
    );
}
