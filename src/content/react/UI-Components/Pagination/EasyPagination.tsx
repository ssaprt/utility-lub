"use client";
import { TitlePost } from "@/components/titles/TitlePost/TitlePost";
import { useAppContextActions } from "@/context/appContext";
import "@ssaprt/easy-pagination/style.css";
import { useEffect } from "react";
import { Install } from "../../../../components/Install/Install";
import { DotSettings } from "./components/HowUse/DotSettings";
import { Example } from "./components/HowUse/Example";

import { HowUse } from "@/components/HowUse/HowUse";
import EasyPaginationIcon from "@/icons/easy-pagination.svg";
import { Indexing } from "./components/HowUse/Indexing";
import { YourTheme } from "./components/HowUse/YourTheme";
import { Theme } from "./components/Theme/Theme";

export const EasyPagination = () => {
    const { header } = useAppContextActions();
    const { setIconHeader, setTitleHeader } = header || {};

    useEffect(() => {
        setIconHeader(<EasyPaginationIcon className="w-8 h-8 fill-fg" />);
        setTitleHeader("Easy Pagination");
    }, [setIconHeader, setTitleHeader]);

    return (
        <div className="flex flex-col w-full h-auto gap-8 z-2">
            <TitlePost
                icon={{
                    component: <EasyPaginationIcon />,
                    meta: "easy-pagination.svg",
                }}
                description="Adaptation Easy Pagination for React and Next.js."
                packageName="@ssaprt/easy-pagination"
            >
                Easy Pagination
            </TitlePost>

            <Install packageName="@ssaprt/easy-pagination" />
            <HowUse>
                <Example />
                <Indexing />
                <DotSettings />
                <YourTheme />
            </HowUse>
            <Theme />
        </div>
    );
};
