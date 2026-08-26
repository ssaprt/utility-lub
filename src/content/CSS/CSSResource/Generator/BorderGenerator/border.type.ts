export const borderStyles = [
    "none",
    "solid",
    "dashed",
    "dotted",
    "double",
    "groove",
    "ridge",
    "inset",
    "outset",
] as const;

export type BorderStyle = (typeof borderStyles)[number];

export type BorderSideName = "top" | "right" | "bottom" | "left";

export type BorderCornerName =
    "topLeft" | "topRight" | "bottomRight" | "bottomLeft";

export type BorderRadiusUnit = "px" | "%";

export interface BorderSideConfig {
    width: number;
    style: BorderStyle;
    color: string;
}

export interface BorderRadiusValue {
    x: number;
    y: number;
}

export interface BorderRadiusConfig {
    topLeft: BorderRadiusValue;
    topRight: BorderRadiusValue;
    bottomRight: BorderRadiusValue;
    bottomLeft: BorderRadiusValue;
}

export interface BorderConfig {
    canvasColor: string;
    boxColor: string;

    boxWidth: number;
    boxHeight: number;

    borders: Record<BorderSideName, BorderSideConfig>;

    radius: BorderRadiusConfig;
    radiusUnit: BorderRadiusUnit;
}

const defaultBorder: BorderSideConfig = {
    width: 3,
    style: "solid",
    color: "#000000",
};

const defaultRadius: BorderRadiusValue = {
    x: 24,
    y: 24,
};

export const defaultBorderConfig: BorderConfig = {
    canvasColor: "#f5f5f5",
    boxColor: "#ffffff",

    boxWidth: 240,
    boxHeight: 240,

    borders: {
        top: { ...defaultBorder },
        right: { ...defaultBorder },
        bottom: { ...defaultBorder },
        left: { ...defaultBorder },
    },

    radius: {
        topLeft: { ...defaultRadius },
        topRight: { ...defaultRadius },
        bottomRight: { ...defaultRadius },
        bottomLeft: { ...defaultRadius },
    },

    radiusUnit: "px",
};
