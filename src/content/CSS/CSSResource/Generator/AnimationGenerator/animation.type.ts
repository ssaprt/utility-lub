export type AnimationDirection =
    | "normal"
    | "reverse"
    | "alternate"
    | "alternate-reverse";

export type AnimationFillMode = "none" | "forwards" | "backwards" | "both";

export type AnimationShape = "square" | "circle" | "text" | "card";

export interface AnimationFrame {
    id: string;
    offset: number;
    opacity: number;
    translateX: number;
    translateY: number;
    scale: number;
    rotate: number;
    skewX: number;
    skewY: number;
    borderRadius: number;
    blur: number;
}

export interface AnimationConfig {
    name: string;
    targetClass: string;
    duration: number;
    delay: number;
    iterationCount: number | "infinite";
    direction: AnimationDirection;
    fillMode: AnimationFillMode;
    timingFunction: string;
    shape: AnimationShape;
    previewColor: string;
    frames: AnimationFrame[];
}

export const createAnimationFrame = (
    id: string,
    offset: number,
    values: Partial<Omit<AnimationFrame, "id" | "offset">> = {},
): AnimationFrame => ({
    id,
    offset,
    opacity: 1,
    translateX: 0,
    translateY: 0,
    scale: 1,
    rotate: 0,
    skewX: 0,
    skewY: 0,
    borderRadius: 12,
    blur: 0,
    ...values,
});

export const defaultAnimationConfig: AnimationConfig = {
    name: "utility-motion",
    targetClass: "animated-element",
    duration: 1.2,
    delay: 0,
    iterationCount: "infinite",
    direction: "alternate",
    fillMode: "both",
    timingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
    shape: "square",
    previewColor: "#8b5cf6",
    frames: [
        createAnimationFrame("start", 0, {
            opacity: 0.25,
            translateY: 38,
            scale: 0.72,
            rotate: -12,
            borderRadius: 28,
            blur: 3,
        }),
        createAnimationFrame("end", 100),
    ],
};

export const animationDirections: AnimationDirection[] = [
    "normal",
    "reverse",
    "alternate",
    "alternate-reverse",
];

export const animationFillModes: AnimationFillMode[] = [
    "none",
    "forwards",
    "backwards",
    "both",
];

export const animationShapes: AnimationShape[] = [
    "square",
    "circle",
    "text",
    "card",
];
