import { RadioContentType } from "@/layouts/primary/Menu/Radio/types/RadioTypes";

export type RadioStationOrder =
    | "name"
    | "url"
    | "homepage"
    | "favicon"
    | "tags"
    | "country"
    | "state"
    | "language"
    | "votes"
    | "codec"
    | "bitrate"
    | "lastcheckok"
    | "lastchecktime"
    | "clicktimestamp"
    | "clickcount"
    | "clicktrend"
    | "changetimestamp"
    | "random";

export type RadioDirectoryOrder = "name" | "stationcount";

export type RadioNowPlayingStatus =
    "ok" | "no_metadata" | "unsupported" | "unavailable";

export interface RadioStation {
    id: string;
    changeId: string | null;
    serverId: string | null;
    name: string;
    originalStreamUrl: string;
    streamUrl: string;
    homepageUrl: string | null;
    logoUrl: string | null;
    genres: string[];
    contentType: RadioContentType;
    country: string | null;
    countryCode: string | null;
    subdivisionCode: string | null;
    state: string | null;
    languages: string[];
    languageCodes: string[];
    codec: string | null;
    bitrate: number | null;
    hls: boolean;
    https: boolean;
    available: boolean;
    sslError: boolean;
    hasExtendedInfo: boolean;
    votes: number;
    clickCount: number;
    clickTrend: number;
    lastChangedAt: string | null;
    lastCheckedAt: string | null;
    lastSuccessfulCheckAt: string | null;
    lastLocalCheckAt: string | null;
    lastClickAt: string | null;
    latitude: number | null;
    longitude: number | null;
}

export interface RadioStationsResponse {
    count: number;
    offset: number;
    limit: number;
    items: RadioStation[];
}

export interface RadioNowPlaying {
    stationId: string;
    status: RadioNowPlayingStatus;
    streamTitle: string | null;
    artist: string | null;
    title: string | null;
    album: string | null;
    coverUrl: string | null;
    recordingId: string | null;
    releaseId: string | null;
    releaseGroupId: string | null;
    icyStationName: string | null;
    icyStationGenre: string | null;
    icyStationDescription: string | null;
    icyStationUrl: string | null;
    icyContentType: string | null;
    icyBitrate: number | null;
    icyMetadataInterval: number | null;
    icyFields: Record<string, string>;
    icySupported: boolean;
    fetchedAt: string;
}

export interface RadioPlayerResponse {
    station: RadioStation;
    nowPlaying: RadioNowPlaying;
}

export interface RadioStationClickResponse {
    ok: boolean;
    message: string;
    stationId: string;
    name: string;
    streamUrl: string;
}

export interface RadioDirectoryItem {
    name: string;
    stationCount: number;
}

export interface RadioLanguageDirectoryItem extends RadioDirectoryItem {
    isoCode: string | null;
}

export interface RadioStateDirectoryItem extends RadioDirectoryItem {
    country: string;
}

export interface RadioDirectoryResponse {
    count: number;
    offset: number;
    limit: number;
    items: RadioDirectoryItem[];
}

export interface RadioLanguageDirectoryResponse {
    count: number;
    offset: number;
    limit: number;
    items: RadioLanguageDirectoryItem[];
}

export interface RadioStateDirectoryResponse {
    count: number;
    offset: number;
    limit: number;
    items: RadioStateDirectoryItem[];
}

export interface GetRadioStationsArgs {
    search?: string;
    nameExact?: boolean;
    country?: string;
    countryExact?: boolean;
    countryCode?: string;
    state?: string;
    stateExact?: boolean;
    language?: string;
    languageExact?: boolean;
    genre?: string;
    genreExact?: boolean;
    genres?: string[];
    codec?: string;
    bitrateMin?: number;
    bitrateMax?: number;
    hasGeoInfo?: boolean;
    hasExtendedInfo?: boolean;
    httpsOnly?: boolean;
    hideBroken?: boolean;
    order?: RadioStationOrder;
    reverse?: boolean;
    limit?: number;
    offset?: number;
    contentType?: RadioContentType;
}

export interface GetRadioStationArgs {
    uuid: string;
}

export interface GetRadioNowPlayingArgs {
    uuid: string;
}

export interface GetRadioPlayerArgs {
    uuid: string;
}

export interface RegisterRadioStationClickArgs {
    uuid: string;
}

export interface GetRadioDirectoryArgs {
    filter?: string;
    order?: RadioDirectoryOrder;
    reverse?: boolean;
    limit?: number;
    offset?: number;
}

export interface GetRadioStatesArgs extends GetRadioDirectoryArgs {
    country?: string;
}
