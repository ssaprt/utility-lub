"use client";

import { Range } from "@/components/input/range/Range";
import { useState } from "react";
import type { ScrollToFutureConfig } from "scroll-to-future";

import { TitleWithItemsBlock } from "@/components/blocks/TitleWithItemsBlock/TitleWithItemsBlock";
import { GeneralButton } from "@/components/button/GeneralButton/GeneralButton";
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
    const [boundaryOffset2, setBoundaryOffset2] = useState([2, 4]);
    const [positionMode, setPositionMode] = useState<"before" | "after">(
        "after",
    );
    const [widthTrack, setWidthTrack] = useState(12);

    const config: ScrollToFutureConfig = {
        selectTheme: selectedTheme,
        nativeOnMobile: false,

        scrollBar: {
            widthTrack: `${widthTrack}px`,

            positionMode: positionMode,
            superimposition,
            mode,
            heightTrack: `${heightScrollBar}%`,
            boundaryOffset:
                boundaryOffset !== -1
                    ? `${boundaryOffset}px`
                    : `${boundaryOffset2[0]}px ${boundaryOffset2[1]}px`,
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
            <TitleWithItemsBlock title="Superimposition">
                {superimpositions.map((item) => (
                    <GeneralButton
                        textButton={item}
                        active={item === superimposition}
                        key={item}
                        handleAction={() => setSuperimposition(item)}
                    />
                ))}
            </TitleWithItemsBlock>

            <TitleWithItemsBlock title="Mode">
                {modes.map((item) => (
                    <GeneralButton
                        textButton={item}
                        active={item === mode}
                        key={item}
                        handleAction={() => setMode(item)}
                    />
                ))}
            </TitleWithItemsBlock>

            <TitleWithItemsBlock title="Position mode">
                {["before", "after"].map((item) => (
                    <GeneralButton
                        textButton={item}
                        active={item === positionMode}
                        key={item}
                        handleAction={() => {
                            setPositionMode(item as "before" | "after");
                        }}
                    />
                ))}
            </TitleWithItemsBlock>

            <TitleWithItemsBlock
                title={`Height ScrollBar: ${heightScrollBar}%`}
            >
                <Range
                    value={heightScrollBar}
                    onChange={setHeightScrollBar}
                    min={0}
                    max={100}
                />
            </TitleWithItemsBlock>

            <TitleWithItemsBlock title={`Boundary Offset: ${boundaryOffset}px`}>
                <Range
                    value={boundaryOffset}
                    onChange={(value) => {
                        setBoundaryOffset(value);
                        setBoundaryOffset2([-1, -1]);
                    }}
                    min={0}
                    max={100}
                />

                <span className="block text-center p-2 w-full my-4">OR</span>

                <span className="text-[12px]">
                    Boundary Offset start: {boundaryOffset2[0]}px
                </span>
                <Range
                    value={boundaryOffset2[0]}
                    onChange={(value) => {
                        setBoundaryOffset(-1);
                        setBoundaryOffset2((prev) => [
                            value,
                            prev[1] === -1 ? 0 : prev[1],
                        ]);
                    }}
                    min={0}
                    max={100}
                />

                <span className="text-[12px]">
                    Boundary Offset end: {boundaryOffset2[1]}px
                </span>
                <Range
                    value={boundaryOffset2[1]}
                    onChange={(value) => {
                        setBoundaryOffset(-1);
                        setBoundaryOffset2((prev) => [
                            prev[0] === -1 ? 0 : prev[0],
                            value,
                        ]);
                    }}
                    min={0}
                    max={100}
                />
            </TitleWithItemsBlock>

            <TitleWithItemsBlock title={`Width Track: ${widthTrack}px`}>
                <Range
                    value={widthTrack}
                    onChange={setWidthTrack}
                    min={1}
                    max={100}
                />
            </TitleWithItemsBlock>

            <TitleWithItemsBlock title="Select Theme">
                {themes.map((item) => (
                    <GeneralButton
                        textButton={item}
                        active={item === selectedTheme}
                        key={item}
                        handleAction={() => setSelectedTheme(item)}
                    />
                ))}
            </TitleWithItemsBlock>

            <ScrollBar {...config} />

            <Output {...config} />
        </div>
    );
};
