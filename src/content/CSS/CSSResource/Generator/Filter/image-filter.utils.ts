import {
    defaultImageFilters,
    type ImageFilterValues,
} from "./image-filter.type";

const normalizeNumber = (value: number) => {
    return Number(value.toFixed(2));
};

export const imageFilterToCssValue = (filters: ImageFilterValues) => {
    const values: string[] = [];

    if (filters.brightness !== defaultImageFilters.brightness) {
        values.push(`brightness(${normalizeNumber(filters.brightness)}%)`);
    }

    if (filters.contrast !== defaultImageFilters.contrast) {
        values.push(`contrast(${normalizeNumber(filters.contrast)}%)`);
    }

    if (filters.saturation !== defaultImageFilters.saturation) {
        values.push(`saturate(${normalizeNumber(filters.saturation)}%)`);
    }

    if (filters.grayscale !== defaultImageFilters.grayscale) {
        values.push(`grayscale(${normalizeNumber(filters.grayscale)}%)`);
    }

    if (filters.sepia !== defaultImageFilters.sepia) {
        values.push(`sepia(${normalizeNumber(filters.sepia)}%)`);
    }

    if (filters.invert !== defaultImageFilters.invert) {
        values.push(`invert(${normalizeNumber(filters.invert)}%)`);
    }

    if (filters.hueRotate !== defaultImageFilters.hueRotate) {
        values.push(`hue-rotate(${normalizeNumber(filters.hueRotate)}deg)`);
    }

    if (filters.blur !== defaultImageFilters.blur) {
        values.push(`blur(${normalizeNumber(filters.blur)}px)`);
    }

    if (filters.opacity !== defaultImageFilters.opacity) {
        values.push(`opacity(${normalizeNumber(filters.opacity)}%)`);
    }

    return values.length ? values.join(" ") : "none";
};

export const imageFilterToCss = (filters: ImageFilterValues) => {
    return `.filtered-image {
    filter: ${imageFilterToCssValue(filters)};
}`;
};

export const imageFilterToHtml = () => {
    return `<img
    class="filtered-image"
    src="image.jpg"
    alt=""
/>`;
};

const DEFAULT_SVG = `
<svg
    xmlns="http://www.w3.org/2000/svg"
    width="1200"
    height="800"
    viewBox="0 0 1200 800"
>
    <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="#7dd3fc"/>
            <stop offset="0.55" stop-color="#c084fc"/>
            <stop offset="1" stop-color="#fb7185"/>
        </linearGradient>

        <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="#22c55e"/>
            <stop offset="1" stop-color="#14532d"/>
        </linearGradient>
    </defs>

    <rect width="1200" height="800" fill="url(#sky)"/>

    <circle
        cx="930"
        cy="180"
        r="85"
        fill="#fde68a"
    />

    <path
        d="M0 560 L240 300 L420 510 L650 250 L940 560 Z"
        fill="#334155"
        opacity=".82"
    />

    <path
        d="M350 560 L620 330 L870 560 Z"
        fill="#475569"
        opacity=".9"
    />

    <rect
        y="560"
        width="1200"
        height="240"
        fill="url(#ground)"
    />

    <path
        d="M0 690 C230 590 360 760 620 660 C830 580 980 680 1200 610 L1200 800 L0 800 Z"
        fill="#0f766e"
        opacity=".7"
    />
</svg>
`;

export const DEFAULT_IMAGE_SRC = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(DEFAULT_SVG)}`;
