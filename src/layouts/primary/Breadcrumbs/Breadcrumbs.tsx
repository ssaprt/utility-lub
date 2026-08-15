"use client";

import { DynamicSvgIcon } from "@/components/svg/DynamicSVGIcon";
import { AppLink } from "@/content/react/UI-Components/Pagination/components/link/AppLink";
import { IconHome } from "@tabler/icons-react";
import { useSelectedLayoutSegments } from "next/navigation";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

export const Breadcrumbs = () => {
    const selectedSegments = useSelectedLayoutSegments();

    const segments = useMemo(
        () =>
            selectedSegments
                .flatMap((segment) => segment.split("/"))
                .filter(Boolean),
        [selectedSegments],
    );

    const containerRef = useRef<HTMLElement>(null);
    const measureRef = useRef<HTMLDivElement>(null);
    const detailsRef = useRef<HTMLDetailsElement>(null);

    const [hiddenCount, setHiddenCount] = useState(0);

    const renderSegment = (segment: string, index: number, measure = false) => {
        const href = `/${segments.slice(0, index + 1).join("/")}`;

        const isActive = index === segments.length - 1;

        if (isActive) {
            return (
                <div
                    key={`${measure ? "measure-" : ""}${href}`}
                    data-breadcrumb-segment={measure ? "" : undefined}
                    className={
                        measure
                            ? `
                                row-center-1
                                shrink-0
                                whitespace-nowrap
                            `
                            : `
                                row-center-1
                                min-w-0
                                flex-1
                            `
                    }
                >
                    <span
                        className="
                            min-w-0
                            overflow-hidden
                            text-ellipsis
                            whitespace-nowrap
                            text-xs
                        "
                    >
                        {segment}
                    </span>
                </div>
            );
        }

        return (
            <AppLink
                key={`${measure ? "measure-" : ""}${href}`}
                data-breadcrumb-segment={measure ? "" : undefined}
                href={href}
                className="
                    row-center-1
                    shrink-0
                    whitespace-nowrap
                    overflow-visible
                    rounded-md
                    bg-fg/10
                    px-2
                    py-1
                    text-xs
                    font-bold
                    text-fg
                    shadow-[0_2px_4px_0]
                    shadow-black/40

                    hover:bg-fg/20
                    hover:shadow-[0_4px_8px_0]
                    hover:shadow-black/50
                "
            >
                <span>{segment}</span>
            </AppLink>
        );
    };

    useLayoutEffect(() => {
        const container = containerRef.current;
        const measure = measureRef.current;

        if (!container || !measure) return;

        const calculate = () => {
            const home = measure.querySelector<HTMLElement>(
                "[data-breadcrumb-home]",
            );

            const ellipsis = measure.querySelector<HTMLElement>(
                "[data-breadcrumb-ellipsis]",
            );

            const segmentElements = Array.from(
                measure.querySelectorAll<HTMLElement>(
                    "[data-breadcrumb-segment]",
                ),
            );

            if (!home || !ellipsis) return;

            const styles = window.getComputedStyle(container);

            const paddingLeft = Number.parseFloat(styles.paddingLeft) || 0;

            const paddingRight = Number.parseFloat(styles.paddingRight) || 0;

            const gap =
                Number.parseFloat(styles.columnGap) ||
                Number.parseFloat(styles.gap) ||
                0;

            const containerWidth =
                container.clientWidth - paddingLeft - paddingRight;

            const homeWidth = home.getBoundingClientRect().width;

            const ellipsisWidth = ellipsis.getBoundingClientRect().width;

            const segmentWidths = segmentElements.map(
                (element) => element.getBoundingClientRect().width,
            );

            const fullWidth =
                homeWidth +
                segmentWidths.reduce((sum, width) => sum + width, 0) +
                gap * segmentWidths.length;

            if (fullWidth <= containerWidth) {
                setHiddenCount(0);
                return;
            }

            let hidden = 0;

            while (hidden < Math.max(0, segmentWidths.length - 1)) {
                hidden += 1;

                const visibleWidths = segmentWidths.slice(hidden);

                const visibleWidth = visibleWidths.reduce(
                    (sum, width) => sum + width,
                    0,
                );

                const requiredWidth =
                    homeWidth +
                    ellipsisWidth +
                    visibleWidth +
                    gap * (visibleWidths.length + 1);

                if (requiredWidth <= containerWidth) {
                    break;
                }
            }

            setHiddenCount(hidden);
        };

        calculate();

        const observer = new ResizeObserver(calculate);

        observer.observe(container);
        observer.observe(measure);

        return () => {
            observer.disconnect();
        };
    }, [segments]);

    useEffect(() => {
        const handlePointerDown = (event: PointerEvent) => {
            const details = detailsRef.current;

            if (!details?.open) return;

            if (
                event.target instanceof Node &&
                !details.contains(event.target)
            ) {
                details.open = false;
            }
        };

        document.addEventListener("pointerdown", handlePointerDown, true);

        return () => {
            document.removeEventListener(
                "pointerdown",
                handlePointerDown,
                true,
            );
        };
    }, []);

    const hiddenSegments = segments.slice(0, hiddenCount);

    const visibleSegments = segments.slice(hiddenCount);

    return (
        <>
            <nav
                ref={containerRef}
                aria-label="Breadcrumb"
                className="
                    row-center-2
                    relative
                    my-4
                    w-auto
                    rounded-[24px]
                    min-w-0
                    overflow-visible
                    py-[5px]
                    px-[6px]
                    bg-fg/5
                "
            >
                <AppLink
                    href="/"
                    aria-label="Home"
                    className="
                        row-center-1
                        shrink-0
                        rounded-md
                        bg-fg/10
                        p-1
                        text-fg
                        shadow-[0_2px_4px_0]
                        shadow-black/40

                        hover:bg-fg/20
                        hover:shadow-[0_4px_8px_0]
                        hover:shadow-black/50
                    "
                >
                    <IconHome className="h-4 w-4" />
                </AppLink>

                {hiddenCount > 0 && (
                    <details
                        ref={detailsRef}
                        className="
                            relative
                            z-30
                            shrink-0
                        "
                    >
                        <summary
                            className="
                                row-center-1
                                list-none
                                shrink-0
                                cursor-pointer
                                rounded-md
                                bg-fg/10
                                px-2
                                py-1
                                text-xs
                                font-bold
                                text-fg
                                shadow-[0_2px_4px_0]
                                shadow-black/40
                                select-none

                                hover:bg-fg/20
                                hover:shadow-[0_4px_8px_0]
                                hover:shadow-black/50

                                [&::-webkit-details-marker]:hidden
                            "
                        >
                            ...
                        </summary>

                        <div
                            className="
                                absolute
                                left-0
                                top-[calc(100%+8px)]
                                z-50
                                col-stretch-1
                                min-w-max
                                rounded-lg
                                border
                                border-fg/10
                                bg-app
                                p-2
                                shadow-xl
                                shadow-black/40
                            "
                        >
                            {hiddenSegments.map((segment, index) => {
                                const href = `/${segments
                                    .slice(0, index + 1)
                                    .join("/")}`;

                                return (
                                    <AppLink
                                        key={href}
                                        href={href}
                                        className="
                                                row-center-1
                                                shrink-0
                                                whitespace-nowrap
                                                rounded-md
                                                px-2
                                                py-1.5
                                                text-xs
                                                font-bold
                                                text-fg

                                                hover:bg-fg/10
                                            "
                                    >
                                        <DynamicSvgIcon
                                            name="signpost.svg"
                                            className="h-4 w-4 shrink-0 fill-fg"
                                        />

                                        <span>{segment}</span>
                                    </AppLink>
                                );
                            })}
                        </div>
                    </details>
                )}

                {visibleSegments.map((segment, visibleIndex) => {
                    const originalIndex = hiddenCount + visibleIndex;

                    return renderSegment(segment, originalIndex);
                })}
            </nav>

            <div
                ref={measureRef}
                aria-hidden
                className="
                    pointer-events-none
                    fixed
                    left-[-10000px]
                    top-[-10000px]
                    flex
                    w-max
                    items-center
                    gap-2
                    invisible
                "
            >
                <div
                    data-breadcrumb-home
                    className="
                        row-center-1
                        shrink-0
                        rounded-md
                        bg-fg/10
                        p-1
                    "
                >
                    <IconHome className="h-4 w-4" />
                </div>

                <div
                    data-breadcrumb-ellipsis
                    className="
                        row-center-1
                        shrink-0
                        rounded-md
                        bg-fg/10
                        px-2
                        py-1
                        text-xs
                        font-bold
                    "
                >
                    ...
                </div>

                {segments.map((segment, index) =>
                    renderSegment(segment, index, true),
                )}
            </div>
        </>
    );
};
