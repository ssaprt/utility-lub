"use client";

import {
    useGetRadioCodecsQuery,
    useGetRadioGenresQuery,
    useGetRadioLanguagesQuery,
} from "@/services/Radio/radio.api";

import { useMemo, useState } from "react";

import {
    contentTypes,
    RadioContentFilter,
    RadioSortFilter,
    sortOptions,
    TopLimit,
    topLimits,
} from "./filterOptions";

import { countries, CountryCode } from "./countries";

import { Flag } from "./Flag";

import {
    RadioFilterSelect,
    RadioFilterSelectOption,
} from "./RadioFilterSelect";

import { SelectWindow } from "./SelectWindow";

export type RadioFilterTab =
    | "country"
    | "content"
    | "genre"
    | "language"
    | "codec"
    | "quality"
    | "sort"
    | "limit";

type RadioFilterProps = {
    initialTab: RadioFilterTab;

    countryCode: CountryCode;
    contentType: RadioContentFilter;
    genre: string | null;
    language: string | null;
    codec: string | null;
    highQuality: boolean;
    sort: RadioSortFilter;
    limit: TopLimit;

    onCountryChange: (code: CountryCode) => void;
    onContentTypeChange: (contentType: RadioContentFilter) => void;
    onGenreChange: (genre: string | null) => void;
    onLanguageChange: (language: string | null) => void;
    onCodecChange: (codec: string | null) => void;
    onHighQualityChange: (value: boolean) => void;
    onSortChange: (sort: RadioSortFilter) => void;
    onLimitChange: (limit: TopLimit) => void;

    onClose: () => void;
};

type FilterTab = {
    id: RadioFilterTab;
    label: string;
};

const tabs: FilterTab[] = [
    {
        id: "country",
        label: "Country",
    },
    {
        id: "content",
        label: "Content",
    },
    {
        id: "genre",
        label: "Genre",
    },
    {
        id: "language",
        label: "Language",
    },
    {
        id: "codec",
        label: "Codec",
    },
    {
        id: "quality",
        label: "Quality",
    },
    {
        id: "sort",
        label: "Sort",
    },
    {
        id: "limit",
        label: "Top",
    },
];

