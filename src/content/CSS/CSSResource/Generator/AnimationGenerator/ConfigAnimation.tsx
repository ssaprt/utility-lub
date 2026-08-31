"use client";

import { GeneralButton } from "@/components/button/GeneralButton/GeneralButton";
import { NumberInput } from "@/components/input/Number/Number";
import { Range } from "@/components/input/range/Range";
import {
    useMemo,
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
import { Categories } from "./Categories";
import type { AnimationPreset } from "./presetsGenerator";

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

    const reset = () => {
        const next = cloneAnimationConfig(defaultAnimationConfig);
        setConfig(next);
        setSelectedId(next.frames[0]?.id ?? "start");
    };

    const applyPreset = (preset: AnimationPreset) => {
        const next = cloneAnimationConfig(preset.config);
        const borderRadius = config.shape === "circle" ? 999 : 12;

        next.previewColor = config.previewColor;
        next.shape = config.shape;
        next.frames = next.frames.map((frame) => ({
            ...frame,
            borderRadius,
        }));

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
                            handleAction={() =>
                                updateConfig("timingFunction", timing)
                            }
                        />
                    ))}
                </div>
                <input
                    value={config.timingFunction}
                    onChange={(event) =>
                        updateConfig("timingFunction", event.target.value)
                    }
                    className={inputClass}
                    aria-label="Custom timing function"
                />
            </div>

            <Categories onSelectPreset={applyPreset} />

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
                </div>

            </div>
        </div>
    );
};
