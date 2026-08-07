"use client";
import { HowUse } from "@/components/HowUse/HowUse";
import { Install } from "@/components/Install/Install";
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
                packageName="use-image-preview"
            >
                use Image Preview
            </TitlePost>

            <Install packageName="use-image-preview" />
            <HowUse>
                <Example />
            </HowUse>

            <ImageDropZone />
        </div>
    );
};
