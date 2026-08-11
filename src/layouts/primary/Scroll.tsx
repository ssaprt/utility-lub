import { useTheme } from "next-themes";
import { ScrollToFuture } from "scroll-to-future";

export const Scroll = () => {
    const { resolvedTheme } = useTheme();

    return (
        <ScrollToFuture
            scrollBar={{
                widthTrack: "10px",
                positionMode: "after",
                superimposition: "over",
                heightTrack: "98%",
            }}
            thumb={{
                boundaryOffset: "2px 1.5px",
            }}
            optionsTheme={{
                scrollBar: {
                    inactive: {
                        className: "bg-fg/5!",
                    },
                    hover: {
                        className: "bg-fg/15!",
                    },
                    active: { className: "bg-fg/25!" },
                },
                thumb: {
                    inactive: {
                        className: "bg-fg/50!",
                    },
                    hover: { className: "bg-fg/70!" },
                    active: { className: "bg-fg/50!" },
                },
            }}
            selectTheme="terminal"
        />
    );
};
