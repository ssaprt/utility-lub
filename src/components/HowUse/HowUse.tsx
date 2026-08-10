import { IconBook2 } from "@tabler/icons-react";
import { TitleWithItemsBlock } from "../blocks/TitleWithItemsBlock/TitleWithItemsBlock";

export const HowUse = ({ children }: { children: React.ReactNode }) => {
    return (
        <TitleWithItemsBlock
            title={
                <div className="row-center-2 py-[2px]">
                    <IconBook2 />
                    <span className="text-md text-fg">HOW USE</span>
                </div>
            }
            classNameTitle="bg-transparent my-1"
            className="bg-black/10"
        >
            {children}
        </TitleWithItemsBlock>
    );
};
