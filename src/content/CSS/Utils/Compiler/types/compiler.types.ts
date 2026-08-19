import {
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

export const UniversalCSSCompilerTypeApi = {
    useCssToScssMutation,
    useScssToCssMutation,
    useCssToLessMutation,
    useLessToCssMutation,
    useMinifyCssMutation,
    useFormatCssMutation,
    useFormatScssMutation,
    useFormatLessMutation,
    useCssToNestedScssMutation,
    useCssToNestedLessMutation,
    useCssToScssVariablesMutation,
    useCssToLessVariablesMutation,
    useAutoprefixMutation,
    useRemovePrefixesMutation,
    useOptimizeMutation,
    useValidateStylesMutation,
} as const;

export type UniversalCSSCompilerTypeApi =
    keyof typeof UniversalCSSCompilerTypeApi;

export type UniversalCSSCompilerLanguage = "css" | "scss" | "less";

export interface UniversalCSSCompilerTypeApiList {
    titleLink: string;
    requestNameFunction: UniversalCSSCompilerTypeApi;
    placeholder: string;
    actionButtonText: string;
    language: UniversalCSSCompilerLanguage;
}

export interface UniversalCSSCompilerInterface {
    requestNameFunction: UniversalCSSCompilerTypeApi;
}
