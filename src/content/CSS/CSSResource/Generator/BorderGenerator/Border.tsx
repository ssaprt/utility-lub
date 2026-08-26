"use client";

import { AIAgent } from "@/AI/AIAgent";
import { TitlePost } from "@/components/titles/TitlePost/TitlePost";
import { useAppContextActions } from "@/context/appContext";

import { useEffect, useState } from "react";

import { defaultBorderConfig, type BorderConfig } from "./border.type";

import { DynamicSvgIcon } from "@/components/svg/DynamicSVGIcon";
import { IsGenerator } from "./IsGenerator";

export const Border = () => {
    const { header } = useAppContextActions();

    const { setIconHeader, setTitleHeader } = header || {};

    const [config, setConfig] = useState<BorderConfig>(defaultBorderConfig);

    useEffect(() => {
        setIconHeader(
            <DynamicSvgIcon
                name="border_style.svg"
                className="size-8 fill-fg"
            />,
        );

        setTitleHeader("Border Generator");
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
                description="Create and customize CSS borders, configure each side independently and visually design complex border-radius shapes"
                hideVersion
            >
                Border Generator
            </TitlePost>

            <IsGenerator config={config} setConfig={setConfig} />
        </div>
    );
};
