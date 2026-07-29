import { CopyButton } from "@/components/button/CopyButton/CopyButton";
import { Range } from "@/components/input/range/Range";
import { IconTooltip } from "@tabler/icons-react";
import { ReactNode, useState } from "react";
import { ScrollToFuture } from "scroll-to-future";
import { TooltipAnimationType, TooltipPlacement } from "tooltip";
import { emojis } from "../Pagination/data/list";
import { TooltipElement } from "./TooltipElement";

export const themes = [
    "primary",
    "secondary",
    "dark",
    "light",
    "comic",
    "manga",
    "newspaper",
    "stickyNote",
    "blueprint",
    "terminal",
    "crt",
    "pixel",
    "arcade",
    "cyberpunk",
    "synthwave",
    "vaporwave",
    "hologram",
    "glass",
    "frost",
    "clay",
    "bubblegum",
    "candy",
    "watermelon",
    "lemon",
    "lava",
    "ember",
    "toxic",
    "radioactive",
    "hazard",
    "policeTape",
    "construction",
    "parchment",
    "pirateMap",
    "royal",
    "noir",
    "detective",
    "dossier",
    "medical",
    "laboratory",
    "circuit",
    "galaxy",
    "aurora",
    "oceanDepths",
    "coralReef",
    "forest",
    "moss",
    "desert",
    "snow",
    "chrome",
    "goldFoil",
    "bronze",
    "brutalist",
    "chalkboard",
] as const;

const animations = [
    "fade",
    "slide",
    "scale",
    "zoom",
    "blur",
    "flip",
    "bounce",
    "none",
] as const;

const positions = ["top", "right", "bottom", "left"] as const;

const Example = () => {
    return (
        <div className="flex flex-col items-center gap-2 h-[120px] overflow-y-scroll">
            <div className="flex flex-row items-center gap-2">
                <IconTooltip size={32} />
                <span>Example</span>
            </div>
            <div className="grid grid-cols-5 gap-2">
                {emojis.slice(0, 50).map((emoji, i) => (
                    <span key={`${emoji}-${i}`}>{emoji}</span>
                ))}
            </div>
            <ScrollToFuture
                scrollBar={{
                    widthTrack: "8px",
                    boundaryOffset: "4px 0px",
                    positionMode: "after",
                    superimposition: "after",
                    heightTrack: "98%",
                }}
            />
        </div>
    );
};

export const Tooltips = () => {
    const [animationShow, setAnimationShow] =
        useState<TooltipAnimationType>("zoom");
    const [animationHide, setAnimationHide] =
        useState<TooltipAnimationType>("blur");
    const [positionRenderMode, setPositionRenderMode] =
        useState<TooltipPlacement>("top");
    const [showExample, setShowExample] = useState<ReactNode | string>(
        "example",
    );
    const [interactive, setInteractive] = useState(false);
    const [hideDelay, setHideDelay] = useState(0);
    const [speed, setSpeed] = useState(300);
    const [borderRadius, setBorderRadius] = useState(0);

    return (
        <div className="flex flex-col gap-2">
            <span className="text-[var(--font-sm)]">Position</span>
            <div className="flex flex-row flex-wrap gap-2">
                {positions.map((pos) => (
                    <CopyButton
                        className={`${pos === positionRenderMode && "bg-pink-500/40"}`}
                        currentValue={animationHide}
                        key={pos}
                        copy={false}
                        returnValue={() => setPositionRenderMode(pos)}
                    >
                        {pos}
                    </CopyButton>
                ))}
            </div>

            <span className="text-[var(--font-sm)]">
                Example content or text
            </span>
            <div className="flex flex-row flex-wrap gap-2">
                <CopyButton
                    className={`${showExample !== "example text" && "bg-pink-500/40"}`}
                    currentValue={animationHide}
                    copy={false}
                    returnValue={() => setShowExample(<Example />)}
                >
                    Example Component
                </CopyButton>
                <CopyButton
                    className={`${showExample === "example text" && "bg-pink-500/40"}`}
                    currentValue={animationHide}
                    copy={false}
                    returnValue={() => setShowExample("example text")}
                >
                    text
                </CopyButton>
            </div>

            <span className="text-[var(--font-sm)]">Select AnimationShow</span>
            <div className="flex flex-row flex-wrap gap-2">
                {animations.map((animation) => (
                    <CopyButton
                        currentValue={animationShow}
                        key={animation}
                        copy={false}
                        returnValue={() => setAnimationShow(animation)}
                    >
                        {animation}
                    </CopyButton>
                ))}
            </div>

            <span className="text-[var(--font-sm)]">Select AnimationHide</span>
            <div className="flex flex-row flex-wrap gap-2">
                {animations.map((animation) => (
                    <CopyButton
                        currentValue={animationHide}
                        key={animation}
                        copy={false}
                        returnValue={() => setAnimationHide(animation)}
                    >
                        {animation}
                    </CopyButton>
                ))}
            </div>

            <span className="text-[var(--font-sm)]">
                Animation speed {speed}(ms)
            </span>
            <Range
                min={0}
                step={10}
                max={1000}
                value={speed}
                onChange={(val) => setSpeed(val)}
            />

            <span className="text-[var(--font-sm)]">
                Hide delay {hideDelay}(ms)
            </span>
            <Range
                min={0}
                step={10}
                max={1000}
                value={hideDelay}
                onChange={(val) => setHideDelay(val)}
            />

            <span className="text-[var(--font-sm)]">
                Rounded corners {borderRadius}px
            </span>
            <Range
                min={0}
                step={10}
                max={100}
                value={borderRadius}
                onChange={(val) => setBorderRadius(val)}
            />

            <span className="text-[var(--font-sm)]">
                Interactive (save hover)
            </span>
            <div className="flex flex-row flex-wrap gap-2">
                <CopyButton
                    className={`${interactive === true && "bg-pink-500/40"}`}
                    currentValue={interactive}
                    copy={false}
                    returnValue={() => setInteractive(true)}
                >
                    Save hover
                </CopyButton>
                <CopyButton
                    className={`${interactive === false && "bg-pink-500/40"}`}
                    currentValue={interactive}
                    copy={false}
                    returnValue={() => setInteractive(false)}
                >
                    Hide on blur
                </CopyButton>
            </div>

            <span className="text-[var(--font-sm)]">
                Select Theme - copy to clipboard
            </span>
            <div className="flex flex-row flex-wrap gap-2">
                {themes.map((theme) => {
                    return (
                        <TooltipElement
                            key={theme}
                            animationShow={animationShow}
                            animationHide={animationHide}
                            positionRenderMode={positionRenderMode}
                            showExample={showExample}
                            interactive={interactive}
                            hideDelay={hideDelay}
                            selectTheme={theme}
                            borderRadius={`${borderRadius}px`}
                            speed={`${speed}ms`}
                        />
                    );
                })}
            </div>
        </div>
    );
};
