import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en';
import es from './locales/es';
import ja from './locales/ja';
import ko from './locales/ko';
import pt from './locales/pt';
import zhTW from './locales/zh-TW';

const resources = {
    ja: { translation: ja },
    en: { translation: en },
    ko: { translation: ko },
    es: { translation: es },
    pt: { translation: pt },
    'zh-TW': { translation: zhTW },
};

const isServer = typeof window === 'undefined';

const savedLng = (() => {
    if (isServer) return 'en';
    try { return localStorage.getItem('i18nextLng') ?? 'en'; } catch { return 'en'; }
})();

i18n.use(initReactI18next).init({
    resources,
    lng: savedLng,
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
    initImmediate: false,
});

// クライアントのみ: ブラウザ言語を後から反映
if (!isServer) {
    import('i18next-browser-languagedetector').then(({ default: LanguageDetector }) => {
        const detector = new LanguageDetector();
        detector.init({
            order: ['localStorage', 'navigator'],
            caches: ['localStorage'],
        });
        const detectedLng = detector.detect();
        const lng = Array.isArray(detectedLng) ? detectedLng[0] : detectedLng;
        if (lng && lng !== i18n.language) {
            i18n.changeLanguage(lng);
        }
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
