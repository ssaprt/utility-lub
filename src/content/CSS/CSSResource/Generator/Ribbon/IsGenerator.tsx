"use client";

import { useMemo, type Dispatch, type SetStateAction } from "react";
import { GeneratorWorkspace } from "../_shared/GeneratorUI";
import { VisualPresetGallery } from "../_shared/VisualPresetGallery";
import { ConfigRibbon } from "./ConfigRibbon";
import { ribbonPresetConfigs, ribbonPresets, type RibbonConfig } from "./ribbon.type";
import { ribbonConfigToCss, ribbonConfigToHtml } from "./ribbon.utils";

const RibbonPresetPreview = ({ config }: { config: RibbonConfig }) => {
    const left = config.position === "left";
    const background = config.gradient ? `linear-gradient(135deg, ${config.primaryColor}, ${config.secondaryColor})` : config.primaryColor;
    const style = config.style === "corner"
        ? { top: 13, [left ? "left" : "right"]: -25, width: 92, transform: `rotate(${left ? -45 : 45}deg)` }
        : config.style === "fold"
          ? { top: 12, [left ? "left" : "right"]: -3, minWidth: 67 }
          : { top: 13, [left ? "left" : "right"]: 0, minWidth: 58, borderRadius: left ? "0 999px 999px 0" : "999px 0 0 999px" };

    return (
        <span className="relative block h-[82px] w-full max-w-[126px] overflow-hidden border border-white/8" style={{ borderRadius: Math.min(config.radius, 12), background: config.cardColor }}>
            <span className="absolute flex h-[21px] items-center justify-center overflow-visible whitespace-nowrap px-2 pb-px text-[6px] font-bold tracking-[0.6px]" style={{ ...style, background, color: config.textColor, lineHeight: 1.15, boxShadow: config.shadow ? "0 4px 10px rgba(0,0,0,.3)" : "none" }}>
                <span style={{ transform: config.style === "corner" ? `translateX(${config.position === "left" ? -config.size * 0.23 : config.size * 0.23}px)` : "none" }}>{config.text}</span>
            </span>
            <span className="absolute bottom-3 left-3 right-3 h-2 rounded-full bg-white/8" />
            <span className="absolute bottom-7 left-3 h-2 w-1/2 rounded-full bg-white/10" />
        </span>
    );
};

export const IsGenerator = ({ config, setConfig }: { config: RibbonConfig; setConfig: Dispatch<SetStateAction<RibbonConfig>> }) => {
    const css = useMemo(() => ribbonConfigToCss(config), [config]);
    const html = useMemo(() => ribbonConfigToHtml(config), [config]);

    return (
        <div className="col-stretch-4 w-full">
            <GeneratorWorkspace
                css={css}
                html={html}
                previewClassName="rounded-[18px]"
                floatingPreviewClassName="rounded-[18px]"
                floatingPreview={
                    <div className="flex size-full items-center justify-center bg-fg/3 p-2">
                        <RibbonPresetPreview config={config} />
                    </div>
                }
                controls={<ConfigRibbon config={config} setConfig={setConfig} />}
                preview={<div className="flex w-full items-center justify-center rounded-[12px] bg-fg/3 p-8"><style>{css}</style><div className="ribbon-card border border-white/8"><div className="ribbon"><span className="ribbon-label">{config.text}</span></div><div className="flex h-full min-h-[190px] flex-col items-center justify-center gap-2 p-8 text-center"><span className="text-lg font-semibold text-white">Featured card</span><span className="text-xs text-white/45">A compact label for important content.</span></div></div></div>}
            />

            <VisualPresetGallery
                values={ribbonPresets}
                configs={ribbonPresetConfigs}
                currentConfig={config}
                renderPreview={(preset) => <RibbonPresetPreview config={preset} />}
                onSelect={(preset) => setConfig({ ...preset })}
            />
        </div>
    );
};
