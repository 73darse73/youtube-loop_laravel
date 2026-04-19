import AppHeader from '@/Components/AppHeader';
import { LoopSetting, PageProps } from '@/types';
import { Head, router } from '@inertiajs/react';
import { RotateCcw, Trash2 } from 'lucide-react';

type Props = PageProps<{
    loopSettings: LoopSetting[];
    isPro: boolean;
}>;

function thumbnailUrl(videoId: string): string {
    return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
}

export default function Trash({ auth, loopSettings, isPro }: Props) {
    const handleRestore = (loop: LoopSetting) => {
        router.post(route('trash.restore', loop.id));
    };

    const handleForceDelete = (loop: LoopSetting) => {
        if (!window.confirm('完全に削除します。この操作は取り消せません。')) return;
        router.delete(route('trash.destroy', loop.id));
    };

    return (
        <>
            <Head title="ゴミ箱" />
            <div className="min-h-screen bg-gray-50">
                <AppHeader userName={auth.user.name} isPro={isPro} />

                <div className="container mx-auto px-4 py-8">
                    <div className="mx-auto max-w-2xl">
                        <h1 className="mb-6 text-xl font-semibold">ゴミ箱</h1>

                        {loopSettings.length === 0 ? (
                            <div className="rounded-xl border border-gray-200 bg-white py-16 text-center shadow-sm">
                                <p className="text-sm text-gray-400">
                                    ゴミ箱は空です
                                </p>
                            </div>
                        ) : (
                            <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
                                <ul className="divide-y divide-gray-100">
                                    {loopSettings.map((loop) => (
                                        <li
                                            key={loop.id}
                                            className="flex items-center gap-4 p-4"
                                        >
                                            <img
                                                src={thumbnailUrl(loop.video_id)}
                                                alt={loop.title ?? ''}
                                                className="h-16 w-28 flex-shrink-0 rounded object-cover"
                                            />
                                            <div className="min-w-0 flex-1">
                                                <p className="line-clamp-2 text-sm font-medium leading-snug">
                                                    {loop.title ?? '（タイトルなし）'}
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
                                            <div className="flex flex-shrink-0 items-center gap-2">
                                                <button
                                                    onClick={() => handleRestore(loop)}
                                                    className="flex flex-col items-center gap-0.5 rounded p-1.5 text-xs text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
                                                    aria-label="復元"
                                                >
                                                    <RotateCcw className="h-4 w-4" />
                                                    <span>復元</span>
                                                </button>
                                                <button
                                                    onClick={() => handleForceDelete(loop)}
                                                    className="flex flex-col items-center gap-0.5 rounded p-1.5 text-xs text-red-400 transition-colors hover:bg-red-50 hover:text-red-600"
                                                    aria-label="完全削除"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                    <span>完全削除</span>
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
