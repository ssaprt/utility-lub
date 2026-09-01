export const skeletonCardTypes = ["profile", "article", "product", "list"] as const;
export const skeletonSizes = ["compact", "medium", "large"] as const;
export const skeletonAnimations = ["shimmer", "pulse", "none"] as const;
export const skeletonPresets = [
    "dark", "light", "warm", "mint", "blue", "graphite",
    "rose", "lavender", "ocean", "paper", "contrast", "soft",
] as const;
export type SkeletonCardType = (typeof skeletonCardTypes)[number];
export type SkeletonSize = (typeof skeletonSizes)[number];
export type SkeletonAnimation = (typeof skeletonAnimations)[number];
export type SkeletonPreset = (typeof skeletonPresets)[number];

export interface SkeletonLoaderConfig {
    cardType: SkeletonCardType;
    size: SkeletonSize;
    animation: SkeletonAnimation;
    quantity: number;
    gap: number;
    radius: number;
    speed: number;
    baseColor: string;
    shineColor: string;
    cardColor: string;
    backgroundColor: string;
}

export const createDefaultSkeletonLoaderConfig = (): SkeletonLoaderConfig => ({
    cardType: "article",
    size: "medium",
    animation: "shimmer",
    quantity: 3,
    gap: 12,
    radius: 10,
    speed: 1.4,
    baseColor: "#2a2a32",
    shineColor: "#41414c",
    cardColor: "#1b1b21",
    backgroundColor: "#111116",
});

export const skeletonPresetConfigs: Record<SkeletonPreset, SkeletonLoaderConfig> = {
    dark: createDefaultSkeletonLoaderConfig(),
    light: { ...createDefaultSkeletonLoaderConfig(), baseColor: "#e3e6eb", shineColor: "#f4f5f7", cardColor: "#ffffff", backgroundColor: "#f0f2f5" },
    warm: { ...createDefaultSkeletonLoaderConfig(), baseColor: "#d8cec0", shineColor: "#f2e9dd", cardColor: "#fff9f1", backgroundColor: "#e9dfd2", animation: "pulse" },
    mint: { ...createDefaultSkeletonLoaderConfig(), baseColor: "#21463e", shineColor: "#397567", cardColor: "#15312b", backgroundColor: "#0c211c", cardType: "profile" },
    blue: { ...createDefaultSkeletonLoaderConfig(), baseColor: "#24345e", shineColor: "#3f5b9d", cardColor: "#17213c", backgroundColor: "#0d1428", cardType: "product" },
    graphite: { ...createDefaultSkeletonLoaderConfig(), baseColor: "#303033", shineColor: "#4a4a4f", cardColor: "#202024", backgroundColor: "#131316", animation: "pulse", cardType: "list" },
    rose: { ...createDefaultSkeletonLoaderConfig(), baseColor: "#613047", shineColor: "#9b4e73", cardColor: "#3a1d2b", backgroundColor: "#24121b", cardType: "profile" },
    lavender: { ...createDefaultSkeletonLoaderConfig(), baseColor: "#d6c9eb", shineColor: "#eee8f8", cardColor: "#f8f5fc", backgroundColor: "#e9e2f2", cardType: "article" },
    ocean: { ...createDefaultSkeletonLoaderConfig(), baseColor: "#17475c", shineColor: "#2e718d", cardColor: "#0d2d3b", backgroundColor: "#071923", cardType: "product" },
    paper: { ...createDefaultSkeletonLoaderConfig(), baseColor: "#ded5c7", shineColor: "#f6efe5", cardColor: "#fffaf2", backgroundColor: "#eee5d8", animation: "none", cardType: "article", radius: 4 },
    contrast: { ...createDefaultSkeletonLoaderConfig(), baseColor: "#333333", shineColor: "#ffffff", cardColor: "#111111", backgroundColor: "#000000", cardType: "list", radius: 2, speed: 0.9 },
    soft: { ...createDefaultSkeletonLoaderConfig(), baseColor: "#c8c6dd", shineColor: "#e8e7f3", cardColor: "#f4f3fa", backgroundColor: "#e4e2ef", animation: "pulse", cardType: "profile", radius: 18, speed: 2.2 },
};
