"use client";

import { GeneralButton } from "@/components/button/GeneralButton/GeneralButton";
import { NumberInput } from "@/components/input/Number/Number";
import { Range } from "@/components/input/range/Range";

import { IconRestore } from "@tabler/icons-react";

import type { Dispatch, ReactNode, SetStateAction } from "react";

import {
    createDefaultImageFilterConfig,
    imageFitValues,
    type ImageFilterConfig,
    type ImageFilterKey,
} from "./image-filter.type";

import type { ImageFilterPreset } from "./image-filter.presets";

import { Presets } from "./Presets";

interface ConfigImageFilterProps {
    config: ImageFilterConfig;

    setConfig: Dispatch<SetStateAction<ImageFilterConfig>>;

    imageSrc: string;
}

interface FilterControlProps {
    title: ReactNode;

    value: number;

    suffix: string;

    min: number;
    max: number;
    step?: number;

    onChange: (value: number) => void;
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

const FilterControl = ({
    title,
    value,
    suffix,
    min,
    max,
    step = 1,
    onChange,
}: FilterControlProps) => {
    return (
        <div
            className="
                col-stretch-1
                rounded-[5px]
                border
                border-fg/5
                p-2
            "
        >
            <CompactTitle value={`${value}${suffix}`}>{title}</CompactTitle>

            <Range
                value={value}
                min={min}
                max={max}
                step={step}
                onChange={onChange}
            />

            <NumberInput
                value={value}
                min={min}
                max={max}
                ariaLabel={String(title)}
                onChange={onChange}
            />
        </div>
    );
};

export const ConfigImageFilter = ({
    config,
    setConfig,
    imageSrc,
}: ConfigImageFilterProps) => {
    const updateFilter = (key: ImageFilterKey, value: number) => {
        setConfig((current) => ({
            ...current,

            filters: {
                ...current.filters,

                [key]: value,
            },
        }));
    };

    const applyPreset = (preset: ImageFilterPreset) => {
        setConfig((current) => ({
            ...current,

            filters: {
                ...preset.filters,
            },
        }));
    };

    const resetFilters = () => {
        setConfig((current) => ({
            ...createDefaultImageFilterConfig(),

            fit: current.fit,
        }));
    };

    return (
        <>
            <div className="col-stretch-2 w-full">
                <div
                    className="
                    row-center-2
                    w-full
                    rounded-[5px]
                    justify-between
                    bg-fg/5
                    p-1.5
                "
                >
                    <span className="pl-1 text-[12px] font-medium">
                        Image filters
                    </span>

                    <GeneralButton
                        variant="ghost"
                        className="rounded-[2px]"
                        icon={<IconRestore className="size-4" />}
                        textButton="Reset"
                        handleAction={resetFilters}
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
                    <CompactTitle>Preview fit</CompactTitle>

                    <div
                        className="
                        row-center-1
                        w-fit
                        rounded-[4px]
                        bg-fg/5
                        p-0.5
                    "
                    >
                        {imageFitValues.map((value) => (
                            <GeneralButton
                                key={value}
                                variant="ghost"
                                className="rounded-[2px]!"
                                textButton={value}
                                active={config.fit === value}
                                handleAction={() =>
                                    setConfig((current) => ({
                                        ...current,

                                        fit: value,
                                    }))
                                }
                            />
                        ))}
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
                    <FilterControl
                        title="Brightness"
                        value={config.filters.brightness}
                        suffix="%"
                        min={0}
                        max={200}
                        onChange={(value) => updateFilter("brightness", value)}
                    />

                    <FilterControl
                        title="Contrast"
                        value={config.filters.contrast}
                        suffix="%"
                        min={0}
                        max={200}
                        onChange={(value) => updateFilter("contrast", value)}
                    />

                    <FilterControl
                        title="Saturation"
                        value={config.filters.saturation}
                        suffix="%"
                        min={0}
                        max={300}
                        onChange={(value) => updateFilter("saturation", value)}
                    />

                    <FilterControl
                        title="Grayscale"
                        value={config.filters.grayscale}
                        suffix="%"
                        min={0}
                        max={100}
                        onChange={(value) => updateFilter("grayscale", value)}
                    />

                    <FilterControl
                        title="Sepia"
                        value={config.filters.sepia}
                        suffix="%"
                        min={0}
                        max={100}
                        onChange={(value) => updateFilter("sepia", value)}
                    />

                    <FilterControl
                        title="Invert"
                        value={config.filters.invert}
                        suffix="%"
                        min={0}
                        max={100}
                        onChange={(value) => updateFilter("invert", value)}
                    />

                    <FilterControl
                        title="Hue rotate"
                        value={config.filters.hueRotate}
                        suffix="°"
                        min={-180}
                        max={180}
                        onChange={(value) => updateFilter("hueRotate", value)}
                    />

                    <FilterControl
                        title="Blur"
                        value={config.filters.blur}
                        suffix="px"
                        min={0}
                        max={20}
                        step={0.1}
                        onChange={(value) => updateFilter("blur", value)}
                    />

                    <FilterControl
                        title="Opacity"
                        value={config.filters.opacity}
                        suffix="%"
                        min={0}
                        max={100}
                        onChange={(value) => updateFilter("opacity", value)}
                    />
                </div>
            </div>
            <Presets
                imageSrc={imageSrc}
                filters={config.filters}
                onSelect={applyPreset}
            />
        </>
    );
};
