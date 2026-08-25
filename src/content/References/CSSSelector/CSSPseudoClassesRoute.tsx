import { useMemo } from "react";
import { useCSSSelector } from "../../../hooks/useCSSSelector";

export const CssPseudoClassesRoute = () => {
    const { dataPseudoClasses } = useCSSSelector();
    const forRouter = useMemo(
        () =>
            dataPseudoClasses.names?.map((route) => {
                return {
                    title: route,
                    path: ["references", "css-pseudo-classes", route],
                    Component: () => null,
                };
            }) || [],
        [dataPseudoClasses.names],
    );
    console.log(forRouter);
    return forRouter;
};
