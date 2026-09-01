import type { RibbonConfig } from "./ribbon.type";

const background = (config: RibbonConfig) => config.gradient
    ? `linear-gradient(135deg, ${config.primaryColor}, ${config.secondaryColor})`
    : config.primaryColor;

export const ribbonConfigToCss = (config: RibbonConfig) => {
    const side = config.position;
    const opposite = config.position === "left" ? "right" : "left";
    const fontSize = Math.max(10, config.size * 0.4);
    const textWidth =
        config.text.length * fontSize * 0.72 +
        Math.max(0, config.text.length - 1) * 1.4 +
        4;
    const foldWidth = Math.max(config.size * 3.3, textWidth + 44);
    const edgeWidth = Math.max(config.size * 2.4, textWidth + 36);
    const cornerWidth = Math.max(config.size * 5, textWidth + config.size * 1.5);
    const base = `.ribbon-card {
    position: relative;
    width: 300px;
    min-height: 190px;
    overflow: hidden;
    border-radius: ${config.radius}px;
    background: ${config.cardColor};
}

.ribbon {
    position: absolute;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    overflow: visible;
    padding-bottom: 1px;
    background: ${background(config)};
    color: ${config.textColor};
    font: 700 ${fontSize}px/1.15 sans-serif;
    letter-spacing: 1.4px;${config.shadow ? "\n    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.3);" : ""}
    white-space: nowrap;
}

.ribbon-label {
    display: block;
    line-height: 1.15;
}`;

    if (config.style === "fold") return `${base}

.ribbon {
    top: ${config.offset}px;
    ${side}: -8px;
    min-width: ${foldWidth}px;
    height: ${config.size}px;
    padding: 0 18px;
}

.ribbon::after {
    content: "";
    position: absolute;
    top: 100%;
    ${side}: 0;
    border: 4px solid transparent;
    border-top-color: ${config.secondaryColor};
    border-${opposite}-color: ${config.secondaryColor};
}`;

    if (config.style === "edge") return `${base}

.ribbon {
    top: ${config.offset}px;
    ${side}: 0;
    min-width: ${edgeWidth}px;
    height: ${config.size}px;
    padding: 0 14px;
    border-radius: ${config.position === "left" ? "0 999px 999px 0" : "999px 0 0 999px"};
}`;

    return `${base}

.ribbon {
    top: ${config.offset}px;
    ${side}: -${cornerWidth * 0.23}px;
    width: ${cornerWidth}px;
    height: ${config.size}px;
    transform: rotate(${config.position === "left" ? -45 : 45}deg);
    transform-origin: center;
}

.ribbon-label {
    transform: translateX(${config.position === "left" ? -config.size * 0.23 : config.size * 0.23}px);
}`;
};

export const ribbonConfigToHtml = (config: RibbonConfig) =>
    `<div class="ribbon-card">
    <div class="ribbon"><span class="ribbon-label">${config.text}</span></div>
    <div class="card-content">Card content</div>
</div>`;
