"use client";

import Image from "next/image";

import { useState } from "react";

import { RadioCard } from "./RadioCard";

export const Cover = ({
    stationSrc,
    trackSrc,
    className,
}: {
    stationSrc?: string | null;

    trackSrc?: string | null;

    className?: string;
}) => {
    const [loadedStationSrc, setLoadedStationSrc] = useState<string | null>(
        null,
    );

    const [failedStationSrc, setFailedStationSrc] = useState<string | null>(
        null,
    );

    const [loadedTrackSrc, setLoadedTrackSrc] = useState<string | null>(null);

    const [failedTrackSrc, setFailedTrackSrc] = useState<string | null>(null);

    const stationReady =
        Boolean(stationSrc) &&
        loadedStationSrc === stationSrc &&
        failedStationSrc !== stationSrc;

    const stationFailed = !stationSrc || failedStationSrc === stationSrc;

    const trackReady =
        Boolean(trackSrc) &&
        loadedTrackSrc === trackSrc &&
        failedTrackSrc !== trackSrc;

    const trackFailed = !trackSrc || failedTrackSrc === trackSrc;

    return (
        <div
            className={`
                relative
                size-8
                shrink-0
                ${className ?? ""}
            `}
        >
            {(!stationReady || stationFailed) && (
                <RadioCard
                    className="
                        absolute
                        inset-0
                        size-full!
                        m-auto!
                        object-contain!
                        aspect-auto!
                    "
                />
            )}

            {stationSrc && !stationFailed && (
                <Image
                    key={`station-${stationSrc}`}
                    src={stationSrc}
                    alt=""
                    unoptimized
                    width={80}
                    height={80}
                    onLoad={() => setLoadedStationSrc(stationSrc)}
                    onError={() => setFailedStationSrc(stationSrc)}
                    className={`
                        absolute
                        inset-0
                        size-full
                        rounded-[4px]
                        object-contain
                        transition-opacity
                        duration-300
                        select-none
                        ${
                            stationReady && !trackReady
                                ? "opacity-100"
                                : "opacity-0"
                        }
                    `}
                />
            )}

            {stationReady && trackSrc && !trackFailed && (
                <Image
                    key={`track-${trackSrc}`}
                    src={trackSrc}
                    alt=""
                    unoptimized
                    width={80}
                    height={80}
                    onLoad={() => setLoadedTrackSrc(trackSrc)}
                    onError={() => setFailedTrackSrc(trackSrc)}
                    className={`
                        absolute
                        inset-0
                        size-full
                        rounded-[4px]
                        object-contain
                        transition-opacity
                        duration-300
                        select-none
                        ${trackReady ? "opacity-100" : "opacity-0"}
                    `}
                />
            )}
        </div>
    );
};
