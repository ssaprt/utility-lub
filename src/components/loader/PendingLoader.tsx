"use client";

import { motion } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

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
    const markerRef = useRef<HTMLSpanElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const cycleStartedAtRef = useRef(0);
    const pendingReadyRef = useRef(false);

    const [mounted, setMounted] = useState(false);
    const [phase, setPhase] = useState<LoaderPhase>("idle");

    const isDesktop = useBreakpoint("lg");

    const { menu } = useAppContextValues();
    const { openMenu, pending } = menu;

    const { menu: menuActions } = useAppContextActions();

    const { setOpenMenu } = menuActions;

    useEffect(() => {
        // eslint-disable-next-line
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!pending) {
            pendingReadyRef.current = true;
            return;
        }

        if (!pendingReadyRef.current || phase !== "idle") {
            return;
        }

        cycleStartedAtRef.current = performance.now();

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

    useLayoutEffect(() => {
        if (!mounted || phase === "idle") {
            return;
        }

        const parent = markerRef.current?.parentElement;

        const overlay = overlayRef.current;

        if (!parent || !overlay) {
            return;
        }

        let animationFrameId = 0;

        const updatePosition = () => {
            const rect = parent.getBoundingClientRect();

            overlay.style.top = `${rect.top}px`;
            overlay.style.left = `${rect.left}px`;
            overlay.style.width = `${rect.width}px`;
            overlay.style.height = `${rect.height}px`;

            animationFrameId = window.requestAnimationFrame(updatePosition);
        };

        updatePosition();

        return () => {
            window.cancelAnimationFrame(animationFrameId);
        };
    }, [mounted, phase]);

    const overlayVisible = phase === "active" || phase === "loaderOut";

    const loaderVisible = phase === "active";

    return (
        <>
            <span ref={markerRef} aria-hidden="true" className="hidden" />

            {mounted &&
                phase !== "idle" &&
                createPortal(
                    <motion.div
                        ref={overlayRef}
                        initial={false}
                        animate={{
                            opacity: overlayVisible ? 1 : 0,
                        }}
                        transition={{
                            duration: overlayVisible
                                ? 0
                                : OVERLAY_OUT_DURATION / 1000,
                        }}
                        onAnimationComplete={() => {
                            if (phase === "overlayOut" && !overlayVisible) {
                                setPhase("idle");
                            }
                        }}
                        className="
                            pointer-events-none
                            fixed
                            z-[9999999]
                            flex
                            items-center
                            justify-center
                            overflow-hidden
                            bg-app
                            will-change-[opacity]
                        "
                        style={{
                            top: 0,
                            left: 0,
                            width: 0,
                            height: 0,
                        }}
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
                    </motion.div>,
                    document.body,
                )}
        </>
    );
};
