"use client";

import { IconDownload, IconFileNeutral } from "@tabler/icons-react";
import type { ReactNode } from "react";
import { Loader } from "../animationIcons/Loader/Loader";
import { GeneralButton } from "../button/GeneralButton/GeneralButton";

interface DataLoaderProps {
    children: ReactNode;
    isLoading?: boolean;
    isFetching?: boolean;
    isError?: boolean;
    errorText?: string;
    onRetry?: () => void | Promise<unknown>;
}

export const DataLoader = ({
    children,
    isLoading,
    isFetching,
    isError,
    errorText = "Failed to load data",
    onRetry,
}: DataLoaderProps) => {
    const enabled =
        isLoading !== undefined ||
        isFetching !== undefined ||
        isError !== undefined;

    if (!enabled) {
        return children;
    }

    const loading = isLoading === true || isFetching === true;

    return (
        <div className="relative min-h-10 w-full" aria-busy={loading}>
            {loading && <Loader visible mode="wave" />}

            {!loading && isError && (
                <div className="row-center-2 data-loader-fade-in">
                    <IconFileNeutral className="w-8 h-8 shrink-0" />

                    <span className="text-sm">{errorText}</span>

                    {onRetry && (
                        <GeneralButton
                            icon={<IconDownload className="w-4 h-4" />}
                            handleAction={() => {
                                void onRetry();
                            }}
                            textButton="Try again"
                            variant="embossed"
                        />
                    )}
                </div>
            )}

            {!loading && !isError && (
                <div className="data-loader-fade-in">{children}</div>
            )}
        </div>
    );
};
