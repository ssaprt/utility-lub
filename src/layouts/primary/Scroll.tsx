import { ScrollToFuture } from "scroll-to-future";

export const Scroll = ({
    imposition = "after",
    nativeOnMobile = true,
}: {
    imposition?: "over" | "after";
    nativeOnMobile?: boolean;
}) => {
    return (
        <ScrollToFuture
            nativeOnMobile={nativeOnMobile}
            scrollBar={{
                widthTrack: "10px",
                positionMode: "after",
                superimposition: imposition,
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
