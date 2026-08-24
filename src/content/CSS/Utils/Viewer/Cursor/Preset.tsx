import { GeneralButton } from "@/components/button/GeneralButton/GeneralButton";
import { IconCode } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import { CSSCursor } from "./cursor.types";

export const Preset = ({ cursor }: { cursor: CSSCursor }) => {
    const refPreset = useRef<HTMLDivElement>(null);
    const [hoverParent, setHoverParent] = useState(false);

    useEffect(() => {
        const parent = refPreset.current?.parentElement as HTMLDivElement;

        if (!parent) return;

        const enter = () => setHoverParent(true);
        const leave = () => setHoverParent(false);

        parent.addEventListener("mouseenter", enter);
        parent.addEventListener("mouseleave", leave);

        return () => {
            parent.removeEventListener("mouseenter", enter);
            parent.removeEventListener("mouseleave", leave);
        };
    }, [cursor]);

    return (
        <div
            ref={refPreset}
            style={{
                cursor: cursor.name,
            }}
            className="
            relative
                flex-col
                gap-2
                justify-between
                p-2
                px-3
                pt-3
                shadow-md
                shadow-black/10
                border-1
                border-fg/10
                rounded-md

                [&>*]:text-[12px]!

                hover:shadow-lg
                hover:shadow-black/40
                hover:bg-fg/10
                hover:-translate-y-[2px]!
                transition-all
                duration-200
                ease-in-out
            "
        >
            <div className="col-start-2 justify-between h-full">
                <div className="w-full min-w-0">
                    <span className="font-bold! mr-1">Name:</span>
                    <span className="text-fg/70 break-words">
                        {cursor.name}
                    </span>
                </div>

                <div className="w-full min-w-0">
                    <span className="font-bold! mr-1">Description:</span>
                    <span className="text-fg/70 break-words">
                        {cursor.description}
                    </span>
                </div>

                <GeneralButton
                    className="transition-width duration-200 ease-in-out rounded-[4px]!"
                    variant="dashed"
                    textButton="Copy CSS"
                    copy={{
                        copyItem: `cursor:${cursor.name};`,
                    }}
                />
            </div>

            <div className="absolute! right-2 top-2 row-center-1! [&>*]:text-[10px] py-[2px] px-[4px] bg-fg/10 rounded-[4px] border-1 border-fg/20">
                <IconCode className="w-3 h-3" />
                <span>css:</span>
                <span>cursor:{cursor.name};</span>
            </div>
        </div>
    );
};
