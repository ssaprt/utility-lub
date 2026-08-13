export const patternTypes = [
    "dots",
    "polkaDots",
    "grid",
    "diagonal",
    "horizontal",
    "vertical",
    "checker",
    "diamonds",
    "honeycomb",
    "hexagons",
    "crosshatch",
    "rings",
    "bubbles",
    "waves",
    "scales",
    "clouds",
    "triangles",
    "zigzag",
    "chevron",
    "bricks",
    "tiles",
    "circles",
    "confetti",
    "stars",
    "plus",
    "weave",
] as const;

export type PatternType = (typeof patternTypes)[number];

export interface PatternConfig {
    patternType: PatternType;
    backgroundColor: string;
    patternColor: string;
    secondaryColor: string;
    size: number;
    gapX: number;
    gapY: number;
    thickness: number;
    opacity: number;
    angle: number;
    positionX: number;
    positionY: number;
    elementOffsetX: number;
    elementOffsetY: number;
    scaleX: number;
    scaleY: number;
}

export interface PatternPreset {
    id: string;
    name: string;
    config: PatternConfig;
}

export interface PatternPresetCategory {
    id: string;
    name: string;
    presets: PatternPreset[];
}
