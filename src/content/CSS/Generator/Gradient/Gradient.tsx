"use client";

import { DynamicSvgIcon } from "@/components/svg/DynamicSVGIcon";
import { TitlePost } from "@/components/titles/TitlePost/TitlePost";
import { useAppContextActions } from "@/context/appContext";
import { useEffect, useState } from "react";

import { AIAgent } from "@/AI/AIAgent";
import { Categories } from "./Categories";
import { defaultGradientConfig, type GradientConfig } from "./gradient.type";
import { parseGradient } from "./gradient.utils";
import { IsGenerator } from "./IsGenerator";
import type { GradientPreset } from "./presetsGenerator";

export const Gradient = () => {
    const { header } = useAppContextActions();
    const { setIconHeader, setTitleHeader } = header || {};

    const [config, setConfig] = useState<GradientConfig>(defaultGradientConfig);

    const applyPreset = (preset: GradientPreset) => {
        setConfig(parseGradient(preset.gradient));
    };

    useEffect(() => {
        setIconHeader(
            <DynamicSvgIcon name="gradient.svg" className="w-8 h-8 fill-fg" />,
        );

        setTitleHeader("Gradient Generator");
    }, [setIconHeader, setTitleHeader]);

    return (
        <div className="flex flex-col w-full h-auto gap-8 z-2">
            <AIAgent />
            <TitlePost
                icon={{
                    component: (
                        <DynamicSvgIcon
                            name="gradient.svg"
                            className="w-8 h-8 fill-fg"
                        />
                    ),
                    meta: "gradient.svg",
                }}
                description="Gradient generator. Over 1,000 ready-made presets and a user-friendly interface for creating your own gradients"
                hideVersion
            >
                Gradient Generator
            </TitlePost>

            <IsGenerator config={config} setConfig={setConfig} />

            <Categories onSelectPreset={applyPreset} />
        </div>
    );
};
