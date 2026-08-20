import { ScrollToFuture } from "scroll-to-future";

export const Scroll = ({
    imposition = "after",
    nativeOnMobile = true,
    scrollWidth,
    target,
}: {
    imposition?: "over" | "after";
    nativeOnMobile?: boolean;
    scrollWidth?: `${number}px`;
    target?: React.RefObject<HTMLElement | null> | null;
}) => {
    return (
        <ScrollToFuture
            target={target ?? null}
            nativeOnMobile={nativeOnMobile}
            scrollBar={{
                widthTrack: scrollWidth ?? "10px",
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
