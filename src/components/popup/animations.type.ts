import { CSSProperties } from "react";

export type AnimationDuration = number | `${number}ms` | `${number}s`;

export type GeneralAnimationProps = {
    animationName?: AnimationsPopupType;
    duration?: AnimationDuration;
    easing?: CSSProperties["animationTimingFunction"];
};

export type PopupAnimationProps = GeneralAnimationProps & {
    open?: GeneralAnimationProps;
    close?: GeneralAnimationProps;
};

export type MergedAnimationProps = {
    animationName: AnimationsPopupType;
    duration: `${number}ms` | `${number}s`;
    easing: NonNullable<CSSProperties["animationTimingFunction"]>;
};

export type AnimationsPopupInType =
    | "fade-in"
    | "slide-up-in"
    | "slide-down-in"
    | "slide-left-in"
    | "slide-right-in"
    | "zoom-in"
    | "pop-in"
    | "drop-in"
    | "blur-in"
    | "rotate-in"
    | "flip-x-in"
    | "flip-y-in"
    | "tilt-in"
    | "bounce-in"
    | "pulse-in"
    | "heartbeat-in"
    | "shake-in"
    | "wobble-in"
    | "swing-in"
    | "rubber-band-in"
    | "jello-in"
    | "float-in"
    | "breathe-in"
    | "spin-in"
    | "glow-in"
    | "glitch-in"
    | "jump-in"
    | "press-in";

export type AnimationsPopupOutType =
    | "fade-out"
    | "slide-up-out"
    | "slide-down-out"
    | "slide-left-out"
    | "slide-right-out"
    | "zoom-out"
    | "pop-out"
    | "drop-out"
    | "blur-out"
    | "rotate-out"
    | "flip-x-out"
    | "flip-y-out"
    | "tilt-out"
    | "bounce-out"
    | "pulse-out"
    | "heartbeat-out"
    | "shake-out"
    | "wobble-out"
    | "swing-out"
    | "rubber-band-out"
    | "jello-out"
    | "float-out"
    | "breathe-out"
    | "spin-out"
    | "glow-out"
    | "glitch-out"
    | "jump-out"
    | "press-out";

export type AnimationsPopupType =
    | AnimationsPopupInType
    | AnimationsPopupOutType;
