import { useState } from "react";
import { Code } from "../../../../../../components/Code/Code";
import {
    EveryPagination,
    type TypeEveryPagination,
} from "../../context/useEveryPagination";
import { emojis } from "../../data/list";
import { PaginationContent } from "../Pagination/Pagination";
import { Title } from "../Theme/Title";

export const Overlay = ({
    list = emojis,
    selectTheme,
    navigation = "full",
    mode = "horizontal",
    arrowStart = true,
    arrowEnd = true,
    className,
    title,
    animationSpeed,
    generalTitle,
    indexing,
}: TypeEveryPagination) => {
    const [animationSpeedValue, setAnimationSpeedValue] =
        useState<`${number}ms`>(`${parseInt(animationSpeed ?? "400ms", 10)}ms`);

    return (
        <EveryPagination.Provider
            value={{
                title,
                list,
                selectTheme,
                navigation,
                mode,
                arrowStart,
                arrowEnd,
                className,
                animationSpeedValue,
                setAnimationSpeedValue,
                indexing,
            }}
        >
            <div
                className="
                    relative
                    z-[1]
                    flex
                    h-full
                    min-h-0
                    min-w-0
                    w-full
                    flex-col 
                    
                    items-stretch
                    gap-[clamp(8px,1vw,16px)]
                "
            >
                {generalTitle && (
                    <div className="shrink-0">
                        <Title title={generalTitle} />
                    </div>
                )}

                <div
                    className="
                        flex
                        min-h-0
                        min-w-0
                        w-full
                        flex-1
                        flex-col
                        items-stretch
                        justify-start
                        gap-[clamp(8px,1vw,16px)]
                        
                        
                    "
                >
                    <PaginationContent />

                    <div
                        className="
                            flex
                            min-h-0
                            min-w-0
                            w-full
                            flex-1
                            flex-col
                            lg:w-auto
                        "
                    >
                        <Code />
                    </div>
                </div>
            </div>
        </EveryPagination.Provider>
    );
};
