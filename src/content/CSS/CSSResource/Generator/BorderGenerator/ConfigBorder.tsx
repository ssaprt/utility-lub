"use client";

import { GeneralButton } from "@/components/button/GeneralButton/GeneralButton";
import { NumberInput } from "@/components/input/Number/Number";
import { Range } from "@/components/input/range/Range";
import { useState } from "react";

import {
    borderStyles,
    defaultBorderConfig,
    type BorderConfig,
    type BorderCornerName,
    type BorderRadiusUnit,
    type BorderSideName,
} from "./border.type";

import { clamp, normalizeColor } from "./border.utils";

export interface IsGeneratorProps {
    config: BorderConfig;
    setConfig: React.Dispatch<React.SetStateAction<BorderConfig>>;
}

type BorderTarget = BorderSideName | "all";

type RadiusTarget = BorderCornerName | "all";

const borderTargets: {
    value: BorderTarget;
    label: string;
}[] = [
    {
        value: "all",
        label: "All",
    },
    {
        value: "top",
        label: "Top",
    },
    {
        value: "right",
        label: "Right",
    },
    {
        value: "bottom",
        label: "Bottom",
    },
    {
        value: "left",
        label: "Left",
    },
];

const radiusTargets: {
    value: RadiusTarget;
    label: string;
}[] = [
    {
        value: "all",
        label: "All",
    },
    {
        value: "topLeft",
        label: "TL",
    },
    {
        value: "topRight",
        label: "TR",
    },
    {
        value: "bottomRight",
        label: "BR",
    },
    {
        value: "bottomLeft",
        label: "BL",
    },
];

const cornerNames: BorderCornerName[] = [
    "topLeft",
    "topRight",
    "bottomRight",
    "bottomLeft",
];

const sideNames: BorderSideName[] = ["top", "right", "bottom", "left"];

