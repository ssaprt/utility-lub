"use client";

import { IconBrandGithub } from "@tabler/icons-react";
import { Search } from "../Left/Search/Search";
import { ToggleTheme } from "./ToggleTheme";

const Text = () => {
    return <span className="hidden lg:block">Coffee</span>;
};

export const Right = () => {
    return (
        <div className="flex flex-row items-center gap-2 pr-2">
            <Search />

            {/* <AppLink href="/coffee">
                <GeneralButton
                    textButton={<Text />}
                    variant="ghost"
                    icon={
                        <DynamicSvgIcon
                            name="java.svg"
                            className="w-[20px] h-[20px] stroke-fg"
                        />
                    }
                />
            </AppLink> */}

            <a
                href="https://github.com/ssaprt/utility-lab"
                target="_blank"
                className="
                    my-2
                    flex
                    flex-row
                    items-center
                    select-none
                    gap-2
                    px-1
                    py-1
                    rounded-full
                    hover:[&>svg]:stroke-fg/50
                "
            >
                <IconBrandGithub className="w-[20px] h-[20px] stroke-fg" />
            </a>

            <ToggleTheme />
        </div>
    );
};
