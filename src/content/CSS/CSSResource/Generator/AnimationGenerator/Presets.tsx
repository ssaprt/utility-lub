"use client";

import { ItemWithCopy } from "@/components/blocks/Item/ItemWithCopy";
import { GeneralButton } from "@/components/button/GeneralButton/GeneralButton";
import { IconMenuOrder } from "@tabler/icons-react";
import { useState, type CSSProperties } from "react";
import {
    animationConfigToCss,
    animationKeyframesToCss,
    sanitizeAnimationName,
} from "./animation.utils";
import type { AnimationPreset } from "./presetsGenerator";

interface PresetsProps {
    presets: AnimationPreset[];
    onSelectPreset: (preset: AnimationPreset) => void;
}

export const Presets = ({ presets, onSelectPreset }: PresetsProps) => {
    const [viewPresets, setViewPresets] = useState(presets.slice(0, 6));

    return (
        <div className="col-stretch-2 w-full rounded-[12px] border-1 border-fg/8 bg-fg/4 p-2">
            <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(100px,1fr))] gap-2">
                {viewPresets.map((preset) => {
                    const { config } = preset;
                    const animationName = sanitizeAnimationName(config.name);
                    const css = animationConfigToCss(config);
                    const previewStyle: CSSProperties = {
                        backgroundColor: config.previewColor,
                        borderRadius: `${config.frames[0]?.borderRadius ?? 12}px`,
                        animationName,
                        animationDuration: `${config.duration}s`,
                        animationIterationCount: "infinite",
                        animationDirection: config.direction,
                        animationFillMode: "both",
                        animationTimingFunction: config.timingFunction,
                    };

                    return (
                        <div key={preset.id} className="contents">
                            <style>{animationKeyframesToCss(config)}</style>
                            <ItemWithCopy
                                handleAction={() => onSelectPreset(preset)}
                                item={{
                                    id: preset.id,
                                    title: preset.name,
                                    copyContent: css,
                                    content: (
                                        <div className="flex size-full items-center justify-center overflow-hidden bg-fg/5">
                                            <div
                                                className="size-[42%]"
                                                style={previewStyle}
                                            />
                                        </div>
                                    ),
                                }}
                            />
                        </div>
                    );
                })}
            </div>

            {presets.length > 6 && (
                <GeneralButton
                    icon={<IconMenuOrder />}
                    variant="minimal"
                    textButton={
                        viewPresets.length < presets.length
                            ? "Show more"
                            : "Show less"
                    }
                    handleAction={() =>
                        setViewPresets(
                            viewPresets.length < presets.length
                                ? presets
                                : presets.slice(0, 6),
                        )
                    }
                />
            )}
        </div>
    );
};
