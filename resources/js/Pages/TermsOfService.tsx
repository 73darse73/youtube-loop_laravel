import LegalHeader from '@/Components/LegalHeader';
import { Head } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

const UPDATED_AT_JA = '2026年4月29日';
const UPDATED_AT_EN = 'April 29, 2026';

export default function TermsOfService() {
    const { i18n } = useTranslation();
    const isJa = i18n.language === 'ja';

    return (
        <>
            <Head title={isJa ? '利用規約 | Loop Video' : 'Terms of Service | Loop Video'} />
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
            <h1 className="text-2xl font-bold dark:text-white">利用規約</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">最終更新日: {UPDATED_AT_JA}</p>

            <section className="mt-8 space-y-6 text-gray-700 dark:text-gray-300">
                <div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">1. サービスについて</h2>
                    <p className="mt-2 text-sm leading-relaxed">
                        Loop Video（以下「本サービス」）は、YouTube動画の任意の区間を繰り返し再生できるWebアプリケーションです。
                        本サービスはGoogleおよびYouTubeと提携するものではなく、YouTube APIを通じてサービスを提供します。
                        本サービスの利用にはYouTube利用規約（<a href="https://www.youtube.com/t/terms" className="text-red-500 hover:underline" target="_blank" rel="noopener noreferrer">https://www.youtube.com/t/terms</a>）が適用されます。
                    </p>
                </div>

                <div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">2. 利用条件</h2>
                    <p className="mt-2 text-sm leading-relaxed">
                        本サービスを利用するには、Googleアカウントによる認証が必要です。
                        13歳未満の方は本サービスをご利用いただけません。
                        本サービスは個人的・非商業的な目的でのみご利用いただけます。
                    </p>
                </div>

                <div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">3. プランと料金</h2>
                    <p className="mt-2 text-sm leading-relaxed">
                        本サービスは無料プランとProプランを提供します。Proプランは月額料金が発生し、決済はStripe（<a href="https://stripe.com" className="text-red-500 hover:underline" target="_blank" rel="noopener noreferrer">stripe.com</a>）を通じて処理されます。
                        料金はサービス上に表示される金額を適用します。サブスクリプションはいつでもキャンセル可能で、キャンセル後は次回更新日まで引き続きProプランをご利用いただけます。
                        返金は原則として行いません。
                    </p>
                </div>

                <div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">4. 禁止事項</h2>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed">
                        <li>本サービスを通じた著作権侵害コンテンツの利用</li>
                        <li>サービスへの不正アクセス、リバースエンジニアリング</li>
                        <li>スクレイピング、自動化ツールによる大量アクセス</li>
                        <li>第三者への迷惑行為、違法行為</li>
                        <li>YouTubeの利用規約に違反する行為</li>
                    </ul>
                </div>

                <div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">5. 免責事項</h2>
                    <p className="mt-2 text-sm leading-relaxed">
                        本サービスは現状有姿で提供されます。サービスの継続性、正確性、特定目的への適合性を保証しません。
                        YouTubeの仕様変更やAPI変更により、サービスが予告なく変更・停止される場合があります。
                        本サービスの利用により生じた損害について、運営者は一切の責任を負いません。
                    </p>
                </div>

                <div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">6. サービスの変更・終了</h2>
                    <p className="mt-2 text-sm leading-relaxed">
                        運営者は事前通知なしにサービス内容の変更、一時停止、終了を行う場合があります。
                        また本利用規約は予告なく変更される場合があります。変更後も継続してご利用いただいた場合、変更に同意したものとみなします。
                    </p>
                </div>

                <div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">7. 準拠法</h2>
                    <p className="mt-2 text-sm leading-relaxed">
                        本利用規約は日本法に準拠し、解釈されます。
                    </p>
                </div>
            </section>
        </div>
    );
}

function EnContent() {
    return (
        <div className="prose prose-gray max-w-none dark:prose-invert">
            <h1 className="text-2xl font-bold dark:text-white">Terms of Service</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Last updated: {UPDATED_AT_EN}</p>

            <section className="mt-8 space-y-6 text-gray-700 dark:text-gray-300">
                <div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">1. About the Service</h2>
                    <p className="mt-2 text-sm leading-relaxed">
                        Loop Video (the "Service") is a web application that allows you to loop any section of a YouTube video.
                        This Service is not affiliated with or endorsed by Google or YouTube. The Service uses the YouTube API, and your use of this Service is also subject to the YouTube Terms of Service (<a href="https://www.youtube.com/t/terms" className="text-red-500 hover:underline" target="_blank" rel="noopener noreferrer">https://www.youtube.com/t/terms</a>).
                    </p>
                </div>

                <div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">2. Eligibility</h2>
                    <p className="mt-2 text-sm leading-relaxed">
                        To use this Service, you must sign in with a Google account. You must be at least 13 years old to use the Service.
                        The Service is intended for personal, non-commercial use only.
                    </p>
                </div>

                <div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">3. Plans and Payments</h2>
                    <p className="mt-2 text-sm leading-relaxed">
                        The Service offers a Free plan and a Pro plan. The Pro plan is a paid subscription processed through Stripe (<a href="https://stripe.com" className="text-red-500 hover:underline" target="_blank" rel="noopener noreferrer">stripe.com</a>).
                        Pricing is as displayed on the Service. You may cancel your subscription at any time; you will retain access to Pro features until the end of the current billing period.
                        All payments are non-refundable unless required by law.
                    </p>
                </div>

                <div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">4. Prohibited Uses</h2>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed">
                        <li>Using the Service to infringe on any third-party copyright or intellectual property</li>
                        <li>Attempting to gain unauthorized access or reverse engineer the Service</li>
                        <li>Scraping or automated access beyond normal use</li>
                        <li>Any use that violates YouTube's Terms of Service or applicable law</li>
                    </ul>
                </div>

                <div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">5. Disclaimer</h2>
                    <p className="mt-2 text-sm leading-relaxed">
                        The Service is provided "as is" without warranties of any kind. We do not guarantee uninterrupted availability.
                        The Service may be modified or discontinued without notice due to changes in YouTube's API or policies.
                        To the fullest extent permitted by law, we are not liable for any damages arising from your use of the Service.
                    </p>
                </div>

                <div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">6. Changes to the Service and Terms</h2>
                    <p className="mt-2 text-sm leading-relaxed">
                        We reserve the right to modify or discontinue the Service at any time without notice.
                        We may update these Terms at any time. Continued use of the Service after changes constitutes acceptance of the new Terms.
                    </p>
                </div>

                <div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">7. Governing Law</h2>
                    <p className="mt-2 text-sm leading-relaxed">
                        These Terms are governed by and construed in accordance with the laws of Japan.
                    </p>
                </div>
            </section>
        </div>
    );
}
