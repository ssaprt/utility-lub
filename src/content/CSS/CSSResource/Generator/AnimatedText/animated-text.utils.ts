import type { AnimatedTextConfig } from "./animated-text.type";

import { getAnimatedTextEffect } from "./animated-text.effects";

export const normalizeColor = (color: string) => {
    return /^#[0-9a-fA-F]{6}$/.test(color) ? color : "#000000";
};

const escapeHtml = (value: string) => {
    return value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
};

const indent = (value: string, spaces = 4) => {
    const prefix = " ".repeat(spaces);

    return value
        .trim()
        .split("\n")
        .map((line) => `${prefix}${line.trimStart()}`)
        .join("\n");
};

export const animatedTextConfigToCss = (config: AnimatedTextConfig) => {
    const effect = getAnimatedTextEffect(config, "animated-text-effect");

    return `.animated-text {
    background-color: ${normalizeColor(config.backgroundColor)};
}

.animated-text svg {
    display: block;
    width: 100%;
    height: auto;
    overflow: visible;
    font-family: ${config.fontFamily};
}

.animated-text text {
    font-size: ${config.fontSize}px;
${indent(effect.textCss)}
}

${effect.keyframes}`;
};

export const animatedTextConfigToHtml = (config: AnimatedTextConfig) => {
    const text = escapeHtml(config.text);

    return `<div class="animated-text">
    <svg
        viewBox="0 0 1320 300"
        role="img"
        aria-label="${text}"
    >
        <text
            x="50%"
            y="50%"
            dy=".35em"
            text-anchor="middle"
        >
            ${text}
        </text>
    </svg>
</div>`;
};
