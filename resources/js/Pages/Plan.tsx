import AppFooter from '@/Components/AppFooter';
import AppHeader from '@/Components/AppHeader';
import { PageProps } from '@/types';
import { Head, router } from '@inertiajs/react';
import { Check, Crown, Infinity, Zap } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const FREE_PLAN_LIMIT = 3;

type Props = PageProps<{
    isPro: boolean;
    isLifetime: boolean;
    planType: 'free' | 'monthly' | 'annual' | 'lifetime';
    loopCount: number;
    isCancelled: boolean;
    endsAt: string | null;
    nextBillingDate: string | null;
}>;

export default function Plan({
    auth,
    isPro,
    isLifetime,
    planType,
    loopCount,
    isCancelled,
    endsAt,
    nextBillingDate,
}: Props) {
    const { t } = useTranslation();
    const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');
    const [processing, setProcessing] = useState<string | null>(null);

    const handleUpgrade = (plan: 'monthly' | 'annual' | 'lifetime') => {
        setProcessing(plan);
        router.post(
            route('subscription.checkout'),
            { plan },
            { onError: () => setProcessing(null) },
        );
    };

    const handleCancel = () => {
        if (confirm(t('plan.cancelConfirm'))) {
            router.post(route('subscription.cancel'));
        }
    };

    const handleResume = () => {
        router.post(route('subscription.resume'));
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
        t('plan.features.noAds'),
    ];

    const isFree = planType === 'free';
    const isMonthly = planType === 'monthly';
    const isAnnual = planType === 'annual';

    return (
        <>
            <Head title={t('plan.title')} />
            <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
                <AppHeader userName={auth.user.name} isPro={isPro} />

                <div className="container mx-auto px-4 py-8">
                    <div className="mx-auto max-w-4xl">
                        <h1 className="mb-2 text-center text-2xl font-bold tracking-tight dark:text-white">
                            {t('plan.heading')}
                        </h1>
                        <p className="mb-6 text-center text-sm text-gray-600 dark:text-gray-400">
                            {t('plan.desc')}
                        </p>

                        {/* Billing toggle (only for non-pro or monthly users) */}
                        {(isFree || isMonthly) && !isLifetime && (
                            <div className="mb-8 flex justify-center">
                                <div className="flex rounded-full border border-gray-200 bg-white p-1 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                                    <button
                                        onClick={() => setBilling('monthly')}
                                        className={`rounded-full px-5 py-1.5 text-sm font-medium transition-all ${
                                            billing === 'monthly'
                                                ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
                                                : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'
                                        }`}
                                    >
                                        {t('plan.billingMonthly')}
                                    </button>
                                    <button
                                        onClick={() => setBilling('annual')}
                                        className={`flex items-center gap-1.5 rounded-full px-5 py-1.5 text-sm font-medium transition-all ${
                                            billing === 'annual'
                                                ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
                                                : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'
                                        }`}
                                    >
                                        {t('plan.billingAnnual')}
                                        <span className="rounded-full bg-green-500 px-1.5 py-0.5 text-xs font-bold text-white">
                                            {t('plan.annualSave')}
                                        </span>
                                    </button>
                                </div>
                            </div>
                        )}

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                            {/* Free Plan */}
                            <div
                                className={`rounded-2xl border bg-white p-6 shadow-md dark:bg-gray-800 ${
                                    isFree
                                        ? 'border-gray-900 ring-2 ring-gray-900 dark:border-gray-400 dark:ring-gray-400'
                                        : 'border-gray-200/70 dark:border-gray-700/70'
                                }`}
                            >
                                <div className="mb-4 flex items-center justify-between">
                                    <h2 className="text-lg font-semibold dark:text-white">Free</h2>
                                    {isFree && (
                                        <span className="rounded-full bg-gray-900 px-2.5 py-0.5 text-xs font-medium text-white dark:bg-gray-200 dark:text-gray-900">
                                            {t('plan.current')}
                                        </span>
                                    )}
                                </div>
                                <p className="mb-1 text-2xl font-bold dark:text-white">
                                    ¥0
                                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400"> / 月</span>
                                </p>
                                <p className="mb-4 text-xs text-gray-500 dark:text-gray-400">&nbsp;</p>
                                {isFree && (
                                    <p className="mb-4 text-xs text-gray-600 dark:text-gray-400">
                                        {t('plan.loopCount', { count: loopCount })} / {FREE_PLAN_LIMIT}
                                    </p>
                                )}
                                <ul className="space-y-2">
                                    {freeFeatures.map((f) => (
                                        <li key={f} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                                            <Check className="h-4 w-4 flex-shrink-0 text-gray-500 dark:text-gray-500" />
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Pro Plan */}
                            <div
                                className={`relative rounded-2xl border bg-white p-6 shadow-md dark:bg-gray-800 ${
                                    isMonthly || isAnnual
                                        ? 'border-purple-500 ring-2 ring-purple-500'
                                        : 'border-gray-200/70 dark:border-gray-700/70'
                                }`}
                            >
                                <div className="mb-4 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Zap className="h-4 w-4 text-purple-500" />
                                        <h2 className="text-lg font-semibold dark:text-white">Pro</h2>
                                    </div>
                                    {(isMonthly || isAnnual) && (
                                        <span className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-2.5 py-0.5 text-xs font-medium text-white">
                                            {t('plan.current')}
                                        </span>
                                    )}
                                </div>

                                {isAnnual ? (
                                    <>
                                        <p className="mb-1 text-2xl font-bold dark:text-white">
                                            ¥3,980
                                            <span className="text-sm font-normal text-gray-500 dark:text-gray-400"> / 年</span>
                                        </p>
                                        <p className="mb-4 text-xs text-gray-500 dark:text-gray-400">
                                            {t('plan.annualEquiv')}
                                        </p>
                                    </>
                                ) : (
                                    <>
                                        <p className="mb-1 text-2xl font-bold dark:text-white">
                                            {billing === 'annual' ? '¥3,980' : '¥490'}
                                            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                                {' '}/ {billing === 'annual' ? '年' : '月'}
                                            </span>
                                        </p>
                                        <p className="mb-4 text-xs text-gray-500 dark:text-gray-400">
                                            {billing === 'annual' ? t('plan.annualEquiv') : ' '}
                                        </p>
                                    </>
                                )}

                                <ul className="mb-6 space-y-2">
                                    {proFeatures.map((f) => (
                                        <li key={f} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                                            <Check className="h-4 w-4 flex-shrink-0 text-purple-500" />
                                            {f}
                                        </li>
                                    ))}
                                </ul>

                                {isFree ? (
                                    <button
                                        onClick={() => handleUpgrade(billing)}
                                        disabled={processing !== null}
                                        className="w-full rounded-md bg-gradient-to-r from-purple-500 to-pink-500 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        {processing === billing ? t('common.loading') : t('plan.upgrade')}
                                    </button>
                                ) : isMonthly || isAnnual ? (
                                    isCancelled ? (
                                        <div className="space-y-2">
                                            <p className="w-full py-1 text-center text-xs text-gray-600 dark:text-gray-500">
                                                {t('plan.cancelledUntil', { date: endsAt })}
                                            </p>
                                            <button
                                                onClick={handleResume}
                                                className="w-full rounded-md bg-gradient-to-r from-purple-500 to-pink-500 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
                                            >
                                                {t('plan.resumeSubscription')}
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <button
                                                onClick={handleCancel}
                                                className="w-full rounded-md border border-gray-300 py-2 text-sm font-medium text-gray-600 transition-colors hover:border-red-400 hover:text-red-500 dark:border-gray-600 dark:text-gray-400"
                                            >
                                                {t('plan.cancelSubscription')}
                                            </button>
                                            {nextBillingDate && (
                                                <p className="mt-2 text-center text-xs text-gray-500 dark:text-gray-500">
                                                    {t('plan.nextBillingDate', { date: nextBillingDate })}
                                                </p>
                                            )}
                                            {isMonthly && (
                                                <button
                                                    onClick={() => handleUpgrade('annual')}
                                                    disabled={processing !== null}
                                                    className="mt-2 w-full rounded-md border border-purple-300 py-2 text-sm font-medium text-purple-600 transition-colors hover:bg-purple-50 disabled:opacity-60 dark:border-purple-700 dark:text-purple-400"
                                                >
                                                    {t('plan.upgradeAnnual')}
                                                </button>
                                            )}
                                        </>
                                    )
                                ) : isLifetime ? (
                                    <p className="w-full py-2 text-center text-sm text-gray-400 dark:text-gray-500">
                                        {t('plan.lifetimeMember')}
                                    </p>
                                ) : null}
                            </div>

                            {/* Lifetime Plan */}
                            <div
                                className={`rounded-2xl border bg-white p-6 shadow-md dark:bg-gray-800 ${
                                    isLifetime
                                        ? 'border-amber-400 ring-2 ring-amber-400'
                                        : 'border-gray-200/70 dark:border-gray-700/70'
                                }`}
                            >
                                <div className="mb-4 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Crown className="h-4 w-4 text-amber-500" />
                                        <h2 className="text-lg font-semibold dark:text-white">{t('plan.lifetime')}</h2>
                                    </div>
                                    {isLifetime && (
                                        <span className="rounded-full bg-gradient-to-r from-amber-400 to-orange-400 px-2.5 py-0.5 text-xs font-medium text-white">
                                            {t('plan.current')}
                                        </span>
                                    )}
                                </div>
                                <p className="mb-1 text-2xl font-bold dark:text-white">
                                    ¥5,980
                                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400"> 一括</span>
                                </p>
                                <p className="mb-4 text-xs text-gray-500 dark:text-gray-400">
                                    {t('plan.lifetimeTagline')}
                                </p>
                                <ul className="mb-6 space-y-2">
                                    {proFeatures.map((f) => (
                                        <li key={f} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                                            <Check className="h-4 w-4 flex-shrink-0 text-amber-500" />
                                            {f}
                                        </li>
                                    ))}
                                    <li className="flex items-center gap-2 text-sm font-medium text-amber-600 dark:text-amber-400">
                                        <Infinity className="h-4 w-4 flex-shrink-0" />
                                        永久アクセス・更新費用なし
                                    </li>
                                </ul>
                                {isLifetime ? (
                                    <p className="w-full py-2 text-center text-sm font-medium text-amber-600 dark:text-amber-400">
                                        ✓ {t('plan.lifetimeMember')}
                                    </p>
                                ) : (
                                    <button
                                        onClick={() => handleUpgrade('lifetime')}
                                        disabled={processing !== null}
                                        className="w-full rounded-md bg-gradient-to-r from-amber-400 to-orange-500 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                        {processing === 'lifetime' ? t('common.loading') : t('plan.lifetimePurchase')}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <AppFooter />
            </div>
        </>
    );
}
