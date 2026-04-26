import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import YouTube, { YouTubeEvent, YouTubeProps } from 'react-youtube';

interface Props {
    videoId: string;
    startTime: number;
    endTime: number;
    onSave?: () => void;
    isAtLimit?: boolean;
    limitMessage?: string;
}

export default function YouTubePlayer({
    videoId,
    startTime,
    endTime,
    onSave,
    isAtLimit = false,
    limitMessage,
}: Props) {
    const { t } = useTranslation();
    const playerRef = useRef<ReturnType<
        YouTubeEvent['target']['getIframe']
    > | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const intervalRef = useRef<number | null>(null);

    const opts: YouTubeProps['opts'] = {
        height: '100%',
        width: '100%',
        playerVars: {
            start: Math.floor(startTime),
            autoplay: 0,
        },
    };

    const stopLoop = () => {
        if (intervalRef.current !== null) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    const startLoop = () => {
        if (intervalRef.current !== null) return;
        intervalRef.current = window.setInterval(() => {
            if (!playerRef.current) return;
            const current = playerRef.current.getCurrentTime();
            if (current >= endTime) {
                playerRef.current.seekTo(startTime, true);
            }
        }, 100);
    };

    const onReady: YouTubeProps['onReady'] = (event) => {
        playerRef.current = event.target;
    };

    const onStateChange: YouTubeProps['onStateChange'] = (event) => {
        const state = event.target.getPlayerState();
        if (state === 1) {
            setIsPlaying(true);
            startLoop();
        } else {
            setIsPlaying(false);
            if (state === 2) stopLoop();
        }
    };

    const handlePlayPause = () => {
        if (!playerRef.current) return;
        isPlaying
            ? playerRef.current.pauseVideo()
            : playerRef.current.playVideo();
    };

    useEffect(() => {
        return () => stopLoop();
    }, []);

    useEffect(() => {
        stopLoop();
        playerRef.current?.seekTo(startTime, true);
    }, [videoId, startTime, endTime]);

    return (
        <div className="space-y-4">
            <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black">
                <YouTube
                    videoId={videoId}
                    opts={opts}
                    onReady={onReady}
                    onStateChange={onStateChange}
                    className="h-full w-full"
                    iframeClassName="w-full h-full"
                />
            </div>
            <div className="flex items-center justify-center gap-4">
                <button
                    onClick={handlePlayPause}
                    className="inline-flex items-center gap-2 rounded-md bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-700"
                >
                    {isPlaying ? t('player.pause') : t('player.play')}
                </button>
                <span className="text-sm text-gray-500">
                    {t('player.loopRange', {
                        start: Math.floor(startTime),
                        end: Math.floor(endTime),
                    })}
                </span>
                <div className="flex flex-col items-end gap-1">
                    <button
                        onClick={isAtLimit ? undefined : onSave}
                        disabled={isAtLimit}
                        className="rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-40"
                    >
                        💾 保存
                    </button>
                    {isAtLimit && limitMessage && (
                        <p className="text-xs text-red-500">{limitMessage}</p>
                    )}
                </div>
            </div>
        </div>
    );
}
