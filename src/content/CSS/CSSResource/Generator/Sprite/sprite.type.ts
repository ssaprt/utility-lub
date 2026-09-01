export type SpriteLayout = "grid" | "horizontal" | "vertical";
export type SpriteFit = "contain" | "cover" | "stretch";
export type SpriteRendering = "smooth" | "pixelated";

export type SpriteAsset = {
    id: string;
    file: File;
    url: string;
    name: string;
};

export type SpriteConfig = {
    layout: SpriteLayout;
    columns: number;
    cellWidth: number;
    cellHeight: number;
    gap: number;
    fit: SpriteFit;
    scale: number;
    transparent: boolean;
    backgroundColor: string;
    rendering: SpriteRendering;
    prefix: string;
};

export type SpritePlacement = {
    index: number;
    column: number;
    row: number;
    x: number;
    y: number;
};

export type SpriteMetrics = {
    columns: number;
    rows: number;
    width: number;
    height: number;
    placements: SpritePlacement[];
};

export const defaultSpriteConfig: SpriteConfig = {
    layout: "grid",
    columns: 4,
    cellWidth: 48,
    cellHeight: 48,
    gap: 4,
    fit: "contain",
    scale: 1,
    transparent: true,
    backgroundColor: "#111827",
    rendering: "smooth",
    prefix: "sprite",
};
