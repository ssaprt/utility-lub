export type DateValue = string | number | Date;

const DEFAULT_NOW = new Date();

const parseDate = (value: DateValue): Date => {
    if (value instanceof Date) {
        const date = new Date(value.getTime());

        if (Number.isNaN(date.getTime())) {
            throw new Error("Invalid Date");
        }

        return date;
    }

    if (typeof value === "number") {
        const date = new Date(value);

        if (Number.isNaN(date.getTime())) {
            throw new Error("Invalid timestamp");
        }

        return date;
    }

    const match = value.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);

    if (!match) {
        throw new Error("Wrong date format. Should be DD/MM/YYYY");
    }

    const [, day, month, year] = match;

    const date = new Date(Number(year), Number(month) - 1, Number(day));

    if (
        date.getFullYear() !== Number(year) ||
        date.getMonth() !== Number(month) - 1 ||
        date.getDate() !== Number(day)
    ) {
        throw new Error("Invalid date");
    }

    return date;
};

export const formatRelativeDate = (
    value?: DateValue | null,
    now: Date = DEFAULT_NOW,
): string => {
    const date = value == null ? now : parseDate(value);

    const target = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
    );

    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    if (target.getTime() === today.getTime()) {
        return "Today";
    }

    const yesterday = new Date(today);

    yesterday.setDate(yesterday.getDate() - 1);

    if (target.getTime() === yesterday.getTime()) {
        return "Yesterday";
    }

    return new Intl.DateTimeFormat("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
    }).format(date);
};
