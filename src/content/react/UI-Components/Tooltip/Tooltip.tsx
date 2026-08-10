"use client";
import { HowUse } from "@/components/HowUse/HowUse";
import { Install } from "@/components/Install/Install";
import { TitlePost } from "@/components/titles/TitlePost/TitlePost";
import { useAppContextActions } from "@/context/appContext";
import { useEffect } from "react";

import TooltipIcon from "@/icons/tooltip.svg";
import { CustomTheme } from "./CustomTheme";
import { Example } from "./Example";
import { GlobalConfiguration } from "./GlobalConfiguration";
import { LocalConfiguration } from "./LocalConfiguration";
import { Tooltips } from "./Tooltips";

export const Tooltip = () => {
    const { header } = useAppContextActions();
    const { setIconHeader, setTitleHeader } = header || {};

    useEffect(() => {
        setIconHeader(<TooltipIcon className="w-8 h-8 fill-fg" />);
        setTitleHeader("Tooltip");
    }, [setIconHeader, setTitleHeader]);

    return (
        <div className="flex flex-col gap-4">
            <TitlePost
                icon={{
                    component: <TooltipIcon />,
                    meta: "tooltip.svg",
                }}
                description="Tooltip for React and Next.js."
                packageName="@ssaprt/tooltip"
            >
                Tooltip
            </TitlePost>

            <Install packageName="@ssaprt/tooltip" />

            <HowUse>
                <Example />
                <LocalConfiguration />
                <GlobalConfiguration />
                <CustomTheme />
            </HowUse>

            <Tooltips />
        </div>
    );
};
