import { ClipPathConfig } from "./clip-path.type";

export const defaultClipPathConfig: ClipPathConfig = {
    shapeType: "polygon",

    polygonPreset: "square",

    polygonPoints: [
        {
            id: "point-1",
            x: 10,
            y: 10,
        },
        {
            id: "point-2",
            x: 90,
            y: 10,
        },
        {
            id: "point-3",
            x: 90,
            y: 90,
        },
        {
            id: "point-4",
            x: 10,
            y: 90,
        },
    ],

    circleRadius: 40,
    circleX: 50,
    circleY: 50,

    ellipseRadiusX: 45,
    ellipseRadiusY: 30,
    ellipseX: 50,
    ellipseY: 50,

    insetTop: 10,
    insetRight: 10,
    insetBottom: 10,
    insetLeft: 10,
    insetRadius: 5,
};
