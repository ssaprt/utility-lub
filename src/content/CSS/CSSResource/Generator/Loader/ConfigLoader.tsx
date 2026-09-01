"use client";

import { GeneralButton } from "@/components/button/GeneralButton/GeneralButton";
import { IconRestore } from "@tabler/icons-react";
import type { Dispatch, SetStateAction } from "react";
import { ColorControl, ConfigPanel, ControlGrid, RangeControl, SegmentedControl } from "../_shared/GeneratorUI";
import { createDefaultLoaderConfig, loaderTypes, loaderUsesChildren, type LoaderConfig } from "./loader.type";

export const ConfigLoader = ({ config, setConfig }: { config: LoaderConfig; setConfig: Dispatch<SetStateAction<LoaderConfig>> }) => {
    const update = <K extends keyof LoaderConfig>(key: K, value: LoaderConfig[K]) => setConfig((current) => ({ ...current, [key]: value }));
    return <ConfigPanel title="CSS loader" action={<div className="rounded-[6px] bg-fg/5 p-0.5"><GeneralButton variant="ghost" icon={<IconRestore className="size-4" />} textButton="Reset" handleAction={() => setConfig(createDefaultLoaderConfig())} /></div>}>
        <SegmentedControl title="Animation" value={config.type} values={loaderTypes} onChange={(value) => update("type", value)} />
        <ControlGrid>
            <RangeControl title="Size" value={config.size} min={20} max={140} unit="px" onChange={(value) => update("size", value)} />
            <RangeControl title="Speed" value={config.speed} min={0.3} max={3} step={0.1} unit="s" onChange={(value) => update("speed", value)} />
            <RangeControl title="Thickness" value={config.thickness} min={2} max={16} unit="px" onChange={(value) => update("thickness", value)} />
            {loaderUsesChildren(config.type) && <RangeControl title="Elements" value={config.count} min={3} max={config.type === "grid-pulse" ? 9 : 12} onChange={(value) => update("count", value)} />}
            {loaderUsesChildren(config.type) && <RangeControl title="Gap" value={config.gap} min={2} max={20} unit="px" onChange={(value) => update("gap", value)} />}
        </ControlGrid>
        <ControlGrid>
            <ColorControl title="Primary" value={config.color} onChange={(value) => update("color", value)} />
            <ColorControl title="Accent" value={config.accentColor} onChange={(value) => update("accentColor", value)} />
            <ColorControl title="Tertiary" value={config.tertiaryColor} onChange={(value) => update("tertiaryColor", value)} />
            <ColorControl title="Preview" value={config.surfaceColor} onChange={(value) => update("surfaceColor", value)} />
        </ControlGrid>
    </ConfigPanel>;
};
