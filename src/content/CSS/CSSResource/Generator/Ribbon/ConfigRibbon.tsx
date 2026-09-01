"use client";

import { GeneralButton } from "@/components/button/GeneralButton/GeneralButton";
import { IconRestore } from "@tabler/icons-react";
import type { Dispatch, SetStateAction } from "react";
import { ColorControl, ConfigPanel, ControlGrid, RangeControl, SegmentedControl, TextControl, ToggleControl } from "../_shared/GeneratorUI";
import { createDefaultRibbonConfig, ribbonPositions, ribbonStyles, type RibbonConfig } from "./ribbon.type";

export const ConfigRibbon = ({ config, setConfig }: { config: RibbonConfig; setConfig: Dispatch<SetStateAction<RibbonConfig>> }) => {
    const update = <K extends keyof RibbonConfig>(key: K, value: RibbonConfig[K]) => setConfig((current) => ({ ...current, [key]: value }));
    return <ConfigPanel title="Ribbon" action={<div className="rounded-[6px] bg-fg/5 p-0.5"><GeneralButton variant="ghost" icon={<IconRestore className="size-4" />} textButton="Reset" handleAction={() => setConfig(createDefaultRibbonConfig())} /></div>}>
        <TextControl title="Text" value={config.text} onChange={(value) => update("text", value)} />
        <ControlGrid>
            <SegmentedControl title="Style" value={config.style} values={ribbonStyles} onChange={(value) => update("style", value)} />
            <SegmentedControl title="Position" value={config.position} values={ribbonPositions} onChange={(value) => update("position", value)} />
            <RangeControl title="Size" value={config.size} min={20} max={60} unit="px" onChange={(value) => update("size", value)} />
            <RangeControl title="Top offset" value={config.offset} min={0} max={60} unit="px" onChange={(value) => update("offset", value)} />
            <RangeControl title="Card radius" value={config.radius} min={0} max={40} unit="px" onChange={(value) => update("radius", value)} />
            <ToggleControl title="Gradient" checked={config.gradient} onChange={(value) => update("gradient", value)} />
            <ToggleControl title="Shadow" checked={config.shadow} onChange={(value) => update("shadow", value)} />
        </ControlGrid>
        <ControlGrid>
            <ColorControl title="Primary" value={config.primaryColor} onChange={(value) => update("primaryColor", value)} />
            <ColorControl title="Secondary" value={config.secondaryColor} onChange={(value) => update("secondaryColor", value)} />
            <ColorControl title="Text" value={config.textColor} onChange={(value) => update("textColor", value)} />
            <ColorControl title="Card" value={config.cardColor} onChange={(value) => update("cardColor", value)} />
        </ControlGrid>
    </ConfigPanel>;
};
