"use client";

import { BlockWithTextarea } from "@/components/blocks/block-with-textarea/BlockWithTextarea";
import { useAppContextValues } from "@/context/appContext";

import { motion } from "framer-motion";

import { useMemo, type Dispatch, type SetStateAction } from "react";

import { ConfigAnimatedText } from "./ConfigAnimatedText";

import type { AnimatedTextConfig } from "./animated-text.type";

import { GeneralButton } from "@/components/button/GeneralButton/GeneralButton";
import { useState } from "react";
import { getAnimatedTextEffect } from "./animated-text.effects";
import {
    AnimatedTextPreset,
    AnimatedTextPresetCategory,
    animatedTextPresets,
} from "./animated-text.presets";
import {
    animatedTextConfigToCss,
    animatedTextConfigToHtml,
} from "./animated-text.utils";
import { Presets } from "./Presets";

export interface IsGeneratorProps {
    config: AnimatedTextConfig;

    setConfig: Dispatch<SetStateAction<AnimatedTextConfig>>;
}

type PresetCategory = "all" | AnimatedTextPresetCategory;

const presetCategories: {
    title: string;

    value: PresetCategory;
}[] = [
    {
        title: "All",
        value: "all",
    },
    {
        title: "Neon",
        value: "neon",
    },
    {
        title: "Retro",
        value: "retro",
    },
    {
        title: "Cyber",
        value: "cyber",
    },
    {
        title: "Elegant",
        value: "elegant",
    },
    {
        title: "Mono",
        value: "mono",
    },
    {
        title: "Color",
        value: "colorful",
    },
    {
        title: "Soft",
        value: "soft",
    },
    {
        title: "Dark",
        value: "dark",
    },
];

const AnimatedTextPreview = ({ config }: { config: AnimatedTextConfig }) => {
    const effect = getAnimatedTextEffect(
        config,
        "animated-text-preview-effect",
    );

    return (
        <div
            className="
                flex
                size-full
                items-center
                justify-center
                overflow-hidden
            "
            style={{
                backgroundColor: config.backgroundColor,
            }}
        >
            <style>
                {`
                    .animated-text-preview text {
                        font-size: ${config.fontSize}px;

                        ${effect.textCss}
                    }

                    ${effect.keyframes}
                `}
            </style>

            <svg
                viewBox="0 0 1320 300"
                preserveAspectRatio="xMidYMid meet"
                role="img"
                aria-label={config.text}
                className="
                    animated-text-preview
                    block
                    h-auto
                    w-full
                    overflow-visible
                "
                style={{
                    fontFamily: config.fontFamily,
                }}
            >
                <text x="50%" y="50%" dy=".35em" textAnchor="middle">
                    {config.text || " "}
                </text>
            </svg>
        </div>
    );
};

export const IsGenerator = ({ config, setConfig }: IsGeneratorProps) => {
    const { header } = useAppContextValues();

    const [presetCategory, setPresetCategory] = useState<PresetCategory>("all");

    const filteredPresets = useMemo(() => {
        if (presetCategory === "all") {
            return animatedTextPresets;
        }

        return animatedTextPresets.filter(
            (preset) => preset.category === presetCategory,
        );
    }, [presetCategory]);

    const { isScrolled } = header || {};

    const scroll = (isScrolled?.scroll.scrollTop ?? 0) > 380;

    const css = useMemo(() => {
        return animatedTextConfigToCss(config);
    }, [config]);

    const html = useMemo(() => {
        return animatedTextConfigToHtml(config);
    }, [config]);

    const applyPreset = (preset: AnimatedTextPreset) => {
        setConfig((current) => ({
            ...current,

            ...preset.config,

            text: current.text,
        }));
    };

    return (
        <div
            className="
            col-stretch-4
            w-full
        "
        >
            <div
                className="
                relative
                col-stretch-1
                w-full

                lg:row-stretch-4
            "
            >
                <div
                    className="
                    relative
                    z-2

                    flex

                    h-[280px]
                    w-full

                    items-center
                    justify-center

                    overflow-visible

                    sm:h-[360px]

                    lg:sticky
                    lg:top-0
                    lg:h-[460px]
                    lg:min-w-[400px]
                    lg:w-1/2
                "
                >
                    <div
                        className="
                        relative
                        size-full

                        overflow-hidden

                        rounded-[4px]

                        border
                        border-fg/10

                        shadow-md
                        shadow-black/10
                    "
                    >
                        <AnimatedTextPreview config={config} />
                    </div>
                </div>

                <motion.div
                    onClick={() =>
                        isScrolled?.main?.scrollTo({
                            top: 0,
                            behavior: "smooth",
                        })
                    }
                    animate={{
                        opacity: scroll ? 1 : 0,

                        x: scroll ? 0 : "100%",
                    }}
                    transition={{
                        type: "spring",

                        stiffness: scroll ? 100 : 500,

                        damping: scroll ? 8 : 24,

                        mass: 0.4,
                    }}
                    className="
                    fixed
                    z-[100]

                    hidden

                    h-[76px]
                    w-[180px]

                    cursor-pointer

                    overflow-hidden

                    rounded-[4px]

                    border
                    border-fg/10

                    bg-app

                    shadow-lg
                    shadow-black/70

                    lg:flex
                "
                    style={{
                        right: "20px",

                        top: "90px",

                        pointerEvents: scroll ? "auto" : "none",
                    }}
                >
                    <AnimatedTextPreview config={config} />
                </motion.div>

                <div
                    className="
                    col-center-2

                    min-w-0

                    flex-1
                "
                >
                    <ConfigAnimatedText config={config} setConfig={setConfig} />

                    <div
                        className="
                        col-stretch-2
                        w-full
                    "
                    >
                        <BlockWithTextarea
                            title="CSS"
                            placeholder="Generated animated text CSS"
                            copy
                            result={css}
                        />

                        <BlockWithTextarea
                            title="HTML"
                            placeholder="Generated SVG HTML"
                            copy
                            result={html}
                        />
                    </div>
                </div>
            </div>

            <div
                className="
                col-stretch-3
                w-full
            "
            >
                <div
                    className="
                    row-center-2
                    w-full
                    flex-wrap
                "
                >
                    <span
                        className="
                        text-[14px]
                        font-semibold
                        text-fg
                    "
                    >
                        Presets
                    </span>

                    <div
                        className="
                        row-center-1

                        w-fit
                        max-w-full

                        flex-wrap

                        rounded-[4px]

                        bg-fg/5

                        p-0.5
                    "
                    >
                        {presetCategories.map((category) => (
                            <GeneralButton
                                key={category.value}
                                variant="ghost"
                                textButton={category.title}
                                active={presetCategory === category.value}
                                handleAction={() =>
                                    setPresetCategory(category.value)
                                }
                            />
                        ))}
                    </div>
                </div>

                <Presets
                    category={filteredPresets}
                    config={config}
                    onSelect={applyPreset}
                />
            </div>
        </div>
    );
};
