import { cssCursorCategories } from "./cursor.types";
import { Presets } from "./Presets";

export const Categories = () => {
    return (
        <div className="col-start-10 w-full mt-4">
            {Object.entries(cssCursorCategories).map(([category, cursors]) => (
                <div
                    key={category}
                    className="col-start-4 w-full bg-fg/5 p-4 rounded-md"
                >
                    <div className="row-center-1 justify-between w-full">
                        <span className="text-[14px] text-fg">{category}</span>
                        <div className="bg-fg/10 p-1 rounded-full w-6 h-6 [&>*]:text-[10px] row-center-1 justify-center">
                            <span>{cursors.length}</span>
                        </div>
                    </div>

                    <Presets category={cursors} />
                </div>
            ))}
        </div>
    );
};
