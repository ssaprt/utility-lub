"use client";

import { ReactNode, useEffect, useId, useRef, useState } from "react";

type RadioStationsFrameProps = {
    header: ReactNode;
    children: ReactNode;
};

type FrameGeometry = {
    width: number;
    height: number;
    headerLeft: number;
    headerRight: number;
    headerTop: number;
    headerBottom: number;
};

const OUTER_RADIUS = 0;
const TOP_RADIUS = 24;
const SHOULDER = 36;
const HEADER_GAP_X = 2;

export const RadioStationsFrame = ({
    header,
    children,
}: RadioStationsFrameProps) => {
    const frameRef = useRef<HTMLDivElement>(null);

    const headerRef = useRef<HTMLDivElement>(null);

    const [geometry, setGeometry] = useState<FrameGeometry | null>(null);
    const id = useId().replace(/:/g, "");

    const filterId = `${id}-inner-shadow`;
    const clipId = `${id}-clip`;

    useEffect(() => {
        const frame = frameRef.current;
        const headerElement = headerRef.current;

        if (!frame || !headerElement) {
            return;
        }

        const update = () => {
            const frameRect = frame.getBoundingClientRect();
            const headerRect = headerElement.getBoundingClientRect();

            const nextGeometry = {
                width: frameRect.width,
                height: frameRect.height,
                headerLeft: headerRect.left - frameRect.left,
                headerRight: headerRect.right - frameRect.left,
                headerTop: headerRect.top - frameRect.top,
                headerBottom: headerRect.bottom - frameRect.top,
            };

            setGeometry((prev) => {
                if (
                    prev &&
                    prev.width === nextGeometry.width &&
                    prev.height === nextGeometry.height &&
                    prev.headerLeft === nextGeometry.headerLeft &&
                    prev.headerRight === nextGeometry.headerRight &&
                    prev.headerTop === nextGeometry.headerTop &&
                    prev.headerBottom === nextGeometry.headerBottom
                ) {
                    return prev;
                }

                return nextGeometry;
            });
        };

        update();

        const observer = new ResizeObserver(update);

        observer.observe(frame);
        observer.observe(headerElement);

        window.addEventListener("resize", update);

        return () => {
            observer.disconnect();
            window.removeEventListener("resize", update);
        };
    }, []);

    const path = (() => {
        if (!geometry) {
            return "";
        }

        const {
            width,
            height,
            headerLeft,
            headerRight,
            headerTop,
            headerBottom,
        } = geometry;

        const baseY = headerBottom;
        const topY = Math.max(1, headerTop);

        const bumpLeft = Math.max(SHOULDER, headerLeft - HEADER_GAP_X);

        const bumpRight = Math.min(
            width - SHOULDER,
            headerRight + HEADER_GAP_X,
        );

        const leftShoulder = Math.max(0, bumpLeft - SHOULDER);

        const rightShoulder = Math.min(width, bumpRight + SHOULDER);

        const verticalRadius = Math.min(
            TOP_RADIUS,
            Math.max(4, (baseY - topY) / 2),
        );

        return `
            M ${OUTER_RADIUS} ${baseY}

            L ${leftShoulder} ${baseY}

            C
                ${bumpLeft - 7} ${baseY}
                ${bumpLeft} ${baseY - 7}
                ${bumpLeft} ${baseY - verticalRadius}

            L ${bumpLeft} ${topY + TOP_RADIUS}

            Q
                ${bumpLeft} ${topY}
                ${bumpLeft + TOP_RADIUS} ${topY}

            L ${bumpRight - TOP_RADIUS} ${topY}

            Q
                ${bumpRight} ${topY}
                ${bumpRight} ${topY + TOP_RADIUS}

            L ${bumpRight} ${baseY - verticalRadius}

            C
                ${bumpRight} ${baseY - 7}
                ${bumpRight + 7} ${baseY}
                ${rightShoulder} ${baseY}

            L ${width - OUTER_RADIUS} ${baseY}

            Q
                ${width} ${baseY}
                ${width} ${baseY + OUTER_RADIUS}

            L ${width} ${height - OUTER_RADIUS}

            Q
                ${width} ${height}
                ${width - OUTER_RADIUS} ${height}

            L ${OUTER_RADIUS} ${height}

            Q
                0 ${height}
                0 ${height - OUTER_RADIUS}

            L 0 ${baseY + OUTER_RADIUS}

            Q
                0 ${baseY}
                ${OUTER_RADIUS} ${baseY}

            Z
        `;
    })();

    return (
        <div
            ref={frameRef}
            data-radio-stations-frame
            className="relative w-full"
        >
            <div
                ref={headerRef}
                className="
                    relative
                    z-2
                    mx-auto
                    w-fit
                    max-w-full
                    min-w-0
                    p-1
                "
            >
                {header}
            </div>

            <div className="relative z-1 w-full">{children}</div>

            {geometry && (
                <svg
                    className="
                        pointer-events-none
                        absolute
                        inset-0
                        z-0
                        h-full
                        w-full
                        overflow-visible
                    "
                    viewBox={`0 0 ${geometry.width} ${geometry.height}`}
                    preserveAspectRatio="none"
                    aria-hidden="true"
                >
                    <defs>
                        <clipPath id={clipId}>
                            <path d={path} />
                        </clipPath>

                        <filter
                            id={filterId}
                            x="-20%"
                            y="-20%"
                            width="140%"
                            height="140%"
                            colorInterpolationFilters="sRGB"
                        >
                            <feGaussianBlur stdDeviation="4" />
                        </filter>
                    </defs>

                    <g clipPath={`url(#${clipId})`}>
                        <path
                            d={path}
                            fill="none"
                            className="stroke-black/20!"
                            strokeWidth="10"
                            vectorEffect="non-scaling-stroke"
                            filter={`url(#${filterId})`}
                        />
                    </g>

                    <path
                        d={path}
                        fill="none"
                        className="stroke-fg/8!"
                        strokeWidth="1"
                        vectorEffect="non-scaling-stroke"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                    />
                </svg>
            )}
        </div>
    );
};
