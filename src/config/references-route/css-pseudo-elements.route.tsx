import { CSSPseudoSelectorGenerator } from "@/layouts/primary/Menu/References/CSSPseudoSelectorGenerator";
import { getCssPseudoElements } from "@/services/CSSSelector/css-reference.fetch";

const pseudoElements = await getCssPseudoElements();
const names = pseudoElements?.items.map((item) => item.name);
const routes =
    names.map((route) => {
        const slug = encodeURIComponent(route);
        return {
            title: route,
            path: ["references", "css-pseudo-elements", slug],
            Component: () => <CSSPseudoSelectorGenerator name={route} />,
        };
    }) || [];

export const cssPseudoElementsRoute = [
    {
        title: "CSS Pseudo Elements",
        path: ["references", "css-pseudo-elements"],
        Component: () => null,
    },
];
