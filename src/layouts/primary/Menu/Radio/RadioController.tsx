"use client";

import { DynamicSvgIcon } from "@/components/svg/DynamicSVGIcon";
import {
    useAppContextActions,
    useAppContextValues,
} from "@/context/appContext";
import { useBreakpoint } from "@/hooks/useBreakPoint";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { ContentPlayer } from "./ContentPlayer";

const COMPACT_HEIGHT = 52;
const FULL_HEIGHT = "90dvh";

const WIDTH_DURATION = 0.22;
const FULL_DURATION = 0.28;
const CLOSE_DURATION = 0.32;
const ENTER_DURATION = 0.32;

type TransitionMode =
    | "compact-large"
    | "large-compact"
    | "large-full"
    | "full-large"
    | "compact-full-width"
    | "full-compact-height"
    | "closing"
    | null;

export const RadioController = () => {
    const {
        layout,
        viewRadioController,
        menu: { openMenu },
    } = useAppContextValues();

    const isDesktop = useBreakpoint("lg");

    const { setViewRadioController } = useAppContextActions();

    const { main, menu } = layout ?? {};

    const [transitionMode, setTransitionMode] = useState<TransitionMode>(null);

    const compactWidth = (() => {
        if (!isDesktop) {
            return main?.width ?? 0;
        }

        if (openMenu) {
            return menu?.width ?? 0;
        }

        return main?.width ?? 0;
    })();

    const expandedWidth = (() => {
        if (!isDesktop) {
            return main?.width ?? 0;
        }

        if (openMenu) {
            return (main?.width ?? 0) + (menu?.width ?? 0);
        }

        return main?.width ?? 0;
    })();

    const width = ["large", "full"].includes(viewRadioController)
        ? expandedWidth
        : compactWidth;

    const height =
        viewRadioController === "full" ? FULL_HEIGHT : COMPACT_HEIGHT;

    const widthTransition = (() => {
        switch (transitionMode) {
            case "compact-large":
            case "compact-full-width":
                return {
                    duration: WIDTH_DURATION,
                    ease: [0.22, 1, 0.36, 1] as const,
                };

            case "large-compact":
                return {
                    duration: WIDTH_DURATION,
                    ease: [0.22, 1, 0.36, 1] as const,
                };

            default:
                return {
                    duration: 0,
                };
        }
    })();

    const heightTransition = (() => {
        switch (transitionMode) {
            case "large-full":
                return {
                    duration: FULL_DURATION,
                    ease: [0.16, 1, 0.3, 1] as const,
                };

            case "full-large":
            case "full-compact-height":
                return {
                    duration: FULL_DURATION,
                    ease: [0.22, 1, 0.36, 1] as const,
                };

            default:
                return {
                    duration: 0,
                };
        }
    })();

    const arrowRotation = (() => {
        switch (viewRadioController) {
            case "compact":
                return "rotate-0";

            case "large":
                return "rotate-180";

            case "full":
                return "rotate-90";

            default:
                return "rotate-0";
        }
    })();

    const toLarge = () => {
        if (transitionMode === "closing") return;

        if (viewRadioController === "compact") {
            setTransitionMode("compact-large");
            setViewRadioController("large");
            return;
        }

        if (viewRadioController === "full") {
            setTransitionMode("full-large");
            setViewRadioController("large");
        }
    };

    const toFull = () => {
        if (transitionMode === "closing") return;

        if (viewRadioController === "compact") {
            setTransitionMode("compact-full-width");
            setViewRadioController("large");
            return;
        }

        if (viewRadioController === "large") {
            setTransitionMode("large-full");
            setViewRadioController("full");
        }
    };

    const toCompact = () => {
        if (transitionMode === "closing") return;

        if (viewRadioController === "large") {
            setTransitionMode("large-compact");
            setViewRadioController("compact");
            return;
        }

        if (viewRadioController === "full") {
            setTransitionMode("full-compact-height");
            setViewRadioController("large");
        }
    };

    const handleWidthToggle = () => {
        if (viewRadioController === "compact") {
            toLarge();
            return;
        }

        if (viewRadioController === "large" || viewRadioController === "full") {
            toCompact();
        }
    };

    const handleFullToggle = () => {
        if (viewRadioController === "full") {
            toLarge();
            return;
        }

        toFull();
    };

    const handleClose = () => {
        if (transitionMode === "closing") return;

        setTransitionMode("closing");
    };

    const handleAnimationComplete = () => {
        switch (transitionMode) {
            case "compact-full-width":
                setTransitionMode("large-full");
                setViewRadioController("full");
                return;

            case "full-compact-height":
                setTransitionMode("large-compact");
                setViewRadioController("compact");
                return;

            case "closing":
                setTransitionMode(null);
                setViewRadioController("hidden");
                return;

            default:
                setTransitionMode(null);
        }
    };

    if (viewRadioController === "hidden") {
        return null;
    }

    const isClosing = transitionMode === "closing";

    return (
        <>
            <AnimatePresence>
                {viewRadioController === "full" && (
                    <motion.button
                        type="button"
                        aria-label="Collapse radio"
                        onClick={() => {
                            if (!isClosing) {
                                toLarge();
                            }
                        }}
                        initial={{
                            opacity: 0,
                            backdropFilter: "blur(0px)",
                        }}
                        animate={{
                            opacity: isClosing ? 0 : 1,
                            backdropFilter: isClosing
                                ? "blur(0px)"
                                : "blur(10px)",
                        }}
                        exit={{
                            opacity: 0,
                            backdropFilter: "blur(0px)",
                        }}
                        transition={{
                            opacity: {
                                duration: isClosing
                                    ? CLOSE_DURATION
                                    : FULL_DURATION,
                                ease: [0.22, 1, 0.36, 1],
                            },
                            backdropFilter: {
                                duration: isClosing
                                    ? CLOSE_DURATION
                                    : FULL_DURATION,
                                ease: [0.22, 1, 0.36, 1],
                            },
                        }}
                        className="
                fixed
                inset-0
                z-[2147483646]
                border-0
                bg-black/15
                cursor-pointer
                pointer-events-auto
                touch-none
            "
                    />
                )}
            </AnimatePresence>

            <motion.div
                initial={{
                    y: "100%",
                    opacity: 0,
                }}
                animate={{
                    width,
                    height,
                    y: isClosing ? "120%" : "0%",
                    opacity: isClosing ? 0 : 1,
                }}
                transition={{
                    width: isClosing
                        ? {
                              duration: 0,
                          }
                        : widthTransition,

                    height: isClosing
                        ? {
                              duration: 0,
                          }
                        : heightTransition,

                    y: isClosing
                        ? {
                              duration: CLOSE_DURATION,
                              ease: [0.4, 0, 0.8, 0.2],
                          }
                        : {
                              duration: ENTER_DURATION,
                              ease: [0.16, 1, 0.3, 1],
                          },

                    opacity: isClosing
                        ? {
                              duration: CLOSE_DURATION * 0.8,
                              ease: "easeOut",
                          }
                        : {
                              duration: ENTER_DURATION * 0.75,
                              ease: "easeOut",
                          },
                }}
                onAnimationComplete={handleAnimationComplete}
                className="
                    row-center-1
                    justify-between
                    fixed
                    bottom-0
                    left-0
                    z-[2147483647]
                    w-full
                    p-2
                    pattern-bg
                    bg-app
                    border-t-1
                    border-t-fg/25
                "
            >
                <ContentPlayer />

                <div
                    className="
                        absolute
                        right-2
                        -top-[17px]
                        p-1
                        rounded-[4px]
                        bg-app
                        row-center-1
                        pattern-bg
                        border-1
                        border-fg/20
                    "
                >
                    {openMenu && isDesktop && (
                        <button
                            data-tooltip={
                                viewRadioController === "compact"
                                    ? "Large"
                                    : "Compact"
                            }
                            onClick={handleWidthToggle}
                            className="
                                rounded-[4px]
                                bg-fg/10
                                p-1
                                hover:cursor-pointer
                                hover:bg-fg/20
                            "
                        >
                            <DynamicSvgIcon
                                name="arr.svg"
                                className={`
                                    w-4
                                    h-4
                                    fill-fg
                                    transition-transform
                                    duration-200
                                    ${arrowRotation}
                                `}
                            />
                        </button>
                    )}

                    <button
                        data-tooltip={
                            viewRadioController === "full" ? "Large" : "Full"
                        }
                        onClick={handleFullToggle}
                        className="
                            rounded-[4px]
                            bg-fg/10
                            p-1
                            hover:cursor-pointer
                            hover:bg-fg/20
                        "
                    >
                        <DynamicSvgIcon
                            name={
                                viewRadioController === "full"
                                    ? "collapse.svg"
                                    : "fullscreen.svg"
                            }
                            className="w-4 h-4 fill-fg"
                        />
                    </button>

                    <button
                        onClick={handleClose}
                        className="
                            rounded-[4px]
                            bg-fg/10
                            p-1
                            hover:cursor-pointer
                            hover:bg-fg/20
                        "
                    >
                        <DynamicSvgIcon
                            name="close.svg"
                            className="w-4 h-4 fill-fg"
                        />
                    </button>
                </div>
            </motion.div>
        </>
    );
};
