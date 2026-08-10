import { useTheme } from "next-themes";
import { ScrollToFuture } from "scroll-to-future";

export const Scroll = () => {
    const { resolvedTheme } = useTheme();

    return (
        <ScrollToFuture
            scrollBar={{
                widthTrack: "12px",
                positionMode: "after",
                superimposition: "after",
                heightTrack: "98%",
            }}
            thumb={{
                boundaryOffset: "2px 1.5px",
            }}
            selectTheme={resolvedTheme === "dark" ? "graphite" : "violet"}
        />
    );
};
