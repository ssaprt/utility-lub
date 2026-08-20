"use client";
import { TitlePost } from "@/components/titles/TitlePost/TitlePost";
import { useAppContextActions } from "@/context/appContext";
import "@ssaprt/easy-pagination/style.css";
import { useEffect } from "react";

import { DynamicSvgIcon } from "@/components/svg/DynamicSVGIcon";
import { Categories } from "./Categories";

export const Cursor = () => {
    const { header } = useAppContextActions();
    const { setIconHeader, setTitleHeader } = header || {};

    useEffect(() => {
        setIconHeader(
            <DynamicSvgIcon name="cursor.svg" className="w-8 h-8 fill-fg" />,
        );
        setTitleHeader("CSS Cursor");
    }, [setIconHeader, setTitleHeader]);

    return (
        <div className="flex flex-col w-full h-auto gap-8 z-2">
            <TitlePost
                icon={{
                    component: (
                        <DynamicSvgIcon
                            name="cursor.svg"
                            className="w-8 h-8 fill-fg"
                        />
                    ),
                    meta: "cursor.svg",
                }}
                description=""
                useFn={false}
            >
                CSS Cursor
            </TitlePost>

            <Categories />
        </div>
    );
};
