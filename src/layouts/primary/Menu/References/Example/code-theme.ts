import type { CSSProperties } from "react";

const accent = (color: string, amount = 45) =>
    `color-mix(in oklch, var(--foreground) ${100 - amount}%, ${color} ${amount}%)`;

export const syntaxTheme: Record<string, CSSProperties> = {
    'code[class*="language-"]': {
        color: "var(--foreground)",
        background: "transparent",
        fontFamily: "var(--font-jetbrains-mono)",
        fontSize: "13px",
        lineHeight: "1.6",
        textAlign: "left",
        whiteSpace: "pre-wrap",
        wordSpacing: "normal",
        wordBreak: "normal",
        overflowWrap: "break-word",
        tabSize: 4,
        hyphens: "none",
    },

    'pre[class*="language-"]': {
        color: "var(--foreground)",
        background: "transparent",
        margin: 0,
        whiteSpace: "pre-wrap",
        wordBreak: "normal",
        overflowWrap: "break-word",
    },

    comment: {
        color: `color-mix(in oklab, var(--foreground) 45%, var(--background))`,
        fontStyle: "italic",
    },

    punctuation: {
        color: `color-mix(in oklab, var(--foreground) 65%, var(--background))`,
    },

    keyword: {
        color: accent("#a855f7", 55),
        fontWeight: 600,
    },

    atrule: {
        color: accent("#a855f7", 55),
    },

    selector: {
        color: accent("#38bdf8", 55),
        fontWeight: 500,
    },

    tag: {
        color: accent("#38bdf8", 55),
    },

    function: {
        color: accent("#60a5fa", 55),
    },

    "class-name": {
        color: accent("#60a5fa", 55),
    },

    property: {
        color: accent("#2dd4bf", 50),
    },

    "attr-name": {
        color: accent("#2dd4bf", 45),
    },

    string: {
        color: accent("#4ade80", 50),
    },

    "attr-value": {
        color: accent("#4ade80", 50),
    },

    char: {
        color: accent("#4ade80", 50),
    },

    number: {
        color: accent("#fb923c", 55),
    },

    boolean: {
        color: accent("#fb923c", 55),
    },

    constant: {
        color: accent("#fb923c", 50),
    },

    variable: {
        color: accent("#f472b6", 45),
    },

    operator: {
        color: accent("#facc15", 40),
    },

    regex: {
        color: accent("#facc15", 45),
    },

    builtin: {
        color: accent("#22d3ee", 45),
    },

    important: {
        color: accent("#ef4444", 55),
        fontWeight: 700,
    },

    deleted: {
        color: accent("#ef4444", 55),
    },

    inserted: {
        color: accent("#22c55e", 55),
    },

    prolog: {
        color: `color-mix(in oklab, var(--foreground) 45%, var(--background))`,
    },

    doctype: {
        color: `color-mix(in oklab, var(--foreground) 50%, var(--background))`,
    },

    cdata: {
        color: `color-mix(in oklab, var(--foreground) 50%, var(--background))`,
    },
};
