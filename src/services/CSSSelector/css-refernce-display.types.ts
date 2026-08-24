export type CssSelectorDisplayType = "pseudo-class" | "pseudo-element";

export type CssBaselineDisplayStatus =
    | "widely-available"
    | "newly-available"
    | "limited-availability"
    | "unknown";

export type BrowserDisplayStatus = "supported" | "unsupported" | "unknown";

export type BrowserDisplayName =
    | "chrome"
    | "edge"
    | "firefox"
    | "safari"
    | "opera"
    | "chrome_android"
    | "firefox_android"
    | "opera_android"
    | "safari_ios"
    | "samsunginternet_android"
    | "webview_android"
    | "webview_ios";

export const browserNames = [
    "chrome",
    "edge",
    "firefox",
    "safari",
    "opera",
    "chrome_android",
    "firefox_android",
    "opera_android",
    "safari_ios",
    "samsunginternet_android",
    "webview_android",
    "webview_ios",
] as const;

export type BrowserName = (typeof browserNames)[number];

export interface CssBrowserDisplay {
    name: BrowserDisplayName;
    status: BrowserDisplayStatus;
    versionAdded: string | null;
    versionRemoved: string | null;
    partial: boolean;
    prefix: string | null;
    behindFlag: boolean;
    notes: string[];
}

export interface CssBaselineDisplay {
    status: CssBaselineDisplayStatus;
    lowDate: string | null;
    highDate: string | null;
}

export interface CssSelectorBadgesDisplay {
    deprecated: boolean;
    experimental: boolean;
}

export interface CssSelectorExampleDisplay {
    html: string;
    css: string;
    javascript: string;
    image: string | null;
    video: string | null;
    source: "custom" | "mdn";
    sourceUrl: string | null;
}

export interface CssSelectorLinksDisplay {
    mdn: string | null;
    specifications: string[];
}

export interface CssSelectorDisplay {
    name: string;
    type: CssSelectorDisplayType;
    description: string | null;
    syntax: string | null;
    badges: CssSelectorBadgesDisplay;
    baseline: CssBaselineDisplay;
    browsers: CssBrowserDisplay[];
    example: CssSelectorExampleDisplay | null;
    links: CssSelectorLinksDisplay;
}
