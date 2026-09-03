"use client";

import { DynamicSvgIcon } from "@/components/svg/DynamicSVGIcon";
import { useAppContextActions } from "@/context/appContext";
import { Search } from "../Left/Search/Search";
import { ToggleTheme } from "./ToggleTheme";

export const Right = () => {
    const { setViewRadioController } = useAppContextActions();

    return (
        <div
            className="
                relative
                z-10
                flex
                shrink-0
                flex-row
                items-center
                gap-2
                pr-2
            "
        >
            <Search />

            <div className="shrink-0">
                <ToggleTheme />
            </div>

            <div
                className="
                            row-center-0
                            h-8
                            w-8
                            justify-center
                        "
            >
                <button
                    onClick={() =>
                        setViewRadioController((prev) => {
                            if (prev === "hidden") {
                                return "large";
                            }
                            return prev;
                        })
                    }
                    type="button"
                    aria-label="Open radio"

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
                >
                    <DynamicSvgIcon
                        name="fm_radio.svg"
                        className="
                                    size-5
                                    fill-fg
                                "
                    />
                </button>
            </div>
        </div>
    );
};
