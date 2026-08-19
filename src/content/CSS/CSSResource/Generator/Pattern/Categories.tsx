import { TitleWithItemsBlock } from "@/components/blocks/TitleWithItemsBlock/TitleWithItemsBlock";

import { Presets } from "./Presets";
import { patternPresetCategories } from "./pattern.presets";
import type { PatternPreset } from "./pattern.types";

interface CategoriesProps {
    onSelectPreset: (preset: PatternPreset) => void;
}

export const Categories = ({ onSelectPreset }: CategoriesProps) => {
    return (
        <TitleWithItemsBlock title="Just click on the desired pattern">
            <div className="col-start-10 mt-4 w-full">
                {patternPresetCategories.map((category) => (
                    <div key={category.id} className="col-start-1 w-full">
                        <div className="row-center-2 mb-4 w-full">
                            <span className="text-[14px] text-fg">
                                {category.name}
                            </span>

                            <span className="ml-auto text-[11px] text-fg/50">
                                {category.presets.length}
                            </span>
                        </div>

                        <Presets
                            presets={category.presets}
                            onSelectPreset={onSelectPreset}
                        />
                    </div>
                ))}
            </div>
        </TitleWithItemsBlock>
    );
};
