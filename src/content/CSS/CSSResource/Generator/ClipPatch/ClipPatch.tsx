"use client";

import { AIAgent } from "@/AI/AIAgent";
import { DynamicSvgIcon } from "@/components/svg/DynamicSVGIcon";
import { TitlePost } from "@/components/titles/TitlePost/TitlePost";
import { useAppContextActions } from "@/context/appContext";
import { useEffect, useState } from "react";
import { Categories } from "./Categories";
import { IsGenerator } from "./IsGenerator";
import { defaultClipPathConfig, type ClipPathConfig } from "./clip-path.type";
import { cloneClipPathPoints } from "./clip-path.utils";
import type { ClipPathPreset } from "./presetsGenerator";

export const ClipPathGenerator = () => {
    const { header } = useAppContextActions();

    const { setIconHeader, setTitleHeader } = header || {};

    const [config, setConfig] = useState<ClipPathConfig>(defaultClipPathConfig);

    const applyPreset = (preset: ClipPathPreset) => {
        setConfig({
            mode: "preset",

            presetId: preset.id,

            points: cloneClipPathPoints(preset.points, `preset-${preset.id}`),
        });
    };

    useEffect(() => {
        setIconHeader(
            <DynamicSvgIcon name="clip.svg" className="w-8 h-8 fill-fg" />,
        );

        setTitleHeader("Clip Path Generator");
    }, [setIconHeader, setTitleHeader]);

    return (
        <div className="z-2 flex h-auto w-full flex-col gap-8">
            <AIAgent />

            <TitlePost
                icon={{
                    component: (
                        <DynamicSvgIcon
                            name="clip.svg"
                            className="w-8 h-8 fill-fg"
                        />
                    ),
                    meta: "clip.svg",
                }}
                description="Create CSS polygon clip paths visually, use ready-made shapes, edit points and preview the result with your own image"
                hideVersion
            >
                Clip Path Generator
            </TitlePost>

            <IsGenerator config={config} setConfig={setConfig} />

            <Categories onSelectPreset={applyPreset} />
        </div>
    );
};
