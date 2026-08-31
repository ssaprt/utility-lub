import {
    createAnimationFrame,
    type AnimationConfig,
    type AnimationFrame,
} from "./animation.type";

type FrameValues = Partial<Omit<AnimationFrame, "id" | "offset">>;

type FrameDefinition = [offset: number, values?: FrameValues];

type PresetOptions = Partial<
    Pick<
        AnimationConfig,
        | "duration"
        | "iterationCount"
        | "direction"
        | "fillMode"
        | "timingFunction"
    >
>;

export interface AnimationPreset {
    id: string;
    name: string;
    config: AnimationConfig;
}

export interface AnimationPresetCategory {
    id: string;
    name: string;
    presets: AnimationPreset[];
}

const createPreset = (
    id: string,
    name: string,
    frames: FrameDefinition[],
    options: PresetOptions = {},
): AnimationPreset => ({
    id,
    name,
    config: {
        name: id,
        targetClass: "animated-element",
        duration: options.duration ?? 1,
        delay: 0,
        iterationCount: options.iterationCount ?? 1,
        direction: options.direction ?? "normal",
        fillMode: options.fillMode ?? "both",
        timingFunction:
            options.timingFunction ?? "cubic-bezier(0.22, 1, 0.36, 1)",
        shape: "square",
        previewColor: "#8b5cf6",
        frames: frames.map(([offset, values], index) =>
            createAnimationFrame(`${id}-${index}`, offset, values),
        ),
    },
});

const entrances: AnimationPreset[] = [
    createPreset("fade-in", "Fade in", [
        [0, { opacity: 0 }],
        [100, { opacity: 1 }],
    ], { duration: 0.8 }),
    createPreset("slide-in-up", "Slide in up", [
        [0, { opacity: 0, translateY: 80 }],
        [100, { opacity: 1, translateY: 0 }],
    ]),
    createPreset("slide-in-down", "Slide in down", [
        [0, { opacity: 0, translateY: -80 }],
        [100, { opacity: 1, translateY: 0 }],
    ]),
    createPreset("slide-in-left", "Slide in left", [
        [0, { opacity: 0, translateX: -90 }],
        [100, { opacity: 1, translateX: 0 }],
    ]),
    createPreset("slide-in-right", "Slide in right", [
        [0, { opacity: 0, translateX: 90 }],
        [100, { opacity: 1, translateX: 0 }],
    ]),
    createPreset("zoom-in", "Zoom in", [
        [0, { opacity: 0, scale: 0.35, blur: 5 }],
        [100, { opacity: 1, scale: 1, blur: 0 }],
    ]),
    createPreset("roll-in", "Roll in", [
        [0, { opacity: 0, translateX: -120, rotate: -180 }],
        [100, { opacity: 1, translateX: 0, rotate: 0 }],
    ], { duration: 1.1 }),
    createPreset("blur-in", "Blur in", [
        [0, { opacity: 0, scale: 0.88, blur: 18 }],
        [100, { opacity: 1, scale: 1, blur: 0 }],
    ], { duration: 1.2 }),
];

const attention: AnimationPreset[] = [
    createPreset("pulse", "Pulse", [
        [0, { scale: 1 }],
        [50, { scale: 1.14 }],
        [100, { scale: 1 }],
    ], { duration: 1, iterationCount: "infinite" }),
    createPreset("heartbeat", "Heartbeat", [
        [0, { scale: 1 }],
        [14, { scale: 1.22 }],
        [28, { scale: 1 }],
        [42, { scale: 1.22 }],
        [70, { scale: 1 }],
        [100, { scale: 1 }],
    ], { duration: 1.3, iterationCount: "infinite" }),
    createPreset("shake-x", "Shake X", [
        [0, { translateX: 0 }],
        [20, { translateX: -12 }],
        [40, { translateX: 12 }],
        [60, { translateX: -8 }],
        [80, { translateX: 8 }],
        [100, { translateX: 0 }],
    ], { duration: 0.8, iterationCount: "infinite" }),
    createPreset("shake-y", "Shake Y", [
        [0, { translateY: 0 }],
        [20, { translateY: -12 }],
        [40, { translateY: 12 }],
        [60, { translateY: -8 }],
        [80, { translateY: 8 }],
        [100, { translateY: 0 }],
    ], { duration: 0.8, iterationCount: "infinite" }),
    createPreset("swing", "Swing", [
        [0, { rotate: 0 }],
        [20, { rotate: 15 }],
        [40, { rotate: -10 }],
        [60, { rotate: 5 }],
        [80, { rotate: -5 }],
        [100, { rotate: 0 }],
    ], { duration: 1.1, iterationCount: "infinite" }),
    createPreset("wobble", "Wobble", [
        [0, { translateX: 0, rotate: 0 }],
        [20, { translateX: -25, rotate: -5 }],
        [40, { translateX: 20, rotate: 4 }],
        [60, { translateX: -14, rotate: -3 }],
        [80, { translateX: 8, rotate: 2 }],
        [100, { translateX: 0, rotate: 0 }],
    ], { duration: 1.2, iterationCount: "infinite" }),
    createPreset("tada", "Tada", [
        [0, { scale: 1, rotate: 0 }],
        [10, { scale: 0.9, rotate: -4 }],
        [30, { scale: 1.12, rotate: 4 }],
        [50, { scale: 1.12, rotate: -4 }],
        [70, { scale: 1.12, rotate: 4 }],
        [100, { scale: 1, rotate: 0 }],
    ], { duration: 1.2, iterationCount: "infinite" }),
    createPreset("jello", "Jello", [
        [0, { skewX: 0, skewY: 0 }],
        [22, { skewX: -12, skewY: -12 }],
        [33, { skewX: 7, skewY: 7 }],
        [44, { skewX: -4, skewY: -4 }],
        [66, { skewX: 2, skewY: 2 }],
        [100, { skewX: 0, skewY: 0 }],
    ], { duration: 1.2, iterationCount: "infinite" }),
];

