"use client";

import { useTheme } from "next-themes";
import {
    useCallback,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
    useSyncExternalStore,
} from "react";

import { GeneralButton } from "@/components/button/GeneralButton/GeneralButton";
import { DynamicSvgIcon } from "@/components/svg/DynamicSVGIcon";
import { Popup } from "popup-from-future";
import { Theme } from "./Theme";

const subscribe = () => {
    return () => {};
};

const themes = [
    {
        theme: "primary",
        svgPath: "mana.svg",
    },
    {
        theme: "light",
        svgPath: "lights.svg",
    },
    {
        theme: "dark",
        svgPath: "dark.svg",
    },
    {
        theme: "midnight",
        svgPath: "fog.svg",
    },
    {
        theme: "tree",
        svgPath: "evergreen.svg",
    },
];

const ELEVATOR_SIZE = 20;

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
    const { resolvedTheme, setTheme } = useTheme();

    const [open, setOpen] = useState(false);

    const [positionReady, setPositionReady] = useState(false);

    const [top, setTop] = useState(0);

    const [customColors, setCustomColors] = useState<CustomColors>({
        background: "#8654b3",
        foreground: "#fbcde6",
    });

    const itemsContainerRef = useRef<HTMLDivElement | null>(null);

    const mounted = useSyncExternalStore(
        subscribe,
        () => true,
        () => false,
    );

    const handleThemeChange = useCallback(
        (theme: string) => {
            if (!mounted) return;

            clearCustomColors();

            const storedTheme: StoredTheme = {
                mode: "theme",
                theme,
            };

            localStorage.setItem(
                THEME_STORAGE_KEY,
                JSON.stringify(storedTheme),
            );

            setTheme(theme);
        },
        [mounted, setTheme],
    );

    const handleCustomTheme = useCallback(() => {
        if (!mounted) return;

        applyCustomColors(customColors);

        const storedTheme: StoredTheme = {
            mode: "custom",
            background: customColors.background,
            foreground: customColors.foreground,
        };

        localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(storedTheme));

        setTheme("custom");
    }, [customColors, mounted, setTheme]);

    const updatePosition = useCallback((container?: HTMLDivElement | null) => {
        const target = container ?? itemsContainerRef.current;

        if (!target) return;

        const themeBlock = target.querySelector(
            '[data-select-theme="true"]',
        ) as HTMLDivElement | null;

        if (!themeBlock) return;

        const nextTop =
            themeBlock.offsetTop +
            themeBlock.offsetHeight / 2 -
            ELEVATOR_SIZE / 2;

        setTop(nextTop);
        setPositionReady(true);
    }, []);

    const setItemsContainerRef = useCallback(
        (node: HTMLDivElement | null) => {
            itemsContainerRef.current = node;

            if (!node) {
                setPositionReady(false);
                return;
            }

            updatePosition(node);
        },
        [updatePosition],
    );

    useLayoutEffect(() => {
        if (!open) return;

        updatePosition();
    }, [open, resolvedTheme, updatePosition]);

    useEffect(() => {
        if (!mounted) return;

        const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);

        if (!savedTheme) return;

        try {
            const parsed = JSON.parse(savedTheme) as StoredTheme;

            if (parsed.mode === "custom") {
                const colors: CustomColors = {
                    background: parsed.background,
                    foreground: parsed.foreground,
                };
                //eslint-disable-next-line
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
                justify-center
                w-8
                h-8
                cursor-pointer
            "
            onClick={() => setOpen(true)}
        >
            <DynamicSvgIcon name="palette.svg" className="w-5 h-5 fill-fg" />
            <Popup
                isOpen={open}
                open={() => setOpen(false)}
                hideOverlay={true}
                layer={{
                    className: "bg-transparent!",
                }}
                header={{
                    content: (
                        <div className="row-center-1">
                            <span
                                className="
            absolute
            flex
            w-5
            h-5
            items-center
            justify-center
        "
                            >
                                <DynamicSvgIcon
                                    className="
                w-5
                h-5
                fill-app
                rotate-45!
            "
                                    name="top-elevator.svg"
                                />
                            </span>

                            <span className="text-app ml-7">
                                Theme settings
                            </span>
                        </div>
                    ),
                }}
                animation={{
                    open: {
                        animationName: "glow-in",
                        duration: 300,
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
                            w-[60px]!
                            min-h-auto!
                            bg-fg!
                            shadow-none!
                            text-fg!
                            col-start-0!
                        `,
                    },

                    body: {
                        className:
                            "w-full h-full col-start-0! justify-start! mt-2 overflow-visible!",
                    },

                    header: {
                        className:
                            "text-[var(--background)]! text-sm font-bold!",
                    },
                }}
                close={{
                    className: "text-[var(--background)]! top-[3px]!",
                }}
            >
                <div className="row-stretch-2 w-full">
                    <div
                        className={`
    w-5
    shrink-0
    bg-app/0
    rounded-[2px]
    relative

    before:absolute
    before:top-[-8px]
    before:content-['']
    before:w-[2px]
    before:left-[calc(50%+1px)]
    before:-translate-x-1/2
    before:h-[var(--before-height)]!
    before:border-l-1
    before:border-dashed
    before:border-app

    ${
        positionReady
            ? `
                before:transition-[height]
                before:duration-300
                before:ease-in-out
            `
            : ""
    }
`}
                        style={
                            {
                                "--before-height": positionReady
                                    ? `${top + 8}px`
                                    : "0px",
                            } as React.CSSProperties
                        }
                    >
                        <span
                            className="
        absolute
        left-0
        flex
        w-[20px]
        h-[20px]
        shrink-0
        items-center
        justify-center
        transition-[top,opacity]
        duration-300
        ease-in-out
    "
                            style={{
                                top: `${top}px`,
                                opacity: positionReady ? 1 : 0,
                            }}
                        >
                            <DynamicSvgIcon
                                name="elevator.svg"
                                className="
            w-[20px]
            h-[20px]
            fill-app
        "
                            />
                        </span>
                    </div>

                    <div
                        ref={setItemsContainerRef}
                        className="
                            col-stretch-1
                            relative
                            w-full
                        "
                    >
                        {themes.map(({ theme, svgPath }) => (
                            <Theme
                                key={theme}
                                theme={theme}
                                svgPath={svgPath}
                                handleChange={() => handleThemeChange(theme)}
                            />
                        ))}

                        <div
                            data-select-theme={resolvedTheme === "custom"}
                            className="
                                col-stretch-1
                                mt-2
                                bg-app
                                p-2
                                rounded-[2px_2px_12px_2px]
                            "
                        >
                            <span className="text-fg text-xs font-bold ml-auto">
                                Your custom theme
                            </span>

                            <label htmlFor="biba" className="row-center-1">
                                <span className="text-fg text-[12px]">
                                    Background
                                </span>

                                <input
                                    value={customColors.background}
                                    onChange={(event) => {
                                        setCustomColors((current) => ({
                                            ...current,
                                            background: event.target.value,
                                        }));
                                    }}
                                    type="color"
                                    id="biba"
                                    className="
                                        w-1/2
                                        shrink-0
                                        cursor-pointer
                                        flex-1
                                    "
                                />
                            </label>

                            <label htmlFor="boba" className="row-center-1">
                                <span className="text-fg text-[12px]">
                                    Foreground
                                </span>

                                <input
                                    value={customColors.foreground}
                                    onChange={(event) => {
                                        setCustomColors((current) => ({
                                            ...current,
                                            foreground: event.target.value,
                                        }));
                                    }}
                                    type="color"
                                    id="boba"
                                    className="
                                        w-1/2
                                        shrink-0
                                        cursor-pointer
                                        flex-1
                                    "
                                />
                            </label>

                            <GeneralButton
                                variant="solid"
                                className="
                                    text-app!
                                    w-auto!
                                    ml-auto!
                                    shrink-0!
                                "
                                textButton="Set custom theme"
                                handleAction={handleCustomTheme}
                            />
                        </div>
                    </div>
                </div>
            </Popup>
        </div>
    );
};

// "use client";

// import { useTheme } from "next-themes";
// import {
//     useCallback,
//     useEffect,
//     useLayoutEffect,
//     useRef,
//     useState,
//     useSyncExternalStore,
// } from "react";

// import { GeneralButton } from "@/components/button/GeneralButton/GeneralButton";
// import { DynamicSvgIcon } from "@/components/svg/DynamicSVGIcon";
// import { Tooltip } from "@ssaprt/tooltip";
// import { Theme } from "./Theme";

// const subscribe = () => {
//     return () => {};
// };

// const themes = [
//     {
//         theme: "primary",
//         svgPath: "mana.svg",
//     },
//     {
//         theme: "light",
//         svgPath: "lights.svg",
//     },
//     {
//         theme: "dark",
//         svgPath: "dark.svg",
//     },
//     {
//         theme: "midnight",
//         svgPath: "fog.svg",
//     },
//     {
//         theme: "tree",
//         svgPath: "evergreen.svg",
//     },
// ];

// const ELEVATOR_SIZE = 20;

// const THEME_STORAGE_KEY = "app-theme";

// interface CustomColors {
//     background: string;
//     foreground: string;
// }

// type StoredTheme =
//     | {
//           mode: "theme";
//           theme: string;
//       }
//     | {
//           mode: "custom";
//           background: string;
//           foreground: string;
//       };

// const applyCustomColors = ({ background, foreground }: CustomColors) => {
//     const root = document.documentElement;

//     root.style.setProperty("--background", background);

//     root.style.setProperty("--foreground", foreground);
// };

// const clearCustomColors = () => {
//     const root = document.documentElement;

//     root.style.removeProperty("--background");
//     root.style.removeProperty("--foreground");
// };

// export const ToggleTheme = () => {
//     const { resolvedTheme, setTheme } = useTheme();

//     const [open, setOpen] = useState(false);

//     const [positionReady, setPositionReady] = useState(false);

//     const [top, setTop] = useState(0);

//     const [customColors, setCustomColors] = useState<CustomColors>({
//         background: "#8654b3",
//         foreground: "#fbcde6",
//     });

//     const itemsContainerRef = useRef<HTMLDivElement | null>(null);

//     const mounted = useSyncExternalStore(
//         subscribe,
//         () => true,
//         () => false,
//     );

//     const handleThemeChange = useCallback(
//         (theme: string) => {
//             if (!mounted) return;

//             clearCustomColors();

//             const storedTheme: StoredTheme = {
//                 mode: "theme",
//                 theme,
//             };

//             localStorage.setItem(
//                 THEME_STORAGE_KEY,
//                 JSON.stringify(storedTheme),
//             );

//             setTheme(theme);
//         },
//         [mounted, setTheme],
//     );

//     const handleCustomTheme = useCallback(() => {
//         if (!mounted) return;

//         applyCustomColors(customColors);

//         const storedTheme: StoredTheme = {
//             mode: "custom",
//             background: customColors.background,
//             foreground: customColors.foreground,
//         };

//         localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(storedTheme));

//         setTheme("custom");
//     }, [customColors, mounted, setTheme]);

//     const updatePosition = useCallback((container?: HTMLDivElement | null) => {
//         const target = container ?? itemsContainerRef.current;

//         if (!target) return;

//         const themeBlock = target.querySelector(
//             '[data-select-theme="true"]',
//         ) as HTMLDivElement | null;

//         if (!themeBlock) return;

//         const nextTop =
//             themeBlock.offsetTop +
//             themeBlock.offsetHeight / 2 -
//             ELEVATOR_SIZE / 2;

//         setTop(nextTop);
//         setPositionReady(true);
//     }, []);

//     const setItemsContainerRef = useCallback(
//         (node: HTMLDivElement | null) => {
//             itemsContainerRef.current = node;

//             if (!node) {
//                 setPositionReady(false);
//                 return;
//             }

//             updatePosition(node);
//         },
//         [updatePosition],
//     );

//     useLayoutEffect(() => {
//         if (!open) return;

//         updatePosition();
//     }, [open, resolvedTheme, updatePosition]);

//     useEffect(() => {
//         if (!mounted) return;

//         const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);

//         if (!savedTheme) return;

//         try {
//             const parsed = JSON.parse(savedTheme) as StoredTheme;

//             if (parsed.mode === "custom") {
//                 const colors: CustomColors = {
//                     background: parsed.background,
//                     foreground: parsed.foreground,
//                 };
//                 //eslint-disable-next-line
//                 setCustomColors(colors);

//                 applyCustomColors(colors);

//                 setTheme("custom");

//                 return;
//             }

//             clearCustomColors();

//             setTheme(parsed.theme);
//         } catch {
//             localStorage.removeItem(THEME_STORAGE_KEY);
//         }
//     }, [mounted, setTheme]);

//     return (
//         <div
//             className="
//                 row-center-0
//                 justify-center
//                 w-8
//                 h-8
//                 cursor-pointer
//             "
//             onClick={() => setOpen(true)}
//         >
//             <Tooltip
//                 customTheme={{
//                     body: {
//                         background: "transparent",
//                         className: "bg-fg! rounded-[14px]!",
//                         filter: "none",
//                     },
//                 }}
//                 content={
//                     <div className="row-stretch-2 w-full">
//                         <div
//                             className="
//                             w-5
//                             shrink-0
//                             bg-app/0
//                             rounded-[2px]
//                             relative

//                             before:absolute
//                             before:top-[-8px]
//                             before:content-['']
//                             before:w-[2px]
//                             before:left-[calc(50%+1px)]
//                             before:-translate-x-1/2
//                             before:h-[var(--before-height)]!
//                             before:border-l-1
//                             before:border-dashed
//                             before:border-app
//                             before:transition-[height]
//                             before:duration-300
//                             before:ease-in-out
//                         "
//                             style={
//                                 {
//                                     "--before-height": positionReady
//                                         ? `${top + 8}px`
//                                         : "0px",
//                                 } as React.CSSProperties
//                             }
//                         >
//                             {positionReady && (
//                                 <DynamicSvgIcon
//                                     name="elevator.svg"
//                                     className="
//                                     absolute!
//                                     w-[20px]
//                                     h-[20px]
//                                     shrink-0!
//                                     left-0
//                                     fill-app
//                                     transition-[top]
//                                     duration-300
//                                     ease-in-out
//                                 "
//                                     style={{
//                                         top: `${top}px`,
//                                     }}
//                                 />
//                             )}
//                         </div>

//                         <div
//                             ref={setItemsContainerRef}
//                             className="
//                             col-stretch-1
//                             relative
//                             w-full
//                         "
//                         >
//                             {themes.map(({ theme, svgPath }) => (
//                                 <Theme
//                                     key={theme}
//                                     theme={theme}
//                                     svgPath={svgPath}
//                                     handleChange={() =>
//                                         handleThemeChange(theme)
//                                     }
//                                 />
//                             ))}

//                             <div
//                                 data-select-theme={resolvedTheme === "custom"}
//                                 className="
//                                 col-stretch-1
//                                 mt-2
//                                 bg-app
//                                 p-2
//                                 rounded-[2px_2px_12px_2px]
//                             "
//                             >
//                                 <span className="text-fg text-xs font-bold ml-auto">
//                                     Your custom theme
//                                 </span>

//                                 <label htmlFor="biba" className="row-center-1">
//                                     <span className="text-fg text-[12px]">
//                                         Background
//                                     </span>

//                                     <input
//                                         value={customColors.background}
//                                         onChange={(event) => {
//                                             setCustomColors((current) => ({
//                                                 ...current,
//                                                 background: event.target.value,
//                                             }));
//                                         }}
//                                         type="color"
//                                         id="biba"
//                                         className="
//                                         w-1/2
//                                         shrink-0
//                                         cursor-pointer
//                                         flex-1
//                                     "
//                                     />
//                                 </label>

//                                 <label htmlFor="boba" className="row-center-1">
//                                     <span className="text-fg text-[12px]">
//                                         Foreground
//                                     </span>

//                                     <input
//                                         value={customColors.foreground}
//                                         onChange={(event) => {
//                                             setCustomColors((current) => ({
//                                                 ...current,
//                                                 foreground: event.target.value,
//                                             }));
//                                         }}
//                                         type="color"
//                                         id="boba"
//                                         className="
//                                         w-1/2
//                                         shrink-0
//                                         cursor-pointer
//                                         flex-1
//                                     "
//                                     />
//                                 </label>

//                                 <GeneralButton
//                                     variant="solid"
//                                     className="
//                                     text-app!
//                                     w-auto!
//                                     ml-auto!
//                                     shrink-0!
//                                 "
//                                     textButton="Set custom theme"
//                                     handleAction={handleCustomTheme}
//                                 />
//                             </div>
//                         </div>
//                     </div>
//                 }
//                 interactive
//             >
//                 <DynamicSvgIcon
//                     name="palette.svg"
//                     className="w-5 h-5 fill-fg"
//                 />
//             </Tooltip>
//         </div>
//     );
// };
