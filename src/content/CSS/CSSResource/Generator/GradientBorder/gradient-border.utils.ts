import type { GradientBorderConfig } from "./gradient-border.type";

export const gradientBorderValue = (config: GradientBorderConfig) => {
    const stops = `${config.colorA} ${config.stopA}%, ${config.colorB} ${config.stopB}%, ${config.colorC} ${config.stopC}%`;
    if (config.type === "conic") return `conic-gradient(from ${config.angle}deg, ${stops})`;
    if (config.type === "radial") return `radial-gradient(circle at ${config.positionX}% ${config.positionY}%, ${stops})`;
    return `linear-gradient(${config.angle}deg, ${stops})`;
};

export const gradientBorderConfigToCss = (config: GradientBorderConfig) => `.gradient-border {
    display: grid;
    place-items: center;
    width: ${config.width}px;
    height: ${config.height}px;
    box-sizing: border-box;
    border: ${config.borderWidth}px solid transparent;
    border-radius: ${config.radius}px;
    background:
        linear-gradient(${config.backgroundColor}, ${config.backgroundColor}) padding-box,
        ${gradientBorderValue(config)} border-box;
    color: ${config.textColor};${config.glow ? `
    box-shadow: 0 0 ${config.glowBlur}px color-mix(in srgb, ${config.colorB} 45%, transparent);` : ""}
}`;

export const gradientBorderConfigToHtml = () =>
    `<div class="gradient-border">Gradient border</div>`;
