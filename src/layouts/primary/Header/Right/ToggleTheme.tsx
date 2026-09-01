"use client";

import { useTheme } from "next-themes";
import { useCallback, useEffect, useState, useSyncExternalStore } from "react";

import { GeneralButton } from "@/components/button/GeneralButton/GeneralButton";
import { Hr } from "@/components/hr/Hr/Hr";
import { DynamicSvgIcon } from "@/components/svg/DynamicSVGIcon";
import { Popup } from "popup-from-future";

const subscribe = () => {
    return () => {};
};

const themes = [
    {
        theme: "primary",
        title: "Primary",
        svgPath: "mana.svg",
    },
    {
        theme: "light",
        title: "Light",
        svgPath: "lights.svg",
    },
    {
        theme: "dark",
        title: "Dark",
        svgPath: "dark.svg",
    },
    {
        theme: "midnight",
        title: "Midnight",
        svgPath: "fog.svg",
    },
    {
        theme: "tree",
        title: "Tree",
        svgPath: "evergreen.svg",
    },
] as const;

const THEME_STORAGE_KEY = "app-theme";

interface CustomColors {
    background: string;
    foreground: string;
}

type StoredTheme =
    | {
          mode: "theme";
          theme: string;
      }
    | {
          mode: "custom";
          background: string;
          foreground: string;
      };

const applyCustomColors = ({ background, foreground }: CustomColors) => {
    const root = document.documentElement;

    root.style.setProperty("--background", background);

    root.style.setProperty("--foreground", foreground);
};

const clearCustomColors = () => {
    const root = document.documentElement;

    root.style.removeProperty("--background");
    root.style.removeProperty("--foreground");
};

