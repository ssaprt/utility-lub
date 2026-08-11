import type { NpmPackagesStats } from "../NPMApi";

const formatReleaseDate = (value: string, now = new Date()): string => {
    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return value;
    }

    const currentDate = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
    );

    const releaseDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
    );

    if (releaseDate.getTime() === currentDate.getTime()) {
        return "Today";
    }

    const yesterday = new Date(currentDate);

    yesterday.setDate(yesterday.getDate() - 1);

    if (releaseDate.getTime() === yesterday.getTime()) {
        return "Yesterday";
    }

    return new Intl.DateTimeFormat("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
    }).format(date);
};

export const latestOrModifiedFive = (
    data: NpmPackagesStats | undefined,
    fieldSort: "created" | "modified" = "created",
): NpmPackagesStats | null => {
    if (!data) return null;

    const packages = data.packages
        .filter(
            (item) => !Number.isNaN(new Date(item.time[fieldSort]).getTime()),
        )
        .toSorted(
            (a, b) =>
                new Date(b.time[fieldSort]).getTime() -
                new Date(a.time[fieldSort]).getTime(),
        )
        .slice(0, 5)
        .map((item) => ({
            ...item,
            time: {
                ...item.time,
                [fieldSort]: formatReleaseDate(item.time[fieldSort]),
            },
        }));

    return {
        ...data,
        packagesCount: packages.length,
        packages,
    };
};
