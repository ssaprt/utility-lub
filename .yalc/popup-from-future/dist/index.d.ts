import * as react from 'react';
import { CSSProperties, ReactNode, ReactElement } from 'react';

type AnimationDuration = number | `${number}ms` | `${number}s`;
type GeneralAnimationProps = {
    animationName?: AnimationsPopupType;
    duration?: AnimationDuration;
    easing?: CSSProperties["animationTimingFunction"];
};
type PopupAnimationProps = GeneralAnimationProps & {
    open?: GeneralAnimationProps;
    close?: GeneralAnimationProps;
};
type AnimationsPopupInType = "fade-in" | "slide-up-in" | "slide-down-in" | "slide-left-in" | "slide-right-in" | "zoom-in" | "pop-in" | "drop-in" | "blur-in" | "rotate-in" | "flip-x-in" | "flip-y-in" | "tilt-in" | "bounce-in" | "pulse-in" | "heartbeat-in" | "shake-in" | "wobble-in" | "swing-in" | "rubber-band-in" | "jello-in" | "float-in" | "breathe-in" | "spin-in" | "glow-in" | "glitch-in" | "jump-in" | "press-in";
type AnimationsPopupOutType = "fade-out" | "slide-up-out" | "slide-down-out" | "slide-left-out" | "slide-right-out" | "zoom-out" | "pop-out" | "drop-out" | "blur-out" | "rotate-out" | "flip-x-out" | "flip-y-out" | "tilt-out" | "bounce-out" | "pulse-out" | "heartbeat-out" | "shake-out" | "wobble-out" | "swing-out" | "rubber-band-out" | "jello-out" | "float-out" | "breathe-out" | "spin-out" | "glow-out" | "glitch-out" | "jump-out" | "press-out";
type AnimationsPopupType = AnimationsPopupInType | AnimationsPopupOutType;

type SizeValue = number | `${number}px` | `${number}%` | `${number}vw` | `${number}vh` | `${number}dvw` | `${number}dvh`;
type SizeType = SizeValue | `${number}px ${number}px` | `${number}% ${number}%` | `${number}vw ${number}vh` | `${number}vw ${number}dvh` | {
    w: SizeValue;
    h: SizeValue;
};

interface PopupPresetStyle {
    style?: CSSProperties;
    className?: string;
}
interface PopupPreset {
    animation?: PopupAnimationProps;
    layer?: {
        backgroundColor?: CSSProperties["backgroundColor"];
        blur?: number | `${number}px`;
        style?: CSSProperties;
        className?: string;
    };
    close?: {
        size?: SizeType;
        style?: CSSProperties;
        className?: string;
        timer?: {
            style?: CSSProperties;
            className?: string;
        };
    };
    size?: SizeType;
    customStyle?: {
        container?: PopupPresetStyle;
        header?: PopupPresetStyle;
        body?: PopupPresetStyle;
    };
}
declare const popupPresets: {
    glass: PopupPreset;
    frosted: PopupPreset;
    midnight: PopupPreset;
    graphite: PopupPreset;
    obsidian: PopupPreset;
    snow: PopupPreset;
    ivory: PopupPreset;
    ocean: PopupPreset;
    aqua: PopupPreset;
    emerald: PopupPreset;
    forest: PopupPreset;
    mint: PopupPreset;
    amber: PopupPreset;
    sunset: PopupPreset;
    coral: PopupPreset;
    rose: PopupPreset;
    ruby: PopupPreset;
    wine: PopupPreset;
    violet: PopupPreset;
    lavender: PopupPreset;
    aurora: PopupPreset;
    cosmic: PopupPreset;
    neon: PopupPreset;
    cyber: PopupPreset;
    terminal: PopupPreset;
    steel: PopupPreset;
    chrome: PopupPreset;
    paper: PopupPreset;
    clay: PopupPreset;
    minimal: PopupPreset;
};
type PopupPresetName = keyof typeof popupPresets;

type PopupBlur = number | `${number}px`;
interface PopupCustomStyle {
    style?: CSSProperties;
    className?: string;
}
interface PopupCloseComponentProps {
    close: () => void;
}
interface PopupCloseTimerComponentProps {
    seconds: number;
    remainingMs: number;
    duration: number;
    progress: number;
    style?: CSSProperties;
    className?: string;
}
type PopupCloseRender = (props: PopupCloseComponentProps) => ReactElement | null;
type PopupCloseTimerRender = (props: PopupCloseTimerComponentProps) => ReactElement | null;
interface PopupInterface {
    children: ReactNode;
    isOpen: boolean;
    open?: (status: boolean) => void;
    className?: string;
    index?: number;
    animation?: PopupAnimationProps;
    preset?: PopupPresetName;
    layer?: {
        backgroundColor?: CSSProperties["backgroundColor"];
        blur?: PopupBlur;
        style?: CSSProperties;
        className?: string;
    };
    close?: {
        icon?: ReactNode;
        render?: PopupCloseRender;
        size?: SizeType;
        style?: CSSProperties;
        className?: string;
        timeOutShow?: AnimationDuration;
        timer?: {
            render?: PopupCloseTimerRender;
            style?: CSSProperties;
            className?: string;
        };
    };
    size?: SizeType;
    header?: {
        content: ReactNode;
    };
    customStyle?: {
        container?: PopupCustomStyle;
        header?: PopupCustomStyle;
        body?: PopupCustomStyle;
    };
}

declare const Popup: react.ForwardRefExoticComponent<PopupInterface & react.RefAttributes<HTMLDivElement>>;

export { type AnimationsPopupInType, type AnimationsPopupOutType, Popup, type PopupInterface, type PopupPresetName, popupPresets };
