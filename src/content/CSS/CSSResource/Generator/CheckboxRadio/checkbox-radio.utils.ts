import type { CheckboxRadioConfig } from "./checkbox-radio.type";

const markRules = (config: CheckboxRadioConfig) => {
    if (config.type === "radio") {
        return `
    width: ${config.markSize}px;
    height: ${config.markSize}px;
    border-radius: 50%;
    background: ${config.markColor};
    transform: scale(0);`;
    }

    if (config.checkmarkStyle === "cross") {
        return `
    width: ${config.markSize}px;
    height: 2px;
    background: ${config.markColor};
    box-shadow: 0 0 0 0 ${config.markColor};
    transform: scale(0) rotate(45deg);`;
    }

    if (config.checkmarkStyle === "fill") {
        return `
    inset: 3px;
    border-radius: ${Math.max(config.radius - 2, 1)}px;
    background: ${config.markColor};
    transform: scale(0);`;
    }

    return `
    width: ${Math.max(config.markSize * 0.55, 4)}px;
    height: ${config.markSize}px;
    border-right: 2px solid ${config.markColor};
    border-bottom: 2px solid ${config.markColor};
    transform: translateY(-1px) scale(0) rotate(45deg);`;
};

const checkedTransform = (config: CheckboxRadioConfig) =>
    config.type === "checkbox" && config.checkmarkStyle === "tick"
        ? "translateY(-1px) scale(1) rotate(45deg)"
        : config.type === "checkbox" && config.checkmarkStyle === "cross"
          ? "scale(1) rotate(45deg)"
          : "scale(1)";

export const checkboxRadioConfigToCss = (
    config: CheckboxRadioConfig,
) => `.choice-list {
    display: flex;
    flex-direction: column;
    gap: ${config.rowGap}px;
    color: ${config.fontColor};
    font-size: ${config.fontSize}px;
}

.choice-label {
    display: inline-flex;
    align-items: center;
    gap: ${config.gap}px;
    width: fit-content;
    cursor: pointer;
}

.choice-input {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip-path: inset(50%);
}

.choice-control {
    position: relative;
    display: grid;
    place-items: center;
    width: ${config.size}px;
    height: ${config.size}px;
    flex: 0 0 auto;
    border: ${config.borderWidth}px solid ${config.uncheckedBorder};
    border-radius: ${config.type === "radio" ? "50%" : `${config.radius}px`};
    background: ${config.uncheckedBackground};
    transition: border-color 160ms ease, background 160ms ease, transform 160ms ease;
}

.choice-control::after {
    content: "";
    position: absolute;${markRules(config)}
    transition: transform 160ms ease;
}

.choice-label:hover .choice-control {
    border-color: ${config.checkedBorder};
}

.choice-input:checked + .choice-control {
    border-color: ${config.checkedBorder};
    background: ${config.checkedBackground};
}

.choice-input:checked + .choice-control::after {
    transform: ${checkedTransform(config)};
}

${
    config.type === "checkbox" && config.checkmarkStyle === "cross"
        ? `.choice-input:checked + .choice-control::before {
    content: "";
    position: absolute;
    width: ${config.markSize}px;
    height: 2px;
    background: ${config.markColor};
    transform: rotate(-45deg);
}`
        : ""
}

.choice-input:focus-visible + .choice-control {
    outline: 2px solid ${config.checkedBorder};
    outline-offset: 3px;
}

.choice-input:disabled + .choice-control,
.choice-label:has(.choice-input:disabled) {
    opacity: ${config.disabledOpacity};
    cursor: not-allowed;
}`;

export const checkboxRadioConfigToHtml = (config: CheckboxRadioConfig) => {
    const items = ["Interface", "Motion", "Accessibility"]
        .map(
            (label, index) => `    <label class="choice-label">
        <input class="choice-input" type="${config.type}" name="preferences"${index === 0 ? " checked" : ""}>
        <span class="choice-control" aria-hidden="true"></span>
        <span>${label}</span>
    </label>`,
        )
        .join("\n");

    return `<div class="choice-list">
${items}
</div>`;
};
