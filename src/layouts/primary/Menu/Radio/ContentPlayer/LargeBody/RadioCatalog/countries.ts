import { countryCodes } from "./countryCodes";

export type CountryCode = (typeof countryCodes)[number];

export type Country = {
    code: CountryCode;
    name: string;
    flagUrl: string;
};

const regionNames = new Intl.DisplayNames(["en"], {
    type: "region",
});

export const isCountryCode = (value: string): value is CountryCode =>
    countryCodes.includes(value as CountryCode);

export const countries: Country[] = countryCodes
    .map((code) => ({
        code,
        name: regionNames.of(code) ?? code,
        flagUrl: `https://flagcdn.com/${code.toLowerCase()}.svg`,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
