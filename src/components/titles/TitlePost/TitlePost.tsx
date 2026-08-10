"use client";

import { Loader } from "@/components/animationIcons/Loader/Loader";
import { DataLoader } from "@/components/data-loader/DataLoader";
import { Recording, Version } from "@/components/notes/Version/Version";
import { getVersionPackages } from "@/lib/api/getVersionPackages";
import { formatRelativeDate } from "@/utils/formatRelativeDate";
import { IconCalendarPlus } from "@tabler/icons-react";
import {
    cloneElement,
    useState,
    type ReactElement,
    type ReactNode,
} from "react";
import { TablerIcon } from "./TablerIcon";

type IconElement = ReactElement<{
    className?: string;
}>;

type TitleIcon =
    | string
    | {
          component: IconElement;
          meta: string;
      };

type TitlePostProps = {
    icon: TitleIcon;
    description: string;
    children: ReactNode;
    recordings?: Recording[];
    packageName?: string;
    useFn?: boolean;
};

export const TitlePost = ({
    icon,
    description,
    children,
    recordings,
    packageName,
    useFn = true,
}: TitlePostProps) => {
    const [recordingsList, setRecordingsList] = useState<Recording[]>(
        recordings || [],
    );

    const [lastUpdate, setLastUpdate] = useState(
        new Date().toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        }),
    );

    const fetchRecordings = async () => {
        const result = await getVersionPackages(packageName || "");

        if (result) {
            setRecordingsList(result);
            setLastUpdate(result[0].date);

            return true;
        }

        return false;
    };

    const iconMeta = typeof icon === "string" ? icon : icon.meta;

    const renderedIcon =
        typeof icon === "string" ? (
            <TablerIcon name={icon} className="h-7 w-7 shrink-0 text-fg" />
        ) : (
            cloneElement(icon.component, {
                className: `
                    h-7
                    w-7
                    shrink-0
                    !fill-fg
                    ${icon.component.props.className ?? ""}
                `,
            })
        );

    return (
        <>
            <div className="flex flex-col gap-2">
                <div
                    className="
                        relative
                        flex
                        flex-row
                        items-center
                        justify-between
                        gap-2
                        bg-fg/5
                        rounded-[40px]
                        pr-[var(--space-2)]
                        shadow-[0_0_2px_1px]
                        shadow-fg/45
                        px-[var(--space-3)]
                        py-[var(--space-2)]
                    "
                >
                    <Loader visible mode="space" />

                    <div className="flex flex-row gap-1 items-center">
                        {renderedIcon}

                        <span className="sr-only" data-pagefind-meta="icon">
                            {iconMeta}
                        </span>

                        <span
                            className="sr-only"
                            data-pagefind-meta="description"
                        >
                            {description}
                        </span>

                        <h3
                            className="text-md font-outfit text-fg"
                            data-pagefind-meta="title"
                        >
                            {children}
                        </h3>
                    </div>

                    <div
                        className="
                            flex
                            flex-row
                            items-center
                            gap-1
                            bg-black/15
                            rounded-[24px]
                            shadow-[0_0_1px_1px_rgba(0,0,0,0.25)]
                            px-[var(--space-3)]
                            py-[var(--space-1)]
                        "
                    >
                        <IconCalendarPlus className="w-6 h-6 text-fg" />

                        <span
                            className="flex text-sm"
                            data-pagefind-meta="date"
                        >
                            update {formatRelativeDate(lastUpdate)}
                        </span>
                    </div>
                </div>

                <span className="pl-4 w-full text-xs mt-2">{description}</span>
            </div>

            <DataLoader
                responseFn={useFn ? fetchRecordings : undefined}
                errorText="Failed to load the version notes"
            >
                <Version recordings={recordingsList} />
            </DataLoader>
        </>
    );
};
