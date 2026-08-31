import { TitleWithItemsBlock } from "@/components/blocks/TitleWithItemsBlock/TitleWithItemsBlock";
import {
    animationPresetCategories,
    type AnimationPreset,
} from "./presetsGenerator";
import { Presets } from "./Presets";

interface CategoriesProps {
    onSelectPreset: (preset: AnimationPreset) => void;
}

export const Categories = ({ onSelectPreset }: CategoriesProps) => {
    return (
        <TitleWithItemsBlock title="Ready animation examples">
            <div className="col-start-10 mt-4 w-full">
                {animationPresetCategories.map((category) => (
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
