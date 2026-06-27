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
    const [processing, setProcessing] = useState<string | null>(null);
    const [billing, setBilling] = useState<'annual' | 'monthly'>('annual');

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

    // 表示する価格（トグル状態に応じて切り替え）
    const proPrice = billing === 'annual' ? '¥3,980' : '¥490';
    const proPriceSuffix = billing === 'annual' ? ' / 年' : ' / 月';
    const proCtaLabel = billing === 'annual' ? 'Pro 年払いで始める' : 'Pro 月払いで始める';
    const proUpgradeTarget: 'monthly' | 'annual' = billing === 'annual' ? 'annual' : 'monthly';

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
                        <p className="mb-6 text-center text-sm text-gray-500 dark:text-gray-400">
                            {t('plan.desc')}
                        </p>

                        {/* ── 月払い / 年払い トグル ── */}
                        <div className="mb-8 flex items-center justify-center gap-3">
                            <span className={`text-sm font-medium transition-colors ${billing === 'monthly' ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-500'}`}>
                                月払い
                            </span>
                            <button
                                onClick={() => setBilling(billing === 'annual' ? 'monthly' : 'annual')}
                                className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
                                    billing === 'annual'
                                        ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                                        : 'bg-gray-300 dark:bg-gray-600'
                                }`}
                                aria-label="支払い周期を切り替え"
                            >
                                <span
                                    className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform ${
                                        billing === 'annual' ? 'translate-x-8' : 'translate-x-1'
                                    }`}
                                />
                            </button>
                            <span className={`text-sm font-medium transition-colors ${billing === 'annual' ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-500'}`}>
                                年払い
                            </span>
                            {billing === 'annual' && (
                                <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-bold text-green-700 dark:bg-green-900/40 dark:text-green-400">
                                    ¥1,900/年お得
                                </span>
                            )}
                        </div>

                        <div className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-3">

                            {/* ── Free（脱強調） ── */}
                            <div className={`rounded-2xl border bg-white p-4 dark:bg-gray-800 ${
                                isFree
                                    ? 'border-gray-300 shadow-sm dark:border-gray-600'
                                    : 'border-gray-100 opacity-60 dark:border-gray-700/50'
                            }`}>
                                <div className="mb-2 flex items-center justify-between">
                                    <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">Free</h2>
                                    {isFree && (
                                        <span className="rounded-full bg-gray-200 px-2 py-0.5 text-xs font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                                            {t('plan.current')}
                                        </span>
                                    )}
                                </div>
                                <p className="mb-3 text-lg font-bold text-gray-500 dark:text-gray-400">
                                    ¥0
                                    <span className="text-xs font-normal text-gray-400"> / 月</span>
                                </p>
                                {isFree && (
                                    <p className="mb-3 text-xs text-gray-500 dark:text-gray-400">
                                        {t('plan.loopCount', { count: loopCount })} / {FREE_PLAN_LIMIT}
                                    </p>
                                )}
                                <ul className="space-y-1.5">
                                    {freeFeatures.map((f) => (
                                        <li key={f} className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
                                            <Check className="h-3 w-3 flex-shrink-0 text-gray-300 dark:text-gray-600" />
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* ── Pro（視覚的主役） ── */}
                            <div className={`flex flex-col rounded-2xl border bg-white p-5 shadow-md dark:bg-gray-800 ${
                                isMonthly || isAnnual
                                    ? 'border-purple-500 ring-2 ring-purple-500'
                                    : 'border-purple-200 dark:border-purple-900'
                            }`}>
                                <div className="mb-4 flex items-center justify-between">
                                    <div className="flex items-center gap-1.5">
                                        <Zap className="h-4 w-4 text-purple-500" />
                                        <h2 className="font-semibold dark:text-white">Pro</h2>
                                    </div>
                                    {(isMonthly || isAnnual) ? (
                                        <span className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-2.5 py-0.5 text-xs font-medium text-white">
                                            {t('plan.current')} · {isAnnual ? '年払い' : '月払い'}
                                        </span>
                                    ) : (
                                        <span className="rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-700 dark:bg-purple-900/40 dark:text-purple-300">
                                            おすすめ
                                        </span>
                                    )}
                                </div>

                                {/* 価格表示（トグル連動） */}
                                <div className="mb-1">
                                    <p className="text-2xl font-bold dark:text-white">
                                        {proPrice}
                                        <span className="text-sm font-normal text-gray-400">{proPriceSuffix}</span>
                                    </p>
                                    {billing === 'annual' && (
                                        <p className="text-xs text-gray-400">{t('plan.annualEquiv')}</p>
                                    )}
                                </div>

                                <ul className="mb-5 space-y-1.5">
                                    {proFeatures.map((f) => (
                                        <li key={f} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                                            <Check className="h-3.5 w-3.5 flex-shrink-0 text-purple-500" />
                                            {f}
                                        </li>
                                    ))}
                                </ul>

                                {/* CTA エリア */}
                                <div className="mt-auto">
                                {isCancelled ? (
                                    <div>
                                        <p className="mb-2 text-center text-xs text-gray-500 dark:text-gray-400">
                                            {t('plan.cancelledUntil', { date: endsAt })}
                                        </p>
                                        <button
                                            onClick={handleResume}
                                            className="w-full rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
                                        >
                                            {t('plan.resumeSubscription')}
                                        </button>
                                    </div>
                                ) : (isMonthly || isAnnual) ? (
                                    <div>
                                        <p className="text-center text-xs text-gray-500 dark:text-gray-400">
                                            {nextBillingDate && t('plan.nextBillingDate', { date: nextBillingDate })}
                                        </p>
                                        {/* 月払いユーザーに年払い切り替えを促す */}
                                        {isMonthly && billing === 'annual' && (
                                            <button
                                                onClick={() => handleUpgrade('annual')}
                                                disabled={processing !== null}
                                                className="mt-3 w-full rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-60"
                                            >
                                                {processing === 'annual' ? t('common.loading') : t('plan.upgradeAnnual')}
                                            </button>
                                        )}
                                        {/* キャンセルリンク */}
                                        <button
                                            onClick={handleCancel}
                                            className="mt-3 w-full text-center text-xs text-gray-400 underline-offset-2 hover:text-red-400 hover:underline dark:text-gray-600"
                                        >
                                            {t('plan.cancelSubscription')}
                                        </button>
                                    </div>
                                ) : isFree ? (
                                    <div>
                                        <button
                                            onClick={() => handleUpgrade(proUpgradeTarget)}
                                            disabled={processing !== null}
                                            className="w-full rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
                                        >
                                            {processing === proUpgradeTarget ? t('common.loading') : proCtaLabel}
                                        </button>
                                        <p className="mt-1.5 text-center text-xs text-gray-400">
                                            {billing === 'annual' ? 'いつでもキャンセル可 · 年間一括請求' : 'いつでもキャンセル可 · 自動更新'}
                                        </p>
                                    </div>
                                ) : isLifetime ? (
                                    <p className="text-center text-xs text-gray-400">Lifetimeプランに含まれています</p>
                                ) : null}
                                </div>
                            </div>

                            {/* ── Lifetime（視覚的主役） ── */}
                            <div className={`flex flex-col rounded-2xl border bg-white p-5 shadow-md dark:bg-gray-800 ${
                                isLifetime
                                    ? 'border-amber-400 ring-2 ring-amber-400'
                                    : 'border-amber-200 dark:border-amber-900/50'
                            }`}>
                                <div className="mb-4 flex items-center justify-between">
                                    <div className="flex items-center gap-1.5">
                                        <Crown className="h-4 w-4 text-amber-500" />
                                        <h2 className="font-semibold dark:text-white">{t('plan.lifetime')}</h2>
                                    </div>
                                    {isLifetime && (
                                        <span className="rounded-full bg-gradient-to-r from-amber-400 to-orange-400 px-2.5 py-0.5 text-xs font-medium text-white">
                                            {t('plan.current')}
                                        </span>
                                    )}
                                </div>

                                <div className="mb-1">
                                    <p className="text-2xl font-bold dark:text-white">
                                        ¥5,980
                                        <span className="text-sm font-normal text-gray-400"> 一括払い</span>
                                    </p>
                                    <p className="text-xs text-gray-400">月¥249相当</p>
                                </div>

                                {!isLifetime && (
                                    <div className="mb-4 mt-3 rounded-lg bg-amber-50 px-3 py-2 dark:bg-amber-900/20">
                                        <p className="text-xs font-medium text-amber-700 dark:text-amber-400">
                                            年払いより¥2,000多いだけで、ずっと使える
                                        </p>
                                    </div>
                                )}

                                <ul className="mb-5 space-y-1.5">
                                    {proFeatures.map((f) => (
                                        <li key={f} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                                            <Check className="h-3.5 w-3.5 flex-shrink-0 text-amber-500" />
                                            {f}
                                        </li>
                                    ))}
                                    <li className="flex items-center gap-2 text-sm font-medium text-amber-600 dark:text-amber-400">
                                        <Infinity className="h-3.5 w-3.5 flex-shrink-0" />
                                        永久アクセス · 更新費用なし
                                    </li>
                                </ul>

                                <div className="mt-auto">
                                {isLifetime ? (
                                    <p className="w-full py-2 text-center text-sm font-medium text-amber-600 dark:text-amber-400">
                                        ✓ {t('plan.lifetimeMember')}
                                    </p>
                                ) : (
                                    <div>
                                        <button
                                            onClick={() => handleUpgrade('lifetime')}
                                            disabled={processing !== null}
                                            className="w-full rounded-lg bg-gradient-to-r from-amber-400 to-orange-500 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
                                        >
                                            {processing === 'lifetime' ? t('common.loading') : t('plan.lifetimePurchase')}
                                        </button>
                                        <p className="mt-1.5 text-center text-xs text-gray-400">一度きりの支払い · 返金ポリシーあり</p>
                                    </div>
                                )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <AppFooter />
            </div>
        </>
    );
}
