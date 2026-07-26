"use client";

import { useEffect, useState } from "react";

const breakpoints = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    "2xl": 1536,
} as const;

type Breakpoint = keyof typeof breakpoints;

export const useBreakpoint = (breakpoint: Breakpoint) => {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const observer = new ResizeObserver(() => {
            update();
        });

        observer.observe(document.body);

        const media = window.matchMedia(
            `(min-width: ${breakpoints[breakpoint]}px)`,
        );

        const update = () => {
            setMatches(media.matches);
        };

        update();

        media.addEventListener("change", update);

        return () => {
            media.removeEventListener("change", update);
            observer.disconnect();
        };
    }, [breakpoint]);

    return matches;
};
