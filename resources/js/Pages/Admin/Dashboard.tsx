import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

interface SignupPoint {
    date: string;
    count: number;
}

interface VideoRank {
    video_id: string;
    title: string | null;
    loop_count?: number;
    favorite_count?: number;
}

interface AdminUser {
    id: number;
    name: string;
    email: string;
    authMethod: 'Google' | 'Email';
    isPro: boolean;
    loopCount: number;
    createdAt: string;
}

interface Metrics {
    acquisition: {
        totalUsers: number;
        todayUsers: number;
        weekUsers: number;
        monthUsers: number;
        googleUsers: number;
        emailUsers: number;
        signupChart: SignupPoint[];
    };
    engagement: {
        totalLoops: number;
        activeLoops: number;
        trashedLoops: number;
        trashRate: number;
        avgLoopsPerUser: number;
        activeUsers: number;
        activationRate: number;
    };
    features: {
        sharedLoops: number;
        shareRate: number;
        favoriteLoops: number;
        favoriteRate: number;
    };
    revenue: {
        proUsers: number;
        conversionRate: number;
        activeSubscriptions: number;
    };
    popularVideos: VideoRank[];
    favoriteVideos: VideoRank[];
    users: AdminUser[];
}

type Props = PageProps<{ metrics: Metrics }>;

