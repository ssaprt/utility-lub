import { BrowserName } from "./css-refernce-display.types";

export type CssSelectorType = "pseudo-class" | "pseudo-element";

export type CssBaselineStatus =
    | "widely-available"
    | "newly-available"
    | "limited-availability"
    | null;

export type CssDescriptionSource =
    | "web-features"
    | "bcd"
    | "mdn"
    | "webref"
    | null;

export type BrowserSupportSource = "bcd" | "web-features" | null;

export interface BrowserSupport {
    supported: boolean | null;
    versionAdded: string | null;
    versionRemoved: string | null;
    partial: boolean;
    prefix: string | null;
    alternativeName: string | null;
    behindFlag: boolean;
    notes: string[];
    source: BrowserSupportSource;
}

export type CssSelectorBrowsers = Record<BrowserName, BrowserSupport>;

export interface CssSelectorStatus {
    standard: boolean | null;
    deprecated: boolean | null;
    experimental: boolean | null;
}

export interface CssSelectorBaseline {
    status: CssBaselineStatus;
    lowDate: string | null;
    highDate: string | null;
}

export interface CssSelectorLinks {
    mdn: string | null;
    specifications: string[];
}

export interface CssSelectorExample {
    html: string;
    css: string;
    javascript: string;
    image: string | null;
    video: string | null;
    source: "custom" | "mdn";
    sourceUrl: string | null;
}

export interface CssSelectorBase {
    name: string;
    description: string | null;
    descriptionSource: CssDescriptionSource;
    syntax: string | null;
    compatKey: string | null;
    webFeaturesId: string | null;
    status: CssSelectorStatus;
    baseline: CssSelectorBaseline;
    browsers: CssSelectorBrowsers;
    links: CssSelectorLinks;
    example: CssSelectorExample | null;
}

export interface CssPseudoClass extends CssSelectorBase {
    type: "pseudo-class";
}

export interface CssPseudoElement extends CssSelectorBase {
    type: "pseudo-element";
}

export type CssSelector = CssPseudoClass | CssPseudoElement;

export interface CssSelectorsResponse {
    count: number;
    items: CssSelector[];
}

export interface CssPseudoClassesResponse {
    count: number;
    items: CssPseudoClass[];
}

export interface CssPseudoElementsResponse {
    count: number;
    items: CssPseudoElement[];
}

export interface GetCssSelectorsArgs {
    type?: CssSelectorType;
    search?: string;
    includeExamples?: boolean;
}

export interface GetCssPseudoClassesArgs {
    search?: string;
    includeExamples?: boolean;
}

export interface GetCssPseudoElementsArgs {
    search?: string;
    includeExamples?: boolean;
}

export interface GetCssSelectorArgs {
    name: string;
}
