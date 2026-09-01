"use client";

import { GeneralButton } from "@/components/button/GeneralButton/GeneralButton";
import { IconRestore } from "@tabler/icons-react";
import type { Dispatch, SetStateAction } from "react";
import { ColorControl, ConfigPanel, ControlGrid, RangeControl, SegmentedControl, ToggleControl } from "../_shared/GeneratorUI";
import { createDefaultLayoutConfig, layoutPreviewModes, type LayoutConfig } from "./layout.type";

export const ConfigLayout = ({ config, setConfig }: { config: LayoutConfig; setConfig: Dispatch<SetStateAction<LayoutConfig>> }) => {
    const update = <K extends keyof LayoutConfig>(key: K, value: LayoutConfig[K]) => setConfig((current) => ({ ...current, [key]: value }));
    return <ConfigPanel title="Page layout" action={<div className="rounded-[6px] bg-fg/5 p-0.5"><GeneralButton variant="ghost" icon={<IconRestore className="size-4" />} textButton="Reset" handleAction={() => setConfig(createDefaultLayoutConfig())} /></div>}>
        <SegmentedControl title="Preview" value={config.previewMode} values={layoutPreviewModes} onChange={(value) => update("previewMode", value)} />
        <ControlGrid>
            <ToggleControl title="Header" checked={config.includeHeader} onChange={(value) => update("includeHeader", value)} />
            <ToggleControl title="Footer" checked={config.includeFooter} onChange={(value) => update("includeFooter", value)} />
            <ToggleControl title="Left sidebar" checked={config.includeLeft} onChange={(value) => update("includeLeft", value)} />
            <ToggleControl title="Right sidebar" checked={config.includeRight} onChange={(value) => update("includeRight", value)} />
        </ControlGrid>
        <ControlGrid>
            {config.includeHeader && <RangeControl title="Header height" value={config.headerHeight} min={40} max={160} unit="px" onChange={(value) => update("headerHeight", value)} />}
            {config.includeFooter && <RangeControl title="Footer height" value={config.footerHeight} min={40} max={160} unit="px" onChange={(value) => update("footerHeight", value)} />}
            {config.includeLeft && <RangeControl title="Left width" value={config.leftWidth} min={100} max={360} unit="px" onChange={(value) => update("leftWidth", value)} />}
            {config.includeRight && <RangeControl title="Right width" value={config.rightWidth} min={100} max={360} unit="px" onChange={(value) => update("rightWidth", value)} />}
            <RangeControl title="Gap" value={config.gap} min={0} max={40} unit="px" onChange={(value) => update("gap", value)} />
            <RangeControl title="Padding" value={config.padding} min={0} max={40} unit="px" onChange={(value) => update("padding", value)} />
            <RangeControl title="Mobile breakpoint" value={config.breakpoint} min={480} max={1200} unit="px" onChange={(value) => update("breakpoint", value)} />
        </ControlGrid>
        <ControlGrid>
            <ColorControl title="Page" value={config.pageColor} onChange={(value) => update("pageColor", value)} />
            <ColorControl title="Main" value={config.mainColor} onChange={(value) => update("mainColor", value)} />
            {config.includeHeader && <ColorControl title="Header" value={config.headerColor} onChange={(value) => update("headerColor", value)} />}
            {config.includeLeft && <ColorControl title="Left" value={config.leftColor} onChange={(value) => update("leftColor", value)} />}
            {config.includeRight && <ColorControl title="Right" value={config.rightColor} onChange={(value) => update("rightColor", value)} />}
            {config.includeFooter && <ColorControl title="Footer" value={config.footerColor} onChange={(value) => update("footerColor", value)} />}
        </ControlGrid>
    </ConfigPanel>;
};
