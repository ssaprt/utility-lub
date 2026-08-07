import { Loader } from "@/components/animationIcons/Loader/Loader";
import { Recording, Version } from "@/components/notes/Version/Version";
import { getVersionPackages } from "@/lib/api/getVersionPackages";
import { formatRelativeDate } from "@/utils/formatRelativeDate";
import { IconCalendarPlus } from "@tabler/icons-react";
import Image from "next/image";
import { useEffect, useState, type ReactNode } from "react";
import { TablerIcon } from "./TablerIcon";

type TitlePostProps = {
    icon: string;
    description: string;
    children: ReactNode;

    recordings?: Recording[];
    packageName?: string;
};

const isImageSource = (value: string) => {
    return (
        value.startsWith("data:image/") ||
        value.startsWith("blob:") ||
        /\.(svg|png|webp|jpe?g)(?:[?#].*)?$/i.test(value)
    );
};

export const TitlePost = ({
    icon,
    description,
    children,
    recordings,
    packageName,
}: TitlePostProps) => {
    const [again, setAgain] = useState(false);
    const [recordingsList, setRecordingsList] = useState<Recording[]>(
        recordings || [],
    );
    const [lastUpdate, setLastUpdate] = useState(
        new Date().toLocaleDateString("en-US", {
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
        }),
    );

    useEffect(() => {
        if (!packageName) return;
        const fetchRecordings = async () => {
            const result = await getVersionPackages(packageName);
            if (result) {
                setRecordingsList(result);
                setLastUpdate(result[0].date);
            }
            setAgain(false);
        };

        fetchRecordings();
    }, [again, packageName]);

    return (
        <>
            <div className="flex flex-col gap-2">
                <div
                    className="relative flex flex-row items-center justify-between gap-2 bg-pink-500/5 rounded-[40px] pr-[var(--space-2)] 
                        shadow-[0_0_2px_1px_rgba(251,132,255,0.45)] px-[var(--space-3)] py-[var(--space-2)]
                        "
                >
                    <Loader visible mode="space" />
                    <div className="flex flex-row gap-1 items-center">
                        {isImageSource(icon) ? (
                            <Image
                                className="w-7 h-7"
                                src={`/${icon}`}
                                alt={`${icon}`}
                                width={0}
                                height={0}
                            />
                        ) : (
                            <TablerIcon
                                name={icon}
                                className="h-7 w-7 shrink-0 text-pink-300"
                            />
                        )}

                        <span className="sr-only" data-pagefind-meta="icon">
                            {icon}
                        </span>

                        <span
                            className="sr-only"
                            data-pagefind-meta="description"
                        >
                            {description}
                        </span>

                        <h3
                            className="text-lg text-pink-300"
                            data-pagefind-meta="title"
                        >
                            {children}
                        </h3>
                    </div>

                    <div
                        className="flex flex-row items-center gap-1 bg-black/15 rounded-[24px] 
                        shadow-[0_0_1px_1px_rgba(0,0,0,0.25)] px-[var(--space-3)] py-[var(--space-1)]"
                    >
                        <IconCalendarPlus className="w-6 h-6" />
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
            <Version
                again={again}
                setAgain={setAgain}
                recordings={recordingsList}
            />
        </>
    );
};
