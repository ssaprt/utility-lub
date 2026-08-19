"use client";

import clsx from "clsx";

import type { StyleLanguage } from "@/services/StylesConverter/styles-converter.api";

type ValidationResultProps = {
    language: StyleLanguage;
    loading: boolean;
    success: boolean;
    error: boolean;
    errorMessage?: string;
};

export const ValidationResult = ({
    language,
    loading,
    success,
    error,
    errorMessage,
}: ValidationResultProps) => {
    const languageName = language.toUpperCase();

    const text = loading
        ? `Validating ${languageName}...`
        : error
          ? errorMessage || `Invalid ${languageName}`
          : success
            ? `Valid ${languageName}`
            : `Validation result will be here`;

    return (
        <div
            className={clsx(
                `
                    flex
                    min-h-[54px]
                    w-full
                    items-center
                    rounded-lg
                    bg-fg/5
                    px-4
                    py-3
                    outline
                    outline-1
                    transition-[outline-color,background-color]
                    duration-200
                `,
                loading && "outline-fg/15",
                !loading && !error && !success && "outline-transparent",
                success && "outline-emerald-400/60",
                error && "outline-red-400/70",
            )}
        >
            <span
                className={clsx(
                    "whitespace-pre-wrap text-[12px] transition-colors duration-200",
                    loading && "text-fg/40",
                    !loading && !error && !success && "text-fg/40",
                    success && "text-emerald-400",
                    error && "text-red-400",
                )}
            >
                {text}
            </span>
        </div>
    );
};
