import { useGetCssSelectorQuery } from "@/services/CSSSelector/css-selector.api";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const iframeBaseCSS = `
    :root {
        --foreground: #111111;
        --background: #ffffff;
    }

    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }

    html,
    body {
        margin: 0;
        padding: 0;
        width: 100%;
        min-height: 100%;
        color: var(--foreground);
        background: var(--background);
    }

    body {
        min-height: 100vh;
        padding: 12px;
        overflow: auto;
        font-family:
            system-ui,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;
        font-size: 14px;
        line-height: 1.5;
    }

    a {
        color: var(--foreground);
    }

    button,
    input,
    select,
    textarea {
        color: var(--foreground);
        font: inherit;
    }

    img,
    picture,
    video,
    canvas,
    svg {
        display: block;
        max-width: 100%;
    }

    video {
        width: 100%;
        height: auto;
    }
`;

const iframeBootstrap = `
(() => {
    window.addEventListener("message", (event) => {
        if (event.source !== window.parent) return;

        const data = event.data;

        if (!data || data.type !== "css-example-theme") return;

        if (typeof data.foreground === "string") {
            document.documentElement.style.setProperty(
                "--foreground",
                data.foreground
            );
        }

        if (typeof data.background === "string") {
            document.documentElement.style.setProperty(
                "--background",
                data.background
            );
        }
    });

    const preventLinkNavigation = (event) => {
        if (!(event.target instanceof Element)) return;

        const link = event.target.closest("a[href], area[href]");

        if (!link) return;

        event.preventDefault();

        link.setAttribute(
            "data-preview-visited",
            "true"
        );
    };

    document.addEventListener(
        "click",
        preventLinkNavigation,
        true
    );

    document.addEventListener(
        "auxclick",
        preventLinkNavigation,
        true
    );

    document.addEventListener(
        "submit",
        (event) => event.preventDefault(),
        true
    );
})();
`;

const escapeAttribute = (value: string) =>
    value
        .replaceAll("&", "&amp;")
        .replaceAll('"', "&quot;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;");

const resolveAssetUrl = (value: string | null | undefined, origin: string) => {
    if (!value) return "";

    if (value.startsWith("data:") || value.startsWith("blob:")) {
        return value;
    }

    try {
        const url = new URL(value, origin);

        if (url.origin !== origin) {
            return "";
        }

        return url.href;
    } catch {
        return "";
    }
};

export const Result = ({ name }: { name: string }) => {
    const iframeRef = useRef<HTMLIFrameElement>(null);

    const [origin, setOrigin] = useState<string | null>(null);

    const { data } = useGetCssSelectorQuery({
        name,
    });

    useEffect(() => {
        //eslint-disable-next-line
        setOrigin(window.location.origin);
    }, []);

    const syncTheme = useCallback(() => {
        const iframe = iframeRef.current;

        if (!iframe) return;

        const styles = getComputedStyle(iframe);

        const foreground =
            styles.getPropertyValue("--foreground").trim() || "#111111";

        const background =
            styles.getPropertyValue("--background").trim() || "#ffffff";

        iframe.contentWindow?.postMessage(
            {
                type: "css-example-theme",
                foreground,
                background,
            },
            "*",
        );
    }, []);

    useEffect(() => {
        if (!origin) return;

        const iframe = iframeRef.current;

        if (!iframe) return;

        const observer = new MutationObserver(syncTheme);

        const observed = new Set<Element>();

        const observe = (element: Element | null) => {
            if (!element || observed.has(element)) {
                return;
            }

            observed.add(element);

            observer.observe(element, {
                attributes: true,
                attributeFilter: ["class", "style", "data-theme"],
            });
        };

        observe(document.documentElement);
        observe(document.body);

        let element: HTMLElement | null = iframe;

        while (element) {
            observe(element);
            element = element.parentElement;
        }

        const media = window.matchMedia("(prefers-color-scheme: dark)");

        media.addEventListener("change", syncTheme);

        return () => {
            observer.disconnect();

            media.removeEventListener("change", syncTheme);
        };
    }, [origin, syncTheme]);

    const srcDoc = useMemo(() => {
        if (!origin) return "";

        const example = data?.example;

        const image = escapeAttribute(resolveAssetUrl(example?.image, origin));

        const video = escapeAttribute(resolveAssetUrl(example?.video, origin));

        const html = (example?.html ?? "")
            .replaceAll("{{image}}", image)
            .replaceAll("{{video}}", video);

        const css = (example?.css ?? "").replace(/<\/style/gi, "<\\/style");

        const javascript = (example?.javascript ?? "").replace(
            /<\/script/gi,
            "<\\/script",
        );

        return `
            <!doctype html>

            <html>
                <head>
                    <meta charset="UTF-8" />

                    <meta
                        http-equiv="Content-Security-Policy"
                        content="
                            default-src 'none';
                            style-src 'unsafe-inline';
                            script-src 'unsafe-inline';
                            img-src ${origin} data: blob:;
                            media-src ${origin} data: blob:;
                            font-src data:;
                            connect-src 'none';
                            object-src 'none';
                            frame-src 'none';
                            worker-src 'none';
                            base-uri 'none';
                            form-action 'none';
                        "
                    />

                    <style>
                        ${iframeBaseCSS}
                        ${css}
                    </style>

                    <script>
                        ${iframeBootstrap}
                    <\/script>
                </head>

                <body>
                    ${html}

                    ${javascript ? `<script>${javascript}<\/script>` : ""}
                </body>
            </html>
        `;
    }, [data, origin]);

    if (!origin) {
        return (
            <div className="w-full h-full min-h-[300px] rounded-[4px] bg-fg/5" />
        );
    }

    return (
        <iframe
            key={`${name}-${origin}`}
            ref={iframeRef}
            srcDoc={srcDoc}
            title={`${name} example`}
            sandbox="allow-scripts allow-forms"
            allow="fullscreen; picture-in-picture"
            referrerPolicy="no-referrer"
            onLoad={syncTheme}
            className="w-full h-full min-h-[300px] border-0 rounded-[4px]! bg-transparent"
        />
    );
};
