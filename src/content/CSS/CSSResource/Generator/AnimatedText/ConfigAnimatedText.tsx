"use client";

import { GeneralButton } from "@/components/button/GeneralButton/GeneralButton";
import { NumberInput } from "@/components/input/Number/Number";
import { Range } from "@/components/input/range/Range";

import { IconRestore } from "@tabler/icons-react";

import type { Dispatch, ReactNode, SetStateAction } from "react";

import {
    animatedTextAnimations,
    animatedTextFonts,
    createDefaultAnimatedTextConfig,
    type AnimatedTextConfig,
} from "./animated-text.type";

import { AnimatedTextPreset } from "./animated-text.presets";
import { normalizeColor } from "./animated-text.utils";

interface ConfigAnimatedTextProps {
    config: AnimatedTextConfig;

    setConfig: Dispatch<SetStateAction<AnimatedTextConfig>>;
}

const CompactTitle = ({
    children,
    value,
}: {
    children: ReactNode;

    value?: ReactNode;
}) => {
    return (
        <div className="row-center-2 min-h-5">
            <span className="text-[11px] text-fg/80">{children}</span>

            {value !== undefined && (
                <span className="ml-auto text-[10px] text-fg/45">{value}</span>
            )}
        </div>
    );
};

const ColorControl = ({
    title,
    value,
    onChange,
}: {
    title: string;

    value: string;

    onChange: (value: string) => void;
}) => {
    return (
        <div
            className="
                col-stretch-1
                min-w-0
                rounded-[5px]
                border
                border-fg/5
                p-2
            "
        >
            <CompactTitle>{title}</CompactTitle>

            <div
                className="
                    row-center-1
                    w-fit
                    max-w-full
                    rounded-[4px]
                    bg-fg/5
                    p-1
                "
            >
                <input
                    type="color"
                    value={normalizeColor(value)}
                    aria-label={`${title} color`}
                    onChange={(event) => onChange(event.target.value)}
                    className="
                        size-6
                        shrink-0
                        cursor-pointer
                        rounded-[3px]
                        border-0
                        bg-transparent
                        p-0
                    "
                />

                <input
                    type="text"
                    value={value}
                    aria-label={`${title} hexadecimal color`}
                    onChange={(event) => onChange(event.target.value)}
                    onBlur={() => onChange(normalizeColor(value))}
                    className="
                        w-20
                        min-w-0
                        rounded-[3px]
                        bg-fg/5
                        px-1.5
                        py-1
                        text-[10px]
                        text-fg
                        outline-none
                        transition-colors
                        hover:bg-fg/10
                        focus:bg-fg/10
                    "
                />
            </div>
        </div>
    );
};

