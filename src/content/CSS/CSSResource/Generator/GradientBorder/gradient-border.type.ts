export const gradientBorderTypes = ["linear", "conic", "radial"] as const;
export const gradientBorderPresets = [
    "spectrum", "ember", "ice", "mono", "aurora", "neon",
    "candy", "ocean", "sunset", "chrome", "forest", "ultraviolet",
] as const;

export type GradientBorderType = (typeof gradientBorderTypes)[number];
export type GradientBorderPreset = (typeof gradientBorderPresets)[number];

export interface GradientBorderConfig {
    type: GradientBorderType;
    angle: number;
    positionX: number;
    positionY: number;
    borderWidth: number;
    radius: number;
    width: number;
    height: number;
    backgroundColor: string;
    textColor: string;
    colorA: string;
    colorB: string;
    colorC: string;
    stopA: number;
    stopB: number;
    stopC: number;
    glow: boolean;
    glowBlur: number;
}

export const createDefaultGradientBorderConfig = (): GradientBorderConfig => ({
    type: "linear",
    angle: 135,
    positionX: 50,
    positionY: 50,
    borderWidth: 3,
    radius: 18,
    width: 300,
    height: 180,
    backgroundColor: "#111116",
    textColor: "#f4f4f5",
    colorA: "#6d5dfc",
    colorB: "#e84aa9",
    colorC: "#46d7c5",
    stopA: 0,
    stopB: 52,
    stopC: 100,
    glow: true,
    glowBlur: 28,
});

export const gradientBorderPresetConfigs: Record<GradientBorderPreset, GradientBorderConfig> = {
    spectrum: createDefaultGradientBorderConfig(),
    ember: { ...createDefaultGradientBorderConfig(), type: "conic", colorA: "#ffcf5c", colorB: "#ff5f45", colorC: "#7f1d1d", backgroundColor: "#1b1010", radius: 10 },
    ice: { ...createDefaultGradientBorderConfig(), type: "radial", colorA: "#e0fbff", colorB: "#4bd4ff", colorC: "#2757ff", backgroundColor: "#081525", positionX: 18, positionY: 10 },
    mono: { ...createDefaultGradientBorderConfig(), colorA: "#ffffff", colorB: "#767676", colorC: "#191919", backgroundColor: "#111111", glow: false, borderWidth: 1, radius: 3 },
    aurora: { ...createDefaultGradientBorderConfig(), type: "conic", colorA: "#35f2b6", colorB: "#6477ff", colorC: "#d557ff", backgroundColor: "#0b1020", angle: 35 },
    neon: { ...createDefaultGradientBorderConfig(), colorA: "#b8ff36", colorB: "#00f0ff", colorC: "#8c52ff", backgroundColor: "#08080b", glowBlur: 45, borderWidth: 4, radius: 8 },
    candy: { ...createDefaultGradientBorderConfig(), colorA: "#ff8fd8", colorB: "#ffcf70", colorC: "#8fdcff", backgroundColor: "#2a1526", radius: 28 },
    ocean: { ...createDefaultGradientBorderConfig(), type: "radial", colorA: "#d7fbff", colorB: "#25bce8", colorC: "#1649c4", backgroundColor: "#07182a", positionX: 12, positionY: 8 },
    sunset: { ...createDefaultGradientBorderConfig(), colorA: "#ffcc70", colorB: "#ff5964", colorC: "#6f2dbd", backgroundColor: "#1c0d19", angle: 115 },
    chrome: { ...createDefaultGradientBorderConfig(), type: "conic", colorA: "#f8fafc", colorB: "#64748b", colorC: "#ffffff", backgroundColor: "#111318", glow: false, borderWidth: 2, radius: 2 },
    forest: { ...createDefaultGradientBorderConfig(), colorA: "#d7ff87", colorB: "#34a853", colorC: "#123d2a", backgroundColor: "#071a11", angle: 160, glowBlur: 18 },
    ultraviolet: { ...createDefaultGradientBorderConfig(), type: "conic", colorA: "#ff4fd8", colorB: "#6c4cff", colorC: "#2de2e6", backgroundColor: "#10071d", angle: 220, borderWidth: 6, glowBlur: 52 },
};
