import type {
    BorderImageConfig,
    BorderImageSides,
} from "./border-image.type";

export const clamp = (value: number, min: number, max: number) => {
    return Math.min(Math.max(value, min), max);
};

const formatNumber = (value: number) => Number(value.toFixed(2));

export const compressSides = (
    sides: BorderImageSides,
    unit = "",
): string => {
    const values = [sides.top, sides.right, sides.bottom, sides.left];
    const value = (item: number) => `${formatNumber(item)}${unit}`;

    if (values.every((item) => item === values[0])) {
        return value(values[0]);
    }

    if (values[0] === values[2] && values[1] === values[3]) {
        return `${value(values[0])} ${value(values[1])}`;
    }

    if (values[1] === values[3]) {
        return `${value(values[0])} ${value(values[1])} ${value(values[2])}`;
    }

    return values.map(value).join(" ");
};

export const getBorderImageSource = (source: string) => {
    const value = source.trim();

    if (/^(url\(|(?:repeating-)?(?:linear|radial|conic)-gradient\()/i.test(value)) {
        return value;
    }

    return `url("${value.replaceAll('"', '\\"')}")`;
};

export const borderImageConfigToCss = (config: BorderImageConfig) => {
    const source = getBorderImageSource(config.source);
    const slice = `${compressSides(config.slice, "%")}${config.fill ? " fill" : ""}`;
    const borderWidth = compressSides(config.borderWidth, "px");
    const imageWidth = compressSides(config.imageWidth);
    const outset = compressSides(config.outset, "px");
    const repeat =
        config.repeatX === config.repeatY
            ? config.repeatX
            : `${config.repeatX} ${config.repeatY}`;

    const lines = [
        "border-style: solid;",
        `border-width: ${borderWidth};`,
    ];

    if (config.shorthand) {
        lines.push(
            `border-image: ${source} ${slice} / ${imageWidth} / ${outset} ${repeat};`,
        );
    } else {
        lines.push(
            `border-image-source: ${source};`,
            `border-image-slice: ${slice};`,
            `border-image-width: ${imageWidth};`,
            `border-image-outset: ${outset};`,
            `border-image-repeat: ${repeat};`,
        );
    }

    return lines.join("\n");
};
