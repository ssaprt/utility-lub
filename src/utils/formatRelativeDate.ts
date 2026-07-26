export const formatRelativeDate = (
    value: string,
    now: Date = new Date(),
): string => {
    const match = value.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);

    if (!match) {
        throw new Error("Wrong date format. Should be MM/DD/YYYY");
    }

    const [, month, day, year] = match;

    const monthNumber = Number(month);
    const dayNumber = Number(day);
    const yearNumber = Number(year);

    const date = new Date(yearNumber, monthNumber - 1, dayNumber);

    if (
        date.getFullYear() !== yearNumber ||
        date.getMonth() !== monthNumber - 1 ||
        date.getDate() !== dayNumber
    ) {
        throw new Error("Invalid date");
    }

    const targetTime = Date.UTC(yearNumber, monthNumber - 1, dayNumber);

    const currentTime = Date.UTC(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
    );

    const dayInMs = 24 * 60 * 60 * 1000;

    const differenceInDays = (currentTime - targetTime) / dayInMs;

    if (differenceInDays === 0) {
        return "Today";
    }

    if (differenceInDays === 1) {
        return "Yesterday";
    }

    return new Intl.DateTimeFormat("en-US", {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
    }).format(date);
};
