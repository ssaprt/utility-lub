"use client";

import { GeneralButton } from "@/components/button/GeneralButton/GeneralButton";
import {
    useMemo,
    useRef,
    type CSSProperties,
    type Dispatch,
    type PointerEvent,
    type SetStateAction,
} from "react";
import {
    borderImageSides,
    type BorderImageConfig,
    type BorderImageSide,
} from "./border-image.type";
import {
    borderImageConfigToCss,
    clamp,
    compressSides,
    getBorderImageSource,
} from "./border-image.utils";
import { ConfigBorderImage } from "./ConfigBorderImage";

export interface IsGeneratorProps {
    config: BorderImageConfig;
    setConfig: Dispatch<SetStateAction<BorderImageConfig>>;
}

const guidePosition = (
    side: BorderImageSide,
    value: number,
): CSSProperties => {
    switch (side) {
        case "top":
            return { top: `${value}%`, left: 0, right: 0 };
        case "right":
            return { right: `${value}%`, top: 0, bottom: 0 };
        case "bottom":
            return { bottom: `${value}%`, left: 0, right: 0 };
        case "left":
            return { left: `${value}%`, top: 0, bottom: 0 };
    }
};

export const IsGenerator = ({ config, setConfig }: IsGeneratorProps) => {
    const sourceRef = useRef<HTMLDivElement>(null);

    const css = useMemo(() => borderImageConfigToCss(config), [config]);
    const source = useMemo(
        () => getBorderImageSource(config.source),
        [config.source],
    );

    const previewStyle = useMemo<CSSProperties>(
        () => ({
            width: `${config.boxWidth}px`,
            height: `${config.boxHeight}px`,
            maxWidth: "calc(100% - 40px)",
            boxSizing: "border-box",
            backgroundColor: config.boxColor,
            borderStyle: "solid",
            borderColor: "transparent",
            borderWidth: compressSides(config.borderWidth, "px"),
            borderImageSource: source,
            borderImageSlice: `${compressSides(config.slice, "%")} ${
                config.fill ? "fill" : ""
            }`,
            borderImageWidth: compressSides(config.imageWidth),
            borderImageOutset: compressSides(config.outset, "px"),
            borderImageRepeat: `${config.repeatX} ${config.repeatY}`,
        }),
        [config, source],
    );

    const updateSliceFromPointer = (
        side: BorderImageSide,
        clientX: number,
        clientY: number,
    ) => {
        const element = sourceRef.current;
        if (!element) return;

        const rect = element.getBoundingClientRect();
        const horizontal = ((clientX - rect.left) / rect.width) * 100;
        const vertical = ((clientY - rect.top) / rect.height) * 100;

        const value =
            side === "left"
                ? horizontal
                : side === "right"
                  ? 100 - horizontal
                  : side === "top"
                    ? vertical
                    : 100 - vertical;

        setConfig((current) => ({
            ...current,
            slice: {
                ...current.slice,
                [side]: Math.round(clamp(value, 0, 50)),
            },
        }));
    };

    const handlePointerDown = (
        event: PointerEvent<HTMLDivElement>,
        side: BorderImageSide,
    ) => {
        event.preventDefault();
        event.currentTarget.setPointerCapture(event.pointerId);
        updateSliceFromPointer(side, event.clientX, event.clientY);
    };

    const handlePointerMove = (
        event: PointerEvent<HTMLDivElement>,
        side: BorderImageSide,
    ) => {
        if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
        updateSliceFromPointer(side, event.clientX, event.clientY);
    };

    return (
        <div className="relative col-stretch-1 w-full lg:row-stretch-4 lg:items-start">
            <div
                className="col-stretch-2 h-fit w-full rounded-xl p-2 shadow-inner shadow-black/10 lg:sticky lg:top-2 lg:w-2/5 lg:self-start"
                style={{ backgroundColor: config.canvasColor }}
            >
                <div className="row-center-1 justify-between px-1">
                    <span className="text-[13px] font-medium! text-fg">
                        Slice editor
                    </span>
                    <span className="text-[9px] text-fg/60">
                        Drag the guides
                    </span>
                </div>

                <div
                    ref={sourceRef}
                    className="relative mx-auto aspect-square w-full max-w-[310px] touch-none overflow-hidden rounded-[6px] bg-fg/5 bg-cover bg-center shadow-md shadow-black/20"
                    style={{ backgroundImage: source }}
                >
                    {borderImageSides.map((side) => {
                        const vertical = side === "left" || side === "right";

                        return (
                            <div
                                key={side}
                                role="slider"
                                tabIndex={0}
                                aria-label={`${side} slice`}
                                aria-valuemin={0}
                                aria-valuemax={50}
                                aria-valuenow={config.slice[side]}
                                onPointerDown={(event) =>
                                    handlePointerDown(event, side)
                                }
                                onPointerMove={(event) =>
                                    handlePointerMove(event, side)
                                }
                                className={`
                                    absolute
                                    z-10
                                    touch-none
                                    bg-fg/80
                                    shadow-sm
                                    shadow-black/30
                                    ${
                                        vertical
                                            ? "w-px cursor-ew-resize"
                                            : "h-px cursor-ns-resize"
                                    }
                                `}
                                style={guidePosition(side, config.slice[side])}
                            >
                                <span
                                    className={`
                                        absolute
                                        left-1/2
                                        top-1/2
                                        size-3
                                        -translate-x-1/2
                                        -translate-y-1/2
                                        rounded-full
                                        border
                                        border-fg
                                        bg-app
                                    `}
                                />
                            </div>
                        );
                    })}
                </div>

                <div className="mx-auto flex aspect-square w-full max-w-[310px] items-center justify-center overflow-hidden rounded-[6px] bg-black/5 p-5">
                    <div style={previewStyle} className="grid place-items-center">
                        <span className="max-w-[80%] text-center text-xs text-fg/70">
                            Resize and tune the border
                        </span>
                    </div>
                </div>
            </div>

            <div className="col-center-1 min-w-0 flex-1">
                <ConfigBorderImage config={config} setConfig={setConfig} />

                <div className="col-start-2 w-full rounded-xl bg-fg/10 p-2">
                    <GeneralButton
                        textButton="Copy CSS"
                        copy={{ copyItem: css }}
                        variant="soft"
                    />
                    <code className="w-full whitespace-pre-wrap break-all rounded-xl p-3 text-[12px] transition-colors hover:bg-black/25">
                        {css}
                    </code>
                </div>
            </div>
        </div>
    );
};
