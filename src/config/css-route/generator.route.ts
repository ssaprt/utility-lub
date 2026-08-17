import { BoxShadow } from "@/content/CSS/Generator/BoxShadow/BoxShadow";
import { ClipPathGenerator } from "@/content/CSS/Generator/ClipPatch/ClipPatch";
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
    {
        title: "CSS Clip Patch Generator",
        path: ["css", "generator", "clip-patch"],
        Component: ClipPathGenerator,
    },
    {
        title: "CSS Box Shadow Generator",
        path: ["css", "generator", "box-shadow"],
        Component: BoxShadow,
    },
];
