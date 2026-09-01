export type AnimationDirection =
    | "normal"
    | "reverse"
    | "alternate"
    | "alternate-reverse";

export type AnimationFillMode = "none" | "forwards" | "backwards" | "both";

export type AnimationShape = "square" | "circle" | "text" | "card";
export type AnimationTimingMode = "preset" | "cubic-bezier" | "steps";

export interface AnimationFrame {
    id: string;
    offset: number;
    opacity: number;
    translateX: number;
    translateY: number;
    translateZ: number;
    scale: number;
    scaleX: number;
    scaleY: number;
    rotate: number;
    rotateX: number;
    rotateY: number;
    skewX: number;
    skewY: number;
    borderRadius: number;
    blur: number;
    brightness: number;
    contrast: number;
    saturate: number;
    hueRotate: number;
    grayscale: number;
    backgroundColor: string;
    shadowX: number;
    shadowY: number;
    shadowBlur: number;
    shadowSpread: number;
    shadowColor: string;
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
    timingMode: AnimationTimingMode;
    bezierX1: number;
    bezierY1: number;
    bezierX2: number;
    bezierY2: number;
    stepCount: number;
    stepJump: "jump-start" | "jump-end" | "jump-none" | "jump-both";
    transformOriginX: number;
    transformOriginY: number;
    perspective: number;
    reducedMotion: boolean;
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
    translateZ: 0,
    scale: 1,
    scaleX: 1,
    scaleY: 1,
    rotate: 0,
    rotateX: 0,
    rotateY: 0,
    skewX: 0,
    skewY: 0,
    borderRadius: 12,
    blur: 0,
    brightness: 1,
    contrast: 1,
    saturate: 1,
    hueRotate: 0,
    grayscale: 0,
    backgroundColor: "#8b5cf6",
    shadowX: 0,
    shadowY: 16,
    shadowBlur: 32,
    shadowSpread: -8,
    shadowColor: "#000000",
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
    timingMode: "cubic-bezier",
    bezierX1: 0.22,
    bezierY1: 1,
    bezierX2: 0.36,
    bezierY2: 1,
    stepCount: 5,
    stepJump: "jump-end",
    transformOriginX: 50,
    transformOriginY: 50,
    perspective: 800,
    reducedMotion: true,
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
