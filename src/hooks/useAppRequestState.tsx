"use client";

import { useAppContextActions } from "@/context/appContext";
import { useCallback, useLayoutEffect, useRef } from "react";

interface UseAppRequestStateProps {
    tag: string;
    isLoading?: boolean;
    isFetching?: boolean;
    isError?: boolean;
    hasData?: boolean;
    errorMessage?: string;
    onRetry?: () => unknown | Promise<unknown>;
}

export const useAppRequestState = ({
    tag,
    isLoading = false,
    isFetching = false,
    isError = false,
    hasData = false,
    errorMessage = "Sorry. Failed to load data",
    onRetry,
}: UseAppRequestStateProps) => {
    const { setRequestState, removeRequestState } = useAppContextActions();

    const retryRef = useRef(onRetry);

    useLayoutEffect(() => {
        retryRef.current = onRetry;
    }, [onRetry]);

    const handleRetry = useCallback(() => {
        void retryRef.current?.();
    }, []);

    const canRetry = Boolean(onRetry);

    useLayoutEffect(() => {
        const loading = isLoading || isFetching;

        if (loading) {
            setRequestState({
                tag,
                status: "loading",
            });

            return;
        }

        if (isError && !hasData) {
            setRequestState({
                tag,
                status: "error",
                message: errorMessage,
                onRetry: canRetry ? handleRetry : undefined,
            });

            return;
        }

        removeRequestState({
            tag,
        });
    }, [
        tag,
        isLoading,
        isFetching,
        isError,
        hasData,
        errorMessage,
        canRetry,
        handleRetry,
        setRequestState,
        removeRequestState,
    ]);

    useLayoutEffect(() => {
        return () => {
            removeRequestState({
                tag,
            });
        };
    }, [tag, removeRequestState]);
};
