"use client";

import { Range } from "@/components/input/range/Range";
import { motion } from "framer-motion";
import { useState } from "react";
import type { ScrollToFutureConfig } from "scroll-to-future";

import { Output } from "./Output";
import { ScrollBar } from "./ScrollBar";

const themes = [
    "primary",
    "midnight",
    "neonCyan",
    "ocean",
    "deepSea",
    "forest",
    "moss",
    "lava",
    "ember",
    "gold",
    "roseQuartz",
    "violet",
    "royal",
    "arctic",
    "glass",
    "graphite",
    "terminal",
    "toxic",
    "candy",
    "sand",
    "monoLight",
    "monoDark",
] satisfies NonNullable<ScrollToFutureConfig["selectTheme"]>[];

type Theme = (typeof themes)[number];

type Superimposition = "after" | "over";

type Mode = "horizontal" | "vertical" | "both";

const superimpositions: Superimposition[] = ["over", "after"];

const modes: Mode[] = ["horizontal", "vertical", "both"];

const buttonClassName = `
    cursor-pointer
    rounded-[4px]
    border-2
    border-pink-300/30
    bg-pink-300/10
    p-[var(--space-1)]
    text-xs
    transition-colors
    duration-100
    ease-in-out
    hover:bg-pink-300/30
`;

export const ScrollBarSettings = () => {
    const [selectedTheme, setSelectedTheme] = useState<Theme>("violet");

    const [heightScrollBar, setHeightScrollBar] = useState(90);

    const [superimposition, setSuperimposition] =
        useState<Superimposition>("after");

    const [mode, setMode] = useState<Mode>("vertical");

    const [boundaryOffset, setBoundaryOffset] = useState(4);
    const [positionMode, setPositionMode] = useState<"before" | "after">(
        "after",
    );
    const [widthTrack, setWidthTrack] = useState(8);

    const config: ScrollToFutureConfig = {
        selectTheme: selectedTheme,
        nativeOnMobile: false,

        scrollBar: {
            widthTrack: `${widthTrack}px`,

            positionMode: positionMode,
            superimposition,
            mode,
            heightTrack: `${heightScrollBar}%`,
            boundaryOffset: `${boundaryOffset}px`,
        },
    };

    return (
        <div
            className="
                flex
                w-full
                min-w-0
                flex-col
                items-stretch
                gap-4
            "
        >
            <div className="flex flex-col gap-1">
                <span>Superimposition</span>

                <div className="flex flex-row flex-wrap gap-2">
                    {superimpositions.map((item) => (
                        <motion.button
                            type="button"
                            key={item}
                            className={`
                                ${buttonClassName}
                                ${
                                    item === superimposition
                                        ? "bg-pink-300/30"
                                        : ""
                                }
                            `}
                            onClick={() => {
                                setSuperimposition(item);
                            }}
                            initial={false}
                            animate={{
                                scale: item === superimposition ? 1.1 : 1,
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 700,
                                damping: 12,
                            }}
                        >
                            {item}
                        </motion.button>
                    ))}
                </div>
            </div>

            <div className="flex flex-col gap-1">
                <span>Mode</span>

                <div className="flex flex-row flex-wrap gap-2">
                    {modes.map((item) => (
                        <motion.button
                            type="button"
                            key={item}
                            className={`
                                ${buttonClassName}
                                ${item === mode ? "bg-pink-300/30" : ""}
                            `}
                            onClick={() => {
                                setMode(item);
                            }}
                            initial={false}
                            animate={{
                                scale: item === mode ? 1.1 : 1,
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 700,
                                damping: 12,
                            }}
                        >
                            {item}
                        </motion.button>
                    ))}
                </div>
            </div>

            <div className="flex flex-col gap-1">
                <span>Position Mode</span>

                <div className="flex flex-row flex-wrap gap-2">
                    {["before", "after"].map((item) => (
                        <motion.button
                            type="button"
                            key={item}
                            className={`
                                ${buttonClassName}
                                ${item === positionMode ? "bg-pink-300/30" : ""}
                            `}
                            onClick={() => {
                                setPositionMode(item as "before" | "after");
                            }}
                            initial={false}
                            animate={{
                                scale: item === positionMode ? 1.1 : 1,
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 700,
                                damping: 12,
                            }}
                        >
                            {item}
                        </motion.button>
                    ))}
                </div>
            </div>

            <div className="flex flex-col gap-1">
                <span>Height ScrollBar: {heightScrollBar}%</span>

                <Range
                    value={heightScrollBar}
                    onChange={setHeightScrollBar}
                    min={0}
                    max={100}
                />
            </div>

            <div className="flex flex-col gap-1">
                <span>Boundary Offset: {boundaryOffset}px</span>

                <Range
                    value={boundaryOffset}
                    onChange={setBoundaryOffset}
                    min={1}
                    max={100}
                />
            </div>

            <div className="flex flex-col gap-1">
                <span>Width Track: {widthTrack}px</span>

                <Range
                    value={widthTrack}
                    onChange={setWidthTrack}
                    min={1}
                    max={100}
                />
            </div>

            <div className="flex flex-col gap-1">
                <span>Select Theme</span>

                <div className="flex flex-row flex-wrap gap-2">
                    {themes.map((item) => (
                        <motion.button
                            type="button"
                            key={item}
                            className={`
                                ${buttonClassName}
                                ${
                                    item === selectedTheme
                                        ? "bg-pink-300/30"
                                        : ""
                                }
                            `}
                            onClick={() => {
                                setSelectedTheme(item);
                            }}
                            initial={false}
                            animate={{
                                scale: item === selectedTheme ? 1.1 : 1,
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 700,
                                damping: 12,
                            }}
                        >
                            {item}
                        </motion.button>
                    ))}
                </div>
            </div>

            <ScrollBar {...config} />

            <Output {...config} />
        </div>
    );
};
