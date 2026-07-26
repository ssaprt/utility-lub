"use client";
import { HowUse } from "@/components/HowUse/HowUse";
import { Install } from "@/components/Install/Install";
import { Version } from "@/components/notes/Version/Version";
import { TablerIcon } from "@/components/titles/TitlePost/TablerIcon";
import { TitlePost } from "@/components/titles/TitlePost/TitlePost";
import { useAppContextActions } from "@/context/appContext";
import { useEffect } from "react";
import { Example } from "./Example";
import { ImageDropZone } from "./ImageDropZone";

export const UseImagePreview = () => {
    const { header } = useAppContextActions();
    const { setIconHeader, setTitleHeader } = header || {};

    useEffect(() => {
        setIconHeader(<TablerIcon name="scan-eye" />);
        setTitleHeader("use Image Preview");
    }, [setIconHeader, setTitleHeader]);

    return (
        <div className="flex flex-col gap-4 ">
            <TitlePost
                icon="scan-eye"
                description="Media file preview for React and Next.js. This hook allows for quick use of any type of media (photos/videos), as well as previews and quick clearing"
                date="07/26/2026"
            >
                use Image Preview
            </TitlePost>

            <Version
                recordings={[
                    {
                        version: "1.0.0",
                        date: "07/08/2026",
                        title: "Publish",
                        description: "Created component",
                    },
                    {
                        version: "1.0.1",
                        date: "07/14/2026",
                        title: "Restructuring",
                        description: "reduction in the amount of code",
                    },
                    {
                        version: "1.0.2",
                        date: "07/26/2026",
                        title: "Fixed bugs",
                        description: "Fixed DragEvent error",
                    },
                    {
                        version: "1.0.3",
                        date: "07/26/2026",
                        title: "Added type",
                        description:
                            'added return type "image" | "video" | null',
                    },
                ].reverse()}
            />

            <Install packageName="use-image-preview" />
            <HowUse>
                <Example />
            </HowUse>

            <ImageDropZone />
        </div>
    );
};
