export const buttonBackgroundTypes = ["solid", "gradient"] as const;
export const buttonHoverEffects = ["lift", "scale", "press", "none"] as const;
export const buttonWeights = [400, 500, 600, 700] as const;
const baseButtonPresets = [
    "ink", "aurora", "signal", "paper", "glass", "ocean",
    "rose", "terminal", "clay", "outline", "cobalt", "amber",
] as const;
const additionalButtonPresets = [
    "midnight", "neon", "mint", "coral", "sky", "grape", "noir", "snow", "forest", "cherry",
    "royal", "sunset", "sunrise", "lagoon", "flamingo", "steel", "bronze", "lemon", "electric", "plum",
    "peach", "cyan", "navy", "sand", "moss", "wine", "ice", "lava", "smoke", "pearl",
    "pixel", "brutal", "pill", "soft-blue", "soft-pink", "ghost", "success", "warning", "danger", "info",
] as const;
export const buttonPresets = [...baseButtonPresets, ...additionalButtonPresets] as const;

export type ButtonBackgroundType = (typeof buttonBackgroundTypes)[number];
export type ButtonHoverEffect = (typeof buttonHoverEffects)[number];
export type ButtonPreset = (typeof buttonPresets)[number];

export interface ButtonConfig {
    text: string;
    backgroundType: ButtonBackgroundType;
    backgroundColor: string;
    gradientStart: string;
    gradientEnd: string;
    gradientAngle: number;
    textColor: string;
    fontSize: number;
    fontWeight: number;
    letterSpacing: number;
    radius: number;
    borderWidth: number;
    borderColor: string;
    paddingX: number;
    paddingY: number;
    shadowX: number;
    shadowY: number;
    shadowBlur: number;
    shadowSpread: number;
    shadowColor: string;
    hoverEffect: ButtonHoverEffect;
    hoverColor: string;
    hoverTextColor: string;
    transition: number;
}

export const createDefaultButtonConfig = (): ButtonConfig => ({
    text: "Explore",
    backgroundType: "gradient",
    backgroundColor: "#6d5dfc",
    gradientStart: "#6d5dfc",
    gradientEnd: "#9c6bff",
    gradientAngle: 135,
    textColor: "#ffffff",
    fontSize: 15,
    fontWeight: 600,
    letterSpacing: 0.2,
    radius: 10,
    borderWidth: 0,
    borderColor: "#ffffff",
    paddingX: 22,
    paddingY: 11,
    shadowX: 0,
    shadowY: 8,
    shadowBlur: 22,
    shadowSpread: -8,
    shadowColor: "#6d5dfc",
    hoverEffect: "lift",
    hoverColor: "#5847f5",
    hoverTextColor: "#ffffff",
    transition: 0.24,
});

const buttonPalettes = [
    { primary: "#111827", secondary: "#334155", hover: "#1f2937", text: "#ffffff", border: "#64748b" },
    { primary: "#c026d3", secondary: "#6d28d9", hover: "#a21caf", text: "#ffffff", border: "#e879f9" },
    { primary: "#10b981", secondary: "#34d399", hover: "#059669", text: "#052e24", border: "#6ee7b7" },
    { primary: "#fb7185", secondary: "#f97316", hover: "#e11d48", text: "#ffffff", border: "#fecdd3" },
    { primary: "#0ea5e9", secondary: "#22d3ee", hover: "#0284c7", text: "#ffffff", border: "#7dd3fc" },
    { primary: "#7c3aed", secondary: "#c084fc", hover: "#6d28d9", text: "#ffffff", border: "#d8b4fe" },
    { primary: "#0a0a0a", secondary: "#404040", hover: "#262626", text: "#fafafa", border: "#737373" },
    { primary: "#f8fafc", secondary: "#e2e8f0", hover: "#e2e8f0", text: "#0f172a", border: "#cbd5e1" },
    { primary: "#166534", secondary: "#4d7c0f", hover: "#14532d", text: "#f7fee7", border: "#86efac" },
    { primary: "#be123c", secondary: "#ef4444", hover: "#9f1239", text: "#fff1f2", border: "#fda4af" },
] as const;

type AdditionalButtonPreset = (typeof additionalButtonPresets)[number];

