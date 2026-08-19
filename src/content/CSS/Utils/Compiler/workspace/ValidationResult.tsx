"use client";

import clsx from "clsx";

import type { StyleLanguage } from "@/services/StylesConverter/styles-converter.api";
import { IconCheckFilled } from "@tabler/icons-react";

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
                    px-3
                    py-1
                    transition-[background-color]
                    duration-200
                `,
            )}
        >
            <span
                className={clsx(
                    "whitespace-pre-wrap text-[12px] transition-colors duration-200 row-center-1",
                    loading && "text-fg/40",
                    !loading && !error && !success && "text-fg/40",
                    success && "text-fg/60",
                    error && "text-fg/60",
                )}
            >
                <span className="text-[24px]">
                    {success && <IconCheckFilled />}
                    {error && "✗"}
                </span>{" "}
                {text}
            </span>
        </div>
    );
};
