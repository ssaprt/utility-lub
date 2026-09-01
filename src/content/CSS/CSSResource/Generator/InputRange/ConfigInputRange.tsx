"use client";

import { GeneralButton } from "@/components/button/GeneralButton/GeneralButton";
import { IconRestore } from "@tabler/icons-react";
import type { Dispatch, SetStateAction } from "react";
import { ColorControl, ConfigPanel, ControlGrid, RangeControl, SegmentedControl, ToggleControl } from "../_shared/GeneratorUI";
import { createDefaultInputRangeConfig, rangeThumbShapes, type InputRangeConfig } from "./input-range.type";

export const ConfigInputRange = ({ config, setConfig }: { config: InputRangeConfig; setConfig: Dispatch<SetStateAction<InputRangeConfig>> }) => {
    const update = <K extends keyof InputRangeConfig>(key: K, value: InputRangeConfig[K]) => setConfig((current) => ({ ...current, [key]: value }));
    return <ConfigPanel title="Input range" action={<div className="rounded-[6px] bg-fg/5 p-0.5"><GeneralButton variant="ghost" icon={<IconRestore className="size-4" />} textButton="Reset" handleAction={() => setConfig(createDefaultInputRangeConfig())} /></div>}>
        <SegmentedControl title="Thumb shape" value={config.thumbShape} values={rangeThumbShapes} onChange={(value) => update("thumbShape", value)} />
        <ControlGrid>
            <RangeControl title="Preview value" value={config.value} min={0} max={100} unit="%" onChange={(value) => update("value", value)} />
            <RangeControl title="Width" value={config.width} min={140} max={600} unit="px" onChange={(value) => update("width", value)} />
            <RangeControl title="Thumb size" value={config.thumbSize} min={10} max={44} unit="px" onChange={(value) => update("thumbSize", value)} />
            <RangeControl title="Thumb radius" value={config.thumbRadius} min={0} max={50} unit="px" onChange={(value) => update("thumbRadius", value)} />
            <RangeControl title="Thumb border" value={config.thumbBorderWidth} min={0} max={8} unit="px" onChange={(value) => update("thumbBorderWidth", value)} />
            <RangeControl title="Thumb shadow" value={config.thumbShadowBlur} min={0} max={30} unit="px" onChange={(value) => update("thumbShadowBlur", value)} />
            <RangeControl title="Track height" value={config.trackHeight} min={2} max={24} unit="px" onChange={(value) => update("trackHeight", value)} />
            <RangeControl title="Track radius" value={config.trackRadius} min={0} max={30} unit="px" onChange={(value) => update("trackRadius", value)} />
        </ControlGrid>
        <ControlGrid>
            <ColorControl title="Thumb" value={config.thumbColor} onChange={(value) => update("thumbColor", value)} />
            <ColorControl title="Thumb border" value={config.thumbBorderColor} onChange={(value) => update("thumbBorderColor", value)} />
            <ColorControl title="Track" value={config.trackColor} onChange={(value) => update("trackColor", value)} />
            <ColorControl title="Progress" value={config.fillColor} onChange={(value) => update("fillColor", value)} />
            <ColorControl title="Preview" value={config.surfaceColor} onChange={(value) => update("surfaceColor", value)} />
            <ToggleControl title="Progress fill" checked={config.fill} onChange={(value) => update("fill", value)} />
        </ControlGrid>
    </ConfigPanel>;
};
