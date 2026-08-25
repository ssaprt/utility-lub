import type { NpmPackageSortField, NpmPackagesStats } from "./npm.types";

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

const isDateField = (
    field: NpmPackageSortField,
): field is "created" | "modified" =>
    field === "created" || field === "modified";

export const topFivePackages = (
    data: NpmPackagesStats | undefined,
    fieldSort: NpmPackageSortField,
): NpmPackagesStats | null => {
    if (!data) return null;

    const packages = data.packages
        .filter((item) => {
            if (isDateField(fieldSort)) {
                return !Number.isNaN(new Date(item.time[fieldSort]).getTime());
            }

            return item[fieldSort] > 0;
        })
        .toSorted((a, b) => {
            if (isDateField(fieldSort)) {
                return (
                    new Date(b.time[fieldSort]).getTime() -
                    new Date(a.time[fieldSort]).getTime()
                );
            }

            return b[fieldSort] - a[fieldSort];
        })
        .slice(0, 5)
        .map((item) => {
            if (!isDateField(fieldSort)) {
                return item;
            }

            return {
                ...item,
                time: {
                    ...item.time,
                    [fieldSort]: formatReleaseDate(item.time[fieldSort]),
                },
            };
        });

    return {
        ...data,
        packagesCount: packages.length,
        packages,
    };
};
