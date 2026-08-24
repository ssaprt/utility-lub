import { api } from "../api";
import {
    CssPseudoClassesResponse,
    CssPseudoElementsResponse,
    CssSelector,
    CssSelectorsResponse,
    GetCssPseudoClassesArgs,
    GetCssPseudoElementsArgs,
    GetCssSelectorArgs,
    GetCssSelectorsArgs,
} from "./css-reference.types";

interface SelectorParams {
    search?: string;
    includeExamples?: boolean;
}

const createSelectorParams = (args: SelectorParams | void) => {
    if (!args) {
        return {};
    }

    return {
        ...(args.search
            ? {
                  search: args.search,
              }
            : {}),
        ...(args.includeExamples !== undefined
            ? {
                  includeExamples: String(args.includeExamples),
              }
            : {}),
    };
};

export const CssReferenceApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getCssSelectors: builder.query<
            CssSelectorsResponse,
            GetCssSelectorsArgs | void
        >({
            query: (args) => ({
                url: "/css-reference/selectors",
                method: "GET",
                params: {
                    ...(args?.type
                        ? {
                              type: args.type,
                          }
                        : {}),
                    ...createSelectorParams(args),
                },
            }),
        }),

        getCssPseudoClasses: builder.query<
            CssPseudoClassesResponse,
            GetCssPseudoClassesArgs | void
        >({
            query: (args) => ({
                url: "/css-reference/selectors",
                method: "GET",
                params: {
                    type: "pseudo-class",
                    ...createSelectorParams(args),
                },
            }),
        }),

        getCssPseudoElements: builder.query<
            CssPseudoElementsResponse,
            GetCssPseudoElementsArgs | void
        >({
            query: (args) => ({
                url: "/css-reference/selectors",
                method: "GET",
                params: {
                    type: "pseudo-element",
                    ...createSelectorParams(args),
                },
            }),
        }),

        getCssSelector: builder.query<CssSelector, GetCssSelectorArgs>({
            query: ({ name }) => ({
                url: "/css-reference/selector",
                method: "GET",
                params: {
                    name,
                },
            }),
        }),
    }),
});

export const {
    useGetCssSelectorsQuery,
    useLazyGetCssSelectorsQuery,

    useGetCssPseudoClassesQuery,
    useLazyGetCssPseudoClassesQuery,

    useGetCssPseudoElementsQuery,
    useLazyGetCssPseudoElementsQuery,

    useGetCssSelectorQuery,
    useLazyGetCssSelectorQuery,
} = CssReferenceApi;
