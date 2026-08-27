"use client";

import { AIAgent } from "@/AI/AIAgent";
import { TitlePost } from "@/components/titles/TitlePost/TitlePost";
import { useAppContextActions } from "@/context/appContext";

import { useEffect, useState } from "react";

import { createDefaultGridConfig, type GridConfig } from "./grid.type";

import { DynamicSvgIcon } from "@/components/svg/DynamicSVGIcon";
import { IsGenerator } from "./IsGenerator";

export const Grid = () => {
    const { header } = useAppContextActions();

    const { setIconHeader, setTitleHeader } = header || {};

    const [config, setConfig] = useState<GridConfig>(createDefaultGridConfig);

    useEffect(() => {
        setIconHeader(
            <DynamicSvgIcon name="grid.svg" className="size-8 fill-fg" />,
        );

        setTitleHeader("Grid Generator");
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
                            name="grid.svg"
                            className="size-8 fill-fg"
                        />
                    ),

                    meta: "grid.svg",
                }}
                description="Build CSS Grid layouts visually, reorder blocks, configure rows and columns, spans, placement and alignment"
                hideVersion
            >
                CSS Grid Generator
            </TitlePost>

            <IsGenerator config={config} setConfig={setConfig} />
        </div>
    );
};
