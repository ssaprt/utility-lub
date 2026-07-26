import { PagefindResultData } from "@/types/pagefinder/pagefinder.type";
import { loadPagefind } from "@/utils/pagefinder";
import { useEffect, useRef, useState } from "react";

export const useSearch = ({}) => {
    const searchRef = useRef<HTMLDivElement>(null);

    const [value, setValue] = useState("");
    const [results, setResults] = useState<PagefindResultData[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const query = value.trim();

        if (query.length < 2) {
            //eslint-disable-next-line
            setResults([]);
            setError(null);
            setIsLoading(false);
            setIsOpen(false);

            return;
        }

        let cancelled = false;

        const timeoutId = window.setTimeout(() => {
            const runSearch = async () => {
                try {
                    setIsLoading(true);
                    setError(null);
                    setIsOpen(true);

                    const pagefind = await loadPagefind();
                    const response = await pagefind.search(query);

                    const loadedResults = await Promise.all(
                        response.results
                            .slice(0, 10)
                            .map((item) => item.data()),
                    );

                    if (cancelled) {
                        return;
                    }

                    setResults(loadedResults);
                } catch (unknownError) {
                    if (cancelled) {
                        return;
                    }

                    const message =
                        unknownError instanceof Error
                            ? unknownError.message
                            : "My, it's very bad...";

                    setResults([]);
                    setError(message);
                } finally {
                    if (!cancelled) {
                        setIsLoading(false);
                    }
                }
            };

            void runSearch();
        }, 300);

        return () => {
            cancelled = true;
            window.clearTimeout(timeoutId);
        };
    }, [value]);

    useEffect(() => {
        const handlePointerDown = (event: PointerEvent) => {
            const target = event.target;

            if (!(target instanceof Node)) {
                return;
            }

            if (!searchRef.current?.contains(target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("pointerdown", handlePointerDown);

        return () => {
            document.removeEventListener("pointerdown", handlePointerDown);
        };
    }, []);

    return {
        setValue,
        setResults,
        setError,
        setIsLoading,
        setIsOpen,
        searchRef,
        value,
        status: { isLoading, isOpen, error, results },
        isLoading,
        isOpen,
        error,
        results,
    };
};
