import { RadioContentType } from "../../../types/RadioTypes";

export const topLimits = [
    5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95,
    100,
] as const;

export type TopLimit = (typeof topLimits)[number];

export const isTopLimit = (value: number): value is TopLimit =>
    topLimits.includes(value as TopLimit);

export type RadioContentFilter = RadioContentType | "all";

export const contentTypes: {
    value: RadioContentFilter;
    label: string;
}[] = [
    {
        value: "all",
        label: "All",
    },
    {
        value: "music",
        label: "Music",
    },
    {
        value: "news",
        label: "News",
    },
    {
        value: "talk",
        label: "Talk",
    },
    {
        value: "sports",
        label: "Sports",
    },
    {
        value: "religion",
        label: "Religion",
    },
    {
        value: "mixed",
        label: "Mixed",
    },
    {
        value: "unknown",
        label: "Other",
    },
];

export const isRadioContentFilter = (
    value: string,
): value is RadioContentFilter =>
    contentTypes.some((item) => item.value === value);

export type RadioSortFilter =
    | "clicktrend"
    | "clickcount"
    | "votes"
    | "bitrate"
    | "random";

export const sortOptions: {
    value: RadioSortFilter;
    label: string;
}[] = [
    {
        value: "clicktrend",
        label: "Trending",
    },
    {
        value: "clickcount",
        label: "Popular",
    },
    {
        value: "votes",
        label: "Top rated",
    },
    {
        value: "bitrate",
        label: "Bitrate",
    },
    {
        value: "random",
        label: "Random",
    },
];

export const isRadioSortFilter = (value: string): value is RadioSortFilter =>
    sortOptions.some((item) => item.value === value);
