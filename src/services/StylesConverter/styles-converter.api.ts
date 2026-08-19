import { api } from "../api";

export type StyleLanguage = "css" | "scss" | "less";

export type StyleOperation =
    | "css-to-scss"
    | "scss-to-css"
    | "css-to-less"
    | "less-to-css"
    | "minify-css"
    | "format-css"
    | "format-scss"
    | "format-less"
    | "css-to-nested-scss"
    | "css-to-nested-less"
    | "css-to-scss-variables"
    | "css-to-less-variables"
    | "autoprefix"
    | "remove-prefixes"
    | "optimize"
    | "validate";

export interface StylesConverterOptions {
    browsers?: string[];
    minVariableOccurrences?: number;
    bemNesting?: boolean;
}

export interface StyleValidationIssue {
    message: string;
    line?: number;
    column?: number;
}

export interface ExtractedStyleVariable {
    name: string;
    value: string;
    occurrences: number;
}

export interface StylesConverterResponse {
    success: boolean;
    operation: StyleOperation;
    result: string | null;
    valid?: boolean;
    errors: StyleValidationIssue[];
    warnings: StyleValidationIssue[];
    variables?: ExtractedStyleVariable[];
}

interface BaseStylesConverterArgs {
    source: string;
}

interface StylesConverterWithOptionsArgs extends BaseStylesConverterArgs {
    options?: StylesConverterOptions;
}

interface ValidateStylesArgs extends BaseStylesConverterArgs {
    language: StyleLanguage;
}

const createBody = (
    operation: StyleOperation,
    args: StylesConverterWithOptionsArgs,
) => {
    return {
        operation,
        source: args.source,
        ...(args.options
            ? {
                  options: args.options,
              }
            : {}),
    };
};

export const StylesConverterApi = api.injectEndpoints({
    endpoints: (builder) => ({
        cssToScss: builder.mutation<
            StylesConverterResponse,
            BaseStylesConverterArgs
        >({
            query: ({ source }) => ({
                url: "/styles-converter/convert",
                method: "POST",
                body: {
                    operation: "css-to-scss",
                    source,
                },
            }),
        }),

        scssToCss: builder.mutation<
            StylesConverterResponse,
            BaseStylesConverterArgs
        >({
            query: ({ source }) => ({
                url: "/styles-converter/convert",
                method: "POST",
                body: {
                    operation: "scss-to-css",
                    source,
                },
            }),
        }),

        cssToLess: builder.mutation<
            StylesConverterResponse,
            BaseStylesConverterArgs
        >({
            query: ({ source }) => ({
                url: "/styles-converter/convert",
                method: "POST",
                body: {
                    operation: "css-to-less",
                    source,
                },
            }),
        }),

        lessToCss: builder.mutation<
            StylesConverterResponse,
            BaseStylesConverterArgs
        >({
            query: ({ source }) => ({
                url: "/styles-converter/convert",
                method: "POST",
                body: {
                    operation: "less-to-css",
                    source,
                },
            }),
        }),

        minifyCss: builder.mutation<
            StylesConverterResponse,
            BaseStylesConverterArgs
        >({
            query: ({ source }) => ({
                url: "/styles-converter/convert",
                method: "POST",
                body: {
                    operation: "minify-css",
                    source,
                },
            }),
        }),

        formatCss: builder.mutation<
            StylesConverterResponse,
            BaseStylesConverterArgs
        >({
            query: ({ source }) => ({
                url: "/styles-converter/convert",
                method: "POST",
                body: {
                    operation: "format-css",
                    source,
                },
            }),
        }),

        formatScss: builder.mutation<
            StylesConverterResponse,
            BaseStylesConverterArgs
        >({
            query: ({ source }) => ({
                url: "/styles-converter/convert",
                method: "POST",
                body: {
                    operation: "format-scss",
                    source,
                },
            }),
        }),

        formatLess: builder.mutation<
            StylesConverterResponse,
            BaseStylesConverterArgs
        >({
            query: ({ source }) => ({
                url: "/styles-converter/convert",
                method: "POST",
                body: {
                    operation: "format-less",
                    source,
                },
            }),
        }),

        cssToNestedScss: builder.mutation<
            StylesConverterResponse,
            StylesConverterWithOptionsArgs
        >({
            query: (args) => ({
                url: "/styles-converter/convert",
                method: "POST",
                body: createBody("css-to-nested-scss", args),
            }),
        }),

        cssToNestedLess: builder.mutation<
            StylesConverterResponse,
            StylesConverterWithOptionsArgs
        >({
            query: (args) => ({
                url: "/styles-converter/convert",
                method: "POST",
                body: createBody("css-to-nested-less", args),
            }),
        }),

        cssToScssVariables: builder.mutation<
            StylesConverterResponse,
            StylesConverterWithOptionsArgs
        >({
            query: (args) => ({
                url: "/styles-converter/convert",
                method: "POST",
                body: createBody("css-to-scss-variables", args),
            }),
        }),

        cssToLessVariables: builder.mutation<
            StylesConverterResponse,
            StylesConverterWithOptionsArgs
        >({
            query: (args) => ({
                url: "/styles-converter/convert",
                method: "POST",
                body: createBody("css-to-less-variables", args),
            }),
        }),

        autoprefix: builder.mutation<
            StylesConverterResponse,
            StylesConverterWithOptionsArgs
        >({
            query: (args) => ({
                url: "/styles-converter/convert",
                method: "POST",
                body: createBody("autoprefix", args),
            }),
        }),

        removePrefixes: builder.mutation<
            StylesConverterResponse,
            StylesConverterWithOptionsArgs
        >({
            query: (args) => ({
                url: "/styles-converter/convert",
                method: "POST",
                body: createBody("remove-prefixes", args),
            }),
        }),

        optimize: builder.mutation<
            StylesConverterResponse,
            BaseStylesConverterArgs
        >({
            query: ({ source }) => ({
                url: "/styles-converter/convert",
                method: "POST",
                body: {
                    operation: "optimize",
                    source,
                },
            }),
        }),

        validateStyles: builder.mutation<
            StylesConverterResponse,
            ValidateStylesArgs
        >({
            query: ({ source, language }) => ({
                url: "/styles-converter/convert",
                method: "POST",
                body: {
                    operation: "validate",
                    source,
                    language,
                },
            }),
        }),
    }),
});

export const {
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
} = StylesConverterApi;
