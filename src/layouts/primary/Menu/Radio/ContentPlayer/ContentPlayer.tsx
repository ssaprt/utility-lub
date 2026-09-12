import { useRadioContext } from "../context/RadioContext";
import { Cover } from "../Cover";
import { Equalizer } from "./Equalizer";
import { LargeBody } from "./LargeBody/LargeBody";
import { ThePlayer } from "./ThePlayer";

export const ContentPlayer = () => {
    const { player } = useRadioContext();

    return (
        <div className="flex h-full min-h-0 w-full flex-col">
            <LargeBody />

            <div
                className="
                    relative
                    isolate
                    mt-auto
                    h-13
                    min-h-13
                    w-full
                    shrink-0
                    overflow-hidden
                "
            >
                <Equalizer />

                <div className="relative z-2 h-full w-full">
                    <ThePlayer
                        cover={
                            <Cover
                                trackSrc={player.track?.coverUrl}
                                stationSrc={player.station?.logoUrl}
                            />
                        }
                    />
                </div>
            </div>
        </div>
    );
};
