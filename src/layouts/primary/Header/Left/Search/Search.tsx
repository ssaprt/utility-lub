"use client";

import { TablerIcon } from "@/components/titles/TitlePost/TablerIcon";
import { AppLink } from "@/content/react/UI-Components/Pagination/components/link/AppLink";
import { useSearch } from "@/hooks/Search/useSearch";
import { Scroll } from "@/layouts/primary/Scroll";
import { IconCalendarPlus, IconSearch, IconX } from "@tabler/icons-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

import Image from "next/image";
import { Input } from "./Input";
import styles from "./Search.module.scss";

export const Search = () => {
    const {
        setValue,
        setResults,
        setError,
        isLoading,
        setIsOpen,
        searchRef,
        value,
        isOpen,
        error,
        results,
    } = useSearch({});

    const mobilePanelRef = useRef<HTMLDivElement>(null);

    const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

    const [mobilePanelTop, setMobilePanelTop] = useState(0);

    const hasSearchQuery = value.trim().length >= 2;

    const handleChange = (nextValue: string) => {
        setValue(nextValue);

        setIsOpen(nextValue.trim().length >= 2);
    };

    const clearSearch = () => {
        setValue("");
        setResults([]);
        setError(null);
        setIsOpen(false);
        setIsMobileSearchOpen(false);
    };

    const closeResults = () => {
        setIsOpen(false);
        setIsMobileSearchOpen(false);
    };

    const toggleMobileSearch = () => {
        setIsMobileSearchOpen((currentValue) => {
            const nextValue = !currentValue;

            if (!nextValue) {
                setIsOpen(false);
            }

            return nextValue;
        });
    };

    useEffect(() => {
        if (!isMobileSearchOpen) {
            return;
        }

        const searchElement = searchRef.current;

        if (!searchElement) {
            return;
        }

        const headerElement = searchElement.closest<HTMLElement>("header");

        const positionTarget = headerElement ?? searchElement;

        const updatePosition = () => {
            const rect = positionTarget.getBoundingClientRect();

            setMobilePanelTop(rect.bottom);
        };

        updatePosition();

        const resizeObserver = new ResizeObserver(updatePosition);

        resizeObserver.observe(positionTarget);

        window.addEventListener("resize", updatePosition);

        window.addEventListener("scroll", updatePosition, true);

        return () => {
            resizeObserver.disconnect();

            window.removeEventListener("resize", updatePosition);

            window.removeEventListener("scroll", updatePosition, true);
        };
    }, [isMobileSearchOpen, searchRef]);

    useEffect(() => {
        if (!isMobileSearchOpen) {
            return;
        }

        const frameId = requestAnimationFrame(() => {
            const inputElement =
                mobilePanelRef.current?.querySelector<HTMLInputElement>(
                    "input",
                );

            inputElement?.focus();
        });

        return () => {
            cancelAnimationFrame(frameId);
        };
    }, [isMobileSearchOpen]);

    useEffect(() => {
        if (!isMobileSearchOpen) {
            return;
        }

        const handlePointerDown = (event: PointerEvent) => {
            const target = event.target as Node | null;

            if (target && searchRef.current?.contains(target)) {
                return;
            }

            setIsMobileSearchOpen(false);
            setIsOpen(false);
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key !== "Escape") {
                return;
            }

            setIsMobileSearchOpen(false);
            setIsOpen(false);
        };

        document.addEventListener("pointerdown", handlePointerDown);

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("pointerdown", handlePointerDown);

            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isMobileSearchOpen, searchRef, setIsOpen]);

    const renderClearButton = () => {
        return (
            <motion.button
                type="button"
                aria-label="Очистить поиск"
                onClick={clearSearch}
                className={`
                    ${styles["search-box__clear"]}
                    ${value.length > 0 ? styles.visible : ""}
                `}
                initial={false}
                animate={{
                    scale: value.length > 0 ? 1 : 0.3,
                    opacity: value.length > 0 ? 1 : 0,
                }}
                transition={{
                    type: "spring",
                    stiffness: 220,
                    damping: 8,
                    mass: 0.7,
                }}
            >
                <IconX className="stroke-pink-300" />
            </motion.button>
        );
    };

    const renderResults = () => {
        return (
            <>
                {isLoading && (
                    <div className={styles["search-box__message"]}>
                        Searching...
                    </div>
                )}

                {!isLoading && error && (
                    <div role="alert" className={styles["search-box__message"]}>
                        Search is unavailable
                    </div>
                )}

                {!isLoading && !error && results.length === 0 && (
                    <div className={styles["search-box__message"]}>
                        Nothing found
                    </div>
                )}

                {!isLoading && !error && results.length > 0 && (
                    <>
                        <Scroll />

                        <ul className={styles["search-box__list"]}>
                            {results.map((result) => (
                                <li
                                    key={result.url}
                                    className={styles["search-box__item"]}
                                >
                                    <AppLink
                                        href={result.url}
                                        onClick={closeResults}
                                    >
                                        <div className="flex flex-row items-center justify-between gap-2">
                                            <div className="flex min-w-0 flex-row items-center gap-1">
                                                {result.meta?.icon &&
                                                    ([
                                                        ".svg",
                                                        ".png",
                                                        ".webp",
                                                        ".jpg",
                                                        ".jpeg",
                                                    ].includes(
                                                        result.meta?.icon,
                                                    ) ? (
                                                        <Image
                                                            src={
                                                                result.meta.icon
                                                            }
                                                            alt={"icon"}
                                                            width={24}
                                                            height={24}
                                                            className="h-6 w-6 shrink-0"
                                                        />
                                                    ) : (
                                                        <TablerIcon
                                                            name={
                                                                result.meta.icon
                                                            }
                                                            className="
                                                                    h-6
                                                                    w-6
                                                                    shrink-0
                                                                    stroke-pink-300
                                                                "
                                                        />
                                                    ))}

                                                <span
                                                    className={`
                                                                ${
                                                                    styles[
                                                                        "search-box__title"
                                                                    ]
                                                                }
                                                                text-xs
                                                            `}
                                                >
                                                    {result.meta?.title ??
                                                        result.url}
                                                </span>
                                            </div>

                                            <div className="flex shrink-0 flex-row items-center gap-1">
                                                <IconCalendarPlus className="h-[14px] w-[14px] stroke-pink-300" />

                                                <i className="text-[12px] text-pink-300/60">
                                                    {result.meta?.date}
                                                </i>
                                            </div>
                                        </div>

                                        <span className="text-sm text-pink-200">
                                            {result.meta?.description}
                                        </span>
                                    </AppLink>
                                </li>
                            ))}
                        </ul>
                    </>
                )}
            </>
        );
    };

    return (
        <div
            ref={searchRef}
            className={`
                ${styles["search-box"]}
                flex
                flex-row
                items-center
            `}
        >
            {/* Desktop */}
            <div className="relative hidden lg:block">
                <div className="relative flex flex-row items-center justify-between">
                    <Input value={value} onChange={handleChange} />

                    {renderClearButton()}
                </div>

                {hasSearchQuery && (
                    <div
                        aria-live="polite"
                        aria-hidden={!isOpen}
                        className={`
                            ${styles["search-box__results"]}
                            transition-[opacity,transform,visibility]
                            duration-100
                            ease-out

                            ${
                                isOpen
                                    ? `
                                        visible
                                        translate-y-0
                                        opacity-100
                                        pointer-events-auto
                                    `
                                    : `
                                        invisible
                                        -translate-y-1
                                        opacity-0
                                        pointer-events-none
                                    `
                            }
                        `}
                    >
                        {renderResults()}
                    </div>
                )}
            </div>

            {/* Mobile button */}
            <div className="block lg:hidden">
                <motion.button
                    type="button"
                    aria-label={
                        isMobileSearchOpen ? "Закрыть поиск" : "Открыть поиск"
                    }
                    aria-expanded={isMobileSearchOpen}
                    aria-controls="mobile-search-panel"
                    onClick={toggleMobileSearch}
                    className="
                        flex
                        h-9
                        w-9
                        cursor-pointer
                        items-center
                        justify-center
                        rounded-[18px]
                        transition-colors
                        duration-150
                        hover:bg-pink-300/10
                    "
                    initial={false}
                    animate={{
                        scale: isMobileSearchOpen ? 1.08 : 1,
                    }}
                    transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 18,
                    }}
                >
                    <AnimatePresence mode="wait" initial={false}>
                        {isMobileSearchOpen ? (
                            <motion.span
                                key="close"
                                initial={{
                                    opacity: 0,
                                    rotate: -45,
                                    scale: 0.7,
                                }}
                                animate={{
                                    opacity: 1,
                                    rotate: 0,
                                    scale: 1,
                                }}
                                exit={{
                                    opacity: 0,
                                    rotate: 45,
                                    scale: 0.7,
                                }}
                                transition={{
                                    duration: 0.12,
                                }}
                            >
                                <IconX className="h-5 w-5 stroke-pink-300" />
                            </motion.span>
                        ) : (
                            <motion.span
                                key="search"
                                initial={{
                                    opacity: 0,
                                    scale: 0.7,
                                }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                }}
                                exit={{
                                    opacity: 0,
                                    scale: 0.7,
                                }}
                                transition={{
                                    duration: 0.12,
                                }}
                            >
                                <IconSearch className="h-5 w-5" />
                            </motion.span>
                        )}
                    </AnimatePresence>
                </motion.button>
            </div>

            {/* Mobile panel */}
            <AnimatePresence>
                {isMobileSearchOpen && (
                    <motion.div
                        id="mobile-search-panel"
                        ref={mobilePanelRef}
                        style={{
                            top: mobilePanelTop,
                        }}
                        className="
                            fixed
                            inset-x-0
                            z-[999999]
                            block
                       
                            pt-2
                            lg:hidden
                        "
                        initial={{
                            opacity: 0,
                            y: -12,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        exit={{
                            opacity: 0,
                            y: -12,
                        }}
                        transition={{
                            duration: 0.16,
                            ease: "easeOut",
                        }}
                    >
                        <div
                            className="
                                w-[98vw]
                                ml-[1vw]
                                overflow-hidden
                                rounded-[14px]
                                border
                                border-pink-300/20
                                bg-[linear-gradient(283deg,rgba(115,86,209,1)_0%,rgba(134,84,179,1)_35%,rgba(82,56,128,1)_74%,rgba(112,38,133,1)_100%)]
                                p-2
                                shadow-[0_12px_35px_rgba(0,0,0,0.35)]
                                backdrop-blur-xl
                            "
                        >
                            <div className="relative flex w-full flex-row items-center">
                                <div className="min-w-0 flex-1">
                                    <Input
                                        value={value}
                                        onChange={handleChange}
                                    />
                                </div>

                                {renderClearButton()}
                            </div>

                            {hasSearchQuery && (
                                <motion.div
                                    aria-live="polite"
                                    initial={{
                                        opacity: 0,
                                        y: -5,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                    }}
                                    className={`
                                        ${styles["search-box__results"]}
                                        mt-2
                                        !static
                                        !visible
                                        !w-full
                                        !translate-y-0
                                        !opacity-100
                                        !pointer-events-auto
                                    `}
                                    style={{
                                        position: "relative",
                                        inset: "auto",
                                        width: "100%",
                                        maxHeight: "min(60dvh, 500px)",
                                    }}
                                >
                                    {renderResults()}
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
