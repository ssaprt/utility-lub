import { motion } from "framer-motion";

import { useRadioContext } from "../../../context/RadioContext";

import { IconExternalLinkFilled } from "@tabler/icons-react";
import { MarqueeText } from "../../MarqueeText";

export const InfoStation = () => {
    const { player } = useRadioContext();

    const station = player.station;

    const track = player.track;

    if (!station) {
        return null;
    }

    const hasTrackInfo =
        Boolean(track?.artist) ||
        Boolean(track?.title) ||
        Boolean(track?.album);

    const location = [
        station.country,
        station.state,
        station.countryCode,
    ].filter(Boolean);

    const hasAudioInfo =
        Boolean(station.codec) ||
        Boolean(station.bitrate) ||
        Boolean(station.contentType);

    const hasLanguages = Boolean(station.languages?.length);

    const hasGenres = Boolean(station.genres?.length);

    return (
        <motion.div
            layout
            transition={{
                layout: {
                    duration: 0.3,
                    ease: [0.22, 1, 0.36, 1],
                },
            }}
            className="
                col-start-1
                md:row-center-1
                min-w-0
                m-2
            "
        >
            <motion.div
                layout
                transition={{
                    layout: {
                        duration: 0.3,
                        ease: [0.22, 1, 0.36, 1],
                    },
                }}
                className="
                    col-start-[8px]
                    min-w-0
                    w-full
                    max-h-[80dvh]
                    overflow-x-hidden
                    overflow-y-auto
                    overscroll-contain
                    pr-1
                "
            >
                {station.name && (
                    <motion.div layout className="col-start-[1px] min-w-0">
                        <span className="text-[10px] text-fg/50">Station</span>

                        <MarqueeText className="text-sm" duration={8}>
                            {station.name}
                        </MarqueeText>
                    </motion.div>
                )}

                {hasTrackInfo && (
                    <motion.div layout className="col-start-[1px] min-w-0">
                        <span className="text-[10px] text-fg/50">
                            Artist / Track / Album
                        </span>

                        <MarqueeText className="text-xs" duration={8}>
                            {[track?.artist, track?.title, track?.album]
                                .filter(Boolean)
                                .join(" / ")}
                        </MarqueeText>
                    </motion.div>
                )}

                {track?.streamTitle && (
                    <motion.div layout className="col-start-[1px] min-w-0">
                        <span className="text-[10px] text-fg/50">
                            Stream title
                        </span>

                        <MarqueeText className="text-xs" duration={8}>
                            {track.streamTitle}
                        </MarqueeText>
                    </motion.div>
                )}

                {location.length > 0 && (
                    <motion.div layout className="col-start-[1px] min-w-0">
                        <span className="text-[10px] text-fg/50">Location</span>

                        <MarqueeText className="text-xs" duration={8}>
                            {location.join(" / ")}
                        </MarqueeText>
                    </motion.div>
                )}

                {hasAudioInfo && (
                    <motion.div layout className="col-start-[1px] min-w-0">
                        <span className="text-[10px] text-fg/50">Audio</span>

                        <div className="flex flex-wrap items-center gap-1">
                            {station.codec && (
                                <span
                                    className="
                                        text-[10px]
                                        text-fg
                                        py-[2px]
                                        px-[6px]
                                        bg-fg/5
                                        rounded-[3px]
                                        shrink-0
                                    "
                                >
                                    {station.codec}
                                </span>
                            )}

                            {station.bitrate ? (
                                <span
                                    className="
                                        text-[10px]
                                        text-fg
                                        py-[2px]
                                        px-[6px]
                                        bg-fg/5
                                        rounded-[3px]
                                        shrink-0
                                    "
                                >
                                    {station.bitrate} kbps
                                </span>
                            ) : null}

                            {station.contentType && (
                                <span
                                    className="
                                        text-[10px]
                                        text-fg
                                        py-[2px]
                                        px-[6px]
                                        bg-fg/5
                                        rounded-[3px]
                                        shrink-0
                                    "
                                >
                                    {station.contentType}
                                </span>
                            )}
                        </div>
                    </motion.div>
                )}

                {hasLanguages && (
                    <motion.div layout className="col-start-[1px] min-w-0">
                        <span className="text-[10px] text-fg/50">
                            Languages
                        </span>

                        <div
                            className="
                                flex
                                flex-wrap
                                gap-1
                                w-full
                                min-w-0
                            "
                        >
                            {station.languages.map((language) => (
                                <span
                                    key={language}
                                    className="
                                            text-[10px]
                                            text-fg
                                            py-[2px]
                                            px-[6px]
                                            bg-fg/5
                                            rounded-[3px]
                                            max-w-full
                                            break-words
                                        "
                                >
                                    {language}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                )}

                {hasGenres && (
                    <motion.div layout className="col-start-[1px] min-w-0">
                        <span className="text-[10px] text-fg/50">Genres</span>

                        <div
                            className="
                                flex
                                flex-wrap
                                gap-1
                                w-full
                                min-w-0
                            "
                        >
                            {station.genres.map((genre) => (
                                <span
                                    key={genre}
                                    className="
                                            text-[10px]
                                            text-fg
                                            py-[2px]
                                            px-[6px]
                                            bg-fg/5
                                            rounded-[3px]
                                            max-w-full
                                            break-words
                                        "
                                >
                                    {genre}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                )}

                {station.homepageUrl && (
                    <motion.div layout className="col-start-[1px] min-w-0">
                        <span className="text-[10px] text-fg/50">Website</span>

                        <a
                            href={station.homepageUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="
                                row-center-1
                                mb-2
                            "
                        >
                            <span className="text-[12px] text-fg/80 select-none">
                                {station.homepageUrl}
                            </span>
                            <IconExternalLinkFilled className="size-6 p-[4px] rounded-full bg-fg/5 shadow-md shadow-black/25 select-none" />
                        </a>
                    </motion.div>
                )}
            </motion.div>
        </motion.div>
    );
};
