import { IconLayoutSidebarLeftCollapseFilled } from "@tabler/icons-react";
import { TitleWithItemsBlock } from "../blocks/TitleWithItemsBlock/TitleWithItemsBlock";
import { ItemInstall } from "./ItemInstall";

export const Install = ({ packageName }: { packageName: string }) => {
    return (
        <TitleWithItemsBlock
            title={
                <div className="row-center-2 py-[2px]">
                    <IconLayoutSidebarLeftCollapseFilled />
                    <span className="text-md text-fg">INSTALALTION</span>
                </div>
            }
            classNameTitle="bg-transparent my-1"
            className="bg-black/10"
            classNameBody="!col-stretch-2"
        >
            <ItemInstall packageName={packageName} />
        </TitleWithItemsBlock>
    );
};
