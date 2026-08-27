export const imageFitValues = ["contain", "cover", "fill"] as const;

export type ImageFit = (typeof imageFitValues)[number];

export interface ImageFilterValues {
    brightness: number;
    contrast: number;
    saturation: number;

    grayscale: number;
    sepia: number;
    invert: number;

    hueRotate: number;
    blur: number;
    opacity: number;
}

export type ImageFilterKey = keyof ImageFilterValues;

export interface ImageFilterConfig {
    fit: ImageFit;

    filters: ImageFilterValues;
}

export const defaultImageFilters: ImageFilterValues = {
    brightness: 100,
    contrast: 100,
    saturation: 100,

    grayscale: 0,
    sepia: 0,
    invert: 0,

    hueRotate: 0,
    blur: 0,
    opacity: 100,
};

export const createDefaultImageFilterConfig = (): ImageFilterConfig => {
    return {
        fit: "cover",

        filters: {
            ...defaultImageFilters,
        },
    };
};

export const defaultImageFilterConfig = createDefaultImageFilterConfig();
