import { TitleWithItemsBlock } from "@/components/blocks/TitleWithItemsBlock/TitleWithItemsBlock";
import { GeneralButton } from "@/components/button/GeneralButton/GeneralButton";
import { Range } from "@/components/input/range/Range";
import { TooltipAnimationType, TooltipPlacement } from "@ssaprt/tooltip";
import { IconTooltip } from "@tabler/icons-react";
import { useState } from "react";
import { ScrollToFuture } from "scroll-to-future";
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
                nativeOnMobile={false}
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
        useState<TooltipAnimationType>("flip");
    const [animationHide, setAnimationHide] =
        useState<TooltipAnimationType>("bounce");
    const [positionRenderMode, setPositionRenderMode] =
        useState<TooltipPlacement>("top");

    const [interactive, setInteractive] = useState(false);
    const [hideDelay, setHideDelay] = useState(0);
    const [speed, setSpeed] = useState(300);
    const [borderRadius, setBorderRadius] = useState(0);

    return (
        <div className="flex flex-col gap-2">
            <TitleWithItemsBlock title="Position">
                {positions.map((pos) => (
                    <GeneralButton
                        active={pos === positionRenderMode}
                        key={pos}
                        textButton={pos}
                        handleAction={() => setPositionRenderMode(pos)}
                    />
                ))}
            </TitleWithItemsBlock>

            <TitleWithItemsBlock title="Select AnimationShow">
                {animations.map((animation) => (
                    <GeneralButton
                        key={animation}
                        active={animationShow === animation}
                        textButton={animation}
                        handleAction={() => setAnimationShow(animation)}
                    />
                ))}
            </TitleWithItemsBlock>

            <TitleWithItemsBlock title="Select AnimationHide">
                {animations.map((animation) => (
                    <GeneralButton
                        key={animation}
                        active={animationHide === animation}
                        textButton={animation}
                        handleAction={() => setAnimationHide(animation)}
                    />
                ))}
            </TitleWithItemsBlock>

            <TitleWithItemsBlock title={`Animation speed ${speed}(ms)`}>
                <Range
                    min={0}
                    step={10}
                    max={1000}
                    value={speed}
                    onChange={(val) => setSpeed(val)}
                />
            </TitleWithItemsBlock>

            <TitleWithItemsBlock title={`Hide delay ${hideDelay}(ms)`}>
                <Range
                    min={0}
                    step={10}
                    max={1000}
                    value={hideDelay}
                    onChange={(val) => setHideDelay(val)}
                />
            </TitleWithItemsBlock>

            <TitleWithItemsBlock title={`Rounded corners ${borderRadius}px`}>
                <Range
                    min={0}
                    step={1}
                    max={100}
                    value={borderRadius}
                    onChange={(val) => setBorderRadius(val)}
                />
            </TitleWithItemsBlock>

            <TitleWithItemsBlock title="Interactive (save hover)">
                <GeneralButton
                    active={interactive}
                    textButton="Save hover"
                    handleAction={() => setInteractive(true)}
                />
                <GeneralButton
                    active={!interactive}
                    textButton="Hide on blur"
                    handleAction={() => setInteractive(false)}
                />
            </TitleWithItemsBlock>

            <TitleWithItemsBlock title="Click on the desired topic. The settings above apply to each topic">
                {themes.map((theme) => {
                    return (
                        <TooltipElement
                            key={theme}
                            animationShow={animationShow}
                            animationHide={animationHide}
                            positionRenderMode={positionRenderMode}
                            showExample={<Example />}
                            interactive={interactive}
                            hideDelay={hideDelay}
                            selectTheme={theme}
                            borderRadius={`${borderRadius}px`}
                            speed={`${speed}ms`}
                        />
                    );
                })}
            </TitleWithItemsBlock>
        </div>
    );
};
