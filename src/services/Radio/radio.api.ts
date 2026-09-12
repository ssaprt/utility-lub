import { api } from "../api";
import {
    GetRadioDirectoryArgs,
    GetRadioNowPlayingArgs,
    GetRadioPlayerArgs,
    GetRadioStatesArgs,
    GetRadioStationArgs,
    GetRadioStationsArgs,
    RadioDirectoryResponse,
    RadioLanguageDirectoryResponse,
    RadioNowPlaying,
    RadioPlayerResponse,
    RadioStateDirectoryResponse,
    RadioStation,
    RadioStationClickResponse,
    RadioStationsResponse,
    RegisterRadioStationClickArgs,
} from "./radio.types";

const toBooleanParam = (value?: boolean) => {
    if (value === undefined) {
        return undefined;
    }

    return String(value);
};

const createRadioStationParams = (args: GetRadioStationsArgs | void) => {
    if (!args) {
        return {};
    }

    return {
        search: args.search,
        nameExact: toBooleanParam(args.nameExact),
        country: args.country,
        countryExact: toBooleanParam(args.countryExact),
        countryCode: args.countryCode,
        state: args.state,
        stateExact: toBooleanParam(args.stateExact),
        language: args.language,
        languageExact: toBooleanParam(args.languageExact),
        genre: args.genre,
        genreExact: toBooleanParam(args.genreExact),
        genres: args.genres?.length ? args.genres.join(",") : undefined,
        codec: args.codec,
        bitrateMin: args.bitrateMin,
        bitrateMax: args.bitrateMax,
        hasGeoInfo: toBooleanParam(args.hasGeoInfo),
        hasExtendedInfo: toBooleanParam(args.hasExtendedInfo),
        httpsOnly: toBooleanParam(args.httpsOnly),
        hideBroken: toBooleanParam(args.hideBroken),
        order: args.order,
        reverse: toBooleanParam(args.reverse),
        limit: args.limit,
        offset: args.offset,
        contentType: args.contentType,
    };
};

const createRadioDirectoryParams = (args: GetRadioDirectoryArgs | void) => {
    if (!args) {
        return {};
    }

    return {
        filter: args.filter,
        order: args.order,
        reverse: toBooleanParam(args.reverse),
        limit: args.limit,
        offset: args.offset,
    };
};

