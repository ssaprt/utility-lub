import { useAppContextValues } from "@/context/appContext";
import { useBreakpoint } from "@/hooks/useBreakPoint";
import {
    IconPlayerSkipBackFilled,
    IconPlayerSkipForwardFilled,
} from "@tabler/icons-react";
import { useRadioContext } from "../context/RadioContext";

export const PlayPrevNextButton = ({ dir }: { dir: "prev" | "next" }) => {
    const { viewRadioController } = useAppContextValues();

    const { player, playPreviousStation, playNextStation } = useRadioContext();
    const isDesktop = useBreakpoint("lg");

    const isCompact = isDesktop && viewRadioController === "compact";

    const disabled = !player.station || player.isLoading;

    const Icon =
        dir === "prev" ? IconPlayerSkipBackFilled : IconPlayerSkipForwardFilled;

    return (
        <button
            type="button"
            disabled={disabled}
            onClick={() => {
                if (dir === "prev") {
                    void playPreviousStation();

                    return;
                }

                void playNextStation();
            }}
            className={`
                flex
                items-center
                justify-center
                shrink-0
                rounded-full
                transition-[width,height,opacity,background-color]
                duration-300
                ease-in-out
                bg-fg/10
                hover:bg-fg/20
                hover:cursor-pointer
                active:bg-fg/25
                active:scale-95
                disabled:cursor-default
                disabled:opacity-40
                disabled:active:scale-100
                ${
                    isCompact
                        ? "w-0 h-0 opacity-0 pointer-events-none"
                        : "w-5 h-5 opacity-100"
                }
            `}
        >
            <Icon className="size-3.5 fill-fg text-fg" />
        </button>
    );
};
