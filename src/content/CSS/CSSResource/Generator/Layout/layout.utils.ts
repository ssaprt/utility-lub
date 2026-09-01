import type { CSSProperties } from "react";
import type { LayoutConfig } from "./layout.type";

const columns = (config: LayoutConfig) => [
    ...(config.includeLeft ? [`${config.leftWidth}px`] : []),
    "minmax(0, 1fr)",
    ...(config.includeRight ? [`${config.rightWidth}px`] : []),
];

const middleAreas = (config: LayoutConfig) => [
    ...(config.includeLeft ? ["left"] : []),
    "main",
    ...(config.includeRight ? ["right"] : []),
];

const areaRows = (config: LayoutConfig) => {
    const width = middleAreas(config).length;
    const rows: string[] = [];
    if (config.includeHeader) rows.push(`"${Array(width).fill("header").join(" ")}"`);
    rows.push(`"${middleAreas(config).join(" ")}"`);
    if (config.includeFooter) rows.push(`"${Array(width).fill("footer").join(" ")}"`);
    return rows;
};

const rowSizes = (config: LayoutConfig) => [
    ...(config.includeHeader ? [`${config.headerHeight}px`] : []),
    "minmax(0, 1fr)",
    ...(config.includeFooter ? [`${config.footerHeight}px`] : []),
];

export const layoutPreviewStyle = (config: LayoutConfig): CSSProperties => {
    const mobile = config.previewMode === "mobile";
    const mobileAreas = [
        ...(config.includeHeader ? ["\"header\""] : []),
        ...(config.includeLeft ? ["\"left\""] : []),
        "\"main\"",
        ...(config.includeRight ? ["\"right\""] : []),
        ...(config.includeFooter ? ["\"footer\""] : []),
    ];
    return {
        display: "grid",
        width: mobile ? "290px" : "100%",
        maxWidth: "100%",
        height: "350px",
        padding: `${config.padding}px`,
        gap: `${config.gap}px`,
        color: config.textColor,
        background: config.pageColor,
        gridTemplateColumns: mobile ? "1fr" : columns(config).join(" "),
        gridTemplateRows: mobile ? "auto" : rowSizes(config).join(" "),
        gridTemplateAreas: mobile ? mobileAreas.join(" ") : areaRows(config).join(" "),
    };
};

export const layoutConfigToCss = (config: LayoutConfig) => {
    const mobileRows = [
        ...(config.includeHeader ? ["\"header\""] : []),
        ...(config.includeLeft ? ["\"left\""] : []),
        "\"main\"",
        ...(config.includeRight ? ["\"right\""] : []),
        ...(config.includeFooter ? ["\"footer\""] : []),
    ];
    const sections = [
        ...(config.includeHeader ? [`.site-header { grid-area: header; background: ${config.headerColor}; }`] : []),
        `.site-main { grid-area: main; background: ${config.mainColor}; }`,
        ...(config.includeLeft ? [`.site-left { grid-area: left; background: ${config.leftColor}; }`] : []),
        ...(config.includeRight ? [`.site-right { grid-area: right; background: ${config.rightColor}; }`] : []),
        ...(config.includeFooter ? [`.site-footer { grid-area: footer; background: ${config.footerColor}; }`] : []),
    ];

    return `.site-layout {
    display: grid;
    min-height: 100vh;
    box-sizing: border-box;
    grid-template-columns: ${columns(config).join(" ")};
    grid-template-rows: ${rowSizes(config).join(" ")};
    grid-template-areas:
        ${areaRows(config).join("\n        ")};
    gap: ${config.gap}px;
    padding: ${config.padding}px;
    color: ${config.textColor};
    background: ${config.pageColor};
}

${sections.join("\n")}

.site-layout > * {
    min-width: 0;
    padding: 16px;
}

@media (max-width: ${config.breakpoint}px) {
    .site-layout {
        grid-template-columns: 1fr;
        grid-template-rows: none;
        grid-template-areas:
            ${mobileRows.join("\n            ")};
    }
}`;
};

export const layoutConfigToHtml = (config: LayoutConfig) => {
    const children = [
        ...(config.includeHeader ? [`    <header class="site-header">Header</header>`] : []),
        ...(config.includeLeft ? [`    <aside class="site-left">Navigation</aside>`] : []),
        `    <main class="site-main">Main content</main>`,
        ...(config.includeRight ? [`    <aside class="site-right">Sidebar</aside>`] : []),
        ...(config.includeFooter ? [`    <footer class="site-footer">Footer</footer>`] : []),
    ];
    return `<div class="site-layout">\n${children.join("\n")}\n</div>`;
};
