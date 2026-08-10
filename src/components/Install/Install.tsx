import { IconLayoutSidebarLeftCollapseFilled } from "@tabler/icons-react";
import { Documentation } from "../Documentation/Documentation";
import { TitleWithItemsBlock } from "../blocks/TitleWithItemsBlock/TitleWithItemsBlock";

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
            <Documentation titleEnd="NPM" code={`npm i ${packageName}`} />
            <Documentation titleEnd="YARN" code={`yarn add ${packageName}`} />
            <Documentation
                titleEnd="PNPM"
                code={`pnpm install ${packageName}`}
            />
        </TitleWithItemsBlock>
    );
};
