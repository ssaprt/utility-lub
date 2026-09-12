"use client";

import {
    useGetRadioCodecsQuery,
    useGetRadioCountriesQuery,
    useGetRadioCountryCodesQuery,
    useGetRadioGenresQuery,
    useGetRadioLanguagesQuery,
    useGetRadioStatesQuery,
    useGetRadioStationsQuery,
} from "@/services/Radio/radio.api";

import type {
    RadioDirectoryItem,
    RadioLanguageDirectoryItem,
    RadioStateDirectoryItem,
    RadioStation,
    RadioStationOrder,
} from "@/services/Radio/radio.types";

import type { ReactNode } from "react";
import { RadioContentType } from "../../../types/RadioTypes";

export type RadioCatalogType =
    | "country"
    | "country-code"
    | "genre"
    | "language"
    | "state"
    | "codec"
    | "popular"
    | "trending"
    | "high-quality"
    | "map"
    | "https";

type RadioCatalogRenderProps<T> = {
    items: T[];

    isLoading: boolean;
    isFetching: boolean;
    isError: boolean;

    error: unknown;
};

type RadioCatalogChildren<T> = (props: RadioCatalogRenderProps<T>) => ReactNode;

type BaseProps = {
    limit?: number;
    offset?: number;
};

type DirectoryBaseProps = BaseProps & {
    filter?: string;
};

type StationBaseProps = BaseProps & {
    countryCode?: string;
    contentType?: RadioContentType;
    genre?: string;
    language?: string;
    codec?: string;
    bitrateMin?: number;
    httpsOnly?: boolean;
    order?: RadioStationOrder;
};

type RadioCatalogProps =
    | (DirectoryBaseProps & {
          type: "country" | "country-code" | "genre" | "codec";
          children: RadioCatalogChildren<RadioDirectoryItem>;
      })
    | (DirectoryBaseProps & {
          type: "language";
          children: RadioCatalogChildren<RadioLanguageDirectoryItem>;
      })
    | (DirectoryBaseProps & {
          type: "state";
          country?: string;
          children: RadioCatalogChildren<RadioStateDirectoryItem>;
      })
    | (StationBaseProps & {
          type: "popular" | "trending" | "high-quality" | "map" | "https";

          children: RadioCatalogChildren<RadioStation>;
      });

const getRenderState = <T,>(
    items: T[] | undefined,
    state: {
        isLoading: boolean;
        isFetching: boolean;
        isError: boolean;
        error?: unknown;
    },
): RadioCatalogRenderProps<T> => ({
    items: items ?? [],

    isLoading: state.isLoading,
    isFetching: state.isFetching,
    isError: state.isError,

    error: state.error,
});

const CountriesCatalog = ({
    children,
    filter,
    limit = 50,
    offset = 0,
}: DirectoryBaseProps & {
    children: RadioCatalogChildren<RadioDirectoryItem>;
}) => {
    const query = useGetRadioCountriesQuery({
        filter,

        order: "stationcount",
        reverse: true,

        limit,
        offset,
    });

    return children(getRenderState(query.data?.items, query));
};

const CountryCodesCatalog = ({
    children,
    filter,
    limit = 50,
    offset = 0,
}: DirectoryBaseProps & {
    children: RadioCatalogChildren<RadioDirectoryItem>;
}) => {
    const query = useGetRadioCountryCodesQuery({
        filter,

        order: "stationcount",
        reverse: true,

        limit,
        offset,
    });

    return children(getRenderState(query.data?.items, query));
};

const GenresCatalog = ({
    children,
    filter,
    limit = 50,
    offset = 0,
}: DirectoryBaseProps & {
    children: RadioCatalogChildren<RadioDirectoryItem>;
}) => {
    const query = useGetRadioGenresQuery({
        filter,

        order: "stationcount",
        reverse: true,

        limit,
        offset,
    });

    return children(getRenderState(query.data?.items, query));
};

const LanguagesCatalog = ({
    children,
    filter,
    limit = 50,
    offset = 0,
}: DirectoryBaseProps & {
    children: RadioCatalogChildren<RadioLanguageDirectoryItem>;
}) => {
    const query = useGetRadioLanguagesQuery({
        filter,

        order: "stationcount",
        reverse: true,

        limit,
        offset,
    });

    return children(getRenderState(query.data?.items, query));
};

const StatesCatalog = ({
    children,
    country,
    filter,
    limit = 50,
    offset = 0,
}: DirectoryBaseProps & {
    country?: string;
    children: RadioCatalogChildren<RadioStateDirectoryItem>;
}) => {
    const query = useGetRadioStatesQuery({
        country,
        filter,

        order: "stationcount",
        reverse: true,

        limit,
        offset,
    });

    return children(getRenderState(query.data?.items, query));
};

