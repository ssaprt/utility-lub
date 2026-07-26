import { useAppContextValues } from "@/context/appContext";
import { useList, useProgress } from "@ssaprt/easy-pagination";
import { useEffect } from "react";

export const List = () => {
    const newList = useList();
    const { start, progress } = useProgress();
    const { header } = useAppContextValues();
    const { boxForAnimations } = header || {};

    const blur = start ? "0.4em" : "0em";

    useEffect(() => {
        const header = boxForAnimations;

        if (!header) {
            return;
        }

        header.style.left = "0";
        header.style.transition = "none";
        header.style.opacity = "0.7";
        header.style.width = `${progress}%`;

        if (progress === 100) {
            requestAnimationFrame(() => {
                header.style.transition = "opacity 1s linear";
                header.style.opacity = "0";
            });
        }
    }, [progress]);

    return (
        <div
            className="
                relative
                flex
                h-full
                min-h-0
                min-w-0
                w-full
                flex-1
                flex-wrap
                content-center
                items-center
                justify-center
                gap-[0.2em]
                overflow-y-auto
                p-[0.4em]
                text-[clamp(16px,2vw,30px)]
            "
        >
            <div
                aria-hidden="true"
                className="
                    pointer-events-none
                    absolute
                    inset-0
                    z-[2]
                    h-full
                    w-full
                    rounded-[0.8em]
                    bg-transparent
                    transition-[backdrop-filter]
                    duration-300
                    ease-in-out
                "
                style={{
                    backdropFilter: `blur(${blur})`,
                    WebkitBackdropFilter: `blur(${blur})`,
                }}
            />

            {newList.map((item, index) => (
                <span
                    className="
                        relative
                        shrink-0
                        text-[1em]
                        leading-[1.55]
                    "
                    key={index}
                >
                    {item as React.ReactNode}
                </span>
            ))}
        </div>
    );
};
