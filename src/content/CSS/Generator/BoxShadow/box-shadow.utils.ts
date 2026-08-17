import type { BoxShadowConfig, BoxShadowLayer } from "./box-shadow.type";

const normalizeNumber = (value: number) => {
    return Number(value.toFixed(2));
};

export const boxShadowLayerToCss = (shadow: BoxShadowLayer) => {
    const inset = shadow.inset ? "inset " : "";

    return `${inset}${normalizeNumber(shadow.offsetX)}px ${normalizeNumber(
        shadow.offsetY,
    )}px ${normalizeNumber(shadow.blur)}px ${normalizeNumber(
        shadow.spread,
    )}px ${shadow.color}`;
};

export const boxShadowConfigToCss = (config: BoxShadowConfig) => {
    return config.shadows.map(boxShadowLayerToCss).join(", ");
};

export const cloneShadowLayers = (
    shadows: BoxShadowLayer[],
    prefix = "shadow",
): BoxShadowLayer[] => {
    return shadows.map((shadow, index) => ({
        ...shadow,
        id: `${prefix}-${index}`,
    }));
};