export const RadioApi = api.injectEndpoints({
    endpoints: (builder) => ({
        /**
         * Example: useGetRadioStationsQuery({ countryCode: "UA", genres: ["rock", "alternative"], limit: 24 })
         * Returns: RadioStationsResponse with pagination data and RadioStation[] in items.
         */
        getRadioStations: builder.query<
            RadioStationsResponse,
            GetRadioStationsArgs | void
        >({
            query: (args) => ({
                url: "/radio/stations",
                method: "GET",
                params: createRadioStationParams(args),
            }),
        }),

        /**
         * Example: useGetRadioStationQuery({ uuid: "9617a958-0601-11e8-ae97-52543be04c81" })
         * Returns: one RadioStation with stream, location, genres, codec and statistics.
         */
        getRadioStation: builder.query<RadioStation, GetRadioStationArgs>({
            query: ({ uuid }) => ({
                url: `/radio/stations/${encodeURIComponent(uuid)}`,
                method: "GET",
            }),
        }),

        /**
         * Example: useGetRadioNowPlayingQuery({ uuid: "9617a958-0601-11e8-ae97-52543be04c81" })
         * Returns: RadioNowPlaying with ICY metadata, artist, title, album and cover.
         */
        getRadioNowPlaying: builder.query<
            RadioNowPlaying,
            GetRadioNowPlayingArgs
        >({
            query: ({ uuid }) => ({
                url: `/radio/stations/${encodeURIComponent(uuid)}/now-playing`,
                method: "GET",
            }),
        }),

        /**
         * Example: useGetRadioPlayerQuery({ uuid: "9617a958-0601-11e8-ae97-52543be04c81" })
         * Returns: RadioPlayerResponse with station and nowPlaying in one response.
         */
        getRadioPlayer: builder.query<RadioPlayerResponse, GetRadioPlayerArgs>({
            query: ({ uuid }) => ({
                url: `/radio/stations/${encodeURIComponent(uuid)}/player`,
                method: "GET",
            }),
        }),

        /**
         * Example: const [registerClick] = useRegisterRadioStationClickMutation(); void registerClick({ uuid })
         * Returns: RadioStationClickResponse confirming the Radio Browser click counter result.
         */
        registerRadioStationClick: builder.mutation<
            RadioStationClickResponse,
            RegisterRadioStationClickArgs
        >({
            query: ({ uuid }) => ({
                url: `/radio/stations/${encodeURIComponent(uuid)}/click`,
                method: "POST",
            }),
        }),

        /**
         * Example: useGetRadioCountriesQuery({ filter: "uni", limit: 50 })
         * Returns: RadioDirectoryResponse with country names and stationCount.
         */
        getRadioCountries: builder.query<
            RadioDirectoryResponse,
            GetRadioDirectoryArgs | void
        >({
            query: (args) => ({
                url: "/radio/directory/countries",
                method: "GET",
                params: createRadioDirectoryParams(args),
            }),
        }),

        /**
         * Example: useGetRadioCountryCodesQuery({ limit: 250 })
         * Returns: RadioDirectoryResponse with ISO country codes and stationCount.
         */
        getRadioCountryCodes: builder.query<
            RadioDirectoryResponse,
            GetRadioDirectoryArgs | void
        >({
            query: (args) => ({
                url: "/radio/directory/country-codes",
                method: "GET",
                params: createRadioDirectoryParams(args),
            }),
        }),

        /**
         * Example: useGetRadioStatesQuery({ country: "United States", limit: 100 })
         * Returns: RadioStateDirectoryResponse with state/region names, country and stationCount.
         */
        getRadioStates: builder.query<
            RadioStateDirectoryResponse,
            GetRadioStatesArgs | void
        >({
            query: (args) => ({
                url: "/radio/directory/states",
                method: "GET",
                params: {
                    ...createRadioDirectoryParams(args),
                    country: args?.country,
                },
            }),
        }),

        /**
         * Example: useGetRadioLanguagesQuery({ filter: "eng", limit: 100 })
         * Returns: RadioLanguageDirectoryResponse with language name, isoCode and stationCount.
         */
        getRadioLanguages: builder.query<
            RadioLanguageDirectoryResponse,
            GetRadioDirectoryArgs | void
        >({
            query: (args) => ({
                url: "/radio/directory/languages",
                method: "GET",
                params: createRadioDirectoryParams(args),
            }),
        }),

        /**
         * Example: useGetRadioGenresQuery({ filter: "rock", limit: 100 })
         * Returns: RadioDirectoryResponse with genre names and stationCount.
         */
        getRadioGenres: builder.query<
            RadioDirectoryResponse,
            GetRadioDirectoryArgs | void
        >({
            query: (args) => ({
                url: "/radio/directory/genres",
                method: "GET",
                params: createRadioDirectoryParams(args),
            }),
        }),

        /**
         * Example: useGetRadioCodecsQuery({ order: "stationcount", reverse: true })
         * Returns: RadioDirectoryResponse with codec names and stationCount.
         */
        getRadioCodecs: builder.query<
            RadioDirectoryResponse,
            GetRadioDirectoryArgs | void
        >({
            query: (args) => ({
                url: "/radio/directory/codecs",
                method: "GET",
                params: createRadioDirectoryParams(args),
            }),
        }),
    }),
});

export const {
    useGetRadioStationsQuery,
    useLazyGetRadioStationsQuery,

    useGetRadioStationQuery,
    useLazyGetRadioStationQuery,

    useGetRadioNowPlayingQuery,
    useLazyGetRadioNowPlayingQuery,

    useGetRadioPlayerQuery,
    useLazyGetRadioPlayerQuery,

    useRegisterRadioStationClickMutation,

    useGetRadioCountriesQuery,
    useLazyGetRadioCountriesQuery,

    useGetRadioCountryCodesQuery,
    useLazyGetRadioCountryCodesQuery,

    useGetRadioStatesQuery,
    useLazyGetRadioStatesQuery,

    useGetRadioLanguagesQuery,
    useLazyGetRadioLanguagesQuery,

    useGetRadioGenresQuery,
    useLazyGetRadioGenresQuery,

    useGetRadioCodecsQuery,
    useLazyGetRadioCodecsQuery,
} = RadioApi;
