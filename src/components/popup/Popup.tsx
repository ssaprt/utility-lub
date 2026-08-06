"use client";

import {
    CSSProperties,
    memo,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
    type AnimationEvent,
} from "react";
import { createPortal, flushSync } from "react-dom";
import "./animations.css";
import { merge } from "./merge";
import "./popup.css";
import { PopupCloseTimerRender, PopupInterface } from "./popup.interface";

type PopupPhase = "hidden" | "opening" | "open" | "closing";

interface CloseTimerState {
    remainingMs: number;
    progress: number;
}

interface CloseTimerProps {
    duration: number;
    render?: PopupCloseTimerRender;
    style: CSSProperties;
    className: string;
    onComplete: () => void;
}

const parseTime = (value?: `${number}ms` | `${number}s`) => {
    if (!value) {
        return 0;
    }

    const parsedValue = Number.parseFloat(value);

    if (!Number.isFinite(parsedValue)) {
        return 0;
    }

    return value.endsWith("ms") ? parsedValue : parsedValue * 1000;
};

const CloseTimer = memo(
    ({
        duration,
        render: TimerComponent,
        style,
        className,
        onComplete,
    }: CloseTimerProps) => {
        const [timerState, setTimerState] = useState<CloseTimerState>({
            remainingMs: duration,
            progress: 1,
        });

        const completedRef = useRef(false);
        const animationFrameRef = useRef<number | null>(null);

        useEffect(() => {
            completedRef.current = false;

            if (duration <= 0) {
                onComplete();
                return;
            }

            const startedAt = performance.now();

            const updateTimer = (currentTime: number) => {
                const elapsed = currentTime - startedAt;

                const remainingMs = Math.max(0, duration - elapsed);

                const progress = Math.max(
                    0,
                    Math.min(1, remainingMs / duration),
                );

                setTimerState({
                    remainingMs,
                    progress,
                });

                if (remainingMs <= 0) {
                    if (!completedRef.current) {
                        completedRef.current = true;
                        onComplete();
                    }

                    animationFrameRef.current = null;

                    return;
                }

                animationFrameRef.current = requestAnimationFrame(updateTimer);
            };

            animationFrameRef.current = requestAnimationFrame(updateTimer);

            return () => {
                if (animationFrameRef.current === null) {
                    return;
                }

                cancelAnimationFrame(animationFrameRef.current);

                animationFrameRef.current = null;
            };
        }, [duration, onComplete]);

        const seconds = Math.max(0, Math.ceil(timerState.remainingMs / 1000));

        if (TimerComponent) {
            return (
                <TimerComponent
                    seconds={seconds}
                    remainingMs={timerState.remainingMs}
                    duration={duration}
                    progress={timerState.progress}
                    style={style}
                    className={className}
                />
            );
        }

        const strokeDashoffset = 1 - timerState.progress;

        return (
            <div
                role="timer"
                aria-live="off"
                aria-label={`${seconds} seconds before close button appears`}
                className={["ssaprt-popup__close-timer", className]
                    .filter(Boolean)
                    .join(" ")}
                style={style}
            >
                <svg
                    className="ssaprt-popup__close-timer-svg"
                    viewBox="0 0 40 40"
                    aria-hidden="true"
                >
                    <circle
                        className="ssaprt-popup__close-timer-track"
                        cx="20"
                        cy="20"
                        r="17"
                    />

                    <circle
                        className="ssaprt-popup__close-timer-progress"
                        cx="20"
                        cy="20"
                        r="17"
                        pathLength={1}
                        strokeDasharray="1 1"
                        strokeDashoffset={strokeDashoffset}
                        style={{
                            vectorEffect: "none",
                        }}
                    />
                </svg>

                <span className="ssaprt-popup__close-timer-value">
                    {seconds}
                </span>
            </div>
        );
    },
);

CloseTimer.displayName = "CloseTimer";

