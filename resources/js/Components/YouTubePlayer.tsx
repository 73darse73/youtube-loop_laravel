import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import YouTube, { YouTubeEvent, YouTubeProps } from 'react-youtube';

interface Props {
    videoId: string;
    startTime: number;
    endTime: number;
    onSave?: () => void;
    onRangeChange?: (start: number, end: number) => void;
    isAtLimit?: boolean;
    limitMessage?: string;
}

function formatTime(seconds: number): string {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
}

type DragHandle = 'start' | 'end';

function LoopRangeSlider({
    duration,
    startTime,
    endTime,
    currentTime,
    onChange,
    onDragEnd,
}: {
    duration: number;
    startTime: number;
    endTime: number;
    currentTime: number;
    onChange: (start: number, end: number) => void;
    onDragEnd?: () => void;
}) {
    const trackRef = useRef<HTMLDivElement>(null);

    const toPercent = (t: number) =>
        duration > 0 ? Math.min(100, Math.max(0, (t / duration) * 100)) : 0;

    const toTime = (clientX: number) => {
        if (!trackRef.current) return 0;
        const rect = trackRef.current.getBoundingClientRect();
        const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
        return ratio * duration;
    };

    const handlePointerDown =
        (handle: DragHandle) => (e: React.PointerEvent) => {
            e.preventDefault();

            const onMove = (ev: PointerEvent) => {
                const time = toTime(ev.clientX);
                if (handle === 'start') {
                    onChange(Math.min(time, endTime - 1), endTime);
                } else {
                    onChange(startTime, Math.max(time, startTime + 1));
                }
            };

            const onUp = () => {
                document.removeEventListener('pointermove', onMove);
                document.removeEventListener('pointerup', onUp);
                onDragEnd?.();
            };

            document.addEventListener('pointermove', onMove);
            document.addEventListener('pointerup', onUp);
        };

    if (duration === 0) return null;

    return (
        <div className="px-1 py-3">
            <div ref={trackRef} className="relative h-1.5 rounded-full bg-gray-200">
                {/* Active range */}
                <div
                    className="absolute h-full rounded-full bg-indigo-500"
                    style={{
                        left: `${toPercent(startTime)}%`,
                        width: `${toPercent(endTime) - toPercent(startTime)}%`,
                    }}
                />
                {/* Current time indicator */}
                <div
                    className="pointer-events-none absolute top-1/2 h-3 w-0.5 -translate-y-1/2 rounded-full bg-white shadow"
                    style={{ left: `${toPercent(currentTime)}%` }}
                />
                {/* Start handle */}
                <div
                    className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 cursor-grab touch-none rounded-full border-2 border-indigo-500 bg-white shadow-md active:cursor-grabbing active:scale-110"
                    style={{ left: `${toPercent(startTime)}%` }}
                    onPointerDown={handlePointerDown('start')}
                />
                {/* End handle */}
                <div
                    className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 cursor-grab touch-none rounded-full border-2 border-indigo-500 bg-white shadow-md active:cursor-grabbing active:scale-110"
                    style={{ left: `${toPercent(endTime)}%` }}
                    onPointerDown={handlePointerDown('end')}
                />
            </div>
            <div className="mt-2 flex justify-between text-xs text-gray-400">
                <span>{formatTime(startTime)}</span>
                <span className="text-gray-300">{formatTime(duration)}</span>
                <span>{formatTime(endTime)}</span>
            </div>
        </div>
    );
}

export default function YouTubePlayer({
    videoId,
    startTime,
    endTime,
    onSave,
    onRangeChange,
    isAtLimit = false,
    limitMessage,
}: Props) {
    const { t } = useTranslation();
    const playerRef = useRef<ReturnType<
        YouTubeEvent['target']['getIframe']
    > | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(startTime);
    const intervalRef = useRef<number | null>(null);
    const timeTrackRef = useRef<number | null>(null);

    const startTimeRef = useRef(startTime);
    const endTimeRef = useRef(endTime);

    useEffect(() => {
        startTimeRef.current = startTime;
        endTimeRef.current = endTime;
    }, [startTime, endTime]);

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

    const stopTimeTrack = () => {
        if (timeTrackRef.current !== null) {
            clearInterval(timeTrackRef.current);
            timeTrackRef.current = null;
        }
    };

    const startLoop = () => {
        if (intervalRef.current !== null) return;
        intervalRef.current = window.setInterval(() => {
            if (!playerRef.current) return;
            const current = playerRef.current.getCurrentTime();
            if (current >= endTimeRef.current) {
                playerRef.current.seekTo(startTimeRef.current, true);
            }
        }, 100);
    };

    const startTimeTrack = () => {
        if (timeTrackRef.current !== null) return;
        timeTrackRef.current = window.setInterval(() => {
            if (!playerRef.current) return;
            setCurrentTime(playerRef.current.getCurrentTime());
        }, 200);
    };

    const onReady: YouTubeProps['onReady'] = (event) => {
        playerRef.current = event.target;
        const d = event.target.getDuration();
        if (d > 0) setDuration(d);
    };

    const onStateChange: YouTubeProps['onStateChange'] = (event) => {
        const state = event.target.getPlayerState();
        // duration may not be ready on onReady for some videos
        const d = event.target.getDuration();
        if (d > 0) setDuration(d);

        if (state === 1) {
            setIsPlaying(true);
            startLoop();
            startTimeTrack();
        } else {
            setIsPlaying(false);
            stopTimeTrack();
            if (state === 2) stopLoop();
        }
    };

    const handlePlayPause = () => {
        if (!playerRef.current) return;
        isPlaying
            ? playerRef.current.pauseVideo()
            : playerRef.current.playVideo();
    };

    const handleRangeChange = (start: number, end: number) => {
        onRangeChange?.(start, end);
    };

    useEffect(() => {
        return () => {
            stopLoop();
            stopTimeTrack();
        };
    }, []);

    // 動画が切り替わった時だけリセット
    useEffect(() => {
        stopLoop();
        playerRef.current?.seekTo(startTime, true);
        setCurrentTime(startTime);
    }, [videoId]);

    // 区間が変わった時は範囲外にいる場合だけシーク（再生は止めない）
    useEffect(() => {
        if (!playerRef.current) return;
        const current = playerRef.current.getCurrentTime();
        if (current < startTime || current > endTime) {
            playerRef.current.seekTo(startTime, true);
        }
    }, [startTime, endTime]);

    return (
        <div className="space-y-2">
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

            <LoopRangeSlider
                duration={duration}
                startTime={startTime}
                endTime={endTime}
                currentTime={currentTime}
                onChange={handleRangeChange}
                onDragEnd={() => playerRef.current?.playVideo()}
            />

            <div className="flex items-center justify-center gap-4">
                <button
                    onClick={handlePlayPause}
                    className="inline-flex items-center gap-2 rounded-md bg-gray-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-700"
                >
                    {isPlaying ? t('player.pause') : t('player.play')}
                </button>
                <div className="flex flex-col items-end gap-1">
                    <button
                        onClick={isAtLimit ? undefined : onSave}
                        disabled={isAtLimit}
                        className="rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-40"
                    >
                        💾 {t('common.save')}
                    </button>
                    {isAtLimit && limitMessage && (
                        <p className="text-xs text-red-500">{limitMessage}</p>
                    )}
                </div>
            </div>
        </div>
    );
}
