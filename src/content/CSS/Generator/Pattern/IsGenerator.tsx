"use client";

import { ItemWithCopy } from "@/components/blocks/Item/ItemWithCopy";
import { GeneralButton } from "@/components/button/GeneralButton/GeneralButton";
import { Range } from "@/components/input/range/Range";
import { useAppContextValues } from "@/context/appContext";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { patternPresetCategories } from "./pattern.presets";
import { PatternConfig, PatternPreset, patternTypes } from "./pattern.types";
import {
    defaultPatternConfig,
    isValidHex,
    patternConfigToCss,
    patternConfigToStyle,
} from "./pattern.utils";

const patternNames = {
    dots: "Dots",
    polkaDots: "Polka dots",
    grid: "Grid",
    diagonal: "Diagonal",
    horizontal: "Horizontal",
    vertical: "Vertical",
    checker: "Checker",
    diamonds: "Diamonds",
    honeycomb: "Honeycomb",
    hexagons: "Hexagons",
    crosshatch: "Crosshatch",
    rings: "Rings",
    bubbles: "Bubbles",
    waves: "Waves",
    scales: "Scales",
    clouds: "Clouds",
    triangles: "Triangles",
    zigzag: "Zigzag",
    chevron: "Chevron",
    bricks: "Bricks",
    tiles: "Tiles",
    circles: "Circles",
    confetti: "Confetti",
    stars: "Stars",
    plus: "Plus",
    weave: "Weave",
} satisfies Record<(typeof patternTypes)[number], string>;

type RangeControlProps = {
    label: string;
    value: number;
    min: number;
    max: number;
    step?: number;
    unit?: string;
    onChange: (value: number) => void;
};

const RangeControl = ({
    label,
    value,
    min,
    max,
    step = 1,
    unit = "px",
    onChange,
}: RangeControlProps) => {
    return (
        <div className="col-stretch-2 rounded-[4px] bg-fg/5 p-3">
            <div className="row-center-2">
                <span className="text-[12px]">{label}</span>

                <span className="ml-auto text-[12px] text-fg/60">
                    {value}
                    {unit}
                </span>
            </div>

            <Range
                value={value}
                min={min}
                max={max}
                step={step}
                onChange={onChange}
            />
        </div>
    );
};

type ColorControlProps = {
    label: string;
    value: string;
    fallback: string;
    onChange: (value: string) => void;
};

const ColorControl = ({
    label,
    value,
    fallback,
    onChange,
}: ColorControlProps) => {
    const updateHex = (nextValue: string) => {
        if (/^#[0-9a-fA-F]{0,6}$/.test(nextValue)) {
            onChange(nextValue);
        }
    };

    return (
        <div className="col-stretch-2 rounded-[4px] bg-fg/5 p-3">
            <span className="text-[12px]">{label}</span>

            <div className="row-center-2 min-w-0">
                <input
                    type="color"
                    value={isValidHex(value) ? value : fallback}
                    onChange={(event) => onChange(event.target.value)}
                    className="
                        h-9
                        w-11
                        shrink-0
                        cursor-pointer
                        rounded-md
                        border-0
                        bg-transparent
                        p-0
                        outline-none
                    "
                />

                <input
                    type="text"
                    maxLength={7}
                    value={value}
                    onChange={(event) => updateHex(event.target.value)}
                    className="
                        min-w-0
                        flex-1
                        rounded-[4px]
                        bg-fg/10
                        px-2
                        py-1.5
                        text-[12px]!
                        outline-none
                        transition-colors
                        duration-30
                        hover:bg-fg/15
                        focus:bg-fg/15
                    "
                />
            </div>
        </div>
    );
};