export const ConfigAnimatedText = ({
    config,
    setConfig,
}: ConfigAnimatedTextProps) => {
    const updateConfig = <K extends keyof AnimatedTextConfig>(
        key: K,

        value: AnimatedTextConfig[K],
    ) => {
        setConfig((current) => ({
            ...current,

            [key]: value,
        }));
    };

    const reset = () => {
        setConfig(createDefaultAnimatedTextConfig());
    };

    const applyPreset = (preset: AnimatedTextPreset) => {
        setConfig((current) => ({
            ...current,

            ...preset.config,

            text: current.text,
        }));
    };

    return (
        <div className="col-stretch-2 w-full">
            <div
                className="
                    row-center-2
                    w-full
                    rounded-[5px]
                    bg-fg/5
                    p-1.5
                "
            >
                <span className="pl-1 text-[12px] font-medium">
                    Animated Text
                </span>

                <div
                    className="
                        ml-auto
                        w-fit
                        rounded-[4px]
                        bg-fg/5
                        p-0.5
                    "
                >
                    <GeneralButton
                        variant="ghost"
                        icon={<IconRestore className="size-4" />}
                        textButton="Reset"
                        handleAction={reset}
                    />
                </div>
            </div>

            <div
                className="
                    col-stretch-1
                    rounded-[5px]
                    border
                    border-fg/5
                    p-2
                "
            >
                <CompactTitle>Text</CompactTitle>

                <input
                    type="text"
                    value={config.text}
                    aria-label="Animated text"
                    onChange={(event) =>
                        updateConfig(
                            "text",

                            event.target.value,
                        )
                    }
                    className="
                        w-full
                        rounded-[4px]
                        bg-fg/5
                        px-2
                        py-2
                        text-[12px]
                        text-fg
                        outline-none
                        transition-colors
                        hover:bg-fg/10
                        focus:bg-fg/10
                    "
                />
            </div>

            <div
                className="
                    col-stretch-1
                    rounded-[5px]
                    border
                    border-fg/5
                    p-2
                "
            >
                <CompactTitle>Font</CompactTitle>

                <select
                    value={config.fontFamily}
                    aria-label="Font family"
                    onChange={(event) =>
                        updateConfig(
                            "fontFamily",

                            event.target
                                .value as AnimatedTextConfig["fontFamily"],
                        )
                    }
                    className="
                        w-full
                        cursor-pointer
                        rounded-[4px]
                        border-0
                        bg-fg/5
                        px-2
                        py-2
                        text-[11px]
                        text-fg
                        outline-none
                        transition-colors
                        hover:bg-fg/10
                        focus:bg-fg/10
                    "
                >
                    {animatedTextFonts.map((font) => (
                        <option key={font.value} value={font.value}>
                            {font.label}
                        </option>
                    ))}
                </select>

                <div
                    className="
        col-stretch-1

        rounded-[5px]

        border
        border-fg/5

        p-2
    "
                >
                    <CompactTitle>Animation</CompactTitle>

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
                        {animatedTextAnimations.map((animation) => (
                            <GeneralButton
                                key={animation.value}
                                variant="ghost"
                                textButton={animation.label}
                                active={config.animation === animation.value}
                                handleAction={() =>
                                    updateConfig(
                                        "animation",

                                        animation.value,
                                    )
                                }
                            />
                        ))}
                    </div>
                </div>
            </div>

            <div
                className="
                    grid
                    grid-cols-1
                    gap-1.5

                    sm:grid-cols-2
                "
            >
                <div
                    className="
                        col-stretch-1
                        rounded-[5px]
                        border
                        border-fg/5
                        p-2
                    "
                >
                    <CompactTitle value={`${config.fontSize}px`}>
                        Font Size
                    </CompactTitle>

                    <Range
                        value={config.fontSize}
                        min={20}
                        max={200}
                        step={1}
                        onChange={(value) =>
                            updateConfig(
                                "fontSize",

                                value,
                            )
                        }
                    />

                    <NumberInput
                        value={config.fontSize}
                        min={20}
                        max={200}
                        ariaLabel="Font size"
                        onChange={(value) =>
                            updateConfig(
                                "fontSize",

                                value,
                            )
                        }
                    />
                </div>

                <div
                    className="
                        col-stretch-1
                        rounded-[5px]
                        border
                        border-fg/5
                        p-2
                    "
                >
                    <CompactTitle value={`${config.animationSpeed}s`}>
                        Animation Speed
                    </CompactTitle>

                    <Range
                        value={config.animationSpeed}
                        min={1}
                        max={15}
                        step={0.1}
                        onChange={(value) =>
                            updateConfig(
                                "animationSpeed",

                                value,
                            )
                        }
                    />

                    <NumberInput
                        value={config.animationSpeed}
                        min={1}
                        max={15}
                        ariaLabel="Animation speed"
                        onChange={(value) =>
                            updateConfig(
                                "animationSpeed",

                                value,
                            )
                        }
                    />
                </div>
            </div>

            <div
                className="
                    grid
                    grid-cols-1
                    gap-1.5

                    sm:grid-cols-3
                "
            >
                <ColorControl
                    title="Background"
                    value={config.backgroundColor}
                    onChange={(value) =>
                        updateConfig(
                            "backgroundColor",

                            value,
                        )
                    }
                />

                <ColorControl
                    title="Stroke"
                    value={config.strokeColor}
                    onChange={(value) =>
                        updateConfig(
                            "strokeColor",

                            value,
                        )
                    }
                />

                <ColorControl
                    title="Fill"
                    value={config.fillColor}
                    onChange={(value) =>
                        updateConfig(
                            "fillColor",

                            value,
                        )
                    }
                />
            </div>
        </div>
    );
};