const additionalButtonPresetConfigs = Object.fromEntries(
    additionalButtonPresets.map((name, index) => {
        const palette = buttonPalettes[index % buttonPalettes.length];
        const variant = Math.floor(index / buttonPalettes.length);
        const solid = variant === 1 || variant === 3;
        const outline = name === "ghost";
        const config: ButtonConfig = {
            ...createDefaultButtonConfig(),
            text: name.split("-").map((part) => part[0].toUpperCase() + part.slice(1)).join(" "),
            backgroundType: solid ? "solid" : "gradient",
            backgroundColor: outline ? "transparent" : palette.primary,
            gradientStart: palette.primary,
            gradientEnd: palette.secondary,
            gradientAngle: 105 + (index % 6) * 15,
            textColor: palette.text,
            fontSize: 13 + (index % 4),
            fontWeight: buttonWeights[index % buttonWeights.length],
            letterSpacing: variant === 2 ? 0.9 : index % 3 === 0 ? 0.4 : 0,
            radius: name === "pill" ? 999 : [5, 9, 2, 16][variant] + (index % 3),
            borderWidth: outline || variant === 1 ? 1 : variant === 2 ? 2 : 0,
            borderColor: palette.border,
            paddingX: 18 + (index % 5) * 2,
            paddingY: 9 + (index % 4),
            shadowX: variant === 2 ? 4 : 0,
            shadowY: variant === 2 ? 4 : 6 + (index % 4),
            shadowBlur: variant === 2 ? 0 : 14 + (index % 5) * 3,
            shadowSpread: variant === 2 ? 0 : -7,
            shadowColor: palette.primary,
            hoverEffect: buttonHoverEffects[index % buttonHoverEffects.length],
            hoverColor: outline ? palette.primary : palette.hover,
            hoverTextColor: outline ? palette.text : palette.text,
            transition: 0.16 + (index % 5) * 0.04,
        };
        return [name, config];
    }),
) as Record<AdditionalButtonPreset, ButtonConfig>;

export const buttonPresetConfigs: Record<ButtonPreset, ButtonConfig> = {
    ink: {
        ...createDefaultButtonConfig(),
        backgroundType: "solid",
        backgroundColor: "#171717",
        textColor: "#ffffff",
        hoverColor: "#303030",
        shadowColor: "#000000",
        radius: 7,
    },
    aurora: createDefaultButtonConfig(),
    signal: {
        ...createDefaultButtonConfig(),
        backgroundType: "solid",
        backgroundColor: "#d9ff3f",
        textColor: "#131313",
        hoverColor: "#c8ef27",
        hoverTextColor: "#131313",
        shadowX: 4,
        shadowY: 4,
        shadowBlur: 0,
        shadowSpread: 0,
        shadowColor: "#131313",
        borderWidth: 1,
        borderColor: "#131313",
        radius: 2,
        hoverEffect: "press",
    },
    paper: {
        ...createDefaultButtonConfig(),
        backgroundType: "solid",
        backgroundColor: "#f4efe6",
        textColor: "#2c2925",
        hoverColor: "#e7ded1",
        hoverTextColor: "#2c2925",
        borderWidth: 1,
        borderColor: "#c8bcac",
        shadowColor: "#6b6258",
        shadowY: 5,
        radius: 16,
    },
    glass: {
        ...createDefaultButtonConfig(),
        backgroundType: "gradient",
        gradientStart: "#2f3c60",
        gradientEnd: "#141a2b",
        textColor: "#eaf0ff",
        hoverColor: "#44547d",
        hoverTextColor: "#ffffff",
        borderWidth: 1,
        borderColor: "#7181a8",
        shadowColor: "#05070d",
        radius: 18,
    },
    ocean: {
        ...createDefaultButtonConfig(),
        gradientStart: "#0575e6",
        gradientEnd: "#00c6ff",
        hoverColor: "#0468ce",
        shadowColor: "#0575e6",
        radius: 999,
    },
    rose: {
        ...createDefaultButtonConfig(),
        gradientStart: "#ff4d8d",
        gradientEnd: "#ff8a5c",
        hoverColor: "#ef3e7d",
        shadowColor: "#ff4d8d",
        radius: 12,
    },
    terminal: {
        ...createDefaultButtonConfig(),
        backgroundType: "solid",
        backgroundColor: "#07130d",
        textColor: "#55ff91",
        hoverColor: "#10271a",
        hoverTextColor: "#8affb1",
        borderWidth: 1,
        borderColor: "#37c96d",
        shadowColor: "#37c96d",
        shadowBlur: 14,
        radius: 4,
    },
    clay: {
        ...createDefaultButtonConfig(),
        backgroundType: "solid",
        backgroundColor: "#d38d6d",
        textColor: "#311a12",
        hoverColor: "#e09d7d",
        hoverTextColor: "#311a12",
        shadowColor: "#7a4935",
        shadowY: 7,
        shadowBlur: 0,
        shadowSpread: 0,
        radius: 14,
    },
    outline: {
        ...createDefaultButtonConfig(),
        backgroundType: "solid",
        backgroundColor: "transparent",
        textColor: "#f4f4f5",
        hoverColor: "#f4f4f5",
        hoverTextColor: "#171717",
        borderWidth: 1,
        borderColor: "#f4f4f5",
        shadowBlur: 0,
        shadowY: 0,
        radius: 8,
    },
    cobalt: {
        ...createDefaultButtonConfig(),
        backgroundType: "solid",
        backgroundColor: "#2541d8",
        hoverColor: "#1933c2",
        shadowColor: "#142580",
        radius: 6,
        fontWeight: 700,
    },
    amber: {
        ...createDefaultButtonConfig(),
        gradientStart: "#ffcc33",
        gradientEnd: "#ff8a00",
        textColor: "#291800",
        hoverColor: "#f49a00",
        hoverTextColor: "#291800",
        shadowColor: "#ff8a00",
        radius: 9,
    },
    ...additionalButtonPresetConfigs,
};
