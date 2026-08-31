"use client";

import { AIAgent } from "@/AI/AIAgent";
import { DynamicSvgIcon } from "@/components/svg/DynamicSVGIcon";
import { TitlePost } from "@/components/titles/TitlePost/TitlePost";
import { useAppContextActions } from "@/context/appContext";
import { useEffect, useState } from "react";
import {
    defaultAnimationConfig,
    type AnimationConfig,
} from "./animation.type";
import { cloneAnimationConfig } from "./animation.utils";
import { IsGenerator } from "./IsGenerator";

export const Animation = () => {
    const { header } = useAppContextActions();
    const { setIconHeader, setTitleHeader } = header;
    const [config, setConfig] = useState<AnimationConfig>(() =>
        cloneAnimationConfig(defaultAnimationConfig),
    );

    useEffect(() => {
        setIconHeader(
            <DynamicSvgIcon
                name="animated-text.svg"
                className="size-8 fill-fg"
            />,
        );
        setTitleHeader("CSS Animation Generator");
    }, [setIconHeader, setTitleHeader]);

    return (
        <div className="z-2 flex h-auto w-full flex-col gap-8">
            <AIAgent />

            <TitlePost
                icon={{
                    component: (
                        <DynamicSvgIcon
                            name="animated-text.svg"
                            className="size-8 fill-fg"
                        />
                    ),
                    meta: "animated-text.svg",
                }}
                description="Build CSS keyframes on a visual timeline, edit transforms and preview the animation without writing CSS manually"
                hideVersion
            >
                CSS Animation Generator
            </TitlePost>

            <IsGenerator config={config} setConfig={setConfig} />
        </div>
    );
};
