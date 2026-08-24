import { useGetCssSelectorQuery } from "@/services/CSSSelector/css-selector.api";
import { useLayoutEffect, useRef } from "react";
import { useCodeFieldContext } from "./providers/CodeFieldProvider";

export const ToggleViewCode = ({ name }: { name: string }) => {
    const { setViewFields, viewFields } = useCodeFieldContext();
    const containerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const { data } = useGetCssSelectorQuery({
        name,
    });

    const setTrackPosition = (el: HTMLDivElement) => {
        const track = trackRef.current;

        if (!track) return;

        track.style.left = `${el.offsetLeft}px`;
        track.style.width = `${el.clientWidth}px`;
        track.style.height = `${el.clientHeight}px`;
    };

    const handleClick = (
        e: React.MouseEvent<HTMLDivElement>,
        index?: number,
    ) => {
        setTrackPosition(e.currentTarget);

        if (index)
            setViewFields(
                [1, 2].includes(index)
                    ? index === 1
                        ? "html"
                        : "css"
                    : "javascript",
            );
    };

    useLayoutEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const firstButton = container.children[0] as HTMLDivElement;
        setTrackPosition(firstButton);
        setViewFields("html");
    }, []);

    return (
        <div
            ref={containerRef}
            className="
                relative
                row-center-1
                overflow-visible
                p-[2px]
                rounded-lg
                bg-fg/3
                shadow-[inset_0_0_6px_1px]
                shadow-black/45
            "
        >
            {data?.example?.html && (
                <div
                    onClick={(e) => handleClick(e, 1)}
                    className={`
                    text-[12px]
                    cursor-pointer
                    hover:bg-fg/35
                    select-none
                    rounded-lg
                    p-1
                    px-3
                    ${
                        viewFields === "html"
                            ? "text-app pointer-events-none bg-transparent"
                            : "text-fg pointer-events-auto"
                    }
                    transition-[color, border-color]
                    duration-300
                    ease-in-out`}
                >
                    html
                </div>
            )}

            {data?.example?.css && (
                <div
                    onClick={(e) => handleClick(e, 2)}
                    className={`
                    text-[12px]
                    cursor-pointer
                    hover:bg-fg/35
                    select-none
                    rounded-lg
                    p-1
                    px-3
                    ${
                        viewFields === "css"
                            ? "text-app pointer-events-none bg-transparent"
                            : "text-fg pointer-events-auto"
                    }
                    transition-[color, border-color]
                    duration-300
                    ease-in-out`}
                >
                    css
                </div>
            )}

            {data?.example?.javascript && (
                <div
                    onClick={(e) => handleClick(e, 3)}
                    className={`
                    text-[12px]
                    cursor-pointer
                    hover:bg-fg/35
                    select-none
                    rounded-lg
                    p-1
                    px-3
                    ${
                        viewFields === "javascript"
                            ? "text-app pointer-events-none bg-transparent"
                            : "text-fg pointer-events-auto"
                    }
                    transition-[color, border-color]
                    duration-300
                    ease-in-out`}
                >
                    js
                </div>
            )}

            <div
                ref={trackRef}
                className="
                    absolute
                    top-1/2
                    -translate-y-1/2
                    bg-fg
                    -z-1
                    rounded-lg
                    pointer-events-none
                    transition-all
                    duration-300
                    ease-in-out
                "
            />
        </div>
    );
};
