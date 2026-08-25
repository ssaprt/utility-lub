"use client";

import clsx from "clsx";
import { motion } from "framer-motion";

export type SwitchTheme =
    "mono" | "app" | "soft" | "outline" | "glass" | "contrast";

type SwitchProps = {
    checked: boolean;
    onChange: (checked: boolean) => void;
    disabled?: boolean;
    className?: string;
    ariaLabel?: string;
    theme?: SwitchTheme;
};

type ThemeConfig = {
    trackOff: string;
    trackOn: string;
    knobOff: string;
    knobOn: string;
};

const themes: Record<SwitchTheme, ThemeConfig> = {
    mono: {
        trackOff: `
            bg-bg
            border-fg/25
        `,
        trackOn: `
            bg-fg
            border-fg
        `,
        knobOff: `
            bg-fg
            border-fg
        `,
        knobOn: `
            bg-bg
            border-bg
        `,
    },

    app: {
        trackOff: `
            bg-fg/10
            border-fg/15
        `,
        trackOn: `
            bg-app
            border-app
        `,
        knobOff: `
            bg-fg
            border-fg
        `,
        knobOn: `
            bg-bg
            border-bg/80
            shadow-md
            shadow-black/30
        `,
    },

    soft: {
        trackOff: `
            bg-fg/5
            border-fg/10
        `,
        trackOn: `
            bg-fg/20
            border-fg/15
        `,
        knobOff: `
            bg-fg/40
            border-fg/10
        `,
        knobOn: `
            bg-fg
            border-fg
        `,
    },

    outline: {
        trackOff: `
            bg-transparent
            border-fg/30
        `,
        trackOn: `
            bg-transparent
            border-fg
        `,
        knobOff: `
            bg-transparent
            border-2
            border-fg/40
        `,
        knobOn: `
            bg-fg
            border-2
            border-fg
        `,
    },

    glass: {
        trackOff: `
            bg-fg/5
            border-fg/15
            backdrop-blur-md
            shadow-inner
            shadow-black/10
        `,
        trackOn: `
            bg-fg/20
            border-fg/25
            backdrop-blur-md
            shadow-inner
            shadow-black/20
        `,
        knobOff: `
            bg-bg/80
            border-fg/20
            backdrop-blur-md
            shadow-md
            shadow-black/20
        `,
        knobOn: `
            bg-fg/90
            border-fg/20
            backdrop-blur-md
            shadow-md
            shadow-black/30
        `,
    },

    contrast: {
        trackOff: `
            bg-fg
            border-fg
        `,
        trackOn: `
            bg-bg
            border-fg
        `,
        knobOff: `
            bg-bg
            border-bg
        `,
        knobOn: `
            bg-fg
            border-fg
        `,
    },
};

export const Switch = ({
    checked,
    onChange,
    disabled = false,
    className,
    ariaLabel = "Toggle",
    theme = "mono",
}: SwitchProps) => {
    const currentTheme = themes[theme];

    return (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            aria-label={ariaLabel}
            disabled={disabled}
            onClick={() => onChange(!checked)}

            className={clsx(
                `
                    relative
                    box-border

                    w-11
                    h-6

                    shrink-0
                    overflow-hidden

                    rounded-full
                    border

                    cursor-pointer
                    select-none

                    transition-[background-color,border-color,box-shadow]
                    duration-300
                    ease-out

                    focus-visible:outline
                    focus-visible:outline-2
                    focus-visible:outline-offset-2
                    focus-visible:outline-fg

                    disabled:pointer-events-none
                    disabled:opacity-40
                `,
                checked ? currentTheme.trackOn : currentTheme.trackOff,
                className,
            )}
        >
            <span
                className={clsx(
                    `
                        pointer-events-none
                        absolute

                        inset-[2px]

                        flex
                        items-center
                    `,
                    checked ? "justify-end" : "justify-start",
                )}
            >
                <motion.span
                    layout="position"
                    initial={false}
                    transition={{
                        layout: {
                            type: "spring",
                            stiffness: 550,
                            damping: 38,
                            mass: 0.65,
                        },
                    }}
                    className={clsx(
                        `
                            block

                            h-full
                            aspect-square

                            shrink-0

                            rounded-full
                            border

                            transition-[background-color,border-color,box-shadow]
                            duration-250
                            ease-out
                        `,
                        checked ? currentTheme.knobOn : currentTheme.knobOff,
                    )}
                />
            </span>
        </button>
    );
};
