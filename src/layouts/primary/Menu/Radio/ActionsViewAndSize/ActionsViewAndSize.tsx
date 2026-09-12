import { DynamicSvgIcon } from "@/components/svg/DynamicSVGIcon";
import {
    useAppContextActions,
    useAppContextValues,
} from "@/context/appContext";
import { useBreakpoint } from "@/hooks/useBreakPoint";
import { useRadioContext } from "../context/RadioContext";

export const ActionsViewAndSize = () => {
    const {
        transitionMode,
        setTransitionMode,
        toLarge,
        setPlayer,
        stopPlayback,
    } = useRadioContext();
    const {
        viewRadioController,
        menu: { openMenu },
    } = useAppContextValues();

    const { setViewRadioController } = useAppContextActions();

    const isDesktop = useBreakpoint("lg");

    const handleWidthToggle = () => {
        if (viewRadioController === "compact") {
            toLarge();
            return;
        }

        if (viewRadioController === "large" || viewRadioController === "full") {
            toCompact();
        }
    };

    const toCompact = () => {
        if (transitionMode === "closing") return;

        if (viewRadioController === "large") {
            setTransitionMode("large-compact");
            setViewRadioController("compact");
            return;
        }

        if (viewRadioController === "full") {
            setTransitionMode("full-compact-height");
            setViewRadioController("large");
        }
    };

    const handleFullToggle = () => {
        if (viewRadioController === "full") {
            toLarge();
            return;
        }

        toFull();
    };

    const toFull = () => {
        if (transitionMode === "closing") return;

        if (viewRadioController === "compact") {
            setTransitionMode("compact-full-width");
            setViewRadioController("large");
            return;
        }

        if (viewRadioController === "large") {
            setTransitionMode("large-full");
            setViewRadioController("full");
        }
    };

    const handleClose = () => {
        if (transitionMode === "closing") return;

        setTransitionMode("closing");
    };

    const arrowRotation = (() => {
        switch (viewRadioController) {
            case "compact":
                return "rotate-0";

            case "large":
                return "rotate-180";

            case "full":
                return "rotate-180";

            default:
                return "rotate-0";
        }
    })();

    return (
        <div
            className="
                        absolute
                        right-2
                        -top-[17px]
                        p-1
                        z-3
                        rounded-[4px]
                        bg-app
                        row-center-1
                        pattern-bg
                        border-1
                        border-fg/20
                    "
        >
            {openMenu && isDesktop && (
                <button
                    data-tooltip={
                        viewRadioController === "compact" ? "Large" : "Compact"
                    }
                    onClick={handleWidthToggle}
                    className="
                                rounded-[4px]
                                bg-fg/10
                                p-1
                                hover:cursor-pointer
                                hover:bg-fg/20
                            "
                >
                    <DynamicSvgIcon
                        name="arr.svg"
                        className={`
                                    w-4
                                    h-4
                                    fill-fg
                                    transition-transform
                                    duration-200
                                    ${arrowRotation}
                                `}
                    />
                </button>
            )}

            <button
                data-tooltip={viewRadioController === "full" ? "Large" : "Full"}
                onClick={handleFullToggle}
                className="
                            rounded-[4px]
                            bg-fg/10
                            p-1
                            hover:cursor-pointer
                            hover:bg-fg/20
                        "
            >
                <DynamicSvgIcon
                    name={
                        viewRadioController === "full"
                            ? "collapse.svg"
                            : "fullscreen.svg"
                    }
                    className="w-4 h-4 fill-fg"
                />
            </button>

            <button
                onClick={() => {
                    handleClose();
                    setPlayer((prev) => ({
                        ...prev,
                        play: "pause",
                    }));
                    stopPlayback();
                }}
                className="
                            rounded-[4px]
                            bg-fg/10
                            p-1
                            hover:cursor-pointer
                            hover:bg-fg/20
                        "
            >
                <DynamicSvgIcon name="close.svg" className="w-4 h-4 fill-fg" />
            </button>
        </div>
    );
};
