"use client";

import { AIAgent } from "@/AI/AIAgent";
import { DynamicSvgIcon } from "@/components/svg/DynamicSVGIcon";
import { TitlePost } from "@/components/titles/TitlePost/TitlePost";
import { useCompiler } from "./hooks/useCompiler";
import { Editor } from "./workspace/Editor";

export const UniversalCSSCompiler = () => {
    const { selectFromConfig } = useCompiler();

    if (!selectFromConfig) return null;

    return (
        <div className="col-stretch-8 w-full h-auto z-2">
            <TitlePost
                useFn={false}
                icon={{
                    component: (
                        <DynamicSvgIcon
                            name="converter.svg"
                            className="w-8 h-8 fill-fg"
                        />
                    ),
                    meta: "converter.svg",
                }}
                description=""
                recordings={[
                    {
                        version: "1.0.0",
                        date: new Date(),
                        title: "This util automaticaly updates every reload page",
                        description:
                            "This utility is designed to automatically update and refresh its content every time the page is reloaded, ensuring that users always have access to the most current information and features without needing to manually check for updates.",
                    },
                ]}
            >
                {selectFromConfig.titleLink}
            </TitlePost>

            <AIAgent />

            <div className="col-start-2 w-full h-auto z-2 mb-10">
                <Editor selectFromConfig={selectFromConfig} />
            </div>
        </div>
    );
};
