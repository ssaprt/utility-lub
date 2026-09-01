"use client";

import { GeneralButton } from "@/components/button/GeneralButton/GeneralButton";
import { IconRestore } from "@tabler/icons-react";
import type { Dispatch, SetStateAction } from "react";
import { ColorControl, ConfigPanel, ControlGrid, RangeControl, SegmentedControl, ToggleControl } from "../_shared/GeneratorUI";
import { createDefaultNthChildConfig, nthDirections, nthDisplays, nthModes, type NthChildConfig } from "./nth-child.type";
import { nthFormula, nthSelector } from "./nth-child.utils";

export const ConfigNthChild = ({ config, setConfig }: { config: NthChildConfig; setConfig: Dispatch<SetStateAction<NthChildConfig>> }) => {
    const update = <K extends keyof NthChildConfig>(key: K, value: NthChildConfig[K]) => setConfig((current) => ({ ...current, [key]: value }));
    return <ConfigPanel title={`div${nthSelector(config)}`} action={<div className="rounded-[6px] bg-fg/5 p-0.5"><GeneralButton variant="ghost" icon={<IconRestore className="size-4" />} textButton="Reset" handleAction={() => setConfig(createDefaultNthChildConfig())} /></div>}>
        <ControlGrid>
            <SegmentedControl title="Count from" value={config.direction} values={nthDirections} onChange={(value) => update("direction", value)} />
            <SegmentedControl title="Logic" value={config.mode} values={nthModes} onChange={(value) => update("mode", value)} />
            <SegmentedControl title="Display" value={config.display} values={nthDisplays} onChange={(value) => update("display", value)} />
            <ToggleControl title="Negate selection" checked={config.negate} onChange={(value) => update("negate", value)} />
        </ControlGrid>
        <RangeControl title="Items" value={config.count} min={4} max={60} onChange={(value) => update("count", value)} />
        {config.mode === "formula" ? <ControlGrid>
            <RangeControl title="Step (A)" value={config.a} min={-8} max={12} onChange={(value) => update("a", value)} />
            <RangeControl title="Offset (B)" value={config.b} min={-12} max={30} onChange={(value) => update("b", value)} />
        </ControlGrid> : <ControlGrid>
            <RangeControl title="Range start" value={config.start} min={1} max={config.count} onChange={(value) => update("start", value)} />
            <RangeControl title="Range end" value={config.end} min={1} max={config.count} onChange={(value) => update("end", value)} />
        </ControlGrid>}
        <div className="rounded-md border border-fg/5 bg-fg/5 px-2 py-2 text-[11px] text-fg/65">{config.mode === "formula" ? `An+B: ${nthFormula(config.a, config.b)}` : `Items ${Math.min(config.start, config.end)} through ${Math.max(config.start, config.end)}`}</div>
        <ControlGrid>
            <ColorControl title="Selected" value={config.selectedColor} onChange={(value) => update("selectedColor", value)} />
            <ColorControl title="Default" value={config.itemColor} onChange={(value) => update("itemColor", value)} />
        </ControlGrid>
    </ConfigPanel>;
};
