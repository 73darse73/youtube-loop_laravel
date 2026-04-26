import AppHeader from '@/Components/AppHeader';
import { PageProps } from '@/types';
import { Head, router } from '@inertiajs/react';
import { Check } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const FREE_PLAN_LIMIT = 3;

type Props = PageProps<{
    isPro: boolean;
    loopCount: number;
}>;

export default function Plan({ auth, isPro, loopCount }: Props) {
    const { t } = useTranslation();
    const [processing, setProcessing] = useState(false);

    const handleUpgrade = () => {
        setProcessing(true);
        router.post(route('subscription.checkout'), {}, {
            onError: () => setProcessing(false),
        });
    };

    const freeFeatures = [
        t('plan.features.loopPlay'),
        t('plan.features.saveFree'),
        t('plan.features.favorite'),
        t('plan.features.trash'),
    ];

    const proFeatures = [
        t('plan.features.loopPlay'),
        t('plan.features.savePro'),
        t('plan.features.favorite'),
        t('plan.features.trash'),
    ];

    return (
        <>
            <Head title={t('plan.title')} />
            <div className="min-h-screen bg-gray-50">
                <AppHeader userName={auth.user.name} isPro={isPro} />

                <div className="container mx-auto px-4 py-8">
                    <div className="mx-auto max-w-2xl">
                        <h1 className="mb-2 text-xl font-semibold">
                            {t('plan.heading')}
                        </h1>
                        <p className="mb-8 text-sm text-gray-500">
                            {t('plan.current')}:{' '}
                            <span className="font-medium text-gray-800">
                                {isPro ? 'Pro' : 'Free'}
                            </span>
                        </p>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div
                                className={`rounded-xl border bg-white p-6 shadow-sm ${!isPro ? 'border-gray-900 ring-2 ring-gray-900' : 'border-gray-200'}`}
                            >
                                <div className="mb-4 flex items-center justify-between">
                                    <h2 className="text-lg font-semibold">
                                        Free
                                    </h2>
                                    {!isPro && (
                                        <span className="rounded-full bg-gray-900 px-2.5 py-0.5 text-xs font-medium text-white">
                                            {t('plan.current')}
                                        </span>
                                    )}
                                </div>
                                <p className="mb-4 text-2xl font-bold">
                                    ¥0
                                    <span className="text-sm font-normal text-gray-500">
                                        {' '}
                                        / 月
                                    </span>
                                </p>
                                {!isPro && (
                                    <p className="mb-4 text-xs text-gray-500">
                                        {t('plan.loopCount', {
                                            count: loopCount,
                                        })}{' '}
                                        / {FREE_PLAN_LIMIT}
                                    </p>
                                )}
                                <ul className="space-y-2">
                                    {freeFeatures.map((f) => (
                                        <li
                                            key={f}
                                            className="flex items-center gap-2 text-sm text-gray-600"
                                        >
                                            <Check className="h-4 w-4 flex-shrink-0 text-gray-400" />
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div
                                className={`rounded-xl border bg-white p-6 shadow-sm ${isPro ? 'border-purple-500 ring-2 ring-purple-500' : 'border-gray-200'}`}
                            >
                                <div className="mb-4 flex items-center justify-between">
                                    <h2 className="text-lg font-semibold">
                                        Pro
                                    </h2>
                                    {isPro && (
                                        <span className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-2.5 py-0.5 text-xs font-medium text-white">
                                            {t('plan.current')}
                                        </span>
                                    )}
                                </div>
                                <p className="mb-4 text-2xl font-bold">
                                    ¥300
                                    <span className="text-sm font-normal text-gray-500">
                                        {' '}
                                        / 月
                                    </span>
                                </p>
                                <ul className="mb-6 space-y-2">
                                    {proFeatures.map((f) => (
                                        <li
                                            key={f}
                                            className="flex items-center gap-2 text-sm text-gray-600"
                                        >
                                            <Check className="h-4 w-4 flex-shrink-0 text-purple-500" />
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                                {!isPro && (
                                    <button
                                        onClick={handleUpgrade}
                                        disabled={processing}
                                        className="w-full rounded-md bg-gradient-to-r from-purple-500 to-pink-500 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        {processing
                                            ? t('common.loading')
                                            : t('plan.upgrade')}
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
