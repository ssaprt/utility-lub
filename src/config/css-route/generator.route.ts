import { Gradient } from "@/content/CSS/Generator/Gradient/Gradient";
import { Pattern } from "@/content/CSS/Generator/Pattern/Pattern";

export const generatorRoute = [
    {
        title: "CSS Gradient Generator",
        path: ["css", "generator"],
    },
    {
        title: "CSS Gradient Generator",
        path: ["css", "generator", "gradient"],
        Component: Gradient,
    },
    {
        title: "CSS Gradient Generator",
        path: ["css", "generator", "pattern"],
        Component: Pattern,
    },
];
