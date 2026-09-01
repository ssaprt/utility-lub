import type { GlitchTextConfig } from "./glitch-text.type";

const layerFrames = (config: GlitchTextConfig, direction: 1 | -1) => {
    const x = config.intensity * direction;
    const half = Math.max(1, config.intensity / 2) * direction;
    const skew = config.skew * direction;

    if (config.motion === "stutter") return `
    0%, 6%, 14%, 22%, 70%, 100% { transform: translate(0) skew(0); opacity: 0; }
    7% { transform: translate(${x}px, -2px) skew(${skew}deg); opacity: .95; }
    9% { transform: translate(${-x}px, 1px) skew(${-skew}deg); opacity: .45; }
    15% { transform: translate(${half}px, 2px) scaleX(1.025); opacity: .8; }
    18% { transform: translate(${-half}px, -1px); opacity: .25; }
    23% { transform: translate(${x}px, 0) scaleY(.92); opacity: .75; }
    27% { transform: translate(0); opacity: 0; }`;

    if (config.motion === "drift") return `
    0%, 100% { transform: translate(${-half}px, -1px) skew(${-skew / 2}deg); opacity: .18; }
    25% { transform: translate(${half}px, 1px) skew(${skew / 2}deg); opacity: .5; }
    50% { transform: translate(${x}px, -2px) scaleX(1.018); opacity: .72; }
    75% { transform: translate(${-x}px, 2px) skew(${-skew}deg); opacity: .38; }`;

    if (config.motion === "scanner") return `
    0% { clip-path: inset(0 0 88% 0); transform: translate(${half}px, -2px); opacity: 0; }
    12% { clip-path: inset(8% 0 78% 0); transform: translate(${x}px, 0); opacity: .9; }
    36% { clip-path: inset(34% 0 54% 0); transform: translate(${-half}px, 1px) skew(${skew}deg); opacity: .65; }
    64% { clip-path: inset(60% 0 26% 0); transform: translate(${half}px, -1px); opacity: .85; }
    88% { clip-path: inset(84% 0 4% 0); transform: translate(${-x}px, 2px); opacity: .45; }
    100% { clip-path: inset(100% 0 0 0); transform: translate(0); opacity: 0; }`;

    return `
    0%, 74%, 100% { transform: translate(0) skew(0); opacity: 0; }
    76% { transform: translate(${x}px, -2px) skew(${skew}deg) scaleX(1.02); opacity: .95; }
    80% { transform: translate(${-x}px, 2px) skew(${-skew}deg); opacity: .42; }
    84% { transform: translate(${half}px, 0) scaleY(.9); opacity: 1; }
    88% { transform: translate(${-half}px, -1px); opacity: .3; }
    91% { transform: translate(0); opacity: 0; }`;
};

const mainFrames = (config: GlitchTextConfig) => {
    if (config.motion === "stutter") return `0%, 6%, 10%, 14%, 18%, 100% { opacity: 1; transform: translate(0); } 7%, 15% { opacity: .55; transform: translateX(${Math.max(1, config.intensity / 3)}px); } 9%, 17% { opacity: .82; transform: translateX(-1px); }`;
    if (config.motion === "drift") return `0%, 100% { transform: skew(0) translateX(0); } 35% { transform: skew(${config.skew / 3}deg) translateX(1px); } 70% { transform: skew(${-config.skew / 3}deg) translateX(-1px); }`;
    if (config.motion === "scanner") return `0%, 100% { text-shadow: 0 0 0 transparent; } 45% { text-shadow: 0 ${Math.max(2, config.intensity)}px 0 ${config.accentA}; } 48% { text-shadow: 0 -2px 0 ${config.accentB}; } 52% { text-shadow: none; }`;
    return `0%, 74%, 92%, 100% { transform: translate(0); filter: none; } 77% { transform: translateX(1px); filter: contrast(1.35); } 82% { transform: translateX(-1px); filter: contrast(.9); }`;
};

export const glitchTextConfigToCss = (config: GlitchTextConfig) => {
    const signal = config.effect === "signal";
    const fragment = config.effect === "fragment";
    const colorA = signal ? config.textColor : config.accentA;
    const colorB = signal ? config.textColor : config.accentB;
    const beforeClip = fragment
        ? `polygon(0 2%, 100% 2%, 100% ${Math.min(92, config.slice + 18)}%, 58% ${Math.min(92, config.slice + 18)}%, 54% 100%, 0 100%)`
        : `inset(0 0 ${Math.max(5, 100 - config.slice)}% 0)`;
    const afterClip = fragment
        ? `polygon(0 ${Math.max(8, 100 - config.slice)}%, 42% ${Math.max(8, 100 - config.slice)}%, 46% 0, 100% 0, 100% 100%, 0 100%)`
        : `inset(${Math.max(5, 100 - config.slice)}% 0 0 0)`;

    return `.glitch-stage {
    display: grid;
    place-items: center;
    min-height: 240px;
    overflow: hidden;
    background: ${config.backgroundColor};
}

.glitch-text {
    position: relative;
    margin: 0;
    color: ${config.textColor};
    font: ${config.fontWeight} ${config.fontSize}px/1 sans-serif;
    letter-spacing: ${config.letterSpacing}px;
    text-transform: uppercase;
    animation: glitch-main ${config.duration}s ${config.motion === "drift" ? "ease-in-out" : "steps(1, end)"} infinite;
}

.glitch-text::before,
.glitch-text::after {
    content: attr(data-text);
    position: absolute;
    inset: 0;
    pointer-events: none;
    will-change: transform, opacity, clip-path;
    ${config.effect === "chromatic" ? "mix-blend-mode: screen;" : ""}
    ${signal ? `text-shadow: ${config.intensity}px 0 ${config.accentA}, -${config.intensity}px 0 ${config.accentB};` : ""}
}

.glitch-text::before {
    color: ${colorA};
    clip-path: ${beforeClip};
    animation: glitch-a ${config.duration}s ${config.motion === "drift" ? "ease-in-out" : "steps(1, end)"} infinite;
}

.glitch-text::after {
    color: ${colorB};
    clip-path: ${afterClip};
    animation: glitch-b ${config.duration * 0.87}s ${config.motion === "drift" ? "ease-in-out" : "steps(1, end)"} infinite reverse;
}

@keyframes glitch-main { ${mainFrames(config)} }
@keyframes glitch-a { ${layerFrames(config, 1)} }
@keyframes glitch-b { ${layerFrames(config, -1)} }

@media (prefers-reduced-motion: reduce) {
    .glitch-text,
    .glitch-text::before,
    .glitch-text::after { animation: none; }
}`;
};

export const glitchTextConfigToHtml = (config: GlitchTextConfig) =>
    `<div class="glitch-stage">
    <h2 class="glitch-text" data-text="${config.text}">${config.text}</h2>
</div>`;
