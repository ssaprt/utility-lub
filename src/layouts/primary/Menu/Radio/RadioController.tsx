"use client";

import { Body } from "./Body";
import { RadioProvider } from "./context/RadioContext";
import { OverButton } from "./OverButton";

export const RadioController = () => {
    return (
        <RadioProvider>
            <OverButton />
            <Body />
        </RadioProvider>
    );
};
