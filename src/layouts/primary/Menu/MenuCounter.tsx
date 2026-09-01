"use client";

import { DynamicSvgIcon } from "@/components/svg/DynamicSVGIcon";
import { useAppContextValues } from "@/context/appContext";
import { motion } from "framer-motion";
import {
    type RefObject,
    useCallback,
    useEffect,
    useId,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
} from "react";

import styles from "./Menu.module.css";

const BUTTON_WIDTH = 44;
const BUTTON_HEIGHT = 58;
const BORDER_OFFSET = 0.75;

const RELEASE_DISTANCE = 18;
const RELEASE_STRETCH_DURATION = 120;

const followTransition = {
    type: "spring",
    stiffness: 185,
    damping: 14,
    mass: 0.65,
} as const;

const releaseStretchTransition = {
    type: "spring",
    stiffness: 330,
    damping: 15,
    mass: 0.45,
} as const;

const settleTransition = {
    type: "spring",
    stiffness: 150,
    damping: 9,
    mass: 0.9,
} as const;

const collapseTransition = {
    type: "spring",
    stiffness: 220,
    damping: 20,
    mass: 0.7,
} as const;

type PointerPosition = {
    x: number;
    y: number;
    active: boolean;
    exitStretch: boolean;
};

type FramePathOptions = PointerPosition & {
    width: number;
    height: number;
    reveal: number;
};

interface MenuContourProps {
    panelRef: RefObject<HTMLDivElement | null>;
    open: boolean;
    noneAnimation: boolean;
    allowAction: boolean;
}

const neutralPointer: PointerPosition = {
    x: 0.5,
    y: 0.5,
    active: false,
    exitStretch: false,
};

const clamp = (value: number, min: number, max: number) =>
    Math.min(max, Math.max(min, value));

const createFramePath = ({
    width,
    height,
    x,
    y,
    active,
    exitStretch,
    reveal,
}: FramePathOptions) => {
    const visibility = clamp(reveal, 0, 1);
    const activity = active ? visibility : 0;

    const exitForce = exitStretch ? visibility : 0;

    const pointerX = clamp((x - 0.5) * 2, -1, 1);

    const pointerY = clamp((y - 0.5) * 2, -1, 1);

    const horizontalPull =
        activity * (3.2 + Math.max(-0.25, pointerX) * 4) + exitForce * 7;

    const verticalPull = activity * pointerY * 5.5 + exitForce * pointerY * 2.5;

    const topPressure = activity * Math.max(0, -pointerY) * 3;

    const bottomPressure = activity * Math.max(0, pointerY) * 3;

    const left = BORDER_OFFSET;
    const top = BORDER_OFFSET;
    const right = width - BORDER_OFFSET;
    const bottom = height - BORDER_OFFSET;

    const buttonTop = height - BUTTON_HEIGHT;

    const startY = buttonTop + 7.5;

    const shoulderY = buttonTop + 22 + verticalPull * 0.18;

    const tipY = buttonTop + 41 + verticalPull;

    const outerX = 31.5 + horizontalPull;

    const outerControlX = outerX + activity * 1.5 + exitForce * 2;

    const shoulderX = 10.5 + topPressure + horizontalPull * 0.16;

    const bottomShoulderX = 10.5 + bottomPressure + horizontalPull * 0.12;

    const morphX = (localX: number) => right + localX * visibility;

    return `
        M ${left} ${top}
        H ${right}
        V ${startY}

        C
            ${right}
            ${buttonTop + 15 - topPressure * 0.2}

            ${morphX(4 + topPressure)}
            ${buttonTop + 20 - topPressure * 0.12}

            ${morphX(shoulderX)}
            ${shoulderY}

        C
            ${morphX(18 + horizontalPull * 0.3)}
            ${buttonTop + 25 + verticalPull * 0.35}

            ${morphX(outerX)}
            ${buttonTop + 30 + verticalPull * 0.7}

            ${morphX(outerX)}
            ${tipY}

        C
            ${morphX(outerControlX)}
            ${tipY + 8}

            ${morphX(bottomShoulderX)}
            ${bottom}

            ${right}
            ${bottom}

        H ${left}
        V ${top}
        Z
    `;
};

