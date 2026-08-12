"use client";
import { DynamicSvgIcon } from "@/components/svg/DynamicSVGIcon";
import { TitlePost } from "@/components/titles/TitlePost/TitlePost";
import { useAppContextActions } from "@/context/appContext";
import { useEffect } from "react";
import { IsGenerator } from "./IsGenerator";
import { Presets } from "./Presets";

export const Gradient = () => {
    const { header } = useAppContextActions();
    const { setIconHeader, setTitleHeader } = header || {};

    useEffect(() => {
        setIconHeader(
            <DynamicSvgIcon name="gradient.svg" className="w-8 h-8 fill-fg" />,
        );
        setTitleHeader("Gradient Generator");
    }, [setIconHeader, setTitleHeader]);

    return (
        <div className="flex flex-col w-full h-auto gap-8 z-2">
            <TitlePost
                icon={{
                    component: (
                        <DynamicSvgIcon
                            name="gradient.svg"
                            className="w-8 h-8 fill-fg"
                        />
                    ),
                    meta: "gradient.svg",
                }}
                description="Gradient generator."
                hideVersion
            >
                Gradient Generator
            </TitlePost>

            <IsGenerator />
            <Presets />
        </div>
    );
};
