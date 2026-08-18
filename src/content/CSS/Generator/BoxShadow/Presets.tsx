"use client";

import { ItemWithCopy } from "@/components/blocks/Item/ItemWithCopy";
import { GeneralButton } from "@/components/button/GeneralButton/GeneralButton";
import { IconMenuOrder } from "@tabler/icons-react";
import { useState } from "react";
import { boxShadowPresetToCss, type BoxShadowPreset } from "./presetsGenerator";

interface PresetsProps {
    presets: BoxShadowPreset[];
    onSelectPreset: (preset: BoxShadowPreset) => void;
}

export const Presets = ({ presets, onSelectPreset }: PresetsProps) => {
    const [viewPresets, setViewPresets] = useState(presets.slice(0, 10));

    return (
        <div className="col-stretch-2 w-full p-2 rounded-[12px] bg-fg/4 border-1 border-fg/8">
            <div className="grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] gap-2 w-full">
                {viewPresets.map((preset) => {
                    const boxShadow = boxShadowPresetToCss(preset);

                    return (
                        <ItemWithCopy
                            key={preset.id}
                            handleAction={() => onSelectPreset(preset)}
                            item={{
                                id: preset.id,
                                title: preset.name,
                                copyContent: `box-shadow: ${boxShadow};`,
                                content: (
                                    <div
                                        className="
                                            flex
                                            size-full
                                            items-center
                                            justify-center
                                            bg-[#e5e7eb]
                                        "
                                    >
                                        <div
                                            className="
                                                size-[52%]
                                                rounded-[6px]
                                                bg-white
                                            "
                                            style={{
                                                boxShadow,
                                            }}
                                        />
                                    </div>
                                ),
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
