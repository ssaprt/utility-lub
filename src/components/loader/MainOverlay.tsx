"use client";

import { GeneralButton } from "@/components/button/GeneralButton/GeneralButton";
import {
    useAppContextActions,
    useAppContextValues,
    type AppRequestState,
} from "@/context/appContext";
import { useBreakpoint } from "@/hooks/useBreakPoint";
import { IconReload } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Loader } from "../animationIcons/Loader/Loader";
import { DynamicSvgIcon } from "../svg/DynamicSVGIcon";

const OVERLAY_IN_DURATION = 100;
const LOADER_IN_DURATION = 100;
const MIN_LOADER_DURATION = 300;
const OVERLAY_OUT_DURATION = 300;

const LOADER_TAG = "main-overlay";

type OverlayPhase =
    | "idle"
    | "loading"
    | "loaderOutToError"
    | "loaderOutToIdle"
    | "error"
    | "overlayOut";

type RequestedMode = "idle" | "loading" | "error";

export const MainOverlay = () => {
    const markerRef = useRef<HTMLSpanElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    const cycleStartedAtRef = useRef(0);

    const [mounted, setMounted] = useState(false);

    const [phase, setPhase] = useState<OverlayPhase>("idle");

    const [displayError, setDisplayError] = useState<AppRequestState | null>(
        null,
    );

    const isDesktop = useBreakpoint("lg");

    const { menu, loadingAnyData, requestError } = useAppContextValues();

    const { openMenu, pending } = menu;

    const {
        menu: menuActions,
        startLoader,
        finishLoader,
    } = useAppContextActions();

    const { setOpenMenu } = menuActions;

    const requestedMode: RequestedMode =
        pending || loadingAnyData ? "loading" : requestError ? "error" : "idle";

    useEffect(() => {
        // eslint-disable-next-line
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!requestError) {
            return;
        }

        // eslint-disable-next-line
        setDisplayError(requestError);
    }, [requestError]);

    useEffect(() => {
        if (!mounted) {
            return;
        }

        if (requestedMode === "loading") {
            if (phase !== "loading") {
                cycleStartedAtRef.current = performance.now();

                startLoader({
                    tag: LOADER_TAG,
                });
                //eslint-disable-next-line
                setPhase("loading");
            }

            if (!isDesktop && openMenu) {
                setOpenMenu(false);
            }

            return;
        }

        if (requestedMode === "error") {
            if (phase === "loading") {
                const elapsed = performance.now() - cycleStartedAtRef.current;

                const minimumDuration =
                    OVERLAY_IN_DURATION +
                    LOADER_IN_DURATION +
                    MIN_LOADER_DURATION;

                const remaining = Math.max(0, minimumDuration - elapsed);

                const timeoutId = window.setTimeout(() => {
                    setPhase("loaderOutToError");
                }, remaining);

                return () => {
                    window.clearTimeout(timeoutId);
                };
            }

            if (phase === "idle" || phase === "overlayOut") {
                startLoader({
                    tag: LOADER_TAG,
                });
            }

            if (phase !== "loaderOutToError" && phase !== "error") {
                setPhase("error");
            }

            return;
        }

        if (phase === "loading") {
            const elapsed = performance.now() - cycleStartedAtRef.current;

            const minimumDuration =
                OVERLAY_IN_DURATION + LOADER_IN_DURATION + MIN_LOADER_DURATION;

            const remaining = Math.max(0, minimumDuration - elapsed);

            const timeoutId = window.setTimeout(() => {
                setPhase("loaderOutToIdle");
            }, remaining);

            return () => {
                window.clearTimeout(timeoutId);
            };
        }

        if (phase === "error") {
            setPhase("overlayOut");

            return;
        }

        if (phase === "loaderOutToError" || phase === "loaderOutToIdle") {
            setPhase("overlayOut");
        }
    }, [
        mounted,
        requestedMode,
        phase,
        isDesktop,
        openMenu,
        setOpenMenu,
        startLoader,
    ]);

    useEffect(() => {
        return () => {
            finishLoader({
                tag: LOADER_TAG,
            });
        };
    }, [finishLoader]);

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

    const overlayVisible = phase !== "overlayOut";

    const loaderVisible = phase === "loading";

    const errorVisible = phase === "error";

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
                            ease: "easeOut",
                        }}
                        onAnimationComplete={() => {
                            if (phase !== "overlayOut") {
                                return;
                            }

                            if (requestedMode !== "idle") {
                                return;
                            }

                            finishLoader({
                                tag: LOADER_TAG,
                            });

                            setDisplayError(null);

                            setPhase("idle");
                        }}
                        className="
                            pointer-events-auto
                            fixed
                            z-[9999]
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
                            mode="implode"
                            onTransitionEnd={() => {
                                if (phase === "loaderOutToError") {
                                    setPhase("error");

                                    return;
                                }

                                if (phase === "loaderOutToIdle") {
                                    setPhase("overlayOut");
                                }
                            }}
                        />

                        {errorVisible && displayError && (
                            <div
                                className="
                                        absolute
                                        inset-0
                                        col-center-4
                                        justify-center
                                    "
                            >
                                <DynamicSvgIcon
                                    name="message/server-error.svg"
                                    className="h-6 w-6 fill-fg"
                                />

                                <span className="text-xs text-fg/90">
                                    {displayError.message ??
                                        "Sorry. Failed to load data"}
                                </span>

                                {displayError.onRetry && (
                                    <GeneralButton
                                        variant="soft"
                                        icon={
                                            <IconReload className="h-4 w-4" />
                                        }
                                        textButton="Retry"
                                        handleAction={displayError.onRetry}
                                    />
                                )}
                            </div>
                        )}
                    </motion.div>,
                    document.body,
                )}
        </>
    );
};
