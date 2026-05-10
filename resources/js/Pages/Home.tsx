import AdBanner from '@/Components/AdBanner';
import AppFooter from '@/Components/AppFooter';
import AppHeader from '@/Components/AppHeader';
import ConfirmDialog from '@/Components/ConfirmDialog';
import YouTubePlayer from '@/Components/YouTubePlayer';
import { LoopSetting, PageProps } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import axios from 'axios';
import { Link2, Star, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const FREE_PLAN_LIMIT = 3;

function extractVideoId(url: string): string | null {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
    return match ? match[1] : null;
}

function thumbnailUrl(videoId: string): string {
    return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
}

type Props = PageProps<{
    loopSettings: LoopSetting[];
    isPro: boolean;
}>;

export default function Home({ auth, loopSettings, isPro }: Props) {
    const { t } = useTranslation();
    const [url, setUrl] = useState('');
    const [startTime, setStartTime] = useState('0');
    const [endTime, setEndTime] = useState('30');
    const [currentVideoId, setCurrentVideoId] = useState<string | null>(null);
    const [currentStart, setCurrentStart] = useState(0);
    const [currentEnd, setCurrentEnd] = useState(30);
    const [error, setError] = useState('');
    const [showSaveDialog, setShowSaveDialog] = useState(false);
    const [showCopied, setShowCopied] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState<LoopSetting | null>(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        video_id: '',
        title: '',
        description: '',
        start_time: 0,
        end_time: 0,
    });

    const activeLoops = loopSettings
        .filter((l) => !l.deleted_at)
        .sort((a, b) => (b.is_favorite ? 1 : 0) - (a.is_favorite ? 1 : 0));

    const isAtLimit = !isPro && activeLoops.length >= FREE_PLAN_LIMIT;
    const canSave = !!extractVideoId(url) && startTime !== '' && endTime !== '' && !isAtLimit;

    const handleToggleFavorite = (loop: LoopSetting) => {
        router.post(route('home.favorite', loop.id));
    };

    const handleStartLoop = () => {
        const videoId = extractVideoId(url);
        if (!videoId) {
            setError(t('home.invalidUrl'));
            return;
        }
        const start = parseFloat(startTime);
        const end = parseFloat(endTime);
        if (isNaN(start) || isNaN(end) || start >= end) {
            setError(t('home.invalidTime'));
            return;
        }
        setError('');
        setCurrentVideoId(videoId);
        setCurrentStart(start);
        setCurrentEnd(end);
    };

    const handleOpenSaveDialog = async () => {
        const videoId = currentVideoId ?? extractVideoId(url);
        if (!videoId) return;
        const start = parseFloat(startTime);
        const end = parseFloat(endTime);
        setData({
            video_id: videoId,
            title: '',
            description: '',
            start_time: isNaN(start) ? 0 : start,
            end_time: isNaN(end) ? 0 : end,
        });
        setShowSaveDialog(true);

        try {
            const res = await fetch(
                `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`,
            );
            if (res.ok) {
                const json = await res.json();
                setData('title', json.title ?? '');
            }
        } catch {
            // ignore
        }
    };

    const handleSave = () => {
        post(route('home.store'), {
            onSuccess: () => {
                setShowSaveDialog(false);
                reset('title', 'description');
            },
        });
    };

    const handleRangeChange = (start: number, end: number) => {
        setCurrentStart(start);
        setCurrentEnd(end);
        setStartTime(start.toFixed(1));
        setEndTime(end.toFixed(1));
    };

    const handleDeleteLoop = (loop: LoopSetting) => {
        setDeleteTarget(loop);
    };

    const confirmDelete = () => {
        if (!deleteTarget) return;
        router.post(route('home.destroy', deleteTarget.id));
        setDeleteTarget(null);
    };

    const handleShare = async (loop: LoopSetting) => {
        const { data } = await axios.post(route('share.generate', loop.id));
        await navigator.clipboard.writeText(data.url);
        setShowCopied(true);
        setTimeout(() => setShowCopied(false), 2000);
    };

    const handleLoadLoop = (loop: LoopSetting) => {
        setUrl(`https://www.youtube.com/watch?v=${loop.video_id}`);
        setStartTime(loop.start_time.toString());
        setEndTime(loop.end_time.toString());
        setCurrentStart(loop.start_time);
        setCurrentEnd(loop.end_time);
        setCurrentVideoId(loop.video_id);
    };

    const LoopList = () => (
        <>
            {activeLoops.length === 0 ? (
                <div className="py-12 text-center text-sm text-gray-700 dark:text-gray-400">
                    {t('home.noLoops')}
                </div>
            ) : (
                <>
                    <div className="hidden space-y-2 sidebar:block">
                        {activeLoops.map((loop) => (
                            <div
                                key={loop.id}
                                className="flex w-full items-center gap-3 rounded-xl p-2 transition-all hover:bg-gray-50 hover:shadow-sm dark:hover:bg-gray-700"
                            >
                                <div className="relative flex-shrink-0">
                                    <img
                                        src={thumbnailUrl(loop.video_id)}
                                        alt={loop.title ?? ''}
                                        className="h-16 w-28 rounded object-cover"
                                    />
                                    <button
                                        onClick={() => handleToggleFavorite(loop)}
                                        className="absolute right-1 top-1 rounded-full bg-black/40 p-0.5 transition-colors hover:bg-black/60"
                                        aria-label={t('common.favorite')}
                                    >
                                        <Star
                                            className="h-3.5 w-3.5"
                                            fill={loop.is_favorite ? '#facc15' : 'none'}
                                            stroke={loop.is_favorite ? '#facc15' : 'white'}
                                        />
                                    </button>
                                </div>
                                <button
                                    onClick={() => handleLoadLoop(loop)}
                                    className="min-w-0 flex-1 text-left"
                                >
                                    <p className="line-clamp-2 text-sm font-medium leading-snug dark:text-gray-100">
                                        {loop.title}
                                    </p>
                                    {loop.description && (
                                        <p className="mt-0.5 line-clamp-1 text-xs text-gray-700 dark:text-gray-400">
                                            {loop.description}
                                        </p>
                                    )}
                                    <p className="mt-1 text-xs text-gray-700 dark:text-gray-400">
                                        {t('home.loopRange', {
                                            start: Math.floor(loop.start_time),
                                            end: Math.floor(loop.end_time),
                                        })}
                                    </p>
                                </button>
                                <button
                                    onClick={() => handleShare(loop)}
                                    className="flex-shrink-0 rounded p-1.5 text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200"
                                    aria-label={t('common.share')}
                                >
                                    <span className="flex flex-col items-center gap-0.5 text-xs">
                                        <Link2 className="h-4 w-4" />
                                        <span>{t('common.share')}</span>
                                    </span>
                                </button>
                                <button
                                    onClick={() => handleDeleteLoop(loop)}
                                    className="flex-shrink-0 rounded p-1.5 text-red-500 transition-colors hover:bg-red-50 hover:text-red-600 dark:text-red-400 dark:hover:bg-red-900/20 dark:hover:text-red-300"
                                    aria-label={t('common.delete')}
                                >
                                    <span className="flex flex-col items-center gap-0.5 text-xs">
                                        <Trash2 className="h-4 w-4" />
                                        <span>{t('common.delete')}</span>
                                    </span>
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="divide-y divide-gray-100 dark:divide-gray-700 sidebar:hidden">
                        {activeLoops.map((loop) => (
                            <div key={loop.id} className="flex flex-col gap-2 py-3">
                                <div className="flex items-center gap-3">
                                    <div className="relative flex-shrink-0">
                                        <button onClick={() => handleLoadLoop(loop)}>
                                            <img
                                                src={thumbnailUrl(loop.video_id)}
                                                alt={loop.title ?? ''}
                                                className="h-16 w-28 rounded-lg object-cover"
                                            />
                                        </button>
                                        <button
                                            onClick={() => handleToggleFavorite(loop)}
                                            className="absolute right-1 top-1 rounded-full bg-black/40 p-1 transition-colors hover:bg-black/60"
                                            aria-label={t('common.favorite')}
                                        >
                                            <Star
                                                className="h-3.5 w-3.5"
                                                fill={loop.is_favorite ? '#facc15' : 'none'}
                                                stroke={loop.is_favorite ? '#facc15' : 'white'}
                                            />
                                        </button>
                                    </div>
                                    <div className="flex-1" />
                                    <button
                                        onClick={() => handleShare(loop)}
                                        className="flex-shrink-0 rounded p-1.5 text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200"
                                        aria-label={t('common.share')}
                                    >
                                        <span className="flex flex-col items-center gap-0.5 text-xs">
                                            <Link2 className="h-4 w-4" />
                                            <span>{t('common.share')}</span>
                                        </span>
                                    </button>
                                    <button
                                        onClick={() => handleDeleteLoop(loop)}
                                        className="flex-shrink-0 rounded p-1.5 text-red-500 transition-colors hover:bg-red-50 hover:text-red-600 dark:text-red-400 dark:hover:bg-red-900/20 dark:hover:text-red-300"
                                        aria-label={t('common.delete')}
                                    >
                                        <span className="flex flex-col items-center gap-0.5 text-xs">
                                            <Trash2 className="h-4 w-4" />
                                            <span>{t('common.delete')}</span>
                                        </span>
                                    </button>
                                </div>
                                <button
                                    onClick={() => handleLoadLoop(loop)}
                                    className="w-full text-left"
                                >
                                    <p className="line-clamp-2 text-sm font-medium leading-snug dark:text-gray-100">
                                        {loop.title}
                                    </p>
                                    {loop.description && (
                                        <p className="mt-0.5 line-clamp-1 text-xs text-gray-700 dark:text-gray-400">
                                            {loop.description}
                                        </p>
                                    )}
                                    <p className="mt-1 text-xs text-gray-700 dark:text-gray-400">
                                        {t('home.loopRange', {
                                            start: Math.floor(loop.start_time),
                                            end: Math.floor(loop.end_time),
                                        })}
                                    </p>
                                </button>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </>
    );

    return (
        <>
            <Head title={t('home.title')} />
            <ConfirmDialog
                show={deleteTarget !== null}
                message={t('home.deleteConfirm')}
                onConfirm={confirmDelete}
                onCancel={() => setDeleteTarget(null)}
            />
            {showCopied && (
                <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-gray-900 px-5 py-2.5 text-sm font-medium text-white shadow-lg dark:bg-gray-100 dark:text-gray-900">
                    {t('share.copySuccess')}
                </div>
            )}
            <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
                <AppHeader userName={auth.user.name} isPro={isPro} />

                <div className="container mx-auto px-4 py-8">
                    <div className="sidebar:grid sidebar:grid-cols-3 sidebar:gap-6">
                        <div className="space-y-6 sidebar:col-span-2">
                            <div className="rounded-2xl border border-gray-200/70 bg-white p-6 shadow-md transition-shadow hover:shadow-lg dark:border-gray-700/70 dark:bg-gray-800">
                                <h2 className="mb-1 text-xl font-bold tracking-tight dark:text-white">
                                    {t('home.loopPlay')}
                                </h2>
                                <p className="mb-5 text-sm text-gray-700 dark:text-gray-400">
                                    {t('home.loopPlayDesc')}
                                </p>

                                <div className="space-y-4">
                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            {t('home.youtubeUrl')}
                                        </label>
                                        <input
                                            type="url"
                                            value={url}
                                            onChange={(e) =>
                                                setUrl(e.target.value)
                                            }
                                            placeholder={t(
                                                'home.urlPlaceholder',
                                            )}
                                            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 font-mono text-sm shadow-sm focus-visible:border-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-500 dark:focus-visible:ring-indigo-400"
                                        />
                                    </div>

                                    {currentVideoId ? (
                                        <YouTubePlayer
                                            videoId={currentVideoId}
                                            startTime={currentStart}
                                            endTime={currentEnd}
                                            onSave={handleOpenSaveDialog}
                                            onRangeChange={handleRangeChange}
                                            isAtLimit={isAtLimit}
                                            limitMessage={t('home.limitReached', {
                                                limit: FREE_PLAN_LIMIT,
                                            })}
                                        />
                                    ) : (
                                        <div className="flex aspect-video w-full flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-900/50">
                                            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                                                <svg viewBox="0 0 24 24" className="h-7 w-7 fill-gray-400">
                                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                                </svg>
                                            </div>
                                            <p className="text-sm font-medium text-gray-700 dark:text-gray-400">
                                                {t('home.loopPlayDesc')}
                                            </p>
                                        </div>
                                    )}

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                {t('home.startTime')}
                                            </label>
                                            <input
                                                type="number"
                                                min="0"
                                                step="0.1"
                                                value={startTime}
                                                onChange={(e) =>
                                                    setStartTime(e.target.value)
                                                }
                                                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus-visible:border-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:focus-visible:ring-indigo-400"
                                            />
                                        </div>
                                        <div>
                                            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                {t('home.endTime')}
                                            </label>
                                            <input
                                                type="number"
                                                min="0"
                                                step="0.1"
                                                value={endTime}
                                                onChange={(e) =>
                                                    setEndTime(e.target.value)
                                                }
                                                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus-visible:border-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:focus-visible:ring-indigo-400"
                                            />
                                        </div>
                                    </div>

                                    {error && (
                                        <p className="text-sm text-red-600 dark:text-red-400">
                                            {error}
                                        </p>
                                    )}

                                    <div className="flex gap-3">
                                        <button
                                            onClick={handleStartLoop}
                                            className="flex-1 rounded-lg bg-gradient-to-r from-gray-800 to-gray-900 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:ring-offset-2 active:scale-[0.98] dark:from-gray-600 dark:to-gray-700 dark:focus-visible:ring-gray-400 dark:focus-visible:ring-offset-gray-800"
                                        >
                                            ▶ {t('home.startLoop')}
                                        </button>
                                        <div className="flex flex-col items-end gap-1">
                                            <button
                                                onClick={handleOpenSaveDialog}
                                                disabled={!canSave}
                                                className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-all hover:border-gray-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 active:scale-[0.98] disabled:opacity-40 dark:border-transparent dark:bg-gradient-to-r dark:from-gray-600 dark:to-gray-700 dark:text-white dark:hover:brightness-110 dark:focus-visible:ring-gray-400 dark:focus-visible:ring-offset-gray-800"
                                            >
                                                💾 {t('common.save')}
                                            </button>
                                            {isAtLimit && (
                                                <p className="text-xs text-red-600 dark:text-red-400">
                                                    {t('home.limitReached', {
                                                        limit: FREE_PLAN_LIMIT,
                                                    })}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {!isPro && (
                                <AdBanner
                                    slot={
                                        import.meta.env
                                            .VITE_ADSENSE_SLOT_HOME ?? ''
                                    }
                                    format="horizontal"
                                    className="min-h-[90px]"
                                />
                            )}

                            <div className="sidebar:hidden">
                                <div className="rounded-2xl border border-gray-200/70 bg-white p-6 shadow-md dark:border-gray-700/70 dark:bg-gray-800">
                                    <div className="mb-4 flex items-center justify-between">
                                        <h2 className="text-lg font-semibold dark:text-white">
                                            {t('home.savedLoops')}
                                        </h2>
                                        {!isPro && (
                                            <span className="text-xs text-gray-700 dark:text-gray-400">
                                                {activeLoops.length} /{' '}
                                                {FREE_PLAN_LIMIT}
                                            </span>
                                        )}
                                    </div>
                                    <LoopList />
                                </div>
                            </div>
                        </div>

                        <div className="hidden sidebar:block">
                            <div className="sticky top-20 rounded-2xl border border-gray-200/70 bg-white p-4 shadow-md dark:border-gray-700/70 dark:bg-gray-800">
                                <div className="mb-4 flex items-center justify-between">
                                    <h2 className="font-semibold dark:text-white">
                                        {t('home.savedLoops')}
                                    </h2>
                                    {!isPro && (
                                        <span className="text-xs text-gray-700 dark:text-gray-400">
                                            {activeLoops.length} /{' '}
                                            {FREE_PLAN_LIMIT}
                                        </span>
                                    )}
                                </div>
                                <LoopList />
                            </div>
                        </div>
                    </div>
                </div>
                <AppFooter />
            </div>

            {showSaveDialog && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl dark:bg-gray-800">
                        <h3 className="mb-1 text-lg font-semibold dark:text-white">
                            {t('home.saveDialog.title')}
                        </h3>
                        <p className="mb-4 text-sm text-gray-700 dark:text-gray-400">
                            {t('home.saveDialog.desc')}
                        </p>

                        <div className="space-y-4">
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    {t('home.saveDialog.titleLabel')}
                                </label>
                                <input
                                    type="text"
                                    value={data.title}
                                    onChange={(e) =>
                                        setData('title', e.target.value)
                                    }
                                    placeholder={t(
                                        'home.saveDialog.titlePlaceholder',
                                    )}
                                    className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus-visible:border-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:focus-visible:ring-indigo-400"
                                    autoFocus
                                />
                                {errors.title && (
                                    <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                                        {errors.title}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                    {t('home.saveDialog.memoLabel')}
                                </label>
                                <textarea
                                    value={data.description}
                                    onChange={(e) =>
                                        setData('description', e.target.value)
                                    }
                                    placeholder={t(
                                        'home.saveDialog.memoPlaceholder',
                                    )}
                                    rows={3}
                                    className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus-visible:border-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:focus-visible:ring-indigo-400"
                                />
                            </div>

                            <p className="text-xs text-gray-700 dark:text-gray-400">
                                {t('home.saveDialog.range', {
                                    start: Math.floor(data.start_time),
                                    end: Math.floor(data.end_time),
                                })}
                            </p>
                        </div>

                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                onClick={() => setShowSaveDialog(false)}
                                className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 dark:focus-visible:ring-gray-500 dark:focus-visible:ring-offset-gray-800"
                            >
                                {t('common.cancel')}
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={processing}
                                className="rounded-lg bg-gradient-to-r from-gray-800 to-gray-900 px-4 py-2 text-sm font-semibold text-white shadow-md transition-all hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:ring-offset-2 active:scale-[0.98] disabled:opacity-40 dark:from-gray-600 dark:to-gray-700 dark:focus-visible:ring-gray-400 dark:focus-visible:ring-offset-gray-800"
                            >
                                {t('common.save')}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
