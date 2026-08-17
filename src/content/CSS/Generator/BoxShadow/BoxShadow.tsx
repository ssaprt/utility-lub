"use client";

import { AIAgent } from "@/AI/AIAgent";
import { TitlePost } from "@/components/titles/TitlePost/TitlePost";
import { useAppContextActions } from "@/context/appContext";
import { IconBoxMultiple } from "@tabler/icons-react";
import { useEffect, useState } from "react";

import { Categories } from "./Categories";

import {
    defaultBoxShadowConfig,
    type BoxShadowConfig,
} from "./box-shadow.type";

import { IsGenerator } from "./IsGenerator";
import type { BoxShadowPreset } from "./presetsGenerator";

export const BoxShadow = () => {
    const { header } = useAppContextActions();

    const { setIconHeader, setTitleHeader } = header || {};

    const [config, setConfig] = useState<BoxShadowConfig>(
        defaultBoxShadowConfig,
    );

    const applyPreset = (preset: BoxShadowPreset) => {
        setConfig((current) => ({
            ...current,

            shadows: preset.shadows.map((shadow, index) => ({
                ...shadow,

                id: `${preset.id}-${index}`,
            })),
        }));
    };

    useEffect(() => {
        setIconHeader(<IconBoxMultiple className="h-8 w-8" />);

        setTitleHeader("Box Shadow Generator");
    }, [setIconHeader, setTitleHeader]);

    return (
        <div className="z-2 flex h-auto w-full flex-col gap-8">
            <AIAgent />

            <TitlePost
                icon={{
                    component: (
                        <IconBoxMultiple className="h-8 w-8 fill-none!" />
                    ),

                    meta: "box-shadow",
                }}
                description="Create and customize CSS box shadows, combine multiple shadow layers, use inset shadows, reorder layers and apply ready-made presets"
                hideVersion
            >
                Box Shadow Generator
            </TitlePost>

            <IsGenerator config={config} setConfig={setConfig} />

            <Categories onSelectPreset={applyPreset} />
        </div>
    );
};
