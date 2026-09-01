"use client";

import { GeneralButton } from "@/components/button/GeneralButton/GeneralButton";
import { Range } from "@/components/input/range/Range";
import { FloatingPreview } from "../_shared/GeneratorUI";
import {
    useMemo,
    useState,
    type CSSProperties,
    type Dispatch,
    type SetStateAction,
} from "react";
import {
    animationShapes,
    type AnimationConfig,
} from "./animation.type";
import {
    animationConfigToCss,
    animationFrameAtProgress,
    animationFrameToStyle,
    animationKeyframesToCss,
    cloneAnimationConfig,
    sanitizeAnimationName,
} from "./animation.utils";
import { ConfigAnimation } from "./ConfigAnimation";
import { Categories } from "./Categories";
import type { AnimationPreset } from "./presetsGenerator";

export interface IsGeneratorProps {
    config: AnimationConfig;
    setConfig: Dispatch<SetStateAction<AnimationConfig>>;
}

export const IsGenerator = ({ config, setConfig }: IsGeneratorProps) => {
    const [previewKey, setPreviewKey] = useState(0);
    const [playback, setPlayback] = useState<
        "playing" | "paused" | "stopped"
    >("playing");
    const [scrubber, setScrubber] = useState(0);

    const css = useMemo(() => animationConfigToCss(config), [config]);
    const keyframes = useMemo(() => animationKeyframesToCss(config), [config]);
    const animationName = sanitizeAnimationName(config.name);
    const timingFunction = config.timingMode === "steps"
        ? `steps(${config.stepCount}, ${config.stepJump})`
        : config.timingMode === "cubic-bezier"
          ? `cubic-bezier(${config.bezierX1}, ${config.bezierY1}, ${config.bezierX2}, ${config.bezierY2})`
          : config.timingFunction;

    const scrubbedFrame = useMemo(
        () => animationFrameAtProgress(config, scrubber),
        [config, scrubber],
    );

    const previewStyle = useMemo<CSSProperties>(
        () => {
            const common: CSSProperties = {
                transformOrigin: `${config.transformOriginX}% ${config.transformOriginY}%`,
                transformStyle: "preserve-3d",
                overflow: "hidden",
            };

            if (playback !== "playing") {
                return {
                    ...common,
                    ...animationFrameToStyle(scrubbedFrame),
                    animationName: "none",
                };
            }

            return {
                ...common,
                backgroundColor: config.previewColor,
                animationName,
                animationDuration: `${config.duration}s`,
                animationDelay: `${config.delay}s`,
                animationIterationCount: config.iterationCount,
                animationDirection: config.direction,
                animationFillMode: config.fillMode,
                animationTimingFunction: timingFunction,
                animationPlayState: "running",
            };
        },
        [animationName, config, playback, scrubbedFrame, timingFunction],
    );

    const selectShape = (shape: AnimationConfig["shape"]) => {
        const borderRadius = shape === "circle" ? 999 : 12;

        setConfig((current) => ({
            ...current,
            shape,
            frames: current.frames.map((frame) => ({
                ...frame,
                borderRadius,
            })),
        }));
    };

    const replay = () => {
        setScrubber(0);
        setPlayback("playing");
        setPreviewKey((current) => current + 1);
    };

    const stop = () => {
        setScrubber(0);
        setPlayback("stopped");
        setPreviewKey((current) => current + 1);
    };

    const renderShape = () => {
        const common = "grid place-items-center";

        switch (config.shape) {
            case "circle":
                return <div className={`${common} size-24 rounded-full`} />;
            case "text":
                return (
                    <div className={`${common} min-w-36 px-5 py-3 text-center text-sm font-bold text-white`}>
                        Utility Lab
                    </div>
                );
            case "card":
                return (
                    <div className={`${common} h-28 w-44 p-3 text-xs text-white`}>
                        Animated card
                    </div>
                );
            default:
                return <div className={`${common} size-24`} />;
        }
    };

    return (
        <div className="col-stretch-4 w-full">
        <div className="relative col-stretch-1 w-full lg:row-stretch-4 lg:items-start">
            <style>{keyframes}</style>

            <div className="col-stretch-2 h-fit w-full rounded-xl bg-fg/5 p-2 shadow-inner shadow-black/10 lg:sticky lg:top-2 lg:w-2/5 lg:self-start">
                <div className="row-center-1 justify-between px-1">
                    <span className="text-[13px] font-medium! text-fg">
                        Preview
                    </span>
                    <span className="text-[9px] text-fg/50">
                        {playback === "playing"
                            ? "Running"
                            : playback === "stopped"
                              ? "Stopped"
                              : `${scrubber}%`}
                    </span>
                </div>

                <div className="flex h-[280px] items-center justify-center overflow-hidden rounded-[8px] bg-fg/5 p-8" style={{ perspective: config.perspective }}>
                    <div key={previewKey} style={previewStyle}>
                        {renderShape()}
                    </div>
                </div>

                <div className="row-center-1 flex-wrap rounded-[8px] bg-fg/5 p-2">
                    {animationShapes.map((shape) => (
                        <GeneralButton
                            key={shape}
                            textButton={shape}
                            variant="ghost"
                            active={config.shape === shape}
                            handleAction={() => selectShape(shape)}
                        />
                    ))}
                    <input
                        type="color"
                        aria-label="Preview color"
                        value={config.previewColor}
                        onChange={(event) =>
                            setConfig((current) => ({
                                ...current,
                                previewColor: event.target.value,
                            }))
                        }
                        className="ml-auto size-7 cursor-pointer border-0 bg-transparent p-0"
                    />
                </div>

                <div className="row-center-1 rounded-[8px] bg-fg/5 p-2">
                    <GeneralButton
                        textButton="Play"
                        variant="ghost"
                        active={playback === "playing"}
                        handleAction={() => {
                            setPlayback("playing");
                            setPreviewKey((current) => current + 1);
                        }}
                    />
                    <GeneralButton
                        textButton="Pause"
                        variant="ghost"
                        active={playback === "paused"}
                        handleAction={() => setPlayback("paused")}
                    />
                    <GeneralButton
                        textButton="Stop"
                        variant="ghost"
                        active={playback === "stopped"}
                        handleAction={stop}
                    />
                    <GeneralButton
                        textButton="Replay"
                        variant="ghost"
                        handleAction={replay}
                    />
                    <div className="min-w-0 flex-1">
                        <Range
                            value={scrubber}
                            min={0}
                            max={100}
                            step={1}
                            onChange={(value) => {
                                setPlayback("paused");
                                setScrubber(value);
                            }}
                        />
                    </div>
                </div>
            </div>

            <FloatingPreview className="rounded-xl">
                <div className="flex size-full items-center justify-center bg-fg/5" style={{ perspective: config.perspective }}>
                    <div className="scale-[0.52]">
                        <div key={`floating-${previewKey}`} style={previewStyle}>
                            {renderShape()}
                        </div>
                    </div>
                </div>
            </FloatingPreview>

            <div className="col-center-1 min-w-0 flex-1">
                <ConfigAnimation config={config} setConfig={setConfig} />

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
        <Categories onSelectPreset={(preset: AnimationPreset) => setConfig(cloneAnimationConfig({ ...preset.config, previewColor: config.previewColor, shape: config.shape }))} />
        </div>
    );
};
