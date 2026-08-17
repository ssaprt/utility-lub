import { ClipPathConfig, ClipPathPoint } from "./clip-path.type";

const round = (value: number) => {
    return Number(value.toFixed(2));
};

export const clipPathConfigToCss = (config: ClipPathConfig) => {
    const points = config.points
        .map(({ x, y }) => `${round(x)}% ${round(y)}%`)
        .join(", ");

    return `polygon(${points})`;
};

export const cloneClipPathPoints = (
    points: Array<{
        x: number;
        y: number;
    }>,
    prefix = "point",
): ClipPathPoint[] => {
    return points.map((point, index) => ({
        id: `${prefix}-${index}`,
        x: point.x,
        y: point.y,
    }));
};
