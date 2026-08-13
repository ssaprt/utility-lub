import { TitleWithItemsBlock } from "@/components/blocks/TitleWithItemsBlock/TitleWithItemsBlock";
import { Presets } from "./Presets";
import { gradientPresetCategories } from "./presetsGenerator";

export const Categories = () => {
    return (
        <TitleWithItemsBlock title="Just click on the desired gradient">
            <div className="col-start-10 w-full mt-4">
                {gradientPresetCategories.map((category) => (
                    <div key={category.id} className="col-start-1 w-full">
                        <span className="text-[14px] text-fg mb-4">
                            {category.name}
                        </span>
                        <Presets key={category.id} presets={category.presets} />
                    </div>
                ))}
            </div>
        </TitleWithItemsBlock>
    );
};
