import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en';
import es from './locales/es';
import ja from './locales/ja';
import ko from './locales/ko';
import pt from './locales/pt';
import zhTW from './locales/zh-TW';

const isServer = typeof window === 'undefined';

// SSR環境（Node.js）ではlocalStorage/navigatorが存在しないため
// LanguageDetectorを使わずデフォルト言語で初期化する
const i18nInstance = i18n.use(initReactI18next);

if (!isServer) {
    // クライアントのみ: 動的importでLanguageDetectorを追加
    // initより前に登録する必要があるため同期的に処理する
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const LanguageDetector = require('i18next-browser-languagedetector').default;
    i18nInstance.use(LanguageDetector);
}

i18nInstance.init({
    resources: {
        ja: { translation: ja },
        en: { translation: en },
        ko: { translation: ko },
        es: { translation: es },
        pt: { translation: pt },
        'zh-TW': { translation: zhTW },
    },
    lng: isServer ? 'en' : undefined,
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false,
    },
    detection: isServer
        ? undefined
        : {
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
