"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import {
    useAppContextActions,
    useAppContextValues,
} from "@/context/appContext";
import { useBreakpoint } from "@/hooks/useBreakPoint";
import { Loader } from "../animationIcons/Loader/Loader";

const OVERLAY_IN_DURATION = 100;
const LOADER_IN_DURATION = 100;
const MIN_LOADER_DURATION = 300;

const OVERLAY_OUT_DURATION = 300;

type LoaderPhase = "idle" | "active" | "loaderOut" | "overlayOut";

export const PendingLoader = () => {
    const cycleStartedAtRef = useRef(0);

    const isDesktop = useBreakpoint("lg");

    const { menu } = useAppContextValues();
    const { openMenu, pending } = menu;

    const { menu: menuActions } = useAppContextActions();
    const { setOpenMenu } = menuActions;

    const [phase, setPhase] = useState<LoaderPhase>("idle");

    useEffect(() => {
        if (!pending || phase !== "idle") {
            return;
        }

        cycleStartedAtRef.current = performance.now();
        //eslint-disable-next-line
        setPhase("active");

        if (!isDesktop && openMenu) {
            setOpenMenu(false);
        }
    }, [pending, phase, openMenu, isDesktop, setOpenMenu]);

    useEffect(() => {
        if (pending || phase !== "active") {
            return;
        }

        const elapsed = performance.now() - cycleStartedAtRef.current;

        const minimumDuration =
            OVERLAY_IN_DURATION + LOADER_IN_DURATION + MIN_LOADER_DURATION;

        const remaining = Math.max(0, minimumDuration - elapsed);

        const timeoutId = window.setTimeout(() => {
            setPhase("loaderOut");
        }, remaining);

        return () => {
            window.clearTimeout(timeoutId);
        };
    }, [pending, phase]);

    if (phase === "idle") {
        return null;
    }

    const overlayVisible = phase === "active" || phase === "loaderOut";

    const loaderVisible = phase === "active";

    return (
        <motion.div
            initial={false}
            animate={{
                opacity: overlayVisible ? 1 : 0,
            }}
            transition={{
                duration: overlayVisible ? 0 : OVERLAY_OUT_DURATION / 1000,
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
                !z-[9999999]
                flex
                items-center
                justify-center
                overflow-hidden
                bg-[linear-gradient(283deg,rgba(115,86,209,1)_0%,rgba(134,84,179,1)_35%,rgba(82,56,128,1)_74%,rgba(112,38,133,1)_100%)]
                will-change-[opacity]
            "
        >
            <Loader
                visible={loaderVisible}
                mode="wave"
                onTransitionEnd={() => {
                    if (phase === "loaderOut") {
                        setPhase("overlayOut");
                    }
                }}
            />
        </motion.div>
    );
};
