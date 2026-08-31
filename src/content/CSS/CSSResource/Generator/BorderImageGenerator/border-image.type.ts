export type BorderImageRepeat = "stretch" | "repeat" | "round" | "space";

export type BorderImageSide = "top" | "right" | "bottom" | "left";

export type BorderImageSides = Record<BorderImageSide, number>;

export interface BorderImageConfig {
    source: string;
    canvasColor: string;
    boxColor: string;
    boxWidth: number;
    boxHeight: number;
    slice: BorderImageSides;
    borderWidth: BorderImageSides;
    imageWidth: BorderImageSides;
    outset: BorderImageSides;
    fill: boolean;
    repeatX: BorderImageRepeat;
    repeatY: BorderImageRepeat;
    shorthand: boolean;
}

const allSides = (value: number): BorderImageSides => ({
    top: value,
    right: value,
    bottom: value,
    left: value,
});

export const defaultBorderImageConfig: BorderImageConfig = {
    source:
        "linear-gradient(135deg, #8b5cf6 0 25%, #fbcde6 25% 50%, #8b5cf6 50% 75%, #fbcde6 75%)",
    canvasColor: "#f5f5f5",
    boxColor: "#ffffff",
    boxWidth: 260,
    boxHeight: 190,
    slice: allSides(28),
    borderWidth: allSides(22),
    imageWidth: allSides(1),
    outset: allSides(0),
    fill: false,
    repeatX: "round",
    repeatY: "round",
    shorthand: true,
};

export const borderImageSides: BorderImageSide[] = [
    "top",
    "right",
    "bottom",
    "left",
];

export const borderImageRepeats: BorderImageRepeat[] = [
    "stretch",
    "repeat",
    "round",
    "space",
];
