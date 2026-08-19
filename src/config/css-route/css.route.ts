import { cssUtilsRoute } from "./css-utils.route";
import { generatorRoute } from "./generator.route";

export const cssRoute = [
    {
        title: "CSS Gradient Generator",
        path: ["css"],
        Component: () => null,
    },
    ...generatorRoute,
    ...cssUtilsRoute,
];
