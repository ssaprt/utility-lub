export const ribbonStyles = ["corner", "fold", "edge"] as const;
export const ribbonPositions = ["left", "right"] as const;
const baseRibbonPresets = [
    "popular", "new", "pro", "sale", "featured", "hot",
    "beta", "limited", "verified", "free", "exclusive", "update",
] as const;
const additionalRibbonPresets = [
    "gold-corner", "gold-fold", "gold-edge",
    "cyan-corner", "cyan-fold", "cyan-edge",
    "magenta-corner", "magenta-fold", "magenta-edge",
    "forest-corner", "forest-fold", "forest-edge",
    "arctic-corner", "arctic-fold", "arctic-edge",
    "lava-corner", "lava-fold", "lava-edge",
    "royal-corner", "royal-fold", "royal-edge",
    "silver-corner", "silver-fold", "silver-edge",
    "peach-corner", "peach-fold", "peach-edge",
    "lime-corner", "lime-fold", "lime-edge",
    "midnight-corner", "midnight-fold", "midnight-edge",
    "coral-corner", "coral-fold", "coral-edge",
] as const;
export const ribbonPresets = [...baseRibbonPresets, ...additionalRibbonPresets] as const;
export type RibbonStyle = (typeof ribbonStyles)[number];
export type RibbonPosition = (typeof ribbonPositions)[number];
export type RibbonPreset = (typeof ribbonPresets)[number];

export interface RibbonConfig {
    style: RibbonStyle;
    position: RibbonPosition;
    text: string;
    size: number;
    offset: number;
    radius: number;
    primaryColor: string;
    secondaryColor: string;
    textColor: string;
    cardColor: string;
    gradient: boolean;
    shadow: boolean;
}

export const createDefaultRibbonConfig = (): RibbonConfig => ({
    style: "corner",
    position: "right",
    text: "POPULAR",
    size: 30,
    offset: 18,
    radius: 14,
    primaryColor: "#7c5cff",
    secondaryColor: "#b75cff",
    textColor: "#ffffff",
    cardColor: "#1a1a20",
    gradient: true,
    shadow: true,
});

const ribbonPalettes = [
    { primary: "#d4a72c", secondary: "#f7dc7a", text: "#2b1b00", card: "#2a2416" },
    { primary: "#06b6d4", secondary: "#67e8f9", text: "#062a30", card: "#0b2930" },
    { primary: "#db2777", secondary: "#f0abfc", text: "#ffffff", card: "#321027" },
    { primary: "#15803d", secondary: "#4ade80", text: "#effff4", card: "#0d2818" },
    { primary: "#bae6fd", secondary: "#38bdf8", text: "#082f49", card: "#102c3a" },
    { primary: "#dc2626", secondary: "#f97316", text: "#ffffff", card: "#32100b" },
    { primary: "#4338ca", secondary: "#8b5cf6", text: "#ffffff", card: "#17133a" },
    { primary: "#a3a3a3", secondary: "#f5f5f5", text: "#171717", card: "#292929" },
    { primary: "#fb923c", secondary: "#fdba74", text: "#431407", card: "#34180d" },
    { primary: "#84cc16", secondary: "#d9f99d", text: "#1a2e05", card: "#1d2b0c" },
    { primary: "#111827", secondary: "#475569", text: "#f8fafc", card: "#0b1020" },
    { primary: "#fb7185", secondary: "#fda4af", text: "#4c0519", card: "#32111a" },
] as const;

type AdditionalRibbonPreset = (typeof additionalRibbonPresets)[number];

const additionalRibbonPresetConfigs = Object.fromEntries(
    additionalRibbonPresets.map((name, index) => {
        const family = Math.floor(index / ribbonStyles.length);
        const palette = ribbonPalettes[family];
        const style = ribbonStyles[index % ribbonStyles.length];
        const label = name.split("-")[0].toUpperCase();
        const config: RibbonConfig = {
            ...createDefaultRibbonConfig(),
            style,
            position: (family + index) % 2 === 0 ? "left" : "right",
            text: label,
            size: 26 + (family % 5) * 2,
            offset: 12 + (family % 4) * 4,
            radius: [4, 8, 12, 18][family % 4],
            primaryColor: palette.primary,
            secondaryColor: palette.secondary,
            textColor: palette.text,
            cardColor: palette.card,
            gradient: family % 4 !== 3,
            shadow: family % 5 !== 4,
        };
        return [name, config];
    }),
) as Record<AdditionalRibbonPreset, RibbonConfig>;

export const ribbonPresetConfigs: Record<RibbonPreset, RibbonConfig> = {
    popular: createDefaultRibbonConfig(),
    new: { ...createDefaultRibbonConfig(), style: "fold", position: "left", text: "NEW", primaryColor: "#36d7a5", secondaryColor: "#167c62", textColor: "#06271d" },
    pro: { ...createDefaultRibbonConfig(), style: "edge", text: "PRO", primaryColor: "#d9ff3f", secondaryColor: "#95b400", textColor: "#171717", radius: 4 },
    sale: { ...createDefaultRibbonConfig(), text: "-30%", primaryColor: "#ff4d64", secondaryColor: "#ff9f43", cardColor: "#291317", size: 34 },
    featured: { ...createDefaultRibbonConfig(), style: "fold", position: "right", text: "FEATURED", primaryColor: "#3157e8", secondaryColor: "#18318f", cardColor: "#10172e" },
    hot: { ...createDefaultRibbonConfig(), text: "HOT", primaryColor: "#ff3b30", secondaryColor: "#ff9500", cardColor: "#2b0e0b", size: 32 },
    beta: { ...createDefaultRibbonConfig(), style: "edge", position: "left", text: "BETA", primaryColor: "#8c52ff", secondaryColor: "#5c2ac4", cardColor: "#171025", radius: 8 },
    limited: { ...createDefaultRibbonConfig(), style: "fold", position: "left", text: "LIMITED", primaryColor: "#d5aa4e", secondaryColor: "#745516", textColor: "#251b08", cardColor: "#241f14" },
    verified: { ...createDefaultRibbonConfig(), style: "edge", text: "VERIFIED", primaryColor: "#28c782", secondaryColor: "#137a4d", textColor: "#052619", cardColor: "#0b241a" },
    free: { ...createDefaultRibbonConfig(), style: "corner", position: "left", text: "FREE", primaryColor: "#36d7a5", secondaryColor: "#38bdf8", textColor: "#05251c", cardColor: "#0b2520", size: 28 },
    exclusive: { ...createDefaultRibbonConfig(), style: "fold", text: "EXCLUSIVE", primaryColor: "#171717", secondaryColor: "#555555", textColor: "#f2d58b", cardColor: "#23201a", shadow: false },
    update: { ...createDefaultRibbonConfig(), style: "edge", position: "left", text: "UPDATE", primaryColor: "#ff7bd5", secondaryColor: "#8d62ff", cardColor: "#2b1731", radius: 18 },
    ...additionalRibbonPresetConfigs,
};