export const MenuContour = ({
    panelRef,
    open,
    noneAnimation,
    allowAction,
}: MenuContourProps) => {
    const actionRef = useRef<HTMLButtonElement>(null);

    const interactionActiveRef = useRef(false);

    const releaseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const generatedId = useId().replaceAll(":", "");

    const noiseFilterId = `menu-contour-noise-filter-${generatedId}`;

    const noisePatternId = `menu-contour-noise-pattern-${generatedId}`;

    const { header } = useAppContextValues();

    const { isScrolled } = header || {};

    const { main, scroll } = isScrolled || {};

    const [size, setSize] = useState({
        width: 0,
        height: 0,
    });

    const [pointer, setPointer] = useState<PointerPosition>(neutralPointer);

    const actionVisible = Boolean(
        open && allowAction && (scroll?.scrollTop ?? 0) > 100,
    );

    const clearReleaseTimer = useCallback(() => {
        if (!releaseTimerRef.current) {
            return;
        }

        clearTimeout(releaseTimerRef.current);

        releaseTimerRef.current = null;
    }, []);

    useLayoutEffect(() => {
        const panel = panelRef.current;

        if (!panel) {
            return;
        }

        let animationFrame = 0;

        const updateSize = () => {
            cancelAnimationFrame(animationFrame);

            animationFrame = requestAnimationFrame(() => {
                const nextWidth = Math.round(panel.offsetWidth);

                const nextHeight = Math.round(panel.offsetHeight);

                setSize((current) => {
                    if (
                        current.width === nextWidth &&
                        current.height === nextHeight
                    ) {
                        return current;
                    }

                    return {
                        width: nextWidth,
                        height: nextHeight,
                    };
                });
            });
        };

        const observer = new ResizeObserver(updateSize);

        observer.observe(panel);

        window.addEventListener("resize", updateSize);

        updateSize();

        return () => {
            cancelAnimationFrame(animationFrame);

            observer.disconnect();

            window.removeEventListener("resize", updateSize);
        };
    }, [panelRef]);

    const triggerRelease = useCallback(() => {
        interactionActiveRef.current = false;

        clearReleaseTimer();

        setPointer((current) => ({
            ...current,
            active: false,
            exitStretch: true,
        }));

        releaseTimerRef.current = setTimeout(() => {
            setPointer(neutralPointer);

            releaseTimerRef.current = null;
        }, RELEASE_STRETCH_DURATION);
    }, [clearReleaseTimer]);

    const updatePointer = useCallback(
        (clientX: number, clientY: number, checkReleaseDistance: boolean) => {
            const action = actionRef.current;

            if (!action) {
                return;
            }

            const bounds = action.getBoundingClientRect();

            const distanceX =
                clientX < bounds.left
                    ? bounds.left - clientX
                    : clientX > bounds.right
                      ? clientX - bounds.right
                      : 0;

            const distanceY =
                clientY < bounds.top
                    ? bounds.top - clientY
                    : clientY > bounds.bottom
                      ? clientY - bounds.bottom
                      : 0;

            const distance = Math.hypot(distanceX, distanceY);

            if (checkReleaseDistance && distance > RELEASE_DISTANCE) {
                triggerRelease();
                return;
            }

            setPointer({
                x: clamp((clientX - bounds.left) / bounds.width, 0, 1),

                y: clamp((clientY - bounds.top) / bounds.height, 0, 1),

                active: true,
                exitStretch: false,
            });
        },
        [triggerRelease],
    );

    useEffect(() => {
        if (!actionVisible) {
            interactionActiveRef.current = false;

            clearReleaseTimer();

            // eslint-disable-next-line
            setPointer((current) => {
                if (
                    !current.active &&
                    !current.exitStretch &&
                    current.x === 0.5 &&
                    current.y === 0.5
                ) {
                    return current;
                }

                return neutralPointer;
            });

            return;
        }

        const handleWindowPointerMove = (event: PointerEvent) => {
            if (!interactionActiveRef.current) {
                return;
            }

            updatePointer(event.clientX, event.clientY, true);
        };

        window.addEventListener("pointermove", handleWindowPointerMove, {
            passive: true,
        });

        return () => {
            window.removeEventListener("pointermove", handleWindowPointerMove);
        };
    }, [actionVisible, clearReleaseTimer, updatePointer]);

    useEffect(() => {
        return () => {
            clearReleaseTimer();
        };
    }, [clearReleaseTimer]);

    const path = useMemo(() => {
        if (!size.width || !size.height) {
            return "";
        }

        return createFramePath({
            ...pointer,
            width: size.width,
            height: size.height,
            reveal: actionVisible ? 1 : 0,
        });
    }, [actionVisible, pointer, size]);

    const shapeTransition = !actionVisible
        ? collapseTransition
        : pointer.exitStretch
          ? releaseStretchTransition
          : pointer.active
            ? followTransition
            : settleTransition;

    const frameTransition = noneAnimation ? "none" : "clip-path 0.35s ease";

    const totalWidth = size.width + (allowAction ? BUTTON_WIDTH : 0);

    const handleClick = () => {
        main?.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    if (!path || !size.width || !size.height) {
        return null;
    }

    const frameStyle = {
        width: totalWidth,
        height: size.height,

        clipPath: open ? "inset(0 0 0 0)" : "inset(0 100% 0 0)",

        transition: frameTransition,
    };

    return (
        <>
            <div className={styles.contourSurface} style={frameStyle}>
                <svg
                    aria-hidden="true"
                    className={styles.contourSvg}
                    viewBox={`0 0 ${totalWidth} ${size.height}`}
                    preserveAspectRatio="none"
                >
                    <defs>
                        <filter
                            id={noiseFilterId}
                            x="0"
                            y="0"
                            width="160"
                            height="160"
                            filterUnits="userSpaceOnUse"
                            colorInterpolationFilters="sRGB"
                        >
                            <feTurbulence
                                type="fractalNoise"
                                baseFrequency="0.8"
                                numOctaves="4"
                                stitchTiles="stitch"
                                result="noise"
                            />

                            <feColorMatrix
                                in="noise"
                                type="luminanceToAlpha"
                                result="noiseAlpha"
                            />

                            <feComposite
                                in="SourceGraphic"
                                in2="noiseAlpha"
                                operator="in"
                            />
                        </filter>

                        <pattern
                            id={noisePatternId}
                            x="0"
                            y="0"
                            width="160"
                            height="160"
                            patternUnits="userSpaceOnUse"
                        >
                            <rect
                                x="0"
                                y="0"
                                width="160"
                                height="160"
                                fill="var(--foreground)"
                                opacity="0.1"
                                filter={`url(#${noiseFilterId})`}
                            />
                        </pattern>
                    </defs>

                    <motion.path
                        className="fill-app"
                        initial={false}
                        animate={{
                            d: path,
                        }}
                        transition={shapeTransition}
                    />

                    <motion.path
                        initial={false}
                        animate={{
                            d: path,
                        }}
                        transition={shapeTransition}
                        fill={`url(#${noisePatternId})`}
                        pointerEvents="none"
                    />
                </svg>
            </div>

            <div className={styles.contourBorder} style={frameStyle}>
                <svg
                    aria-hidden="true"
                    className={styles.contourSvg}
                    viewBox={`0 0 ${totalWidth} ${size.height}`}
                    preserveAspectRatio="none"
                >
                    <motion.path
                        className="
                            fill-none
                            stroke-fg/15
                        "
                        initial={false}
                        animate={{
                            d: path,
                        }}
                        transition={shapeTransition}
                        strokeWidth="1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        vectorEffect="non-scaling-stroke"
                    />
                </svg>
            </div>

            {allowAction && (
                <motion.button
                    ref={actionRef}
                    type="button"
                    aria-label="Scroll to top"
                    aria-hidden={!actionVisible}
                    tabIndex={actionVisible ? 0 : -1}
                    className={`
                        group
                        ${styles.actionButton}
                    `}
                    style={{
                        left: size.width,

                        pointerEvents: actionVisible ? "auto" : "none",

                        WebkitAppearance: "none",

                        WebkitTapHighlightColor: "transparent",
                    }}
                    initial={false}
                    animate={{
                        opacity: actionVisible ? 1 : 0,
                    }}
                    transition={{
                        opacity: {
                            duration: actionVisible ? 0.16 : 0.08,

                            delay: actionVisible ? 0.08 : 0,
                        },
                    }}
                    onClick={handleClick}
                    onPointerEnter={(event) => {
                        clearReleaseTimer();

                        interactionActiveRef.current = true;

                        updatePointer(event.clientX, event.clientY, false);
                    }}
                >
                    <motion.span
                        className={styles.actionIcon}
                        animate={{
                            x: pointer.active ? (pointer.x - 0.5) * 5 : 0,

                            y: pointer.active ? (pointer.y - 0.5) * 4 : 0,
                        }}
                        transition={shapeTransition}
                    >
                        <DynamicSvgIcon
                            name="up.svg"
                            className="
                                size-full
                                fill-fg
                                opacity-70
                                transition-opacity
                                group-hover:opacity-100
                            "
                        />
                    </motion.span>
                </motion.button>
            )}
        </>
    );
};
