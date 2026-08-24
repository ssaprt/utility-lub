import { cssCompilerRoute } from "./css-compiler.route";
import { cssViewerRoute } from "./css-viewer.route";

export const cssUtilsRoute = [
    {
        title: "CSS Utils",
        path: ["css", "utils"],
        Component: () => null,
    },
    ...cssCompilerRoute,
    ...cssViewerRoute,
];
