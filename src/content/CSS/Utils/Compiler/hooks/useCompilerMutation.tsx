"use client";

import {
    type StylesConverterResponse,
    useAutoprefixMutation,
    useCssToLessMutation,
    useCssToLessVariablesMutation,
    useCssToNestedLessMutation,
    useCssToNestedScssMutation,
    useCssToScssMutation,
    useCssToScssVariablesMutation,
    useFormatCssMutation,
    useFormatLessMutation,
    useFormatScssMutation,
    useLessToCssMutation,
    useMinifyCssMutation,
    useOptimizeMutation,
    useRemovePrefixesMutation,
    useScssToCssMutation,
    useValidateStylesMutation,
} from "@/services/StylesConverter/styles-converter.api";
import { useState } from "react";

import { type UniversalCSSCompilerTypeApiList } from "../types/compiler.types";

export const useCompilerMutation = (
    selectFromConfig: UniversalCSSCompilerTypeApiList,
) => {
    const [cssToScss] = useCssToScssMutation();
    const [scssToCss] = useScssToCssMutation();

    const [cssToLess] = useCssToLessMutation();
    const [lessToCss] = useLessToCssMutation();

    const [minifyCss] = useMinifyCssMutation();

    const [formatCss] = useFormatCssMutation();
    const [formatScss] = useFormatScssMutation();
    const [formatLess] = useFormatLessMutation();

    const [cssToNestedScss] = useCssToNestedScssMutation();
    const [cssToNestedLess] = useCssToNestedLessMutation();

    const [cssToScssVariables] = useCssToScssVariablesMutation();
    const [cssToLessVariables] = useCssToLessVariablesMutation();

    const [autoprefix] = useAutoprefixMutation();
    const [removePrefixes] = useRemovePrefixesMutation();

    const [optimize] = useOptimizeMutation();

    const [validateStyles] = useValidateStylesMutation();

    const [data, setData] = useState<StylesConverterResponse>();
    const [error, setError] = useState<unknown>();
    const [isLoading, setIsLoading] = useState(false);

    const reset = () => {
        setData(undefined);
        setError(undefined);
    };

    const convert = async (
        source: string,
    ): Promise<StylesConverterResponse | undefined> => {
        if (!source.trim() || isLoading) {
            return;
        }

        setData(undefined);
        setError(undefined);
        setIsLoading(true);

        try {
            let response: StylesConverterResponse;

            switch (selectFromConfig.requestNameFunction) {
                case "useCssToScssMutation":
                    response = await cssToScss({
                        source,
                    }).unwrap();
                    break;

                case "useScssToCssMutation":
                    response = await scssToCss({
                        source,
                    }).unwrap();
                    break;

                case "useCssToLessMutation":
                    response = await cssToLess({
                        source,
                    }).unwrap();
                    break;

                case "useLessToCssMutation":
                    response = await lessToCss({
                        source,
                    }).unwrap();
                    break;

                case "useMinifyCssMutation":
                    response = await minifyCss({
                        source,
                    }).unwrap();
                    break;

                case "useFormatCssMutation":
                    response = await formatCss({
                        source,
                    }).unwrap();
                    break;

                case "useFormatScssMutation":
                    response = await formatScss({
                        source,
                    }).unwrap();
                    break;

                case "useFormatLessMutation":
                    response = await formatLess({
                        source,
                    }).unwrap();
                    break;

                case "useCssToNestedScssMutation":
                    response = await cssToNestedScss({
                        source,
                    }).unwrap();
                    break;

                case "useCssToNestedLessMutation":
                    response = await cssToNestedLess({
                        source,
                    }).unwrap();
                    break;

                case "useCssToScssVariablesMutation":
                    response = await cssToScssVariables({
                        source,
                    }).unwrap();
                    break;

                case "useCssToLessVariablesMutation":
                    response = await cssToLessVariables({
                        source,
                    }).unwrap();
                    break;

                case "useAutoprefixMutation":
                    response = await autoprefix({
                        source,
                    }).unwrap();
                    break;

                case "useRemovePrefixesMutation":
                    response = await removePrefixes({
                        source,
                    }).unwrap();
                    break;

                case "useOptimizeMutation":
                    response = await optimize({
                        source,
                    }).unwrap();
                    break;

                case "useValidateStylesMutation": {
                    const language = selectFromConfig.language;

                    if (!language) {
                        throw new Error(
                            "Validation language is not configured",
                        );
                    }

                    response = await validateStyles({
                        source,
                        language,
                    }).unwrap();
                    break;
                }

                default:
                    throw new Error("Unsupported compiler operation");
            }

            setData(response);

            return response;
        } catch (requestError: unknown) {
            setError(requestError);

            return undefined;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        convert,
        reset,
        data,
        error,
        isLoading,
        isError: error !== undefined,
    };
};
