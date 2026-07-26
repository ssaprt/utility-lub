"use client";

import { motion } from "framer-motion";
import { useLinkStatus } from "next/link";
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
    const { pending } = useLinkStatus();
    const { menu } = useAppContextValues();
    const { menu: isMenu } = useAppContextActions();
    const { setOpenMenu } = isMenu;
    const { openMenu } = menu;
    const isDesktop = useBreakpoint("lg");

    const loaderRef = useRef<HTMLDivElement>(null);
    const cycleStartedAtRef = useRef(0);

    const [phase, setPhase] = useState<LoaderPhase>("idle");

    useEffect(() => {
        if (!pending) {
            return;
        }

        cycleStartedAtRef.current = performance.now();

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setPhase("active");
    }, [pending]);

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

    useEffect(() => {
        if (phase === "idle") {
            return;
        }

        if (phase === "overlayOut" && !isDesktop) setOpenMenu(false);

        const loaderElement = loaderRef.current;
        const container = document.querySelector("#main");

        if (!loaderElement || !container) {
            return;
        }

        const update = () => {
            const rect = container.getBoundingClientRect();

            loaderElement.style.left = `${rect.left}px`;
            loaderElement.style.top = `${rect.top}px`;
            loaderElement.style.width = `${rect.width}px`;
            loaderElement.style.height = `${rect.height}px`;
        };

        update();

        const resizeObserver = new ResizeObserver(update);

        resizeObserver.observe(container);

        window.addEventListener("resize", update);
        window.addEventListener("scroll", update, true);

        return () => {
            resizeObserver.disconnect();

            window.removeEventListener("resize", update);
            window.removeEventListener("scroll", update, true);
        };
    }, [phase, isDesktop, setOpenMenu]);

    if (phase === "idle") {
        return null;
    }
    const overlayVisible = phase === "active" || phase === "loaderOut";

    const loaderVisible = phase === "active";

    return (
        <motion.div
            ref={loaderRef}
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
            fixed
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
                mode="space"
                onTransitionEnd={() => {
                    if (phase === "loaderOut") {
                        setPhase("overlayOut");
                    }
                }}
            />
        </motion.div>
    );
};
