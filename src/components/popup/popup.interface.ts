import { CSSProperties, ReactElement, ReactNode } from "react";
import { AnimationDuration, PopupAnimationProps } from "./animations.type";
import { SizeType } from "./general.type";

export type PopupBlur = number | `${number}px`;

export interface PopupCustomStyle {
    style?: CSSProperties;
    className?: string;
}

export interface PopupCloseComponentProps {
    close: () => void;
}

export interface PopupCloseTimerComponentProps {
    seconds: number;
    remainingMs: number;
    duration: number;
    progress: number;
    style?: CSSProperties;
    className?: string;
}

export type PopupCloseRender = (
    props: PopupCloseComponentProps,
) => ReactElement | null;

export type PopupCloseTimerRender = (
    props: PopupCloseTimerComponentProps,
) => ReactElement | null;

export interface PopupInterface {
    children: ReactNode;
    isOpen: boolean;
    open: (status: boolean) => void;

    index?: number;
    animation?: PopupAnimationProps;

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
