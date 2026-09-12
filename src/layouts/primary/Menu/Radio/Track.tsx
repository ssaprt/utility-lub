"use client";

import { useAppContextValues } from "@/context/appContext";
import { MouseEvent, useEffect, useRef, useState } from "react";

const TRACK_DURATION = 3 * 60 + 14;
const UPDATE_INTERVAL = 50;

export const Track = () => {
    const [currentTime, setCurrentTime] = useState(0);
    const [hoverProgress, setHoverProgress] = useState<number | null>(null);
    const { viewRadioController } = useAppContextValues();

    const startedAtRef = useRef<number | null>(null);
    const startTimeRef = useRef(0);

    useEffect(() => {
        startedAtRef.current = performance.now();

        const interval = setInterval(() => {
            if (startedAtRef.current === null) {
                return;
            }

            const elapsed =
                startTimeRef.current +
                (performance.now() - startedAtRef.current) / 1000;

            if (elapsed >= TRACK_DURATION) {
                setCurrentTime(TRACK_DURATION);
                clearInterval(interval);
                return;
            }

            setCurrentTime(elapsed);
        }, UPDATE_INTERVAL);

        return () => clearInterval(interval);
    }, []);

    const progress = Math.min((currentTime / TRACK_DURATION) * 100, 100);

    const getProgressFromMouse = (event: MouseEvent<HTMLDivElement>) => {
        const rect = event.currentTarget.getBoundingClientRect();

        return Math.min(
            Math.max(((event.clientX - rect.left) / rect.width) * 100, 0),
            100,
        );
    };

    const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
        setHoverProgress(getProgressFromMouse(event));
    };

    const handleMouseLeave = () => {
        setHoverProgress(null);
    };

    const handleSeek = (event: MouseEvent<HTMLDivElement>) => {
        const nextProgress = getProgressFromMouse(event);
        const nextTime = (nextProgress / 100) * TRACK_DURATION;

        setCurrentTime(nextTime);

        startTimeRef.current = nextTime;
        startedAtRef.current = performance.now();
    };

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);

        return `${minutes}:${secs.toString().padStart(2, "0")}`;
    };

    const hoverTime =
        hoverProgress !== null ? (hoverProgress / 100) * TRACK_DURATION : 0;

    const isFull = viewRadioController === "full";

    return (
        <div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={handleSeek}
            className={`
    absolute
    left-0
    w-full
    bottom-0
    bg-gradient-to-b
    from-fg/25
    via-app
    to-fg/10
    hover:cursor-pointer
    shadow-[inset_0_1px_0_rgba(255,255,255,0.08),inset_0_-1px_2px_rgba(0,0,0,0.18)]

    transition-[height]
    duration-300
    ease-out

    ${isFull ? "h-3 group-hover:h-3.5" : "h-1 group-hover:h-1.5"}
`}
        >
            <div
                className={`
                absolute
                bottom-0
                left-0
                w-full
                bg-fg/20
                transition-[height]
                duration-300
                ease-out

                ${isFull ? "h-3 group-hover:h-3.5" : "h-1 group-hover:h-1.5"}
            `}
            >
                {hoverProgress !== null && (
                    <div
                        className="
            absolute
            inset-y-0
            left-0
            pointer-events-none

            bg-gradient-to-b
            from-fg/35
            via-fg/15
            to-transparent
        "
                        style={{
                            width: `${hoverProgress}%`,
                        }}
                    />
                )}

                <div
                    className="
        absolute
        inset-y-0
        left-0
        pointer-events-none

        bg-gradient-to-b
        from-fg
        via-fg/80
        to-fg/45

        shadow-[inset_0_1px_0_rgba(255,255,255,0.16),inset_0_-2px_3px_rgba(0,0,0,0.18)]
    "
                    style={{
                        width: `${progress}%`,
                    }}
                />

                {hoverProgress !== null && (
                    <div
                        className="
                        absolute
                        top-0
                        bottom-0
                        w-[1px]
                        -translate-x-1/2
                        bg-fg
                        pointer-events-none
                    "
                        style={{
                            left: `${hoverProgress}%`,
                        }}
                    />
                )}
            </div>

            {hoverProgress !== null && (
                <div
                    className="
                    absolute
                    bottom-full
                    mb-1
                    -translate-x-1/2
                    rounded-[4px]
                    bg-fg
                    px-1.5
                    py-0.5
                    text-[10px]
                    text-app
                    pointer-events-none
                    whitespace-nowrap
                "
                    style={{
                        left: `${hoverProgress}%`,
                    }}
                >
                    {formatTime(hoverTime)}
                </div>
            )}
        </div>
    );
};
