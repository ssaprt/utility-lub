export const formatRelativeDate = (value: string, now = new Date()): string => {
    const match = value.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);

    if (!match) {
        throw new Error("Wrong date format. Should be DD/MM/YYYY");
    }

    const [, day, month, year] = match;

    const date = new Date(Number(year), Number(month) - 1, Number(day));

    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    if (date.getTime() === today.getTime()) {
        return "Today";
    }

    const yesterday = new Date(today);

    yesterday.setDate(yesterday.getDate() - 1);

    if (date.getTime() === yesterday.getTime()) {
        return "Yesterday";
    }

    return new Intl.DateTimeFormat("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
    }).format(date);
};
