import { CSSProperties, ReactNode } from "react";
import {
    AnimationDuration,
    GeneralAnimationProps,
    MergedAnimationProps,
    PopupAnimationProps,
} from "./animations.type";
import { SizeType } from "./general.type";
import {
    PopupBlur,
    PopupCloseRender,
    PopupCloseTimerRender,
    PopupInterface,
} from "./popup.interface";
import { stylesConfig } from "./styles-config";

type MergeProps = Pick<
    PopupInterface,
    "index" | "animation" | "layer" | "close" | "customStyle" | "size"
>;

interface MergedStyle {
    style: CSSProperties;
    className: string;
}

export interface MergedPopupConfig {
    index: number;

    animation: {
        open: MergedAnimationProps;
        close: MergedAnimationProps;
    };

    layer: {
        backgroundColor: NonNullable<CSSProperties["backgroundColor"]>;
        blur: `${number}px`;
        style: CSSProperties;
        className: string;
    };

    close: {
        icon?: ReactNode;
        render?: PopupCloseRender;
        timeOutShow?: `${number}ms` | `${number}s`;
        style: CSSProperties;
        className: string;

        timer: {
            render?: PopupCloseTimerRender;
            style: CSSProperties;
            className: string;
        };
    };

    customStyle: {
        container: MergedStyle;
        header: MergedStyle;
        body: MergedStyle;
    };
}

const resolveTime = (
    value: AnimationDuration,
): `${number}ms` | `${number}s` => {
    if (typeof value === "number") {
        if (!Number.isFinite(value)) {
            return "0ms";
        }

        return `${Math.max(0, value)}ms`;
    }

    return value;
};

const resolveOptionalTime = (
    value?: AnimationDuration,
): `${number}ms` | `${number}s` | undefined => {
    if (value === undefined) {
        return undefined;
    }

    return resolveTime(value);
};

const resolveBlur = (value: PopupBlur): `${number}px` => {
    if (typeof value === "number") {
        if (!Number.isFinite(value)) {
            return "0px";
        }

        return `${Math.max(0, value)}px`;
    }

    return value;
};

const resolveAnimation = (
    defaults: {
        animationName: MergedAnimationProps["animationName"];
        duration: AnimationDuration;
        easing: MergedAnimationProps["easing"];
    },
    animation?: PopupAnimationProps,
    phaseAnimation?: GeneralAnimationProps,
): MergedAnimationProps => {
    return {
        animationName:
            phaseAnimation?.animationName ??
            animation?.animationName ??
            defaults.animationName,

        duration: resolveTime(
            phaseAnimation?.duration ??
                animation?.duration ??
                defaults.duration,
        ),

        easing: phaseAnimation?.easing ?? animation?.easing ?? defaults.easing,
    };
};

const resolveSize = (
    size?: SizeType,
): Pick<CSSProperties, "width" | "height"> => {
    if (size === undefined) {
        return {};
    }

    if (typeof size === "number") {
        return {
            width: size,
            height: size,
        };
    }

    if (typeof size === "object") {
        return {
            width: size.w,
            height: size.h,
        };
    }

    const [width, height = width] = size.trim().split(/\s+/);

    return {
        width,
        height,
    };
};

const mergeClassNames = (...classNames: Array<string | undefined>): string => {
    return classNames
        .filter((className): className is string => Boolean(className?.trim()))
        .join(" ");
};

export const merge = ({
    index,
    animation,
    layer,
    close,
    customStyle,
    size,
}: MergeProps): MergedPopupConfig => {
    return {
        index: index ?? stylesConfig.index,

        animation: {
            open: resolveAnimation(
                stylesConfig.animation.open,
                animation,
                animation?.open,
            ),

            close: resolveAnimation(
                stylesConfig.animation.close,
                animation,
                animation?.close,
            ),
        },

        layer: {
            backgroundColor:
                layer?.backgroundColor ?? stylesConfig.layer.backgroundColor,

            blur: resolveBlur(layer?.blur ?? stylesConfig.layer.blur),

            style: {
                ...stylesConfig.layer.style,
                ...layer?.style,
            },

            className: mergeClassNames(
                stylesConfig.layer.className,
                layer?.className,
            ),
        },

        close: {
            icon: close?.icon,
            render: close?.render,

            timeOutShow: resolveOptionalTime(
                close?.timeOutShow ?? stylesConfig.close.timeOutShow,
            ),

            style: {
                ...stylesConfig.close.style,
                ...resolveSize(close?.size ?? stylesConfig.close.size),
                ...close?.style,
            },

            className: mergeClassNames(
                stylesConfig.close.className,
                close?.className,
            ),

            timer: {
                render: close?.timer?.render,

                style: {
                    ...stylesConfig.close.timer.style,
                    ...close?.timer?.style,
                },

                className: mergeClassNames(
                    stylesConfig.close.timer.className,
                    close?.timer?.className,
                ),
            },
        },

        customStyle: {
            container: {
                style: {
                    ...stylesConfig.customStyle.container.style,
                    ...resolveSize(size),
                    ...customStyle?.container?.style,
                },

                className: mergeClassNames(
                    stylesConfig.customStyle.container.className,
                    customStyle?.container?.className,
                ),
            },

            header: {
                style: {
                    ...stylesConfig.customStyle.header.style,
                    ...customStyle?.header?.style,
                },

                className: mergeClassNames(
                    stylesConfig.customStyle.header.className,
                    customStyle?.header?.className,
                ),
            },

            body: {
                style: {
                    ...stylesConfig.customStyle.body.style,
                    ...customStyle?.body?.style,
                },

                className: mergeClassNames(
                    stylesConfig.customStyle.body.className,
                    customStyle?.body?.className,
                ),
            },
        },
    };
};
