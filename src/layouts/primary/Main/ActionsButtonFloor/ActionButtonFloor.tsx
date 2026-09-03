"use client";

import { DynamicSvgIcon } from "@/components/svg/DynamicSVGIcon";
import { useAppContextValues } from "@/context/appContext";
import { motion } from "framer-motion";
import {
    useCallback,
    useEffect,
    useId,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
} from "react";

const BUTTON_WIDTH = 54;
const BUTTON_HEIGHT = 58;

const SEAM_X = 1.25;
const RELEASE_DISTANCE = 15;
const RELEASE_STRETCH_DURATION = 22;

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

type ButtonShapeState = PointerPosition & {
    reveal: number;
};

const neutralPointer: PointerPosition = {
    x: 0.5,
    y: 0.5,
    active: false,
    exitStretch: false,
};

const clamp = (value: number, min: number, max: number) =>
    Math.min(max, Math.max(min, value));

const createButtonPaths = ({
    x,
    y,
    active,
    exitStretch,
    reveal,
}: ButtonShapeState) => {
    const visibility = clamp(reveal, 0, 1);
    const activity = active ? visibility : 0;
    const exitForce = exitStretch ? visibility : 0;

    const pointerX = clamp((x - 0.5) * 2, -1, 1);
    const pointerY = clamp((y - 0.5) * 2, -1, 1);

    const horizontalPull =
        activity * (4 + Math.max(-0.25, pointerX) * 5) + exitForce * 9;

    const verticalPull = activity * pointerY * 7 + exitForce * pointerY * 3;

    const startY = 15.5;
    const bottomY = 57.25;

    const centerY = (startY + bottomY) / 2;

    const tipY = clamp(centerY + verticalPull * 0.35, centerY - 4, centerY + 4);

    const upperRadius = tipY - startY;
    const lowerRadius = bottomY - tipY;
    const outerX = 27 + horizontalPull;

    const morphX = (value: number) => SEAM_X + (value - SEAM_X) * visibility;

    const outline = `
        M
            ${SEAM_X}
            ${startY}

        C
            ${SEAM_X}
            ${startY + upperRadius * 0.38}

            ${morphX(outerX)}
            ${tipY - upperRadius * 0.46}

            ${morphX(outerX)}
            ${tipY}

        C
            ${morphX(outerX)}
            ${tipY + lowerRadius * 0.46}

            ${SEAM_X}
            ${bottomY - lowerRadius * 0.38}

            ${SEAM_X}
            ${bottomY}
    `;

    return {
        outline,

        fill: `
            ${outline}
            H 0
            V ${startY}
            H ${SEAM_X}
            Z
        `,
    };
};

