import { cssPseudoClassesRoute } from "./css-pseudo-classes.route";
import { cssPseudoElementsRoute } from "./css-pseudo-elements.route";

export const referencesRoute = [
    {
        title: "References",
        path: ["references"],
        Component: () => null,
    },
    ...cssPseudoClassesRoute,
    ...cssPseudoElementsRoute,
];
