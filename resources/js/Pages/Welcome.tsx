import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth }: PageProps) {
    return (
        <>
            <Head title="Loop Player" />
            <div className="flex min-h-screen flex-col bg-gradient-to-br from-white via-white to-gray-100">
                <header className="flex items-center justify-between px-6 py-4">
                    <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-red-500 to-purple-600">
                            <svg
                                className="h-5 w-5 text-white"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                            </svg>
                        </div>
                        <span className="text-lg font-bold">Loop Player</span>
                    </div>
                    {auth.user ? (
                        <Link
                            href={route('home.index')}
                            className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700"
                        >
                            ホームへ
                        </Link>
                    ) : (
                        <Link
                            href={route('login')}
                            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                        >
                            ログイン
                        </Link>
                    )}
                </header>

                <main className="flex flex-1 flex-col items-center justify-center px-6 py-16 text-center">
                    <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 to-purple-600 shadow-lg">
                        <svg
                            className="h-10 w-10 text-white"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                        </svg>
                    </div>

                    <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                        Loop Player
                    </h1>
                    <p className="mb-8 max-w-md text-lg text-gray-500">
                        YouTube動画の指定区間を、くり返し再生
                    </p>

                    <a
                        href="/auth/redirect"
                        className="mb-12 inline-flex items-center gap-3 rounded-xl bg-gray-900 px-6 py-3 text-base font-medium text-white shadow-md transition-colors hover:bg-gray-700"
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
                        Googleでログイン
                    </a>

                    <div className="grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3">
                        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                            <div className="mb-2 text-2xl">🔁</div>
                            <h3 className="mb-1 font-semibold">
                                区間ループ再生
                            </h3>
                            <p className="text-sm text-gray-500">
                                開始・終了時間を指定してループ再生
                            </p>
                        </div>
                        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                            <div className="mb-2 text-2xl">💾</div>
                            <h3 className="mb-1 font-semibold">
                                ループ設定を保存
                            </h3>
                            <p className="text-sm text-gray-500">
                                お気に入りの区間をいつでも呼び出せる
                            </p>
                        </div>
                        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                            <div className="mb-2 text-2xl">⭐</div>
                            <h3 className="mb-1 font-semibold">
                                お気に入り管理
                            </h3>
                            <p className="text-sm text-gray-500">
                                よく使うループをお気に入りに登録
                            </p>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
