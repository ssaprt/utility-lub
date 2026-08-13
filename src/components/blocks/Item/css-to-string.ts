import type { CSSProperties } from "react";

const unitlessProperties = new Set([
    "animationIterationCount",
    "aspectRatio",
    "borderImageOutset",
    "borderImageSlice",
    "borderImageWidth",
    "boxFlex",
    "boxFlexGroup",
    "boxOrdinalGroup",
    "columnCount",
    "columns",
    "flex",
    "flexGrow",
    "flexNegative",
    "flexOrder",
    "flexPositive",
    "flexShrink",
    "floodOpacity",
    "fontWeight",
    "gridArea",
    "gridColumn",
    "gridColumnEnd",
    "gridColumnSpan",
    "gridColumnStart",
    "gridRow",
    "gridRowEnd",
    "gridRowSpan",
    "gridRowStart",
    "lineClamp",
    "lineHeight",
    "opacity",
    "order",
    "orphans",
    "scale",
    "stopOpacity",
    "strokeDasharray",
    "strokeDashoffset",
    "strokeMiterlimit",
    "strokeOpacity",
    "strokeWidth",
    "tabSize",
    "widows",
    "zIndex",
    "zoom",
]);

const toKebabCase = (property: string) => {
    if (property.startsWith("--")) {
        return property;
    }

    return property
        .replace(/^ms([A-Z])/, "-ms-$1")
        .replace(/^Webkit([A-Z])/, "-webkit-$1")
        .replace(/^Moz([A-Z])/, "-moz-$1")
        .replace(/^O([A-Z])/, "-o-$1")
        .replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`)
        .toLowerCase();
};

const formatValue = (property: string, value: string | number) => {
    if (typeof value !== "number") {
        return value.trim();
    }

    if (
        value === 0 ||
        unitlessProperties.has(property) ||
        property.startsWith("--")
    ) {
        return String(value);
    }

    return `${value}px`;
};

const splitTopLevel = (value: string, separator = ",") => {
    const result: string[] = [];

    let current = "";
    let depth = 0;
    let quote: "'" | '"' | null = null;

    for (let index = 0; index < value.length; index += 1) {
        const char = value[index];

        if (quote) {
            current += char;

            if (char === quote && value[index - 1] !== "\\") {
                quote = null;
            }

            continue;
        }

        if (char === "'" || char === '"') {
            quote = char;
            current += char;
            continue;
        }

        if (char === "(") {
            depth += 1;
        } else if (char === ")") {
            depth = Math.max(0, depth - 1);
        }

        if (char === separator && depth === 0) {
            result.push(current.trim());
            current = "";
            continue;
        }

        current += char;
    }

    if (current.trim()) {
        result.push(current.trim());
    }

    return result;
};

const formatCssValue = (value: string, indent: string) => {
    const parts = splitTopLevel(value);

    if (parts.length <= 1) {
        return value;
    }

    return `\n${parts
        .map(
            (part, index) =>
                `${indent}${part}${index < parts.length - 1 ? "," : ""}`,
        )
        .join("\n")}`;
};

export const cssPropertiesToString = (
    styles: CSSProperties,
    options?: {
        selector?: string;
        indentSize?: number;
    },
) => {
    const indentSize = options?.indentSize ?? 4;

    const indent = " ".repeat(indentSize);

    const declarations = Object.entries(styles)
        .filter(
            (entry): entry is [string, string | number] =>
                entry[1] !== undefined && entry[1] !== null && entry[1] !== "",
        )
        .map(([property, rawValue]) => {
            const cssProperty = toKebabCase(property);

            const value = formatValue(property, rawValue);

            const formatted = formatCssValue(value, indent);

            if (formatted.startsWith("\n")) {
                return `${cssProperty}:${formatted};`;
            }

            return `${cssProperty}: ${formatted};`;
        });

    if (!options?.selector) {
        return declarations.join("\n");
    }

    return `${options.selector} {\n${declarations
        .map((declaration) =>
            declaration
                .split("\n")
                .map((line) => `${indent}${line}`)
                .join("\n"),
        )
        .join("\n")}\n}`;
};
