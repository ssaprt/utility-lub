export const glitchEffects = ["chromatic", "signal", "fragment"] as const;
export const glitchMotions = ["burst", "stutter", "drift", "scanner"] as const;
export const glitchPresets = [
    "cyber", "mono", "acid", "broadcast", "amber", "ice",
    "ghost", "terminal", "redline", "vapor", "oxide", "digital",
] as const;

export type GlitchEffect = (typeof glitchEffects)[number];
export type GlitchMotion = (typeof glitchMotions)[number];
export type GlitchPreset = (typeof glitchPresets)[number];

export interface GlitchTextConfig {
    text: string;
    effect: GlitchEffect;
    motion: GlitchMotion;
    fontSize: number;
    fontWeight: number;
    letterSpacing: number;
    backgroundColor: string;
    textColor: string;
    accentA: string;
    accentB: string;
    intensity: number;
    slice: number;
    skew: number;
    duration: number;
}

export const createDefaultGlitchTextConfig = (): GlitchTextConfig => ({
    text: "UTILITY LAB",
    effect: "chromatic",
    motion: "burst",
    fontSize: 56,
    fontWeight: 800,
    letterSpacing: 3,
    backgroundColor: "#0b0b0f",
    textColor: "#f4f4f5",
    accentA: "#00e5ff",
    accentB: "#ff2e93",
    intensity: 5,
    slice: 22,
    skew: 3,
    duration: 1.8,
});

export const glitchPresetConfigs: Record<GlitchPreset, GlitchTextConfig> = {
    cyber: createDefaultGlitchTextConfig(),
    mono: {
        ...createDefaultGlitchTextConfig(),
        effect: "signal",
        motion: "stutter",
        backgroundColor: "#f4f1e8",
        textColor: "#191919",
        accentA: "#191919",
        accentB: "#191919",
        intensity: 3,
        skew: 1,
    },
    acid: {
        ...createDefaultGlitchTextConfig(),
        effect: "fragment",
        motion: "burst",
        backgroundColor: "#170021",
        textColor: "#f5ff3b",
        accentA: "#69ff97",
        accentB: "#a56bff",
        intensity: 8,
        slice: 32,
        duration: 1.2,
    },
    broadcast: {
        ...createDefaultGlitchTextConfig(),
        effect: "signal",
        motion: "scanner",
        backgroundColor: "#071b25",
        textColor: "#d7f6ff",
        accentA: "#9fdaee",
        accentB: "#d7f6ff",
        intensity: 2,
        slice: 15,
        skew: 6,
        duration: 2.4,
    },
    amber: {
        ...createDefaultGlitchTextConfig(), effect: "fragment", motion: "stutter",
        backgroundColor: "#1d1204", textColor: "#ffd36a",
        accentA: "#ff8a00", accentB: "#fff0aa", intensity: 7,
    },
    ice: {
        ...createDefaultGlitchTextConfig(), motion: "drift", backgroundColor: "#06131d",
        textColor: "#e4f8ff", accentA: "#6ee7ff", accentB: "#456cff",
        intensity: 4, slice: 18, duration: 2.1,
    },
    ghost: {
        ...createDefaultGlitchTextConfig(), effect: "signal", motion: "drift",
        backgroundColor: "#151515", textColor: "#d8d8d8",
        accentA: "#ffffff", accentB: "#7a7a7a", intensity: 2,
        skew: 8, duration: 2.8,
    },
    terminal: {
        ...createDefaultGlitchTextConfig(), effect: "signal", motion: "burst",
        backgroundColor: "#030b06", textColor: "#4dff82",
        accentA: "#4dff82", accentB: "#b3ffc9", intensity: 3,
        letterSpacing: 1, fontWeight: 600,
    },
    redline: {
        ...createDefaultGlitchTextConfig(), motion: "stutter", backgroundColor: "#0f0506",
        textColor: "#fff1f1", accentA: "#ff2e3f", accentB: "#9b0713",
        intensity: 9, slice: 35, duration: 1,
    },
    vapor: {
        ...createDefaultGlitchTextConfig(), motion: "scanner", backgroundColor: "#1d0d2b",
        textColor: "#f8d9ff", accentA: "#58f5ff", accentB: "#ff62d4",
        intensity: 6, skew: 9, letterSpacing: 5,
    },
    oxide: {
        ...createDefaultGlitchTextConfig(), effect: "fragment", motion: "drift",
        backgroundColor: "#19110f", textColor: "#e7c9b6",
        accentA: "#c75b39", accentB: "#6f8f73", slice: 28,
        intensity: 5, duration: 2.3,
    },
    digital: {
        ...createDefaultGlitchTextConfig(), effect: "fragment", motion: "scanner",
        backgroundColor: "#050815", textColor: "#dbe3ff",
        accentA: "#4675ff", accentB: "#7cffea", intensity: 11,
        slice: 40, skew: 0, duration: 0.8,
    },
};
