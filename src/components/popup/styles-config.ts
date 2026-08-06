import { CSSProperties } from "react";
import { AnimationDuration, AnimationsPopupType } from "./animations.type";
import { SizeType } from "./general.type";
import { PopupBlur } from "./popup.interface";

interface DefaultAnimationConfig {
    animationName: AnimationsPopupType;
    duration: AnimationDuration;
    easing: NonNullable<CSSProperties["animationTimingFunction"]>;
}

interface StylesConfigItem {
    style: CSSProperties;
    className?: string;
}

interface StylesConfig {
    index: number;

    animation: {
        open: DefaultAnimationConfig;
        close: DefaultAnimationConfig;
    };

    layer: {
        backgroundColor: NonNullable<CSSProperties["backgroundColor"]>;
        blur: PopupBlur;
        style: CSSProperties;
        className?: string;
    };

    close: {
        size: SizeType;
        timeOutShow?: AnimationDuration;
        style: CSSProperties;
        className?: string;

        timer: {
            style: CSSProperties;
            className?: string;
        };
    };

    customStyle: {
        container: StylesConfigItem;
        header: StylesConfigItem;
        body: StylesConfigItem;
    };
}

export const stylesConfig: StylesConfig = {
    index: 99999,

    animation: {
        open: {
            animationName: "fade-in",
            duration: 600,
            easing: "cubic-bezier(0.22, 1, 0.36, 1)",
        },

        close: {
            animationName: "fade-out",
            duration: 600,
            easing: "cubic-bezier(0.22, 1, 0.36, 1)",
        },
    },

    layer: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        blur: "0px",
        className: "",
        style: {},
    },

    close: {
        size: "32px",
        className: "",

        style: {
            position: "absolute",
            top: "8px",
            right: "8px",
            zIndex: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexShrink: 0,
            padding: 0,
            border: 0,
            borderRadius: "50%",
            color: "inherit",
            background: "transparent",
        },

        timer: {
            className: "",

            style: {},
        },
    },

    customStyle: {
        container: {
            className: "",

            style: {
                position: "absolute",
                top: "50%",
                left: "50%",
                translate: "-50% -50%",
                width: "auto",
                height: "auto",
                maxWidth: "100%",
                maxHeight: "100dvh",
                minWidth: "min(300px, 90vw)",
                minHeight: "200px",
                borderRadius: "12px",
                background:
                    "linear-gradient(283deg, rgba(115, 86, 209, 1) 0%, #8654b3 35%, rgba(82, 56, 128, 1) 74%, rgba(112, 38, 133, 1) 100%)",
                backgroundColor: "#8654b3",
                overflow: "hidden",
                padding: "10px",
            },
        },

        header: {
            className: "",

            style: {
                borderRadius: "12px",
            },
        },

        body: {
            className: "",

            style: {
                overflowX: "auto",
                overflowY: "auto",
            },
        },
    },
} satisfies StylesConfig;
