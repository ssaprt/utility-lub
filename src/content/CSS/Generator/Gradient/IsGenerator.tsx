"use client";

import { GeneralButton } from "@/components/button/GeneralButton/GeneralButton";
import { Range } from "@/components/input/range/Range";
import { useMemo, useRef, useState, type PointerEvent } from "react";

type GradientType = "linear" | "radial" | "conic";
type RadialShape = "circle" | "ellipse";

interface GradientStop {
    id: string;
    color: string;
    offset: number;
}

const clamp = (value: number, min: number, max: number) => {
    return Math.min(Math.max(value, min), max);
};

const createId = () => {
    return crypto.randomUUID();
};

const randomColor = () => {
    return `#${Math.floor(Math.random() * 0xffffff)
        .toString(16)
        .padStart(6, "0")}`;
};

export const IsGenerator = () => {
    const trackRef = useRef<HTMLDivElement>(null);

    const [gradientType, setGradientType] = useState<GradientType>("linear");

    const [repeating, setRepeating] = useState(false);

    const [angle, setAngle] = useState(90);

    const [radialShape, setRadialShape] = useState<RadialShape>("ellipse");

    const [positionX, setPositionX] = useState(50);

    const [positionY, setPositionY] = useState(50);

    const [stops, setStops] = useState<GradientStop[]>([
        {
            id: "start",
            color: "#7c3aed",
            offset: 0,
        },
        {
            id: "end",
            color: "#ec4899",
            offset: 100,
        },
    ]);

    const sortedStops = useMemo(() => {
        return [...stops].sort((a, b) => a.offset - b.offset);
    }, [stops]);

    const colors = useMemo(() => {
        return sortedStops
            .map(({ color, offset }) => `${color} ${offset}%`)
            .join(", ");
    }, [sortedStops]);

    const gradient = useMemo(() => {
        const prefix = repeating ? "repeating-" : "";

        if (gradientType === "linear") {
            return `${prefix}linear-gradient(${angle}deg, ${colors})`;
        }

        if (gradientType === "radial") {
            return `${prefix}radial-gradient(${radialShape} at ${positionX}% ${positionY}%, ${colors})`;
        }

        return `${prefix}conic-gradient(from ${angle}deg at ${positionX}% ${positionY}%, ${colors})`;
    }, [
        angle,
        colors,
        gradientType,
        positionX,
        positionY,
        radialShape,
        repeating,
    ]);

    const trackGradient = useMemo(() => {
        return `linear-gradient(90deg, ${colors})`;
    }, [colors]);

    const updateStop = (
        id: string,
        values: Partial<Pick<GradientStop, "color" | "offset">>,
    ) => {
        setStops((current) =>
            current.map((stop) =>
                stop.id === id
                    ? {
                          ...stop,
                          ...values,
                      }
                    : stop,
            ),
        );
    };

    const removeStop = (id: string) => {
        setStops((current) => {
            if (current.length <= 2) {
                return current;
            }

            return current.filter((stop) => stop.id !== id);
        });
    };

    const addStop = () => {
        const ordered = [...stops].sort((a, b) => a.offset - b.offset);

        let largestGap = -1;
        let offset = 50;

        for (let index = 0; index < ordered.length - 1; index += 1) {
            const current = ordered[index];

            const next = ordered[index + 1];

            const gap = next.offset - current.offset;

            if (gap > largestGap) {
                largestGap = gap;

                offset = Math.round(current.offset + gap / 2);
            }
        }

        setStops((current) => [
            ...current,
            {
                id: createId(),
                color: randomColor(),
                offset,
            },
        ]);
    };

    const updateOffsetFromPointer = (id: string, clientX: number) => {
        const track = trackRef.current;

        if (!track) return;

        const rect = track.getBoundingClientRect();

        const offset = Math.round(
            clamp(((clientX - rect.left) / rect.width) * 100, 0, 100),
        );

        updateStop(id, {
            offset,
        });
    };

    const handlePointerDown = (
        event: PointerEvent<HTMLButtonElement>,
        id: string,
    ) => {
        event.currentTarget.setPointerCapture(event.pointerId);

        updateOffsetFromPointer(id, event.clientX);
    };

    const handlePointerMove = (
        event: PointerEvent<HTMLButtonElement>,
        id: string,
    ) => {
        if (!event.currentTarget.hasPointerCapture(event.pointerId)) {
            return;
        }

        updateOffsetFromPointer(id, event.clientX);
    };

    const handleHexChange = (id: string, value: string) => {
        if (/^#[0-9a-fA-F]{0,6}$/.test(value)) {
            updateStop(id, {
                color: value,
            });
        }
    };

    return (
        <div className="col-stretch-4 w-full">
            <div
                className="
                    min-h-64
                    w-full
                    rounded-xl
                    shadow-lg
                    shadow-black/20
                    transition-[background]
                    duration-300
                "
                style={{
                    background: gradient,
                }}
            />

            <div className="row-center-2 flex-wrap">
                <div className="row-center-1 bg-fg/10 p-1 rounded-[8px]">
                    {(["linear", "radial", "conic"] as const).map((type) => (
                        <GeneralButton
                            variant="ghost"
                            key={type}
                            textButton={type}
                            handleAction={() => setGradientType(type)}
                            active={gradientType === type}
                        />
                    ))}
                </div>

                <button
                    type="button"
                    onClick={() => setRepeating((current) => !current)}
                    className={`
                        rounded-[4px]
                        px-3
                        py-1.5
                        text-[12px]
                        transition-all
                        duration-200
                        cursor-pointer
                        ${
                            repeating
                                ? "bg-fg/25 shadow-md shadow-black/20"
                                : "bg-fg/5 hover:bg-fg/15 hover:shadow-md hover:shadow-black/10"
                        }
                    `}
                >
                    Repeating
                </button>
            </div>

            {gradientType === "linear" && (
                <div className="col-stretch-2 rounded-[4px] bg-fg/5 p-3">
                    <div className="row-center-2">
                        <span className="text-sm">Angle</span>

                        <span className="ml-auto text-sm text-fg/60">
                            {angle}°
                        </span>
                    </div>

                    <Range
                        value={angle}
                        min={0}
                        max={360}
                        step={1}
                        onChange={setAngle}
                    />
                </div>
            )}

            {gradientType === "radial" && (
                <div className="col-stretch-3 rounded-[4px] bg-fg/5 p-3">
                    <div className="row-center-2">
                        {(["ellipse", "circle"] as const).map((shape) => (
                            <GeneralButton
                                variant="soft"
                                key={shape}
                                textButton={shape}
                                handleAction={() => setRadialShape(shape)}
                                active={radialShape === shape}
                            />
                        ))}
                    </div>

                    <div className="col-stretch-1">
                        <div className="row-center-2">
                            <span className="text-sm">Position X</span>

                            <span className="ml-auto text-sm text-fg/60">
                                {positionX}%
                            </span>
                        </div>

                        <Range
                            value={positionX}
                            min={0}
                            max={100}
                            step={1}
                            onChange={setPositionX}
                        />
                    </div>

                    <div className="col-stretch-1">
                        <div className="row-center-2">
                            <span className="text-sm">Position Y</span>

                            <span className="ml-auto text-sm text-fg/60">
                                {positionY}%
                            </span>
                        </div>

                        <Range
                            value={positionY}
                            min={0}
                            max={100}
                            step={1}
                            onChange={setPositionY}
                        />
                    </div>
                </div>
            )}

            {gradientType === "conic" && (
                <div className="col-stretch-3 rounded-lg bg-fg/5 p-3">
                    <div className="col-stretch-1">
                        <div className="row-center-2">
                            <span className="text-sm">Start angle</span>

                            <span className="ml-auto text-sm text-fg/60">
                                {angle}°
                            </span>
                        </div>

                        <Range
                            value={angle}
                            min={0}
                            max={360}
                            step={1}
                            onChange={setAngle}
                        />
                    </div>

                    <div className="col-stretch-1">
                        <div className="row-center-2">
                            <span className="text-sm">Position X</span>

                            <span className="ml-auto text-sm text-fg/60">
                                {positionX}%
                            </span>
                        </div>

                        <Range
                            value={positionX}
                            min={0}
                            max={100}
                            step={1}
                            onChange={setPositionX}
                        />
                    </div>

                    <div className="col-stretch-1">
                        <div className="row-center-2">
                            <span className="text-sm">Position Y</span>

                            <span className="ml-auto text-sm text-fg/60">
                                {positionY}%
                            </span>
                        </div>

                        <Range
                            value={positionY}
                            min={0}
                            max={100}
                            step={1}
                            onChange={setPositionY}
                        />
                    </div>
                </div>
            )}

            <div className="relative px-3 pt-5 pb-3">
                <div
                    ref={trackRef}
                    className="
                        relative
                        h-5
                        w-full
                        rounded-full
                        shadow-inner
                        shadow-black/20
                    "
                    style={{
                        background: trackGradient,
                    }}
                >
                    {stops.map((stop) => (
                        <button
                            key={stop.id}
                            type="button"
                            onPointerDown={(event) =>
                                handlePointerDown(event, stop.id)
                            }
                            onPointerMove={(event) =>
                                handlePointerMove(event, stop.id)
                            }
                            className="
                                    absolute
                                    top-1/2
                                    h-7
                                    w-7
                                    -translate-x-1/2
                                    -translate-y-1/2
                                    touch-none
                                    cursor-grab
                                    rounded-full
                                    border-2
                                    border-white
                                    shadow-md
                                    shadow-black/30
                                    transition-[transform,box-shadow]
                                    duration-200

                                    hover:scale-125
                                    hover:shadow-lg
                                    hover:shadow-black/40

                                    active:scale-110
                                    active:cursor-grabbing
                                "
                            style={{
                                left: `${stop.offset}%`,
                                backgroundColor: /^#[0-9a-fA-F]{6}$/.test(
                                    stop.color,
                                )
                                    ? stop.color
                                    : "#000000",
                            }}
                            aria-label={`Gradient stop ${stop.offset}%`}
                        />
                    ))}
                </div>
            </div>

            <div className="col-stretch-2">
                {sortedStops.map((stop) => (
                    <div
                        key={stop.id}
                        className="
                                grid
                                grid-cols-1
                                gap-2
                                rounded-[4px]
                                bg-fg/5
                                p-2

                                sm:grid-cols-[44px_110px_1fr_80px_auto]
                                sm:items-center
                            "
                    >
                        <input
                            type="color"
                            value={
                                /^#[0-9a-fA-F]{6}$/.test(stop.color)
                                    ? stop.color
                                    : "#000000"
                            }
                            onChange={(event) =>
                                updateStop(stop.id, {
                                    color: event.target.value,
                                })
                            }
                            className="
                                    h-9
                                    w-11
                                    cursor-pointer
                                    rounded-md
                                    border-0 
                                    outline-none
                                    bg-transparent
                                    p-0
                                "
                        />

                        <input
                            type="text"
                            value={stop.color}
                            maxLength={7}
                            onChange={(event) =>
                                handleHexChange(stop.id, event.target.value)
                            }
                            className="
                                    min-w-0
                                    rounded-[4px]
                                    bg-fg/10
                                    px-2
                                    py-1.5
                                    text-sm
                                    outline-none
                                    transition-colors
                                    duration-200

                                    hover:bg-fg/15
                                    focus:bg-fg/15
                                "
                        />

                        <Range
                            value={stop.offset}
                            min={0}
                            max={100}
                            onChange={(_, event) =>
                                updateStop(stop.id, {
                                    offset: Number(event!.target.value),
                                })
                            }
                        />

                        <div className="row-center-1">
                            <input
                                type="number"
                                min={0}
                                max={100}
                                value={stop.offset}
                                onChange={(event) =>
                                    updateStop(stop.id, {
                                        offset: clamp(
                                            Number(event.target.value),
                                            0,
                                            100,
                                        ),
                                    })
                                }
                                className="
                                        w-14
                                        rounded-[4px]
                                        bg-fg/10
                                        px-1
                                        py-1.5
                                        text-center
                                        text-sm
                                        outline-none
                                        transition-colors
                                        duration-200

                                        hover:bg-fg/15
                                        focus:bg-fg/15
                                    "
                            />

                            <span className="text-sm text-fg/60">%</span>
                        </div>

                        <GeneralButton
                            textButton="Delete"
                            variant="minimal"
                            active={stops.length <= 2}
                            handleAction={() => removeStop(stop.id)}
                        />
                    </div>
                ))}
            </div>

            <div className="row-center-2 flex-wrap">
                <GeneralButton
                    textButton="Add color"
                    handleAction={addStop}
                    variant="soft"
                />

                <GeneralButton
                    textButton="Copy CSS"
                    copy={{ copyItem: gradient }}
                    variant="soft"
                />
            </div>

            <div
                className="
                    rounded-lg
                    bg-black/20
                    p-3
                    transition-colors
                    duration-200
                    hover:bg-black/25
                "
            >
                <code className="text-sm break-all">
                    background: {gradient};
                </code>
            </div>
        </div>
    );
};
