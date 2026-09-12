import { lookup } from "node:dns/promises";
import { isIP } from "node:net";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_REDIRECTS = 5;
const CONNECT_TIMEOUT = 10_000;

const isPrivateIpv4 = (address: string) => {
    const parts = address.split(".").map(Number);

    if (parts.length !== 4 || parts.some((part) => !Number.isInteger(part))) {
        return true;
    }

    const [a, b, c] = parts;

    return (
        a === 0 ||
        a === 10 ||
        a === 127 ||
        (a === 100 && b >= 64 && b <= 127) ||
        (a === 169 && b === 254) ||
        (a === 172 && b >= 16 && b <= 31) ||
        (a === 192 && b === 0) ||
        (a === 192 && b === 168) ||
        (a === 198 && b >= 18 && b <= 19) ||
        (a === 198 && b === 51 && c === 100) ||
        (a === 203 && b === 0 && c === 113) ||
        a >= 224
    );
};

const isPrivateIpv6 = (address: string) => {
    const normalized = address.toLowerCase();

    if (normalized.startsWith("::ffff:")) {
        const ipv4 = normalized.slice("::ffff:".length);

        return isIP(ipv4) === 4 ? isPrivateIpv4(ipv4) : true;
    }

    return (
        normalized === "::" ||
        normalized === "::1" ||
        normalized.startsWith("fc") ||
        normalized.startsWith("fd") ||
        normalized.startsWith("fe8") ||
        normalized.startsWith("fe9") ||
        normalized.startsWith("fea") ||
        normalized.startsWith("feb") ||
        normalized.startsWith("ff") ||
        normalized.startsWith("2001:db8")
    );
};

const assertPublicUrl = async (value: string) => {
    let url: URL;

    try {
        url = new URL(value);
    } catch {
        throw new Error("Invalid stream URL");
    }

    if (!["http:", "https:"].includes(url.protocol)) {
        throw new Error("Unsupported stream protocol");
    }

    if (url.username || url.password) {
        throw new Error("Stream credentials are not allowed");
    }

    const hostname = url.hostname.toLowerCase();

    if (
        hostname === "localhost" ||
        hostname.endsWith(".localhost") ||
        hostname.endsWith(".local") ||
        hostname.endsWith(".internal")
    ) {
        throw new Error("Stream host is not allowed");
    }

    if (isIP(hostname)) {
        const privateAddress = hostname.includes(":")
            ? isPrivateIpv6(hostname)
            : isPrivateIpv4(hostname);

        if (privateAddress) {
            throw new Error("Stream address is not allowed");
        }

        return url;
    }

    const addresses = await lookup(hostname, {
        all: true,
        verbatim: true,
    });

    if (
        addresses.length === 0 ||
        addresses.some(({ address }) =>
            address.includes(":")
                ? isPrivateIpv6(address)
                : isPrivateIpv4(address),
        )
    ) {
        throw new Error("Stream address is not allowed");
    }

    return url;
};

const fetchStream = async (sourceUrl: string, request: Request) => {
    let currentUrl = (await assertPublicUrl(sourceUrl)).toString();

    for (let redirect = 0; redirect <= MAX_REDIRECTS; redirect += 1) {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), CONNECT_TIMEOUT);

        const abort = () => controller.abort();
        request.signal.addEventListener("abort", abort, { once: true });

        let response: Response;

        try {
            response = await fetch(currentUrl, {
                cache: "no-store",
                headers: {
                    Accept: "audio/*,application/vnd.apple.mpegurl,application/x-mpegURL,*/*;q=0.8",
                    "Icy-MetaData": "0",
                    ...(request.headers.get("range")
                        ? {
                              Range: request.headers.get("range") as string,
                          }
                        : {}),
                },
                redirect: "manual",
                signal: controller.signal,
            });
        } finally {
            clearTimeout(timeout);
        }

        if (![301, 302, 303, 307, 308].includes(response.status)) {
            return {
                response,
                finalUrl: currentUrl,
            };
        }

        const location = response.headers.get("location");
        await response.body?.cancel();

        if (!location) {
            throw new Error("Stream redirect has no location");
        }

        currentUrl = (
            await assertPublicUrl(new URL(location, currentUrl).toString())
        ).toString();
    }

    throw new Error("Too many stream redirects");
};

const isHls = (response: Response, finalUrl: string) => {
    const contentType = response.headers.get("content-type")?.toLowerCase() ?? "";

    return (
        contentType.includes("mpegurl") ||
        contentType.includes("vnd.apple.mpegurl") ||
        new URL(finalUrl).pathname.toLowerCase().endsWith(".m3u8")
    );
};

const createProxyUrl = (request: Request, value: string) => {
    const url = new URL("/api/radio-stream", request.url);

    url.searchParams.set("url", value);

    return `${url.pathname}${url.search}`;
};

const rewriteHls = (playlist: string, sourceUrl: string, request: Request) => {
    const rewriteUri = (value: string) => {
        const absoluteUrl = new URL(value, sourceUrl).toString();

        return createProxyUrl(request, absoluteUrl);
    };

    return playlist
        .split(/\r?\n/)
        .map((line) => {
            const trimmed = line.trim();

            if (!trimmed) {
                return line;
            }

            if (!trimmed.startsWith("#")) {
                return rewriteUri(trimmed);
            }

            return line.replace(/URI=("([^"]+)"|'([^']+)')/g, (match, quoted, doubleValue, singleValue) => {
                const value = doubleValue ?? singleValue;
                const rewritten = rewriteUri(value);
                const quote = quoted.startsWith("'") ? "'" : '"';

                return `URI=${quote}${rewritten}${quote}`;
            });
        })
        .join("\n");
};

export async function GET(request: Request) {
    const requestUrl = new URL(request.url);
    const streamUrl = requestUrl.searchParams.get("url")?.trim();

    if (!streamUrl) {
        return new Response("Missing stream URL", {
            status: 400,
        });
    }

    try {
        const { response, finalUrl } = await fetchStream(streamUrl, request);

        if (!response.ok || !response.body) {
            await response.body?.cancel();

            return new Response("Radio stream is unavailable", {
                status: response.status || 502,
            });
        }

        const headers = new Headers();
        const contentType = response.headers.get("content-type");
        const contentRange = response.headers.get("content-range");
        const acceptRanges = response.headers.get("accept-ranges");

        headers.set("Cache-Control", "no-store, no-cache, must-revalidate");
        headers.set("Cross-Origin-Resource-Policy", "same-origin");
        headers.set("X-Accel-Buffering", "no");

        if (contentType) {
            headers.set("Content-Type", contentType);
        }

        if (contentRange) {
            headers.set("Content-Range", contentRange);
        }

        if (acceptRanges) {
            headers.set("Accept-Ranges", acceptRanges);
        }

        if (isHls(response, finalUrl)) {
            const playlist = await response.text();
            const rewritten = rewriteHls(playlist, finalUrl, request);

            headers.set("Content-Type", "application/vnd.apple.mpegurl");

            return new Response(rewritten, {
                status: response.status,
                headers,
            });
        }

        return new Response(response.body, {
            status: response.status,
            headers,
        });
    } catch {
        return new Response("Radio stream proxy failed", {
            status: 502,
        });
    }
}
