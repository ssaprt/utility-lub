import { ScrollToFuture } from "scroll-to-future";

export const Scroll = () => {
    return (
        <ScrollToFuture
            scrollBar={{
                widthTrack: "8px",
                positionMode: "after",
                superimposition: "over",
                heightTrack: "98%",
            }}
            thumb={{
                boundaryOffset: "2px 1.5px",
            }}
            selectTheme="violet"
        />
    );
};
