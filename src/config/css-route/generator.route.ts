import { Gradient } from "@/content/CSS/Generator/Gradient/Gradient";
import { Pattern } from "@/content/CSS/Generator/Pattern/Pattern";

export const generatorRoute = [
    {
        title: "CSS Gernerator",
        path: ["css", "generator"],
        Component: () => null,
    },
    {
        title: "CSS Gradient Generator",
        path: ["css", "generator", "gradient"],
        Component: Gradient,
    },
    {
        title: "CSS Pattern Generator",
        path: ["css", "generator", "pattern"],
        Component: Pattern,
    },
];
