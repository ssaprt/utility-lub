import type { ButtonConfig } from "./button.type";

const background = (config: ButtonConfig) =>
    config.backgroundType === "gradient"
        ? `linear-gradient(${config.gradientAngle}deg, ${config.gradientStart}, ${config.gradientEnd})`
        : config.backgroundColor;

const hoverTransform = (config: ButtonConfig) => {
    if (config.hoverEffect === "lift") return "translateY(-3px)";
    if (config.hoverEffect === "scale") return "scale(1.04)";
    if (config.hoverEffect === "press") return "translate(2px, 2px)";
    return "none";
};

export const buttonConfigToCss = (config: ButtonConfig) => `.generated-button {
    appearance: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: ${config.paddingY}px ${config.paddingX}px;
    border: ${config.borderWidth}px solid ${config.borderColor};
    border-radius: ${config.radius}px;
    background: ${background(config)};
    color: ${config.textColor};
    box-shadow: ${config.shadowX}px ${config.shadowY}px ${config.shadowBlur}px ${config.shadowSpread}px ${config.shadowColor};
    font: ${config.fontWeight} ${config.fontSize}px/1.2 inherit;
    letter-spacing: ${config.letterSpacing}px;
    cursor: pointer;
    transition: transform ${config.transition}s ease, background ${config.transition}s ease, color ${config.transition}s ease, box-shadow ${config.transition}s ease;
}

.generated-button:hover {
    background: ${
        config.backgroundType === "gradient"
            ? `linear-gradient(${config.gradientAngle}deg, ${config.hoverColor}, ${config.hoverColor})`
            : config.hoverColor
    };
    color: ${config.hoverTextColor};
    transform: ${hoverTransform(config)};
}

.generated-button:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 3px;
}

.generated-button:active {
    transform: translateY(1px) scale(0.98);
}`;

export const buttonConfigToHtml = (config: ButtonConfig) =>
    `<button class="generated-button" type="button">${config.text}</button>`;
