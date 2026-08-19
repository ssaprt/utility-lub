"use client";

import { ItemWithCopy } from "@/components/blocks/Item/ItemWithCopy";
import { GeneralButton } from "@/components/button/GeneralButton/GeneralButton";
import { IconMenuOrder } from "@tabler/icons-react";
import { useState } from "react";
import type { ClipPathPreset } from "./presetsGenerator";

interface PresetsProps {
    presets: ClipPathPreset[];
    onSelectPreset: (preset: ClipPathPreset) => void;
}

const presetToClipPath = (preset: ClipPathPreset) => {
    const points = preset.points.map(({ x, y }) => `${x}% ${y}%`).join(", ");

    return `polygon(${points})`;
};

export const Presets = ({ presets, onSelectPreset }: PresetsProps) => {
    const [viewPresets, setViewPresets] = useState(presets.slice(0, 10));

    return (
        <div className="col-stretch-2 w-full p-2 rounded-[12px] bg-fg/4 border-1 border-fg/8">
            <div className="grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] gap-2 w-full">
                {viewPresets.map((preset) => {
                    const clipPath = presetToClipPath(preset);

                    return (
                        <ItemWithCopy
                            key={preset.id}
                            handleAction={() => onSelectPreset(preset)}
                            item={{
                                id: preset.id,
                                title: preset.name,
                                content: {
                                    clipPath,
                                    WebkitClipPath: clipPath,
                                    background: "var(--foreground)",
                                },
                                copyContent: `clip-path: ${clipPath};`,
                            }}
                        />
                    );
                })}
            </div>

            {presets.length > 10 && (
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
                                : presets.slice(0, 10),
                        )
                    }
                />
            )}
        </div>
    );
};
