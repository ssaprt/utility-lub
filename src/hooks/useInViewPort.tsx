import { useEffect, useRef, useState } from "react";

export const useInViewport = <T extends HTMLElement>(threshold = 0.2) => {
    const ref = useRef<T>(null);
    const [inViewport, setInViewport] = useState(false);

    useEffect(() => {
        const element = ref.current;

        if (!element) {
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                setInViewport(entry.isIntersecting);
            },
            {
                threshold,
            },
        );

        observer.observe(element);

        return () => {
            observer.disconnect();
        };
    }, [threshold]);

    return { ref, inViewport };
};
