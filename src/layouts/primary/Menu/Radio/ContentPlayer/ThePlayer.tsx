import {
    useAppContextActions,
    useAppContextValues,
} from "@/context/appContext";

import { useRadioContext } from "../context/RadioContext";

import { Controls } from "./Controls";
import { MarqueeText } from "./MarqueeText";
import { Volume } from "./Volume";

export const ThePlayer = ({
    cover,
    className,
}: {
    cover: React.ReactNode;
    className?: string;
}) => {
    const { viewRadioController } = useAppContextValues();
    const { setViewRadioController } = useAppContextActions();

    const { player, toLarge, transitionMode, setTransitionMode } =
        useRadioContext();

    const isFull = viewRadioController === "full";
    const isCompact = viewRadioController === "compact";

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

    const trackName =
        player.track?.title ||
        player.track?.streamTitle ||
        player.station?.name ||
        "Select a station";

    const artistName =
        player.error ||
        player.track?.artist ||
        player.station?.country ||
        "Internet radio";

    return (
        <div
            className={`
                flex
                h-full
                min-h-0
                w-full
                shrink-0
                items-center
                justify-start
                gap-2
                px-2
                py-1
                border-t
                border-t-fg/0
                box-border
                transition-colors
                duration-300
                ease-in-out
                ${isFull ? "border-t-fg/20" : ""}
                ${className}
            `}
        >
            <div
                onClick={() => {
                    setViewRadioController("full");
                    handleFullToggle();
                }}
                className="shrink-0 hover:cursor-pointer"
            >
                {cover}
            </div>

            <Controls />

            <div className="col-start-0 min-w-0 gap-[2px]">
                <MarqueeText
                    className="w-full text-[12px]"
                    duration={15}
                    gap={20}
                >
                    {trackName}
                </MarqueeText>

                <MarqueeText
                    className="
                        min-w-0
                        w-full
                        text-[10px]
                        text-fg/70
                        leading-[11px]
                    "
                    gap={20}
                    duration={15}
                >
                    {artistName}
                </MarqueeText>
            </div>

            <div className={`shrink-0`}>
                <Volume />
            </div>
        </div>
    );
};
