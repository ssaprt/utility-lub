import { useRadioContext } from "../../../context/RadioContext";
import { MarqueeText } from "../../MarqueeText";

export const InfoStation = () => {
    const { player } = useRadioContext();
    return (
        <div className="col-start-1 md:row-center-1 m-2">
            <div className="row-start-1">
                <div className="col-start-[0px] w-full h-auto overflow-x-hidden overflow-y-auto">
                    <div className="col-start-[1px]">
                        <span className="text-[10px] text-fg/50">Station</span>
                        <MarqueeText className="text-sm" duration={8}>
                            {player.station?.name}
                        </MarqueeText>
                    </div>

                    <div className="col-start-[1px]">
                        <span className="text-[10px] text-fg/50">
                            Album / Author / Track
                        </span>
                        <MarqueeText className="text-xs" duration={8}>
                            {player.track?.artist
                                ? `[${`${player.track?.artist} / ${player.track?.title}`}]`
                                : "-"}
                            {player.track?.album && ` - ${player.track?.album}`}
                        </MarqueeText>
                    </div>

                    <div className="col-start-[1px]">
                        <span className="text-[10px] text-fg/50">Genres</span>
                        <div className="flex gap-1 w-full wrap">
                            {player.station?.genres.map((genre) => (
                                <span
                                    key={genre}
                                    className="text-[10px] text-fg py-[2px] px-[6px] bg-fg/5 shrink-0"
                                >
                                    {genre}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
