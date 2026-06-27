import AppFooter from '@/Components/AppFooter';
import AppHeader from '@/Components/AppHeader';
import { Head, Link } from '@inertiajs/react';

export default function Guide() {
    return (
        <>
            <Head title="YouTubeを区間リピートする方法｜AB間を自動ループ再生するツール | Loop Video">
                <meta
                    name="description"
                    content="YouTubeで特定の区間だけをリピート再生する方法を解説。語学学習・楽器練習・ダンス練習に最適なABリピートツール「Loop Video」の使い方も紹介します。"
                />
                <link rel="canonical" href="https://loop-video.com/guide" />
            </Head>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
                <AppHeader />
                <main className="container mx-auto max-w-3xl px-4 py-12 flex-1">
                    <article className="prose prose-gray max-w-none dark:prose-invert">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            YouTubeを区間リピートする方法｜AB間を自動ループ再生するツール
                        </h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
                            公開日: 2026年6月27日
                        </p>

                        {/* Section 1 */}
                        <section className="mb-10">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                1. こんな時に使える
                            </h2>
                            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                                <li className="flex items-center gap-2">
                                    <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-400 dark:bg-gray-500" />
                                    <span><strong className="text-gray-900 dark:text-white">語学学習</strong> — ネイティブの発音を何度も聴き取りたい</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-400 dark:bg-gray-500" />
                                    <span><strong className="text-gray-900 dark:text-white">楽器練習</strong> — 難しい箇所だけ繰り返して練習したい</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-400 dark:bg-gray-500" />
                                    <span><strong className="text-gray-900 dark:text-white">ダンス練習</strong> — 特定のカウントだけ体に覚えさせたい</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-400 dark:bg-gray-500" />
                                    <span><strong className="text-gray-900 dark:text-white">音楽リスニング</strong> — 好きなサビだけ繰り返して聴きたい</span>
                                </li>
                            </ul>
                        </section>

                        {/* Section 2 */}
                        <section className="mb-10">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                2. YouTubeで区間リピートする3つの方法
                            </h2>
                            <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                                YouTubeには<strong className="text-gray-900 dark:text-white">区間リピート機能が標準搭載されていません。</strong>代替手段は主に3つです。
                            </p>

                            <div className="space-y-3">
                                <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-5 py-3.5 flex items-start gap-3">
                                    <span className="mt-0.5 text-xs font-bold text-gray-400 dark:text-gray-500 w-14 flex-shrink-0">方法1</span>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900 dark:text-white">手動でシークバーを戻す</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">無料だが、毎回手動操作が必要で集中が途切れる</p>
                                    </div>
                                </div>
                                <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-5 py-3.5 flex items-start gap-3">
                                    <span className="mt-0.5 text-xs font-bold text-gray-400 dark:text-gray-500 w-14 flex-shrink-0">方法2</span>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900 dark:text-white">ブラウザ拡張機能を使う</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">PC Chromeのみ対応。スマホでは使えない</p>
                                    </div>
                                </div>
                                <div className="rounded-xl border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-900/20 px-5 py-3.5 flex items-start gap-3">
                                    <span className="mt-0.5 text-xs font-bold text-purple-500 w-14 flex-shrink-0">方法3 ★</span>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900 dark:text-white">専用Webツールを使う</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">インストール不要・PC／スマホ両対応。最も手軽</p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Section 3 */}
                        <section className="mb-10">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                3. Loop Videoの使い方（3ステップ）
                            </h2>

                            <img
                                src="/images/guide/step1-url-input.png"
                                alt="Loop VideoにYouTube URLを貼り付けた画面"
                                className="mb-5 w-full rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm"
                            />

                            <div className="space-y-3 mb-5">
                                <div className="flex items-center gap-4">
                                    <span className="flex-shrink-0 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-purple-600 text-xs font-bold text-white">1</span>
                                    <p className="text-sm text-gray-700 dark:text-gray-300"><strong className="text-gray-900 dark:text-white">YouTube URLを貼り付ける</strong></p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="flex-shrink-0 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-purple-600 text-xs font-bold text-white">2</span>
                                    <p className="text-sm text-gray-700 dark:text-gray-300"><strong className="text-gray-900 dark:text-white">開始・終了時間を秒単位で入力する</strong></p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="flex-shrink-0 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-purple-600 text-xs font-bold text-white">3</span>
                                    <p className="text-sm text-gray-700 dark:text-gray-300"><strong className="text-gray-900 dark:text-white">「ループをセット」を押す → 自動ループ開始</strong></p>
                                </div>
                            </div>

                            <img
                                src="/images/guide/step2-loop-settings.png"
                                alt="開始・終了時間を設定してループをセットする画面"
                                className="mb-6 w-full rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm"
                            />

                            <div className="rounded-xl border border-purple-200 dark:border-purple-700 bg-purple-50 dark:bg-purple-900/20 p-5 text-center">
                                <p className="text-sm text-gray-800 dark:text-gray-200 mb-3">
                                    ログイン不要で今すぐ試せます
                                </p>
                                <Link
                                    href="/home"
                                    className="inline-block rounded-xl bg-gradient-to-r from-red-500 to-purple-600 px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                                >
                                    Loop Videoを使ってみる
                                </Link>
                            </div>
                        </section>

                        {/* Section 4 – FAQ */}
                        <section className="mb-10">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                4. よくある質問
                            </h2>

                            <div className="space-y-4">
                                <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5">
                                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                                        Q. ログインなしで使えますか？
                                    </h3>
                                    <p className="text-sm text-gray-700 dark:text-gray-300">
                                        はい。基本的な区間リピートはログイン不要です。設定の保存にはGoogleアカウントが必要です。
                                    </p>
                                </div>

                                <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5">
                                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                                        Q. スマホでも使えますか？
                                    </h3>
                                    <p className="text-sm text-gray-700 dark:text-gray-300">
                                        はい。iPhone・Androidのブラウザから、アプリインストール不要で使えます。
                                    </p>
                                </div>

                                <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5">
                                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                                        Q. 無料で使えますか？
                                    </h3>
                                    <p className="text-sm text-gray-700 dark:text-gray-300">
                                        区間リピートは無料で使えます。ループ設定を3件以上保存したい場合はProプラン（月額490円）をご利用ください。
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Closing CTA */}
                        <section className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-8 text-center">
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                                区間リピートを今すぐ試す
                            </h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
                                インストール不要・ログイン不要
                            </p>
                            <Link
                                href="/home"
                                className="inline-block rounded-xl bg-gradient-to-r from-red-500 to-purple-600 px-8 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                            >
                                Loop Videoを無料で使う
                            </Link>
                        </section>
                    </article>
                </main>
                <AppFooter />
            </div>
        </>
    );
}
