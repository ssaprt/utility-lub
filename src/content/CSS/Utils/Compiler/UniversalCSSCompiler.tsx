"use client";
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
                recordings={[
                    {
                        version: "1.0.0",
                        date: "19/08/2026",
                        title: "Publish",
                        description: `Initial release ${selectFromConfig.titleLink}`,
                    },
                ]}
                icon={{
                    component: (
                        <DynamicSvgIcon
                            name="converter.svg"
                            className="w-8 h-8 fill-fg"
                        />
                    ),
                    meta: "converter.svg",
                }}
                description={selectFromConfig.titleLink}
            >
                {selectFromConfig.titleLink}
            </TitlePost>
            <div className="col-start-2 w-full h-auto z-2 bg-fg/5 rounded-xl p-2 shadow-xs shadow-black/40">
                <Editor selectFromConfig={selectFromConfig} />
            </div>
        </div>
    );
};