function StatCard({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
    return (
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-500">{label}</p>
            <p className="mt-1 text-3xl font-bold text-gray-900">{value}</p>
            {sub && <p className="mt-1 text-sm text-gray-500">{sub}</p>}
        </div>
    );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
    return (
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">
            {children}
        </h2>
    );
}

function VideoRankTable({ data, countKey, countLabel }: { data: VideoRank[]; countKey: 'loop_count' | 'favorite_count'; countLabel: string }) {
    if (data.length === 0) {
        return <p className="text-sm text-gray-400">データなし</p>;
    }
    return (
        <table className="w-full text-sm">
            <thead>
                <tr className="border-b border-gray-100 text-left text-xs text-gray-400">
                    <th className="pb-2 font-medium">#</th>
                    <th className="pb-2 font-medium">動画</th>
                    <th className="pb-2 text-right font-medium">{countLabel}</th>
                </tr>
            </thead>
            <tbody>
                {data.map((v, i) => (
                    <tr key={v.video_id} className="border-b border-gray-50 last:border-0">
                        <td className="py-2 pr-3 text-gray-400">{i + 1}</td>
                        <td className="py-2 pr-3">
                            <a
                                href={`https://www.youtube.com/watch?v=${v.video_id}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="line-clamp-1 text-indigo-600 hover:underline"
                            >
                                {v.title ?? v.video_id}
                            </a>
                        </td>
                        <td className="py-2 text-right font-semibold text-gray-700">
                            {v[countKey]}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default function Dashboard({ metrics }: Props) {
    const { acquisition, engagement, features, revenue, popularVideos, favoriteVideos, users } = metrics;

    const authPieData = [
        { name: 'Google', value: acquisition.googleUsers, color: '#4285F4' },
        { name: 'Email', value: acquisition.emailUsers, color: '#6366f1' },
    ];

    const revenuePieData = [
        { name: 'Pro', value: revenue.proUsers, color: '#8b5cf6' },
        { name: 'Free', value: acquisition.totalUsers - revenue.proUsers, color: '#e5e7eb' },
    ];

    const chartData = acquisition.signupChart.map((d) => ({
        ...d,
        date: d.date.slice(5),
    }));

    return (
        <>
            <Head title="Admin Dashboard" />
            <div className="min-h-screen bg-gray-50 p-8">
                <div className="mx-auto max-w-6xl space-y-10">
                    <h1 className="text-2xl font-bold text-gray-900">📊 Admin Dashboard</h1>

                    {/* 獲得 */}
                    <section>
                        <SectionTitle>獲得 / Acquisition</SectionTitle>
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                            <StatCard label="総ユーザー数" value={acquisition.totalUsers} />
                            <StatCard label="今日の新規" value={acquisition.todayUsers} />
                            <StatCard label="今週の新規" value={acquisition.weekUsers} />
                            <StatCard label="今月の新規" value={acquisition.monthUsers} />
                        </div>

                        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                            <div className="col-span-2 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                                <p className="mb-4 text-xs font-medium uppercase tracking-wide text-gray-500">
                                    日別新規登録（過去30日）
                                </p>
                                <ResponsiveContainer width="100%" height={180}>
                                    <BarChart data={chartData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                        <XAxis dataKey="date" tick={{ fontSize: 10 }} interval={4} stroke="#9ca3af" />
                                        <YAxis tick={{ fontSize: 10 }} stroke="#9ca3af" allowDecimals={false} />
                                        <Tooltip />
                                        <Bar dataKey="count" fill="#6366f1" radius={[3, 3, 0, 0]} name="新規登録" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>

                            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                                <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-500">
                                    認証方法
                                </p>
                                <ResponsiveContainer width="100%" height={140}>
                                    <PieChart>
                                        <Pie data={authPieData} cx="50%" cy="50%" innerRadius={40} outerRadius={60} dataKey="value">
                                            {authPieData.map((entry, i) => (
                                                <Cell key={i} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="mt-2 flex justify-center gap-4 text-xs text-gray-600">
                                    {authPieData.map((d) => (
                                        <span key={d.name} className="flex items-center gap-1">
                                            <span className="inline-block h-2 w-2 rounded-full" style={{ background: d.color }} />
                                            {d.name}: {d.value}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* エンゲージメント */}
                    <section>
                        <SectionTitle>エンゲージメント / Engagement</SectionTitle>
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                            <StatCard label="総ループ数" value={engagement.totalLoops} />
                            <StatCard label="有効ループ数" value={engagement.activeLoops} />
                            <StatCard label="平均ループ数/ユーザー" value={engagement.avgLoopsPerUser} />
                            <StatCard
                                label="アクティブ率"
                                value={`${engagement.activationRate}%`}
                                sub={`${engagement.activeUsers}人がループ保存済み`}
                            />
                        </div>
                    </section>

                    {/* 機能利用状況 */}
                    <section>
                        <SectionTitle>機能利用状況 / Feature Usage</SectionTitle>
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                            <StatCard
                                label="共有率"
                                value={`${features.shareRate}%`}
                                sub={`${features.sharedLoops}件が共有済み`}
                            />
                            <StatCard
                                label="お気に入り率"
                                value={`${features.favoriteRate}%`}
                                sub={`${features.favoriteLoops}件がお気に入り`}
                            />
                            <StatCard
                                label="ゴミ箱率"
                                value={`${engagement.trashRate}%`}
                                sub={`${engagement.trashedLoops}件が削除済み`}
                            />
                        </div>
                    </section>

                    {/* 収益 */}
                    <section>
                        <SectionTitle>収益 / Revenue</SectionTitle>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                            <StatCard
                                label="Pro転換率"
                                value={`${revenue.conversionRate}%`}
                                sub={`${revenue.proUsers}人がPro`}
                            />
                            <StatCard label="アクティブサブスク" value={revenue.activeSubscriptions} />
                            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                                <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-500">
                                    Free vs Pro
                                </p>
                                <ResponsiveContainer width="100%" height={120}>
                                    <PieChart>
                                        <Pie data={revenuePieData} cx="50%" cy="50%" innerRadius={30} outerRadius={50} dataKey="value">
                                            {revenuePieData.map((entry, i) => (
                                                <Cell key={i} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="mt-1 flex justify-center gap-4 text-xs text-gray-600">
                                    {revenuePieData.map((d) => (
                                        <span key={d.name} className="flex items-center gap-1">
                                            <span className="inline-block h-2 w-2 rounded-full" style={{ background: d.color }} />
                                            {d.name}: {d.value}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* コンテンツランキング */}
                    <section>
                        <SectionTitle>コンテンツ / Content Rankings</SectionTitle>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                                <p className="mb-4 text-xs font-medium uppercase tracking-wide text-gray-500">
                                    人気動画ランキング（ループ数）
                                </p>
                                <VideoRankTable data={popularVideos} countKey="loop_count" countLabel="ループ数" />
                            </div>
                            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                                <p className="mb-4 text-xs font-medium uppercase tracking-wide text-gray-500">
                                    お気に入りランキング
                                </p>
                                <VideoRankTable data={favoriteVideos} countKey="favorite_count" countLabel="お気に入り数" />
                            </div>
                        </div>
                    </section>

                    {/* ユーザー一覧 */}
                    <section>
                        <SectionTitle>ユーザー一覧 / Users ({users.length})</SectionTitle>
                        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead className="border-b border-gray-100 bg-gray-50">
                                        <tr className="text-left text-xs text-gray-500">
                                            <th className="px-4 py-3 font-medium">名前</th>
                                            <th className="px-4 py-3 font-medium">メール</th>
                                            <th className="px-4 py-3 font-medium">認証</th>
                                            <th className="px-4 py-3 font-medium">プラン</th>
                                            <th className="px-4 py-3 text-right font-medium">ループ数</th>
                                            <th className="px-4 py-3 font-medium">登録日</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {users.map((user) => (
                                            <tr key={user.id} className="hover:bg-gray-50">
                                                <td className="px-4 py-3 font-medium text-gray-800">{user.name}</td>
                                                <td className="px-4 py-3 text-gray-600">{user.email}</td>
                                                <td className="px-4 py-3">
                                                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${user.authMethod === 'Google' ? 'bg-blue-50 text-blue-600' : 'bg-gray-100 text-gray-600'}`}>
                                                        {user.authMethod}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3">
                                                    {user.isPro ? (
                                                        <span className="rounded-full bg-purple-50 px-2 py-0.5 text-xs font-medium text-purple-600">Pro</span>
                                                    ) : (
                                                        <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-500">Free</span>
                                                    )}
                                                </td>
                                                <td className="px-4 py-3 text-right font-semibold text-gray-700">{user.loopCount}</td>
                                                <td className="px-4 py-3 text-gray-500">{user.createdAt}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
}
