"use client";

import { AIAgent } from "@/AI/AIAgent";
import { TitlePost } from "@/components/titles/TitlePost/TitlePost";

import { useAppContextActions } from "@/context/appContext";

import { useEffect, useState } from "react";

import {
    createDefaultAnimatedTextConfig,
    type AnimatedTextConfig,
} from "./animated-text.type";

import { DynamicSvgIcon } from "@/components/svg/DynamicSVGIcon";
import { IsGenerator } from "./IsGenerator";

export const AnimatedText = () => {
    const { header } = useAppContextActions();

    const { setIconHeader, setTitleHeader } = header || {};

    const [config, setConfig] = useState<AnimatedTextConfig>(
        createDefaultAnimatedTextConfig,
    );

    useEffect(() => {
        setIconHeader(
            <DynamicSvgIcon
                name="animated-text.svg"
                className="size-8 fill-fg"
            />,
        );

        setTitleHeader("Animated Text Generator");
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
                            name="animated-text.svg"
                            className="size-8 fill-fg"
                        />
                    ),

                    meta: "animated-text.svg",
                }}
                description="Create animated SVG text with customizable font, size, speed, background, stroke and fill colors"
                hideVersion
            >
                CSS Animated Text Generator
            </TitlePost>

            <IsGenerator config={config} setConfig={setConfig} />
        </div>
    );
};
