import {
    useAppContextActions,
    useAppContextValues,
} from "@/context/appContext";
import { useBreakpoint } from "@/hooks/useBreakPoint";
import { motion } from "framer-motion";
import { ActionsViewAndSize } from "./ActionsViewAndSize/ActionsViewAndSize";
import {
    CLOSE_DURATION,
    COMPACT_HEIGHT,
    ENTER_DURATION,
    FULL_DURATION,
    FULL_HEIGHT,
    WIDTH_DURATION,
} from "./config";
import { ContentPlayer } from "./ContentPlayer/ContentPlayer";
import { useRadioContext } from "./context/RadioContext";

export const Body = () => {
    //* STATES ========================================================================
    const {
        layout,
        viewRadioController,
        menu: { openMenu },
    } = useAppContextValues();
    const isDesktop = useBreakpoint("lg");
    const { setViewRadioController } = useAppContextActions();
    const { main, menu } = layout ?? {};
    const { transitionMode, setTransitionMode } = useRadioContext();
    //* STATES ========================================================================

    //! HELPERS ========================================================================
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
    //! HELPERS ========================================================================

    return (
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
            className={`
    row-center-1
    justify-between
    fixed
    bottom-0
    left-0
    z-[1002]
    w-full
    pattern-bg
    bg-app
    border-t-1
    border-t-fg/25
    transition-[padding-bottom]
    duration-300
    ease-[cubic-bezier(0.16,1,0.3,1)]
`}
        >
            <ContentPlayer />
            <ActionsViewAndSize />
        </motion.div>
    );
};
