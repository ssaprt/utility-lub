"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { Loader } from "../animationIcons/Loader/Loader";

const MIN_LOADER_DURATION = 300;
const CONTENT_OUT_DURATION = 300;
const OVERLAY_OUT_DURATION = 300;

type LoaderPhase = "active" | "contentOut" | "overlayOut" | "idle";

export const MountLoader = () => {
    const [phase, setPhase] = useState<LoaderPhase>("active");

    useEffect(() => {
        const timeoutId = window.setTimeout(() => {
            setPhase("contentOut");
        }, MIN_LOADER_DURATION);

        return () => {
            window.clearTimeout(timeoutId);
        };
    }, []);

    if (phase === "idle") {
        return null;
    }

    const contentVisible = phase === "active";

    const overlayVisible = phase === "active" || phase === "contentOut";

    return (
        <motion.div
            data-pagefind-ignore
            initial={false}
            animate={{
                opacity: overlayVisible ? 1 : 0,
            }}
            transition={{
                opacity: {
                    duration: overlayVisible ? 0 : OVERLAY_OUT_DURATION / 1000,
                    ease: "easeOut",
                },
            }}
            onAnimationComplete={() => {
                if (phase === "overlayOut" && !overlayVisible) {
                    setPhase("idle");
                }
            }}
            className="
                pointer-events-none
                absolute
                inset-0
                z-[9999999]
                overflow-hidden
                bg-app
                will-change-[opacity]
            "
        >
            <motion.div
                initial={false}
                animate={{
                    opacity: contentVisible ? 1 : 0,
                }}
                transition={{
                    opacity: {
                        duration: contentVisible
                            ? 0
                            : CONTENT_OUT_DURATION / 1000,
                        ease: "easeOut",
                    },
                }}
                onAnimationComplete={() => {
                    if (phase === "contentOut" && !contentVisible) {
                        setPhase("overlayOut");
                    }
                }}
                className="
                    absolute
                    inset-0
                    flex
                    items-center
                    justify-center
                    will-change-[opacity]
                "
            >
                <Loader visible mode="space" />

                <div
                    className="
                        relative
                        z-[1]
                        size-10
                        shrink-0
                        animate-spin
                        rounded-full
                        border-4
                        border-fg/20
                        border-t-fg
                        will-change-transform
                    "
                />
            </motion.div>
        </motion.div>
    );
};
