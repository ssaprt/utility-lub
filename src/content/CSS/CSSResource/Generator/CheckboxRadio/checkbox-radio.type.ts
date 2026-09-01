export const choiceTypes = ["checkbox", "radio"] as const;
export const checkmarkStyles = ["tick", "cross", "fill"] as const;
export const choicePresets = [
    "violet", "mint", "mono", "sunset", "ocean", "candy",
    "terminal", "cobalt", "sand", "outline", "neon", "pastel",
] as const;

export type ChoiceType = (typeof choiceTypes)[number];
export type CheckmarkStyle = (typeof checkmarkStyles)[number];
export type ChoicePreset = (typeof choicePresets)[number];

export interface CheckboxRadioConfig {
    type: ChoiceType;
    size: number;
    gap: number;
    rowGap: number;
    fontSize: number;
    fontColor: string;
    uncheckedBackground: string;
    uncheckedBorder: string;
    checkedBackground: string;
    checkedBorder: string;
    markColor: string;
    markSize: number;
    borderWidth: number;
    radius: number;
    disabledOpacity: number;
    checkmarkStyle: CheckmarkStyle;
}

export const createDefaultCheckboxRadioConfig = (): CheckboxRadioConfig => ({
    type: "checkbox",
    size: 20,
    gap: 9,
    rowGap: 12,
    fontSize: 14,
    fontColor: "#e8e8ec",
    uncheckedBackground: "#18181b",
    uncheckedBorder: "#52525b",
    checkedBackground: "#7c5cff",
    checkedBorder: "#7c5cff",
    markColor: "#ffffff",
    markSize: 11,
    borderWidth: 2,
    radius: 5,
    disabledOpacity: 0.4,
    checkmarkStyle: "tick",
});

export const checkboxRadioPresetConfigs: Record<
    ChoicePreset,
    CheckboxRadioConfig
> = {
    violet: createDefaultCheckboxRadioConfig(),
    mint: {
        ...createDefaultCheckboxRadioConfig(),
        checkedBackground: "#34d399",
        checkedBorder: "#34d399",
        markColor: "#06271d",
        radius: 7,
    },
    mono: {
        ...createDefaultCheckboxRadioConfig(),
        uncheckedBackground: "#ffffff",
        uncheckedBorder: "#171717",
        checkedBackground: "#171717",
        checkedBorder: "#171717",
        fontColor: "#171717",
        radius: 2,
    },
    sunset: {
        ...createDefaultCheckboxRadioConfig(),
        uncheckedBackground: "#261a25",
        uncheckedBorder: "#8c526f",
        checkedBackground: "#ff6b81",
        checkedBorder: "#ff9f68",
        markColor: "#27131a",
        radius: 10,
    },
    ocean: {
        ...createDefaultCheckboxRadioConfig(),
        uncheckedBackground: "#071923",
        uncheckedBorder: "#32677d",
        checkedBackground: "#23b9ea",
        checkedBorder: "#72dcff",
        markColor: "#05222d",
        radius: 6,
    },
    candy: {
        ...createDefaultCheckboxRadioConfig(),
        uncheckedBackground: "#32152a",
        uncheckedBorder: "#a24b87",
        checkedBackground: "#ff76ca",
        checkedBorder: "#ffb4e3",
        markColor: "#35112a",
        radius: 10,
        checkmarkStyle: "fill",
    },
    terminal: {
        ...createDefaultCheckboxRadioConfig(),
        uncheckedBackground: "#06110a",
        uncheckedBorder: "#2a874b",
        checkedBackground: "#3dff7c",
        checkedBorder: "#3dff7c",
        markColor: "#06110a",
        fontColor: "#75ff9f",
        radius: 1,
    },
    cobalt: {
        ...createDefaultCheckboxRadioConfig(),
        checkedBackground: "#3157e8",
        checkedBorder: "#7893ff",
        markColor: "#ffffff",
        radius: 4,
    },
    sand: {
        ...createDefaultCheckboxRadioConfig(),
        uncheckedBackground: "#f0e5d1",
        uncheckedBorder: "#9c8463",
        checkedBackground: "#b78248",
        checkedBorder: "#79572f",
        markColor: "#fff8ec",
        fontColor: "#332719",
        radius: 3,
    },
    outline: {
        ...createDefaultCheckboxRadioConfig(),
        uncheckedBackground: "transparent",
        uncheckedBorder: "#a1a1aa",
        checkedBackground: "transparent",
        checkedBorder: "#ffffff",
        markColor: "#ffffff",
        radius: 2,
    },
    neon: {
        ...createDefaultCheckboxRadioConfig(),
        uncheckedBackground: "#0d0b19",
        uncheckedBorder: "#7657ff",
        checkedBackground: "#b8ff36",
        checkedBorder: "#b8ff36",
        markColor: "#121707",
        fontColor: "#ede9ff",
        radius: 7,
    },
    pastel: {
        ...createDefaultCheckboxRadioConfig(),
        uncheckedBackground: "#f8f2ff",
        uncheckedBorder: "#c7addf",
        checkedBackground: "#c9a8e8",
        checkedBorder: "#9b72bf",
        markColor: "#ffffff",
        fontColor: "#3d2d4c",
        radius: 8,
    },
};
