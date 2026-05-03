import AppFooter from '@/Components/AppFooter';
import AppHeader from '@/Components/AppHeader';
import { LoopSetting, PageProps } from '@/types';
import { Head, router } from '@inertiajs/react';
import { RotateCcw, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

type Props = PageProps<{
    loopSettings: LoopSetting[];
    isPro: boolean;
}>;

function thumbnailUrl(videoId: string): string {
    return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
}

export default function Trash({ auth, loopSettings, isPro }: Props) {
    const { t } = useTranslation();

    const handleRestore = (loop: LoopSetting) => {
        router.post(route('trash.restore', loop.id));
    };

    const handleForceDelete = (loop: LoopSetting) => {
        if (!window.confirm(t('trash.forceDeleteConfirm'))) return;
        router.delete(route('trash.destroy', loop.id));
    };

    return (
        <>
            <Head title={t('trash.title')} />
            <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
                <AppHeader userName={auth.user.name} isPro={isPro} />

                <div className="container mx-auto px-4 py-8">
                    <div className="mx-auto max-w-2xl">
                        <h1 className="mb-6 text-xl font-semibold dark:text-white">
                            {t('trash.heading')}
                        </h1>

                        {loopSettings.length === 0 ? (
                            <div className="rounded-xl border border-gray-200 bg-white py-16 text-center shadow-sm dark:border-gray-700/70 dark:bg-gray-800">
                                <p className="text-sm text-gray-400 dark:text-gray-500">
                                    {t('trash.empty')}
                                </p>
                            </div>
                        ) : (
                            <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700/70 dark:bg-gray-800">
                                <ul className="divide-y divide-gray-100 dark:divide-gray-700/70">
                                    {loopSettings.map((loop) => (
                                        <li key={loop.id} className="p-4">
                                            <div className="flex gap-3">
                                                <img
                                                    src={thumbnailUrl(loop.video_id)}
                                                    alt={loop.title ?? ''}
                                                    className="h-16 w-28 flex-shrink-0 rounded object-cover"
                                                />
                                                <div className="min-w-0 flex-1">
                                                    <p className="line-clamp-2 text-sm font-medium leading-snug text-gray-800 dark:text-gray-100">
                                                        {loop.title}
                                                    </p>
                                                    {loop.description && (
                                                        <p className="mt-0.5 line-clamp-1 text-xs text-gray-500 dark:text-gray-400">
                                                            {loop.description}
                                                        </p>
                                                    )}
                                                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                                        {t('trash.loopRange', {
                                                            start: Math.floor(loop.start_time),
                                                            end: Math.floor(loop.end_time),
                                                        })}
                                                    </p>
                                                </div>
                                                {/* デスクトップ：右端にボタン */}
                                                <div className="hidden flex-shrink-0 items-center gap-2 sm:flex">
                                                    <button
                                                        onClick={() => handleRestore(loop)}
                                                        className="flex flex-col items-center gap-0.5 rounded p-1.5 text-xs text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200"
                                                    >
                                                        <RotateCcw className="h-4 w-4" />
                                                        <span>{t('common.restore')}</span>
                                                    </button>
                                                    <button
                                                        onClick={() => handleForceDelete(loop)}
                                                        className="flex flex-col items-center gap-0.5 rounded p-1.5 text-xs text-red-500 transition-colors hover:bg-red-50 hover:text-red-600 dark:text-red-400 dark:hover:bg-red-900/20 dark:hover:text-red-300"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                        <span>{t('trash.forceDelete')}</span>
                                                    </button>
                                                </div>
                                            </div>
                                            {/* モバイル：左半分が戻す、右半分が完全削除 */}
                                            <div className="mt-3 flex overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 sm:hidden">
                                                <button
                                                    onClick={() => handleRestore(loop)}
                                                    className="flex flex-1 items-center justify-center gap-1.5 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
                                                >
                                                    <RotateCcw className="h-4 w-4" />
                                                    {t('common.restore')}
                                                </button>
                                                <div className="w-px bg-gray-200 dark:bg-gray-700" />
                                                <button
                                                    onClick={() => handleForceDelete(loop)}
                                                    className="flex flex-1 items-center justify-center gap-1.5 py-2 text-sm text-red-500 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                    {t('trash.forceDelete')}
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
                <AppFooter />
            </div>
        </>
    );
}
