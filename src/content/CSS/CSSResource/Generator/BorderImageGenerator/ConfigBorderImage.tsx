"use client";

import { GeneralButton } from "@/components/button/GeneralButton/GeneralButton";
import { NumberInput } from "@/components/input/Number/Number";
import { Range } from "@/components/input/range/Range";
import {
    useState,
    type Dispatch,
    type SetStateAction,
} from "react";
import {
    borderImageRepeats,
    borderImageSides,
    defaultBorderImageConfig,
    type BorderImageConfig,
    type BorderImageSide,
    type BorderImageSides,
} from "./border-image.type";

export interface ConfigBorderImageProps {
    config: BorderImageConfig;
    setConfig: Dispatch<SetStateAction<BorderImageConfig>>;
}

const inputClass = `
    w-full
    min-w-0
    rounded-[4px]
    bg-fg/10
    px-2
    py-1.5
    text-[11px]!
    outline-none
    transition-colors
    hover:bg-fg/15
    focus:bg-fg/15
`;

const selectClass = `
    rounded-[4px]
    border-0
    bg-fg/10
    px-2
    py-1.5
    text-[11px]
    text-fg
    outline-none
`;

const cloneDefaultConfig = (): BorderImageConfig => ({
    ...defaultBorderImageConfig,
    slice: { ...defaultBorderImageConfig.slice },
    borderWidth: { ...defaultBorderImageConfig.borderWidth },
    imageWidth: { ...defaultBorderImageConfig.imageWidth },
    outset: { ...defaultBorderImageConfig.outset },
});

const SidesEditor = ({
    title,
    value,
    min,
    max,
    step,
    unit,
    linked,
    setLinked,
    onChange,
}: {
    title: string;
    value: BorderImageSides;
    min: number;
    max: number;
    step: number;
    unit: string;
    linked: boolean;
    setLinked: Dispatch<SetStateAction<boolean>>;
    onChange: (side: BorderImageSide, value: number) => void;
}) => {
    return (
        <div className="col-stretch-2 rounded-[8px] bg-fg/5 p-2">
            <div className="row-center-1 justify-between">
                <span className="text-[13px] font-medium! text-fg">
                    {title}
                </span>
                <GeneralButton
                    textButton="Link"
                    variant="ghost"
                    active={linked}
                    handleAction={() => setLinked((current) => !current)}
                />
            </div>

            <Range
                value={value.top}
                min={min}
                max={max}
                step={step}
                onChange={(nextValue) => onChange("top", nextValue)}
            />

            <div className="grid grid-cols-2 gap-1 sm:grid-cols-4">
                {borderImageSides.map((side) => (
                    <label
                        key={side}
                        className="col-stretch-1 rounded-[4px] bg-fg/5 p-1"
                    >
                        <span className="text-[9px] capitalize text-fg/60">
                            {side}
                        </span>
                        <NumberInput
                            value={value[side]}
                            min={min}
                            max={max}
                            step={step}
                            ariaLabel={`${title} ${side}`}
                            onChange={(nextValue) =>
                                onChange(side, nextValue)
                            }
                        />
                        <span className="text-right text-[9px] text-fg/50">
                            {unit}
                        </span>
                    </label>
                ))}
            </div>
        </div>
    );
};

