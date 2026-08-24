import { CSSPseudoSelectorGenerator } from "@/layouts/primary/Menu/References/CSSPseudoSelectorGenerator";
import { getCssPseudoClasses } from "@/services/CSSSelector/css-reference.fetch";
import { CSSPseudoClassesList } from "./CSSPseudoClassesList";

const pseudoClasses = await getCssPseudoClasses();

const names = pseudoClasses.items.map((item) => item.name);

const routes = names.map((name) => {
    const slug = encodeURIComponent(name);

    return {
        title: name,
        path: ["references", "css-pseudo-classes", slug],
        Component: () => <CSSPseudoSelectorGenerator name={name} />,
    };
});

export const cssPseudoClassesRoute = [
    {
        title: "CSS Pseudo Classes",
        path: ["references", "css-pseudo-classes"],
        Component: CSSPseudoClassesList,
    },
];
