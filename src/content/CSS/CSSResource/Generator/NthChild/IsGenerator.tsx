"use client";

import { useMemo, type Dispatch, type SetStateAction } from "react";
import { GeneratorWorkspace } from "../_shared/GeneratorUI";
import { VisualPresetGallery } from "../_shared/VisualPresetGallery";
import { ConfigNthChild } from "./ConfigNthChild";
import { createDefaultNthChildConfig, nthPresetConfigs, nthPresets, type NthChildConfig, type NthPreset } from "./nth-child.type";
import { nthChildConfigToCss, nthChildConfigToHtml, nthMatches, nthSelector } from "./nth-child.utils";

const resolvedPresetConfigs = Object.fromEntries(
    nthPresets.map((name) => [name, { ...createDefaultNthChildConfig(), ...nthPresetConfigs[name] }]),
) as Record<NthPreset, NthChildConfig>;

const NthPresetPreview = ({ config }: { config: NthChildConfig }) => (
    <span className="grid w-full grid-cols-6 gap-1">
        {Array.from({ length: 12 }, (_, index) => {
            const previewConfig = { ...config, count: 12 };
            const match = nthMatches(index + 1, previewConfig);
            return <span key={index} className="grid aspect-square place-items-center rounded-[2px] text-[7px] font-medium" style={{ background: match ? config.selectedColor : config.itemColor, color: config.textColor }}>{index + 1}</span>;
        })}
    </span>
);

export const IsGenerator = ({ config, setConfig }: { config: NthChildConfig; setConfig: Dispatch<SetStateAction<NthChildConfig>> }) => {
    const css = useMemo(() => nthChildConfigToCss(config), [config]);
    const html = useMemo(() => nthChildConfigToHtml(config), [config]);
    const selected = useMemo(() => Array.from({ length: config.count }, (_, index) => index + 1).filter((index) => nthMatches(index, config)), [config]);

    return (
        <div className="col-stretch-4 w-full">
            <GeneratorWorkspace
                css={css}
                html={html}
                previewClassName="rounded-[8px]"
                floatingPreviewClassName="rounded-[8px]"
                floatingPreview={
                    <div className="flex size-full items-center justify-center bg-fg/5 p-2">
                        <NthPresetPreview config={config} />
                    </div>
                }
                controls={<ConfigNthChild config={config} setConfig={setConfig} />}
                preview={<div className="col-stretch-2 w-full overflow-auto rounded-[4px] bg-fg/3 p-3"><div className="row-center-2 rounded-[5px] bg-fg/5 px-2 py-1.5"><code className="min-w-0 truncate text-[11px] text-fg">div{nthSelector(config)}</code><span className="ml-auto shrink-0 text-[10px] text-fg/45">{selected.length} selected</span></div><div className={config.display === "grid" ? "grid grid-cols-[repeat(auto-fit,minmax(44px,1fr))] gap-1.5" : "flex flex-col gap-1.5"}>{Array.from({ length: config.count }, (_, index) => { const match = nthMatches(index + 1, config); return <div key={index} className="grid min-h-10 place-items-center rounded-[5px] text-[11px] font-medium transition-all" style={{ background: match ? config.selectedColor : config.itemColor, color: config.textColor, boxShadow: match ? `0 0 0 2px color-mix(in srgb, ${config.selectedColor} 35%, transparent)` : "none" }}>{index + 1}</div>; })}</div></div>}
            />

            <VisualPresetGallery
                values={nthPresets}
                configs={resolvedPresetConfigs}
                currentConfig={config}
                renderPreview={(preset) => <NthPresetPreview config={preset} />}
                onSelect={(preset) => setConfig({ ...preset })}
            />
        </div>
    );
};
