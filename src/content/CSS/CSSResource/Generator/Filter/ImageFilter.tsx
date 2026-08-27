"use client";

import { AIAgent } from "@/AI/AIAgent";
import { TitlePost } from "@/components/titles/TitlePost/TitlePost";
import { useAppContextActions } from "@/context/appContext";

import { useEffect } from "react";

import { DynamicSvgIcon } from "@/components/svg/DynamicSVGIcon";
import { IsGenerator } from "./IsGenerator";

export const ImageFilter = () => {
    const { header } = useAppContextActions();

    const { setIconHeader, setTitleHeader } = header || {};

    useEffect(() => {
        setIconHeader(
            <DynamicSvgIcon name="filter.svg" className="size-8 fill-fg" />,
        );

        setTitleHeader("Image Filter Generator");
    }, [setIconHeader, setTitleHeader]);

    return (
        <div
            className="
                z-2
                flex
                h-auto
                w-full
                flex-col
                gap-8
            "
        >
            <AIAgent />

            <TitlePost
                icon={{
                    component: (
                        <DynamicSvgIcon
                            name="filter.svg"
                            className="size-8 fill-fg"
                        />
                    ),

                    meta: "filter.svg",
                }}
                description="Create CSS image filters visually, apply presets and fine-tune brightness, contrast, saturation, color effects and blur"
                hideVersion
            >
                Image Filter Generator
            </TitlePost>

            <IsGenerator />
        </div>
    );
};
