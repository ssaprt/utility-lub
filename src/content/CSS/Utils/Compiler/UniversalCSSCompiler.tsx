"use client";
import { DynamicSvgIcon } from "@/components/svg/DynamicSVGIcon";
import { TitlePost } from "@/components/titles/TitlePost/TitlePost";

import { AIAgent } from "@/AI/AIAgent";
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