export const ActionButtonFloor = () => {
    const buttonRef = useRef<HTMLButtonElement>(null);

    const interactionActiveRef = useRef(false);

    const releaseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const generatedId = useId().replaceAll(":", "");

    const noiseFilterId = `action-button-noise-filter-${generatedId}`;

    const noisePatternId = `action-button-noise-pattern-${generatedId}`;

    const { header } = useAppContextValues();

    const { isScrolled } = header || {};
    const { main, scroll } = isScrolled || {};

    const [left, setLeft] = useState(0);

    const [pointer, setPointer] = useState<PointerPosition>(neutralPointer);

    const [shapeMounted, setShapeMounted] = useState(false);

    const visible = (scroll?.scrollTop ?? 0) > 100;

    const renderShape = visible || shapeMounted;

    const clearReleaseTimer = useCallback(() => {
        if (!releaseTimerRef.current) {
            return;
        }

        clearTimeout(releaseTimerRef.current);
        releaseTimerRef.current = null;
    }, []);

    useLayoutEffect(() => {
        if (!main) {
            return;
        }

        let animationFrame = 0;

        const updatePosition = () => {
            cancelAnimationFrame(animationFrame);

            animationFrame = requestAnimationFrame(() => {
                const nextLeft = main.getBoundingClientRect().left;

                setLeft((currentLeft) =>
                    currentLeft === nextLeft ? currentLeft : nextLeft,
                );
            });
        };

        const observer = new ResizeObserver(updatePosition);

        observer.observe(main);

        window.addEventListener("resize", updatePosition);

        updatePosition();

        return () => {
            cancelAnimationFrame(animationFrame);
            observer.disconnect();

            window.removeEventListener("resize", updatePosition);
        };
    }, [main]);

    useEffect(() => {
        if (!visible) {
            return;
        }

        // eslint-disable-next-line
        setShapeMounted(true);
    }, [visible]);

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
            const button = buttonRef.current;

            if (!button) {
                return;
            }

            const bounds = button.getBoundingClientRect();

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

            const shapeLeft = bounds.left + SEAM_X;

            const shapeWidth = bounds.width - SEAM_X;

            const nextX = clamp((clientX - shapeLeft) / shapeWidth, 0, 1);

            const nextY = clamp((clientY - bounds.top) / bounds.height, 0, 1);

            setPointer({
                x: nextX,
                y: nextY,
                active: true,
                exitStretch: false,
            });
        },
        [triggerRelease],
    );

    useEffect(() => {
        if (!visible) {
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

        const handleWindowPointerMove = (event: globalThis.PointerEvent) => {
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
    }, [clearReleaseTimer, updatePointer, visible]);

    useEffect(() => {
        return () => {
            clearReleaseTimer();
        };
    }, [clearReleaseTimer]);

    const collapsedPaths = useMemo(
        () =>
            createButtonPaths({
                ...neutralPointer,
                reveal: 0,
            }),
        [],
    );

    const paths = useMemo(
        () =>
            createButtonPaths({
                ...pointer,
                reveal: visible ? 1 : 0,
            }),
        [pointer, visible],
    );

    const shapeTransition = !visible
        ? collapseTransition
        : pointer.exitStretch
          ? releaseStretchTransition
          : pointer.active
            ? followTransition
            : settleTransition;

    const handleShapeAnimationComplete = () => {
        if (!visible) {
            setShapeMounted(false);
        }
    };

    const handleClick = () => {
        isScrolled?.main?.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    if (!main) {
        return null;
    }

    return (
        <button
            ref={buttonRef}
            type="button"
            aria-label="Scroll to top"
            aria-hidden={!visible}
            tabIndex={visible ? 0 : -1}
            className="
                group
                fixed
                bottom-[50px]
                z-[1001]
                h-[150px]
                w-[70px]
                touch-none
                appearance-none
                border-0
                bg-transparent
                p-0
                outline-none
                shadow-none
                
            "
            style={{
                left: left - SEAM_X - 0.5,
                pointerEvents: visible ? "auto" : "none",

                appearance: "none",
                WebkitAppearance: "none",
                WebkitTapHighlightColor: "transparent",

                background: "transparent",
                backgroundColor: "transparent",
                boxShadow: "none",
            }}
            onClick={handleClick}
            onPointerEnter={(event) => {
                clearReleaseTimer();

                interactionActiveRef.current = true;

                updatePointer(event.clientX, event.clientY, false);
            }}
        >
            <svg
                aria-hidden="true"
                className="
                    absolute
                    inset-0
                    block
                    size-full
                    cursor-pointer
                    overflow-visible
                    bg-transparent
                "
                style={{
                    background: "transparent",
                }}
                viewBox={`0 0 ${BUTTON_WIDTH} ${BUTTON_HEIGHT}`}
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

                {renderShape && (
                    <>
                        <motion.path
                            className="fill-app"
                            initial={{
                                d: collapsedPaths.fill,
                            }}
                            animate={{
                                d: paths.fill,
                            }}
                            transition={shapeTransition}
                        />

                        <motion.path
                            initial={{
                                d: collapsedPaths.fill,
                            }}
                            animate={{
                                d: paths.fill,
                            }}
                            transition={shapeTransition}
                            fill={`url(#${noisePatternId})`}
                            pointerEvents="none"
                        />

                        <motion.path
                            className="
                                fill-none
                                stroke-fg/15
                                transition-colors
                                duration-150
                                group-hover:stroke-fg/15
                                group-focus-visible:stroke-fg/15
                            "
                            initial={{
                                d: collapsedPaths.outline,
                            }}
                            animate={{
                                d: paths.outline,
                            }}
                            transition={shapeTransition}
                            strokeWidth="1"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            vectorEffect="non-scaling-stroke"
                            onAnimationComplete={handleShapeAnimationComplete}
                        />
                    </>
                )}
            </svg>

            <motion.div
                className="
                    pointer-events-none
                    absolute
                    left-[1px]
                    top-[79px]
                    size-[28px]
                    rounded-full
                    bg-fg/8
                    border-1
                    border-fg/12
                    transition-colors
                    duration-150
                    p-[8px]
                    group-hover:bg-fg/15
                "
                initial={false}
                animate={{
                    opacity: visible ? 1 : 0,
                    scale: visible ? 1 : 0.25,

                    x:
                        visible && pointer.active
                            ? (pointer.x - 0.5) * 5
                            : pointer.exitStretch
                              ? 4
                              : 0,

                    y: visible && pointer.active ? (pointer.y - 0.5) * 4 : 0,
                }}
                transition={{
                    opacity: {
                        duration: visible ? 0.16 : 0.08,

                        delay: visible ? 0.1 : 0,
                    },

                    scale: visible
                        ? {
                              type: "spring",
                              stiffness: 210,
                              damping: 14,
                              delay: 0.07,
                          }
                        : {
                              duration: 0.08,
                              ease: "easeOut",
                          },

                    x: shapeTransition,
                    y: shapeTransition,
                }}
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
            </motion.div>
        </button>
    );
};