export const ConfigBorderImage = ({
    config,
    setConfig,
}: ConfigBorderImageProps) => {
    const [linkSlice, setLinkSlice] = useState(true);
    const [linkBorderWidth, setLinkBorderWidth] = useState(true);
    const [linkImageWidth, setLinkImageWidth] = useState(true);
    const [linkOutset, setLinkOutset] = useState(true);

    const updateConfig = <K extends keyof BorderImageConfig>(
        key: K,
        value: BorderImageConfig[K],
    ) => {
        setConfig((current) => ({ ...current, [key]: value }));
    };

    const updateSides = (
        key: "slice" | "borderWidth" | "imageWidth" | "outset",
        side: BorderImageSide,
        value: number,
        linked: boolean,
    ) => {
        setConfig((current) => ({
            ...current,
            [key]: linked
                ? {
                      top: value,
                      right: value,
                      bottom: value,
                      left: value,
                  }
                : {
                      ...current[key],
                      [side]: value,
                  },
        }));
    };

    const loadFile = (file: File | undefined) => {
        if (!file) return;

        const reader = new FileReader();
        reader.addEventListener("load", () => {
            if (typeof reader.result === "string") {
                updateConfig("source", reader.result);
            }
        });
        reader.readAsDataURL(file);
    };

    const clear = () => {
        setLinkSlice(true);
        setLinkBorderWidth(true);
        setLinkImageWidth(true);
        setLinkOutset(true);
        setConfig(cloneDefaultConfig());
    };

    return (
        <div className="col-stretch-2 w-full">
            <div className="col-stretch-2 rounded-md bg-fg/5 p-2">
                <div className="row-center-1 justify-between">
                    <span className="text-[13px] font-medium! text-fg">
                        Border image settings
                    </span>
                    <GeneralButton
                        textButton="Clear"
                        variant="ghost"
                        handleAction={clear}
                    />
                </div>

                <div className="col-stretch-1 rounded-[8px] bg-fg/5 p-2">
                    <span className="text-[11px]">Image or CSS source</span>
                    <input
                        value={config.source}
                        aria-label="Border image source"
                        onChange={(event) =>
                            updateConfig("source", event.target.value)
                        }
                        className={inputClass}
                        placeholder="Image URL, data URL or CSS gradient"
                    />
                    <label className="row-center-1 w-fit cursor-pointer rounded-[4px] bg-fg/5 px-2 py-1 text-[10px] hover:bg-fg/10">
                        Upload image
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(event) =>
                                loadFile(event.target.files?.[0])
                            }
                        />
                    </label>
                </div>

                <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                    <label className="row-center-1 rounded-[8px] bg-fg/5 p-1 px-2">
                        <span className="text-[11px]">Canvas</span>
                        <input
                            type="color"
                            value={config.canvasColor}
                            onChange={(event) =>
                                updateConfig("canvasColor", event.target.value)
                            }
                            className="ml-auto size-7 cursor-pointer border-0 bg-transparent p-0"
                        />
                    </label>
                    <label className="row-center-1 rounded-[8px] bg-fg/5 p-1 px-2">
                        <span className="text-[11px]">Block</span>
                        <input
                            type="color"
                            value={config.boxColor}
                            onChange={(event) =>
                                updateConfig("boxColor", event.target.value)
                            }
                            className="ml-auto size-7 cursor-pointer border-0 bg-transparent p-0"
                        />
                    </label>
                </div>

                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    <div className="col-stretch-1 rounded-[8px] bg-fg/5 p-2">
                        <div className="row-center-1 justify-between">
                            <span className="text-[10px]">Preview width</span>
                            <span className="text-[9px] text-fg/60">
                                {config.boxWidth}px
                            </span>
                        </div>
                        <Range
                            value={config.boxWidth}
                            min={100}
                            max={420}
                            step={1}
                            onChange={(value) =>
                                updateConfig("boxWidth", value)
                            }
                        />
                        <NumberInput
                            value={config.boxWidth}
                            min={100}
                            max={420}
                            ariaLabel="Preview width"
                            onChange={(value) =>
                                updateConfig("boxWidth", value)
                            }
                        />
                    </div>

                    <div className="col-stretch-1 rounded-[8px] bg-fg/5 p-2">
                        <div className="row-center-1 justify-between">
                            <span className="text-[10px]">Preview height</span>
                            <span className="text-[9px] text-fg/60">
                                {config.boxHeight}px
                            </span>
                        </div>
                        <Range
                            value={config.boxHeight}
                            min={100}
                            max={320}
                            step={1}
                            onChange={(value) =>
                                updateConfig("boxHeight", value)
                            }
                        />
                        <NumberInput
                            value={config.boxHeight}
                            min={100}
                            max={320}
                            ariaLabel="Preview height"
                            onChange={(value) =>
                                updateConfig("boxHeight", value)
                            }
                        />
                    </div>
                </div>
            </div>

            <SidesEditor
                title="Slice cuts"
                value={config.slice}
                min={0}
                max={50}
                step={1}
                unit="%"
                linked={linkSlice}
                setLinked={setLinkSlice}
                onChange={(side, value) =>
                    updateSides("slice", side, value, linkSlice)
                }
            />

            <SidesEditor
                title="Border width"
                value={config.borderWidth}
                min={0}
                max={60}
                step={1}
                unit="px"
                linked={linkBorderWidth}
                setLinked={setLinkBorderWidth}
                onChange={(side, value) =>
                    updateSides("borderWidth", side, value, linkBorderWidth)
                }
            />

            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                <SidesEditor
                    title="Image width"
                    value={config.imageWidth}
                    min={0}
                    max={4}
                    step={0.1}
                    unit="×"
                    linked={linkImageWidth}
                    setLinked={setLinkImageWidth}
                    onChange={(side, value) =>
                        updateSides("imageWidth", side, value, linkImageWidth)
                    }
                />

                <SidesEditor
                    title="Outset"
                    value={config.outset}
                    min={0}
                    max={40}
                    step={1}
                    unit="px"
                    linked={linkOutset}
                    setLinked={setLinkOutset}
                    onChange={(side, value) =>
                        updateSides("outset", side, value, linkOutset)
                    }
                />
            </div>

            <div className="col-stretch-2 rounded-md bg-fg/5 p-2">
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    <label className="row-center-1 rounded-[8px] bg-fg/5 p-2">
                        <span className="text-[11px]">Horizontal repeat</span>
                        <select
                            value={config.repeatX}
                            onChange={(event) =>
                                updateConfig(
                                    "repeatX",
                                    event.target.value as BorderImageConfig["repeatX"],
                                )
                            }
                            className={`${selectClass} ml-auto`}
                        >
                            {borderImageRepeats.map((repeat) => (
                                <option key={repeat}>{repeat}</option>
                            ))}
                        </select>
                    </label>

                    <label className="row-center-1 rounded-[8px] bg-fg/5 p-2">
                        <span className="text-[11px]">Vertical repeat</span>
                        <select
                            value={config.repeatY}
                            onChange={(event) =>
                                updateConfig(
                                    "repeatY",
                                    event.target.value as BorderImageConfig["repeatY"],
                                )
                            }
                            className={`${selectClass} ml-auto`}
                        >
                            {borderImageRepeats.map((repeat) => (
                                <option key={repeat}>{repeat}</option>
                            ))}
                        </select>
                    </label>
                </div>

                <div className="row-center-1 flex-wrap rounded-[8px] bg-fg/5 p-2">
                    <GeneralButton
                        textButton="Center fill"
                        variant="ghost"
                        active={config.fill}
                        handleAction={() => updateConfig("fill", !config.fill)}
                    />
                    <GeneralButton
                        textButton="Shorthand"
                        variant="ghost"
                        active={config.shorthand}
                        handleAction={() =>
                            updateConfig("shorthand", !config.shorthand)
                        }
                    />
                </div>
            </div>
        </div>
    );
};
