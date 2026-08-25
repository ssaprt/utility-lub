import { ScrollToFuture } from "scroll-to-future";

export const Scroll = ({
    nativeOnMobile = true,
    scrollWidth,
    target,
    thumb,
    scrollBar,
    boundaryOffset,
    positionMode,
    heightTrack,
    paddingReservationMode = "include-target-padding",
    imposition = "over",
}: {
    imposition?: "over" | "after";
    nativeOnMobile?: boolean;
    scrollWidth?: `${number}px`;
    target?: React.RefObject<HTMLElement | null> | null;
    thumb?: {
        inactive?: {
            className: string;
        };
        hover?: {
            className: string;
        };
        active?: {
            className: string;
        };
    };
    scrollBar?: {
        inactive?: {
            className: string;
        };
        hover?: {
            className: string;
        };
        active?: {
            className: string;
        };
    };
    boundaryOffset?: `${number}px ${number}px` | `${number}px`;
    positionMode?: "before" | "after";
    heightTrack?:
        | (
              | `${number}px`
              | `${number}%`
              | `${number}dvh`
              | `${number}dsvh`
              | `${number}vh`
          )
        | undefined;
    paddingReservationMode?: "include-target-padding" | "scrollbar-only";
}) => {
    const scrollBarConfig =
        imposition === "after"
            ? {
                  widthTrack: scrollWidth ?? "10px",
                  positionMode: positionMode ?? "after",
                  superimposition: "after" as const,
                  paddingReservationMode,
                  heightTrack: heightTrack ?? "98%",
                  boundaryOffset,
              }
            : {
                  widthTrack: scrollWidth ?? "10px",
                  positionMode: positionMode ?? "after",
                  superimposition: "over" as const,
                  heightTrack: heightTrack ?? "98%",
                  boundaryOffset,
              };

    return (
        <ScrollToFuture
            target={target ?? null}
            nativeOnMobile={nativeOnMobile}
            scrollBar={scrollBarConfig}
            thumb={{
                boundaryOffset: "2px 1.5px",
            }}
            optionsTheme={{
                scrollBar: {
                    inactive: {
                        className:
                            scrollBar && scrollBar.inactive
                                ? scrollBar.inactive.className
                                : "bg-fg/5!",
                    },
                    hover: {
                        className:
                            scrollBar && scrollBar.hover
                                ? scrollBar.hover.className
                                : "bg-fg/15!",
                    },
                    active: {
                        className:
                            scrollBar && scrollBar.active
                                ? scrollBar.active.className
                                : "bg-fg/25!",
                    },
                },
                thumb: {
                    inactive: {
                        className:
                            thumb && thumb.inactive
                                ? thumb.inactive.className
                                : "bg-fg/50!",
                    },
                    hover: {
                        className:
                            thumb && thumb.hover
                                ? thumb.hover.className
                                : "bg-fg/70!",
                    },
                    active: {
                        className:
                            thumb && thumb.active
                                ? thumb.active.className
                                : "bg-fg/50!",
                    },
                },
            }}
            selectTheme="terminal"
        />
    );
};
