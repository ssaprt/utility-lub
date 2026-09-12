"use client";

import Image from "next/image";

import { useEffect, useState } from "react";

import { RadioCard } from "../../../RadioCard";

const TRANSITION_DURATION = 350;

export const StationImage = ({
    src,
    alt,
}: {
    src?: string | null;
    alt: string;
}) => {
    const [currentSrc, setCurrentSrc] = useState<string | null>(src ?? null);
    const [nextSrc, setNextSrc] = useState<string | null>(null);

    const [currentLoaded, setCurrentLoaded] = useState(false);
    const [nextLoaded, setNextLoaded] = useState(false);

    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        if (!src) {
            //eslint-disable-next-line
            setCurrentSrc(null);
            setNextSrc(null);
            setCurrentLoaded(false);
            setNextLoaded(false);
            setHasError(false);

            return;
        }

        if (!currentSrc) {
            setCurrentSrc(src);
            setCurrentLoaded(false);
            setHasError(false);

            return;
        }

        if (src === currentSrc || src === nextSrc) {
            return;
        }

        setNextSrc(src);
        setNextLoaded(false);
        setHasError(false);
    }, [src, currentSrc, nextSrc]);

    useEffect(() => {
        if (!nextSrc || !nextLoaded) {
            return;
        }

        const timeout = window.setTimeout(() => {
            setCurrentSrc(nextSrc);
            setCurrentLoaded(true);

            setNextSrc(null);
            setNextLoaded(false);
        }, TRANSITION_DURATION);

        return () => {
            window.clearTimeout(timeout);
        };
    }, [nextSrc, nextLoaded]);

    if ((!currentSrc && !nextSrc) || hasError) {
        return <RadioCard className="w-16! h-16! m-auto!" />;
    }

    return (
        <div className="relative h-16 w-16 m-0 overflow-hidden rounded-[6px]">
            {!currentLoaded && !nextLoaded && (
                <RadioCard className="absolute inset-0 w-16! h-16! z-1" />
            )}

            {currentSrc && (
                <Image
                    fill
                    unoptimized
                    src={currentSrc}
                    alt={alt}
                    onLoad={() => setCurrentLoaded(true)}
                    onError={() => {
                        if (!nextSrc) {
                            setHasError(true);
                        }
                    }}
                    className={`
                        object-contain
                        transition-all
                        duration-350
                        ease-in-out
                        ${
                            nextLoaded
                                ? "opacity-0 scale-[0.98]"
                                : currentLoaded
                                  ? "opacity-100 scale-100"
                                  : "opacity-0 scale-[0.98]"
                        }
                    `}
                />
            )}

            {nextSrc && (
                <Image
                    fill
                    unoptimized
                    src={nextSrc}
                    alt={alt}
                    onLoad={() => setNextLoaded(true)}
                    onError={() => {
                        setNextSrc(null);
                        setNextLoaded(false);
                    }}
                    className={`
                        object-cover
                        transition-all
                        duration-350
                        ease-in-out
                        ${
                            nextLoaded
                                ? "opacity-100 scale-100"
                                : "opacity-0 scale-[1.02]"
                        }
                    `}
                />
            )}
        </div>
    );
};
