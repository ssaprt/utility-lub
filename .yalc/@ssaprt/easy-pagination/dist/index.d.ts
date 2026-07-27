import * as react from 'react';
import { CSSProperties } from 'react';

type Arrow = {
    iconElement: React.ReactNode;
    direction: "prev" | "next";
};
type ParamsArrow = {
    arrowStart?: {
        use?: boolean;
        props?: Arrow;
    };
    arrowEnd?: {
        use?: boolean;
        props?: Arrow;
    };
};

interface ParamsPagination {
    arrows?: ParamsArrow;
}

type CSSPartial = {
    background?: string;
    border: CSSStyleDeclaration["border"];
    borderColor?: never;
    borderWidth?: never;
    borderSize?: never;
    borderStyle?: never;
    borderRadius?: CSSStyleDeclaration["borderRadius"];
} | {
    background?: string;
    border?: never;
    borderWidth?: `${number}px` | number;
    borderSize?: `${number}px` | number;
    borderColor?: string;
    borderStyle?: "solid" | "outset" | "inset" | "groove" | "double";
    borderRadius?: string;
};
type Sizes = {
    w?: number;
    h?: number;
};

type ThemeArrowsEvents = {
    color?: string;
    fill?: string;
    stroke?: string;
    background?: string;
    borderRadius?: string;
    transform?: CSSProperties["transform"];
    transition?: CSSProperties["transition"];
};
type ThemeArrow = {
    style?: CSSProperties;
    className?: string;
    size?: Sizes;
    hover?: ThemeArrowsEvents;
    active?: ThemeArrowsEvents;
    disabled?: ThemeArrowsEvents;
    icon?: {
        style?: Omit<React.CSSProperties, "transform">;
        className?: string;
        size?: Sizes;
    };
} & ThemeArrowsEvents;

type ThemeTrackButton = {
    style?: Omit<React.CSSProperties, "display" | "flexDirection" | "alignItems" | "justifyContent">;
    className?: string;
    active?: CSSPartial & {
        shadowDirectionColor?: string;
    };
    radius?: CSSStyleDeclaration["borderRadius"];
    shadowDirectionSize?: number | `${number}px`;
    shadowDirectionColor?: string;
    shadowDirectionBlur?: number;
} & CSSPartial;

type ThemeItem = {
    size?: Sizes;
    active?: {
        color?: string;
        transition?: string;
    } & CSSPartial;
    hover?: {
        color?: string;
        transition?: string;
    } & CSSPartial;
    color?: string;
    style?: React.CSSProperties;
    className?: string;
    transition?: string;
} & CSSPartial;

type ThemeMain = {
    style?: Omit<React.CSSProperties, "display" | "flexDirection" | "alignItems" | "justifyContent">;
    className?: string;
};

type ThemeNavigation = {
    style?: Omit<React.CSSProperties, "display" | "flexDirection" | "alignItems" | "justifyContent">;
    className?: string;
};

type ThemeTrack = {
    style?: Omit<React.CSSProperties, "display" | "flexDirection" | "alignItems" | "justifyContent">;
    className?: string;
};

interface ThemePagination {
    style?: Omit<React.CSSProperties, "display" | "flexDirection" | "alignItems" | "justifyContent">;
    className?: string;
    arrows?: ThemeArrow;
    items?: ThemeItem;
    button?: ThemeTrackButton;
    track?: ThemeTrack;
    navigation?: ThemeNavigation;
    main?: ThemeMain;
}

type PresetsType = "white" | "lightBlue" | "blue" | "dark" | "roundedRich" | "roundedSpace" | "roundedAuroraNebula" | "roundedDeepSpaceVoid" | "roundedVoid" | "roundedBlackHole" | "roundedSolarFlare" | "roundedInferno" | "roundedTrimstone" | "roundedAbyssal" | "roundedOceanDepths" | "squaredForestMoss" | "squaredCyberpunkNeon" | ThemePagination;

type URLType = {
    mode: "url" | "storage";
    key: string;
};

type PaginationType<T> = {
    items: T[];
    children: React.ReactNode;
    mode?: "vertical" | "horizontal";
    navigation?: "start" | "end" | "full";
    itemsPerPage?: number;
    theme?: ThemePagination;
    selectTheme?: PresetsType;
    animationSpeed?: `${number}ms`;
    indexing?: URLType;
} & ParamsPagination;

declare const Pagination: (<T>({ children, ...props }: PaginationType<T>) => react.JSX.Element) & {
    displayName: string;
};

declare const useList: <T = React.ReactNode>() => T[];

type ProgressType = {
    start: boolean;
    progress: number;
    end: boolean;
};
declare const useProgress: () => ProgressType;

export { Pagination, type PaginationType, type PresetsType, useList, useProgress };
