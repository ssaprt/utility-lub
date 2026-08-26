"use client";

import { GeneralButton } from "@/components/button/GeneralButton/GeneralButton";
import { useAppContextValues } from "@/context/appContext";
import { motion } from "framer-motion";

import {
    useMemo,
    useRef,
    type CSSProperties,
    type Dispatch,
    type KeyboardEvent,
    type PointerEvent,
    type SetStateAction,
} from "react";

import type { BorderConfig, BorderCornerName } from "./border.type";

import {
    borderConfigToCss,
    borderRadiusToCss,
    borderSideToCss,
    clamp,
} from "./border.utils";

import { ConfigBorder } from "./ConfigBorder";

export interface IsGeneratorProps {
    config: BorderConfig;
    setConfig: Dispatch<SetStateAction<BorderConfig>>;
}

type ResizeAxis = "x" | "y" | "xy";

const corners: BorderCornerName[] = [
    "topLeft",
    "topRight",
    "bottomRight",
    "bottomLeft",
];

export const IsGenerator = ({ config, setConfig }: IsGeneratorProps) => {
    const previewRef = useRef<HTMLDivElement>(null);
    const boxRef = useRef<HTMLDivElement>(null);

    const resizeState = useRef<{
        axis: ResizeAxis;

        startX: number;
        startY: number;

        startWidth: number;
        startHeight: number;
    }>({
        axis: "xy",

        startX: 0,
        startY: 0,

        startWidth: config.boxWidth,
        startHeight: config.boxHeight,
    });

    const { header } = useAppContextValues();

    const { isScrolled } = header || {};

    const borderRadius = useMemo(() => {
        return borderRadiusToCss(config.radius, config.radiusUnit);
    }, [config.radius, config.radiusUnit]);

    const css = useMemo(() => {
        return borderConfigToCss(config);
    }, [config]);

    const boxStyle = useMemo<CSSProperties>(() => {
        return {
            width: `${config.boxWidth}px`,
            height: `${config.boxHeight}px`,

            maxWidth: "calc(100% - 60px)",
            maxHeight: "calc(100% - 60px)",

            boxSizing: "border-box",

            backgroundColor: config.boxColor,

            borderTop: borderSideToCss(config.borders.top),

            borderRight: borderSideToCss(config.borders.right),

            borderBottom: borderSideToCss(config.borders.bottom),

            borderLeft: borderSideToCss(config.borders.left),

            borderRadius,
        };
    }, [config, borderRadius]);

    const getResizeLimits = () => {
        const preview = previewRef.current;

        if (!preview) {
            return {
                maxWidth: 340,
                maxHeight: 340,
            };
        }

        return {
            maxWidth: Math.max(80, Math.min(340, preview.clientWidth - 60)),

            maxHeight: Math.max(80, Math.min(340, preview.clientHeight - 60)),
        };
    };

    const handleResizeStart = (
        event: PointerEvent<HTMLDivElement>,
        axis: ResizeAxis,
    ) => {
        event.preventDefault();

        event.currentTarget.setPointerCapture(event.pointerId);

        resizeState.current = {
            axis,

            startX: event.clientX,
            startY: event.clientY,

            startWidth: config.boxWidth,
            startHeight: config.boxHeight,
        };
    };

    const handleResizeMove = (event: PointerEvent<HTMLDivElement>) => {
        if (!event.currentTarget.hasPointerCapture(event.pointerId)) {
            return;
        }

        const {
            axis,

            startX,
            startY,

            startWidth,
            startHeight,
        } = resizeState.current;

        const { maxWidth, maxHeight } = getResizeLimits();

        const deltaX = event.clientX - startX;
        const deltaY = event.clientY - startY;

        const nextWidth =
            axis === "x" || axis === "xy"
                ? clamp(Math.round(startWidth + deltaX * 2), 80, maxWidth)
                : config.boxWidth;

        const nextHeight =
            axis === "y" || axis === "xy"
                ? clamp(Math.round(startHeight + deltaY * 2), 80, maxHeight)
                : config.boxHeight;

        setConfig((current) => ({
            ...current,

            boxWidth:
                axis === "x" || axis === "xy" ? nextWidth : current.boxWidth,

            boxHeight:
                axis === "y" || axis === "xy" ? nextHeight : current.boxHeight,
        }));
    };

    const handleResizeEnd = (event: PointerEvent<HTMLDivElement>) => {
        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId);
        }
    };

    const updateRadiusFromPointer = (
        corner: BorderCornerName,
        clientX: number,
        clientY: number,
    ) => {
        const box = boxRef.current;

        if (!box) {
            return;
        }

        const rect = box.getBoundingClientRect();

        let distanceX = 0;
        let distanceY = 0;

        switch (corner) {
            case "topLeft":
                distanceX = clientX - rect.left;
                distanceY = clientY - rect.top;
                break;

            case "topRight":
                distanceX = rect.right - clientX;
                distanceY = clientY - rect.top;
                break;

            case "bottomRight":
                distanceX = rect.right - clientX;
                distanceY = rect.bottom - clientY;
                break;

            case "bottomLeft":
                distanceX = clientX - rect.left;
                distanceY = rect.bottom - clientY;
                break;
        }

        let nextX: number;
        let nextY: number;

        if (config.radiusUnit === "%") {
            nextX = Number(
                clamp((distanceX / rect.width) * 100, 0, 50).toFixed(2),
            );

            nextY = Number(
                clamp((distanceY / rect.height) * 100, 0, 50).toFixed(2),
            );
        } else {
            nextX = Math.round(clamp(distanceX, 0, rect.width / 2));

            nextY = Math.round(clamp(distanceY, 0, rect.height / 2));
        }

        setConfig((current) => ({
            ...current,

            radius: {
                ...current.radius,

                [corner]: {
                    x: nextX,
                    y: nextY,
                },
            },
        }));
    };

    const handleRadiusPointerDown = (
        event: PointerEvent<HTMLDivElement>,
        corner: BorderCornerName,
    ) => {
        event.preventDefault();
        event.stopPropagation();

        event.currentTarget.setPointerCapture(event.pointerId);

        updateRadiusFromPointer(corner, event.clientX, event.clientY);
    };

    const handleRadiusPointerMove = (
        event: PointerEvent<HTMLDivElement>,
        corner: BorderCornerName,
    ) => {
        if (!event.currentTarget.hasPointerCapture(event.pointerId)) {
            return;
        }

        updateRadiusFromPointer(corner, event.clientX, event.clientY);
    };

    const handleRadiusPointerEnd = (event: PointerEvent<HTMLDivElement>) => {
        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId);
        }
    };

    const handleRadiusKeyDown = (
        event: KeyboardEvent<HTMLDivElement>,
        corner: BorderCornerName,
    ) => {
        const validKeys = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"];

        if (!validKeys.includes(event.key)) {
            return;
        }

        event.preventDefault();

        const step =
            config.radiusUnit === "%"
                ? event.shiftKey
                    ? 5
                    : 1
                : event.shiftKey
                  ? 10
                  : 1;

        setConfig((current) => {
            const radius = current.radius[corner];

            const maxX = current.radiusUnit === "%" ? 50 : current.boxWidth / 2;

            const maxY =
                current.radiusUnit === "%" ? 50 : current.boxHeight / 2;

            const isRight = corner === "topRight" || corner === "bottomRight";

            const isBottom =
                corner === "bottomLeft" || corner === "bottomRight";

            let nextX = radius.x;
            let nextY = radius.y;

            switch (event.key) {
                case "ArrowLeft":
                    nextX += isRight ? step : -step;
                    break;

                case "ArrowRight":
                    nextX += isRight ? -step : step;
                    break;

                case "ArrowUp":
                    nextY += isBottom ? step : -step;
                    break;

                case "ArrowDown":
                    nextY += isBottom ? -step : step;
                    break;
            }

            return {
                ...current,

                radius: {
                    ...current.radius,

                    [corner]: {
                        x: Number(clamp(nextX, 0, maxX).toFixed(2)),

                        y: Number(clamp(nextY, 0, maxY).toFixed(2)),
                    },
                },
            };
        });
    };

    const getHandleStyle = (corner: BorderCornerName): CSSProperties => {
        const radius = config.radius[corner];

        const maxX = config.radiusUnit === "%" ? 50 : config.boxWidth / 2;

        const maxY = config.radiusUnit === "%" ? 50 : config.boxHeight / 2;

        const x = clamp(radius.x, 0, maxX);

        const y = clamp(radius.y, 0, maxY);

        const xValue = `${x}${config.radiusUnit}`;
        const yValue = `${y}${config.radiusUnit}`;

        switch (corner) {
            case "topLeft":
                return {
                    left: xValue,
                    top: yValue,

                    transform: "translate(-50%, -50%)",
                };

            case "topRight":
                return {
                    right: xValue,
                    top: yValue,

                    transform: "translate(50%, -50%)",
                };

            case "bottomRight":
                return {
                    right: xValue,
                    bottom: yValue,

                    transform: "translate(50%, 50%)",
                };

            case "bottomLeft":
                return {
                    left: xValue,
                    bottom: yValue,

                    transform: "translate(-50%, 50%)",
                };
        }
    };

    const getRadiusLabel = (corner: BorderCornerName) => {
        const value = config.radius[corner];

        return `${value.x}${config.radiusUnit} × ${value.y}${config.radiusUnit}`;
    };

    const scroll = (isScrolled?.scroll.scrollTop ?? 0) > 380;

    return (
        <div
            className="
                relative
                col-stretch-1
                w-full
                lg:row-stretch-4
            "
        >
            <motion.div
                onClick={() =>
                    document.querySelector<HTMLElement>("#main")?.scrollTo({
                        top: 0,
                        behavior: "smooth",
                    })
                }
                animate={{
                    opacity: scroll ? 1 : 0,

                    x: scroll ? 0 : "100%",
                }}
                transition={{
                    type: "spring",

                    stiffness: scroll ? 100 : 500,

                    damping: scroll ? 8 : 24,

                    mass: 0.4,
                }}
                className="
                            fixed
                            flex
                            size-[100px]
                            z-9
                            cursor-pointer
                            items-center
                            justify-center
                            overflow-hidden
                            rounded-xl
                            shadow-lg
                            shadow-black/80
                        "
                style={{
                    right: "20px",
                    top: "90px",

                    backgroundColor: config.canvasColor,
                }}
            >
                <div
                    className="size-[50px]"
                    style={{
                        boxSizing: "border-box",

                        backgroundColor: config.boxColor,

                        borderTop: borderSideToCss(config.borders.top),

                        borderRight: borderSideToCss(config.borders.right),

                        borderBottom: borderSideToCss(config.borders.bottom),

                        borderLeft: borderSideToCss(config.borders.left),

                        borderRadius,
                    }}
                />
            </motion.div>
            <div
                role="slider"
                tabIndex={0}
                aria-label="Resize block width"
                aria-valuemin={80}
                aria-valuemax={340}
                aria-valuenow={config.boxWidth}
                onPointerDown={(event) => handleResizeStart(event, "x")}
                onPointerMove={handleResizeMove}
                onPointerUp={handleResizeEnd}
                onPointerCancel={handleResizeEnd}
                className="
                            absolute
                            top-1/2
                            right-[-5px]
                            z-20!
                            h-10
                            w-[7px]
                            -translate-y-1/2
                            touch-none
                            cursor-ew-resize
                            rounded-[2px]
                            border
                            border-fg
                            bg-app
                            shadow-sm
                            shadow-black/20
                            transition-[width,background,color]
                            duration-150
                            hover:w-[9px]
                            hover:bg-fg
                            hover:text-app
                        "
            />
            <div
                ref={previewRef}
                className="
                    relative
                    flex
                    h-[420px]
                    w-full
                    items-center
                    justify-center
                    overflow-hidden
                    rounded-xl
                    shadow-inner
                    shadow-black/10
                    lg:sticky
                    lg:top-0
                    lg:w-1/3
                "
                style={{
                    backgroundColor: config.canvasColor,
                }}
            >
                <div
                    ref={boxRef}
                    className="
                        relative
                        shrink-0
                        transition-[background-color,border-color,border-radius]
                        duration-200
                    "
                    style={boxStyle}
                >
                    {corners.map((corner) => {
                        const value = config.radius[corner];

                        const max =
                            config.radiusUnit === "%"
                                ? 50
                                : Math.max(config.boxWidth, config.boxHeight) /
                                  2;

                        return (
                            <div
                                key={corner}
                                role="slider"
                                tabIndex={0}
                                aria-label={`${corner} border radius`}
                                aria-valuemin={0}
                                aria-valuemax={max}
                                aria-valuenow={value.x}
                                aria-valuetext={getRadiusLabel(corner)}
                                title={`${corner}: ${getRadiusLabel(corner)}`}
                                onPointerDown={(event) =>
                                    handleRadiusPointerDown(event, corner)
                                }
                                onPointerMove={(event) =>
                                    handleRadiusPointerMove(event, corner)
                                }
                                onPointerUp={handleRadiusPointerEnd}
                                onPointerCancel={handleRadiusPointerEnd}
                                onKeyDown={(event) =>
                                    handleRadiusKeyDown(event, corner)
                                }
                                className="
                                    absolute
                                    z-10
                                    size-[14px]
                                    touch-none
                                    cursor-move
                                    rounded-full
                                    border-2
                                    border-fg
                                    bg-app
                                    shadow-md
                                    shadow-black/30
                                    transition-[background-color,box-shadow]
                                    duration-150
                                    hover:bg-fg
                                    hover:shadow-lg
                                    focus:bg-fg
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-fg
                                    focus:ring-offset-2
                                    focus:ring-offset-app
                                "
                                style={getHandleStyle(corner)}
                            />
                        );
                    })}

                    <div
                        role="slider"
                        tabIndex={0}
                        aria-label="Resize block height"
                        aria-valuemin={80}
                        aria-valuemax={340}
                        aria-valuenow={config.boxHeight}
                        onPointerDown={(event) => handleResizeStart(event, "y")}
                        onPointerMove={handleResizeMove}
                        onPointerUp={handleResizeEnd}
                        onPointerCancel={handleResizeEnd}
                        className="
                            absolute
                            bottom-[-5px]
                            left-1/2
                            z-20
                            h-[7px]
                            w-10
                            -translate-x-1/2
                            touch-none
                            cursor-ns-resize
                            rounded-[2px]
                            border
                            border-fg
                            bg-app
                            shadow-sm
                            shadow-black/20
                            transition-[height,background,color]
                            duration-150
                            hover:h-[9px]
                            hover:bg-fg
                            hover:text-app
                        "
                    />

                    <div
                        role="slider"
                        tabIndex={0}
                        aria-label="Resize block width and height"
                        aria-valuemin={80}
                        aria-valuemax={340}
                        aria-valuenow={Math.max(
                            config.boxWidth,
                            config.boxHeight,
                        )}
                        onPointerDown={(event) =>
                            handleResizeStart(event, "xy")
                        }
                        onPointerMove={handleResizeMove}
                        onPointerUp={handleResizeEnd}
                        onPointerCancel={handleResizeEnd}
                        className="
                            absolute
                            right-[-7px]
                            bottom-[-7px]
                            z-30
                            size-[11px]
                            touch-none
                            cursor-nwse-resize
                            rounded-[2px]
                            border
                            border-fg
                            bg-app
                            shadow-sm
                            shadow-black/25
                            transition-[transform,background]
                            duration-150
                            hover:scale-125
                            hover:bg-fg
                        "
                    />

                    <div
                        className="
                            pointer-events-none
                            absolute
                            bottom-3
                            left-3
                            rounded-[6px]
                            bg-black/40
                            px-2
                            py-1
                            text-[10px]
                            text-white
                            backdrop-blur-sm
                        "
                    >
                        {config.boxWidth}
                        {" × "}
                        {config.boxHeight}
                        px
                    </div>
                </div>
            </div>

            <div className="col-center-1 flex-1">
                <ConfigBorder config={config} setConfig={setConfig} />

                <div
                    className="
                        col-start-2
                        w-full
                        rounded-xl
                        bg-fg/10
                        p-2
                    "
                >
                    <GeneralButton
                        textButton="Copy CSS"
                        copy={{
                            copyItem: css,
                        }}
                        variant="soft"
                    />

                    <div
                        className="
                            w-full
                            rounded-xl
                            p-3
                            transition-colors
                            duration-200
                            hover:bg-black/25
                        "
                    >
                        <code
                            className="
                                whitespace-pre-wrap
                                break-all
                                text-[12px]
                            "
                        >
                            {css}
                        </code>
                    </div>
                </div>
            </div>
        </div>
    );
};
