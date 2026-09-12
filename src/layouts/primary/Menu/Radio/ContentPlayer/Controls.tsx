import { GeneralButton } from "@/components/button/GeneralButton/GeneralButton";

import { useAppContextValues } from "@/context/appContext";

import { IconLoader2 } from "@tabler/icons-react";

import { useRadioContext } from "../context/RadioContext";

import { PlayPauseButton } from "./PlayPauseButton";

import { PlayPrevNextButton } from "./PlayPrevNextButton";

export const Controls = () => {
    const { player, togglePlay } = useRadioContext();

    const { viewRadioController } = useAppContextValues();

    const isCompact = viewRadioController === "compact";

    const isInitialLoading = player.isLoading && !player.station;

    return (
        <div className="flex shrink-0 items-center gap-1">
            <PlayPrevNextButton dir="prev" />

            <GeneralButton
                icon={
                    player.isLoading ? (
                        <IconLoader2 className="size-7! animate-spin" />
                    ) : (
                        <PlayPauseButton className="size-7!" />
                    )
                }
                className={`
                    p-1!
                    [&_*]:p-0!
                    ${isCompact ? "-mx-2!" : "mx-0!"}
                    transition-all
                    duration-300
                    ease-in-out
                    rounded-full!
                    gap-0!
                `}
                textButton=""
                variant="frame"
                disabled={isInitialLoading}
                handleAction={() => {
                    void togglePlay();
                }}
            />

            <PlayPrevNextButton dir="next" />
        </div>
    );
};
