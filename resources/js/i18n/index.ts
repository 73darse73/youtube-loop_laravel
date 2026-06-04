import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en';
import es from './locales/es';
import ja from './locales/ja';
import ko from './locales/ko';
import pt from './locales/pt';
import zhTW from './locales/zh-TW';

const isServer = typeof window === 'undefined';

const resources = {
    ja: { translation: ja },
    en: { translation: en },
    ko: { translation: ko },
    es: { translation: es },
    pt: { translation: pt },
    'zh-TW': { translation: zhTW },
};

if (isServer) {
    // SSR環境（Node.js）: LanguageDetectorは不要。同期的に初期化する
    i18n.use(initReactI18next).init({
        resources,
        lng: 'en',
        fallbackLng: 'en',
        interpolation: { escapeValue: false },
    });
} else {
    // クライアント環境: require() はESMバンドルでエラーになるため
    // 動的 import() で LanguageDetector を読み込んでから初期化する
    import('i18next-browser-languagedetector').then(({ default: LanguageDetector }) => {
        i18n
            .use(LanguageDetector)
            .use(initReactI18next)
            .init({
                resources,
                fallbackLng: 'en',
                interpolation: { escapeValue: false },
                detection: {
                    order: ['localStorage', 'navigator'],
                    caches: ['localStorage'],
                },
            });
    });
}

export default i18n;

export const SUPPORTED_LANGUAGES = [
    { code: 'ja', label: '日本語' },
    { code: 'en', label: 'English' },
    { code: 'ko', label: '한국어' },
    { code: 'es', label: 'Español' },
    { code: 'pt', label: 'Português' },
    { code: 'zh-TW', label: '繁體中文' },
] as const;
