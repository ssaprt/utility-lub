import { TitleWithItemsBlock } from "@/components/blocks/TitleWithItemsBlock/TitleWithItemsBlock";
import { Presets } from "./Presets";
import {
    gradientPresetCategories,
    type GradientPreset,
} from "./presetsGenerator";

interface CategoriesProps {
    onSelectPreset: (preset: GradientPreset) => void;
}

export const Categories = ({ onSelectPreset }: CategoriesProps) => {
    return (
        <TitleWithItemsBlock title="Just click on the desired gradient">
            <div className="col-start-10 w-full mt-4">
                {gradientPresetCategories.map((category) => (
                    <div key={category.id} className="col-start-1 w-full">
                        <span className="text-[14px] text-fg mb-4">
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
