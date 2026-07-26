"use client";

import { TablerIcon } from "@/components/titles/TitlePost/TablerIcon";
import { AppLink } from "@/content/react/UI-Components/Pagination/components/link/AppLink";
import { useSearch } from "@/hooks/Search/useSearch";
import { Scroll } from "@/layouts/primary/Scroll";
import { IconCalendarPlus, IconSearch, IconX } from "@tabler/icons-react";
import { motion } from "motion/react";

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

    const hasSearchQuery = value.trim().length >= 2;

    const clearSearch = () => {
        setValue("");
        setResults([]);
        setError(null);
        setIsOpen(false);
    };

    const closeResults = () => {
        /*
         * Скрываем окно визуально, но не удаляем AppLink из DOM.
         * Благодаря этому PendingLoader успевает получить pending=true.
         */
        setIsOpen(false);
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
            {/* Поле поиска на больших экранах */}
            <div className="relative hidden lg:block">
                <div className="relative flex flex-row items-center justify-between">
                    <Input
                        value={value}
                        onChange={(nextValue: string) => {
                            setValue(nextValue);
                            setIsOpen(nextValue.trim().length >= 2);
                        }}
                    />

                    <motion.button
                        type="button"
                        aria-label="Очистить поиск"
                        onClick={clearSearch}
                        className={`
                            ${styles["search-box__clear"]}
                            ${value.length > 0 ? styles.visible : ""}
                        `}
                        initial={{
                            scale: 0.3,
                        }}
                        animate={
                            value.length > 0
                                ? {
                                      scale: 1,
                                  }
                                : {
                                      scale: 0.3,
                                  }
                        }
                        transition={{
                            type: "spring",
                            stiffness: 220,
                            damping: 8,
                            mass: 0.7,
                        }}
                    >
                        <IconX className="stroke-pink-300" />
                    </motion.button>
                </div>

                {/*
                 * Важно:
                 * блок зависит только от наличия поискового запроса.
                 *
                 * isOpen управляет исключительно CSS-видимостью,
                 * поэтому при клике AppLink не размонтируется.
                 */}
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
                        {isLoading && (
                            <div className={styles["search-box__message"]}>
                                Searching...
                            </div>
                        )}

                        {!isLoading && error && (
                            <div
                                role="alert"
                                className={styles["search-box__message"]}
                            >
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
                                            className={
                                                styles["search-box__item"]
                                            }
                                        >
                                            <AppLink
                                                href={result.url}
                                                onClick={closeResults}
                                            >
                                                <div className="flex flex-row items-center justify-between gap-2">
                                                    <div className="flex min-w-0 flex-row items-center gap-1">
                                                        {result.meta?.icon && (
                                                            <TablerIcon
                                                                name={
                                                                    result.meta
                                                                        .icon
                                                                }
                                                                className="
                                                                        h-6
                                                                        w-6
                                                                        shrink-0
                                                                        stroke-pink-300
                                                                    "
                                                            />
                                                        )}

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
                                                            {result.meta
                                                                ?.title ??
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
                    </div>
                )}
            </div>

            {/* На экранах меньше lg поле скрыто, остаётся иконка */}
            <div className="block lg:hidden">
                <button
                    type="button"
                    aria-label="Открыть поиск"
                    className="
                        flex
                        flex-row
                        items-center
                        gap-1
                        rounded-[18px]
                        bg-pink-300/20
                        p-2
                    "
                >
                    <IconSearch className="h-[20px] w-[20px]" />
                </button>
            </div>
        </div>
    );
};
