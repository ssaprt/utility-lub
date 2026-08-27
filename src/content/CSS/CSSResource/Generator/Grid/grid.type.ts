export const gridAutoFlowValues = [
    "row",
    "column",
    "dense",
    "row dense",
    "column dense",
] as const;

export const gridJustifyItemsValues = [
    "stretch",
    "start",
    "center",
    "end",
] as const;

export const gridAlignItemsValues = [
    "stretch",
    "start",
    "center",
    "end",
] as const;

export const gridJustifySelfValues = [
    "auto",
    "stretch",
    "start",
    "center",
    "end",
] as const;

export const gridAlignSelfValues = [
    "auto",
    "stretch",
    "start",
    "center",
    "end",
] as const;

export type GridAutoFlow = (typeof gridAutoFlowValues)[number];

export type GridJustifyItems = (typeof gridJustifyItemsValues)[number];

export type GridAlignItems = (typeof gridAlignItemsValues)[number];

export type GridJustifySelf = (typeof gridJustifySelfValues)[number];

export type GridAlignSelf = (typeof gridAlignSelfValues)[number];

export interface GridItemConfig {
    id: string;

    columnStart: number | null;
    columnSpan: number;

    rowStart: number | null;
    rowSpan: number;

    justifySelf: GridJustifySelf;
    alignSelf: GridAlignSelf;

    order: number;
}

export interface GridConfig {
    containerWidth: number;
    containerHeight: number;

    columns: number;
    rows: number;

    autoFlow: GridAutoFlow;

    justifyItems: GridJustifyItems;
    alignItems: GridAlignItems;

    rowGap: number;
    columnGap: number;

    items: GridItemConfig[];
}

export const createGridItem = (id: string): GridItemConfig => {
    return {
        id,

        columnStart: null,
        columnSpan: 1,

        rowStart: null,
        rowSpan: 1,

        justifySelf: "auto",
        alignSelf: "auto",

        order: 0,
    };
};

export const createDefaultGridConfig = (): GridConfig => {
    return {
        containerWidth: 580,
        containerHeight: 340,

        columns: 3,
        rows: 2,

        autoFlow: "row",

        justifyItems: "stretch",
        alignItems: "stretch",

        rowGap: 8,
        columnGap: 8,

        items: [
            createGridItem("grid-item-1"),

            createGridItem("grid-item-2"),

            createGridItem("grid-item-3"),

            createGridItem("grid-item-4"),

            createGridItem("grid-item-5"),

            createGridItem("grid-item-6"),
        ],
    };
};

export const defaultGridConfig = createDefaultGridConfig();
