"use client";

import { CSSCursor } from "./cursor.types";
import { Preset } from "./Preset";

interface PresetsProps {
    category: CSSCursor[];
}

export const Presets = ({ category }: PresetsProps) => {
    return (
        <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full">
            {category.map((cursor) => (
                <Preset key={cursor.name} cursor={cursor} />
            ))}
        </div>
    );
};
