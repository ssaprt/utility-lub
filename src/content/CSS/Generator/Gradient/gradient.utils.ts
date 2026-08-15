import type {
    GradientConfig,
    GradientStop,
    GradientType,
    RadialShape,
} from "./gradient.type";

const clamp = (value: number, min: number, max: number) => {
    return Math.min(Math.max(value, min), max);
};

const splitTopLevel = (value: string) => {
    const result: string[] = [];

    let depth = 0;
    let start = 0;

    for (let index = 0; index < value.length; index += 1) {
        const char = value[index];

        if (char === "(") {
            depth += 1;
        }

        if (char === ")") {
            depth -= 1;
        }

        if (char === "," && depth === 0) {
            result.push(value.slice(start, index).trim());
            start = index + 1;
        }
    }

    result.push(value.slice(start).trim());

    return result;
};

const positionToPercent = (value: string) => {
    if (value.endsWith("deg")) {
        return clamp((parseFloat(value) / 360) * 100, 0, 100);
    }

    if (value.endsWith("%")) {
        return clamp(parseFloat(value), 0, 100);
    }

    return clamp(parseFloat(value), 0, 100);
};

const parseStops = (values: string[]): GradientStop[] => {
    const result: GradientStop[] = [];

    values.forEach((value, index) => {
        const match = value.match(
            /^(#[0-9a-fA-F]{3,8}|rgba?\([^)]*\)|hsla?\([^)]*\))\s*(.*)$/i,
        );

        if (!match) return;

        const color = match[1];
        const positions = match[2].trim().split(/\s+/).filter(Boolean);

        if (positions.length === 0) {
            result.push({
                id: `preset-${index}`,
                color,
                offset: Number.NaN,
            });

            return;
        }

        positions.forEach((position, positionIndex) => {
            result.push({
                id: `preset-${index}-${positionIndex}`,
                color,
                offset: positionToPercent(position),
            });
        });
    });

    return result.map((stop, index, array) => {
        if (!Number.isNaN(stop.offset)) {
            return stop;
        }

        return {
            ...stop,
            offset:
                array.length <= 1
                    ? 0
                    : Math.round((index / (array.length - 1)) * 100),
        };
    });
};

export const parseGradient = (gradient: string): GradientConfig => {
    const match = gradient
        .trim()
        .match(/^(repeating-)?(linear|radial|conic)-gradient\((.*)\)$/i);

    if (!match) {
        throw new Error(`Unsupported gradient: ${gradient}`);
    }

    const repeating = Boolean(match[1]);
    const gradientType = match[2] as GradientType;
    const parts = splitTopLevel(match[3]);

    const descriptor = parts.shift() ?? "";

    let angle = 0;
    let radialShape: RadialShape = "ellipse";
    let positionX = 50;
    let positionY = 50;

    if (gradientType === "linear") {
        const angleMatch = descriptor.match(/(-?\d+(?:\.\d+)?)deg/i);

        angle = angleMatch ? Number(angleMatch[1]) : 180;
    }

    if (gradientType === "radial") {
        radialShape = descriptor.trim().startsWith("circle")
            ? "circle"
            : "ellipse";

        const positionMatch = descriptor.match(
            /at\s+(-?\d+(?:\.\d+)?)%\s+(-?\d+(?:\.\d+)?)%/i,
        );

        if (positionMatch) {
            positionX = Number(positionMatch[1]);
            positionY = Number(positionMatch[2]);
        }
    }

    if (gradientType === "conic") {
        const angleMatch = descriptor.match(/from\s+(-?\d+(?:\.\d+)?)deg/i);

        const positionMatch = descriptor.match(
            /at\s+(-?\d+(?:\.\d+)?)%\s+(-?\d+(?:\.\d+)?)%/i,
        );

        angle = angleMatch ? Number(angleMatch[1]) : 0;

        if (positionMatch) {
            positionX = Number(positionMatch[1]);
            positionY = Number(positionMatch[2]);
        }
    }

    const stops = parseStops(parts);

    return {
        gradientType,
        repeating,
        angle,
        radialShape,
        positionX,
        positionY,
        stops,
    };
};

export const gradientConfigToCss = (config: GradientConfig) => {
    const colors = [...config.stops]
        .sort((a, b) => a.offset - b.offset)
        .map(({ color, offset }) => `${color} ${offset}%`)
        .join(", ");

    const prefix = config.repeating ? "repeating-" : "";

    if (config.gradientType === "linear") {
        return `${prefix}linear-gradient(${config.angle}deg, ${colors})`;
    }

    if (config.gradientType === "radial") {
        return `${prefix}radial-gradient(${config.radialShape} at ${config.positionX}% ${config.positionY}%, ${colors})`;
    }

    return `${prefix}conic-gradient(from ${config.angle}deg at ${config.positionX}% ${config.positionY}%, ${colors})`;
};
