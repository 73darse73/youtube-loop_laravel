import LanguageSwitcher from '@/Components/LanguageSwitcher';
import YouTubePlayer from '@/Components/YouTubePlayer';
import { useTheme } from '@/hooks/useTheme';
import { Head, Link } from '@inertiajs/react';
import { Check, Menu, Repeat, X } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const DEFAULT_VIDEO_URL = 'https://www.youtube.com/watch?v=MPawo9gpv3Q';
const DEFAULT_START = 0;
const DEFAULT_END = 8;

function extractVideoId(url: string): string | null {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
    return match ? match[1] : null;
}

function TryItSection() {
    const { t } = useTranslation();
    const [url, setUrl] = useState(DEFAULT_VIDEO_URL);
    const [startTime, setStartTime] = useState(String(DEFAULT_START));
    const [endTime, setEndTime] = useState(String(DEFAULT_END));
    const [currentVideoId, setCurrentVideoId] = useState<string | null>(extractVideoId(DEFAULT_VIDEO_URL));
    const [currentStart, setCurrentStart] = useState(DEFAULT_START);
    const [currentEnd, setCurrentEnd] = useState(DEFAULT_END);
    const [error, setError] = useState('');

    const handleStartLoop = () => {
        const videoId = extractVideoId(url);
        if (!videoId) { setError(t('home.invalidUrl')); return; }
        const start = parseFloat(startTime);
        const end = parseFloat(endTime);
        if (isNaN(start) || isNaN(end) || start >= end) { setError(t('home.invalidTime')); return; }
        setError('');
        setCurrentVideoId(videoId);
        setCurrentStart(start);
        setCurrentEnd(end);
    };

    const handleRangeChange = (start: number, end: number) => {
        setCurrentStart(start);
        setCurrentEnd(end);
        setStartTime(String(Math.floor(start)));
        setEndTime(String(Math.floor(end)));
    };

    return (
        <section className="border-y border-gray-200 bg-gray-50 py-12 sm:py-20">
            <div className="mx-auto max-w-3xl px-6">
                <div className="mb-10 text-center">
                    <h2 className="mb-3 text-2xl font-bold text-gray-900 sm:text-3xl">{t('landing.tryItTitle')}</h2>
                    <p className="text-gray-800">{t('landing.tryItDesc')}</p>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm space-y-4">
                    <div>
                        <label className="mb-1.5 block text-sm text-gray-700">{t('home.youtubeUrl')}</label>
                        <input
                            type="url"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            placeholder={t('home.urlPlaceholder')}
                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                        />
                    </div>

                    <YouTubePlayer
                        videoId={currentVideoId ?? extractVideoId(DEFAULT_VIDEO_URL)!}
                        startTime={currentStart}
                        endTime={currentEnd}
                        autoPlay={false}
                        onRangeChange={handleRangeChange}
                        onSave={() => window.location.href = route('register')}
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="mb-1.5 block text-sm text-gray-700">{t('home.startTime')}</label>
                            <input
                                type="number"
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                                min="0"
                                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                            />
                        </div>
                        <div>
                            <label className="mb-1.5 block text-sm text-gray-700">{t('home.endTime')}</label>
                            <input
                                type="number"
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                                min="0"
                                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                            />
                        </div>
                    </div>

                    {error && <p className="text-sm text-red-500">{error}</p>}

                    <button
                        onClick={handleStartLoop}
                        className="w-full rounded-xl bg-gradient-to-r from-red-500 to-purple-600 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                    >
                        ▶ {t('home.startLoop')}
                    </button>

                    <div className="rounded-xl border border-purple-200 bg-purple-50 p-4 text-center">
                        <p className="mb-2 text-sm text-gray-800">{t('landing.tryItSavePrompt')}</p>
                        <Link
                            href={route('register')}
                            className="inline-block rounded-lg bg-gradient-to-r from-red-500 to-purple-600 px-6 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                        >
                            {t('landing.tryItSaveButton')}
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

function AppScreenshot() {
    return (
        <div className="relative w-full max-w-lg mx-auto">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-red-500/10 to-purple-600/10 blur-2xl" />
            <div className="relative overflow-hidden rounded-2xl border border-gray-200 shadow-2xl">
                <img src="/images/screenshot-player.png" alt="Loop Video アプリ画面" className="w-full" />
            </div>
        </div>
    );
}

function UsecaseCard({ emoji, keyword, title, desc }: { emoji: string; keyword: string; title: string; desc: string }) {
    const parts = desc.split(keyword);
    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 flex flex-col gap-3 shadow-sm">
            <span className="text-3xl">{emoji}</span>
            <h3 className="text-base font-bold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-800 leading-relaxed">
                {parts.map((part, i) => (
                    <span key={i}>
                        {part}
                        {i < parts.length - 1 && <strong className="font-bold bg-yellow-300 text-gray-900 rounded px-0.5">{keyword}</strong>}
                    </span>
                ))}
            </p>
        </div>
    );
}

export default function Landing() {
    const { t } = useTranslation();
    useTheme();
    const [menuOpen, setMenuOpen] = useState(false);

    const freeFeatures = (Array.isArray(t('landing.freeFeatures', { returnObjects: true })) ? t('landing.freeFeatures', { returnObjects: true }) : []) as string[];
    const proFeatures = (Array.isArray(t('landing.proFeatures', { returnObjects: true })) ? t('landing.proFeatures', { returnObjects: true }) : []) as string[];

    return (
        <>
            <Head title={t('landing.pageTitle')}>
                <link rel="canonical" href="https://loop-video.com/" />
            </Head>
            <div className="min-h-screen bg-white text-gray-900" style={{ background: 'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(147,51,234,0.07) 0%, transparent 60%), #ffffff' }}>

                {/* Header */}
                <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md">
                    <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
                        <div className="flex items-center gap-2.5">
                            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-purple-600">
                                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-white">
                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                </svg>
                            </div>
                            <span className="text-lg font-bold tracking-tight text-gray-900">Loop Video</span>
                        </div>

                        {/* Desktop nav */}
                        <div className="hidden items-center gap-3 md:flex">
                            <LanguageSwitcher forcedLight />
                            <Link href={route('login')} className="text-sm text-gray-800 transition-colors hover:text-gray-900">
                                {t('auth.login')}
                            </Link>
                            <Link href={route('register')} className="rounded-lg bg-gradient-to-r from-red-500 to-purple-600 px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90">
                                {t('landing.startFree')}
                            </Link>
                        </div>

                        {/* Mobile hamburger */}
                        <button onClick={() => setMenuOpen(!menuOpen)} className="rounded-md p-1.5 text-gray-800 transition-colors hover:bg-gray-100 md:hidden" aria-label="Toggle menu">
                            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </button>
                    </div>

                    {/* Mobile menu */}
                    {menuOpen && (
                        <div className="border-t border-gray-200 bg-white/95 px-6 py-4 md:hidden">
                            <div className="mb-4">
                                <LanguageSwitcher forcedLight />
                            </div>
                            <div className="flex flex-col gap-3">
                                <Link href={route('login')} onClick={() => setMenuOpen(false)} className="text-sm text-gray-800 transition-colors hover:text-gray-900">
                                    {t('auth.login')}
                                </Link>
                                <Link href={route('register')} onClick={() => setMenuOpen(false)} className="rounded-lg bg-gradient-to-r from-red-500 to-purple-600 px-4 py-2.5 text-center text-sm font-medium text-white transition-opacity hover:opacity-90">
                                    {t('landing.startFree')}
                                </Link>
                            </div>
                        </div>
                    )}
                </header>

                {/* Hero */}
                <section className="mx-auto max-w-5xl px-6 pt-12 pb-10 sm:pt-20 sm:pb-16">
                    <div className="grid items-center gap-12 lg:grid-cols-2">
                        <div>
                            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-4 py-1.5 text-sm text-purple-700">
                                <Repeat className="h-3.5 w-3.5" />
                                {t('landing.badge')}
                            </div>
                            <h1 className="mb-5 text-4xl font-bold leading-tight tracking-tight text-gray-900 sm:text-5xl">
                                {t('landing.heroTitle')}
                                <br />
                                <span className="bg-gradient-to-r from-red-500 to-purple-600 bg-clip-text text-transparent">
                                    {t('landing.heroHighlight')}
                                </span>
                            </h1>
                            <p className="mb-8 text-lg text-gray-800 leading-relaxed">
                                {t('landing.heroDescPre')}<br className="sm:hidden" />{t('landing.heroDescPost')}
                            </p>
                            <div className="flex flex-col gap-3 sm:flex-row">
                                <Link href={route('register')} className="rounded-xl bg-gradient-to-r from-red-500 to-purple-600 px-7 py-3.5 text-base font-semibold text-white text-center transition-opacity hover:opacity-90">
                                    {t('landing.startFree')}
                                </Link>
                                <Link href={route('login')} className="rounded-xl border border-gray-300 px-7 py-3.5 text-base font-medium text-gray-700 text-center transition-colors hover:border-gray-400 hover:text-gray-900">
                                    {t('auth.login')}
                                </Link>
                            </div>
                            <p className="mt-3 text-sm text-gray-700">
                                {t('landing.noCard')} ·{' '}
                                <Link href={route('home.index')} className="underline underline-offset-2 hover:text-gray-900">
                                    {t('landing.tryWithoutLogin')}
                                </Link>
                            </p>
                        </div>
                        <div className="flex justify-center lg:justify-end">
                            <AppScreenshot />
                        </div>
                    </div>
                </section>

                {/* Social proof bar */}
                <div className="border-y border-gray-200 bg-gray-50">
                    <div className="mx-auto max-w-5xl px-6 py-4">
                        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-800">
                            {(Array.isArray(t('landing.socialProof', { returnObjects: true })) ? t('landing.socialProof', { returnObjects: true }) as string[] : []).map((item) => (
                                <span key={item} className="whitespace-nowrap">{item}</span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Demo video */}
                <section className="mx-auto max-w-5xl px-6 py-12 sm:py-20">
                    <div className="mb-10 text-center">
                        <h2 className="mb-3 text-2xl font-bold text-gray-900 sm:text-3xl">{t('landing.demoTitle')}</h2>
                        <p className="text-gray-800">{t('landing.demoDescPre')}<br className="sm:hidden" />{t('landing.demoDescPost')}</p>
                    </div>
                    <div className="relative mx-auto max-w-3xl">
                        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-red-500/10 to-purple-600/10 blur-xl" />
                        <div className="relative overflow-hidden rounded-2xl border border-gray-200 shadow-2xl">
                            <video src="/images/demo.mp4" autoPlay muted playsInline controls className="w-full" />
                        </div>
                    </div>
                </section>

                {/* Use cases */}
                <section className="mx-auto max-w-5xl px-6 py-12 sm:py-20">
                    <div className="mb-12 text-center">
                        <h2 className="mb-3 text-2xl font-bold text-gray-900 sm:text-3xl">{t('landing.usecaseTitle')}</h2>
                        <p className="text-gray-800">{t('landing.usecaseSubtitlePre')}<br className="sm:hidden" />{t('landing.usecaseSubtitlePost')}</p>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <UsecaseCard emoji="📖" keyword={t('landing.usecase1Keyword')} title={t('landing.usecase1Title')} desc={t('landing.usecase1Desc')} />
                        <UsecaseCard emoji="🎸" keyword={t('landing.usecase2Keyword')} title={t('landing.usecase2Title')} desc={t('landing.usecase2Desc')} />
                        <UsecaseCard emoji="🎵" keyword={t('landing.usecase3Keyword')} title={t('landing.usecase3Title')} desc={t('landing.usecase3Desc')} />
                        <UsecaseCard emoji="💜" keyword={t('landing.usecase4Keyword')} title={t('landing.usecase4Title')} desc={t('landing.usecase4Desc')} />
                    </div>
                </section>

                {/* How it works */}
                <section className="border-y border-gray-200 bg-gray-50 py-12 sm:py-20">
                    <div className="mx-auto max-w-5xl px-6">
                        <div className="mb-12 text-center">
                            <h2 className="mb-3 text-2xl font-bold text-gray-900 sm:text-3xl">{t('landing.howTitle')}</h2>
                            <p className="text-gray-800">{t('landing.howSubtitlePre')}<br className="sm:hidden" />{t('landing.howSubtitlePost')}</p>
                        </div>
                        <div className="grid gap-6 sm:grid-cols-3">
                            {[
                                { step: '01', icon: '🔗', title: t('landing.step1Title'), desc: t('landing.step1Desc'), detail: t('landing.step1Detail') },
                                { step: '02', icon: '⏱', title: t('landing.step2Title'), desc: t('landing.step2Desc'), detail: t('landing.step2Detail') },
                                { step: '03', icon: '💾', title: t('landing.step3Title'), desc: t('landing.step3Desc'), detail: t('landing.step3Detail') },
                            ].map(({ step, icon, title, desc, detail }, i) => (
                                <div key={step} className="relative">
                                    {i < 2 && (
                                        <div className="absolute top-7 hidden w-6 border-t border-dashed border-gray-300 sm:block" style={{ left: '100%', width: '24px' }} />
                                    )}
                                    <div className="rounded-2xl border border-gray-200 bg-white p-6 h-full shadow-sm">
                                        <div className="mb-4 flex items-center gap-3">
                                            <span className="text-2xl font-bold text-gray-700">{step}</span>
                                            <span className="text-2xl">{icon}</span>
                                        </div>
                                        <h3 className="mb-2 font-semibold text-gray-900">{title}</h3>
                                        <p className="text-sm text-gray-800 mb-3 leading-relaxed">{desc}</p>
                                        <p className="text-xs text-gray-700 border-t border-gray-100 pt-3">{detail}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Try it now */}
                <TryItSection />

                {/* Pricing */}
                <section className="mx-auto max-w-5xl px-6 py-12 sm:py-20">
                    <div className="mb-12 text-center">
                        <h2 className="mb-3 text-2xl font-bold text-gray-900 sm:text-3xl">{t('landing.pricingTitle')}</h2>
                        <p className="text-gray-800">{t('landing.pricingDescPre')}<br className="sm:hidden" />{t('landing.pricingDescPost')}</p>
                    </div>
                    <div className="mx-auto grid max-w-2xl gap-5 sm:grid-cols-2">
                        {/* Free */}
                        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
                            <div className="mb-1">
                                <span className="text-xs font-medium text-gray-700 uppercase tracking-wider">Free</span>
                            </div>
                            <p className="mb-1 text-4xl font-bold text-gray-900">¥0</p>
                            <p className="mb-6 text-sm text-gray-700">{t('landing.freeForever')}</p>
                            <ul className="mb-8 space-y-3">
                                {freeFeatures.map((f) => (
                                    <li key={f} className="flex items-center gap-2.5 text-sm text-gray-800">
                                        <Check className="h-4 w-4 flex-shrink-0 text-gray-700" />
                                        {f}
                                    </li>
                                ))}
                            </ul>
                            <Link href={route('register')} className="block w-full rounded-lg border border-gray-300 py-2.5 text-center text-sm font-medium text-gray-700 transition-colors hover:border-gray-400 hover:bg-gray-50">
                                {t('landing.startFree')}
                            </Link>
                        </div>

                        {/* Pro */}
                        <div className="relative rounded-2xl border border-purple-300 bg-gradient-to-br from-red-50 to-purple-50 p-8 shadow-sm" style={{ boxShadow: '0 0 40px rgba(147,51,234,0.1)' }}>
                            <div className="mb-1 flex items-center gap-2">
                                <span className="text-xs font-medium text-gray-700 uppercase tracking-wider">Pro</span>
                                <span className="rounded-full bg-gradient-to-r from-red-500 to-purple-600 px-2.5 py-0.5 text-xs font-medium text-white">{t('landing.recommended')}</span>
                            </div>
                            <p className="mb-1 text-4xl font-bold text-gray-900">¥300</p>
                            <p className="mb-6 text-sm text-gray-700">{t('landing.proInterval')}</p>
                            <ul className="space-y-3">
                                {proFeatures.map((f) => (
                                    <li key={f} className="flex items-center gap-2.5 text-sm text-gray-800">
                                        <Check className="h-4 w-4 flex-shrink-0 text-purple-500" />
                                        {f}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="border-t border-gray-200 bg-gray-50">
                    <div className="mx-auto max-w-5xl px-6 py-14 sm:py-24 text-center">
                        <div className="mx-auto max-w-xl">
                            <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">{t('landing.ctaTitlePre')}<br className="sm:hidden" />{t('landing.ctaTitlePost')}</h2>
                            <p className="mb-8 text-gray-800">{t('landing.ctaDesc')}</p>
                            <Link href={route('register')} className="inline-block rounded-xl bg-gradient-to-r from-red-500 to-purple-600 px-10 py-4 text-base font-semibold text-white transition-opacity hover:opacity-90">
                                {t('landing.startFree')}
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="border-t border-gray-200 py-8 text-center text-sm text-gray-700">
                    <div className="flex justify-center gap-6 mb-4">
                        <Link href="/guide" className="hover:text-gray-700 transition-colors">使い方ガイド</Link>
                        <Link href={route('terms')} className="hover:text-gray-700 transition-colors">{t('common.terms') ?? '利用規約'}</Link>
                        <Link href={route('privacy')} className="hover:text-gray-700 transition-colors">{t('common.privacy') ?? 'プライバシーポリシー'}</Link>
                    </div>
                    <p>© 2026 Loop Video</p>
                </footer>
            </div>
        </>
    );
}
