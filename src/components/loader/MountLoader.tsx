"use client";

import { useAppContextActions } from "@/context/appContext";
import { motion } from "framer-motion";
import { useLayoutEffect, useState } from "react";

import { Loader } from "../animationIcons/Loader/Loader";

const MIN_LOADER_DURATION = 300;
const CONTENT_OUT_DURATION = 300;
const OVERLAY_OUT_DURATION = 300;

const LOADER_TAG = "mount-loader";

type LoaderPhase = "active" | "contentOut" | "overlayOut" | "idle";

export const MountLoader = () => {
    const [phase, setPhase] = useState<LoaderPhase>("active");

    const { startLoader, finishLoader } = useAppContextActions();

    useLayoutEffect(() => {
        startLoader({
            tag: LOADER_TAG,
        });

        const timeoutId = window.setTimeout(() => {
            setPhase("contentOut");
        }, MIN_LOADER_DURATION);

        return () => {
            window.clearTimeout(timeoutId);

            finishLoader({
                tag: LOADER_TAG,
            });
        };
    }, [startLoader, finishLoader]);

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
                if (phase !== "overlayOut" || overlayVisible) {
                    return;
                }

                finishLoader({
                    tag: LOADER_TAG,
                });

                setPhase("idle");
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
                    if (phase !== "contentOut" || contentVisible) {
                        return;
                    }

                    setPhase("overlayOut");
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
                <Loader visible mode="explode" />
            </motion.div>
        </motion.div>
    );
};
