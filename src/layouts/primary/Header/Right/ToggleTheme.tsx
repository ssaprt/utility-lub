import { useTheme } from "next-themes";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

import { DynamicSvgIcon } from "@/components/svg/DynamicSVGIcon";
import { Popup } from "popup-from-future";

const subscribe = () => {
    return () => {};
};

export const ToggleTheme = () => {
    const { resolvedTheme, setTheme } = useTheme();
    const [open, setOpen] = useState(false);
    const itemsContainerRef = useRef<HTMLDivElement | null>(null);
    const [props, setProps] = useState({
        size: {
            height: 0,
        },
        position: {
            top: 0,
        },
    });

    const mounted = useSyncExternalStore(
        subscribe,
        () => true,
        () => false,
    );

    const handleThemeChange = (theme: string) => () => {
        if (mounted) {
            setTheme(theme);
        }
    };

    useEffect(() => {
        const container = itemsContainerRef.current;
        if (!container) return;

        const themeBlock = container.querySelector(
            "div[data-select-theme=true]",
        ) as HTMLDivElement;
        if (!themeBlock) return;

        const height = themeBlock.clientHeight;
        const topA = themeBlock.offsetTop;
        const top = topA + height / 2 - 20 / 2;

        setProps({
            size: {
                height: themeBlock.clientHeight,
            },
            position: {
                top: top,
            },
        });
    }, [resolvedTheme]);

    if (!itemsContainerRef) return null;

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
            <DynamicSvgIcon
                name="palette.svg"
                className="w-5 h-5 fill-fg"
                onClick={() => setOpen(true)}
            />

            <Popup
                isOpen={open}
                open={() => setOpen(false)}
                layer={{
                    className: "bg-transparent!",
                }}
                header={{
                    content: (
                        <div className="row-center-1">
                            <DynamicSvgIcon
                                className="absolute w-5 h-5 fill-app rotate-45!"
                                name="top-elevator.svg"
                            />
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
                            before:transition-[height]
                            before:duration-300
                            before:ease-in-out
                            before:h-[var(--before-top)]!
                            before:flex
                            before:border-l-1
                            before:border-dashed
                            before:border-app`}
                        style={
                            {
                                "--before-top": `${props.position.top + 8}px`,
                            } as React.CSSProperties
                        }
                    >
                        <DynamicSvgIcon
                            name="elevator.svg"
                            className={`
                                absolute!
                                w-[20px]
                                h-[20px]
                                shrink-0!
                                left-0
                                fill-app
                                transition-[top]
                                duration-300
                                ease-in-out
                            `}
                            style={{
                                top: `${props.position.top}px`,
                            }}
                        />
                    </div>

                    <div
                        className="col-stretch-1 w-full"
                        ref={itemsContainerRef}
                    >
                        <div
                            data-select-theme={resolvedTheme === "light"}
                            onClick={handleThemeChange("light")}
                            className={`row-center-1 justify-end py-[6px] px-2 rounded-[2px] bg-app hover:cursor-pointer ${resolvedTheme === "light" ? "bg-app/80" : ""}`}
                        >
                            <span className="text-fg text-xs">Light</span>
                            <DynamicSvgIcon
                                name="lights.svg"
                                className="w-5 h-5 fill-fg"
                            />
                        </div>
                        <div
                            data-select-theme={resolvedTheme === "dark"}
                            onClick={handleThemeChange("dark")}
                            className={`row-center-1 justify-end py-[6px] px-2 rounded-[2px] bg-app hover:cursor-pointer ${resolvedTheme === "dark" ? "bg-app/80" : ""}`}
                        >
                            <span className="text-fg text-xs">Dark</span>
                            <DynamicSvgIcon
                                name="dark.svg"
                                className="w-5 h-5 fill-fg"
                            />
                        </div>
                        <div
                            data-select-theme={resolvedTheme === "midnight"}
                            onClick={handleThemeChange("midnight")}
                            className={`row-center-1 justify-end py-[6px] px-2 rounded-[2px] bg-app hover:cursor-pointer ${resolvedTheme === "midnight" ? "bg-app/80" : ""}`}
                        >
                            <span className="text-fg text-xs">Midnight</span>
                            <DynamicSvgIcon
                                name="fog.svg"
                                className="w-5 h-5 fill-fg"
                            />
                        </div>
                        <div
                            data-select-theme={resolvedTheme === "tree"}
                            onClick={handleThemeChange("tree")}
                            className={`row-center-1 justify-end py-[6px] px-2 rounded-[2px] bg-app hover:cursor-pointer ${resolvedTheme === "tree" ? "bg-app/80" : ""}`}
                        >
                            <span className="text-fg text-xs">Tree</span>
                            <DynamicSvgIcon
                                name="evergreen.svg"
                                className="w-5 h-5 fill-fg"
                            />
                        </div>

                        <div
                            data-select-theme={resolvedTheme === "alter"}
                            onClick={handleThemeChange("alter")}
                            className={`row-center-1 justify-end py-[6px] px-2 rounded-[2px] bg-app hover:cursor-pointer ${resolvedTheme === "alter" ? "bg-app/80" : ""}`}
                        >
                            <span className="text-fg text-xs">Alter</span>
                            <DynamicSvgIcon
                                name="evergreen.svg"
                                className="w-5 h-5 fill-fg"
                            />
                        </div>
                    </div>
                </div>
            </Popup>
        </div>
    );
};
