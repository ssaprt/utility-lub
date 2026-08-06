import { ScrollToFuture } from "scroll-to-future";

interface TableWithScrollProps<T extends object> {
    data: T[];
}

const renderValue = (value: unknown) => {
    if (value === null) {
        return "null";
    }

    if (value === undefined) {
        return "";
    }

    if (typeof value === "object") {
        return JSON.stringify(value);
    }

    return String(value);
};

export const TableWithScroll = <T extends object>({
    data,
}: TableWithScrollProps<T>) => {
    if (data.length === 0) {
        return null;
    }

    const columns = Object.keys(data[0]) as Array<keyof T>;

    return (
        <div className="relative h-[60vh] w-full overflow-auto">
            <table className="w-full border-collapse border border-pink-300/20 text-xs">
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <th
                                key={String(column)}
                                className="z-10 border px-4 py-2 text-left whitespace-nowrap"
                            >
                                {String(column)}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {columns.map((column) => (
                                <td
                                    key={String(column)}
                                    className="border border-pink-300/20 px-4 py-2 whitespace-nowrap"
                                >
                                    {renderValue(row[column])}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            <ScrollToFuture
                nativeOnMobile={false}
                scrollBar={{
                    mode: "both",
                    positionMode: "before",
                }}
            />

            <ScrollToFuture
                nativeOnMobile={false}
                scrollBar={{
                    mode: "both",
                    positionMode: "after",
                }}
            />
        </div>
    );
};
