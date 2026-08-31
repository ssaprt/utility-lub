import type {
    AnimationConfig,
    AnimationFrame,
} from "./animation.type";

const normalize = (value: number) => Number(value.toFixed(3));

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
    const transform = [
        `translate(${normalize(frame.translateX)}px, ${normalize(frame.translateY)}px)`,
        `scale(${normalize(frame.scale)})`,
        `rotate(${normalize(frame.rotate)}deg)`,
        `skew(${normalize(frame.skewX)}deg, ${normalize(frame.skewY)}deg)`,
    ].join(" ");

    return [
        `opacity: ${normalize(frame.opacity)};`,
        `transform: ${transform};`,
        `border-radius: ${normalize(frame.borderRadius)}px;`,
        `filter: blur(${normalize(frame.blur)}px);`,
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

    return `.${className} {
    background-color: ${config.previewColor};
    animation-name: ${name};
    animation-duration: ${normalize(config.duration)}s;
    animation-delay: ${normalize(config.delay)}s;
    animation-iteration-count: ${iteration};
    animation-direction: ${config.direction};
    animation-fill-mode: ${config.fillMode};
    animation-timing-function: ${config.timingFunction};
}

${animationKeyframesToCss(config)}`;
};

export const cloneAnimationConfig = (
    config: AnimationConfig,
): AnimationConfig => ({
    ...config,
    frames: config.frames.map((frame) => ({ ...frame })),
});
