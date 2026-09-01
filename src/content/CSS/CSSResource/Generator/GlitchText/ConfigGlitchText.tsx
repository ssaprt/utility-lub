"use client";

import { GeneralButton } from "@/components/button/GeneralButton/GeneralButton";
import { IconRestore } from "@tabler/icons-react";
import type { Dispatch, SetStateAction } from "react";
import {
    ColorControl,
    ConfigPanel,
    ControlGrid,
    RangeControl,
    SegmentedControl,
    TextControl,
} from "../_shared/GeneratorUI";
import {
    createDefaultGlitchTextConfig,
    glitchEffects,
    glitchMotions,
    type GlitchTextConfig,
} from "./glitch-text.type";

export const ConfigGlitchText = ({ config, setConfig }: {
    config: GlitchTextConfig;
    setConfig: Dispatch<SetStateAction<GlitchTextConfig>>;
}) => {
    const update = <K extends keyof GlitchTextConfig>(key: K, value: GlitchTextConfig[K]) =>
        setConfig((current) => ({ ...current, [key]: value }));

    return (
        <ConfigPanel
            title="Glitch text"
            action={<div className="rounded-[6px] bg-fg/5 p-0.5"><GeneralButton variant="ghost" icon={<IconRestore className="size-4" />} textButton="Reset" handleAction={() => setConfig(createDefaultGlitchTextConfig())} /></div>}
        >
            <TextControl title="Text" value={config.text} onChange={(value) => update("text", value)} />
            <SegmentedControl title="Effect" value={config.effect} values={glitchEffects} onChange={(value) => update("effect", value)} />
            <SegmentedControl title="Motion" value={config.motion} values={glitchMotions} onChange={(value) => update("motion", value)} />

            <ControlGrid>
                <RangeControl title="Font size" value={config.fontSize} min={20} max={120} unit="px" onChange={(value) => update("fontSize", value)} />
                <RangeControl title="Letter spacing" value={config.letterSpacing} min={-2} max={18} unit="px" onChange={(value) => update("letterSpacing", value)} />
                <RangeControl title="Intensity" value={config.intensity} min={1} max={18} unit="px" onChange={(value) => update("intensity", value)} />
                <RangeControl title="Slice" value={config.slice} min={8} max={48} unit="%" onChange={(value) => update("slice", value)} />
                <RangeControl title="Skew" value={config.skew} min={0} max={18} unit="°" onChange={(value) => update("skew", value)} />
                <RangeControl title="Cycle" value={config.duration} min={0.5} max={5} step={0.1} unit="s" onChange={(value) => update("duration", value)} />
            </ControlGrid>

            <ControlGrid>
                <ColorControl title="Background" value={config.backgroundColor} onChange={(value) => update("backgroundColor", value)} />
                <ColorControl title="Text" value={config.textColor} onChange={(value) => update("textColor", value)} />
                <ColorControl title="Layer A" value={config.accentA} onChange={(value) => update("accentA", value)} />
                <ColorControl title="Layer B" value={config.accentB} onChange={(value) => update("accentB", value)} />
            </ControlGrid>

        </ConfigPanel>
    );
};
