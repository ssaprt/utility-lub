import { BrowserDisplayName } from "@/services/CSSSelector/css-refernce-display.types";

export type BrowserDeviceType = "desktop" | "mobile" | "webview";

export interface BrowserIconData {
    icon: string;
    name: string;
    typeDevice: BrowserDeviceType;
}

export const iconsDataSupports = {
    chrome: {
        icon: "browser/chrome.svg",
        name: "Google Chrome",
        typeDevice: "desktop",
    },

    edge: {
        icon: "browser/edge.svg",
        name: "Microsoft Edge",
        typeDevice: "desktop",
    },

    firefox: {
        icon: "browser/firefox.svg",
        name: "Mozilla Firefox",
        typeDevice: "desktop",
    },

    safari: {
        icon: "browser/safari.svg",
        name: "Safari",
        typeDevice: "desktop",
    },

    opera: {
        icon: "browser/opera.svg",
        name: "Opera",
        typeDevice: "desktop",
    },

    chrome_android: {
        icon: "browser/chrome.svg",
        name: "Google Chrome for Android",
        typeDevice: "mobile",
    },

    firefox_android: {
        icon: "browser/firefox.svg",
        name: "Mozilla Firefox for Android",
        typeDevice: "mobile",
    },

    opera_android: {
        icon: "browser/opera.svg",
        name: "Opera for Android",
        typeDevice: "mobile",
    },

    safari_ios: {
        icon: "browser/safari.svg",
        name: "Safari for iOS",
        typeDevice: "mobile",
    },

    samsunginternet_android: {
        icon: "browser/samsung.svg",
        name: "Samsung Internet",
        typeDevice: "mobile",
    },

    webview_android: {
        icon: "browser/android.svg",
        name: "Android WebView",
        typeDevice: "webview",
    },

    webview_ios: {
        icon: "browser/safari.svg",
        name: "iOS WebView",
        typeDevice: "webview",
    },
} satisfies Record<BrowserDisplayName, BrowserIconData>;
