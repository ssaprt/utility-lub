import type { FlexConfig, FlexItemConfig } from "./flex.type";

export const clamp = (value: number, min: number, max: number) => {
    return Math.min(Math.max(value, min), max);
};

export const createId = () => {
    return crypto.randomUUID();
};

export const normalizeColor = (color: string) => {
    return /^#[0-9a-fA-F]{6}$/.test(color) ? color : "#000000";
};

export const flexBasisToCss = (item: FlexItemConfig) => {
    if (item.flexBasisUnit === "auto") {
        return "auto";
    }

    return `${item.flexBasis}${item.flexBasisUnit}`;
};

export const flexItemToStyle = (item: FlexItemConfig) => {
    return {
        width: `${item.width}px`,
        height: `${item.height}px`,

        flexGrow: item.flexGrow,
        flexShrink: item.flexShrink,
        flexBasis: flexBasisToCss(item),

        alignSelf: item.alignSelf,
        order: item.order,

        backgroundColor: item.backgroundColor,
    };
};

const getItemFlexCss = (item: FlexItemConfig, index: number) => {
    const values: string[] = [];

    if (item.flexGrow !== 0) {
        values.push(`    flex-grow: ${item.flexGrow};`);
    }

    if (item.flexShrink !== 1) {
        values.push(`    flex-shrink: ${item.flexShrink};`);
    }

    if (item.flexBasisUnit !== "auto") {
        values.push(`    flex-basis: ${flexBasisToCss(item)};`);
    }

    if (item.alignSelf !== "auto") {
        values.push(`    align-self: ${item.alignSelf};`);
    }

    if (item.order !== 0) {
        values.push(`    order: ${item.order};`);
    }

    if (values.length === 0) {
        return null;
    }

    return `.item-${index + 1} {
${values.join("\n")}
}`;
};

export const flexConfigToCss = (config: FlexConfig) => {
    const parent = `.flex-container {
    display: flex;
    flex-direction: ${config.flexDirection};
    flex-wrap: ${config.flexWrap};
    justify-content: ${config.justifyContent};
    align-items: ${config.alignItems};
    align-content: ${config.alignContent};
    gap: ${config.rowGap}px ${config.columnGap}px;
}`;

    const children = config.items
        .map(getItemFlexCss)
        .filter(Boolean)
        .join("\n\n");

    if (!children) {
        return parent;
    }

    return `${parent}

${children}`;
};

export const flexConfigToHtml = (config: FlexConfig) => {
    const items = config.items
        .map(
            (_, index) =>
                `    <div class="item-${index + 1}">${index + 1}</div>`,
        )
        .join("\n");

    return `<div class="flex-container">
${items}
</div>`;
};
