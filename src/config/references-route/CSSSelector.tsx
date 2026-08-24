import {
    useGetCssPseudoClassesQuery,
    useGetCssPseudoElementsQuery,
} from "@/services/CSSSelector/css-selector.api";
import { useMemo } from "react";

export const useCSSSelector = () => {
    const {
        data: pseudoElements,
        isLoading: pseudoElementsLoading,
        isFetching: pseudoElementsFetching,
        isError: pseudoElementsError,
    } = useGetCssPseudoElementsQuery();

    const {
        data: pseudoClasses,
        isLoading: pseudoClassesLoading,
        isFetching: pseudoClassesFetching,
        isError: pseudoClassesError,
    } = useGetCssPseudoClassesQuery();

    const routePseudoClasses = useMemo(() => {
        return pseudoClasses?.items.map((item) => item.name);
    }, [pseudoClasses]);

    const routePseudoElements = useMemo(() => {
        return pseudoElements?.items.map((item) => item.name);
    }, [pseudoElements]);

    const dataPseudoClasses = useMemo(
        () => ({
            names: routePseudoClasses,
            loading: pseudoClassesLoading,
            isFetching: pseudoClassesFetching,
            isError: pseudoClassesError,
        }),
        [
            routePseudoClasses,
            pseudoClassesLoading,
            pseudoClassesFetching,
            pseudoClassesError,
        ],
    );

    const dataPseudoElements = useMemo(
        () => ({
            names: routePseudoElements,
            loading: pseudoElementsLoading,
            isFetching: pseudoElementsFetching,
            isError: pseudoElementsError,
        }),
        [
            routePseudoElements,
            pseudoElementsLoading,
            pseudoElementsFetching,
            pseudoElementsError,
        ],
    );

    return { dataPseudoClasses, dataPseudoElements };
};