const CodecsCatalog = ({
    children,
    filter,
    limit = 50,
    offset = 0,
}: DirectoryBaseProps & {
    children: RadioCatalogChildren<RadioDirectoryItem>;
}) => {
    const query = useGetRadioCodecsQuery({
        filter,

        order: "stationcount",
        reverse: true,

        limit,
        offset,
    });

    return children(getRenderState(query.data?.items, query));
};

const PopularCatalog = ({
    children,
    countryCode,
    contentType,
    genre,
    language,
    codec,
    bitrateMin,
    httpsOnly,
    order = "clicktrend",
    limit = 12,
    offset = 0,
}: StationBaseProps & {
    children: RadioCatalogChildren<RadioStation>;
}) => {
    const query = useGetRadioStationsQuery({
        countryCode,
        contentType,
        genre,
        language,
        codec,
        bitrateMin,
        httpsOnly,
        order,
        reverse: order !== "random",
        hideBroken: true,

        limit,
        offset,
    });

    return children(getRenderState(query.currentData?.items, query));
};

const TrendingCatalog = ({
    children,
    countryCode,
    contentType,
    genre,
    language,
    codec,
    bitrateMin,
    httpsOnly,
    order = "clicktrend",
    limit = 12,
    offset = 0,
}: StationBaseProps & {
    children: RadioCatalogChildren<RadioStation>;
}) => {
    const query = useGetRadioStationsQuery({
        countryCode,
        contentType,
        genre,
        language,
        codec,
        bitrateMin,
        httpsOnly,
        order,
        reverse: order !== "random",
        hideBroken: true,
        limit,
        offset,
    });

    return children(getRenderState(query.currentData?.items, query));
};

const HighQualityCatalog = ({
    children,
    countryCode,
    contentType,
    genre,
    language,
    codec,
    bitrateMin,
    httpsOnly,
    order = "bitrate",
    limit = 12,
    offset = 0,
}: StationBaseProps & {
    children: RadioCatalogChildren<RadioStation>;
}) => {
    const query = useGetRadioStationsQuery({
        countryCode,
        contentType,
        genre,
        language,
        codec,
        bitrateMin: Math.max(256, bitrateMin ?? 0),
        httpsOnly,
        order,
        reverse: order !== "random",
        hideBroken: true,
        limit,
        offset,
    });

    return children(getRenderState(query.currentData?.items, query));
};

const MapCatalog = ({
    children,
    countryCode,
    contentType,
    genre,
    language,
    codec,
    bitrateMin,
    httpsOnly,
    order = "clickcount",
    limit = 100,
    offset = 0,
}: StationBaseProps & {
    children: RadioCatalogChildren<RadioStation>;
}) => {
    const query = useGetRadioStationsQuery({
        countryCode,
        contentType,
        genre,
        language,
        codec,
        bitrateMin,
        httpsOnly,
        hasGeoInfo: true,
        order,
        reverse: order !== "random",
        hideBroken: true,
        limit,
        offset,
    });

    return children(getRenderState(query.currentData?.items, query));
};

const HttpsCatalog = ({
    children,
    countryCode,
    contentType,
    genre,
    language,
    codec,
    bitrateMin,
    order = "clickcount",
    limit = 12,
    offset = 0,
}: StationBaseProps & {
    children: RadioCatalogChildren<RadioStation>;
}) => {
    const query = useGetRadioStationsQuery({
        countryCode,
        contentType,
        genre,
        language,
        codec,
        bitrateMin,
        httpsOnly: true,
        order,
        reverse: order !== "random",
        hideBroken: true,
        limit,
        offset,
    });

    return children(getRenderState(query.currentData?.items, query));
};

export const RadioCatalog = (props: RadioCatalogProps) => {
    switch (props.type) {
        case "country":
            return <CountriesCatalog {...props} />;

        case "country-code":
            return <CountryCodesCatalog {...props} />;

        case "genre":
            return <GenresCatalog {...props} />;

        case "language":
            return <LanguagesCatalog {...props} />;

        case "state":
            return <StatesCatalog {...props} />;

        case "codec":
            return <CodecsCatalog {...props} />;

        case "popular":
            return <PopularCatalog {...props} />;

        case "trending":
            return <TrendingCatalog {...props} />;

        case "high-quality":
            return <HighQualityCatalog {...props} />;

        case "map":
            return <MapCatalog {...props} />;

        case "https":
            return <HttpsCatalog {...props} />;
    }
};
