declare module "@webref/css" {
    export interface WebrefSelector {
        name: string;
        href: string;
        prose?: string;
        syntax?: string;
    }

    export interface WebrefCssList {
        atrules: unknown[];
        functions: unknown[];
        properties: unknown[];
        selectors: WebrefSelector[];
        types: unknown[];
    }

    export interface WebrefCssIndex {
        atrules: Record<string, unknown>;
        functions: Record<string, unknown>;
        properties: Record<string, unknown>;
        selectors: Record<string, WebrefSelector>;
        types: Record<string, unknown>;
    }

    interface WebrefCss {
        listAll(): Promise<WebrefCssList>;
        index(): Promise<WebrefCssIndex>;
    }

    const css: WebrefCss;

    export default css;
}
