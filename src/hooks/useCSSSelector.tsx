import {
    useGetCssPseudoClassesQuery,
    useGetCssPseudoElementsQuery,
} from "@/services/CSSSelector/css-selector.api";
import { useCallback, useMemo } from "react";

export const useCSSSelector = () => {
    const {
        data: pseudoElements,
        isLoading: pseudoElementsLoading,
        isFetching: pseudoElementsFetching,
        isError: pseudoElementsError,
        refetch: refetchPseudoElements,
    } = useGetCssPseudoElementsQuery();

    const {
        data: pseudoClasses,
        isLoading: pseudoClassesLoading,
        isFetching: pseudoClassesFetching,
        isError: pseudoClassesError,
        refetch: refetchPseudoClasses,
    } = useGetCssPseudoClassesQuery();

    const routePseudoClasses = useMemo(
        () => pseudoClasses?.items.map((item) => item.name) ?? [],
        [pseudoClasses],
    );

    const routePseudoElements = useMemo(
        () => pseudoElements?.items.map((item) => item.name) ?? [],
        [pseudoElements],
    );

    const isLoading = pseudoElementsLoading || pseudoClassesLoading;

    const isFetching = pseudoElementsFetching || pseudoClassesFetching;

    const isError = pseudoElementsError || pseudoClassesError;

    const refetch = useCallback(() => {
        if (pseudoElementsError) {
            void refetchPseudoElements();
        }

        if (pseudoClassesError) {
            void refetchPseudoClasses();
        }
    }, [
        pseudoElementsError,
        pseudoClassesError,
        refetchPseudoElements,
        refetchPseudoClasses,
    ]);

    return {
        dataPseudoClasses: {
            names: routePseudoClasses,
        },
        dataPseudoElements: {
            names: routePseudoElements,
        },
        isLoading,
        isFetching,
        isError,
        refetch,
    };
};
