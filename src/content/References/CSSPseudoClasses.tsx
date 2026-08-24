"use client";
import { TitlePost } from "@/components/titles/TitlePost/TitlePost";
import { useAppContextActions } from "@/context/appContext";
import "@ssaprt/easy-pagination/style.css";
import { useEffect } from "react";

import { DynamicSvgIcon } from "@/components/svg/DynamicSVGIcon";

export const CSSPseudoClasses = () => {
    const { header } = useAppContextActions();
    const { setIconHeader, setTitleHeader } = header || {};

    useEffect(() => {
        setIconHeader(
            <DynamicSvgIcon name="dots.svg" className="w-8 h-8 fill-fg" />,
        );
        setTitleHeader("Easy Pagination");
    }, [setIconHeader, setTitleHeader]);

    return (
        <div className="flex flex-col w-full h-auto gap-8 z-2">
            <TitlePost
                icon={{
                    component: (
                        <DynamicSvgIcon
                            name="dots.svg"
                            className="w-8 h-8 fill-fg"
                        />
                    ),
                    meta: "dots.svg",
                }}
                description="All actual CSS Pseudo Classes"
                useFn={false}
            >
                CSS Pseudo Classes
            </TitlePost>
        </div>
    );
};
