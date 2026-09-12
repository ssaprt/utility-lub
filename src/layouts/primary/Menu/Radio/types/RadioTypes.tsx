import { RadioNowPlaying, RadioStation } from "@/services/Radio/radio.types";

export type TransitionMode =
    | "compact-large"
    | "large-compact"
    | "large-full"
    | "full-large"
    | "compact-full-width"
    | "full-compact-height"
    | "closing"
    | null;

export type RadioContentType =
    | "music"
    | "news"
    | "talk"
    | "sports"
    | "religion"
    | "mixed"
    | "unknown";

export type RadioStationSource = {
    type: "filtered" | "country";

    countryCode: string | null;

    contentType: RadioContentType | null;

    limit: number | null;

    stations: RadioStation[];
};

export type Player = {
    play: "play" | "pause";

    volume: number;

    currentSrc: string;

    station: RadioStation | null;

    track: RadioNowPlaying | null;

    source: RadioStationSource | null;

    isLoading: boolean;

    isMetadataLoading: boolean;

    error: string | null;
};
