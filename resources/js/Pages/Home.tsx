import AppHeader from '@/Components/AppHeader';
import YouTubePlayer from '@/Components/YouTubePlayer';
import { LoopSetting, PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

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
    const [url, setUrl] = useState('');
    const [startTime, setStartTime] = useState('0');
    const [endTime, setEndTime] = useState('30');
    const [currentVideoId, setCurrentVideoId] = useState<string | null>(null);
    const [currentStart, setCurrentStart] = useState(0);
    const [currentEnd, setCurrentEnd] = useState(30);
    const [error, setError] = useState('');

    const activeLoops = loopSettings.filter((l) => !l.deleted_at);

    const handleStartLoop = () => {
        const videoId = extractVideoId(url);
        if (!videoId) {
            setError('有効なYouTube URLを入力してください');
            return;
        }
        const start = parseFloat(startTime);
        const end = parseFloat(endTime);
        if (isNaN(start) || isNaN(end) || start >= end) {
            setError('開始時間は終了時間より小さい値を入力してください');
            return;
        }
        setError('');
        setCurrentVideoId(videoId);
        setCurrentStart(start);
        setCurrentEnd(end);
    };

    const handleLoadLoop = (loop: LoopSetting) => {
        setCurrentVideoId(loop.video_id);
        setCurrentStart(loop.start_time);
        setCurrentEnd(loop.end_time);
        setUrl(`https://www.youtube.com/watch?v=${loop.video_id}`);
        setStartTime(loop.start_time.toString());
        setEndTime(loop.end_time.toString());
    };

    const LoopList = () => (
        <>
            {activeLoops.length === 0 ? (
                <div className="py-12 text-center text-sm text-gray-400">
                    保存されたループ設定はありません
                </div>
            ) : (
                <>
                    {/* 1000px以上: 縦リスト（サムネイル左・テキスト右） */}
                    <div className="hidden space-y-2 sidebar:block">
                        {activeLoops.map((loop) => (
                            <button
                                key={loop.id}
                                onClick={() => handleLoadLoop(loop)}
                                className="group flex w-full gap-3 rounded-lg p-2 text-left transition-colors hover:bg-gray-50"
                            >
                                <img
                                    src={thumbnailUrl(loop.video_id)}
                                    alt={loop.title}
                                    className="h-16 w-28 flex-shrink-0 rounded object-cover"
                                />
                                <div className="min-w-0 flex-1">
                                    <p className="line-clamp-2 text-sm font-medium leading-snug">
                                        {loop.title}
                                    </p>
                                    {loop.description && (
                                        <p className="mt-0.5 line-clamp-1 text-xs text-gray-400">
                                            {loop.description}
                                        </p>
                                    )}
                                    <p className="mt-1 text-xs text-gray-400">
                                        {Math.floor(loop.start_time)}秒 〜{' '}
                                        {Math.floor(loop.end_time)}秒
                                    </p>
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* 999px以下: グリッド（サムネイル上・テキスト下） */}
                    <div className="grid grid-cols-1 gap-4 cols-2:grid-cols-2 cols-3:grid-cols-3 sidebar:hidden">
                        {activeLoops.map((loop) => (
                            <button
                                key={loop.id}
                                onClick={() => handleLoadLoop(loop)}
                                className="group rounded-lg text-left transition-colors hover:bg-gray-50"
                            >
                                <img
                                    src={thumbnailUrl(loop.video_id)}
                                    alt={loop.title}
                                    className="aspect-video w-full rounded-lg object-cover"
                                />
                                <div className="mt-2 px-1">
                                    <p className="line-clamp-2 text-sm font-medium leading-snug">
                                        {loop.title}
                                    </p>
                                    {loop.description && (
                                        <p className="mt-0.5 line-clamp-1 text-xs text-gray-400">
                                            {loop.description}
                                        </p>
                                    )}
                                    <p className="mt-1 text-xs text-gray-400">
                                        {Math.floor(loop.start_time)}秒 〜{' '}
                                        {Math.floor(loop.end_time)}秒
                                    </p>
                                </div>
                            </button>
                        ))}
                    </div>
                </>
            )}
        </>
    );

    return (
        <>
            <Head title="ホーム" />
            <div className="min-h-screen bg-gray-50">
                <AppHeader userName={auth.user.name} isPro={isPro} />

                <div className="container mx-auto px-4 py-8">
                    <div className="sidebar:grid sidebar:grid-cols-3 sidebar:gap-6">
                        {/* プレイヤーエリア */}
                        <div className="space-y-6 sidebar:col-span-2">
                            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                <h2 className="mb-1 text-lg font-semibold">
                                    ループ再生
                                </h2>
                                <p className="mb-4 text-sm text-gray-500">
                                    YouTube動画のURLと再生区間を指定してください
                                </p>

                                <div className="space-y-4">
                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-gray-700">
                                            YouTube URL
                                        </label>
                                        <input
                                            type="url"
                                            value={url}
                                            onChange={(e) =>
                                                setUrl(e.target.value)
                                            }
                                            placeholder="https://www.youtube.com/watch?v=..."
                                            className="w-full rounded-md border border-gray-300 px-3 py-2 font-mono text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                                開始時間（秒）
                                            </label>
                                            <input
                                                type="number"
                                                min="0"
                                                step="0.1"
                                                value={startTime}
                                                onChange={(e) =>
                                                    setStartTime(e.target.value)
                                                }
                                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                            />
                                        </div>
                                        <div>
                                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                                終了時間（秒）
                                            </label>
                                            <input
                                                type="number"
                                                min="0"
                                                step="0.1"
                                                value={endTime}
                                                onChange={(e) =>
                                                    setEndTime(e.target.value)
                                                }
                                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                            />
                                        </div>
                                    </div>

                                    {error && (
                                        <p className="text-sm text-red-500">
                                            {error}
                                        </p>
                                    )}

                                    <div className="flex gap-3">
                                        <button
                                            onClick={handleStartLoop}
                                            className="flex-1 rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700"
                                        >
                                            ▶ ループ再生開始
                                        </button>
                                        <button
                                            disabled={!currentVideoId}
                                            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-40"
                                        >
                                            💾 保存
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {currentVideoId && (
                                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                    <YouTubePlayer
                                        videoId={currentVideoId}
                                        startTime={currentStart}
                                        endTime={currentEnd}
                                    />
                                </div>
                            )}

                            {/* 999px以下: ループ一覧をプレイヤー下に表示 */}
                            <div className="sidebar:hidden">
                                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                    <div className="mb-4 flex items-center justify-between">
                                        <h2 className="text-lg font-semibold">
                                            保存済みループ
                                        </h2>
                                        {!isPro && (
                                            <span className="text-xs text-gray-400">
                                                {activeLoops.length} /{' '}
                                                {FREE_PLAN_LIMIT}
                                            </span>
                                        )}
                                    </div>
                                    <LoopList />
                                </div>
                            </div>
                        </div>

                        {/* 1000px以上: 右サイドバー */}
                        <div className="hidden sidebar:block">
                            <div className="sticky top-20 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                                <div className="mb-4 flex items-center justify-between">
                                    <h2 className="font-semibold">
                                        保存済みループ
                                    </h2>
                                    {!isPro && (
                                        <span className="text-xs text-gray-400">
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
            </div>
        </>
    );
}
