import type { InputRangeConfig } from "./input-range.type";

const thumbRadius = (config: InputRangeConfig) => config.thumbShape === "circle" ? "50%" : `${config.thumbRadius}px`;
const thumbTransform = (config: InputRangeConfig) => config.thumbShape === "diamond" ? "rotate(45deg)" : "none";
const inputBackground = (config: InputRangeConfig) => config.fill
    ? `linear-gradient(to right, ${config.fillColor} 0 var(--range-progress), ${config.trackColor} var(--range-progress) 100%)`
    : config.trackColor;

export const inputRangeConfigToCss = (config: InputRangeConfig) => `.styled-range {
    --range-progress: ${config.value}%;
    appearance: none;
    width: min(${config.width}px, 100%);
    height: ${config.trackHeight}px;
    border: ${config.trackBorderWidth}px solid ${config.trackBorderColor};
    border-radius: ${config.trackRadius}px;
    background: ${inputBackground(config)};
    cursor: pointer;
}

.styled-range::-webkit-slider-runnable-track {
    height: ${config.trackHeight}px;
    border-radius: ${config.trackRadius}px;
    background: transparent;
}

.styled-range::-webkit-slider-thumb {
    appearance: none;
    width: ${config.thumbSize}px;
    height: ${config.thumbSize}px;
    margin-top: ${(config.trackHeight - config.thumbSize) / 2}px;
    border: ${config.thumbBorderWidth}px solid ${config.thumbBorderColor};
    border-radius: ${thumbRadius(config)};
    background: ${config.thumbColor};
    box-shadow: 0 3px ${config.thumbShadowBlur}px rgba(0, 0, 0, 0.35);
    transform: ${thumbTransform(config)};
}

.styled-range::-moz-range-track {
    height: ${config.trackHeight}px;
    border-radius: ${config.trackRadius}px;
    background: ${config.trackColor};
}

.styled-range::-moz-range-progress {
    height: ${config.trackHeight}px;
    border-radius: ${config.trackRadius}px;
    background: ${config.fill ? config.fillColor : config.trackColor};
}

.styled-range::-moz-range-thumb {
    width: ${config.thumbSize}px;
    height: ${config.thumbSize}px;
    border: ${config.thumbBorderWidth}px solid ${config.thumbBorderColor};
    border-radius: ${thumbRadius(config)};
    background: ${config.thumbColor};
    box-shadow: 0 3px ${config.thumbShadowBlur}px rgba(0, 0, 0, 0.35);
    transform: ${thumbTransform(config)};
}

.styled-range:focus-visible {
    outline: 2px solid ${config.fillColor};
    outline-offset: 6px;
}`;

export const inputRangeConfigToHtml = (config: InputRangeConfig) =>
    `<input
    class="styled-range"
    type="range"
    min="0"
    max="100"
    value="${config.value}"
    aria-label="Range value"
    oninput="this.style.setProperty('--range-progress', this.value + '%')"
>`;
