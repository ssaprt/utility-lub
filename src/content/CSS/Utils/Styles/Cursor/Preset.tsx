import { ItemWithCopy } from "@/components/blocks/Item/ItemWithCopy";
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
        <ItemWithCopy
            item={{
                id: `${cursor.name}`,
                title: cursor.name,
                copyContent: `cursor: ${cursor.name};`,
                content: (
                    <div
                        ref={refPreset}
                        className="
                                            col-stretch-2
                                            justify-between
                                            w-full
                                            h-full
                                            min-h-[190px]
                                            
                                            p-2
                                        "
                        style={{
                            cursor: cursor.name,
                        }}
                    >
                        <div className="col-start-2">
                            <div className="row-start-1 w-full flex-wrap">
                                <span className="text-[12px] text-fg">
                                    description:
                                </span>

                                <span className="text-[10px] text-fg/70">
                                    {cursor.description}
                                </span>
                            </div>
                            <div className="row-center-1 w-full">
                                <span className="text-[12px] text-fg">
                                    css:
                                </span>

                                <span className="text-[10px] text-fg/70">
                                    cursor: {cursor.name};
                                </span>
                            </div>
                        </div>
                        <div className="col-center-3 justify-between">
                            <span
                                className={`shrink-0
                                                text-center
                                                text-[12px]
                                                select-none
                                                text-fg
                                                p-1 px-2
                                                border-1
                                                border-dashed
                                                border-fg/30
                                                rounded-md
                                                ${hoverParent ? "bg-fg border-solid text-app!" : ""}
                                                `}
                            >
                                Copy CSS
                            </span>
                        </div>
                    </div>
                ),
            }}
        />
    );
};
