import { CSSProperties } from "react";
import { GradientPreset } from "./presetsGenerator";

export const Preset = ({ preset }: { preset: GradientPreset }) => {
    return (
        <div
            style={{ background: preset.gradient } as CSSProperties}
            className={`
                aspect-square
                w-full
                rounded-[4px]

                shadow-md
                shadow-black/20
                
                hover:cursor-pointer
                `}
        ></div>
    );
};
