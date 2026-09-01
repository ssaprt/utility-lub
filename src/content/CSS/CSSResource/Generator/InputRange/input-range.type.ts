export const rangeThumbShapes = ["circle", "square", "diamond"] as const;
const baseInputRangePresets = [
    "violet", "lime", "minimal", "soft", "ocean", "orange",
    "terminal", "candy", "glass", "cobalt", "red", "contrast",
] as const;
const additionalInputRangePresets = [
    "midnight", "emerald", "sunset", "arctic", "ruby", "gold", "slate", "pink", "indigo", "teal",
    "micro", "bold", "rounded", "sharp", "outlined", "flat", "raised", "compact", "wide", "thin",
    "square-blue", "diamond-red", "circle-mint", "square-amber", "diamond-violet", "circle-coral", "square-mono", "diamond-cyan", "circle-lime", "square-rose",
    "dark-ocean", "light-paper", "warm-sand", "forest-night", "berry", "ice-blue", "lava", "graphite", "cream", "ultraviolet",
] as const;
export const inputRangePresets = [...baseInputRangePresets, ...additionalInputRangePresets] as const;
export type RangeThumbShape = (typeof rangeThumbShapes)[number];
export type InputRangePreset = (typeof inputRangePresets)[number];

export interface InputRangeConfig {
    value: number;
    width: number;
    thumbShape: RangeThumbShape;
    thumbSize: number;
    thumbRadius: number;
    thumbColor: string;
    thumbBorderColor: string;
    thumbBorderWidth: number;
    thumbShadowBlur: number;
    trackHeight: number;
    trackRadius: number;
    trackColor: string;
    trackBorderColor: string;
    trackBorderWidth: number;
    fill: boolean;
    fillColor: string;
    surfaceColor: string;
}

export const createDefaultInputRangeConfig = (): InputRangeConfig => ({
    value: 64,
    width: 320,
    thumbShape: "circle",
    thumbSize: 22,
    thumbRadius: 50,
    thumbColor: "#7c5cff",
    thumbBorderColor: "#ffffff",
    thumbBorderWidth: 2,
    thumbShadowBlur: 10,
    trackHeight: 7,
    trackRadius: 10,
    trackColor: "#34343c",
    trackBorderColor: "#52525b",
    trackBorderWidth: 0,
    fill: true,
    fillColor: "#7c5cff",
    surfaceColor: "#15151a",
});

const inputRangePalettes = [
    { thumb: "#818cf8", border: "#c7d2fe", fill: "#6366f1", track: "#312e81", surface: "#11112b" },
    { thumb: "#34d399", border: "#a7f3d0", fill: "#10b981", track: "#164e3d", surface: "#071d17" },
    { thumb: "#fb7185", border: "#fecdd3", fill: "#f97316", track: "#7c2d12", surface: "#2b1009" },
    { thumb: "#e0f2fe", border: "#7dd3fc", fill: "#38bdf8", track: "#164e63", surface: "#082f49" },
    { thumb: "#f43f5e", border: "#fecdd3", fill: "#e11d48", track: "#881337", surface: "#280811" },
    { thumb: "#facc15", border: "#fef08a", fill: "#eab308", track: "#713f12", surface: "#271603" },
    { thumb: "#e2e8f0", border: "#94a3b8", fill: "#64748b", track: "#334155", surface: "#0f172a" },
    { thumb: "#f9a8d4", border: "#fce7f3", fill: "#ec4899", track: "#831843", surface: "#2b0b1e" },
    { thumb: "#a5b4fc", border: "#e0e7ff", fill: "#4f46e5", track: "#312e81", surface: "#16143b" },
    { thumb: "#5eead4", border: "#ccfbf1", fill: "#14b8a6", track: "#134e4a", surface: "#062c2a" },
] as const;

type AdditionalInputRangePreset = (typeof additionalInputRangePresets)[number];

