"use client";
import { HowUse } from "@/components/HowUse/HowUse";
import { Install } from "@/components/Install/Install";
import { Version } from "@/components/notes/Version/Version";
import { TablerIcon } from "@/components/titles/TitlePost/TablerIcon";
import { TitlePost } from "@/components/titles/TitlePost/TitlePost";
import { useAppContextActions } from "@/context/appContext";
import { useEffect } from "react";
import { Example } from "./Example";
import { MixTheme } from "./MixTheme";
import { ScrollBarSettings } from "./ScrollBarSettings";

export const ScrollToFuture = () => {
    const { header } = useAppContextActions();
    const { setIconHeader, setTitleHeader } = header || {};

    useEffect(() => {
        setIconHeader(<TablerIcon name="ufo" />);
        setTitleHeader("scroll-to-future");
    }, [setIconHeader, setTitleHeader]);

    return (
        <div className="flex flex-col gap-4">
            <TitlePost
                icon="ufo"
                description="Scrollbar supporting both X and Y axes. Position settings for the start and end of the block. Custom positioning options (above or after the element). 20+ built-in themes"
                date="07/26/2026"
            >
                scroll-to-future
            </TitlePost>

            <Version
                recordings={[
                    {
                        version: "1.0.0",
                        date: "07/19/2026",
                        title: "Publish",
                        description: "Created component",
                    },
                    {
                        version: "1.0.1",
                        date: "07/19/2026",
                        title: "Fixed bugs",
                        description: "Fixed positioning for mode 'after'",
                    },
                    {
                        version: "1.0.2",
                        date: "07/19/2026",
                        title: "Fixed bugs",
                        description:
                            "Fixed behavior when both axes are used simultaneously",
                    },
                    {
                        version: "1.0.3",
                        date: "07/19/2026",
                        title: "Fixed bugs",
                        description:
                            "Joint behavior has been fixed when using both axes",
                    },
                    {
                        version: "1.0.4",
                        date: "07/20/2026",
                        title: "Fixed bugs",
                        description:
                            "Fixed the thumb position; addressed cases where the thumb did not correctly reach the end of the scroll area",
                    },
                    {
                        version: "1.0.5",
                        date: "07/20/2026",
                        title: "Fixed bugs",
                        description:
                            "Removed functions that are no longer used",
                    },
                    {
                        version: "1.0.6",
                        date: "07/21/2026",
                        title: "Fixed bugs",
                        description:
                            "Fixed tracking of parent changes for the element to which the scrollbar overlay is attached",
                    },
                    {
                        version: "1.0.7",
                        date: "07/21/2026",
                        title: "Fixed bugs",
                        description: "Removed types that are no longer used",
                    },
                    {
                        version: "1.0.8",
                        date: "07/21/2026",
                        title: "Fixed bugs",
                        description: "Removed methods that are no longer used",
                    },
                    {
                        version: "1.0.9",
                        date: "07/25/2026",
                        title: "Fixed bugs",
                        description:
                            "Fixed scrollbar behavior: the scrollbar now correctly hides when used in windows that extend beyond the viewport",
                    },
                    {
                        version: "1.0.10",
                        date: "07/26/2026",
                        title: "Fixed bugs",
                        description:
                            "Fixed positioning for mode 'after': the scrollbar now correctly appears after the element",
                    },
                    {
                        version: "1.0.11",
                        date: "07/26/2026",
                        title: "Fixed bugs",
                        description:
                            "Fixed positioning on viewport resize: the scrollbar now correctly appears when the viewport is resized",
                    },
                    {
                        version: "1.0.12",
                        date: "07/26/2026",
                        title: "Fixed bugs",
                        description:
                            "Fixed animations: the scrollbar now correctly appears when the viewport is resized",
                    },
                ].reverse()}
            />

            <Install packageName="scroll-to-future" />
            <HowUse>
                <Example />
                <MixTheme />
            </HowUse>

            <ScrollBarSettings />
        </div>
    );
};
