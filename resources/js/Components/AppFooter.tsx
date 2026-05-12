import { Link } from '@inertiajs/react';
import { useTranslation } from 'react-i18next';

export default function AppFooter() {
    const { t } = useTranslation();

    return (
        <footer className="mt-auto border-t border-gray-200/80 py-6 dark:border-gray-700/80">
            <div className="container mx-auto flex flex-col items-center justify-center gap-2 px-4 text-xs text-gray-800 md:flex-row md:gap-4 dark:text-gray-400">
                <span>© {new Date().getFullYear()} Loop Video. All Rights Reserved.</span>
                <span className="hidden md:inline">·</span>
                <Link href={route('terms')} className="hover:text-gray-800 hover:underline dark:hover:text-gray-200">
                    {t('common.terms')}
                </Link>
                <span className="hidden md:inline">·</span>
                <Link href={route('privacy')} className="hover:text-gray-800 hover:underline dark:hover:text-gray-200">
                    {t('common.privacy')}
                </Link>
                <span className="hidden md:inline">·</span>
                <Link href={route('commercial-disclosure')} className="hover:text-gray-800 hover:underline dark:hover:text-gray-200">
                    {t('common.commercial')}
                </Link>
            </div>
        </footer>
    );
}