export const ConfigBorder = ({ config, setConfig }: IsGeneratorProps) => {
    const [selectedBorder, setSelectedBorder] = useState<BorderTarget>("all");

    const [selectedRadius, setSelectedRadius] = useState<RadiusTarget>("all");

    const [linkRadiusAxes, setLinkRadiusAxes] = useState(true);

    const updateConfig = <K extends keyof BorderConfig>(
        key: K,
        value: BorderConfig[K],
    ) => {
        setConfig((current) => ({
            ...current,
            [key]: value,
        }));
    };

    const currentBorder =
        config.borders[selectedBorder === "all" ? "top" : selectedBorder];

    const currentRadius =
        config.radius[selectedRadius === "all" ? "topLeft" : selectedRadius];

    const updateBorder = (
        values: Partial<(typeof config.borders)[BorderSideName]>,
    ) => {
        setConfig((current) => {
            if (selectedBorder === "all") {
                const borders = {
                    ...current.borders,
                };

                for (const side of sideNames) {
                    borders[side] = {
                        ...borders[side],
                        ...values,
                    };
                }

                return {
                    ...current,
                    borders,
                };
            }

            return {
                ...current,

                borders: {
                    ...current.borders,

                    [selectedBorder]: {
                        ...current.borders[selectedBorder],
                        ...values,
                    },
                },
            };
        });
    };

    const updateRadius = (axis: "x" | "y", value: number) => {
        setConfig((current) => {
            const radius = {
                ...current.radius,
            };

            const targets =
                selectedRadius === "all" ? cornerNames : [selectedRadius];

            for (const corner of targets) {
                radius[corner] = {
                    ...radius[corner],

                    ...(linkRadiusAxes
                        ? {
                              x: value,
                              y: value,
                          }
                        : {
                              [axis]: value,
                          }),
                };
            }

            return {
                ...current,
                radius,
            };
        });
    };

    const changeRadiusUnit = (nextUnit: BorderRadiusUnit) => {
        if (nextUnit === config.radiusUnit) {
            return;
        }

        setConfig((current) => {
            const radius = {
                ...current.radius,
            };

            for (const corner of cornerNames) {
                const value = current.radius[corner];

                if (nextUnit === "%") {
                    radius[corner] = {
                        x: Number(
                            clamp(
                                (value.x / current.boxWidth) * 100,
                                0,
                                50,
                            ).toFixed(2),
                        ),

                        y: Number(
                            clamp(
                                (value.y / current.boxHeight) * 100,
                                0,
                                50,
                            ).toFixed(2),
                        ),
                    };

                    continue;
                }

                radius[corner] = {
                    x: Math.round(
                        clamp(
                            (value.x / 100) * current.boxWidth,
                            0,
                            current.boxWidth / 2,
                        ),
                    ),

                    y: Math.round(
                        clamp(
                            (value.y / 100) * current.boxHeight,
                            0,
                            current.boxHeight / 2,
                        ),
                    ),
                };
            }

            return {
                ...current,
                radius,
                radiusUnit: nextUnit,
            };
        });
    };

    const clear = () => {
        setSelectedBorder("all");
        setSelectedRadius("all");
        setLinkRadiusAxes(true);

        setConfig({
            ...defaultBorderConfig,

            borders: {
                top: {
                    ...defaultBorderConfig.borders.top,
                },

                right: {
                    ...defaultBorderConfig.borders.right,
                },

                bottom: {
                    ...defaultBorderConfig.borders.bottom,
                },

                left: {
                    ...defaultBorderConfig.borders.left,
                },
            },

            radius: {
                topLeft: {
                    ...defaultBorderConfig.radius.topLeft,
                },

                topRight: {
                    ...defaultBorderConfig.radius.topRight,
                },

                bottomRight: {
                    ...defaultBorderConfig.radius.bottomRight,
                },

                bottomLeft: {
                    ...defaultBorderConfig.radius.bottomLeft,
                },
            },
        });
    };

    const maxRadiusX =
        config.radiusUnit === "%" ? 50 : Math.round(config.boxWidth / 2);

    const maxRadiusY =
        config.radiusUnit === "%" ? 50 : Math.round(config.boxHeight / 2);

    return (
        <div className="col-stretch-2 w-full">
            <div className="col-center-2 w-full bg-fg/5 p-2 rounded-md">
                <div className="row-center-1 justify-between w-full">
                    <span className="text-[12px] font-semibold!">
                        Border settings
                    </span>

                    <GeneralButton
                        textButton="Clear"
                        variant="ghost"
                        handleAction={clear}
                    />
                </div>

                <div className="col-stretch-2 w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
                        <div
                            className="
                    row-center-1
                    rounded-[8px]
                    bg-fg/5
                    p-1 px-2
                "
                        >
                            <label
                                htmlFor="border-canvas-color"
                                className="text-[12px]"
                            >
                                Background color
                            </label>

                            <input
                                id="border-canvas-color"
                                type="color"
                                value={normalizeColor(config.canvasColor)}
                                onChange={(event) =>
                                    updateConfig(
                                        "canvasColor",
                                        event.target.value,
                                    )
                                }
                                className="
                        ml-auto
                        h-8
                        w-8
                        cursor-pointer
                        rounded-md
                        border-0!
                        bg-transparent!
                        p-0
                    "
                            />

                            <input
                                type="text"
                                aria-label="Background color value"
                                value={config.canvasColor}
                                onChange={(event) =>
                                    updateConfig(
                                        "canvasColor",
                                        event.target.value,
                                    )
                                }
                                className="
                        w-16
                        rounded-[4px]!
                        bg-fg/10
                        px-2
                        py-1.5
                        text-[10px]!
                        outline-none
                        transition-colors
                        hover:bg-fg/15
                        focus:bg-fg/15
                    "
                            />
                        </div>

                        <div
                            className="
                    row-center-2
                    rounded-[8px]
                    bg-fg/5
                    p-1 px-2
                "
                        >
                            <label
                                htmlFor="border-box-color"
                                className="text-[12px]"
                            >
                                Block color
                            </label>

                            <input
                                id="border-box-color"
                                type="color"
                                value={normalizeColor(config.boxColor)}
                                onChange={(event) =>
                                    updateConfig("boxColor", event.target.value)
                                }
                                className="
                        ml-auto
                        h-8
                        w-8
                        cursor-pointer
                        rounded-md
                        border-0
                        bg-transparent
                        p-0
                    "
                            />

                            <input
                                type="text"
                                aria-label="Block color value"
                                value={config.boxColor}
                                onChange={(event) =>
                                    updateConfig("boxColor", event.target.value)
                                }
                                className="
                        w-16
                        rounded-[4px]
                        bg-fg/10
                        px-2
                        py-1.5
                        text-[10px]!
                        outline-none
                        transition-colors
                        hover:bg-fg/15
                        focus:bg-fg/15
                    "
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <div className="col-stretch-2 rounded-[8px] bg-fg/5 p-3">
                            <div className="row-center-2">
                                <span className="text-[12px]">Width</span>

                                <span className="ml-auto text-[10px] text-fg/60">
                                    {config.boxWidth}px
                                </span>
                            </div>

                            <Range
                                value={config.boxWidth}
                                min={80}
                                max={340}
                                step={1}
                                onChange={(value) =>
                                    updateConfig("boxWidth", value)
                                }
                            />

                            <NumberInput
                                value={config.boxWidth}
                                min={80}
                                max={340}
                                ariaLabel="Block width"
                                onChange={(value) =>
                                    updateConfig("boxWidth", value)
                                }
                            />
                        </div>

                        <div className="col-stretch-2 rounded-[8px] bg-fg/5 p-3">
                            <div className="row-center-2">
                                <span className="text-[12px]">Height</span>

                                <span className="ml-auto text-[10px] text-fg/60">
                                    {config.boxHeight}px
                                </span>
                            </div>

                            <Range
                                value={config.boxHeight}
                                min={80}
                                max={340}
                                step={1}
                                onChange={(value) =>
                                    updateConfig("boxHeight", value)
                                }
                            />

                            <NumberInput
                                value={config.boxHeight}
                                min={80}
                                max={340}
                                ariaLabel="Block height"
                                onChange={(value) =>
                                    updateConfig("boxHeight", value)
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-stretch-3 rounded-md bg-fg/5 p-3">
                <div className="row-center-2">
                    <span className="text-[12px]">Border</span>

                    <span className="ml-auto text-[10px] text-fg/50">
                        Select side
                    </span>
                </div>

                <div className="col-center-1 md:row-center-1">
                    <div className="grid grid-cols-auto gap-1 md:row-center-1 flex-wrap p-2 bg-fg/5 rounded-md shrink-0 w-full md:w-auto">
                        {borderTargets.map((target) => (
                            <GeneralButton
                                key={target.value}
                                textButton={target.label}
                                variant="ghost"
                                active={selectedBorder === target.value}
                                handleAction={() =>
                                    setSelectedBorder(target.value)
                                }
                            />
                        ))}
                    </div>

                    <div className="row-center-1 bg-fg/5 p-2 rounded-md w-full">
                        <div className="row-center-2">
                            <span className="text-[12px]">Width</span>

                            <span className="ml-auto text-[10px] text-fg/60">
                                {currentBorder.width}px
                            </span>
                        </div>

                        <Range
                            value={currentBorder.width}
                            min={0}
                            max={30}
                            step={1}
                            onChange={(value) =>
                                updateBorder({
                                    width: value,
                                })
                            }
                        />

                        <NumberInput
                            value={currentBorder.width}
                            min={0}
                            max={30}
                            ariaLabel="Border width"
                            onChange={(value) =>
                                updateBorder({
                                    width: value,
                                })
                            }
                        />
                    </div>
                </div>

                <div className="col-stretch-1 md:row-center-2 justify-between p-2 rounded-md bg-fg/5">
                    <span className="text-[12px]">Style</span>

                    <div className="grid grid-cols-auto gap-1 md:row-start-1">
                        {borderStyles.map((style) => (
                            <GeneralButton
                                key={style}
                                textButton={style}
                                variant="ghost"
                                active={currentBorder.style === style}
                                handleAction={() =>
                                    updateBorder({
                                        style,
                                    })
                                }
                            />
                        ))}
                    </div>
                </div>

                <div className="row-center-2">
                    <span className="text-[12px]">Border color</span>

                    <input
                        type="color"
                        aria-label="Border color"
                        value={normalizeColor(currentBorder.color)}
                        onChange={(event) =>
                            updateBorder({
                                color: event.target.value,
                            })
                        }
                        className="
                            ml-auto
                            h-6
                            w-6
                            cursor-pointer
                            rounded-md
                            border-0
                            bg-transparent
                            p-0
                        "
                    />

                    <input
                        type="text"
                        aria-label="Border color value"
                        value={currentBorder.color}
                        onChange={(event) =>
                            updateBorder({
                                color: event.target.value,
                            })
                        }
                        className="
                            w-16
                            rounded-[4px]
                            bg-fg/10
                            px-2
                            py-1.5
                            text-[10px]!
                            outline-none
                            transition-colors
                            hover:bg-fg/15
                            focus:bg-fg/15
                        "
                    />
                </div>
            </div>

            <div className="col-stretch-3 rounded-md bg-fg/5 p-3">
                <div className="row-center-2">
                    <span className="text-[12px]">Border radius</span>

                    <div className="ml-auto row-center-1">
                        <GeneralButton
                            textButton="px"
                            variant="ghost"
                            active={config.radiusUnit === "px"}
                            handleAction={() => changeRadiusUnit("px")}
                        />

                        <GeneralButton
                            textButton="%"
                            variant="ghost"
                            active={config.radiusUnit === "%"}
                            handleAction={() => changeRadiusUnit("%")}
                        />

                        <GeneralButton
                            textButton="Link X/Y"
                            variant="ghost"
                            active={linkRadiusAxes}
                            handleAction={() =>
                                setLinkRadiusAxes((current) => !current)
                            }
                        />
                    </div>
                </div>

                <div className="grid grid-cols-auto gap-1 md:row-start-1 p-2 rounded-md bg-fg/5">
                    {radiusTargets.map((target) => (
                        <GeneralButton
                            key={target.value}
                            textButton={target.label}
                            variant="ghost"
                            active={selectedRadius === target.value}
                            handleAction={() => setSelectedRadius(target.value)}
                        />
                    ))}
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div className="col-stretch-1">
                        <div className="row-center-2">
                            <span className="text-[12px]">Horizontal</span>

                            <span className="ml-auto text-[10px] text-fg/60">
                                {currentRadius.x}
                                {config.radiusUnit}
                            </span>
                        </div>

                        <Range
                            value={currentRadius.x}
                            min={0}
                            max={maxRadiusX}
                            step={1}
                            onChange={(value) => updateRadius("x", value)}
                        />

                        <NumberInput
                            value={currentRadius.x}
                            min={0}
                            max={maxRadiusX}
                            ariaLabel="Horizontal border radius"
                            onChange={(value) => updateRadius("x", value)}
                        />
                    </div>

                    <div className="col-stretch-1">
                        <div className="row-center-2">
                            <span className="text-[12px]">Vertical</span>

                            <span className="ml-auto text-[10px] text-fg/60">
                                {currentRadius.y}
                                {config.radiusUnit}
                            </span>
                        </div>

                        <Range
                            value={currentRadius.y}
                            min={0}
                            max={maxRadiusY}
                            step={1}
                            onChange={(value) => updateRadius("y", value)}
                        />

                        <NumberInput
                            value={currentRadius.y}
                            min={0}
                            max={maxRadiusY}
                            ariaLabel="Vertical border radius"
                            onChange={(value) => updateRadius("y", value)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
