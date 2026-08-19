import { cssCompilerRoute } from "./css-compiler.route";

export const cssUtilsRoute = [
    {
        title: "CSS Utils",
        path: ["css", "utils"],
        Component: () => null,
    },
    ...cssCompilerRoute,
];
