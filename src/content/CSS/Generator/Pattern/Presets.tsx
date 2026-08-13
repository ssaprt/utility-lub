"use client";

import { DynamicSvgIcon } from "@/components/svg/DynamicSVGIcon";
import { TitlePost } from "@/components/titles/TitlePost/TitlePost";
import { useAppContextActions } from "@/context/appContext";
import { useEffect } from "react";
import { IsGenerator } from "./IsGenerator";

export const Pattern = () => {
    const { header } = useAppContextActions();
    const { setIconHeader, setTitleHeader } = header || {};

    useEffect(() => {
        setIconHeader(
            <DynamicSvgIcon name="pattern.svg" className="w-8 h-8 fill-fg" />,
        );
        setTitleHeader("BG Pattern Generator");
    }, [setIconHeader, setTitleHeader]);

    return (
        <div className="flex h-auto w-full flex-col gap-8 z-2">
            <TitlePost
                icon={{
                    component: (
                        <DynamicSvgIcon
                            name="pattern.svg"
                            className="w-8 h-8 fill-fg"
                        />
                    ),
                    meta: "pattern.svg",
                }}
                description="Background pattern generator with editable geometry, spacing, position, scale, colors and ready-made presets."
                hideVersion
            >
                BG Pattern Generator
            </TitlePost>

            <IsGenerator />
        </div>
    );
};
