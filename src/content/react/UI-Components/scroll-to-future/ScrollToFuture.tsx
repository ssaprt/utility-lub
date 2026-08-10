"use client";
import { HowUse } from "@/components/HowUse/HowUse";
import { Install } from "@/components/Install/Install";
import { TitlePost } from "@/components/titles/TitlePost/TitlePost";
import { useAppContextActions } from "@/context/appContext";
import ScrollToFutureIcon from "@/icons/scroll-to-future.svg";
import { useEffect } from "react";
import { Example } from "./Example";
import { MixTheme } from "./MixTheme";
import { ScrollBarSettings } from "./ScrollBarSettings";

export const ScrollToFuture = () => {
    const { header } = useAppContextActions();
    const { setIconHeader, setTitleHeader } = header || {};

    useEffect(() => {
        setIconHeader(<ScrollToFutureIcon className="w-8 h-8 fill-fg" />);
        setTitleHeader("scroll-to-future");
    }, [setIconHeader, setTitleHeader]);

    return (
        <div className="flex flex-col gap-4">
            <TitlePost
                icon={{
                    component: <ScrollToFutureIcon />,
                    meta: "scroll-to-future.svg",
                }}
                description="Scrollbar supporting both X and Y axes. Position settings for the start and end of the block. Custom positioning options (above or after the element). 20+ built-in themes"
                packageName="scroll-to-future"
            >
                scroll-to-future
            </TitlePost>

            <Install packageName="scroll-to-future" />
            <HowUse>
                <Example />
                <MixTheme />
            </HowUse>

            <ScrollBarSettings />
        </div>
    );
};
