import { PagefindApi } from "@/types/pagefinder/pagefinder.type";

export const loadPagefind = (): Promise<PagefindApi> => {
    if (typeof window === "undefined") {
        return Promise.reject(new Error("Pagefind доступен только в браузере"));
    }

    if (window.__pagefindPromise) {
        return window.__pagefindPromise;
    }

    if (loaderPromise) {
        return loaderPromise;
    }

    loaderPromise = new Promise<PagefindApi>((resolve, reject) => {
        const resolvePagefind = async () => {
            try {
                if (!window.__pagefindPromise) {
                    throw new Error("Pagefind API not found");
                }

                const pagefind = await window.__pagefindPromise;

                resolve(pagefind);
            } catch (error) {
                loaderPromise = null;
                reject(error);
            }
        };

        const existingScript = document.querySelector<HTMLScriptElement>(
            'script[data-pagefind-loader="true"]',
        );

        if (existingScript) {
            if (window.__pagefindPromise) {
                void resolvePagefind();
                return;
            }

            existingScript.addEventListener(
                "load",
                () => void resolvePagefind(),
                { once: true },
            );

            existingScript.addEventListener(
                "error",
                () => {
                    loaderPromise = null;
                    reject(new Error("Error Pagefind loader"));
                },
                { once: true },
            );

            return;
        }

        const script = document.createElement("script");

        script.type = "module";
        script.src = "/pagefind-loader.js";
        script.dataset.pagefindLoader = "true";

        script.addEventListener("load", () => void resolvePagefind(), {
            once: true,
        });

        script.addEventListener(
            "error",
            () => {
                loaderPromise = null;

                reject(new Error("File /pagefind-loader.js not found"));
            },
            { once: true },
        );

        document.head.appendChild(script);
    });

    return loaderPromise;
};

let loaderPromise: Promise<PagefindApi> | null = null;
