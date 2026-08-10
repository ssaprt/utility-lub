import { useId, type ChangeEvent } from "react";
import { useEveryPaginationContext } from "../../context/useEveryPagination";

export const Title = ({ title }: { title: string }) => {
    const context = useEveryPaginationContext();

    const { setAnimationSpeedValue, animationSpeedValue } = context ?? {};

    const inputId = useId();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const digitsOnly = event.target.value.replace(/\D/g, "");

        const numeric = digitsOnly === "" ? 0 : Number.parseInt(digitsOnly, 10);

        setAnimationSpeedValue?.(`${numeric}ms`);
    };

    return (
        <div
            className="
                grid
                w-full
                min-w-0
                grid-cols-[auto_minmax(12px,1fr)_auto_auto_minmax(12px,1fr)_auto]
                items-center
                gap-[0.6em]
                text-[clamp(10px,1vw,16px)]
            "
        >
            <span
                className="
                    ml-[0.5em]
                    shrink-0
                    rounded-full
                   
                    bg-fg/10
                    px-[1em]
                    py-[0.25em]
                    font-sans
                    text-[1em]
                    font-bold
                    uppercase
                    text-fg
                    shadow-xs
                    shadow-fg/40
                "
            >
                Theme
            </span>

            <span
                aria-hidden="true"
                className="
                    h-0
                    min-w-0
                    border-t-[0.125em]
                    border-dashed
                    border-fg/60
                "
            />

            <label
                htmlFor={inputId}
                className="
                    shrink-0
                    whitespace-nowrap
                    font-sans
                    text-[0.9em]
                    text-fg
                  
                "
            >
                speed (ms)
            </label>

            <input
                id={inputId}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={Number.parseInt(animationSpeedValue ?? "400ms", 10)}
                onChange={handleChange}
                aria-label="Animation speed in milliseconds"
                className="
                    w-[4.5em]
                    min-w-0
                    rounded-full
                    bg-fg/10
                    px-[1em]
                    py-[0.25em]
                    font-sans
                    !text-[0.9em]
                    tracking-[0.07em]
                    text-fg
                    shadow-xs
                    shadow-fg/40
                    outline-none
                    focus:outline-[0.125em]
                    focus:outline-offset-[0.125em]
                    focus:outline-fg
                "
            />

            <span
                aria-hidden="true"
                className="
                    h-0
                    min-w-0
                    border-t-[0.125em]
                    border-dashed
                    border-fg/60
                "
            />

            <span
                className="
                    mr-[0.5em]
                    max-w-[16em]
                    shrink-0
                    truncate
                    rounded-full
                    bg-fg/10
                    px-[1em]
                    py-[0.25em]
                    font-sans
                    text-[1em]
                    font-bold
                    capitalize
                    text-fg
                    shadow-xs
                    shadow-fg/40
                "
                title={title}
            >
                {title}
            </span>
        </div>
    );
};
