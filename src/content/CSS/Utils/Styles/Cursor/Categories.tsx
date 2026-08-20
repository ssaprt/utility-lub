import { TitleWithItemsBlock } from "@/components/blocks/TitleWithItemsBlock/TitleWithItemsBlock";

import { cssCursorCategories } from "./cursor.types";
import { Presets } from "./Presets";

export const Categories = () => {
    return (
        <TitleWithItemsBlock title="Simply hover over the item you want to demonstrate. Clicking copies the styles.">
            <div className="col-start-10 w-full mt-4">
                {Object.entries(cssCursorCategories).map(
                    ([category, cursors]) => (
                        <div key={category} className="col-start-4 w-full">
                            <div className="row-center-1 justify-between w-full bg-fg/5 p-2 px-4 rounded-[4px] border border-fg/10">
                                <span className="text-[14px] text-fg">
                                    {category}
                                </span>
                                <b className="text-sm">{cursors.length}</b>
                            </div>

                            <Presets category={cursors} />
                        </div>
                    ),
                )}
            </div>
        </TitleWithItemsBlock>
    );
};
