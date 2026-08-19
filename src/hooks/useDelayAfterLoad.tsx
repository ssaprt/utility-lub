import { useEffect, useRef, useState } from "react";

export const useDelayAfterLoad = ({
    isLoading,
    delay = 300,
}: {
    isLoading: boolean;
    delay?: number;
}) => {
    const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const wasLoading = useRef(false);

    const [delayLoad, setDelayLoad] = useState(false);

    useEffect(() => {
        if (timer.current) {
            clearTimeout(timer.current);
            timer.current = null;
        }

        if (isLoading) {
            wasLoading.current = true;
            //eslint-disable-next-line
            setDelayLoad(true);

            return;
        }

        if (!wasLoading.current) {
            return;
        }

        timer.current = setTimeout(() => {
            setDelayLoad(false);
            wasLoading.current = false;
            timer.current = null;
        }, delay);

        return () => {
            if (timer.current) {
                clearTimeout(timer.current);
                timer.current = null;
            }
        };
    }, [isLoading, delay]);

    return {
        delayLoad,
    };
};