export const ToggleTheme = () => {
    const { theme, resolvedTheme, setTheme } = useTheme();

    const [open, setOpen] = useState(false);

    const [customColors, setCustomColors] = useState<CustomColors>({
        background: "#8654b3",
        foreground: "#fbcde6",
    });

    const mounted = useSyncExternalStore(
        subscribe,
        () => true,
        () => false,
    );

    const currentTheme =
        theme === "custom" ? "custom" : (resolvedTheme ?? theme ?? "primary");

    const activeTheme =
        themes.find((item) => item.theme === currentTheme) ?? themes[0];

    const activeThemeTitle =
        currentTheme === "custom" ? "Custom theme" : activeTheme.title;

    const activeThemeIcon =
        currentTheme === "custom" ? "palette.svg" : activeTheme.svgPath;

    const handleThemeChange = useCallback(
        (selectedTheme: string) => {
            if (!mounted) {
                return;
            }

            clearCustomColors();

            const storedTheme: StoredTheme = {
                mode: "theme",
                theme: selectedTheme,
            };

            localStorage.setItem(
                THEME_STORAGE_KEY,
                JSON.stringify(storedTheme),
            );

            setTheme(selectedTheme);
        },
        [mounted, setTheme],
    );

    const handleCustomTheme = useCallback(() => {
        if (!mounted) {
            return;
        }

        applyCustomColors(customColors);

        const storedTheme: StoredTheme = {
            mode: "custom",
            background: customColors.background,
            foreground: customColors.foreground,
        };

        localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(storedTheme));

        setTheme("custom");
    }, [customColors, mounted, setTheme]);

    useEffect(() => {
        if (!mounted) {
            return;
        }

        const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);

        if (!savedTheme) {
            return;
        }

        try {
            const parsed = JSON.parse(savedTheme) as StoredTheme;

            if (parsed.mode === "custom") {
                const colors: CustomColors = {
                    background: parsed.background,

                    foreground: parsed.foreground,
                };

                // eslint-disable-next-line
                setCustomColors(colors);

                applyCustomColors(colors);
                setTheme("custom");

                return;
            }

            clearCustomColors();
            setTheme(parsed.theme);
        } catch {
            localStorage.removeItem(THEME_STORAGE_KEY);
        }
    }, [mounted, setTheme]);

    return (
        <div
            className="
                row-center-0
                h-8
                w-8
                justify-center
            "
        >
            <button
                type="button"
                aria-label="Open theme settings"
                aria-expanded={open}
                className="
                    row-center-0
                    size-8
                    appearance-none
                    justify-center
                    rounded-[8px]
                    border-0
                    bg-transparent
                    p-0
                    text-fg
                    outline-none
                    transition-colors
                    duration-150
                    hover:bg-fg/7
                    hover:cursor-pointer
                    focus-visible:bg-fg/10
                "
                onClick={() => setOpen(true)}
            >
                <DynamicSvgIcon
                    name="palette.svg"
                    className="
                        size-5
                        fill-fg
                    "
                />
            </button>

            <Popup
                isOpen={open}
                open={() => setOpen(false)}
                hideOverlay
                layer={{
                    className: "bg-transparent!",
                }}
                header={{
                    content: (
                        <div
                            className="
                                row-center-2
                                min-w-0
                                pr-7
                            "
                        >
                            <span
                                className="
                                    row-center-0
                                    size-6
                                    shrink-0
                                    justify-center
                                    rounded-[7px]
                                    bg-app/10
                                "
                            >
                                <DynamicSvgIcon
                                    name="palette.svg"
                                    className="
                                        size-4
                                        fill-app
                                    "
                                />
                            </span>

                            <span
                                className="
                                    truncate
                                    text-sm
                                    font-bold
                                    text-app
                                "
                            >
                                Theme settings
                            </span>
                        </div>
                    ),
                }}
                animation={{
                    open: {
                        animationName: "glow-in",
                        duration: 280,
                        easing: "cubic-bezier(0.34, 1.56, 0.64, 1)",
                    },
                }}
                customStyle={{
                    container: {
                        className: `
                            translate-none!
                            absolute!
                            right-[40px]!
                            left-auto!
                            top-[50px]!
                            w-[300px]!
                            max-w-[calc(100vw-24px)]!
                            min-h-auto!
                            overflow-hidden!
                            rounded-[18px_5px_18px_18px]!
                            bg-fg!
                            text-app!
                            shadow-xl!
                            shadow-black/20!
                            col-start-0!
                        `,
                    },

                    body: {
                        className: `
                            col-start-0!
                            h-auto!
                            w-full!
                            justify-start!
                            overflow-visible!
                            p-2!
                            pt-1!
                        `,
                    },

                    header: {
                        className: `
                            w-full!
                            px-3!
                            pt-3!
                            text-app!
                        `,
                    },
                }}
                close={{
                    className: `
                        right-[8px]!
                        top-[8px]!
                        text-app!
                    `,
                }}
            >
                <div
                    className="
                        col-stretch-2
                        w-full
                    "
                >
                    <div
                        className="
                            pattern-bg
                            relative
                            isolate
                            overflow-hidden
                            rounded-[13px]
                            bg-app
                            p-3
                            text-fg
                        "
                    >
                        <div
                            className="
                                relative
                                z-1
                                row-center-3
                                min-w-0
                            "
                        >
                            <span
                                className="
                                    row-center-0
                                    size-10
                                    shrink-0
                                    justify-center
                                    rounded-full
                                    bg-fg/8
                                    shadow-sm
                                    shadow-black/10
                                "
                            >
                                <DynamicSvgIcon
                                    name={activeThemeIcon}
                                    className="
                                        size-6
                                        fill-fg
                                    "
                                />
                            </span>

                            <div
                                className="
                                    col-start-0
                                    min-w-0
                                    flex-1
                                "
                            >
                                <span
                                    className="
                                        truncate
                                        text-sm
                                        font-bold
                                        text-fg
                                    "
                                >
                                    {activeThemeTitle}
                                </span>

                                <span
                                    className="
                                        text-[11px]
                                        text-fg/55
                                    "
                                >
                                    Current appearance
                                </span>
                            </div>

                            <div
                                className="
                                    row-center-0
                                    shrink-0
                                "
                            >
                                <span
                                    className="
                                        relative
                                        z-1
                                        size-5
                                        rounded-full
                                        border-1
                                        border-fg/15
                                        bg-app
                                    "
                                />

                                <span
                                    className="
                                        -ml-2
                                        size-5
                                        rounded-full
                                        border-1
                                        border-app/15
                                        bg-fg
                                    "
                                />
                            </div>
                        </div>
                    </div>

                    <div
                        className="
                            row-center-2
                            w-full
                            justify-between
                            px-1
                            py-1
                        "
                        role="group"
                        aria-label="Available themes"
                    >
                        {themes.map(({ theme: themeName, title, svgPath }) => {
                            const active = currentTheme === themeName;

                            return (
                                <button
                                    key={themeName}
                                    type="button"
                                    title={title}
                                    aria-label={title}
                                    aria-pressed={active}
                                    className={`
                                            group/theme
                                            row-center-0
                                            relative
                                            size-10
                                            shrink-0
                                            appearance-none
                                            justify-center
                                            rounded-full
                                            border-1
                                            bg-transparent
                                            hover:cursor-pointer
                                            p-0
                                            outline-none
                                            transition-all
                                            duration-180

                                            ${
                                                active
                                                    ? `
                                                        border-app/65
                                                        bg-app/12
                                                        shadow-sm
                                                        shadow-black/15
                                                    `
                                                    : `
                                                        border-app/10
                                                        hover:border-app/30
                                                        hover:bg-app/7
                                                    `
                                            }
                                        `}
                                    onClick={() => handleThemeChange(themeName)}
                                >
                                    <DynamicSvgIcon
                                        name={svgPath}
                                        className={`
                                                size-5
                                                fill-app
                                                transition-all
                                                duration-180

                                                ${
                                                    active
                                                        ? `
                                                            scale-105
                                                            opacity-100
                                                        `
                                                        : `
                                                            opacity-65
                                                            group-hover/theme:opacity-100
                                                        `
                                                }
                                            `}
                                    />

                                    {active && (
                                        <span
                                            className="
                                                    absolute
                                                    -bottom-[6px]
                                                    left-1/2
                                                    h-[2px]
                                                    w-3
                                                    -translate-x-1/2
                                                    rounded-full
                                                    bg-app
                                                "
                                        />
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    <div
                        className="
                            col-stretch-2
                            rounded-[13px_13px_17px_17px]
                            bg-app
                            p-3
                            text-fg
                        "
                    >
                        <div
                            className="
                                row-center-2
                                justify-between
                            "
                        >
                            <div
                                className="
                                    col-start-0
                                    min-w-0
                                "
                            >
                                <span
                                    className="
                                        text-xs
                                        font-bold
                                        text-fg
                                    "
                                >
                                    Create custom theme
                                </span>

                                <span
                                    className="
                                        text-[11px]
                                        text-fg/50
                                    "
                                >
                                    Select your own colors
                                </span>
                            </div>

                            <DynamicSvgIcon
                                name="palette.svg"
                                className="
                                    size-5
                                    shrink-0
                                    fill-fg/80
                                "
                            />
                        </div>

                        <Hr mode="horizontal" />

                        <div
                            className="
                                col-stretch-1
                                mt-1
                            "
                        >
                            <label
                                htmlFor="theme-background"
                                className="
                                    row-center-2
                                    min-h-8
                                    justify-between
                                "
                            >
                                <span
                                    className="
                                        text-[12px]
                                        text-fg/70
                                    "
                                >
                                    Background
                                </span>

                                <div
                                    className="
                                        row-center-2
                                    "
                                >
                                    <span
                                        className="
                                            font-mono
                                            text-[10px]
                                            text-fg/45
                                        "
                                    >
                                        {customColors.background}
                                    </span>

                                    <input
                                        id="theme-background"
                                        type="color"
                                        value={customColors.background}
                                        aria-label="Background color"
                                        className="
                                            h-6
                                            w-9
                                            shrink-0
                                            cursor-pointer
                                            overflow-hidden
                                            rounded-[6px]
                                            border-1
                                            border-fg/15
                                            bg-transparent
                                            p-0
                                        "
                                        onChange={(event) => {
                                            setCustomColors((current) => ({
                                                ...current,
                                                background: event.target.value,
                                            }));
                                        }}
                                    />
                                </div>
                            </label>

                            <label
                                htmlFor="theme-foreground"
                                className="
                                    row-center-2
                                    min-h-8
                                    justify-between
                                "
                            >
                                <span
                                    className="
                                        text-[12px]
                                        text-fg/70
                                    "
                                >
                                    Foreground
                                </span>

                                <div
                                    className="
                                        row-center-2
                                    "
                                >
                                    <span
                                        className="
                                            font-mono
                                            text-[10px]
                                            text-fg/45
                                        "
                                    >
                                        {customColors.foreground}
                                    </span>

                                    <input
                                        id="theme-foreground"
                                        type="color"
                                        value={customColors.foreground}
                                        aria-label="Foreground color"
                                        className="
                                            h-6
                                            w-9
                                            shrink-0
                                            cursor-pointer
                                            overflow-hidden
                                            rounded-[6px]
                                            border-1
                                            border-fg/15
                                            bg-transparent
                                            p-0
                                        "
                                        onChange={(event) => {
                                            setCustomColors((current) => ({
                                                ...current,
                                                foreground: event.target.value,
                                            }));
                                        }}
                                    />
                                </div>
                            </label>
                        </div>

                        <GeneralButton
                            variant="frame"
                            className="
                                ml-auto!
                                mt-1!
                                w-auto!
                                shrink-0!
                                text-fg!
                                rounded-[8px]!
                            "
                            textButton="Apply colors"
                            handleAction={handleCustomTheme}
                        />
                    </div>
                </div>
            </Popup>
        </div>
    );
};
