"use client";

import { useAppContextValues } from "@/context/appContext";
import { useRadioContext } from "../context/RadioContext";
import { VolumeIcon } from "./VolumeIcon";

export const Volume = () => {
    const { viewRadioController } = useAppContextValues();
    const { player, setPlayer } = useRadioContext();

    const isCompact = viewRadioController === "compact";

    return (
        <div
            className={`row-center-1
                top-2.5
                border-1
                border-fg/0
                 rounded-md
                p-0
                ${
                    !isCompact &&
                    `
                    py-1
                    px-2
                    border-fg/10
                    bg-fg/5
                    top-0!`
                }
                transition-all
                duration-300
                ease-in-out
                `}
        >
            <VolumeIcon
                volume={player.volume}
                className="w-4.5 h-4.5 fill-fg"
            />

            <input
                type="range"
                min={0}
                max={100}
                step={1}
                value={player.volume}
                onChange={(event) =>
                    setPlayer((prev) => ({
                        ...prev,
                        volume: Number(event.target.value),
                    }))
                }
                style={
                    {
                        "--range-progress": `${player.volume}%`,
                    } as React.CSSProperties
                }
                className={`
                appearance-none
                w-16
                h-1
                shrink-0
                rounded-full
                border-0
                cursor-pointer
                bg-[linear-gradient(to_right,var(--foreground)_0_var(--range-progress),color-mix(in_srgb,var(--foreground)_18%,transparent)_var(--range-progress)_100%)]

                opacity-70
                transition-[opacity,filter]
                duration-200
                ease-out

                hover:opacity-100
                hover:brightness-110

                [&::-webkit-slider-runnable-track]:h-1
                [&::-webkit-slider-runnable-track]:rounded-full
                [&::-webkit-slider-runnable-track]:bg-transparent

                [&::-webkit-slider-thumb]:appearance-none
                [&::-webkit-slider-thumb]:size-3
                [&::-webkit-slider-thumb]:mt-[-4px]
                [&::-webkit-slider-thumb]:rounded-full
                [&::-webkit-slider-thumb]:border
                [&::-webkit-slider-thumb]:border-app/60
                [&::-webkit-slider-thumb]:bg-fg
                [&::-webkit-slider-thumb]:shadow-[0_2px_5px_rgba(0,0,0,0.25)]
                [&::-webkit-slider-thumb]:transition-[transform,box-shadow]
                [&::-webkit-slider-thumb]:duration-200

                hover:[&::-webkit-slider-thumb]:scale-110
                hover:[&::-webkit-slider-thumb]:shadow-[0_2px_8px_rgba(0,0,0,0.35)]

                [&::-moz-range-track]:h-1
                [&::-moz-range-track]:rounded-full
                [&::-moz-range-track]:bg-fg/15

                [&::-moz-range-progress]:h-1
                [&::-moz-range-progress]:rounded-full
                [&::-moz-range-progress]:bg-fg

                [&::-moz-range-thumb]:size-3
                [&::-moz-range-thumb]:rounded-full
                [&::-moz-range-thumb]:border
                [&::-moz-range-thumb]:border-app/60
                [&::-moz-range-thumb]:bg-fg
                [&::-moz-range-thumb]:shadow-[0_2px_5px_rgba(0,0,0,0.25)]

                focus-visible:outline-none`}
            />

            <span className="text-[10px] text-fg select-none">
                {player.volume}
            </span>
        </div>
    );
};
