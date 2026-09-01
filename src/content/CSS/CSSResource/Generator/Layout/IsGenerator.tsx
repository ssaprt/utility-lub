"use client";

import { useMemo, type Dispatch, type SetStateAction } from "react";
import { GeneratorWorkspace } from "../_shared/GeneratorUI";
import { VisualPresetGallery } from "../_shared/VisualPresetGallery";
import { ConfigLayout } from "./ConfigLayout";
import { layoutPresetConfigs, layoutPresets, type LayoutConfig } from "./layout.type";
import { layoutConfigToCss, layoutConfigToHtml, layoutPreviewStyle } from "./layout.utils";

const Cell = ({ area, color, children, compact = false }: { area: string; color: string; children: string; compact?: boolean }) => (
    <div
        className={`flex min-h-0 items-center justify-center overflow-hidden rounded-[3px] border border-white/10 font-medium ${compact ? "p-0 text-[6px]" : "p-2 text-[10px]"}`}
        style={{ gridArea: area, background: color }}
    >
        {children}
    </div>
);

const LayoutPreview = ({ config, compact = false }: { config: LayoutConfig; compact?: boolean }) => (
    <div
        style={compact ? {
            ...layoutPreviewStyle({ ...config, previewMode: "desktop" }),
            width: "100%",
            height: "88px",
            padding: `${Math.min(config.padding, 5)}px`,
            gap: `${Math.min(config.gap, 4)}px`,
            gridTemplateColumns: `${config.includeLeft ? "20% " : ""}minmax(0, 1fr)${config.includeRight ? " 20%" : ""}`,
            gridTemplateRows: `${config.includeHeader ? "16px " : ""}minmax(0, 1fr)${config.includeFooter ? " 14px" : ""}`,
        } : layoutPreviewStyle(config)}
        className={compact ? "rounded-[4px]" : "rounded-[4px] shadow-lg shadow-black/25"}
    >
        {config.includeHeader && <Cell compact={compact} area="header" color={config.headerColor}>Header</Cell>}
        {config.includeLeft && <Cell compact={compact} area="left" color={config.leftColor}>Nav</Cell>}
        <Cell compact={compact} area="main" color={config.mainColor}>Main</Cell>
        {config.includeRight && <Cell compact={compact} area="right" color={config.rightColor}>Side</Cell>}
        {config.includeFooter && <Cell compact={compact} area="footer" color={config.footerColor}>Footer</Cell>}
    </div>
);

const sameLayoutPreset = (current: LayoutConfig, preset: LayoutConfig) => {
    const { previewMode: _currentMode, ...currentValues } = current;
    const { previewMode: _presetMode, ...presetValues } = preset;
    return JSON.stringify(currentValues) === JSON.stringify(presetValues);
};

export const IsGenerator = ({ config, setConfig }: { config: LayoutConfig; setConfig: Dispatch<SetStateAction<LayoutConfig>> }) => {
    const css = useMemo(() => layoutConfigToCss(config), [config]);
    const html = useMemo(() => layoutConfigToHtml(config), [config]);

    return (
        <div className="col-stretch-4 w-full">
            <GeneratorWorkspace
                css={css}
                html={html}
                previewClassName="rounded-[10px]"
                floatingPreviewClassName="rounded-[10px]"
                floatingPreview={
                    <div className="flex size-full items-center justify-center bg-black/20 p-2">
                        <LayoutPreview config={config} compact />
                    </div>
                }
                controls={<ConfigLayout config={config} setConfig={setConfig} />}
                preview={<div className="flex w-full items-center justify-center overflow-auto rounded-[5px] bg-black/20 p-2"><LayoutPreview config={config} /></div>}
            />

            <VisualPresetGallery
                values={layoutPresets}
                configs={layoutPresetConfigs}
                currentConfig={config}
                renderPreview={(preset) => <div className="w-full"><LayoutPreview config={preset} compact /></div>}
                onSelect={(preset) => setConfig((current) => ({ ...preset, previewMode: current.previewMode }))}
                isActive={sameLayoutPreset}
            />
        </div>
    );
};
