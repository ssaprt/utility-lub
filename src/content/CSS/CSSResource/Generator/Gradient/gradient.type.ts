export type GradientType = "linear" | "radial" | "conic";
export type RadialShape = "circle" | "ellipse";

export interface GradientStop {
    id: string;
    color: string;
    offset: number;
}

export interface GradientConfig {
    gradientType: GradientType;
    repeating: boolean;
    angle: number;
    radialShape: RadialShape;
    positionX: number;
    positionY: number;
    stops: GradientStop[];
}

export const defaultGradientConfig: GradientConfig = {
    gradientType: "linear",
    repeating: false,
    angle: 90,
    radialShape: "ellipse",
    positionX: 50,
    positionY: 50,
    stops: [
        {
            id: "start",
            color: "#7c3aed",
            offset: 0,
        },
        {
            id: "end",
            color: "#ec4899",
            offset: 100,
        },
    ],
};
