import * as react from 'react';

type PxValue = `${number}px`;
type BoundaryType = PxValue;
type BoundaryType2 = `${number}px ${number}px`;
type BoundaryOffset = BoundaryType | BoundaryType2;

type HeightTrackType = BoundaryType | `${number}%` | `${number}dvh` | `${number}dsvh` | `${number}vh`;
type ScrollBarMode = "horizontal" | "vertical" | "both";
type PositionMode = "before" | "after";
type Superimposition = "over" | "after";
type HideNativeScrollbarMode = false | "fine-pointer" | "always";
interface ScrollToFutureScrollBar {
    mode?: ScrollBarMode;
    hideNativeScrollbar?: HideNativeScrollbarMode;
    positionMode?: PositionMode;
    superimposition?: Superimposition;
    boundaryOffset?: BoundaryOffset;
    widthTrack?: PxValue;
    heightTrack?: HeightTrackType;
}

interface ScrollToFutureThumb {
    boundaryOffset?: BoundaryOffset;
    heightTrack?: `${number}%` | PxValue | "auto";
}

type PresetsThemeType = "primary" | "midnight" | "neonCyan" | "ocean" | "deepSea" | "forest" | "moss" | "lava" | "ember" | "gold" | "roseQuartz" | "violet" | "royal" | "arctic" | "glass" | "graphite" | "terminal" | "toxic" | "candy" | "sand" | "monoLight" | "monoDark";

type StatusElementsTheme = {
    inactive?: ScrollToFutureGeneralTypes;
    hover?: ScrollToFutureGeneralTypes;
    active?: ScrollToFutureGeneralTypes;
};
type ScrollToFutureGeneralTypes = {
    backgroundColor?: string;
    opacity?: number;
    border?: string;
    borderRadius?: string;
    outline?: string;
    boxShadow?: string;
    transition?: string;
    transform?: string;
};

type ScrollToFutureThemeProps = {
    scrollBar?: StatusElementsTheme;
    thumb?: StatusElementsTheme;
};

interface ScrollToFutureInterface {
    target?: React.RefObject<HTMLElement | null> | null;
    scrollBar?: ScrollToFutureScrollBar;
    thumb?: ScrollToFutureThumb;
    selectTheme?: PresetsThemeType;
    optionsTheme?: ScrollToFutureThemeProps;
    nativeOnMobile?: boolean;
}
type ScrollToFutureConfig = Omit<ScrollToFutureInterface, "target">;

declare const ScrollToFuture: ({ target, scrollBar, thumb, selectTheme, optionsTheme, nativeOnMobile, }: ScrollToFutureInterface) => react.JSX.Element;

export { ScrollToFuture, type ScrollToFutureConfig };
