"use client";

import { GeneralButton } from "@/components/button/GeneralButton/GeneralButton";
import { NumberInput } from "@/components/input/Number/Number";
import { Range } from "@/components/input/range/Range";
import {
    useMemo,
    useRef,
    useState,
    type Dispatch,
    type PointerEvent,
    type SetStateAction,
} from "react";
import {
    animationDirections,
    animationFillModes,
    createAnimationFrame,
    defaultAnimationConfig,
    type AnimationConfig,
    type AnimationFrame,
} from "./animation.type";
import { cloneAnimationConfig } from "./animation.utils";

export interface ConfigAnimationProps {
    config: AnimationConfig;
    setConfig: Dispatch<SetStateAction<AnimationConfig>>;
}

const inputClass = `
    w-full
    min-w-0
    rounded-[4px]
    border-0
    bg-fg/10
    px-2
    py-1.5
    text-[11px]!
    text-fg
    outline-none
    transition-colors
    hover:bg-fg/15
    focus:bg-fg/15
`;

const selectClass = `${inputClass} cursor-pointer`;

const timingPresets = [
    "linear",
    "ease",
    "ease-in",
    "ease-out",
    "ease-in-out",
    "cubic-bezier(0.22, 1, 0.36, 1)",
];

const bezierGraph = {
    left: 20,
    right: 280,
    top: 10,
    bottom: 170,
    minY: -2,
    maxY: 3,
};

const bezierPointX = (value: number) =>
    bezierGraph.left + value * (bezierGraph.right - bezierGraph.left);

const bezierPointY = (value: number) =>
    bezierGraph.bottom -
    ((value - bezierGraph.minY) /
        (bezierGraph.maxY - bezierGraph.minY)) *
        (bezierGraph.bottom - bezierGraph.top);

const FrameRange = ({
    label,
    value,
    min,
    max,
    step,
    unit,
    onChange,
}: {
    label: string;
    value: number;
    min: number;
    max: number;
    step: number;
    unit?: string;
    onChange: (value: number) => void;
}) => (
    <div className="col-stretch-1 rounded-[8px] bg-fg/5 p-2">
        <div className="row-center-1 justify-between">
            <span className="text-[10px]">{label}</span>
            <span className="text-[9px] text-fg/60">
                {value}
                {unit}
            </span>
        </div>
        <Range
            value={value}
            min={min}
            max={max}
            step={step}
            onChange={onChange}
        />
        <NumberInput
            value={value}
            min={min}
            max={max}
            step={step}
            ariaLabel={label}
            onChange={onChange}
        />
    </div>
);

