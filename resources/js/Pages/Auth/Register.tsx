import AppFooter from '@/Components/AppFooter';
import InputError from '@/Components/InputError';
import LanguageSwitcher from '@/Components/LanguageSwitcher';
import { Head, Link, useForm } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';
import { FormEventHandler } from 'react';

export default function Register() {
    const { t } = useTranslation();
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className="flex min-h-screen flex-col bg-gradient-to-br from-white via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
            <Head title={t('auth.register')}>
                <meta name="robots" content="noindex, nofollow" />
            </Head>
            <header className="flex items-center justify-between px-6 py-4">
                <Link href="/" className="text-lg font-bold dark:text-white">
                    Loop Video
                </Link>
                <LanguageSwitcher />
            </header>
            <div className="flex flex-1 items-center justify-center px-4 py-8">
            <div className="w-full max-w-md">
                <div className="mb-8 text-center">
                    <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 to-purple-600 shadow-lg">
                        <svg
                            className="h-8 w-8 text-white"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                        </svg>
                    </div>
                    <h1 className="mb-2 text-3xl font-bold dark:text-white">Loop Video</h1>
                    <p className="text-gray-700 dark:text-gray-400">{t('auth.loopPlayDesc')}</p>
                </div>

                <div className="mb-4 grid grid-cols-2 rounded-lg bg-gray-100 p-1 dark:bg-gray-800">
                    <Link
                        href={route('login')}
                        className="rounded-md py-2 text-center text-sm font-medium text-gray-700 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                    >
                        {t('auth.login')}
                    </Link>
                    <span className="cursor-default rounded-md bg-white py-2 text-center text-sm font-medium shadow dark:bg-gray-700 dark:text-white">
                        {t('auth.register')}
                    </span>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white px-6 py-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                    <h2 className="mb-1 text-lg font-semibold dark:text-white">{t('auth.register')}</h2>
                    <p className="mb-6 text-sm text-gray-700 dark:text-gray-400">
                        {t('auth.registerDesc')}
                    </p>

                    <form onSubmit={submit} className="space-y-4">
                        <div className="space-y-1">
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                                {t('auth.name')}
                            </label>
                            <input
                                id="name"
                                type="text"
                                name="name"
                                value={data.name}
                                autoComplete="name"
                                autoFocus
                                onChange={(e) =>
                                    setData('name', e.target.value)
                                }
                                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            />
                            <InputError
                                message={errors.name}
                                className="mt-1"
                            />
                        </div>

                        <div className="space-y-1">
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                                {t('auth.email')}
                            </label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                autoComplete="username"
                                onChange={(e) =>
                                    setData('email', e.target.value)
                                }
                                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            />
                            <InputError
                                message={errors.email}
                                className="mt-1"
                            />
                        </div>

                        <div className="space-y-1">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                                {t('auth.passwordMin')}
                            </label>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                autoComplete="new-password"
                                onChange={(e) =>
                                    setData('password', e.target.value)
                                }
                                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            />
                            <InputError
                                message={errors.password}
                                className="mt-1"
                            />
                        </div>

                        <div className="space-y-1">
                            <label
                                htmlFor="password_confirmation"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                                {t('auth.passwordConfirm')}
                            </label>
                            <input
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                value={data.password_confirmation}
                                autoComplete="new-password"
                                onChange={(e) =>
                                    setData(
                                        'password_confirmation',
                                        e.target.value,
                                    )
                                }
                                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                            />
                            <InputError
                                message={errors.password_confirmation}
                                className="mt-1"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full rounded-lg bg-gradient-to-r from-gray-800 to-gray-900 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 active:scale-[0.98] disabled:opacity-50"
                        >
                            {t('auth.createAccount')}
                        </button>
                    </form>

                    <div className="relative my-4">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-gray-200 dark:border-gray-600" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-2 text-gray-700 dark:bg-gray-800 dark:text-gray-400">
                                {t('auth.or')}
                            </span>
                        </div>
                    </div>

                    <a
                        href="/auth/redirect"
                        className="block w-full rounded-md border border-gray-300 px-4 py-2 text-center text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                        {t('auth.googleRegister')}
                    </a>
                </div>
            </div>
            </div>
            <AppFooter />
        </div>
    );
}
