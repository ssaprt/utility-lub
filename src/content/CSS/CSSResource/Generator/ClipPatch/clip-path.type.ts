export interface ClipPathPoint {
    id: string;
    x: number;
    y: number;
}

export interface ClipPathPresetPoint {
    x: number;
    y: number;
}

export interface ClipPathConfig {
    mode: "preset" | "custom";
    presetId: string | null;
    points: ClipPathPoint[];
}

export const defaultClipPathConfig: ClipPathConfig = {
    mode: "custom",
    presetId: null,
    points: [
        {
            id: "custom-0",
            x: 10,
            y: 10,
        },
        {
            id: "custom-1",
            x: 90,
            y: 10,
        },
        {
            id: "custom-2",
            x: 90,
            y: 90,
        },
        {
            id: "custom-3",
            x: 10,
            y: 90,
        },
    ],
};
