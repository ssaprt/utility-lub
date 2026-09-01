"use client";

import { GeneralButton } from "@/components/button/GeneralButton/GeneralButton";
import { IconRestore } from "@tabler/icons-react";
import type { Dispatch, SetStateAction } from "react";
import { ColorControl, ConfigPanel, ControlGrid, RangeControl, SegmentedControl, ToggleControl } from "../_shared/GeneratorUI";
import { createDefaultGradientBorderConfig, gradientBorderTypes, type GradientBorderConfig } from "./gradient-border.type";

export const ConfigGradientBorder = ({ config, setConfig }: { config: GradientBorderConfig; setConfig: Dispatch<SetStateAction<GradientBorderConfig>> }) => {
    const update = <K extends keyof GradientBorderConfig>(key: K, value: GradientBorderConfig[K]) => setConfig((current) => ({ ...current, [key]: value }));
    return <ConfigPanel title="Gradient border" action={<div className="rounded-[6px] bg-fg/5 p-0.5"><GeneralButton variant="ghost" icon={<IconRestore className="size-4" />} textButton="Reset" handleAction={() => setConfig(createDefaultGradientBorderConfig())} /></div>}>
        <SegmentedControl title="Gradient" value={config.type} values={gradientBorderTypes} onChange={(value) => update("type", value)} />
        <ControlGrid>
            {config.type !== "radial" ? <RangeControl title="Angle" value={config.angle} min={0} max={360} unit="°" onChange={(value) => update("angle", value)} /> : <>
                <RangeControl title="Origin X" value={config.positionX} min={0} max={100} unit="%" onChange={(value) => update("positionX", value)} />
                <RangeControl title="Origin Y" value={config.positionY} min={0} max={100} unit="%" onChange={(value) => update("positionY", value)} />
            </>}
            <RangeControl title="Border width" value={config.borderWidth} min={1} max={20} unit="px" onChange={(value) => update("borderWidth", value)} />
            <RangeControl title="Radius" value={config.radius} min={0} max={60} unit="px" onChange={(value) => update("radius", value)} />
            <RangeControl title="Width" value={config.width} min={160} max={520} unit="px" onChange={(value) => update("width", value)} />
            <RangeControl title="Height" value={config.height} min={100} max={360} unit="px" onChange={(value) => update("height", value)} />
        </ControlGrid>
        <ControlGrid>
            <ColorControl title="Start" value={config.colorA} onChange={(value) => update("colorA", value)} />
            <RangeControl title="Start position" value={config.stopA} min={0} max={100} unit="%" onChange={(value) => update("stopA", value)} />
            <ColorControl title="Middle" value={config.colorB} onChange={(value) => update("colorB", value)} />
            <RangeControl title="Middle position" value={config.stopB} min={0} max={100} unit="%" onChange={(value) => update("stopB", value)} />
            <ColorControl title="End" value={config.colorC} onChange={(value) => update("colorC", value)} />
            <RangeControl title="End position" value={config.stopC} min={0} max={100} unit="%" onChange={(value) => update("stopC", value)} />
            <ColorControl title="Surface" value={config.backgroundColor} onChange={(value) => update("backgroundColor", value)} />
            <ColorControl title="Text" value={config.textColor} onChange={(value) => update("textColor", value)} />
        </ControlGrid>
        <ControlGrid>
            <ToggleControl title="Soft glow" checked={config.glow} onChange={(value) => update("glow", value)} />
            {config.glow && <RangeControl title="Glow blur" value={config.glowBlur} min={4} max={80} unit="px" onChange={(value) => update("glowBlur", value)} />}
        </ControlGrid>
    </ConfigPanel>;
};