const movement: AnimationPreset[] = [
    createPreset("float", "Float", [
        [0, { translateY: 0 }],
        [50, { translateY: -32 }],
        [100, { translateY: 0 }],
    ], { duration: 2, iterationCount: "infinite" }),
    createPreset("bounce", "Bounce", [
        [0, { translateY: 0 }],
        [42, { translateY: -68, scale: 1.04 }],
        [65, { translateY: 8, scale: 0.97 }],
        [82, { translateY: -12 }],
        [100, { translateY: 0, scale: 1 }],
    ], { duration: 1.25, iterationCount: "infinite" }),
    createPreset("spin", "Spin", [
        [0, { rotate: 0 }],
        [100, { rotate: 360 }],
    ], { duration: 1.5, iterationCount: "infinite", timingFunction: "linear" }),
    createPreset("spin-reverse", "Spin reverse", [
        [0, { rotate: 360 }],
        [100, { rotate: 0 }],
    ], { duration: 1.5, iterationCount: "infinite", timingFunction: "linear" }),
    createPreset("pendulum", "Pendulum", [
        [0, { rotate: -18 }],
        [50, { rotate: 18 }],
        [100, { rotate: -18 }],
    ], { duration: 1.5, iterationCount: "infinite", timingFunction: "ease-in-out" }),
    createPreset("orbit", "Orbit", [
        [0, { translateX: 0, translateY: -32 }],
        [25, { translateX: 32, translateY: 0 }],
        [50, { translateX: 0, translateY: 32 }],
        [75, { translateX: -32, translateY: 0 }],
        [100, { translateX: 0, translateY: -32 }],
    ], { duration: 2.4, iterationCount: "infinite", timingFunction: "linear" }),
    createPreset("zig-zag", "Zig zag", [
        [0, { translateX: -38, translateY: -22 }],
        [25, { translateX: 38, translateY: -8 }],
        [50, { translateX: -38, translateY: 8 }],
        [75, { translateX: 38, translateY: 22 }],
        [100, { translateX: -38, translateY: -22 }],
    ], { duration: 2.2, iterationCount: "infinite", timingFunction: "linear" }),
    createPreset("wave", "Wave", [
        [0, { translateY: 0, rotate: 0 }],
        [25, { translateY: -25, rotate: 8 }],
        [50, { translateY: 0, rotate: 0 }],
        [75, { translateY: 25, rotate: -8 }],
        [100, { translateY: 0, rotate: 0 }],
    ], { duration: 1.8, iterationCount: "infinite" }),
];

const exits: AnimationPreset[] = [
    createPreset("fade-out", "Fade out", [
        [0, { opacity: 1 }],
        [100, { opacity: 0 }],
    ], { duration: 0.8 }),
    createPreset("slide-out-up", "Slide out up", [
        [0, { opacity: 1, translateY: 0 }],
        [100, { opacity: 0, translateY: -90 }],
    ]),
    createPreset("slide-out-down", "Slide out down", [
        [0, { opacity: 1, translateY: 0 }],
        [100, { opacity: 0, translateY: 90 }],
    ]),
    createPreset("slide-out-left", "Slide out left", [
        [0, { opacity: 1, translateX: 0 }],
        [100, { opacity: 0, translateX: -100 }],
    ]),
    createPreset("slide-out-right", "Slide out right", [
        [0, { opacity: 1, translateX: 0 }],
        [100, { opacity: 0, translateX: 100 }],
    ]),
    createPreset("zoom-out", "Zoom out", [
        [0, { opacity: 1, scale: 1 }],
        [100, { opacity: 0, scale: 0.3, blur: 5 }],
    ]),
    createPreset("roll-out", "Roll out", [
        [0, { opacity: 1, translateX: 0, rotate: 0 }],
        [100, { opacity: 0, translateX: 130, rotate: 180 }],
    ], { duration: 1.1 }),
    createPreset("blur-out", "Blur out", [
        [0, { opacity: 1, scale: 1, blur: 0 }],
        [100, { opacity: 0, scale: 1.15, blur: 20 }],
    ], { duration: 1.1 }),
];

export const animationPresetCategories: AnimationPresetCategory[] = [
    {
        id: "entrances",
        name: "Entrances",
        presets: entrances,
    },
    {
        id: "attention",
        name: "Attention seekers",
        presets: attention,
    },
    {
        id: "movement",
        name: "Continuous movement",
        presets: movement,
    },
    {
        id: "exits",
        name: "Exits",
        presets: exits,
    },
];
