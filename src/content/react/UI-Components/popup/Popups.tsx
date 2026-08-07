import { TitleWithItemsBlock } from "@/components/blocks/TitleWithItemsBlock/TitleWithItemsBlock";
import { GeneralButton } from "@/components/button/GeneralButton/GeneralButton";
import { Range } from "@/components/input/range/Range";
import {
    AnimationsPopupInType,
    AnimationsPopupOutType,
    Popup,
    PopupInterface,
    PopupPresetName,
} from "popup-from-future";

import { IconColorSwatch, IconEye, IconEyeClosed } from "@tabler/icons-react";
import Image from "next/image";
import { useState } from "react";
import { inAnims, outAnims, presets } from "./data";
import { Output } from "./Output";

type PopupConfig = Pick<
    PopupInterface,
    "animation" | "preset" | "close" | "customStyle"
>;

export const Popups = () => {
    const [animationShow, setAnimationShow] =
        useState<AnimationsPopupInType>("jello-in");
    const [showSpeed, setShowSpeed] = useState(300);

    const [animationHide, setAnimationHide] =
        useState<AnimationsPopupOutType>("jello-out");
    const [hideSpeed, setHideSpeed] = useState(300);

    const [presetTheme, setPresetTheme] = useState<PopupPresetName>("obsidian");

    const [timer, setTimer] = useState(0);

    const [show, setShow] = useState(false);

    const config: PopupConfig = {
        animation: {
            open: {
                animationName: animationShow,
                duration: showSpeed,
                easing: "cubic-bezier(0.34, 1.56, 0.64, 1)",
            },
            close: {
                animationName: animationHide,
                duration: hideSpeed,
                easing: "cubic-bezier(0.34, 1.56, 0.64, 1)",
            },
        },
        preset: presetTheme,
        close: {
            timeOutShow: timer,
        },
        customStyle: {
            body: {
                className: "w-9/10",
            },
        },
    };

    return (
        <div className="flex flex-col gap-2">
            <TitleWithItemsBlock title="Show props">
                <div className="flex flex-col gap-1">
                    <span className="text-sm">Animation show</span>
                    <div className="flex flex-row flex-wrap gap-1">
                        {(inAnims as AnimationsPopupInType[]).map(
                            (animation) => (
                                <GeneralButton
                                    icon={<IconEye className="w-4 h-4" />}
                                    textButton={animation}
                                    key={animation}
                                    handleAction={() =>
                                        setAnimationShow(animation)
                                    }
                                    active={animation === animationShow}
                                />
                            ),
                        )}
                    </div>
                </div>

                <span className="text-sm">show speed {showSpeed}ms</span>
                <Range
                    min={0}
                    max={5000}
                    step={50}
                    value={showSpeed}
                    onChange={setShowSpeed}
                />
            </TitleWithItemsBlock>

            <TitleWithItemsBlock title="Hide props">
                <div className="flex flex-col gap-1">
                    <span className="text-sm">Animation show</span>
                    <div className="flex flex-row flex-wrap gap-1">
                        {(outAnims as AnimationsPopupOutType[]).map(
                            (animation) => (
                                <GeneralButton
                                    icon={<IconEyeClosed className="w-4 h-4" />}
                                    textButton={animation}
                                    key={animation}
                                    handleAction={() =>
                                        setAnimationHide(animation)
                                    }
                                    active={animation === animationHide}
                                />
                            ),
                        )}
                    </div>
                </div>

                <span className="text-sm">hide speed {hideSpeed}ms</span>
                <Range
                    min={0}
                    max={5000}
                    step={50}
                    value={hideSpeed}
                    onChange={setHideSpeed}
                />
            </TitleWithItemsBlock>

            <TitleWithItemsBlock title="Select preset theme">
                {presets.map((preset) => (
                    <GeneralButton
                        icon={<IconColorSwatch className="w-4 h-4" />}
                        handleAction={() =>
                            setPresetTheme(preset as PopupPresetName)
                        }
                        key={preset}
                        textButton={preset}
                        active={preset === presetTheme}
                    />
                ))}
            </TitleWithItemsBlock>

            <TitleWithItemsBlock
                title={`Use timer: ${timer > 0 ? `${timer}ms` : "OFF"}`}
            >
                <Range
                    min={0}
                    max={25000}
                    step={100}
                    value={timer}
                    onChange={setTimer}
                />
            </TitleWithItemsBlock>

            <GeneralButton
                handleAction={() => setShow(true)}
                textButton="Open Example Popup"
                type="button"
                icon={
                    <Image
                        unoptimized
                        src="/popup.svg"
                        alt="example"
                        width={20}
                        height={20}
                        className="w-12 h-12"
                    />
                }
            />

            <Popup isOpen={show} open={setShow} {...config}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Consectetur amet itaque vitae atque ex, ullam in voluptatum
                officiis, magni quibusdam maiores quas ad fugit autem! Ab dolore
                facere in optio?
            </Popup>

            <Output {...config} />
        </div>
    );
};
