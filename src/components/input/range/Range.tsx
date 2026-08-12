export const Range = ({
    value,
    onChange,
    min,
    max,
    step,
}: {
    value: number;
    onChange: (value: number, e?: React.ChangeEvent<HTMLInputElement>) => void;
    min?: number;
    max?: number;
    step?: number;
}) => {
    return (
        <input
            className="
                    block
        h-5
        w-full
        cursor-pointer
        appearance-none
        bg-transparent

        [&::-webkit-slider-runnable-track]:h-2
        [&::-webkit-slider-runnable-track]:rounded-full
        [&::-webkit-slider-runnable-track]:bg-fg/15

        [&::-webkit-slider-thumb]:-mt-1.5
        [&::-webkit-slider-thumb]:size-5
        [&::-webkit-slider-thumb]:appearance-none
        [&::-webkit-slider-thumb]:rounded-full
        [&::-webkit-slider-thumb]:bg-fg
        [&::-webkit-slider-thumb]:shadow-md
        [&::-webkit-slider-thumb]:transition-transform
        [&::-webkit-slider-thumb]:duration-150

        hover:[&::-webkit-slider-thumb]:scale-110
        active:[&::-webkit-slider-thumb]:scale-95

        focus-visible:outline-none
        focus-visible:[&::-webkit-slider-thumb]:ring-2
        focus-visible:[&::-webkit-slider-thumb]:ring-fg/30
        focus-visible:[&::-webkit-slider-thumb]:ring-offset-2

        [&::-moz-range-track]:h-2
        [&::-moz-range-track]:rounded-full
        [&::-moz-range-track]:bg-fg/15

        [&::-moz-range-progress]:h-2
        [&::-moz-range-progress]:rounded-full
        [&::-moz-range-progress]:bg-fg

        [&::-moz-range-thumb]:size-5
        [&::-moz-range-thumb]:rounded-full
        [&::-moz-range-thumb]:border-0
        [&::-moz-range-thumb]:bg-fg
        [&::-moz-range-thumb]:shadow-md"
            type="range"
            min={min || 0}
            max={max || 100}
            step={step || 1}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                onChange(Number(e.target.value), e)
            }
            value={value || 0}
        />
    );
};
