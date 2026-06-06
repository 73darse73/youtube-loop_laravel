import AdBanner from '@/Components/AdBanner';
import YouTubePlayer from '@/Components/YouTubePlayer';
import { Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

type Props = {
    loop: {
        video_id: string;
        title: string | null;
        start_time: number;
        end_time: number;
    };
};

export default function Share({ loop }: Props) {
    const { t } = useTranslation();

    return (
        <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
            {/* ヘッダー */}
            <header className="flex items-center justify-between border-b border-gray-200/80 bg-white/80 px-4 py-3 backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-900/80">
                <Link href={route('login')} className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-red-500 to-purple-600">
                        <svg viewBox="0 0 24 24" className="h-4 w-4 fill-white">
                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                        </svg>
                    </div>
                    <span className="text-sm font-semibold text-gray-800 dark:text-white">Loop Video</span>
                </Link>
                <Link
                    href={route('register')}
                    className="rounded-lg bg-gradient-to-r from-red-500 to-purple-600 px-3 py-1.5 text-xs font-medium text-white transition-opacity hover:opacity-90"
                >
                    {t('share.tryFree')}
                </Link>
            </header>

            {/* メインコンテンツ */}
            <main className="flex flex-1 flex-col items-center px-4 py-8">
                <div className="w-full max-w-2xl">
                    {loop.title && (
                        <h1 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">
                            {loop.title}
                        </h1>
                    )}

                    <YouTubePlayer
                        videoId={loop.video_id}
                        startTime={loop.start_time}
                        endTime={loop.end_time}
                    />

                    {/* Ad */}
                    <AdBanner
                        slot={import.meta.env.VITE_ADSENSE_SLOT_SHARE ?? ''}
                        format="horizontal"
                        className="mt-6 min-h-[90px]"
                    />

                    {/* CTA */}
                    <div className="mt-6 rounded-xl border border-purple-100 bg-gradient-to-r from-red-50 to-purple-50 p-5 text-center dark:border-purple-900/30 dark:from-red-950/20 dark:to-purple-950/20">
                        <p className="mb-3 text-sm font-medium text-gray-700 dark:text-gray-200">
                            {t('share.ctaText')}
                        </p>
                        <Link
                            href={route('register')}
                            className="inline-block rounded-lg bg-gradient-to-r from-red-500 to-purple-600 px-5 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
                        >
                            {t('share.ctaButton')}
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
