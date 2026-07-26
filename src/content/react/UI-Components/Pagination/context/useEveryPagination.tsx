import type { PresetsType } from "@ssaprt/easy-pagination";
import { createContext, useContext } from "react";

export type InstallationType = {
    titleEnd: string;
    code: string;
};

export type URLType = {
    mode: "url" | "storage";
    key: string;
};

export type TypeEveryPagination = {
    title?: string;
    list?: unknown[];
    selectTheme?: PresetsType;
    navigation?: "full" | "start" | "end";
    mode?: "horizontal" | "vertical";
    arrowStart?: boolean;
    arrowEnd?: boolean;
    className?: string;
    install?: InstallationType;
    animationSpeed?: `${number}ms`;
    animationSpeedValue?: `${number}ms`;
    setAnimationSpeedValue?: (value: `${number}ms`) => void;
    generalTitle?: string;
    indexing?: URLType;
};

export const EveryPagination = createContext<TypeEveryPagination | null>(null);

export const useEveryPaginationContext = () => {
    if (!EveryPagination)
        throw new Error(
            "useEveryPagination must be used within a EveryPaginationProvider",
        );
    return useContext(EveryPagination);
};