const additionalInputRangePresetConfigs = Object.fromEntries(
    additionalInputRangePresets.map((name, index) => {
        const palette = inputRangePalettes[index % inputRangePalettes.length];
        const variant = Math.floor(index / inputRangePalettes.length);
        const shape = rangeThumbShapes[(index + variant) % rangeThumbShapes.length];
        const config: InputRangeConfig = {
            ...createDefaultInputRangeConfig(),
            value: 28 + (index * 11) % 65,
            width: 260 + (index % 5) * 30,
            thumbShape: shape,
            thumbSize: [18, 28, 22, 15][variant] + (index % 3),
            thumbRadius: shape === "circle" ? 50 : shape === "diamond" ? 3 : [2, 7, 4, 0][variant],
            thumbColor: palette.thumb,
            thumbBorderColor: palette.border,
            thumbBorderWidth: variant === 1 ? 3 : variant === 3 ? 0 : 1,
            thumbShadowBlur: variant === 0 ? 14 : variant === 1 ? 20 : variant === 2 ? 6 : 0,
            trackHeight: [5, 12, 8, 2][variant] + (index % 2),
            trackRadius: variant === 3 ? 0 : variant === 2 ? 4 : 999,
            trackColor: palette.track,
            trackBorderColor: palette.border,
            trackBorderWidth: variant === 2 ? 1 : 0,
            fill: index % 7 !== 0,
            fillColor: palette.fill,
            surfaceColor: palette.surface,
        };
        return [name, config];
    }),
) as Record<AdditionalInputRangePreset, InputRangeConfig>;

export const inputRangePresetConfigs: Record<InputRangePreset, InputRangeConfig> = {
    violet: createDefaultInputRangeConfig(),
    lime: { ...createDefaultInputRangeConfig(), thumbShape: "square", thumbRadius: 4, thumbColor: "#d9ff3f", thumbBorderColor: "#111111", fillColor: "#d9ff3f", trackColor: "#263016", surfaceColor: "#12150d" },
    minimal: { ...createDefaultInputRangeConfig(), thumbSize: 16, thumbColor: "#f4f4f5", thumbBorderWidth: 0, thumbShadowBlur: 0, trackHeight: 2, trackColor: "#57575f", fillColor: "#f4f4f5", surfaceColor: "#111111" },
    soft: { ...createDefaultInputRangeConfig(), thumbSize: 28, thumbColor: "#f6c4e1", thumbBorderColor: "#ffeaf6", fillColor: "#e78dbd", trackColor: "#523a49", trackHeight: 10, surfaceColor: "#271d24", thumbShadowBlur: 18 },
    ocean: { ...createDefaultInputRangeConfig(), thumbColor: "#6ee7ff", thumbBorderColor: "#d9faff", fillColor: "#23b9ea", trackColor: "#17475c", surfaceColor: "#071923", trackHeight: 6 },
    orange: { ...createDefaultInputRangeConfig(), thumbShape: "diamond", thumbRadius: 3, thumbColor: "#ff9c40", thumbBorderColor: "#ffe0b8", fillColor: "#ff7a18", trackColor: "#56321a", surfaceColor: "#241309" },
    terminal: { ...createDefaultInputRangeConfig(), thumbShape: "square", thumbRadius: 1, thumbColor: "#4dff82", thumbBorderColor: "#08200f", fillColor: "#4dff82", trackColor: "#174024", surfaceColor: "#030b06", thumbShadowBlur: 4 },
    candy: { ...createDefaultInputRangeConfig(), thumbSize: 26, thumbColor: "#ff8edb", thumbBorderColor: "#fff0fa", fillColor: "#cf75ff", trackColor: "#583a6b", surfaceColor: "#25182e", trackHeight: 12 },
    glass: { ...createDefaultInputRangeConfig(), thumbColor: "#e9f0ff", thumbBorderColor: "#91a5cf", fillColor: "#8ba7df", trackColor: "#34415b", surfaceColor: "#172033", thumbShadowBlur: 20, trackHeight: 5 },
    cobalt: { ...createDefaultInputRangeConfig(), thumbShape: "square", thumbRadius: 6, thumbColor: "#3157e8", thumbBorderColor: "#b7c4ff", fillColor: "#3157e8", trackColor: "#29345d", surfaceColor: "#11162a" },
    red: { ...createDefaultInputRangeConfig(), thumbColor: "#ff4757", thumbBorderColor: "#ffd4d8", fillColor: "#ff4757", trackColor: "#5d242b", surfaceColor: "#260d11", trackHeight: 4 },
    contrast: { ...createDefaultInputRangeConfig(), thumbShape: "square", thumbRadius: 0, thumbColor: "#ffffff", thumbBorderColor: "#000000", fillColor: "#ffffff", trackColor: "#4a4a4a", surfaceColor: "#000000", thumbShadowBlur: 0, trackRadius: 0 },
    ...additionalInputRangePresetConfigs,
};
