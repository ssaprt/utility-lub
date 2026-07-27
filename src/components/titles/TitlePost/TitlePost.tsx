import { Loader } from "@/components/animationIcons/Loader/Loader";
import { formatRelativeDate } from "@/utils/formatRelativeDate";
import { IconCalendarPlus } from "@tabler/icons-react";
import type { ReactNode } from "react";
import { TablerIcon } from "./TablerIcon";

type TitlePostProps = {
    icon: string;
    description: string;
    children: ReactNode;
    date: string;
};

export const TitlePost = ({
    icon,
    description,
    children,
    date,
}: TitlePostProps) => {
    return (
        <div className="flex flex-col gap-2">
            <div
                className="relative flex flex-row items-center justify-between gap-2 bg-pink-500/5 rounded-[40px] pr-[var(--space-2)] 
                        shadow-[0_0_2px_1px_rgba(251,132,255,0.45)] px-[var(--space-3)] py-[var(--space-2)]
                        "
            >
                <Loader visible mode="space" />
                <div className="flex flex-row gap-1 items-center">
                    <TablerIcon
                        name={icon}
                        className="h-7 w-7 shrink-0 text-pink-300"
                    />

                    <span className="sr-only" data-pagefind-meta="icon">
                        {icon}
                    </span>

                    <span className="sr-only" data-pagefind-meta="description">
                        {description}
                    </span>

                    <h3 className="text-lg" data-pagefind-meta="title">
                        {children}
                    </h3>
                </div>

                <div
                    className="flex flex-row items-center gap-1 bg-black/15 rounded-[24px] 
                        shadow-[0_0_1px_1px_rgba(0,0,0,0.25)] px-[var(--space-3)] py-[var(--space-1)]"
                >
                    <IconCalendarPlus className="w-6 h-6" />
                    <span className="flex text-sm" data-pagefind-meta="date">
                        update {formatRelativeDate(date)}
                    </span>
                </div>
            </div>
            <span className="pl-4 w-full text-xs mt-2">{description}</span>
        </div>
    );
};
