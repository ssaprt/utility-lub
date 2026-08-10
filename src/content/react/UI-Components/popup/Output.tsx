import { Documentation } from "@/components/Documentation/Documentation";
import { TransitionDropDown } from "@/content/react/UI-Components/Pagination/components/dropDown/TransitionDropDown/TransitionDropDown";

const toCode = (value: unknown, level = 0): string => {
    const indent = "    ".repeat(level);
    const childIndent = "    ".repeat(level + 1);

    if (typeof value === "string") {
        return `"${value}"`;
    }

    if (typeof value === "number" || typeof value === "boolean") {
        return String(value);
    }

    if (value === null) {
        return "null";
    }

    if (value === undefined) {
        return "undefined";
    }

    if (Array.isArray(value)) {
        if (value.length === 0) {
            return "[]";
        }

        return `[
${value.map((item) => `${childIndent}${toCode(item, level + 1)},`).join("\n")}
${indent}]`;
    }

    if (typeof value === "object") {
        const entries = Object.entries(value).filter(
            ([, item]) => item !== undefined,
        );

        if (entries.length === 0) {
            return "{}";
        }

        return `{
${entries
    .map(([key, item]) => `${childIndent}${key}: ${toCode(item, level + 1)},`)
    .join("\n")}
${indent}}`;
    }

    return String(value);
};

//eslint-disable-next-line
export const Output = (props: any) => {
    const outputProps = Object.entries(props)
        .filter(([, value]) => value !== undefined)
        .map(([key, value]) => `        ${key}={${toCode(value, 2)}}`)
        .join("\n");

    const code = `"use client";

import { useState } from "react";
import { Popup } from "popup-from-future";
import "popup-from-future/style.css";

const App = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                type="button"
                onClick={() => setIsOpen(true)}
            >
                Open Popup
            </button>

            <Popup
                isOpen={isOpen}
                open={setIsOpen}
${outputProps}
            >
                <div>
                    <p>Popup content</p>
                </div>
            </Popup>
        </>
    );
};

export default App;`;

    return (
        <TransitionDropDown title="CODE OUTPUT" className="!rounded-[14px]">
            <Documentation titleEnd="App" code={code} />
        </TransitionDropDown>
    );
};
