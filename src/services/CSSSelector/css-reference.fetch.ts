import { apiUrl } from "@/lib/api/config";
import {
    CssPseudoClassesResponse,
    CssPseudoElementsResponse,
    CssSelector,
    CssSelectorsResponse,
    GetCssPseudoClassesArgs,
    GetCssPseudoElementsArgs,
    GetCssSelectorsArgs,
} from "./css-reference.types";

const API_URL = apiUrl;

const createSearchParams = (args?: {
    type?: "pseudo-class" | "pseudo-element";
    search?: string;
    includeExamples?: boolean;
}) => {
    const params = new URLSearchParams();

    if (args?.type) {
        params.set("type", args.type);
    }

    if (args?.search) {
        params.set("search", args.search);
    }

    if (args?.includeExamples !== undefined) {
        params.set("includeExamples", String(args.includeExamples));
    }

    return params;
};

const fetchCssReference = async <T>(url: string): Promise<T> => {
    if (!API_URL) {
        throw new Error("API_URL is not defined");
    }

    const response = await fetch(`${API_URL}${url}`);

    if (!response.ok) {
        throw new Error(
            `CSS Reference request failed: ${response.status} ${response.statusText}`,
        );
    }

    return (await response.json()) as T;
};

export const getCssSelectors = async (
    args?: GetCssSelectorsArgs,
): Promise<CssSelectorsResponse> => {
    const params = createSearchParams(args);

    return fetchCssReference<CssSelectorsResponse>(
        `/css-reference/selectors?${params.toString()}`,
    );
};

export const getCssPseudoClasses = async (
    args?: GetCssPseudoClassesArgs,
): Promise<CssPseudoClassesResponse> => {
    const params = createSearchParams({
        type: "pseudo-class",
        ...args,
    });

    return fetchCssReference<CssPseudoClassesResponse>(
        `/css-reference/selectors?${params.toString()}`,
    );
};

export const getCssPseudoElements = async (
    args?: GetCssPseudoElementsArgs,
): Promise<CssPseudoElementsResponse> => {
    const params = createSearchParams({
        type: "pseudo-element",
        ...args,
    });

    return fetchCssReference<CssPseudoElementsResponse>(
        `/css-reference/selectors?${params.toString()}`,
    );
};

export const getCssSelector = async (name: string): Promise<CssSelector> => {
    const params = new URLSearchParams({
        name,
    });

    return fetchCssReference<CssSelector>(
        `/css-reference/selector?${params.toString()}`,
    );
};