export const RadioFilter = ({
    initialTab,
    countryCode,
    contentType,
    genre,
    language,
    codec,
    highQuality,
    sort,
    limit,
    onCountryChange,
    onContentTypeChange,
    onGenreChange,
    onLanguageChange,
    onCodecChange,
    onHighQualityChange,
    onSortChange,
    onLimitChange,
    onClose,
}: RadioFilterProps) => {
    const [tab, setTab] = useState<RadioFilterTab>(initialTab);

    const genresQuery = useGetRadioGenresQuery({
        order: "stationcount",
        reverse: true,
        limit: 250,
    });

    const languagesQuery = useGetRadioLanguagesQuery({
        order: "stationcount",
        reverse: true,
        limit: 250,
    });

    const codecsQuery = useGetRadioCodecsQuery({
        order: "stationcount",
        reverse: true,
        limit: 100,
    });

    const countryOptions = useMemo<RadioFilterSelectOption[]>(
        () =>
            countries.map((country) => ({
                value: country.code,
                label: country.name,
                meta: country.code,
                icon: <Flag flag={country.flagUrl} className="size-4" />,
            })),
        [],
    );

    const contentOptions = useMemo<RadioFilterSelectOption[]>(
        () =>
            contentTypes.map((item) => ({
                value: item.value,
                label: item.label,
            })),
        [],
    );

    const genreOptions = useMemo<RadioFilterSelectOption[]>(
        () => [
            {
                value: "all",
                label: "All genres",
            },
            ...(genresQuery.currentData?.items ?? genresQuery.data?.items ?? []).map(
                (item) => ({
                    value: item.name,
                    label: item.name,
                    meta: `${item.stationCount}`,
                }),
            ),
        ],
        [genresQuery.currentData?.items, genresQuery.data?.items],
    );

    const languageOptions = useMemo<RadioFilterSelectOption[]>(
        () => [
            {
                value: "all",
                label: "All languages",
            },
            ...(
                languagesQuery.currentData?.items ??
                languagesQuery.data?.items ??
                []
            ).map((item) => ({
                value: item.name,
                label: item.name,
                meta: `${item.stationCount}`,
            })),
        ],
        [languagesQuery.currentData?.items, languagesQuery.data?.items],
    );

    const codecOptions = useMemo<RadioFilterSelectOption[]>(
        () => [
            {
                value: "all",
                label: "All codecs",
            },
            ...(codecsQuery.currentData?.items ?? codecsQuery.data?.items ?? []).map(
                (item) => ({
                    value: item.name,
                    label: item.name,
                    meta: `${item.stationCount}`,
                }),
            ),
        ],
        [codecsQuery.currentData?.items, codecsQuery.data?.items],
    );

    const qualityOptions = useMemo<RadioFilterSelectOption[]>(
        () => [
            {
                value: "all",
                label: "Any quality",
                meta: "No bitrate limit",
            },
            {
                value: "high",
                label: "High quality",
                meta: "256+ kbps",
            },
        ],
        [],
    );

    const sortSelectOptions = useMemo<RadioFilterSelectOption[]>(
        () =>
            sortOptions.map((item) => ({
                value: item.value,
                label: item.label,
            })),
        [],
    );

    const limitOptions = useMemo<RadioFilterSelectOption[]>(
        () =>
            topLimits.map((item) => ({
                value: String(item),
                label: `Top ${item}`,
                meta: `${item} stations`,
            })),
        [],
    );

    const renderField = () => {
        switch (tab) {
            case "country":
                return (
                    <RadioFilterSelect
                        value={countryCode}
                        options={countryOptions}
                        searchable
                        searchPlaceholder="Search country"
                        onChange={(value) =>
                            onCountryChange(value as CountryCode)
                        }
                    />
                );

            case "content":
                return (
                    <RadioFilterSelect
                        value={contentType}
                        options={contentOptions}
                        searchable
                        searchPlaceholder="Search content type"
                        onChange={(value) =>
                            onContentTypeChange(value as RadioContentFilter)
                        }
                    />
                );

            case "genre":
                return (
                    <RadioFilterSelect
                        value={genre ?? "all"}
                        options={genreOptions}
                        searchable
                        searchPlaceholder="Search genre"
                        loading={genresQuery.isFetching && genreOptions.length <= 1}
                        onChange={(value) =>
                            onGenreChange(value === "all" ? null : value)
                        }
                    />
                );

            case "language":
                return (
                    <RadioFilterSelect
                        value={language ?? "all"}
                        options={languageOptions}
                        searchable
                        searchPlaceholder="Search language"
                        loading={
                            languagesQuery.isFetching &&
                            languageOptions.length <= 1
                        }
                        onChange={(value) =>
                            onLanguageChange(value === "all" ? null : value)
                        }
                    />
                );

            case "codec":
                return (
                    <RadioFilterSelect
                        value={codec ?? "all"}
                        options={codecOptions}
                        searchable
                        searchPlaceholder="Search codec"
                        loading={codecsQuery.isFetching && codecOptions.length <= 1}
                        onChange={(value) =>
                            onCodecChange(value === "all" ? null : value)
                        }
                    />
                );

            case "quality":
                return (
                    <RadioFilterSelect
                        value={highQuality ? "high" : "all"}
                        options={qualityOptions}
                        onChange={(value) =>
                            onHighQualityChange(value === "high")
                        }
                    />
                );

            case "sort":
                return (
                    <RadioFilterSelect
                        value={sort}
                        options={sortSelectOptions}
                        onChange={(value) =>
                            onSortChange(value as RadioSortFilter)
                        }
                    />
                );

            case "limit":
                return (
                    <RadioFilterSelect
                        value={String(limit)}
                        options={limitOptions}
                        onChange={(value) =>
                            onLimitChange(Number(value) as TopLimit)
                        }
                    />
                );
        }
    };

    const activeTab = tabs.find((item) => item.id === tab);

    return (
        <SelectWindow title="Filter stations" onClose={onClose}>
            <div className="flex w-full min-w-0 flex-col gap-2">
                <div
                    onWheel={(event) => {
                        const element = event.currentTarget;

                        if (element.scrollWidth <= element.clientWidth) {
                            return;
                        }

                        if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
                            element.scrollLeft += event.deltaY;
                        }
                    }}
                    className="
                        flex
                        w-full
                        min-w-0
                        shrink-0
                        gap-1
                        overflow-x-auto
                        overflow-y-hidden
                        overscroll-x-contain
                        scroll-smooth
                        touch-pan-x
                        rounded-[8px]
                        border
                        border-fg/8
                        bg-fg/4
                        p-1
                        pb-1.5
                        [scrollbar-width:thin]
                        [&::-webkit-scrollbar]:h-1.5
                        [&::-webkit-scrollbar-thumb]:rounded-full
                        [&::-webkit-scrollbar-thumb]:bg-fg/15
                        [&::-webkit-scrollbar-track]:bg-transparent
                    "
                >
                    {tabs.map((item) => (
                        <button
                            key={item.id}
                            type="button"
                            onClick={(event) => {
                                setTab(item.id);
                                event.currentTarget.scrollIntoView({
                                    behavior: "smooth",
                                    block: "nearest",
                                    inline: "nearest",
                                });
                            }}
                            className={`
                                h-8
                                shrink-0
                                rounded-[6px]
                                px-3
                                text-[12px]
                                hover:cursor-pointer
                                transition-all
                                ${
                                    tab === item.id
                                        ? "bg-fg/15 shadow-sm shadow-black/20"
                                        : "bg-fg/4 hover:bg-fg/8"
                                }
                            `}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>

                <div
                    className="
                        w-full
                        min-w-0
                        rounded-[10px]
                        border
                        border-fg/8
                        bg-fg/2
                        p-3
                    "
                >
                    <div className="col-start-2 w-full min-w-0">
                        <div className="col-start-1 w-full gap-1">
                            <span className="text-[13px] text-fg/90">
                                {activeTab?.label}
                            </span>

                            <span className="text-[11px] text-fg/45">
                                Choose a value from the list. The result updates immediately.
                            </span>
                        </div>

                        {renderField()}
                    </div>
                </div>
            </div>
        </SelectWindow>
    );
};
