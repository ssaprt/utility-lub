"use client";

import { CSSCursor } from "./cursor.types";
import { Preset } from "./Preset";

interface PresetsProps {
    category: CSSCursor[];
}

export const Presets = ({ category }: PresetsProps) => {
    return (
        <div className="col-stretch-2 w-full">
            <div
                className="
                    grid
                    grid-cols-2
                    items-stretch
                    gap-2
                    w-full

                    md:grid-cols-[repeat(auto-fill,220px)]
                    md:justify-start
                "
            >
                {category.map((cursor, i) => (
                    <div
                        key={cursor.name}
                        className="
                            min-w-0
                            h-full
                            [&>*]:h-full
                        "
                    >
                        <Preset cursor={cursor} />
                    </div>
                ))}
            </div>
        </div>
    );
};
