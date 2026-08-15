import { CSS } from "@/content/CSS/CSS";
import { generatorRoute } from "./generator.route";

export const cssRoute = [
    {
        title: "CSS Gradient Generator",
        path: ["css"],
        Component: CSS,
    },
    ...generatorRoute,
];
