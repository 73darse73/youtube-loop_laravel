import AppHeader from '@/Components/AppHeader';
import { Head } from '@inertiajs/react';

const UPDATED_AT = '2026年5月9日';

export default function CommercialDisclosure() {
    return (
        <>
            <Head title="特定商取引法に基づく表記 | Loop Video" />
            <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
                <AppHeader />
                <main className="container mx-auto max-w-3xl px-4 py-12">
                    <div className="prose prose-gray max-w-none dark:prose-invert">
                        <h1 className="text-2xl font-bold dark:text-white">特定商取引法に基づく表記</h1>
                        <p className="text-sm text-gray-700 dark:text-gray-400">最終更新日: {UPDATED_AT}</p>

                        <div className="mt-8 overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                            <table className="w-full text-sm">
                                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                                    <Row label="販売業者">兒玉 侑也</Row>
                                    <Row label="所在地">
                                        公開していません。お問い合わせいただいた場合、遅滞なく開示いたします。
                                    </Row>
                                    <Row label="電話番号">
                                        公開していません。お問い合わせいただいた場合、遅滞なく開示いたします。
                                    </Row>
                                    <Row label="メールアドレス">73darse73@gmail.com</Row>
                                    <Row label="販売価格">
                                        各プランページに表示している価格（税込）
                                    </Row>
                                    <Row label="料金以外の必要費用">なし</Row>
                                    <Row label="支払方法">クレジットカード（Visa・Mastercard・American Express・JCB）</Row>
                                    <Row label="支払時期">
                                        サブスクリプション開始時に初回請求が発生し、以降は契約更新日に自動で請求されます。
                                    </Row>
                                    <Row label="サービス提供時期">
                                        決済完了後、直ちにご利用いただけます。
                                    </Row>
                                    <Row label="解約・返金について">
                                        マイページからいつでも解約できます。解約後は当該請求期間の終了まで引き続きご利用いただけます。
                                        既にお支払いいただいた料金の返金は原則として行っておりません。
                                    </Row>
                                    <Row label="動作環境">
                                        最新版のGoogle Chrome・Firefox・Safari・Microsoft Edgeを推奨します。
                                    </Row>
                                    <Row label="販売数量の制限">なし</Row>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
    return (
        <tr>
            <th className="w-40 bg-gray-50 px-5 py-4 text-left text-xs font-semibold text-gray-600 dark:bg-gray-700/50 dark:text-gray-400">
                {label}
            </th>
            <td className="px-5 py-4 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                {children}
            </td>
        </tr>
    );
}
