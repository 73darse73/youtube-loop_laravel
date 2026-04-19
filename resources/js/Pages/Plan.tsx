import AppHeader from '@/Components/AppHeader';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import { Check } from 'lucide-react';

const FREE_PLAN_LIMIT = 3;

type Props = PageProps<{
    isPro: boolean;
    loopCount: number;
}>;

const FREE_FEATURES = [
    `ループ設定 最大${FREE_PLAN_LIMIT}件`,
    'お気に入り登録',
    'ゴミ箱（復元・完全削除）',
];

const PRO_FEATURES = [
    'ループ設定 無制限',
    'お気に入り登録',
    'ゴミ箱（復元・完全削除）',
];

export default function Plan({ auth, isPro, loopCount }: Props) {
    return (
        <>
            <Head title="プラン" />
            <div className="min-h-screen bg-gray-50">
                <AppHeader userName={auth.user.name} isPro={isPro} />

                <div className="container mx-auto px-4 py-8">
                    <div className="mx-auto max-w-2xl">
                        <h1 className="mb-2 text-xl font-semibold">プラン</h1>
                        <p className="mb-8 text-sm text-gray-500">
                            現在のプラン:{' '}
                            <span className="font-medium text-gray-800">
                                {isPro ? 'Pro' : 'Free'}
                            </span>
                        </p>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            {/* Free プラン */}
                            <div className={`rounded-xl border bg-white p-6 shadow-sm ${!isPro ? 'border-gray-900 ring-2 ring-gray-900' : 'border-gray-200'}`}>
                                <div className="mb-4 flex items-center justify-between">
                                    <h2 className="text-lg font-semibold">Free</h2>
                                    {!isPro && (
                                        <span className="rounded-full bg-gray-900 px-2.5 py-0.5 text-xs font-medium text-white">
                                            現在のプラン
                                        </span>
                                    )}
                                </div>
                                <p className="mb-4 text-2xl font-bold">
                                    ¥0
                                    <span className="text-sm font-normal text-gray-500"> / 月</span>
                                </p>
                                {!isPro && (
                                    <p className="mb-4 text-xs text-gray-500">
                                        ループ設定: {loopCount} / {FREE_PLAN_LIMIT} 件使用中
                                    </p>
                                )}
                                <ul className="space-y-2">
                                    {FREE_FEATURES.map((f) => (
                                        <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                                            <Check className="h-4 w-4 flex-shrink-0 text-gray-400" />
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Pro プラン */}
                            <div className={`rounded-xl border bg-white p-6 shadow-sm ${isPro ? 'border-purple-500 ring-2 ring-purple-500' : 'border-gray-200'}`}>
                                <div className="mb-4 flex items-center justify-between">
                                    <h2 className="text-lg font-semibold">Pro</h2>
                                    {isPro ? (
                                        <span className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-2.5 py-0.5 text-xs font-medium text-white">
                                            現在のプラン
                                        </span>
                                    ) : null}
                                </div>
                                <p className="mb-4 text-2xl font-bold">
                                    ¥980
                                    <span className="text-sm font-normal text-gray-500"> / 月</span>
                                </p>
                                <ul className="mb-6 space-y-2">
                                    {PRO_FEATURES.map((f) => (
                                        <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                                            <Check className="h-4 w-4 flex-shrink-0 text-purple-500" />
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                                {!isPro && (
                                    <button
                                        disabled
                                        className="w-full rounded-md bg-gradient-to-r from-purple-500 to-pink-500 py-2 text-sm font-medium text-white opacity-60 cursor-not-allowed"
                                    >
                                        近日公開予定
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