export const Popup = ({
    children,
    isOpen,
    open,
    index,
    animation,
    layer,
    close,
    customStyle,
    size,
    header,
}: PopupInterface) => {
    const [body, setBody] = useState<HTMLBodyElement | null>(null);

    const [phase, setPhase] = useState<PopupPhase>("hidden");

    const [closeUnlocked, setCloseUnlocked] = useState(false);

    const layerRef = useRef<HTMLDivElement>(null);

    const config = useMemo(
        () =>
            merge({
                index,
                animation,
                layer,
                close,
                customStyle,
                size,
            }),
        [index, animation, layer, close, customStyle, size],
    );

    const isOpening = phase === "opening";

    const isClosing = phase === "closing";

    const isAnimating = isOpening || isClosing;

    const currentAnimation = isClosing
        ? config.animation.close
        : config.animation.open;

    const closeTimerDuration = parseTime(config.close.timeOutShow);

    const hasCloseTimer = closeTimerDuration > 0;

    const showTimer = hasCloseTimer && !closeUnlocked && !isClosing;

    const showCloseButton = closeUnlocked && !isClosing;

    const handleTimerComplete = useCallback(() => {
        setCloseUnlocked(true);
    }, []);

    useEffect(() => {
        const bodyElement = document.querySelector("body") as HTMLBodyElement;

        if (!bodyElement) {
            return;
        }

        //eslint-disable-next-line
        setBody(bodyElement);
    }, []);

    useEffect(() => {
        if (isOpen) {
            //eslint-disable-next-line
            setCloseUnlocked(!hasCloseTimer);

            setPhase((currentPhase) => {
                if (currentPhase === "hidden" || currentPhase === "closing") {
                    return "opening";
                }

                return currentPhase;
            });

            return;
        }

        setPhase((currentPhase) => {
            if (currentPhase === "opening" || currentPhase === "open") {
                return "closing";
            }

            return currentPhase;
        });
    }, [isOpen, hasCloseTimer, closeTimerDuration]);

    const handleClose = () => {
        if (phase === "hidden" || phase === "closing" || !closeUnlocked) {
            return;
        }

        setPhase("closing");
    };

    const handleAnimationEnd = (event: AnimationEvent<HTMLDivElement>) => {
        if (event.target !== event.currentTarget) {
            return;
        }

        if (phase === "opening") {
            setPhase("open");
            return;
        }

        if (phase !== "closing") {
            return;
        }

        layerRef.current?.style.setProperty("pointer-events", "none");

        flushSync(() => {
            setPhase("hidden");
            open(false);
        });
    };

    if (!body || phase === "hidden") {
        return null;
    }

    const CloseComponent = config.close.render;

    const TimerComponent = config.close.timer.render;

    const layerClassName = [
        "ssaprt-popup__layer",
        isOpening ? "ssaprt-popup__layer--opening" : "",
        isClosing ? "ssaprt-popup__layer--closing" : "",
        config.layer.className,
    ]
        .filter(Boolean)
        .join(" ");

    const containerClassName = [
        "ssaprt-popup__container",
        isAnimating ? "animate" : "",
        isAnimating
            ? `ssaprt-popup--animate-${currentAnimation.animationName}`
            : "",
        config.customStyle.container.className,
    ]
        .filter(Boolean)
        .join(" ");

    const closeClassName = [
        "ssaprt-popup__close",
        !isClosing ? "ssaprt-popup__close--visible" : "",
        showTimer ? "ssaprt-popup__close--timer" : "",
        config.close.className,
    ]
        .filter(Boolean)
        .join(" ");

    return createPortal(
        <div
            ref={layerRef}
            className={layerClassName}
            style={
                {
                    ...config.layer.style,
                    zIndex: config.index,
                    "--ssaprt-popup-layer-background":
                        config.layer.backgroundColor,
                    "--ssaprt-popup-layer-blur": config.layer.blur,
                    "--ssaprt-popup-layer-duration": currentAnimation.duration,
                    "--ssaprt-popup-layer-easing": currentAnimation.easing,
                } as CSSProperties
            }
        >
            <div
                className={containerClassName}
                style={
                    {
                        ...config.customStyle.container.style,
                        "--animation-duration": currentAnimation.duration,
                        "--animation-easing": currentAnimation.easing,
                    } as CSSProperties
                }
                onAnimationEnd={handleAnimationEnd}
            >
                <div className={closeClassName} style={config.close.style}>
                    {showTimer && (
                        <CloseTimer
                            key={closeTimerDuration}
                            duration={closeTimerDuration}
                            render={TimerComponent}
                            style={config.close.timer.style}
                            className={config.close.timer.className}
                            onComplete={handleTimerComplete}
                        />
                    )}

                    {showCloseButton &&
                        (CloseComponent ? (
                            <CloseComponent close={handleClose} />
                        ) : (
                            <button
                                type="button"
                                aria-label="Close popup"
                                className="ssaprt-popup__close-button"
                                onClick={handleClose}
                            >
                                {config.close.icon ?? (
                                    <span
                                        className="ssaprt-popup__close-icon"
                                        aria-hidden="true"
                                    >
                                        ×
                                    </span>
                                )}
                            </button>
                        ))}
                </div>

                {header && (
                    <div
                        className={[
                            "ssaprt-popup__header",
                            config.customStyle.header.className,
                        ]
                            .filter(Boolean)
                            .join(" ")}
                        style={config.customStyle.header.style}
                    >
                        {header.content}
                    </div>
                )}

                <div
                    className={[
                        "ssaprt-popup__body",
                        config.customStyle.body.className,
                    ]
                        .filter(Boolean)
                        .join(" ")}
                    style={config.customStyle.body.style}
                >
                    {children}
                </div>
            </div>
        </div>,
        body,
    );
};
