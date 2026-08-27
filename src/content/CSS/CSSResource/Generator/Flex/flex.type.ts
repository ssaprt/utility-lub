export const flexDirections = [
    "row",
    "row-reverse",
    "column",
    "column-reverse",
] as const;

export const flexWraps = ["nowrap", "wrap", "wrap-reverse"] as const;

export const justifyContents = [
    "flex-start",
    "center",
    "flex-end",
    "space-between",
    "space-around",
    "space-evenly",
] as const;

export const alignItemsValues = [
    "stretch",
    "flex-start",
    "center",
    "flex-end",
    "baseline",
] as const;

export const alignContentValues = [
    "stretch",
    "flex-start",
    "center",
    "flex-end",
    "space-between",
    "space-around",
    "space-evenly",
] as const;

export const alignSelfValues = [
    "auto",
    "stretch",
    "flex-start",
    "center",
    "flex-end",
    "baseline",
] as const;

export const flexBasisUnits = ["auto", "px", "%"] as const;

export type FlexDirection = (typeof flexDirections)[number];

export type FlexWrap = (typeof flexWraps)[number];

export type JustifyContent = (typeof justifyContents)[number];

export type AlignItems = (typeof alignItemsValues)[number];

export type AlignContent = (typeof alignContentValues)[number];

export type AlignSelf = (typeof alignSelfValues)[number];

export type FlexBasisUnit = (typeof flexBasisUnits)[number];

export interface FlexItemConfig {
    id: string;

    width: number;
    height: number;

    backgroundColor: string;

    flexGrow: number;
    flexShrink: number;

    flexBasis: number;
    flexBasisUnit: FlexBasisUnit;

    alignSelf: AlignSelf;

    order: number;
}

export interface FlexConfig {
    canvasColor: string;
    containerColor: string;

    containerWidth: number;
    containerHeight: number;

    flexDirection: FlexDirection;
    flexWrap: FlexWrap;

    justifyContent: JustifyContent;

    alignItems: AlignItems;
    alignContent: AlignContent;

    rowGap: number;
    columnGap: number;

    items: FlexItemConfig[];
}

export const createFlexItem = (id: string, index = 0): FlexItemConfig => {
    return {
        id,

        width: 80,
        height: 80,

        backgroundColor: [
            "#6366f1",
            "#8b5cf6",
            "#ec4899",
            "#f97316",
            "#14b8a6",
            "#3b82f6",
        ][index % 6],

        flexGrow: 0,
        flexShrink: 1,

        flexBasis: 80,
        flexBasisUnit: "auto",

        alignSelf: "auto",

        order: 0,
    };
};

export const createDefaultFlexConfig = (): FlexConfig => {
    return {
        canvasColor: "#111111",
        containerColor: "#242424",

        containerWidth: 460,
        containerHeight: 460,

        flexDirection: "row",
        flexWrap: "wrap",

        justifyContent: "flex-start",

        alignItems: "stretch",
        alignContent: "stretch",

        rowGap: 12,
        columnGap: 12,

        items: [
            createFlexItem("flex-item-1", 0),

            createFlexItem("flex-item-2", 1),

            createFlexItem("flex-item-3", 2),

            createFlexItem("flex-item-4", 3),
        ],
    };
};

export const defaultFlexConfig = createDefaultFlexConfig();
