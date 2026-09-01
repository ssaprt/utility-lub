export const nthDirections = ["start", "end"] as const;
export const nthModes = ["formula", "range"] as const;
export const nthDisplays = ["grid", "list"] as const;
export const nthPresets = [
    "odd", "even", "third", "first-three", "range", "from-five",
    "every-fourth", "every-fifth", "first-five", "last-three",
    "middle", "not-even",
] as const;
export type NthDirection = (typeof nthDirections)[number];
export type NthMode = (typeof nthModes)[number];
export type NthDisplay = (typeof nthDisplays)[number];
export type NthPreset = (typeof nthPresets)[number];

export interface NthChildConfig {
    direction: NthDirection;
    mode: NthMode;
    display: NthDisplay;
    negate: boolean;
    count: number;
    a: number;
    b: number;
    start: number;
    end: number;
    selectedColor: string;
    itemColor: string;
    textColor: string;
}

export const createDefaultNthChildConfig = (): NthChildConfig => ({
    direction: "start",
    mode: "formula",
    display: "grid",
    negate: false,
    count: 24,
    a: 2,
    b: 1,
    start: 4,
    end: 12,
    selectedColor: "#7c5cff",
    itemColor: "#25252c",
    textColor: "#ffffff",
});

export const nthPresetConfigs: Record<NthPreset, Partial<NthChildConfig>> = {
    odd: { mode: "formula", a: 2, b: 1 },
    even: { mode: "formula", a: 2, b: 0 },
    third: { mode: "formula", a: 3, b: 0 },
    "first-three": { mode: "formula", a: -1, b: 3 },
    range: { mode: "range", start: 4, end: 12 },
    "from-five": { mode: "formula", a: 1, b: 5 },
    "every-fourth": { mode: "formula", direction: "start", negate: false, a: 4, b: 0 },
    "every-fifth": { mode: "formula", direction: "start", negate: false, a: 5, b: 2 },
    "first-five": { mode: "formula", direction: "start", negate: false, a: -1, b: 5 },
    "last-three": { mode: "formula", direction: "end", negate: false, a: -1, b: 3 },
    middle: { mode: "range", direction: "start", negate: false, start: 8, end: 16 },
    "not-even": { mode: "formula", direction: "start", negate: true, a: 2, b: 0 },
};
