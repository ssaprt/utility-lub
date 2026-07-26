type NavigatorWithUAData = Navigator & {
    userAgentData?: {
        mobile?: boolean;
    };
};

export const isMobileDevice = (): boolean => {
    if (typeof navigator === "undefined") {
        return false;
    }

    const nav = navigator as NavigatorWithUAData;

    if (typeof nav.userAgentData?.mobile === "boolean") {
        return nav.userAgentData.mobile;
    }

    const isIPadOS = /Macintosh/i.test(nav.userAgent) && nav.maxTouchPoints > 1;

    const isMobileUserAgent =
        /Android|iPhone|iPad|iPod|IEMobile|Opera Mini/i.test(nav.userAgent);

    return isIPadOS || isMobileUserAgent;
};
