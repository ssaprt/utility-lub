"use client";

import { useEffect, useState } from "react";

export const useUserCountryCode = () => {
    const [countryCode, setCountryCode] = useState<string | null>(null);

    useEffect(() => {
        const locale = new Intl.Locale(navigator.language).maximize();
        //eslint-disable-next-line
        setCountryCode(locale.region ?? null);
    }, []);

    return countryCode;
};
