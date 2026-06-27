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
                                1. YouTubeで区間リピートしたい場面
                            </h2>
                            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                                YouTubeの動画を「この部分だけ何度も繰り返したい」と思ったことはありませんか？区間を指定してループ再生できると、次のような場面で特に役立ちます。
                            </p>
                            <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                                <li className="flex items-start gap-2">
                                    <span className="mt-0.5 text-base">📖</span>
                                    <span>
                                        <strong className="text-gray-900 dark:text-white">語学学習</strong>
                                        ——ネイティブの発音やフレーズを聴き取るために、同じ数秒間を繰り返し再生したい。
                                    </span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="mt-0.5 text-base">🎸</span>
                                    <span>
                                        <strong className="text-gray-900 dark:text-white">楽器練習</strong>
                                        ——弾き方がわからない箇所を何度も確認しながら、ゆっくり練習したい。
                                    </span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="mt-0.5 text-base">💃</span>
                                    <span>
                                        <strong className="text-gray-900 dark:text-white">ダンス練習</strong>
                                        ——振り付けの特定のカウントだけを繰り返して、体に覚えさせたい。
                                    </span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="mt-0.5 text-base">🎵</span>
                                    <span>
                                        <strong className="text-gray-900 dark:text-white">音楽のリスニング</strong>
                                        ——好きなサビや間奏だけを繰り返して聴きたい。
                                    </span>
                                </li>
                            </ul>
                            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                                これらのユースケースに共通しているのは、「動画全体ではなく、特定の区間（A点からB点）だけを繰り返したい」という需要です。このような繰り返し方を<strong className="text-gray-900 dark:text-white">ABリピート</strong>または<strong className="text-gray-900 dark:text-white">区間リピート</strong>と呼びます。
                            </p>
                        </section>

                        {/* Section 2 */}
                        <section className="mb-10">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                2. スマホ・PCでYouTubeを区間リピートする方法
                            </h2>
                            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                                YouTubeのアプリや公式サイトには、動画全体をループ再生する機能はありますが、<strong className="text-gray-900 dark:text-white">特定の区間だけをリピートする機能は標準搭載されていません。</strong>
                            </p>
                            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                                そのため、区間リピートを実現するには次のいずれかの方法が一般的です。
                            </p>

                            <div className="space-y-4">
                                <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5">
                                    <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">
                                        方法1：手動でシークバーを操作する
                                    </h3>
                                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                                        再生が終わりに近づいたら手動でシークバーを戻す方法です。無料でできますが、毎回手動で操作する必要があり、学習や練習の集中が途切れてしまいます。
                                    </p>
                                </div>

                                <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5">
                                    <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">
                                        方法2：ブラウザ拡張機能を使う
                                    </h3>
                                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                                        PCのChromeやFirefox向けに、YouTubeの区間リピートを実現する拡張機能がいくつかあります。ただし、スマホでは使えないものが多く、拡張機能のインストールが必要です。
                                    </p>
                                </div>

                                <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5">
                                    <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-2">
                                        方法3：専用のWebツールを使う
                                    </h3>
                                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                                        インストール不要のWebアプリを使えば、PC・スマホどちらからでも区間リピートが可能です。URLにアクセスするだけで使えるため、手軽さが最大のメリットです。
                                    </p>
                                </div>
                            </div>

                            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                                以降では、方法3にあたる「Loop Video」というWebツールを使った具体的な手順を説明します。
                            </p>
                        </section>

                        {/* Section 3 */}
                        <section className="mb-10">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                                3. Loop Videoを使った区間リピートのやり方
                            </h2>
                            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                                <a href="https://loop-video.com" className="text-purple-600 dark:text-purple-400 hover:underline">Loop Video</a>は、YouTubeの動画URLを貼り付けるだけで区間リピート再生ができるWebアプリです。ログインなしでも使えます。
                            </p>

                            <div className="space-y-4 mb-6">
                                <div className="flex items-start gap-4">
                                    <span className="flex-shrink-0 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-purple-600 text-xs font-bold text-white">
                                        1
                                    </span>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                                            YouTubeのURLを貼り付ける
                                        </p>
                                        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                                            ループ再生したいYouTube動画のURLをコピーし、Loop VideoのURL入力欄に貼り付けます。
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <span className="flex-shrink-0 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-purple-600 text-xs font-bold text-white">
                                        2
                                    </span>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                                            開始時間・終了時間を設定する
                                        </p>
                                        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                                            ループ再生させたい区間の開始時間（A点）と終了時間（B点）を秒単位で入力します。スライダーで直感的に調整することもできます。
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <span className="flex-shrink-0 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-purple-600 text-xs font-bold text-white">
                                        3
                                    </span>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                                            「ループ開始」ボタンを押す
                                        </p>
                                        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                                            ボタンを押すと、指定した区間が自動でループ再生されます。終了時間に達すると自動的に開始時間に戻るので、手動操作は不要です。
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <span className="flex-shrink-0 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-purple-600 text-xs font-bold text-white">
                                        4
                                    </span>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                                            （任意）設定を保存する
                                        </p>
                                        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                                            Googleアカウントでログインすると、設定した区間を保存できます。次回からは保存済みのループをワンクリックで呼び出せます。
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-xl border border-purple-200 dark:border-purple-700 bg-purple-50 dark:bg-purple-900/20 p-5 text-center">
                                <p className="text-sm text-gray-800 dark:text-gray-200 mb-3">
                                    今すぐ区間リピートを試してみる（ログイン不要）
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
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                                4. よくある質問
                            </h2>

                            <div className="space-y-5">
                                <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5">
                                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                                        Q. ログインなしで使えますか？
                                    </h3>
                                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                                        はい、ログインなしでも区間リピートの基本機能はご利用いただけます。ただし、設定の保存や複数ループの管理にはGoogleアカウントでのログインが必要です。
                                    </p>
                                </div>

                                <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5">
                                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                                        Q. 無料で使えますか？
                                    </h3>
                                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                                        基本的な区間リピート機能は無料でご利用いただけます。より多くの設定を保存したい場合は、月額300円のProプランもご用意しています。
                                    </p>
                                </div>

                                <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5">
                                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                                        Q. 設定したループ区間を保存できますか？
                                    </h3>
                                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                                        はい、ログイン後に「保存」ボタンを押すことでループ設定を保存できます。保存したループはマイページからいつでも呼び出せます。無料プランでは最大5件まで保存可能です。
                                    </p>
                                </div>

                                <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5">
                                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                                        Q. スマホでも使えますか？
                                    </h3>
                                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                                        はい、iPhoneやAndroidのブラウザからもご利用いただけます。アプリのインストールは不要で、ブラウザでURLにアクセスするだけで使えます。
                                    </p>
                                </div>

                                <div className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5">
                                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                                        Q. どんなYouTube動画でも区間リピートできますか？
                                    </h3>
                                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                                        埋め込み再生が許可されているYouTube動画であれば区間リピートが可能です。一部の動画（埋め込みを制限しているもの）は再生できない場合があります。
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Closing CTA */}
                        <section className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-8 text-center">
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                                区間リピートを今すぐ試す
                            </h2>
                            <p className="text-sm text-gray-700 dark:text-gray-300 mb-5">
                                インストール不要・ログイン不要で、YouTubeの区間リピートをすぐに始められます。
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
