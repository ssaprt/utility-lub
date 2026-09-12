"use client";

import {
    IconCheck,
    IconChevronDown,
    IconLoader2,
    IconSearch,
    IconX,
} from "@tabler/icons-react";

import {
    useCallback,
    useEffect,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
} from "react";

import type { CSSProperties, ReactNode } from "react";

import { createPortal } from "react-dom";

export type RadioFilterSelectOption = {
    value: string;
    label: string;
    meta?: string;
    icon?: ReactNode;
};

type DropdownPosition = {
    left: number;
    top: number;
    width: number;
    maxHeight: number;
    openUp: boolean;
};

type RadioFilterSelectProps = {
    value: string;
    options: RadioFilterSelectOption[];
    onChange: (value: string) => void;
    searchable?: boolean;
    searchPlaceholder?: string;
    loading?: boolean;
};

export const RadioFilterSelect = ({
    value,
    options,
    onChange,
    searchable = false,
    searchPlaceholder = "Search",
    loading = false,
}: RadioFilterSelectProps) => {
    const triggerRef = useRef<HTMLButtonElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [position, setPosition] = useState<DropdownPosition | null>(null);

    const selectedOption = options.find((item) => item.value === value);

    const filteredOptions = useMemo(() => {
        const normalizedSearch = search.trim().toLowerCase();

        if (!normalizedSearch) {
            return options;
        }

        return options.filter((item) =>
            `${item.label} ${item.meta ?? ""}`
                .toLowerCase()
                .includes(normalizedSearch),
        );
    }, [options, search]);

    const updatePosition = useCallback(() => {
        const trigger = triggerRef.current;

        if (!trigger) {
            return;
        }

        const rect = trigger.getBoundingClientRect();
        const viewport = window.visualViewport;

        const viewportLeft = viewport?.offsetLeft ?? 0;
        const viewportTop = viewport?.offsetTop ?? 0;
        const viewportWidth = viewport?.width ?? window.innerWidth;
        const viewportHeight = viewport?.height ?? window.innerHeight;

        const sideGap = viewportWidth < 640 ? 10 : 12;
        const viewportRight = viewportLeft + viewportWidth;
        const viewportBottom = viewportTop + viewportHeight;

        const spaceBelow = Math.max(0, viewportBottom - rect.bottom - sideGap);
        const spaceAbove = Math.max(0, rect.top - viewportTop - sideGap);

        const openUp = spaceBelow < 240 && spaceAbove > spaceBelow;
        const availableHeight = openUp ? spaceAbove : spaceBelow;
        const maxHeight = Math.max(120, Math.min(420, availableHeight));

        const mobile = viewportWidth < 640;
        const width = mobile
            ? viewportWidth - sideGap * 2
            : Math.min(Math.max(rect.width, 320), viewportWidth - sideGap * 2);

        const preferredLeft = mobile ? viewportLeft + sideGap : rect.left;
        const left = Math.min(
            Math.max(preferredLeft, viewportLeft + sideGap),
            viewportRight - width - sideGap,
        );

        setPosition({
            left,
            top: openUp ? rect.top - 6 : rect.bottom + 6,
            width,
            maxHeight,
            openUp,
        });
    }, []);

    useLayoutEffect(() => {
        if (!open) {
            return;
        }

        updatePosition();

        const observer = new ResizeObserver(updatePosition);

        if (triggerRef.current) {
            observer.observe(triggerRef.current);
        }

        window.addEventListener("resize", updatePosition);
        window.addEventListener("scroll", updatePosition, true);
        window.visualViewport?.addEventListener("resize", updatePosition);
        window.visualViewport?.addEventListener("scroll", updatePosition);

        return () => {
            observer.disconnect();

            window.removeEventListener("resize", updatePosition);
            window.removeEventListener("scroll", updatePosition, true);
            window.visualViewport?.removeEventListener(
                "resize",
                updatePosition,
            );
            window.visualViewport?.removeEventListener(
                "scroll",
                updatePosition,
            );
        };
    }, [open, updatePosition]);

    useEffect(() => {
        if (!open) {
            //eslint-disable-next-line
            setSearch("");

            return;
        }

        const handlePointerDown = (event: PointerEvent) => {
            const target = event.target as Node;

            if (
                triggerRef.current?.contains(target) ||
                dropdownRef.current?.contains(target)
            ) {
                return;
            }

            setOpen(false);
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setOpen(false);
            }
        };

        document.addEventListener("pointerdown", handlePointerDown);
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("pointerdown", handlePointerDown);
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [open]);

    const dropdownStyle = position
        ? ({
              left: position.left,
              top: position.top,
              width: position.width,
              maxHeight: position.maxHeight,
              transform: position.openUp ? "translateY(-100%)" : undefined,
          } satisfies CSSProperties)
        : undefined;

    return (
        <>
            <button
                ref={triggerRef}
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                className={`
                    flex
                    h-11
                    w-full
                    min-w-0
                    items-center
                    gap-2
                    rounded-[8px]
                    border
                    border-fg/10
                    bg-fg/5
                    px-3
                    text-left
                    shadow-sm
                    shadow-black/10
                    hover:bg-fg/10
                    hover:cursor-pointer
                    transition-all
                    ${open ? "border-fg/20 bg-fg/10" : ""}
                `}
            >
                {selectedOption?.icon && (
                    <span className="shrink-0">{selectedOption.icon}</span>
                )}

                <span className="min-w-0 flex-1 truncate text-[13px]">
                    {selectedOption?.label ?? "Select"}
                </span>

                {selectedOption?.meta && (
                    <span className="hidden shrink-0 text-[11px] text-fg/40 sm:inline">
                        {selectedOption.meta}
                    </span>
                )}

                <IconChevronDown
                    className={`
                        size-4
                        shrink-0
                        text-fg/70
                        transition-transform
                        duration-200
                        ${open ? "rotate-180" : ""}
                    `}
                />
            </button>

            {open &&
                position &&
                createPortal(
                    <div
                        ref={dropdownRef}
                        style={dropdownStyle}
                        onClick={(event) => event.stopPropagation()}
                        className="
                            fixed
                            z-[1100]
                            flex
                            min-h-0
                            flex-col
                            overflow-hidden
                            rounded-[10px]
                            border
                            border-fg/12
                            bg-app
                            shadow-2xl
                            shadow-black/35
                            backdrop-blur-xl
                        "
                    >
                        {searchable && (
                            <div
                                className="
                                    relative
                                    shrink-0
                                    border-b
                                    border-fg/8
                                    bg-app
                                    p-2
                                "
                            >
                                <IconSearch
                                    className="
                                        pointer-events-none
                                        absolute
                                        left-4
                                        top-1/2
                                        size-4
                                        -translate-y-1/2
                                        text-fg/45
                                    "
                                />

                                <input
                                    autoFocus
                                    type="text"
                                    value={search}
                                    onChange={(event) =>
                                        setSearch(event.target.value)
                                    }
                                    placeholder={searchPlaceholder}
                                    className="
                                        h-10
                                        w-full
                                        rounded-[6px]
                                        border
                                        border-fg/8
                                        bg-fg/5
                                        pl-9
                                        pr-9
                                        text-[13px]
                                        text-fg
                                        outline-none
                                        placeholder:text-fg/35
                                        focus:border-fg/20
                                        focus:bg-fg/8
                                        transition-colors
                                    "
                                />

                                {search.length > 0 && (
                                    <button
                                        type="button"
                                        onClick={() => setSearch("")}
                                        className="
                                            absolute
                                            right-4
                                            top-1/2
                                            -translate-y-1/2
                                            rounded-[4px]
                                            p-1
                                            text-fg/50
                                            hover:bg-fg/10
                                            hover:text-fg
                                            hover:cursor-pointer
                                        "
                                    >
                                        <IconX className="size-4" />
                                    </button>
                                )}
                            </div>
                        )}

                        <div
                            className="
                                min-h-0
                                flex-1
                                overflow-y-auto
                                overscroll-contain
                                p-1.5
                                [scrollbar-width:thin]
                            "
                        >
                            {loading ? (
                                <div className="row-center-1 justify-center p-5 text-fg/45">
                                    <IconLoader2 className="size-5 animate-spin" />

                                    <span className="text-[12px]">Loading</span>
                                </div>
                            ) : filteredOptions.length > 0 ? (
                                filteredOptions.map((item) => {
                                    const active = item.value === value;

                                    return (
                                        <button
                                            key={item.value}
                                            type="button"
                                            onClick={() => {
                                                onChange(item.value);
                                                setOpen(false);
                                            }}
                                            className={`
                                                flex
                                                w-full
                                                min-w-0
                                                items-center
                                                gap-2
                                                rounded-[6px]
                                                px-2.5
                                                py-2
                                                text-left
                                                hover:cursor-pointer
                                                transition-colors
                                                ${
                                                    active
                                                        ? "bg-fg/15"
                                                        : "hover:bg-fg/8"
                                                }
                                            `}
                                        >
                                            {item.icon && (
                                                <span className="shrink-0">
                                                    {item.icon}
                                                </span>
                                            )}

                                            <span className="min-w-0 flex-1 truncate text-[13px]">
                                                {item.label}
                                            </span>

                                            {item.meta && (
                                                <span className="shrink-0 text-[11px] text-fg/40">
                                                    {item.meta}
                                                </span>
                                            )}

                                            <span className="flex size-4 shrink-0 items-center justify-center">
                                                {active && (
                                                    <IconCheck className="size-4" />
                                                )}
                                            </span>
                                        </button>
                                    );
                                })
                            ) : (
                                <div className="p-5 text-center text-[12px] text-fg/40">
                                    Nothing found
                                </div>
                            )}
                        </div>
                    </div>,
                    document.body,
                )}
        </>
    );
};