export const IsGenerator = () => {
    const [config, setConfig] = useState<PatternConfig>(defaultPatternConfig);

    const previewStyle = useMemo(() => patternConfigToStyle(config), [config]);
    const { header } = useAppContextValues();
    const { isScrolled } = header || {};

    const css = useMemo(() => patternConfigToCss(config), [config]);
    const updateConfig = <K extends keyof PatternConfig>(
        key: K,
        value: PatternConfig[K],
    ) => {
        setConfig((current) => ({
            ...current,
            [key]: value,
        }));
    };
    const applyPreset = (preset: PatternPreset) => {
        setConfig(preset.config);
    };
    const reset = () => {
        setConfig(defaultPatternConfig);
    };

    const previewVariants = {
        hidden: { height: "300px" },
        visible: {
            height: "64px",
            boxShadow:
                "0 -20px 0px 0px var(--background), 0 14px 4px -4px rgba(0, 0, 0, .7)",
        },
    };

    return (
        <div className="col-stretch-4 w-full min-w-0">
            <motion.div
                animate={isScrolled ? "visible" : "hidden"}
                variants={previewVariants}
                initial="hidden"
                className={`sticky
                    top-[-14px]
                    z-2
                    w-full
                    transition-[box-shadow]
                    duration-300
                    ease-in-out
                    
                    overflow-visible
                    rounded-xl
                 
                `}
                style={previewStyle}
            />

            <div className="col-stretch-2">
                <span className="text-sm">Pattern</span>

                <div className="row-center-1 flex-wrap rounded-[8px] bg-fg/10 p-1">
                    {patternTypes.map((type) => (
                        <GeneralButton
                            key={type}
                            variant="ghost"
                            textButton={patternNames[type]}
                            handleAction={() =>
                                updateConfig("patternType", type)
                            }
                            active={config.patternType === type}
                        />
                    ))}
                </div>
            </div>

            <div className="grid w-full min-w-0 grid-cols-1 gap-2 md:grid-cols-3">
                <ColorControl
                    label="Background"
                    value={config.backgroundColor}
                    fallback="#0f172a"
                    onChange={(value) => updateConfig("backgroundColor", value)}
                />

                <ColorControl
                    label="Pattern color"
                    value={config.patternColor}
                    fallback="#8b5cf6"
                    onChange={(value) => updateConfig("patternColor", value)}
                />

                <ColorControl
                    label="Secondary color"
                    value={config.secondaryColor}
                    fallback="#ec4899"
                    onChange={(value) => updateConfig("secondaryColor", value)}
                />
            </div>

            <div className="grid w-full min-w-0 grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3">
                <RangeControl
                    label="Element size"
                    value={config.size}
                    min={4}
                    max={200}
                    onChange={(value) => updateConfig("size", value)}
                />

                <RangeControl
                    label="Gap X"
                    value={config.gapX}
                    min={0}
                    max={200}
                    onChange={(value) => updateConfig("gapX", value)}
                />

                <RangeControl
                    label="Gap Y"
                    value={config.gapY}
                    min={0}
                    max={200}
                    onChange={(value) => updateConfig("gapY", value)}
                />

                <RangeControl
                    label="Thickness"
                    value={config.thickness}
                    min={1}
                    max={30}
                    onChange={(value) => updateConfig("thickness", value)}
                />

                <RangeControl
                    label="Opacity"
                    value={config.opacity}
                    min={0}
                    max={100}
                    unit="%"
                    onChange={(value) => updateConfig("opacity", value)}
                />

                <RangeControl
                    label="Angle"
                    value={config.angle}
                    min={-180}
                    max={180}
                    unit="°"
                    onChange={(value) => updateConfig("angle", value)}
                />

                <RangeControl
                    label="Element offset X"
                    value={config.elementOffsetX}
                    min={-150}
                    max={150}
                    onChange={(value) => updateConfig("elementOffsetX", value)}
                />

                <RangeControl
                    label="Element offset Y"
                    value={config.elementOffsetY}
                    min={-150}
                    max={150}
                    onChange={(value) => updateConfig("elementOffsetY", value)}
                />

                <RangeControl
                    label="Pattern position X"
                    value={config.positionX}
                    min={-300}
                    max={300}
                    onChange={(value) => updateConfig("positionX", value)}
                />

                <RangeControl
                    label="Pattern position Y"
                    value={config.positionY}
                    min={-300}
                    max={300}
                    onChange={(value) => updateConfig("positionY", value)}
                />

                <RangeControl
                    label="Scale X"
                    value={config.scaleX}
                    min={25}
                    max={250}
                    unit="%"
                    onChange={(value) => updateConfig("scaleX", value)}
                />

                <RangeControl
                    label="Scale Y"
                    value={config.scaleY}
                    min={25}
                    max={250}
                    unit="%"
                    onChange={(value) => updateConfig("scaleY", value)}
                />
            </div>

            <div className="row-center-2 flex-wrap">
                <GeneralButton
                    textButton="Reset"
                    handleAction={reset}
                    variant="minimal"
                />

                <GeneralButton
                    textButton="Copy CSS"
                    copy={{
                        copyItem: css,
                    }}
                    variant="soft"
                />
            </div>

            <div
                className="
                    rounded-lg
                    bg-black/20
                    p-3
                    transition-colors
                    duration-200
                    hover:bg-black/25
                "
            >
                <code className="block whitespace-pre-wrap break-all text-sm">
                    {css}
                </code>
            </div>

            <div className="col-stretch-4">
                {patternPresetCategories.map((category) => (
                    <div key={category.id} className="col-stretch-2">
                        <div className="row-center-2">
                            <span className="text-sm font-medium">
                                {category.name}
                            </span>

                            <span className="ml-auto text-xs text-fg/50">
                                {category.presets.length}
                            </span>
                        </div>

                        <div
                            className="grid w-full min-w-0 gap-2"
                            style={{
                                gridTemplateColumns:
                                    "repeat(auto-fill, minmax(100px, 1fr))",
                            }}
                        >
                            {category.presets.map((preset) => (
                                <ItemWithCopy
                                    key={preset.id}
                                    handleAction={() => applyPreset(preset)}
                                    item={{
                                        id: preset.id,
                                        title: preset.name,
                                        content: patternConfigToStyle(
                                            preset.config,
                                        ),
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
