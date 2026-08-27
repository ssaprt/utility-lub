"use client";

import { GeneralButton } from "@/components/button/GeneralButton/GeneralButton";

import { IconPlayerPlay, IconSparkles } from "@tabler/icons-react";

import { useMemo } from "react";

import { getAnimatedTextEffect } from "./animated-text.effects";

import type { AnimatedTextPreset } from "./animated-text.presets";

import type { AnimatedTextConfig } from "./animated-text.type";

const isSamePreset = (
    config: AnimatedTextConfig,
    preset: AnimatedTextPreset,
) => {
    return (
        config.animation === preset.config.animation &&
        config.fontFamily === preset.config.fontFamily &&
        config.fontSize === preset.config.fontSize &&
        config.animationSpeed === preset.config.animationSpeed &&
        config.backgroundColor === preset.config.backgroundColor &&
        config.strokeColor === preset.config.strokeColor &&
        config.fillColor === preset.config.fillColor
    );
};

export const Preset = ({
    preset,
    config,
    onSelect,
}: {
    preset: AnimatedTextPreset;

    config: AnimatedTextConfig;

    onSelect: (preset: AnimatedTextPreset) => void;
}) => {
    const active = isSamePreset(config, preset);

    const previewConfig = useMemo<AnimatedTextConfig>(
        () => ({
            text: config.text || "Animated",

            ...preset.config,
        }),
        [config.text, preset],
    );

    const animationName = useMemo(
        () => `preset-${preset.id}`.replace(/[^a-zA-Z0-9_-]/g, "-"),
        [preset.id],
    );

    const effect = useMemo(
        () => getAnimatedTextEffect(previewConfig, animationName),
        [previewConfig, animationName],
    );

    return (
        <div
            className={`
                relative

                flex
                min-w-0
                flex-col
                justify-between
                gap-2

                rounded-md

                border
                border-fg/10

                p-2
                px-3
                pt-3

                shadow-md
                shadow-black/10

                transition-all
                duration-200
                ease-in-out

                hover:-translate-y-[2px]
                hover:bg-fg/10
                hover:shadow-lg
                hover:shadow-black/40

                [&>*]:text-[12px]!

                ${
                    active
                        ? `
                            border-fg/50
                            bg-fg/5
                            shadow-lg
                            shadow-black/20
                        `
                        : ""
                }
            `}
        >
            <style>
                {`
                    .${animationName} text {
                        font-size: 82px;

                        ${effect.textCss}
                    }

                    ${effect.keyframes}
                `}
            </style>

            <div
                className="
                    col-start-2
                    h-full
                    justify-between
                    gap-2
                "
            >
                <div className="w-full min-w-0 pr-24">
                    <span className="mr-1 font-bold!">Name:</span>

                    <span className="break-words text-fg/70">
                        {preset.title}
                    </span>
                </div>

                <div className="w-full min-w-0">
                    <span className="mr-1 font-bold!">Animation:</span>

                    <span className="break-words text-fg/70">
                        {preset.config.animation}
                    </span>
                </div>

                <div className="w-full min-w-0">
                    <span className="mr-1 font-bold!">Speed:</span>

                    <span className="text-fg/70">
                        {preset.config.animationSpeed}s
                    </span>
                </div>

                <div
                    className="
                        relative

                        flex

                        h-[140px]
                        w-full

                        items-center
                        justify-center

                        overflow-hidden

                        rounded-[4px]

                        border
                        border-fg/10

                        shadow-inner
                        shadow-black/10
                    "
                    style={{
                        backgroundColor: preset.config.backgroundColor,
                    }}
                >
                    <svg
                        viewBox="0 0 600 220"
                        preserveAspectRatio="xMidYMid meet"
                        className={`
                            ${animationName}

                            block
                            size-full
                            overflow-visible
                        `}
                        style={{
                            fontFamily: preset.config.fontFamily,
                        }}
                    >
                        <text x="50%" y="50%" dy=".35em" textAnchor="middle">
                            {config.text || "Animated"}
                        </text>
                    </svg>
                </div>

                <GeneralButton
                    className="
                        rounded-[4px]!
                        transition-width
                        duration-200
                        ease-in-out
                    "
                    variant="dashed"
                    textButton={active ? "Selected" : "Select"}
                    icon={<IconPlayerPlay className="size-4" />}
                    active={active}
                    handleAction={() => onSelect(preset)}
                />
            </div>

            <div
                className="
                    absolute!
                    top-2
                    right-2

                    row-center-1!

                    rounded-[4px]

                    border
                    border-fg/20

                    bg-fg/10

                    px-[4px]
                    py-[2px]

                    [&>*]:text-[10px]
                "
            >
                <IconSparkles className="size-3" />

                <span>{preset.config.animation}</span>
            </div>
        </div>
    );
};
