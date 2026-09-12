"use client";

import {
    ReactNode,
    useCallback,
    useLayoutEffect,
    useRef,
    useState,
} from "react";

import type { RadioFilterTab } from "./RadioFilter";

export type RadioFilterQuickItem = {
    id: RadioFilterTab;
    content: ReactNode;
    active?: boolean;
    className?: string;
};

type RadioFilterQuickBarProps = {
    items: RadioFilterQuickItem[];
    onOpen: (tab: RadioFilterTab) => void;
};

const GAP = 4;
const FRAME_HEADER_PADDING = 4;
const FRAME_SHOULDER = 36;
const FRAME_SIDE_GAP = 8;
const FRAME_MAX_WIDTH_RATIO = 0.9;

const getRadius = (index: number, count: number) => {
    if (count === 1) {
        return "rounded-[24px]";
    }

    if (index === 0) {
        return "rounded-[24px_4px_4px_24px]";
    }

    if (index === count - 1) {
        return "rounded-[4px_24px_24px_4px]";
    }

    return "rounded-[4px]";
};

const baseButtonClassName = `
    flex
    h-8
    shrink-0
    min-w-0
    items-center
    gap-1
    bg-fg/10
    px-2
    text-[12px]
    shadow-md
    shadow-black/15
    hover:bg-fg/15
    hover:cursor-pointer
    transition-all
    duration-200
`;

export const RadioFilterQuickBar = ({
    items,
    onOpen,
}: RadioFilterQuickBarProps) => {
    const hostRef = useRef<HTMLDivElement>(null);
    const measureRefs = useRef<Array<HTMLButtonElement | null>>([]);

    const [visibleCount, setVisibleCount] = useState(1);
    const [contentWidth, setContentWidth] = useState<number | null>(null);

    const updateVisibleCount = useCallback(() => {
        const host = hostRef.current;

        if (!host || items.length === 0) {
            return;
        }

        const frame = host.closest<HTMLElement>("[data-radio-stations-frame]");
        const frameWidth = frame?.clientWidth ?? 0;

        if (frameWidth <= 0) {
            return;
        }

        const maxByFrameRatio =
            frameWidth * FRAME_MAX_WIDTH_RATIO - FRAME_HEADER_PADDING * 2;

        const maxByShoulders =
            frameWidth -
            (FRAME_SHOULDER + FRAME_SIDE_GAP + FRAME_HEADER_PADDING) * 2;

        const availableWidth = Math.max(
            1,
            Math.floor(Math.min(maxByFrameRatio, maxByShoulders)),
        );

        let width = 0;
        let count = 0;

        for (let index = 0; index < items.length; index += 1) {
            const element = measureRefs.current[index];

            if (!element) {
                continue;
            }

            const measuredWidth = Math.ceil(
                element.getBoundingClientRect().width,
            );

            if (index === 0) {
                width = Math.min(measuredWidth, availableWidth);
                count = 1;
                continue;
            }

            const nextWidth = width + GAP + measuredWidth;

            if (nextWidth > availableWidth) {
                break;
            }

            width = nextWidth;
            count += 1;
        }

        setVisibleCount(Math.max(1, count));
        setContentWidth(Math.max(1, Math.ceil(width)));
    }, [items]);

    useLayoutEffect(() => {
        updateVisibleCount();

        const observer = new ResizeObserver(updateVisibleCount);
        const host = hostRef.current;
        const frame = host?.closest<HTMLElement>("[data-radio-stations-frame]");

        if (frame) {
            observer.observe(frame);
        }

        measureRefs.current.forEach((element) => {
            if (element) {
                observer.observe(element);
            }
        });

        window.addEventListener("resize", updateVisibleCount);

        return () => {
            observer.disconnect();
            window.removeEventListener("resize", updateVisibleCount);
        };
    }, [items, updateVisibleCount]);

    const visibleItems = items.slice(0, visibleCount);

    return (
        <div
            ref={hostRef}
            style={
                contentWidth
                    ? {
                          width: contentWidth,
                      }
                    : undefined
            }
            className="row-center-1 min-w-0 max-w-full pt-[2px]"
        >
            <div
                aria-hidden="true"
                className="
                    invisible
                    absolute
                    left-0
                    top-0
                    flex
                    w-max
                    gap-1
                    pointer-events-none
                    
                "
            >
                {items.map((item, index) => (
                    <button
                        key={item.id}
                        ref={(element) => {
                            measureRefs.current[index] = element;
                        }}
                        type="button"
                        tabIndex={-1}
                        className={`
                            ${baseButtonClassName}
                            rounded-[4px]
                            ${item.className ?? ""}
                        `}
                    >
                        {item.content}
                    </button>
                ))}
            </div>

            <div className="flex w-full min-w-0 items-center gap-1 overflow-hidden justify-between">
                {visibleItems.map((item, index) => (
                    <button
                        key={item.id}
                        type="button"
                        onClick={() => onOpen(item.id)}
                        style={
                            index === 0
                                ? {
                                      maxWidth: "100%",
                                  }
                                : undefined
                        }
                        className={`
                            ${baseButtonClassName}
                            ${getRadius(index, visibleItems.length)}
                            ${index === 0 ? "max-w-full" : ""}
                            ${item.active ? "bg-fg/15" : ""}
                            ${item.className ?? ""}
                        `}
                    >
                        {item.content}
                    </button>
                ))}
            </div>
        </div>
    );
};
