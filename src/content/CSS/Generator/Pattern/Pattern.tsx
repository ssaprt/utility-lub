"use client";
import { AIAgent } from "@/AI/AIAgent";
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
        <div className="flex flex-col w-full h-auto gap-8 z-2">
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
                description="Gradient generator. A large collection of ready-made presets that can be modified."
                hideVersion
            >
                BG Pattern Generator
            </TitlePost>
            <AIAgent />

            <IsGenerator />
        </div>
    );
};