export const ConfigAnimation = ({
    config,
    setConfig,
}: ConfigAnimationProps) => {
    const bezierRef = useRef<SVGSVGElement>(null);
    const sortedFrames = useMemo(
        () => [...config.frames].sort((a, b) => a.offset - b.offset),
        [config.frames],
    );
    const [selectedId, setSelectedId] = useState(
        sortedFrames[0]?.id ?? "start",
    );
    const selectedFrame =
        config.frames.find((frame) => frame.id === selectedId) ??
        config.frames[0];

    const updateConfig = <K extends keyof AnimationConfig>(
        key: K,
        value: AnimationConfig[K],
    ) => setConfig((current) => ({ ...current, [key]: value }));

    const updateFrame = (
        values: Partial<Omit<AnimationFrame, "id">>,
    ) => {
        setConfig((current) => ({
            ...current,
            frames: current.frames.map((frame) =>
                frame.id === selectedId ? { ...frame, ...values } : frame,
            ),
        }));
    };

    const addFrame = (offset: number) => {
        const id = `frame-${Date.now()}`;
        const base = selectedFrame ?? createAnimationFrame(id, offset);
        const frame = { ...base, id, offset: Math.round(offset) };

        setConfig((current) => ({
            ...current,
            frames: [...current.frames, frame],
        }));
        setSelectedId(id);
    };

    const duplicateFrame = () => {
        if (!selectedFrame) return;
        addFrame(Math.min(100, selectedFrame.offset + 10));
    };

    const deleteFrame = () => {
        if (!selectedFrame || config.frames.length <= 2) return;

        const nextFrames = config.frames.filter(
            (frame) => frame.id !== selectedFrame.id,
        );
        setConfig((current) => ({ ...current, frames: nextFrames }));
        setSelectedId(nextFrames[0]?.id ?? "start");
    };

    const updateTimelineFromPointer = (
        event: PointerEvent<HTMLDivElement>,
        id: string,
    ) => {
        const track = event.currentTarget.parentElement;
        if (!track) return;

        const rect = track.getBoundingClientRect();
        const offset = Math.round(
            Math.min(100, Math.max(0, ((event.clientX - rect.left) / rect.width) * 100)),
        );

        setConfig((current) => ({
            ...current,
            frames: current.frames.map((frame) =>
                frame.id === id ? { ...frame, offset } : frame,
            ),
        }));
    };

    const updateBezierFromPointer = (
        event: PointerEvent<SVGCircleElement>,
        point: 1 | 2,
    ) => {
        const svg = bezierRef.current;
        const matrix = svg?.getScreenCTM();
        if (!svg || !matrix) return;

        const cursor = svg.createSVGPoint();
        cursor.x = event.clientX;
        cursor.y = event.clientY;
        const local = cursor.matrixTransform(matrix.inverse());
        const x = Math.min(
            1,
            Math.max(
                0,
                (local.x - bezierGraph.left) /
                    (bezierGraph.right - bezierGraph.left),
            ),
        );
        const y = Math.min(
            bezierGraph.maxY,
            Math.max(
                bezierGraph.minY,
                bezierGraph.minY +
                    ((bezierGraph.bottom - local.y) /
                        (bezierGraph.bottom - bezierGraph.top)) *
                        (bezierGraph.maxY - bezierGraph.minY),
            ),
        );

        setConfig((current) => ({
            ...current,
            timingMode: "cubic-bezier",
            ...(point === 1
                ? {
                      bezierX1: Number(x.toFixed(2)),
                      bezierY1: Number(y.toFixed(2)),
                  }
                : {
                      bezierX2: Number(x.toFixed(2)),
                      bezierY2: Number(y.toFixed(2)),
                  }),
        }));
    };

    const handleBezierPointerDown = (
        event: PointerEvent<SVGCircleElement>,
        point: 1 | 2,
    ) => {
        event.currentTarget.setPointerCapture(event.pointerId);
        updateBezierFromPointer(event, point);
    };

    const handleBezierPointerMove = (
        event: PointerEvent<SVGCircleElement>,
        point: 1 | 2,
    ) => {
        if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
        updateBezierFromPointer(event, point);
    };

    const reset = () => {
        const next = cloneAnimationConfig(defaultAnimationConfig);
        setConfig(next);
        setSelectedId(next.frames[0]?.id ?? "start");
    };

    if (!selectedFrame) return null;

    return (
        <div className="col-stretch-2 w-full">
            <div className="col-stretch-2 rounded-md bg-fg/5 p-2">
                <div className="row-center-1 justify-between">
                    <span className="text-[13px] font-medium! text-fg">
                        Animation settings
                    </span>
                    <GeneralButton
                        textButton="Clear"
                        variant="ghost"
                        handleAction={reset}
                    />
                </div>

                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    <label className="col-stretch-1 rounded-[8px] bg-fg/5 p-2">
                        <span className="text-[10px]">Animation name</span>
                        <input
                            value={config.name}
                            onChange={(event) =>
                                updateConfig("name", event.target.value)
                            }
                            className={inputClass}
                        />
                    </label>
                    <label className="col-stretch-1 rounded-[8px] bg-fg/5 p-2">
                        <span className="text-[10px]">Target class</span>
                        <input
                            value={config.targetClass}
                            onChange={(event) =>
                                updateConfig("targetClass", event.target.value)
                            }
                            className={inputClass}
                        />
                    </label>
                </div>

                <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
                    <FrameRange
                        label="Duration"
                        value={config.duration}
                        min={0.1}
                        max={10}
                        step={0.1}
                        unit="s"
                        onChange={(value) => updateConfig("duration", value)}
                    />
                    <FrameRange
                        label="Delay"
                        value={config.delay}
                        min={0}
                        max={5}
                        step={0.1}
                        unit="s"
                        onChange={(value) => updateConfig("delay", value)}
                    />
                    <label className="col-stretch-1 rounded-[8px] bg-fg/5 p-2">
                        <span className="text-[10px]">Direction</span>
                        <select
                            value={config.direction}
                            onChange={(event) =>
                                updateConfig(
                                    "direction",
                                    event.target.value as AnimationConfig["direction"],
                                )
                            }
                            className={selectClass}
                        >
                            {animationDirections.map((direction) => (
                                <option key={direction}>{direction}</option>
                            ))}
                        </select>
                    </label>
                    <label className="col-stretch-1 rounded-[8px] bg-fg/5 p-2">
                        <span className="text-[10px]">Fill mode</span>
                        <select
                            value={config.fillMode}
                            onChange={(event) =>
                                updateConfig(
                                    "fillMode",
                                    event.target.value as AnimationConfig["fillMode"],
                                )
                            }
                            className={selectClass}
                        >
                            {animationFillModes.map((mode) => (
                                <option key={mode}>{mode}</option>
                            ))}
                        </select>
                    </label>
                </div>

                <div className="row-center-1 flex-wrap rounded-[8px] bg-fg/5 p-2">
                    <span className="mr-auto text-[10px]">Iterations</span>
                    <NumberInput
                        value={
                            config.iterationCount === "infinite"
                                ? 1
                                : config.iterationCount
                        }
                        min={1}
                        max={100}
                        step={1}
                        ariaLabel="Iteration count"
                        onChange={(value) =>
                            updateConfig("iterationCount", value)
                        }
                    />
                    <GeneralButton
                        textButton="∞"
                        variant="ghost"
                        active={config.iterationCount === "infinite"}
                        handleAction={() =>
                            updateConfig("iterationCount", "infinite")
                        }
                    />
                </div>
            </div>

            <div className="col-stretch-2 rounded-md bg-fg/5 p-2">
                <span className="text-[13px] font-medium! text-fg">
                    Timing function
                </span>
                <div className="row-center-1 flex-wrap rounded-[8px] bg-fg/5 p-2">
                    {timingPresets.map((timing) => (
                        <GeneralButton
                            key={timing}
                            textButton={
                                timing.startsWith("cubic") ? "Smooth" : timing
                            }
                            variant="ghost"
                            active={config.timingFunction === timing}
                            handleAction={() => setConfig((current) => ({ ...current, timingFunction: timing, timingMode: "preset" }))}
                        />
                    ))}
                </div>
                <input
                    value={config.timingFunction}
                    onChange={(event) => setConfig((current) => ({ ...current, timingFunction: event.target.value, timingMode: "preset" }))}
                    className={inputClass}
                    aria-label="Custom timing function"
                />
                <div className="row-center-1 flex-wrap rounded-[8px] bg-fg/5 p-1.5">
                    {(["preset", "cubic-bezier", "steps"] as const).map((mode) => (
                        <GeneralButton key={mode} textButton={mode} variant="ghost" active={config.timingMode === mode} handleAction={() => updateConfig("timingMode", mode)} />
                    ))}
                </div>
                {config.timingMode === "cubic-bezier" && <>
                    <div className="h-44 w-full rounded-[8px] bg-fg/5 p-2">
                    <svg ref={bezierRef} viewBox="0 0 300 180" className="size-full touch-none select-none">
                        <line x1={bezierGraph.left} y1={bezierPointY(0)} x2={bezierGraph.right} y2={bezierPointY(0)} stroke="currentColor" opacity=".08" />
                        <line x1={bezierGraph.left} y1={bezierPointY(1)} x2={bezierGraph.right} y2={bezierPointY(1)} stroke="currentColor" opacity=".08" />
                        <line x1={bezierGraph.left} y1={bezierGraph.top} x2={bezierGraph.left} y2={bezierGraph.bottom} stroke="currentColor" opacity=".08" />
                        <line x1={bezierGraph.right} y1={bezierGraph.top} x2={bezierGraph.right} y2={bezierGraph.bottom} stroke="currentColor" opacity=".08" />
                        <line x1={bezierGraph.left} y1={bezierPointY(0)} x2={bezierPointX(config.bezierX1)} y2={bezierPointY(config.bezierY1)} stroke="currentColor" opacity=".35" />
                        <line x1={bezierGraph.right} y1={bezierPointY(1)} x2={bezierPointX(config.bezierX2)} y2={bezierPointY(config.bezierY2)} stroke="currentColor" opacity=".35" />
                        <path d={`M${bezierGraph.left} ${bezierPointY(0)} C${bezierPointX(config.bezierX1)} ${bezierPointY(config.bezierY1)}, ${bezierPointX(config.bezierX2)} ${bezierPointY(config.bezierY2)}, ${bezierGraph.right} ${bezierPointY(1)}`} fill="none" stroke="currentColor" strokeWidth="3" />
                        <circle cx={bezierGraph.left} cy={bezierPointY(0)} r="4" fill="currentColor" opacity=".5" />
                        <circle cx={bezierGraph.right} cy={bezierPointY(1)} r="4" fill="currentColor" opacity=".5" />
                        <circle
                            role="slider"
                            aria-label="Bezier control point 1"
                            aria-valuetext={`${config.bezierX1}, ${config.bezierY1}`}
                            tabIndex={0}
                            cx={bezierPointX(config.bezierX1)}
                            cy={bezierPointY(config.bezierY1)}
                            r="10"
                            fill="currentColor"
                            stroke="var(--background)"
                            strokeWidth="5"
                            className="cursor-grab active:cursor-grabbing"
                            onPointerDown={(event) => handleBezierPointerDown(event, 1)}
                            onPointerMove={(event) => handleBezierPointerMove(event, 1)}
                        />
                        <circle
                            role="slider"
                            aria-label="Bezier control point 2"
                            aria-valuetext={`${config.bezierX2}, ${config.bezierY2}`}
                            tabIndex={0}
                            cx={bezierPointX(config.bezierX2)}
                            cy={bezierPointY(config.bezierY2)}
                            r="10"
                            fill="currentColor"
                            stroke="var(--background)"
                            strokeWidth="5"
                            className="cursor-grab active:cursor-grabbing"
                            onPointerDown={(event) => handleBezierPointerDown(event, 2)}
                            onPointerMove={(event) => handleBezierPointerMove(event, 2)}
                        />
                    </svg>
                    </div>
                    <div className="grid grid-cols-2 gap-1.5 lg:grid-cols-4">
                        <FrameRange label="X1" value={config.bezierX1} min={0} max={1} step={.01} onChange={(value) => updateConfig("bezierX1", value)} />
                        <FrameRange label="Y1" value={config.bezierY1} min={-2} max={3} step={.01} onChange={(value) => updateConfig("bezierY1", value)} />
                        <FrameRange label="X2" value={config.bezierX2} min={0} max={1} step={.01} onChange={(value) => updateConfig("bezierX2", value)} />
                        <FrameRange label="Y2" value={config.bezierY2} min={-2} max={3} step={.01} onChange={(value) => updateConfig("bezierY2", value)} />
                    </div>
                </>}
                {config.timingMode === "steps" && <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                    <FrameRange label="Steps" value={config.stepCount} min={1} max={24} step={1} onChange={(value) => updateConfig("stepCount", value)} />
                    <label className="col-stretch-1 rounded-[8px] bg-fg/5 p-2"><span className="text-[10px]">Jump term</span><select value={config.stepJump} onChange={(event) => updateConfig("stepJump", event.target.value as AnimationConfig["stepJump"])} className={selectClass}>{["jump-start", "jump-end", "jump-none", "jump-both"].map((value) => <option key={value}>{value}</option>)}</select></label>
                </div>}
            </div>

            <div className="col-stretch-2 rounded-md bg-fg/5 p-2">
                <span className="text-[13px] font-medium! text-fg">Scene & accessibility</span>
                <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2 lg:grid-cols-3">
                    <FrameRange label="Origin X" value={config.transformOriginX} min={0} max={100} step={1} unit="%" onChange={(value) => updateConfig("transformOriginX", value)} />
                    <FrameRange label="Origin Y" value={config.transformOriginY} min={0} max={100} step={1} unit="%" onChange={(value) => updateConfig("transformOriginY", value)} />
                    <FrameRange label="Perspective" value={config.perspective} min={100} max={2000} step={10} unit="px" onChange={(value) => updateConfig("perspective", value)} />
                </div>
                <GeneralButton textButton="Reduced motion fallback" variant="ghost" active={config.reducedMotion} handleAction={() => updateConfig("reducedMotion", !config.reducedMotion)} />
            </div>

            <div className="col-stretch-3 rounded-md bg-fg/5 p-2">
                <div className="row-center-1 justify-between">
                    <div className="col-stretch-0">
                        <span className="text-[13px] font-medium! text-fg">
                            Timeline
                        </span>
                        <span className="text-[9px] text-fg/50">
                            Drag stops or click the track to add
                        </span>
                    </div>
                    <GeneralButton
                        textButton="Add keyframe"
                        variant="ghost"
                        handleAction={() => addFrame(50)}
                    />
                </div>

                <div className="rounded-[8px] bg-fg/5 px-5">
                    <div
                        className="relative h-12 cursor-crosshair"
                        onDoubleClick={(event) => {
                            const rect =
                                event.currentTarget.getBoundingClientRect();
                            addFrame(
                                ((event.clientX - rect.left) / rect.width) *
                                    100,
                            );
                        }}
                    >
                        <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-fg/30" />
                        {sortedFrames.map((frame) => (
                            <div
                                key={frame.id}
                                role="slider"
                                tabIndex={0}
                                aria-label={`Keyframe ${frame.offset}%`}
                                onClick={(event) => {
                                    event.stopPropagation();
                                    setSelectedId(frame.id);
                                }}
                                onPointerDown={(event) => {
                                    event.currentTarget.setPointerCapture(
                                        event.pointerId,
                                    );
                                    setSelectedId(frame.id);
                                }}
                                onPointerMove={(event) => {
                                    if (
                                        event.currentTarget.hasPointerCapture(
                                            event.pointerId,
                                        )
                                    ) {
                                        updateTimelineFromPointer(
                                            event,
                                            frame.id,
                                        );
                                    }
                                }}
                                className={`
                                    absolute
                                    top-1/2
                                    z-10
                                    size-4
                                    -translate-x-1/2
                                    -translate-y-1/2
                                    touch-none
                                    cursor-ew-resize
                                    rounded-full
                                    border-2
                                    border-fg
                                    shadow-md
                                    shadow-black/25
                                    ${
                                        selectedId === frame.id
                                            ? "scale-125 bg-fg"
                                            : "bg-app"
                                    }
                                `}
                                style={{ left: `${frame.offset}%` }}
                            >
                                <span className="absolute left-1/2 top-5 -translate-x-1/2 text-[8px] text-fg">
                                    {frame.offset}%
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="row-center-1 flex-wrap rounded-[8px] bg-fg/5 p-2">
                    <span className="mr-auto text-[11px]">
                        Editing {selectedFrame.offset}%
                    </span>
                    <GeneralButton
                        textButton="Duplicate"
                        variant="ghost"
                        handleAction={duplicateFrame}
                    />
                    <GeneralButton
                        textButton="Delete"
                        variant="ghost"
                        disabled={config.frames.length <= 2}
                        handleAction={deleteFrame}
                    />
                </div>

                <FrameRange
                    label="Position"
                    value={selectedFrame.offset}
                    min={0}
                    max={100}
                    step={1}
                    unit="%"
                    onChange={(value) => updateFrame({ offset: value })}
                />

                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
                    <FrameRange
                        label="Opacity"
                        value={selectedFrame.opacity}
                        min={0}
                        max={1}
                        step={0.01}
                        onChange={(value) => updateFrame({ opacity: value })}
                    />
                    <FrameRange
                        label="Translate X"
                        value={selectedFrame.translateX}
                        min={-200}
                        max={200}
                        step={1}
                        unit="px"
                        onChange={(value) =>
                            updateFrame({ translateX: value })
                        }
                    />
                    <FrameRange
                        label="Translate Y"
                        value={selectedFrame.translateY}
                        min={-200}
                        max={200}
                        step={1}
                        unit="px"
                        onChange={(value) =>
                            updateFrame({ translateY: value })
                        }
                    />
                    <FrameRange label="Translate Z" value={selectedFrame.translateZ} min={-300} max={300} step={1} unit="px" onChange={(value) => updateFrame({ translateZ: value })} />
                    <FrameRange
                        label="Scale"
                        value={selectedFrame.scale}
                        min={0}
                        max={3}
                        step={0.01}
                        onChange={(value) => updateFrame({ scale: value })}
                    />
                    <FrameRange
                        label="Rotate"
                        value={selectedFrame.rotate}
                        min={-360}
                        max={360}
                        step={1}
                        unit="°"
                        onChange={(value) => updateFrame({ rotate: value })}
                    />
                    <FrameRange label="Rotate X" value={selectedFrame.rotateX} min={-360} max={360} step={1} unit="°" onChange={(value) => updateFrame({ rotateX: value })} />
                    <FrameRange label="Rotate Y" value={selectedFrame.rotateY} min={-360} max={360} step={1} unit="°" onChange={(value) => updateFrame({ rotateY: value })} />
                    <FrameRange label="Scale X" value={selectedFrame.scaleX} min={0} max={3} step={.01} onChange={(value) => updateFrame({ scaleX: value })} />
                    <FrameRange label="Scale Y" value={selectedFrame.scaleY} min={0} max={3} step={.01} onChange={(value) => updateFrame({ scaleY: value })} />
                    <FrameRange
                        label="Blur"
                        value={selectedFrame.blur}
                        min={0}
                        max={30}
                        step={0.5}
                        unit="px"
                        onChange={(value) => updateFrame({ blur: value })}
                    />
                    <FrameRange
                        label="Skew X"
                        value={selectedFrame.skewX}
                        min={-90}
                        max={90}
                        step={1}
                        unit="°"
                        onChange={(value) => updateFrame({ skewX: value })}
                    />
                    <FrameRange
                        label="Skew Y"
                        value={selectedFrame.skewY}
                        min={-90}
                        max={90}
                        step={1}
                        unit="°"
                        onChange={(value) => updateFrame({ skewY: value })}
                    />
                    <FrameRange
                        label="Border radius"
                        value={selectedFrame.borderRadius}
                        min={0}
                        max={100}
                        step={1}
                        unit="px"
                        onChange={(value) =>
                            updateFrame({ borderRadius: value })
                        }
                    />
                    <FrameRange label="Brightness" value={selectedFrame.brightness} min={0} max={3} step={.05} onChange={(value) => updateFrame({ brightness: value })} />
                    <FrameRange label="Contrast" value={selectedFrame.contrast} min={0} max={3} step={.05} onChange={(value) => updateFrame({ contrast: value })} />
                    <FrameRange label="Saturate" value={selectedFrame.saturate} min={0} max={4} step={.05} onChange={(value) => updateFrame({ saturate: value })} />
                    <FrameRange label="Hue rotate" value={selectedFrame.hueRotate} min={-360} max={360} step={1} unit="°" onChange={(value) => updateFrame({ hueRotate: value })} />
                    <FrameRange label="Grayscale" value={selectedFrame.grayscale} min={0} max={1} step={.01} onChange={(value) => updateFrame({ grayscale: value })} />
                    <FrameRange label="Shadow X" value={selectedFrame.shadowX} min={-80} max={80} step={1} unit="px" onChange={(value) => updateFrame({ shadowX: value })} />
                    <FrameRange label="Shadow Y" value={selectedFrame.shadowY} min={-80} max={80} step={1} unit="px" onChange={(value) => updateFrame({ shadowY: value })} />
                    <FrameRange label="Shadow blur" value={selectedFrame.shadowBlur} min={0} max={100} step={1} unit="px" onChange={(value) => updateFrame({ shadowBlur: value })} />
                    <FrameRange label="Shadow spread" value={selectedFrame.shadowSpread} min={-50} max={50} step={1} unit="px" onChange={(value) => updateFrame({ shadowSpread: value })} />
                </div>

                <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                    <label className="row-center-1 rounded-[8px] bg-fg/5 p-2"><span className="text-[10px]">Frame color</span><input type="color" value={selectedFrame.backgroundColor} onChange={(event) => updateFrame({ backgroundColor: event.target.value })} className="ml-auto size-7 bg-transparent" /></label>
                    <label className="row-center-1 rounded-[8px] bg-fg/5 p-2"><span className="text-[10px]">Shadow color</span><input type="color" value={selectedFrame.shadowColor} onChange={(event) => updateFrame({ shadowColor: event.target.value })} className="ml-auto size-7 bg-transparent" /></label>
                </div>

            </div>
        </div>
    );
};
