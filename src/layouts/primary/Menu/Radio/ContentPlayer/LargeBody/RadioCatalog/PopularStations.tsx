"use client";

import { useEffect, useMemo, useState } from "react";

import { useUserCountryCode } from "@/hooks/useUserCountry";

import {
    IconCircleArrowDownFilled,
    IconFilter2,
    IconLoader2,
} from "@tabler/icons-react";

import { RadioContentType } from "../../../types/RadioTypes";

import { useRadioContext } from "../../../context/RadioContext";

import { MarqueeText } from "../../MarqueeText";

import { CarouselStations } from "./CarouselStations/CarouselStations";

import { countries, CountryCode, isCountryCode } from "./countries";

import {
    contentTypes,
    isRadioContentFilter,
    isRadioSortFilter,
    isTopLimit,
    RadioContentFilter,
    RadioSortFilter,
    sortOptions,
    TopLimit,
} from "./filterOptions";

import { RadioCatalog } from "./RadioCatalog";

import { RadioFilter, RadioFilterTab } from "./RadioFilter";

import {
    RadioFilterQuickBar,
    RadioFilterQuickItem,
} from "./RadioFilterQuickBar";

import { Flag } from "./Flag";
import { InfoStation } from "./InfoStation";
import { RadioStationsFrame } from "./RadioStationFrame";
import { StationImage } from "./StationImage";

const STORAGE_COUNTRY = "radio-popular-country";

const STORAGE_LIMIT = "radio-popular-limit";

const STORAGE_CONTENT_TYPE = "radio-popular-content-type";

const STORAGE_GENRE = "radio-popular-genre";

const STORAGE_LANGUAGE = "radio-popular-language";

const STORAGE_CODEC = "radio-popular-codec";

const STORAGE_HIGH_QUALITY = "radio-popular-high-quality";

const STORAGE_SORT = "radio-popular-sort";

export type PropsStation = {
    code?: CountryCode;

    contentType?: RadioContentType;

    title: string;
};

