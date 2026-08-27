"use client";

import { useMemo, useState } from "react";

import {
    imageFilterPresets,
    type ImageFilterPreset,
    type ImageFilterPresetCategory,
} from "./image-filter.presets";

import type { ImageFilterValues } from "./image-filter.type";

import { ItemWithCopy } from "@/components/blocks/Item/ItemWithCopy";
import Image from "next/image";
import { imageFilterToCssValue } from "./image-filter.utils";

type PresetCategory = "all" | ImageFilterPresetCategory;

const categories: {
    title: string;
    value: PresetCategory;
}[] = [
    {
        title: "All",
        value: "all",
    },
    {
        title: "Color",
        value: "color",
    },
    {
        title: "Mono",
        value: "mono",
    },
    {
        title: "Creative",
        value: "creative",
    },
];

const isSameFilters = (first: ImageFilterValues, second: ImageFilterValues) => {
    return (
        first.brightness === second.brightness &&
        first.contrast === second.contrast &&
        first.saturation === second.saturation &&
        first.grayscale === second.grayscale &&
        first.sepia === second.sepia &&
        first.invert === second.invert &&
        first.hueRotate === second.hueRotate &&
        first.blur === second.blur &&
        first.opacity === second.opacity
    );
};

export const Presets = ({
    imageSrc,
    filters,
    onSelect,
}: {
    imageSrc: string;

    filters: ImageFilterValues;

    onSelect: (preset: ImageFilterPreset) => void;
}) => {
    const [category, setCategory] = useState<PresetCategory>("all");

    const presets = useMemo(() => {
        if (category === "all") {
            return imageFilterPresets;
        }

        return imageFilterPresets.filter(
            (preset) => preset.category === category,
        );
    }, [category]);

    return (
        <div className="col-stretch-2 w-full">
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
                {categories.map((item) => (
                    <button
                        key={item.value}
                        type="button"
                        onClick={() => setCategory(item.value)}
                        className={`
                                rounded-[3px]
                                px-2
                                py-1
                                text-[10px]
                                hover:cursor-pointer
                                transition-colors

                                ${
                                    category === item.value
                                        ? "bg-fg text-app"
                                        : "text-fg/70 hover:bg-fg/10 hover:text-fg"
                                }
                            `}
                    >
                        {item.title}
                    </button>
                ))}
            </div>

            <div
                className="
                    grid
                    w-full
                    grid-cols-2
                    gap-2

                    sm:grid-cols-3
                    md:grid-cols-4
                    xl:grid-cols-5
                "
            >
                {presets.map((preset) => {
                    const filter = imageFilterToCssValue(preset.filters);

                    const active = isSameFilters(filters, preset.filters);

                    return (
                        <div
                            key={preset.id}
                            className={`
                                    min-w-0
                                    rounded-[12px]
                                    transition-[outline,opacity]
                                    duration-150

                                    ${
                                        active
                                            ? "outline-2 outline-fg"
                                            : "outline-2 outline-transparent"
                                    }
                                `}
                        >
                            <ItemWithCopy
                                handleAction={() => onSelect(preset)}
                                item={{
                                    id: preset.id,

                                    title: preset.title,

                                    copyContent: `filter: ${filter};`,

                                    content: (
                                        <div className="w-full h-full rounded-inherit overflow-hidden">
                                            <Image
                                                width={0}
                                                height={0}
                                                src={imageSrc}
                                                alt={preset.title}
                                                draggable={false}
                                                className="
                                                w-full
                                                h-auto
                                                aspect-square
                                                    size-cover
                                                    object-cover
                                                "
                                                style={{
                                                    filter,
                                                }}
                                            />
                                        </div>
                                    ),
                                }}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
