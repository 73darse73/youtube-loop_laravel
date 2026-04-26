import { SUPPORTED_LANGUAGES } from '@/i18n';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
    const { i18n } = useTranslation();
    const [open, setOpen] = useState(false);

    const current =
        SUPPORTED_LANGUAGES.find((l) => l.code === i18n.language) ??
        SUPPORTED_LANGUAGES.find((l) => i18n.language.startsWith(l.code)) ??
        SUPPORTED_LANGUAGES[1];

    const handleSelect = (code: string) => {
        i18n.changeLanguage(code);
        setOpen(false);
    };

    return (
        <div className="relative">
            <button
                onClick={() => setOpen((v) => !v)}
                className="flex items-center gap-1 rounded-md px-2 py-1.5 text-sm text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            >
                <span>🌐</span>
                <span>{current.label}</span>
                <svg
                    className="h-3 w-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </button>
            {open && (
                <div className="absolute right-0 top-full z-50 mt-1 min-w-[130px] overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
                    {SUPPORTED_LANGUAGES.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => handleSelect(lang.code)}
                            className={`block w-full px-4 py-2 text-left text-sm transition-colors hover:bg-gray-50 dark:hover:bg-gray-700 ${
                                current.code === lang.code
                                    ? 'font-semibold text-gray-900 dark:text-white'
                                    : 'text-gray-700 dark:text-gray-300'
                            }`}
                        >
                            {lang.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
