import { cssCompilerRoute } from "./css-compiler.route";
import { stylesRoute } from "./css-styles.route";

export const cssUtilsRoute = [
    {
        title: "CSS Utils",
        path: ["css", "utils"],
        Component: () => null,
    },
    ...cssCompilerRoute,
    ...stylesRoute,
];
