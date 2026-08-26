import type {
    BorderConfig,
    BorderRadiusConfig,
    BorderRadiusUnit,
    BorderSideConfig,
} from "./border.type";

export const clamp = (value: number, min: number, max: number) => {
    return Math.min(Math.max(value, min), max);
};

export const normalizeColor = (color: string) => {
    return /^#[0-9a-fA-F]{6}$/.test(color) ? color : "#000000";
};

const normalizeNumber = (value: number) => {
    return Number(value.toFixed(2));
};

export const borderSideToCss = (border: BorderSideConfig) => {
    return `${normalizeNumber(border.width)}px ${border.style} ${border.color}`;
};

const compressFourValues = (values: number[], unit: BorderRadiusUnit) => {
    const [topLeft, topRight, bottomRight, bottomLeft] = values;

    const value = (item: number) => {
        return `${normalizeNumber(item)}${unit}`;
    };

    if (
        topLeft === topRight &&
        topLeft === bottomRight &&
        topLeft === bottomLeft
    ) {
        return value(topLeft);
    }

    if (topLeft === bottomRight && topRight === bottomLeft) {
        return `${value(topLeft)} ${value(topRight)}`;
    }

    if (topRight === bottomLeft) {
        return `${value(topLeft)} ${value(topRight)} ${value(bottomRight)}`;
    }

    return `${value(topLeft)} ${value(topRight)} ${value(
        bottomRight,
    )} ${value(bottomLeft)}`;
};

export const borderRadiusToCss = (
    radius: BorderRadiusConfig,
    unit: BorderRadiusUnit,
) => {
    const horizontal = [
        radius.topLeft.x,
        radius.topRight.x,
        radius.bottomRight.x,
        radius.bottomLeft.x,
    ];

    const vertical = [
        radius.topLeft.y,
        radius.topRight.y,
        radius.bottomRight.y,
        radius.bottomLeft.y,
    ];

    const horizontalCss = compressFourValues(horizontal, unit);
    const verticalCss = compressFourValues(vertical, unit);

    const sameAxes = horizontal.every(
        (value, index) => value === vertical[index],
    );

    if (sameAxes) {
        return horizontalCss;
    }

    return `${horizontalCss} / ${verticalCss}`;
};

const bordersAreEqual = (first: BorderSideConfig, second: BorderSideConfig) => {
    return (
        first.width === second.width &&
        first.style === second.style &&
        first.color === second.color
    );
};

export const borderConfigToCss = (config: BorderConfig) => {
    const { top, right, bottom, left } = config.borders;

    const borderRadius = borderRadiusToCss(config.radius, config.radiusUnit);

    const allBordersEqual =
        bordersAreEqual(top, right) &&
        bordersAreEqual(top, bottom) &&
        bordersAreEqual(top, left);

    const lines: string[] = [];

    if (allBordersEqual) {
        lines.push(`border: ${borderSideToCss(top)};`);
    } else {
        lines.push(`border-top: ${borderSideToCss(top)};`);
        lines.push(`border-right: ${borderSideToCss(right)};`);
        lines.push(`border-bottom: ${borderSideToCss(bottom)};`);
        lines.push(`border-left: ${borderSideToCss(left)};`);
    }

    lines.push(`border-radius: ${borderRadius};`);

    return lines.join("\n");
};
