import { clamp } from "@/content/CSS/Generator/BoxShadow/box-shadow.utils";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";

interface NumberInputProps {
    value: number;
    min: number;
    max: number;
    step?: number;
    ariaLabel: string;
    onChange: (value: number) => void;
}

export const NumberInput = ({
    value,
    min,
    max,
    step = 1,
    ariaLabel,
    onChange,
}: NumberInputProps) => {
    const changeValue = (direction: 1 | -1) => {
        onChange(
            clamp(Number((value + step * direction).toFixed(6)), min, max),
        );
    };

    return (
        <div className="relative w-full">
            <input
                type="number"
                aria-label={ariaLabel}
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(event) =>
                    onChange(clamp(Number(event.target.value), min, max))
                }
                className="
                    w-full
                    rounded-[4px]
                    bg-fg/10
                    py-1.5
                    pr-7
                    pl-2
                    text-[12px]
                    text-fg
                    outline-none

                    [appearance:textfield]
                    [&::-webkit-inner-spin-button]:appearance-none
                    [&::-webkit-outer-spin-button]:appearance-none
                "
            />

            <div
                className="
                    absolute
                    top-0
                    right-0
                    bottom-0
                    grid
                    w-6
                    grid-rows-2
                    overflow-hidden
                    rounded-r-[4px]
                    border-l
                    border-fg/10
                "
            >
                <button
                    type="button"
                    aria-label={`${ariaLabel} increase`}
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => changeValue(1)}
                    className="
                        flex
                        cursor-pointer
                        items-center
                        justify-center
                        bg-app
                        text-fg
                        transition-colors
                        hover:bg-fg/15
                    "
                >
                    <IconChevronUp className="size-3" />
                </button>

                <button
                    type="button"
                    aria-label={`${ariaLabel} decrease`}
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => changeValue(-1)}
                    className="
                        flex
                        cursor-pointer
                        items-center
                        justify-center
                        border-t
                        border-fg/10
                        bg-app
                        text-fg
                        transition-colors
                        hover:bg-fg/15
                    "
                >
                    <IconChevronDown className="size-3" />
                </button>
            </div>
        </div>
    );
};
