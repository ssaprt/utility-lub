"use client";

import { AIAgent } from "@/AI/AIAgent";
import { DynamicSvgIcon } from "@/components/svg/DynamicSVGIcon";
import { TitlePost } from "@/components/titles/TitlePost/TitlePost";
import { useAppContextActions } from "@/context/appContext";
import { useEffect, useState } from "react";
import {
    defaultBorderImageConfig,
    type BorderImageConfig,
} from "./border-image.type";
import { IsGenerator } from "./IsGenerator";

export const BorderImage = () => {
    const { header } = useAppContextActions();
    const { setIconHeader, setTitleHeader } = header;
    const [config, setConfig] = useState<BorderImageConfig>(
        defaultBorderImageConfig,
    );

    useEffect(() => {
        setIconHeader(
            <DynamicSvgIcon
                name="border_style.svg"
                className="size-8 fill-fg"
            />,
        );
        setTitleHeader("Border Image Generator");
    }, [setIconHeader, setTitleHeader]);

    return (
        <div className="z-2 flex h-auto w-full flex-col gap-8">
            <AIAgent />

            <TitlePost
                icon={{
                    component: (
                        <DynamicSvgIcon
                            name="border_style.svg"
                            className="size-8 fill-fg"
                        />
                    ),
                    meta: "border_style.svg",
                }}
                description="Slice an image into a decorative border, tune every side and copy production-ready border-image CSS"
                hideVersion
            >
                Border Image Generator
            </TitlePost>

            <IsGenerator config={config} setConfig={setConfig} />
        </div>
    );
};
