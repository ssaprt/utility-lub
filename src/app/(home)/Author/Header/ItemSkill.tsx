import { DynamicSvgIcon } from "@/components/svg/DynamicSVGIcon";
import { ReactNode } from "react";

export const ItemSkill = ({
    nameSkill,
    icon,
}: {
    nameSkill: string;
    icon?: ReactNode | string;
}) => {
    return (
        <div
            className="
               row-center-0
               gap-[2px]
               py-1
               px-2
               rounded-[2px]
               border
               border-.25
               border-fg/30
               select-none
               
               hover:cursor-pointer
               hover:bg-fg/70
               hover:[&>span]:text-app"
        >
            {icon ? (
                typeof icon === "string" ? (
                    <DynamicSvgIcon name={icon} className="w-2 h-2 fill-fg" />
                ) : (
                    icon
                )
            ) : (
                ""
            )}
            <span className="text-[8px] text-fg/70">{nameSkill}</span>
        </div>
    );
};
