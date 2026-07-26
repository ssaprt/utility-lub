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
                bg-[linear-gradient(283deg,rgba(115,86,209,1)_0%,rgba(134,84,179,1)_35%,rgba(82,56,128,1)_74%,rgba(112,38,133,1)_100%)]
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
                        border-pink-300/20
                        border-t-pink-300
                        will-change-transform
                    "
                />
            </motion.div>
        </motion.div>
    );
};
