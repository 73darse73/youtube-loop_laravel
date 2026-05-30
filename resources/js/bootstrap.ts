import axios from 'axios';

// SSR環境（Node.js）ではwindow/localStorageが存在しないためガードする
if (typeof window !== 'undefined') {
    window.axios = axios;
    window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

    // 言語ヘッダーをサーバーに送信（バリデーションメッセージの言語切替用）
    const savedLocale = localStorage.getItem('i18nextLng') ?? 'ja';
    window.axios.defaults.headers.common['X-Locale'] = savedLocale;

    import('./i18n').then(({ default: i18n }) => {
        i18n.on('languageChanged', (lng) => {
            window.axios.defaults.headers.common['X-Locale'] = lng;
        });
    });
}
