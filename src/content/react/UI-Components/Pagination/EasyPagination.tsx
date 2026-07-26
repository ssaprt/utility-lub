"use client";
import { Version } from "@/components/notes/Version/Version";
import { TablerIcon } from "@/components/titles/TitlePost/TablerIcon";
import { TitlePost } from "@/components/titles/TitlePost/TitlePost";
import { useAppContextActions } from "@/context/appContext";
import "@ssaprt/easy-pagination/style.css";
import { useEffect } from "react";
import { Install } from "../../../../components/Install/Install";
import { DotSettings } from "./components/HowUse/DotSettings";
import { Example } from "./components/HowUse/Example";

import { HowUse } from "@/components/HowUse/HowUse";
import { Indexing } from "./components/HowUse/Indexing";
import { YourTheme } from "./components/HowUse/YourTheme";
import { Theme } from "./components/Theme/Theme";

export const EasyPagination = () => {
    const { header } = useAppContextActions();
    const { setIconHeader, setTitleHeader } = header || {};

    useEffect(() => {
        setIconHeader(<TablerIcon name="walk" />);
        setTitleHeader("Easy Pagination");
    }, [setIconHeader, setTitleHeader]);

    return (
        <div className="flex flex-col w-full h-auto gap-8 z-2">
            <TitlePost
                icon="walk"
                description="Adaptation Easy Pagination for React and Next.js."
                date="07/24/2026"
            >
                Easy Pagination
            </TitlePost>

            <Version
                recordings={[
                    {
                        version: "1.0.0",
                        date: "07/14/2026",
                        title: "Publish",
                        description: "Created component",
                    },
                    {
                        version: "1.0.1",
                        date: "07/14/2026",
                        title: "Delete some types",
                        description: "Deleted types and interfaces",
                    },
                    {
                        version: "1.0.2",
                        date: "07/14/2026",
                        title: "Fixed bugs",
                        description: "Delete console logs",
                    },
                    {
                        version: "1.0.3",
                        date: "07/15/2026",
                        title: "Fixed bugs",
                        description: "Fixed position of buttons",
                    },
                    {
                        version: "1.0.4",
                        date: "07/15/2026",
                        title: "Fixed bugs",
                        description: "Fixed size container",
                    },
                    {
                        version: "1.0.5",
                        date: "07/15/2026",
                        title: "Fixed bugs",
                        description: "Fixed animation",
                    },
                    {
                        version: "1.0.6",
                        date: "07/15/2026",
                        title: "Fixed bugs",
                        description:
                            "Slider behavior has been modified based on screen size and content compression",
                    },
                    {
                        version: "1.0.7",
                        date: "07/17/2026",
                        title: "Added indexing",
                        description:
                            "Indexing support added. Writing to localStorage and URL",
                    },
                    {
                        version: "1.0.8",
                        date: "07/24/2026",
                        title: "Fixed bugs",
                        description:
                            "Fixed indexing behavior. Resolved an issue when working with Next Link",
                    },
                    {
                        version: "1.0.9",
                        date: "07/24/2026",
                        title: "Fixed bugs",
                        description: "Delete empty constants",
                    },
                    {
                        version: "1.0.10",
                        date: "07/24/2026",
                        title: "Fixed bugs",
                        description: "Delete logs",
                    },
                    {
                        version: "1.0.11",
                        date: "07/24/2026",
                        title: "Fixed bugs",
                        description:
                            "Behavior changed: the component no longer automatically writes the pagination index upon loading; it waits until the first click",
                    },
                    {
                        version: "1.0.12",
                        date: "07/24/2026",
                        title: "Fixed bugs",
                        description: "Code changes that do not affect behavior",
                    },
                    {
                        version: "1.0.13",
                        date: "07/24/2026",
                        title: "Improvements",
                        description: "Code changes that do not affect behavior",
                    },
                    {
                        version: "1.0.14",
                        date: "07/24/2026",
                        title: "Improvements",
                        description: "Code changes that do not affect behavior",
                    },
                ].reverse()}
            />
            <Install packageName="@ssaprt/easy-pagination" />
            <HowUse>
                <Example />
                <Indexing />
                <DotSettings />
                <YourTheme />
            </HowUse>
            <Theme />
        </div>
    );
};
