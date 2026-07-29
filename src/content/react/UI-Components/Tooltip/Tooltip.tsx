"use client";
import { HowUse } from "@/components/HowUse/HowUse";
import { Install } from "@/components/Install/Install";
import { Version } from "@/components/notes/Version/Version";
import { TitlePost } from "@/components/titles/TitlePost/TitlePost";
import { useAppContextActions } from "@/context/appContext";
import Image from "next/image";
import { useEffect } from "react";

import { CustomTheme } from "./CustomTheme";
import { Example } from "./Example";
import { GlobalConfiguration } from "./GlobalConfiguration";
import { LocalConfiguration } from "./LocalConfiguration";
import { Tooltips } from "./Tooltips";

export const Tooltip = () => {
    const { header } = useAppContextActions();
    const { setIconHeader, setTitleHeader } = header || {};

    useEffect(() => {
        setIconHeader(
            <Image
                className="w-8 h-8"
                src="/tooltip.svg"
                alt="tooltip.svg"
                width={40}
                height={40}
            />,
        );
        setTitleHeader("Tooltip");
    }, [setIconHeader, setTitleHeader]);

    return (
        <div className="flex flex-col gap-4">
            <TitlePost
                icon="tooltip.svg"
                description="Tooltip for React and Next.js."
                date="07/29/2026"
            >
                Tooltip
            </TitlePost>

            <Version
                recordings={[
                    {
                        version: "1.0.0",
                        date: "07/28/2026",
                        title: "Publish",
                        description: "Created component",
                    },
                ].reverse()}
            />

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
