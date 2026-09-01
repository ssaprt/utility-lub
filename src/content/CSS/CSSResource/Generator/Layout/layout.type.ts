export const layoutPreviewModes = ["desktop", "mobile"] as const;
export const layoutPresets = [
    "dashboard", "editorial", "store", "studio", "docs", "admin",
    "news", "portfolio", "saas", "forum", "shop-dark", "compact",
] as const;
export type LayoutPreviewMode = (typeof layoutPreviewModes)[number];
export type LayoutPreset = (typeof layoutPresets)[number];

export interface LayoutConfig {
    includeHeader: boolean;
    includeFooter: boolean;
    includeLeft: boolean;
    includeRight: boolean;
    headerHeight: number;
    footerHeight: number;
    leftWidth: number;
    rightWidth: number;
    gap: number;
    padding: number;
    breakpoint: number;
    previewMode: LayoutPreviewMode;
    pageColor: string;
    headerColor: string;
    mainColor: string;
    leftColor: string;
    rightColor: string;
    footerColor: string;
    textColor: string;
}

export const createDefaultLayoutConfig = (): LayoutConfig => ({
    includeHeader: true,
    includeFooter: true,
    includeLeft: true,
    includeRight: true,
    headerHeight: 72,
    footerHeight: 64,
    leftWidth: 210,
    rightWidth: 180,
    gap: 10,
    padding: 10,
    breakpoint: 760,
    previewMode: "desktop",
    pageColor: "#101014",
    headerColor: "#26262d",
    mainColor: "#1b1b21",
    leftColor: "#22222a",
    rightColor: "#22222a",
    footerColor: "#26262d",
    textColor: "#f4f4f5",
});

export const layoutPresetConfigs: Record<LayoutPreset, LayoutConfig> = {
    dashboard: createDefaultLayoutConfig(),
    editorial: { ...createDefaultLayoutConfig(), includeRight: false, leftWidth: 160, gap: 16, padding: 16, pageColor: "#e9e2d7", headerColor: "#292725", mainColor: "#f7f2ea", leftColor: "#d9cebf", footerColor: "#292725", textColor: "#111111" },
    store: { ...createDefaultLayoutConfig(), includeLeft: false, rightWidth: 240, headerHeight: 88, pageColor: "#f0f2f5", headerColor: "#111827", mainColor: "#ffffff", rightColor: "#dfe6ef", footerColor: "#111827", textColor: "#111827" },
    studio: { ...createDefaultLayoutConfig(), includeRight: false, leftWidth: 250, gap: 6, pageColor: "#0a0a0a", headerColor: "#171717", mainColor: "#111111", leftColor: "#1d1d1d", footerColor: "#171717", textColor: "#f5f5f5" },
    docs: { ...createDefaultLayoutConfig(), includeFooter: false, includeRight: false, leftWidth: 230, headerHeight: 58, gap: 1, padding: 0, pageColor: "#d4d4d8", headerColor: "#ffffff", mainColor: "#ffffff", leftColor: "#f4f4f5", textColor: "#18181b" },
    admin: { ...createDefaultLayoutConfig(), includeFooter: false, leftWidth: 260, rightWidth: 220, headerHeight: 64, gap: 12, pageColor: "#111827", headerColor: "#1f2937", mainColor: "#172033", leftColor: "#111827", rightColor: "#202a40", textColor: "#e5e7eb" },
    news: { ...createDefaultLayoutConfig(), leftWidth: 180, rightWidth: 260, headerHeight: 96, footerHeight: 90, gap: 14, pageColor: "#ece8df", headerColor: "#8f1d24", mainColor: "#fffdf8", leftColor: "#ded5c6", rightColor: "#e5ddd0", footerColor: "#271d1d", textColor: "#231f1a" },
    portfolio: { ...createDefaultLayoutConfig(), includeLeft: false, includeRight: false, headerHeight: 92, footerHeight: 54, gap: 0, padding: 0, pageColor: "#0d0d0f", headerColor: "#151519", mainColor: "#101014", footerColor: "#151519", textColor: "#f7f7f8" },
    saas: { ...createDefaultLayoutConfig(), includeLeft: false, rightWidth: 220, headerHeight: 68, gap: 16, padding: 16, pageColor: "#edf2ff", headerColor: "#3157e8", mainColor: "#ffffff", rightColor: "#dae3ff", footerColor: "#17214a", textColor: "#17214a" },
    forum: { ...createDefaultLayoutConfig(), includeRight: false, leftWidth: 190, headerHeight: 60, footerHeight: 50, gap: 8, pageColor: "#1d2025", headerColor: "#292d34", mainColor: "#24282e", leftColor: "#20242a", footerColor: "#292d34", textColor: "#e8eaed" },
    "shop-dark": { ...createDefaultLayoutConfig(), includeLeft: false, rightWidth: 280, headerHeight: 80, gap: 12, pageColor: "#09090b", headerColor: "#18181b", mainColor: "#111114", rightColor: "#1c1c22", footerColor: "#18181b", textColor: "#fafafa" },
    compact: { ...createDefaultLayoutConfig(), headerHeight: 48, footerHeight: 42, leftWidth: 140, rightWidth: 140, gap: 4, padding: 4, breakpoint: 640, pageColor: "#18181b", headerColor: "#27272a", mainColor: "#202024", leftColor: "#242429", rightColor: "#242429", footerColor: "#27272a", textColor: "#f4f4f5" },
};
