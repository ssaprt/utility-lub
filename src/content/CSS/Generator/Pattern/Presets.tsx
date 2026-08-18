"use client";

import { ItemWithCopy } from "@/components/blocks/Item/ItemWithCopy";
import { GeneralButton } from "@/components/button/GeneralButton/GeneralButton";
import { IconMenuOrder } from "@tabler/icons-react";
import { useState } from "react";

import type { PatternPreset } from "./pattern.types";
import { patternConfigToStyle } from "./pattern.utils";

interface PresetsProps {
    presets: PatternPreset[];
    onSelectPreset: (preset: PatternPreset) => void;
}

export const Presets = ({ presets, onSelectPreset }: PresetsProps) => {
    const [viewPresets, setViewPresets] = useState(presets.slice(0, 10));

    return (
        <div className="col-stretch-2 w-full rounded-[12px] border-1 border-fg/8 bg-fg/4 p-2">
            <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(100px,1fr))] gap-2">
                {viewPresets.map((preset) => (
                    <ItemWithCopy
                        key={preset.id}
                        handleAction={() => onSelectPreset(preset)}
                        item={{
                            id: preset.id,
                            title: preset.name,
                            content: patternConfigToStyle(preset.config),
                        }}
                    />
                ))}
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