export const PopularStations = ({
    code,
    contentType = "music",
}: PropsStation) => {
    const { player, selectStation } = useRadioContext();

    const userCountryCode = useUserCountryCode();

    const [countryCode, setCountryCode] = useState<CountryCode | null>(null);

    const [selectedContentType, setSelectedContentType] =
        useState<RadioContentFilter>(contentType);

    const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

    const [selectedLanguage, setSelectedLanguage] = useState<string | null>(
        null,
    );

    const [selectedCodec, setSelectedCodec] = useState<string | null>(null);

    const [highQuality, setHighQuality] = useState(false);

    const [sort, setSort] = useState<RadioSortFilter>("clicktrend");

    const [limit, setLimit] = useState<TopLimit>(100);

    const [storageReady, setStorageReady] = useState(false);

    const [openFilter, setOpenFilter] = useState<RadioFilterTab | null>(null);

    useEffect(() => {
        const storedCountry = localStorage.getItem(STORAGE_COUNTRY);

        const storedLimit = localStorage.getItem(STORAGE_LIMIT);

        const storedContentType = localStorage.getItem(STORAGE_CONTENT_TYPE);

        const storedGenre = localStorage.getItem(STORAGE_GENRE);

        const storedLanguage = localStorage.getItem(STORAGE_LANGUAGE);

        const storedCodec = localStorage.getItem(STORAGE_CODEC);

        const storedHighQuality = localStorage.getItem(STORAGE_HIGH_QUALITY);

        const storedSort = localStorage.getItem(STORAGE_SORT);

        if (storedCountry && isCountryCode(storedCountry)) {
            //eslint-disable-next-line
            setCountryCode(storedCountry);
        } else if (code) {
            setCountryCode(code);
        }

        if (storedLimit) {
            const parsedLimit = Number(storedLimit);

            if (isTopLimit(parsedLimit)) {
                setLimit(parsedLimit);
            }
        }

        if (storedContentType && isRadioContentFilter(storedContentType)) {
            setSelectedContentType(storedContentType);
        }

        setSelectedGenre(storedGenre || null);
        setSelectedLanguage(storedLanguage || null);
        setSelectedCodec(storedCodec || null);
        setHighQuality(storedHighQuality === "true");

        if (storedSort && isRadioSortFilter(storedSort)) {
            setSort(storedSort);
        }

        setStorageReady(true);
    }, [code]);

    useEffect(() => {
        if (!storageReady) {
            return;
        }

        if (countryCode) {
            return;
        }

        if (!userCountryCode) {
            return;
        }

        const normalizedCountryCode = userCountryCode.toUpperCase();

        if (!isCountryCode(normalizedCountryCode)) {
            return;
        }
        //eslint-disable-next-line
        setCountryCode(normalizedCountryCode);
    }, [storageReady, countryCode, userCountryCode]);

    useEffect(() => {
        if (!storageReady || !countryCode) {
            return;
        }

        localStorage.setItem(STORAGE_COUNTRY, countryCode);
    }, [storageReady, countryCode]);

    useEffect(() => {
        if (!storageReady) {
            return;
        }

        localStorage.setItem(STORAGE_LIMIT, String(limit));
        localStorage.setItem(STORAGE_CONTENT_TYPE, selectedContentType);
        localStorage.setItem(STORAGE_HIGH_QUALITY, String(highQuality));
        localStorage.setItem(STORAGE_SORT, sort);

        if (selectedGenre) {
            localStorage.setItem(STORAGE_GENRE, selectedGenre);
        } else {
            localStorage.removeItem(STORAGE_GENRE);
        }

        if (selectedLanguage) {
            localStorage.setItem(STORAGE_LANGUAGE, selectedLanguage);
        } else {
            localStorage.removeItem(STORAGE_LANGUAGE);
        }

        if (selectedCodec) {
            localStorage.setItem(STORAGE_CODEC, selectedCodec);
        } else {
            localStorage.removeItem(STORAGE_CODEC);
        }
    }, [
        storageReady,
        limit,
        selectedContentType,
        selectedGenre,
        selectedLanguage,
        selectedCodec,
        highQuality,
        sort,
    ]);

    const selectedCountry = countries.find(
        (country) => country.code === countryCode,
    );

    const selectedContent = contentTypes.find(
        (item) => item.value === selectedContentType,
    );

    const selectedSort = sortOptions.find((item) => item.value === sort);

    const filterQuickItems = useMemo<RadioFilterQuickItem[]>(
        () => [
            {
                id: "country",
                active: true,
                className: "max-w-[220px]",
                content: (
                    <>
                        {selectedCountry && (
                            <Flag
                                flag={selectedCountry.flagUrl}
                                className="size-4 shrink-0"
                            />
                        )}

                        <span className="min-w-0 flex-1 truncate text-left">
                            {selectedCountry?.name ?? countryCode ?? "Country"}
                        </span>

                        <IconCircleArrowDownFilled className="size-4 shrink-0" />
                    </>
                ),
            },
            {
                id: "content",
                active: selectedContentType !== "all",
                className: "max-w-[150px]",
                content: (
                    <>
                        <span className="min-w-0 truncate">
                            {selectedContent?.label ?? "Content"}
                        </span>

                        <IconFilter2 className="size-4 shrink-0" />
                    </>
                ),
            },
            {
                id: "limit",
                active: true,
                content: (
                    <>
                        <span>Top {limit}</span>

                        <IconCircleArrowDownFilled className="size-4 shrink-0" />
                    </>
                ),
            },
            {
                id: "quality",
                active: highQuality,
                content: (
                    <>
                        <span>{highQuality ? "HQ" : "Quality"}</span>

                        <IconCircleArrowDownFilled className="size-4 shrink-0" />
                    </>
                ),
            },
            {
                id: "genre",
                active: Boolean(selectedGenre),
                className: "max-w-[150px]",
                content: (
                    <>
                        <span className="min-w-0 truncate">
                            {selectedGenre ?? "Genre"}
                        </span>

                        <IconCircleArrowDownFilled className="size-4 shrink-0" />
                    </>
                ),
            },
            {
                id: "language",
                active: Boolean(selectedLanguage),
                className: "max-w-[150px]",
                content: (
                    <>
                        <span className="min-w-0 truncate">
                            {selectedLanguage ?? "Language"}
                        </span>

                        <IconCircleArrowDownFilled className="size-4 shrink-0" />
                    </>
                ),
            },
            {
                id: "codec",
                active: Boolean(selectedCodec),
                className: "max-w-[120px]",
                content: (
                    <>
                        <span className="min-w-0 truncate">
                            {selectedCodec ?? "Codec"}
                        </span>

                        <IconCircleArrowDownFilled className="size-4 shrink-0" />
                    </>
                ),
            },
            {
                id: "sort",
                active: sort !== "clicktrend",
                className: "max-w-[130px]",
                content: (
                    <>
                        <span className="min-w-0 truncate">
                            {selectedSort?.label ?? "Sort"}
                        </span>

                        <IconCircleArrowDownFilled className="size-4 shrink-0" />
                    </>
                ),
            },
        ],
        [
            countryCode,
            highQuality,
            limit,
            selectedCodec,
            selectedContent?.label,
            selectedContentType,
            selectedCountry,
            selectedGenre,
            selectedLanguage,
            selectedSort?.label,
            sort,
        ],
    );

    if (!storageReady || !countryCode) {
        return null;
    }

    const queryContentType =
        selectedContentType === "all" ? undefined : selectedContentType;

    const catalogKey = [
        countryCode,
        queryContentType ?? "all",
        selectedGenre ?? "all",
        selectedLanguage ?? "all",
        selectedCodec ?? "all",
        highQuality ? "hq" : "any-quality",
        sort,
        limit,
    ].join("-");

    return (
        <>
            <RadioStationsFrame
                header={
                    <div
                        className="
                            row-center-1
                            rounded-[24px]
                            w-full
                            max-w-full
                            min-w-0
                            items-center
                            justify-between
                            text-sm
                            text-fg/90
                        "
                    >
                        <RadioFilterQuickBar
                            items={filterQuickItems}
                            onOpen={setOpenFilter}
                        />
                    </div>
                }
            >
                <RadioCatalog
                    type="trending"
                    contentType={queryContentType}
                    genre={selectedGenre ?? undefined}
                    language={selectedLanguage ?? undefined}
                    codec={selectedCodec ?? undefined}
                    bitrateMin={highQuality ? 256 : undefined}
                    order={sort}
                    limit={limit}
                    countryCode={countryCode}
                >
                    {({ items, isFetching }) =>
                        isFetching ? (
                            <div
                                className="
                                    flex
                                    w-full
                                    items-center
                                    gap-4
                                    overflow-hidden
                                    py-4
                                    px-2
                                "
                            >
                                {Array.from({
                                    length: 12,
                                }).map((_, index) => (
                                    <div
                                        key={index}
                                        className="
                                            h-26
                                            shrink-0
                                            basis-[max(90px,10%)]
                                            rounded-xl
                                            bg-fg/40
                                            shadow-md
                                            shadow-black/40
                                            animate-[skeleton-breathe_1.4s_ease-in-out_infinite]
                                        "
                                        style={{
                                            animationDelay: `-${index * 140}ms`,
                                        }}
                                    />
                                ))}
                            </div>
                        ) : items.length > 0 ? (
                            <CarouselStations
                                key={catalogKey}
                                speed={0.7}
                                slides={items.map((item) => {
                                    const isCurrent =
                                        player.station?.id === item.id;

                                    const isCurrentLoading =
                                        isCurrent && player.isLoading;

                                    return (
                                        <div
                                            key={item.id}
                                            aria-busy={isCurrentLoading}
                                            className={`
                                                default-block-2
                                                col-center-1
                                                justify-center
                                                relative
                                                w-full
                                                shadow-[0_2px_4px]
                                                shadow-black/25
                                                hover:shadow-lg
                                                hover:shadow-black/30
                                                hover:bg-purple-600/40
                                                hover:translate-y-[-1px]
                                                hover:cursor-pointer
                                                transition-all
                                                duration-200
                                                ease-in-out
                                                ${isCurrent ? "bg-purple-600/20" : ""}
                                            `}
                                            onClick={() => {
                                                if (isCurrentLoading) {
                                                    return;
                                                }

                                                void selectStation(item, {
                                                    type: "filtered",
                                                    countryCode,
                                                    contentType:
                                                        queryContentType ??
                                                        null,
                                                    limit,
                                                    stations: items,
                                                });
                                            }}
                                        >
                                            <StationImage
                                                src={item.logoUrl}
                                                alt={item.name}
                                            />

                                            <MarqueeText
                                                className="w-full text-[12px]"
                                                align="center"
                                                duration={15}
                                                gap={20}
                                            >
                                                {item.name}
                                            </MarqueeText>

                                            {isCurrentLoading && (
                                                <div
                                                    className="
                                                        absolute
                                                        inset-0
                                                        z-2
                                                        flex
                                                        items-center
                                                        justify-center
                                                        rounded-xl
                                                        bg-app/45
                                                        backdrop-blur-[2px]
                                                    "
                                                >
                                                    <IconLoader2 className="size-6 animate-spin text-fg" />
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                                options={{
                                    loop: true,
                                }}
                            />
                        ) : (
                            <div
                                className="
                                    flex
                                    w-full
                                    min-h-30
                                    items-center
                                    justify-center
                                    py-4
                                    px-2
                                    text-sm
                                    text-fg/50
                                "
                            >
                                No stations found
                            </div>
                        )
                    }
                </RadioCatalog>
                <InfoStation />
            </RadioStationsFrame>

            {openFilter && (
                <RadioFilter
                    initialTab={openFilter}
                    countryCode={countryCode}
                    contentType={selectedContentType}
                    genre={selectedGenre}
                    language={selectedLanguage}
                    codec={selectedCodec}
                    highQuality={highQuality}
                    sort={sort}
                    limit={limit}
                    onCountryChange={setCountryCode}
                    onContentTypeChange={setSelectedContentType}
                    onGenreChange={setSelectedGenre}
                    onLanguageChange={setSelectedLanguage}
                    onCodecChange={setSelectedCodec}
                    onHighQualityChange={setHighQuality}
                    onSortChange={setSort}
                    onLimitChange={setLimit}
                    onClose={() => setOpenFilter(null)}
                />
            )}
        </>
    );
};
