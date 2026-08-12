import { TitleWithItemsBlock } from "@/components/blocks/TitleWithItemsBlock/TitleWithItemsBlock";
import { Preset } from "./Preset";
import { gradientPresetCategories } from "./presetsGenerator";

export const Presets = () => {
    return (
        <TitleWithItemsBlock title="Just click on the desired gradient">
            <div className="col-start-10 w-full mt-4">
                {gradientPresetCategories.map((category) => (
                    <div key={category.id} className="col-start-1 w-full">
                        <span className="text-[14px] text-fg mb-4">
                            {category.name}
                        </span>
                        <div className="grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] gap-2 w-full">
                            {category.presets.map((preset) => (
                                <Preset key={preset.id} preset={preset} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </TitleWithItemsBlock>
    );
};
