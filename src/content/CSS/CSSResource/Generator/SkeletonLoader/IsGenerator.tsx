"use client";

import { useMemo, type Dispatch, type SetStateAction } from "react";
import { GeneratorWorkspace } from "../_shared/GeneratorUI";
import { VisualPresetGallery } from "../_shared/VisualPresetGallery";
import { ConfigSkeletonLoader } from "./ConfigSkeletonLoader";
import { skeletonPresetConfigs, skeletonPresets, type SkeletonLoaderConfig } from "./skeleton-loader.type";
import { skeletonLoaderConfigToCss, skeletonLoaderConfigToHtml } from "./skeleton-loader.utils";

const SkeletonPresetPreview = ({ config }: { config: SkeletonLoaderConfig }) => {
    const fill = config.animation === "shimmer" ? `linear-gradient(100deg, ${config.baseColor}, ${config.shineColor}, ${config.baseColor})` : config.baseColor;
    const Block = ({ className }: { className: string }) => <span className={className} style={{ background: fill, borderRadius: Math.max(2, Math.min(config.radius * 0.5, 6)) }} />;

    return (
        <span className="flex h-full w-full items-center justify-center rounded-[4px] p-2" style={{ background: config.backgroundColor }}>
            <span className="flex w-full max-w-[124px] flex-col gap-1.5 p-2" style={{ background: config.cardColor, borderRadius: Math.min(config.radius, 10) }}>
                {config.cardType === "profile" && <><span className="flex items-center gap-2"><span className="size-8 shrink-0 rounded-full" style={{ background: fill }} /><span className="flex min-w-0 flex-1 flex-col gap-1.5"><Block className="h-2 w-full" /><Block className="h-2 w-1/2" /></span></span><Block className="h-2 w-full" /><Block className="h-2 w-2/3" /></>}
                {config.cardType === "article" && <><Block className="h-10 w-full" /><Block className="h-2 w-full" /><Block className="h-2 w-full" /><Block className="h-2 w-2/3" /></>}
                {config.cardType === "product" && <><Block className="h-11 w-full" /><Block className="h-2 w-2/3" /><span className="flex justify-between"><Block className="h-2 w-1/3" /><Block className="h-4 w-8" /></span></>}
                {config.cardType === "list" && <span className="flex items-center gap-2"><span className="size-8 shrink-0 rounded-full" style={{ background: fill }} /><span className="flex min-w-0 flex-1 flex-col gap-1.5"><Block className="h-2 w-full" /><Block className="h-2 w-2/3" /></span></span>}
            </span>
        </span>
    );
};

export const IsGenerator = ({ config, setConfig }: { config: SkeletonLoaderConfig; setConfig: Dispatch<SetStateAction<SkeletonLoaderConfig>> }) => {
    const css = useMemo(() => skeletonLoaderConfigToCss(config), [config]);
    const html = useMemo(() => skeletonLoaderConfigToHtml(config), [config]);

    return (
        <div className="col-stretch-4 w-full">
            <GeneratorWorkspace
                css={css}
                html={html}
                previewClassName="rounded-[14px]"
                floatingPreviewClassName="rounded-[14px]"
                floatingPreview={<SkeletonPresetPreview config={config} />}
                controls={<ConfigSkeletonLoader config={config} setConfig={setConfig} />}
                preview={<div className="w-full overflow-auto rounded-[9px]"><style>{css}</style><div dangerouslySetInnerHTML={{ __html: html }} /></div>}
            />

            <VisualPresetGallery
                values={skeletonPresets}
                configs={skeletonPresetConfigs}
                currentConfig={config}
                renderPreview={(preset) => <SkeletonPresetPreview config={preset} />}
                onSelect={(preset) => setConfig({ ...preset })}
            />
        </div>
    );
};
