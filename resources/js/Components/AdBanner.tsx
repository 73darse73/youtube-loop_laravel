import { useEffect } from 'react';

declare global {
    interface Window {
        adsbygoogle: unknown[];
    }
}

type Props = {
    slot: string;
    format?: 'auto' | 'rectangle' | 'horizontal';
    className?: string;
};

export default function AdBanner({
    slot,
    format = 'auto',
    className = '',
}: Props) {
    useEffect(() => {
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch {
            // adsbygoogle not loaded yet
        }
    }, []);

    const client = import.meta.env.VITE_ADSENSE_CLIENT;
    if (!client) return null;

    return (
        <ins
            className={`adsbygoogle block ${className}`}
            data-ad-client={client}
            data-ad-slot={slot}
            data-ad-format={format}
            data-full-width-responsive="true"
        />
    );
}
