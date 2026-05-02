import LanguageSwitcher from '@/Components/LanguageSwitcher';
import { useTheme } from '@/hooks/useTheme';
import { Link } from '@inertiajs/react';
import { Moon, Sun } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface Props {
    userName: string;
    isPro?: boolean;
}

export default function AppHeader({ userName, isPro = false }: Props) {
    const { t } = useTranslation();
    const { theme, toggle } = useTheme();

    return (
        <header className="sticky top-0 z-50 border-b border-gray-200/80 bg-white/95 shadow-sm backdrop-blur dark:border-gray-700/80 dark:bg-gray-900/95">
            <div className="container mx-auto flex items-center justify-between px-4 py-3">
                <Link
                    href="/home"
                    className="flex items-center gap-2 transition-opacity hover:opacity-80"
                >
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-red-500 to-purple-600">
                        <svg
                            className="h-5 w-5 text-white"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                        </svg>
                    </div>
                    <span className="text-lg font-bold dark:text-white">Loop Video</span>
                </Link>

                <div className="flex items-center gap-1">
                    <span className="hidden text-sm text-gray-500 dark:text-gray-400 md:block">
                        {userName}
                    </span>
                    {isPro && (
                        <span className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-2 py-0.5 text-xs font-medium text-white">
                            PRO
                        </span>
                    )}
                    <button
                        onClick={toggle}
                        className="rounded-md p-1.5 text-gray-500 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                        aria-label="Toggle theme"
                    >
                        {theme === 'dark' ? (
                            <Sun className="h-4 w-4" />
                        ) : (
                            <Moon className="h-4 w-4" />
                        )}
                    </button>
                    <LanguageSwitcher />
                    <Link
                        href="/trash"
                        className="rounded-md px-3 py-1.5 text-sm text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                    >
                        {t('common.trash')}
                    </Link>
                    <Link
                        href="/plan"
                        className="rounded-md px-3 py-1.5 text-sm text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                    >
                        {t('common.plan')}
                    </Link>
                    <Link
                        href="/logout"
                        method="post"
                        as="button"
                        className="rounded-md px-3 py-1.5 text-sm text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                    >
                        {t('common.logout')}
                    </Link>
                </div>
            </div>
        </header>
    );
}
