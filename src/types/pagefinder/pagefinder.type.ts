export interface PagefindResultData {
    url: string;
    excerpt?: string;
    plain_excerpt?: string;

    meta?: {
        title?: string;
        date?: string;
        description?: string;
        icon?: string;
        [key: string]: string | undefined;
    };
}

interface PagefindResult {
    id: string;
    data: () => Promise<PagefindResultData>;
}

interface PagefindSearchResponse {
    results: PagefindResult[];
}

export interface PagefindApi {
    init: () => Promise<void>;

    search: (
        query: string,
        options?: Record<string, unknown>,
    ) => Promise<PagefindSearchResponse>;
}

declare global {
    interface Window {
        __pagefindPromise?: Promise<PagefindApi>;
    }
}
