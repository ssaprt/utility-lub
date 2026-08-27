"use client";

import { AIAgent } from "@/AI/AIAgent";
import { TitlePost } from "@/components/titles/TitlePost/TitlePost";
import { useAppContextActions } from "@/context/appContext";
import { useEffect, useState } from "react";

import { DynamicSvgIcon } from "@/components/svg/DynamicSVGIcon";
import { createDefaultFlexConfig, type FlexConfig } from "./flex.type";
import { IsGenerator } from "./IsGenerator";

export const Flex = () => {
    const { header } = useAppContextActions();

    const { setIconHeader, setTitleHeader } = header || {};

    const [config, setConfig] = useState<FlexConfig>(createDefaultFlexConfig);

    useEffect(() => {
        setIconHeader(
            <DynamicSvgIcon name="flex.svg" className="size-8 fill-fg" />,
        );

        setTitleHeader("Flexbox Generator");
    }, [setIconHeader, setTitleHeader]);

    return (
        <div className="z-2 flex h-auto w-full flex-col gap-8">
            <AIAgent />

            <TitlePost
                icon={{
                    component: (
                        <DynamicSvgIcon
                            name="flex.svg"
                            className="size-8 fill-fg"
                        />
                    ),

                    meta: "flex.svg",
                }}
                description="Build CSS flexbox layouts visually, reorder items with drag and drop, select individual blocks and configure their flex properties"
                hideVersion
            >
                Flexbox Generator
            </TitlePost>

            <IsGenerator config={config} setConfig={setConfig} />
        </div>
    );
};
