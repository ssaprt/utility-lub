"use client";

import { GeneralButton } from "@/components/button/GeneralButton/GeneralButton";
import { IconRestore } from "@tabler/icons-react";
import type { Dispatch, SetStateAction } from "react";
import { ColorControl, ConfigPanel, ControlGrid, RangeControl, SegmentedControl } from "../_shared/GeneratorUI";
import { createDefaultSkeletonLoaderConfig, skeletonAnimations, skeletonCardTypes, skeletonSizes, type SkeletonLoaderConfig } from "./skeleton-loader.type";

export const ConfigSkeletonLoader = ({ config, setConfig }: { config: SkeletonLoaderConfig; setConfig: Dispatch<SetStateAction<SkeletonLoaderConfig>> }) => {
    const update = <K extends keyof SkeletonLoaderConfig>(key: K, value: SkeletonLoaderConfig[K]) => setConfig((current) => ({ ...current, [key]: value }));
    return <ConfigPanel title="Skeleton loader" action={<div className="rounded-[6px] bg-fg/5 p-0.5"><GeneralButton variant="ghost" icon={<IconRestore className="size-4" />} textButton="Reset" handleAction={() => setConfig(createDefaultSkeletonLoaderConfig())} /></div>}>
        <SegmentedControl title="Card type" value={config.cardType} values={skeletonCardTypes} onChange={(value) => update("cardType", value)} />
        <ControlGrid>
            <SegmentedControl title="Size" value={config.size} values={skeletonSizes} onChange={(value) => update("size", value)} />
            <SegmentedControl title="Animation" value={config.animation} values={skeletonAnimations} onChange={(value) => update("animation", value)} />
            <RangeControl title="Quantity" value={config.quantity} min={1} max={8} onChange={(value) => update("quantity", value)} />
            <RangeControl title="Gap" value={config.gap} min={4} max={32} unit="px" onChange={(value) => update("gap", value)} />
            <RangeControl title="Radius" value={config.radius} min={0} max={32} unit="px" onChange={(value) => update("radius", value)} />
            {config.animation !== "none" && <RangeControl title="Speed" value={config.speed} min={0.5} max={4} step={0.1} unit="s" onChange={(value) => update("speed", value)} />}
        </ControlGrid>
        <ControlGrid>
            <ColorControl title="Base" value={config.baseColor} onChange={(value) => update("baseColor", value)} />
            <ColorControl title="Shine" value={config.shineColor} onChange={(value) => update("shineColor", value)} />
            <ColorControl title="Card" value={config.cardColor} onChange={(value) => update("cardColor", value)} />
            <ColorControl title="Background" value={config.backgroundColor} onChange={(value) => update("backgroundColor", value)} />
        </ControlGrid>
    </ConfigPanel>;
};
