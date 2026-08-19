import type { BoxShadowLayer } from "./box-shadow.type";
import { boxShadowLayerToCss } from "./box-shadow.utils";

export interface BoxShadowPreset {
    id: string;
    name: string;
    shadows: Omit<BoxShadowLayer, "id">[];
}

export interface BoxShadowPresetCategory {
    id: string;
    name: string;
    presets: BoxShadowPreset[];
}

export const boxShadowPresetToCss = (preset: BoxShadowPreset) => {
    return preset.shadows
        .map((shadow, index) =>
            boxShadowLayerToCss({
                ...shadow,
                id: `${preset.id}-${index}`,
            }),
        )
        .join(", ");
};

export const boxShadowPresetCategories: BoxShadowPresetCategory[] = [
    {
        id: "soft",
        name: "Soft shadows",
        presets: [
            {
                id: "soft-1",
                name: "Soft",
                shadows: [
                    {
                        offsetX: 0,
                        offsetY: 8,
                        blur: 24,
                        spread: -6,
                        color: "#00000030",
                        inset: false,
                    },
                ],
            },
            {
                id: "soft-2",
                name: "Soft deep",
                shadows: [
                    {
                        offsetX: 0,
                        offsetY: 12,
                        blur: 32,
                        spread: -8,
                        color: "#00000038",
                        inset: false,
                    },
                ],
            },
            {
                id: "soft-3",
                name: "Soft wide",
                shadows: [
                    {
                        offsetX: 0,
                        offsetY: 14,
                        blur: 45,
                        spread: -12,
                        color: "#00000035",
                        inset: false,
                    },
                ],
            },
            {
                id: "soft-4",
                name: "Floating",
                shadows: [
                    {
                        offsetX: 0,
                        offsetY: 18,
                        blur: 40,
                        spread: -14,
                        color: "#00000045",
                        inset: false,
                    },
                ],
            },
            {
                id: "soft-5",
                name: "Subtle",
                shadows: [
                    {
                        offsetX: 0,
                        offsetY: 4,
                        blur: 12,
                        spread: -3,
                        color: "#00000028",
                        inset: false,
                    },
                ],
            },
            {
                id: "soft-6",
                name: "Cloud",
                shadows: [
                    {
                        offsetX: 0,
                        offsetY: 10,
                        blur: 50,
                        spread: 0,
                        color: "#00000022",
                        inset: false,
                    },
                ],
            },
        ],
    },
    {
        id: "material",
        name: "Elevation",
        presets: [
            {
                id: "elevation-1",
                name: "Level 1",
                shadows: [
                    {
                        offsetX: 0,
                        offsetY: 1,
                        blur: 3,
                        spread: 0,
                        color: "#00000030",
                        inset: false,
                    },
                    {
                        offsetX: 0,
                        offsetY: 1,
                        blur: 2,
                        spread: -1,
                        color: "#00000020",
                        inset: false,
                    },
                ],
            },
            {
                id: "elevation-2",
                name: "Level 2",
                shadows: [
                    {
                        offsetX: 0,
                        offsetY: 3,
                        blur: 6,
                        spread: -1,
                        color: "#00000030",
                        inset: false,
                    },
                    {
                        offsetX: 0,
                        offsetY: 2,
                        blur: 4,
                        spread: -2,
                        color: "#00000025",
                        inset: false,
                    },
                ],
            },
            {
                id: "elevation-3",
                name: "Level 3",
                shadows: [
                    {
                        offsetX: 0,
                        offsetY: 8,
                        blur: 16,
                        spread: -4,
                        color: "#00000035",
                        inset: false,
                    },
                    {
                        offsetX: 0,
                        offsetY: 4,
                        blur: 8,
                        spread: -4,
                        color: "#00000025",
                        inset: false,
                    },
                ],
            },
            {
                id: "elevation-4",
                name: "Level 4",
                shadows: [
                    {
                        offsetX: 0,
                        offsetY: 16,
                        blur: 30,
                        spread: -10,
                        color: "#00000042",
                        inset: false,
                    },
                    {
                        offsetX: 0,
                        offsetY: 8,
                        blur: 14,
                        spread: -8,
                        color: "#00000028",
                        inset: false,
                    },
                ],
            },
            {
                id: "elevation-5",
                name: "Level 5",
                shadows: [
                    {
                        offsetX: 0,
                        offsetY: 24,
                        blur: 45,
                        spread: -15,
                        color: "#00000050",
                        inset: false,
                    },
                    {
                        offsetX: 0,
                        offsetY: 10,
                        blur: 20,
                        spread: -10,
                        color: "#00000030",
                        inset: false,
                    },
                ],
            },
        ],
    },
    {
        id: "directional",
        name: "Directional",
        presets: [
            {
                id: "direction-bottom",
                name: "Bottom",
                shadows: [
                    {
                        offsetX: 0,
                        offsetY: 18,
                        blur: 22,
                        spread: -10,
                        color: "#00000055",
                        inset: false,
                    },
                ],
            },
            {
                id: "direction-top",
                name: "Top",
                shadows: [
                    {
                        offsetX: 0,
                        offsetY: -18,
                        blur: 22,
                        spread: -10,
                        color: "#00000055",
                        inset: false,
                    },
                ],
            },
            {
                id: "direction-left",
                name: "Left",
                shadows: [
                    {
                        offsetX: -18,
                        offsetY: 0,
                        blur: 22,
                        spread: -10,
                        color: "#00000055",
                        inset: false,
                    },
                ],
            },
            {
                id: "direction-right",
                name: "Right",
                shadows: [
                    {
                        offsetX: 18,
                        offsetY: 0,
                        blur: 22,
                        spread: -10,
                        color: "#00000055",
                        inset: false,
                    },
                ],
            },
            {
                id: "direction-diagonal",
                name: "Diagonal",
                shadows: [
                    {
                        offsetX: 16,
                        offsetY: 16,
                        blur: 26,
                        spread: -8,
                        color: "#00000050",
                        inset: false,
                    },
                ],
            },
            {
                id: "direction-diagonal-2",
                name: "Diagonal reverse",
                shadows: [
                    {
                        offsetX: -16,
                        offsetY: 16,
                        blur: 26,
                        spread: -8,
                        color: "#00000050",
                        inset: false,
                    },
                ],
            },
        ],
    },
    {
        id: "sharp",
        name: "Sharp & hard",
        presets: [
            {
                id: "hard-1",
                name: "Hard",
                shadows: [
                    {
                        offsetX: 8,
                        offsetY: 8,
                        blur: 0,
                        spread: 0,
                        color: "#000000",
                        inset: false,
                    },
                ],
            },
            {
                id: "hard-2",
                name: "Hard wide",
                shadows: [
                    {
                        offsetX: 12,
                        offsetY: 12,
                        blur: 0,
                        spread: 0,
                        color: "#000000",
                        inset: false,
                    },
                ],
            },
            {
                id: "hard-3",
                name: "Offset",
                shadows: [
                    {
                        offsetX: -10,
                        offsetY: 10,
                        blur: 0,
                        spread: 0,
                        color: "#000000",
                        inset: false,
                    },
                ],
            },
            {
                id: "hard-spread",
                name: "Spread",
                shadows: [
                    {
                        offsetX: 8,
                        offsetY: 8,
                        blur: 0,
                        spread: 5,
                        color: "#000000",
                        inset: false,
                    },
                ],
            },
            {
                id: "comic",
                name: "Comic",
                shadows: [
                    {
                        offsetX: 5,
                        offsetY: 5,
                        blur: 0,
                        spread: 2,
                        color: "#000000",
                        inset: false,
                    },
                ],
            },
        ],
    },
    {
        id: "inset",
        name: "Inset",
        presets: [
            {
                id: "inset-soft",
                name: "Inset soft",
                shadows: [
                    {
                        offsetX: 0,
                        offsetY: 4,
                        blur: 12,
                        spread: 0,
                        color: "#00000040",
                        inset: true,
                    },
                ],
            },
            {
                id: "inset-deep",
                name: "Inset deep",
                shadows: [
                    {
                        offsetX: 0,
                        offsetY: 8,
                        blur: 20,
                        spread: -4,
                        color: "#00000070",
                        inset: true,
                    },
                ],
            },
            {
                id: "inset-top",
                name: "Inset top",
                shadows: [
                    {
                        offsetX: 0,
                        offsetY: -8,
                        blur: 15,
                        spread: -4,
                        color: "#00000055",
                        inset: true,
                    },
                ],
            },
            {
                id: "inset-border",
                name: "Inner border",
                shadows: [
                    {
                        offsetX: 0,
                        offsetY: 0,
                        blur: 0,
                        spread: 3,
                        color: "#00000050",
                        inset: true,
                    },
                ],
            },
            {
                id: "inset-glow",
                name: "Inner glow",
                shadows: [
                    {
                        offsetX: 0,
                        offsetY: 0,
                        blur: 25,
                        spread: 4,
                        color: "#7c3aed80",
                        inset: true,
                    },
                ],
            },
        ],
    },
    {
        id: "colored",
        name: "Colored shadows",
        presets: [
            {
                id: "purple",
                name: "Purple",
                shadows: [
                    {
                        offsetX: 0,
                        offsetY: 16,
                        blur: 35,
                        spread: -8,
                        color: "#7c3aed70",
                        inset: false,
                    },
                ],
            },
            {
                id: "pink",
                name: "Pink",
                shadows: [
                    {
                        offsetX: 0,
                        offsetY: 16,
                        blur: 35,
                        spread: -8,
                        color: "#ec489970",
                        inset: false,
                    },
                ],
            },
            {
                id: "blue",
                name: "Blue",
                shadows: [
                    {
                        offsetX: 0,
                        offsetY: 16,
                        blur: 35,
                        spread: -8,
                        color: "#3b82f670",
                        inset: false,
                    },
                ],
            },
            {
                id: "green",
                name: "Green",
                shadows: [
                    {
                        offsetX: 0,
                        offsetY: 16,
                        blur: 35,
                        spread: -8,
                        color: "#22c55e70",
                        inset: false,
                    },
                ],
            },
            {
                id: "red",
                name: "Red",
                shadows: [
                    {
                        offsetX: 0,
                        offsetY: 16,
                        blur: 35,
                        spread: -8,
                        color: "#ef444470",
                        inset: false,
                    },
                ],
            },
            {
                id: "orange",
                name: "Orange",
                shadows: [
                    {
                        offsetX: 0,
                        offsetY: 16,
                        blur: 35,
                        spread: -8,
                        color: "#f9731670",
                        inset: false,
                    },
                ],
            },
        ],
    },
    {
        id: "layered",
        name: "Layered",
        presets: [
            {
                id: "layered-soft",
                name: "Soft layers",
                shadows: [
                    {
                        offsetX: 0,
                        offsetY: 2,
                        blur: 4,
                        spread: 0,
                        color: "#00000018",
                        inset: false,
                    },
                    {
                        offsetX: 0,
                        offsetY: 8,
                        blur: 16,
                        spread: -4,
                        color: "#00000024",
                        inset: false,
                    },
                    {
                        offsetX: 0,
                        offsetY: 20,
                        blur: 40,
                        spread: -12,
                        color: "#00000028",
                        inset: false,
                    },
                ],
            },
            {
                id: "layered-depth",
                name: "Deep layers",
                shadows: [
                    {
                        offsetX: 0,
                        offsetY: 3,
                        blur: 5,
                        spread: -1,
                        color: "#00000030",
                        inset: false,
                    },
                    {
                        offsetX: 0,
                        offsetY: 10,
                        blur: 20,
                        spread: -5,
                        color: "#00000038",
                        inset: false,
                    },
                    {
                        offsetX: 0,
                        offsetY: 30,
                        blur: 50,
                        spread: -15,
                        color: "#00000035",
                        inset: false,
                    },
                ],
            },
            {
                id: "layered-color",
                name: "Color stack",
                shadows: [
                    {
                        offsetX: 6,
                        offsetY: 6,
                        blur: 0,
                        spread: 0,
                        color: "#ec4899",
                        inset: false,
                    },
                    {
                        offsetX: 12,
                        offsetY: 12,
                        blur: 0,
                        spread: 0,
                        color: "#8b5cf6",
                        inset: false,
                    },
                    {
                        offsetX: 18,
                        offsetY: 18,
                        blur: 0,
                        spread: 0,
                        color: "#3b82f6",
                        inset: false,
                    },
                ],
            },
            {
                id: "layered-neon",
                name: "Neon stack",
                shadows: [
                    {
                        offsetX: 0,
                        offsetY: 0,
                        blur: 8,
                        spread: 1,
                        color: "#ec4899",
                        inset: false,
                    },
                    {
                        offsetX: 0,
                        offsetY: 0,
                        blur: 20,
                        spread: 3,
                        color: "#8b5cf680",
                        inset: false,
                    },
                    {
                        offsetX: 0,
                        offsetY: 0,
                        blur: 40,
                        spread: 5,
                        color: "#3b82f650",
                        inset: false,
                    },
                ],
            },
            {
                id: "mixed",
                name: "Outer + inset",
                shadows: [
                    {
                        offsetX: 0,
                        offsetY: 18,
                        blur: 40,
                        spread: -12,
                        color: "#00000055",
                        inset: false,
                    },
                    {
                        offsetX: 0,
                        offsetY: 2,
                        blur: 8,
                        spread: 0,
                        color: "#ffffff80",
                        inset: true,
                    },
                ],
            },
        ],
    },
    {
        id: "neon",
        name: "Glow & neon",
        presets: [
            {
                id: "neon-purple",
                name: "Purple glow",
                shadows: [
                    {
                        offsetX: 0,
                        offsetY: 0,
                        blur: 25,
                        spread: 3,
                        color: "#8b5cf6",
                        inset: false,
                    },
                ],
            },
            {
                id: "neon-pink",
                name: "Pink glow",
                shadows: [
                    {
                        offsetX: 0,
                        offsetY: 0,
                        blur: 25,
                        spread: 3,
                        color: "#ec4899",
                        inset: false,
                    },
                ],
            },
            {
                id: "neon-blue",
                name: "Blue glow",
                shadows: [
                    {
                        offsetX: 0,
                        offsetY: 0,
                        blur: 25,
                        spread: 3,
                        color: "#3b82f6",
                        inset: false,
                    },
                ],
            },
            {
                id: "neon-green",
                name: "Green glow",
                shadows: [
                    {
                        offsetX: 0,
                        offsetY: 0,
                        blur: 25,
                        spread: 3,
                        color: "#22c55e",
                        inset: false,
                    },
                ],
            },
            {
                id: "neon-red",
                name: "Red glow",
                shadows: [
                    {
                        offsetX: 0,
                        offsetY: 0,
                        blur: 25,
                        spread: 3,
                        color: "#ef4444",
                        inset: false,
                    },
                ],
            },
        ],
    },
];

export const boxShadowPresets = boxShadowPresetCategories.flatMap(
    (category) => category.presets,
);
