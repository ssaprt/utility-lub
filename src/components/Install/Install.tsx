import { IconLayoutSidebarLeftCollapseFilled } from "@tabler/icons-react";
import { Documentation } from "../Documentation/Documentation";

export const Install = ({ packageName }: { packageName: string }) => {
    return (
        <div className="flex flex-col gap-4 border-2 border-pink-300/60 bg-pink-400/10 border-solid rounded-xl py-4 px-4 items-start z-1">
            <span className="flex flex-row items-center gap-2 !text-pink-300 !text-[18px] !ml-2 font-bold tracking-[1.1px]  capitalize !font-[sans-serif]">
                <IconLayoutSidebarLeftCollapseFilled /> INSTALALTION
            </span>
            <Documentation titleEnd="NPM" code={`npm i ${packageName}`} />
            <Documentation titleEnd="YARN" code={`yarn add ${packageName}`} />
            <Documentation
                titleEnd="PNPM"
                code={`pnpm install ${packageName}`}
            />
        </div>
    );
};
