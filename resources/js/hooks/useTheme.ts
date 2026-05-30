import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

export function useTheme() {
    const [theme, setTheme] = useState<Theme>(() => {
        // SSR環境（Node.js）ではlocalStorageが存在しないためガードする
        if (typeof window === 'undefined') return 'light';
        const saved = localStorage.getItem('theme') as Theme | null;
        if (saved) return saved;
        return 'light';
    });

    useEffect(() => {
        const root = document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggle = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

    return { theme, toggle };
}
