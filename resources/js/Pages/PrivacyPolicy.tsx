import LegalHeader from '@/Components/LegalHeader';
import { Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

const UPDATED_AT_JA = '2026年4月29日';
const UPDATED_AT_EN = 'April 29, 2026';
const CONTACT_EMAIL = '73darse73@gmail.com';

export default function PrivacyPolicy() {
    const { i18n } = useTranslation();
    const isJa = i18n.language === 'ja';

    return (
        <>
            <Head title={isJa ? 'プライバシーポリシー | Loop Player' : 'Privacy Policy | Loop Player'} />
            <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
                <LegalHeader />
                <main className="container mx-auto max-w-3xl px-4 py-12">
                    {isJa ? <JaContent /> : <EnContent />}
                </main>
            </div>
        </>
    );
}

function JaContent() {
    return (
        <div className="prose prose-gray max-w-none dark:prose-invert">
            <h1 className="text-2xl font-bold dark:text-white">プライバシーポリシー</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">最終更新日: {UPDATED_AT_JA}</p>

            <section className="mt-8 space-y-6 text-gray-700 dark:text-gray-300">
                <div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">1. 収集する情報</h2>
                    <p className="mt-2 text-sm leading-relaxed">本サービスは以下の情報を収集します：</p>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed">
                        <li><strong>Googleアカウント情報</strong>：Googleログイン時に取得する名前・メールアドレス・Google ID</li>
                        <li><strong>利用データ</strong>：ループ設定（動画URL・開始・終了時間）、お気に入り設定</li>
                        <li><strong>決済情報</strong>：Proプラン加入時の決済情報（クレジットカード情報はStripeが管理し、当サービスは保持しません）</li>
                    </ul>
                </div>

                <div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">2. 情報の利用目的</h2>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed">
                        <li>アカウント認証・サービス提供</li>
                        <li>ループ設定の保存・管理</li>
                        <li>プランの管理・課金処理</li>
                        <li>サービスの改善・不正利用防止</li>
                    </ul>
                </div>

                <div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">3. 第三者サービス</h2>
                    <p className="mt-2 text-sm leading-relaxed">本サービスは以下の第三者サービスを利用しています：</p>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed">
                        <li><strong>Google / YouTube API</strong>：動画の再生に利用。<a href="https://policies.google.com/privacy" className="text-red-500 hover:underline" target="_blank" rel="noopener noreferrer">Googleプライバシーポリシー</a>が適用されます</li>
                        <li><strong>Google AdSense</strong>：無料プランユーザーへの広告表示に利用。Googleが広告配信のためにCookieを使用します</li>
                        <li><strong>Stripe</strong>：Proプランの決済処理に利用。<a href="https://stripe.com/privacy" className="text-red-500 hover:underline" target="_blank" rel="noopener noreferrer">Stripeプライバシーポリシー</a>が適用されます</li>
                    </ul>
                </div>

                <div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">4. Cookieの使用</h2>
                    <p className="mt-2 text-sm leading-relaxed">
                        本サービスはセッション管理・ログイン状態の維持のためにCookieを使用します。
                        また、Google AdSenseが広告配信のためにCookieを使用します。ブラウザの設定でCookieを無効にすることが可能ですが、一部機能が利用できなくなる場合があります。
                    </p>
                </div>

                <div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">5. データの保管と削除</h2>
                    <p className="mt-2 text-sm leading-relaxed">
                        収集した情報はサービス提供に必要な期間保管します。
                        アカウントを削除した場合、関連するすべてのデータを削除します。
                        データの削除を希望する場合は、プロフィールページのアカウント削除機能をご利用いただくか、下記のお問い合わせ先までご連絡ください。
                    </p>
                </div>

                <div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">6. 第三者への情報提供</h2>
                    <p className="mt-2 text-sm leading-relaxed">
                        法令に基づく場合または上記第三者サービスへの提供を除き、収集した情報を第三者に販売・提供することはありません。
                    </p>
                </div>

                <div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">7. お問い合わせ</h2>
                    <p className="mt-2 text-sm leading-relaxed">
                        プライバシーに関するお問い合わせは、<a href={`mailto:${CONTACT_EMAIL}`} className="text-red-500 hover:underline">{CONTACT_EMAIL}</a> までご連絡ください。
                    </p>
                </div>
            </section>
        </div>
    );
}

function EnContent() {
    return (
        <div className="prose prose-gray max-w-none dark:prose-invert">
            <h1 className="text-2xl font-bold dark:text-white">Privacy Policy</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Last updated: {UPDATED_AT_EN}</p>

            <section className="mt-8 space-y-6 text-gray-700 dark:text-gray-300">
                <div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">1. Information We Collect</h2>
                    <p className="mt-2 text-sm leading-relaxed">We collect the following information:</p>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed">
                        <li><strong>Google Account Information</strong>: Your name, email address, and Google ID obtained when you sign in with Google</li>
                        <li><strong>Usage Data</strong>: Loop settings you save (video URL, start/end times), favorites</li>
                        <li><strong>Payment Information</strong>: Subscription status for the Pro plan. Credit card details are handled by Stripe and are never stored on our servers</li>
                    </ul>
                </div>

                <div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">2. How We Use Your Information</h2>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed">
                        <li>To authenticate your account and provide the Service</li>
                        <li>To save and manage your loop settings</li>
                        <li>To manage your subscription and process payments</li>
                        <li>To improve the Service and prevent abuse</li>
                    </ul>
                </div>

                <div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">3. Third-Party Services</h2>
                    <p className="mt-2 text-sm leading-relaxed">We use the following third-party services:</p>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed">
                        <li><strong>Google / YouTube API</strong>: Used for video playback. Subject to <a href="https://policies.google.com/privacy" className="text-red-500 hover:underline" target="_blank" rel="noopener noreferrer">Google's Privacy Policy</a></li>
                        <li><strong>Google AdSense</strong>: Used to display ads for Free plan users. Google uses cookies for ad delivery</li>
                        <li><strong>Stripe</strong>: Used to process Pro plan payments. Subject to <a href="https://stripe.com/privacy" className="text-red-500 hover:underline" target="_blank" rel="noopener noreferrer">Stripe's Privacy Policy</a></li>
                    </ul>
                </div>

                <div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">4. Cookies</h2>
                    <p className="mt-2 text-sm leading-relaxed">
                        We use cookies for session management and to keep you logged in.
                        Google AdSense also uses cookies for ad delivery. You may disable cookies in your browser settings, though some features may not function properly.
                    </p>
                </div>

                <div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">5. Data Retention and Deletion</h2>
                    <p className="mt-2 text-sm leading-relaxed">
                        We retain your information for as long as necessary to provide the Service.
                        If you delete your account, all associated data will be permanently deleted.
                        To delete your data, use the account deletion feature on your profile page, or contact us at the address below.
                    </p>
                </div>

                <div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">6. Data Sharing</h2>
                    <p className="mt-2 text-sm leading-relaxed">
                        We do not sell or share your personal information with third parties, except as required by law or as described under third-party services above.
                    </p>
                </div>

                <div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">7. Contact</h2>
                    <p className="mt-2 text-sm leading-relaxed">
                        For privacy-related inquiries, please contact us at <a href={`mailto:${CONTACT_EMAIL}`} className="text-red-500 hover:underline">{CONTACT_EMAIL}</a>.
                    </p>
                </div>
            </section>
        </div>
    );
}
