import type { NthChildConfig } from "./nth-child.type";

export const nthFormula = (a: number, b: number) => {
    if (a === 0) return String(b);
    const aPart = a === 1 ? "n" : a === -1 ? "-n" : `${a}n`;
    if (b === 0) return aPart;
    return `${aPart}${b > 0 ? "+" : ""}${b}`;
};

export const nthSelector = (config: NthChildConfig) => {
    const pseudo = config.direction === "start" ? "nth-child" : "nth-last-child";
    const expression = config.mode === "range"
        ? `:${pseudo}(n+${config.start}):${pseudo}(-n+${config.end})`
        : `:${pseudo}(${nthFormula(config.a, config.b)})`;
    return config.negate ? `:not(${expression})` : expression;
};

export const nthMatches = (index: number, config: NthChildConfig) => {
    const position = config.direction === "start" ? index : config.count - index + 1;
    let match: boolean;
    if (config.mode === "range") {
        match = position >= Math.min(config.start, config.end) && position <= Math.max(config.start, config.end);
    } else if (config.a === 0) {
        match = position === config.b;
    } else {
        const n = (position - config.b) / config.a;
        match = Number.isInteger(n) && n >= 0;
    }
    return config.negate ? !match : match;
};

export const nthChildConfigToCss = (config: NthChildConfig) => `.nth-list {
    display: ${config.display === "grid" ? "grid" : "flex"};
    ${config.display === "grid" ? "grid-template-columns: repeat(auto-fit, minmax(48px, 1fr));" : "flex-direction: column;"}
    gap: 8px;
}

.nth-list > * {
    display: grid;
    place-items: center;
    min-height: 44px;
    border-radius: 5px;
    background: ${config.itemColor};
    color: ${config.textColor};
}

.nth-list > *${nthSelector(config)} {
    background: ${config.selectedColor};
    box-shadow: 0 0 0 2px color-mix(in srgb, ${config.selectedColor} 35%, transparent);
}`;

export const nthChildConfigToHtml = (config: NthChildConfig) => `<div class="nth-list">
${Array.from({ length: config.count }, (_, index) => `    <div>${index + 1}</div>`).join("\n")}
</div>`;
