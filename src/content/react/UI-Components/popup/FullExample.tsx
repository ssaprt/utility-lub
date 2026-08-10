import { Documentation } from "@/components/Documentation/Documentation";
import { TransitionDropDown } from "@/content/react/UI-Components/Pagination/components/dropDown/TransitionDropDown/TransitionDropDown";

export const FullExample = () => {
    return (
        <TransitionDropDown title="FULL EXAMPLE" className="!rounded-[14px]">
            <Documentation
                titleEnd="App"
                code={`"use client";

import {
    CSSProperties,
    useRef,
    useState,
} from "react";
import {
    Popup,
    type PopupCloseTimerComponentProps,
} from "popup-from-future";
import "popup-from-future/style.css";

export const PopupFullExample = () => {
    const [isOpen, setIsOpen] = useState(false);

    const popupRef = useRef<HTMLDivElement>(null);

    return (
        <>
            <button
                type="button"
                onClick={() => setIsOpen(true)}
            >
                Open popup
            </button>

            <Popup
                ref={popupRef}
                isOpen={isOpen}
                open={setIsOpen}
                index={99999}
                preset="aurora"
                size={{
                    w: "650px",
                    h: "500px",
                }}
                animation={{
                    duration: 600,
                    easing: "cubic-bezier(0.22, 1, 0.36, 1)",

                    // animationName: "fade-in",

                    open: {
                        animationName: "zoom-in",
                        duration: 700,
                        easing: "cubic-bezier(0.34, 1.56, 0.64, 1)",
                    },

                    close: {
                        animationName: "blur-out",
                        duration: 450,
                        easing: "ease-in-out",
                    },
                }}
                layer={{
                    backgroundColor: "rgba(3, 7, 18, 0.72)",
                    blur: "12px",

                    style: {
                        padding: "20px",
                    },

                    className: "example-popup-layer",
                }}
                close={{
                    icon: (
                        <span
                            style={{
                                display: "grid",
                                placeItems: "center",
                                width: "100%",
                                height: "100%",
                                fontSize: "24px",
                            }}
                        >
                            ×
                        </span>
                    ),

                    // render: ({ close }) => (
                    //     <button
                    //         type="button"
                    //         onClick={close}
                    //     >
                    //         Close
                    //     </button>
                    // ),

                    size: "40px",

                    style: {
                        top: "12px",
                        right: "12px",
                        color: "#ffffff",
                        background: "rgba(255, 255, 255, 0.12)",
                        border: "1px solid rgba(255, 255, 255, 0.18)",
                        borderRadius: "50%",
                        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
                        backdropFilter: "blur(12px)",
                        WebkitBackdropFilter: "blur(12px)",
                    },

                    className: "example-popup-close",

                    timeOutShow: "5s",

                    timer: {
                        // render: ({
                        //     seconds,
                        //     remainingMs,
                        //     duration,
                        //     progress,
                        //     style,
                        //     className,
                        // }: PopupCloseTimerComponentProps) => (
                        //     <CustomTimer
                        //         seconds={seconds}
                        //         remainingMs={remainingMs}
                        //         duration={duration}
                        //         progress={progress}
                        //         style={style}
                        //         className={className}
                        //     />
                        // ),

                        style: {
                            color: "#ffffff",
                            background: "rgba(255, 255, 255, 0.08)",
                        },

                        className: "example-popup-timer",
                    },
                }}
                header={{
                    content: (
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "4px",
                            }}
                        >
                            <strong
                                style={{
                                    fontSize: "22px",
                                }}
                            >
                                Full popup example
                            </strong>

                            <span
                                style={{
                                    fontSize: "13px",
                                    opacity: 0.7,
                                }}
                            >
                                All available Popup props
                            </span>
                        </div>
                    ),
                }}
                customStyle={{
                    container: {
                        style: {
                            padding: "24px",
                            gap: "20px",

                            // width: "700px",
                            // height: "550px",

                            borderRadius: "28px",
                        },

                        className: "example-popup-container",
                    },

                    header: {
                        style: {
                            width: "100%",
                            paddingRight: "50px",
                            flexShrink: 0,
                        },

                        className: "example-popup-header",
                    },

                    body: {
                        style: {
                            width: "100%",
                            padding: "10px",
                            gap: "16px",
                            overflowX: "hidden",
                            overflowY: "auto",
                        },

                        className: "example-popup-body",
                    },
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "16px",
                        width: "100%",
                    }}
                >
                    <p>
                        Popup children can contain any React content.
                    </p>

                    <input
                        type="text"
                        placeholder="Input inside popup"
                    />

                    <textarea
                        placeholder="Textarea inside popup"
                        rows={4}
                    />

                    <div
                        style={{
                            display: "flex",
                            gap: "10px",
                        }}
                    >
                        <button type="button">
                            Action
                        </button>

                        <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                        >
                            Close from content
                        </button>
                    </div>
                </div>
            </Popup>
        </>
    );
};

const CustomTimer = ({
    seconds,
    remainingMs,
    duration,
    progress,
    style,
    className,
}: PopupCloseTimerComponentProps) => {
    return (
        <div
            className={className}
            style={
                {
                    ...style,
                    display: "grid",
                    placeItems: "center",
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                } as CSSProperties
            }
        >
            <span>{seconds}</span>

            <span
                style={{
                    display: "none",
                }}
            >
                {remainingMs}
                {duration}
                {progress}
            </span>
        </div>
    );
};`}
            />
        </TransitionDropDown>
    );
};
