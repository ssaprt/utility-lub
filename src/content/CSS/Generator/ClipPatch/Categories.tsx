import { TitleWithItemsBlock } from "@/components/blocks/TitleWithItemsBlock/TitleWithItemsBlock";

import { Presets } from "./Presets";
import {
    clipPathPresetCategories,
    type ClipPathPreset,
} from "./presetsGenerator";

interface CategoriesProps {
    onSelectPreset: (preset: ClipPathPreset) => void;
}

export const Categories = ({ onSelectPreset }: CategoriesProps) => {
    return (
        <TitleWithItemsBlock title="Just click on the desired shape">
            <div className="col-start-10 mt-4 w-full">
                {clipPathPresetCategories.map((category) => (
                    <div key={category.id} className="col-start-1 w-full">
                        <span className="mb-4 text-[14px] text-fg">
                            {category.name}
                        </span>

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
