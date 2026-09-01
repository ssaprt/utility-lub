import type {
    AnimationConfig,
    AnimationFrame,
} from "./animation.type";

const normalize = (value: number) => Number(value.toFixed(3));

const numericFrameKeys = [
    "opacity", "translateX", "translateY", "translateZ", "scale", "scaleX",
    "scaleY", "rotate", "rotateX", "rotateY", "skewX", "skewY",
    "borderRadius", "blur", "brightness", "contrast", "saturate",
    "hueRotate", "grayscale", "shadowX", "shadowY", "shadowBlur",
    "shadowSpread",
] as const;

export const animationFrameAtProgress = (
    config: AnimationConfig,
    progress: number,
): AnimationFrame => {
    const frames = [...config.frames].sort((a, b) => a.offset - b.offset);
    const first = frames[0];
    const last = frames[frames.length - 1];

    if (!first || !last) {
        throw new Error("Animation requires at least one keyframe");
    }

    const position = Math.min(100, Math.max(0, progress));
    if (position <= first.offset) return { ...first, offset: position };
    if (position >= last.offset) return { ...last, offset: position };

    const nextIndex = frames.findIndex((frame) => frame.offset >= position);
    const next = frames[nextIndex];
    const previous = frames[Math.max(0, nextIndex - 1)];
    const span = Math.max(0.0001, next.offset - previous.offset);
    const ratio = (position - previous.offset) / span;
    const result: AnimationFrame = {
        ...previous,
        id: "scrubbed-frame",
        offset: position,
        backgroundColor: ratio < 0.5
            ? previous.backgroundColor
            : next.backgroundColor,
        shadowColor: ratio < 0.5 ? previous.shadowColor : next.shadowColor,
    };
    const writable = result as unknown as Record<string, number | string>;

    numericFrameKeys.forEach((key) => {
        writable[key] = previous[key] + (next[key] - previous[key]) * ratio;
    });

    return result;
};

export const animationFrameToStyle = (frame: AnimationFrame) => ({
    opacity: frame.opacity,
    transform: [
        `translate3d(${normalize(frame.translateX)}px, ${normalize(frame.translateY)}px, ${normalize(frame.translateZ)}px)`,
        `scale(${normalize(frame.scale)}) scaleX(${normalize(frame.scaleX)}) scaleY(${normalize(frame.scaleY)})`,
        `rotate(${normalize(frame.rotate)}deg) rotateX(${normalize(frame.rotateX)}deg) rotateY(${normalize(frame.rotateY)}deg)`,
        `skew(${normalize(frame.skewX)}deg, ${normalize(frame.skewY)}deg)`,
    ].join(" "),
    borderRadius: `${normalize(frame.borderRadius)}px`,
    backgroundColor: frame.backgroundColor,
    filter: `blur(${normalize(frame.blur)}px) brightness(${normalize(frame.brightness)}) contrast(${normalize(frame.contrast)}) saturate(${normalize(frame.saturate)}) hue-rotate(${normalize(frame.hueRotate)}deg) grayscale(${normalize(frame.grayscale)})`,
    boxShadow: `${normalize(frame.shadowX)}px ${normalize(frame.shadowY)}px ${normalize(frame.shadowBlur)}px ${normalize(frame.shadowSpread)}px ${frame.shadowColor}`,
});

export const sanitizeAnimationName = (value: string) => {
    const name = value
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9_-]+/g, "-")
        .replace(/^-+|-+$/g, "");

    return name || "utility-motion";
};

export const sanitizeClassName = (value: string) => {
    const name = value
        .trim()
        .replace(/^\./, "")
        .replace(/[^a-zA-Z0-9_-]+/g, "-")
        .replace(/^-+|-+$/g, "");

    return name || "animated-element";
};

const frameToCss = (frame: AnimationFrame) => {
    const style = animationFrameToStyle(frame);

    return [
        `opacity: ${style.opacity};`,
        `transform: ${style.transform};`,
        `border-radius: ${style.borderRadius};`,
        `background-color: ${style.backgroundColor};`,
        `filter: ${style.filter};`,
        `box-shadow: ${style.boxShadow};`,
    ];
};

export const animationKeyframesToCss = (config: AnimationConfig) => {
    const name = sanitizeAnimationName(config.name);
    const frames = [...config.frames].sort((a, b) => a.offset - b.offset);

    const body = frames
        .map((frame) => {
            const declarations = frameToCss(frame)
                .map((line) => `        ${line}`)
                .join("\n");

            return `    ${normalize(frame.offset)}% {\n${declarations}\n    }`;
        })
        .join("\n\n");

    return `@keyframes ${name} {\n${body}\n}`;
};

export const animationConfigToCss = (config: AnimationConfig) => {
    const name = sanitizeAnimationName(config.name);
    const className = sanitizeClassName(config.targetClass);
    const iteration = config.iterationCount;

    const timing = config.timingMode === "steps"
        ? `steps(${config.stepCount}, ${config.stepJump})`
        : config.timingMode === "cubic-bezier"
          ? `cubic-bezier(${config.bezierX1}, ${config.bezierY1}, ${config.bezierX2}, ${config.bezierY2})`
          : config.timingFunction;

    const reduced = config.reducedMotion ? `\n\n@media (prefers-reduced-motion: reduce) {\n    .${className} { animation-duration: 1ms; animation-iteration-count: 1; }\n}` : "";

    return `.${className} {
    transform-origin: ${config.transformOriginX}% ${config.transformOriginY}%;
    transform-style: preserve-3d;
    animation-name: ${name};
    animation-duration: ${normalize(config.duration)}s;
    animation-delay: ${normalize(config.delay)}s;
    animation-iteration-count: ${iteration};
    animation-direction: ${config.direction};
    animation-fill-mode: ${config.fillMode};
    animation-timing-function: ${timing};
}

${animationKeyframesToCss(config)}${reduced}`;
};

export const cloneAnimationConfig = (
    config: AnimationConfig,
): AnimationConfig => ({
    ...config,
    frames: config.frames.map((frame) => ({ ...frame })),
});
