"use client";

import { IconBrandGithub } from "@tabler/icons-react";
import { Search } from "../Left/Search/Search";
import { ToggleTheme } from "./ToggleTheme";

export const Right = () => {
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

            <a
                href="https://github.com/ssaprt/utility-lab"
                target="_blank"
                rel="noreferrer"
                className="
                    my-2
                    flex
                    shrink-0
                    flex-row
                    items-center
                    gap-2
                    rounded-full
                    px-1
                    py-1
                    select-none
                    hover:[&>svg]:stroke-fg/50
                "
            >
                <IconBrandGithub className="h-5 w-5 shrink-0 stroke-fg" />
            </a>

            <div className="shrink-0">
                <ToggleTheme />
            </div>
        </div>
    );
};
