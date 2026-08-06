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
                date="07/30/2026"
            >
                Tooltip
            </TitlePost>

            <Version
                recordings={[
                    {
                        version: "1.0.0",
                        date: "07/29/2026",
                        title: "Publish",
                        description: "Created component",
                    },
                    {
                        version: "1.0.1",
                        date: "07/30/2026",
                        title: "Fixed bugs",
                        description:
                            "Fixed the behavior of the needle; it no longer goes beyond the limits",
                    },
                    {
                        version: "1.0.2",
                        date: "07/30/2026",
                        title: "Fixed bugs",
                        description:
                            "Fixed behavior regarding accidental opening during scrolling on touch devices",
                    },
                    {
                        version: "1.0.3",
                        date: "07/30/2026",
                        title: "Fixed bugs",
                        description: "Fixed the behavior of certain animations",
                    },
                    {
                        version: "1.0.4",
                        date: "07/30/2026",
                        title: "Fixed bugs",
                        description:
                            "Fixed an issue occurring when hovering over an interactive tooltip; adjacent tooltips are no longer affected",
                    },
                    {
                        version: "1.0.5",
                        date: "07/30/2026",
                        title: "Optimization",
                        description: "Optimization animations some themes",
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
