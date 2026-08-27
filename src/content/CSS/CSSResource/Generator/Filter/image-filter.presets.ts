import {
    defaultImageFilters,
    type ImageFilterValues,
} from "./image-filter.type";

export type ImageFilterPresetCategory = "color" | "mono" | "creative";

export interface ImageFilterPreset {
    id: string;

    title: string;

    category: ImageFilterPresetCategory;

    filters: ImageFilterValues;
}

const createPreset = (
    id: string,
    title: string,
    category: ImageFilterPresetCategory,
    values: Partial<ImageFilterValues>,
): ImageFilterPreset => {
    return {
        id,
        title,
        category,

        filters: {
            ...defaultImageFilters,
            ...values,
        },
    };
};

export const imageFilterPresets: ImageFilterPreset[] = [
    createPreset("original", "Original", "color", {}),

    createPreset("vivid", "Vivid", "color", {
        brightness: 105,
        contrast: 110,
        saturation: 145,
    }),

    createPreset("warm", "Warm", "color", {
        brightness: 104,
        contrast: 104,
        saturation: 118,
        sepia: 12,
        hueRotate: -8,
    }),

    createPreset("cool", "Cool", "color", {
        brightness: 103,
        contrast: 106,
        saturation: 110,
        hueRotate: 14,
    }),

    createPreset("sunset", "Sunset", "color", {
        brightness: 105,
        contrast: 110,
        saturation: 138,
        sepia: 15,
        hueRotate: -18,
    }),

    createPreset("noir", "Noir", "mono", {
        brightness: 95,
        contrast: 128,
        saturation: 0,
    }),

    createPreset("soft-mono", "Soft Mono", "mono", {
        brightness: 108,
        contrast: 88,
        saturation: 0,
    }),

    createPreset("sepia", "Sepia", "mono", {
        brightness: 102,
        contrast: 94,
        saturation: 82,
        sepia: 75,
    }),

    createPreset("vintage", "Vintage", "creative", {
        brightness: 105,
        contrast: 90,
        saturation: 78,
        sepia: 32,
    }),

    createPreset("dramatic", "Dramatic", "creative", {
        brightness: 90,
        contrast: 145,
        saturation: 122,
    }),

    createPreset("dream", "Dream", "creative", {
        brightness: 110,
        contrast: 88,
        saturation: 115,
        blur: 0.8,
    }),

    createPreset("neon", "Neon", "creative", {
        brightness: 105,
        contrast: 130,
        saturation: 200,
        hueRotate: 20,
    }),

    createPreset("fade", "Fade", "creative", {
        brightness: 108,
        contrast: 84,
        saturation: 76,
        opacity: 94,
    }),

    createPreset("inverse", "Inverse", "creative", {
        invert: 100,
        hueRotate: 180,
    }),
];
