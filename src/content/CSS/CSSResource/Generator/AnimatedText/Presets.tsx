"use client";

import type { AnimatedTextPreset } from "./animated-text.presets";

import type { AnimatedTextConfig } from "./animated-text.type";

import { Preset } from "./Preset";

interface PresetsProps {
    category: AnimatedTextPreset[];

    config: AnimatedTextConfig;

    onSelect: (preset: AnimatedTextPreset) => void;
}

export const Presets = ({ category, config, onSelect }: PresetsProps) => {
    return (
        <div
            className="
                grid
                w-full
                grid-cols-1
                gap-3

                md:grid-cols-2
                lg:grid-cols-3
            "
        >
            {category.map((preset) => (
                <Preset
                    key={preset.id}
                    preset={preset}
                    config={config}
                    onSelect={onSelect}
                />
            ))}
        </div>
    );
};
