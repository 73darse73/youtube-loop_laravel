import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import en from './locales/en';
import es from './locales/es';
import ja from './locales/ja';
import ko from './locales/ko';
import pt from './locales/pt';
import zhTW from './locales/zh-TW';

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            ja: { translation: ja },
            en: { translation: en },
            ko: { translation: ko },
            es: { translation: es },
            pt: { translation: pt },
            'zh-TW': { translation: zhTW },
        },
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
        detection: {
            order: ['localStorage', 'navigator'],
            caches: ['localStorage'],
        },
    });

export default i18n;

export const SUPPORTED_LANGUAGES = [
    { code: 'ja', label: '日本語' },
    { code: 'en', label: 'English' },
    { code: 'ko', label: '한국어' },
    { code: 'es', label: 'Español' },
    { code: 'pt', label: 'Português' },
    { code: 'zh-TW', label: '繁體中文' },
] as const;
