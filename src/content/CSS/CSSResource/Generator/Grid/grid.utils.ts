import type { GridConfig, GridItemConfig } from "./grid.type";

export const clamp = (value: number, min: number, max: number) => {
    return Math.min(Math.max(value, min), max);
};

export const createId = () => {
    return crypto.randomUUID();
};

export const gridItemToStyle = (item: GridItemConfig) => {
    return {
        gridColumnStart: item.columnStart ?? "auto",

        gridColumnEnd: `span ${item.columnSpan}`,

        gridRowStart: item.rowStart ?? "auto",

        gridRowEnd: `span ${item.rowSpan}`,

        justifySelf: item.justifySelf,

        alignSelf: item.alignSelf,

        order: item.order,
    };
};

const gridLineToCss = ({
    start,
    span,
}: {
    start: number | null;
    span: number;
}) => {
    if (start === null && span === 1) {
        return null;
    }

    if (start === null) {
        return `span ${span}`;
    }

    if (span === 1) {
        return `${start}`;
    }

    return `${start} / span ${span}`;
};

const gridItemToCss = (item: GridItemConfig, index: number) => {
    const lines: string[] = [];

    const column = gridLineToCss({
        start: item.columnStart,

        span: item.columnSpan,
    });

    const row = gridLineToCss({
        start: item.rowStart,

        span: item.rowSpan,
    });

    if (column) {
        lines.push(`    grid-column: ${column};`);
    }

    if (row) {
        lines.push(`    grid-row: ${row};`);
    }

    if (item.justifySelf !== "auto") {
        lines.push(`    justify-self: ${item.justifySelf};`);
    }

    if (item.alignSelf !== "auto") {
        lines.push(`    align-self: ${item.alignSelf};`);
    }

    if (item.order !== 0) {
        lines.push(`    order: ${item.order};`);
    }

    if (lines.length === 0) {
        return null;
    }

    return `.item-${index + 1} {
${lines.join("\n")}
}`;
};

export const gridConfigToCss = (config: GridConfig) => {
    const gap =
        config.rowGap === config.columnGap
            ? `${config.rowGap}px`
            : `${config.rowGap}px ${config.columnGap}px`;

    const parent = `.grid-container {
    display: grid;
    grid-template-columns: repeat(${config.columns}, minmax(0, 1fr));
    grid-template-rows: repeat(${config.rows}, minmax(0, 1fr));
    grid-auto-flow: ${config.autoFlow};
    justify-items: ${config.justifyItems};
    align-items: ${config.alignItems};
    gap: ${gap};
}`;

    const children = config.items
        .map(gridItemToCss)
        .filter(Boolean)
        .join("\n\n");

    if (!children) {
        return parent;
    }

    return `${parent}

${children}`;
};

export const gridConfigToHtml = (config: GridConfig) => {
    const items = config.items
        .map(
            (_, index) =>
                `    <div class="item-${index + 1}">${index + 1}</div>`,
        )
        .join("\n");

    return `<div class="grid-container">
${items}
</div>`;
};
