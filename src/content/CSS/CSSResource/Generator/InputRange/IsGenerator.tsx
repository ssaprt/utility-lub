"use client";

import { useMemo, type Dispatch, type SetStateAction } from "react";
import { GeneratorWorkspace } from "../_shared/GeneratorUI";
import { VisualPresetGallery } from "../_shared/VisualPresetGallery";
import { ConfigInputRange } from "./ConfigInputRange";
import {
    inputRangePresetConfigs,
    inputRangePresets,
    type InputRangeConfig,
} from "./input-range.type";
import {
    inputRangeConfigToCss,
    inputRangeConfigToHtml,
} from "./input-range.utils";

const RangePresetPreview = ({ config }: { config: InputRangeConfig }) => {
    const thumbRadius =
        config.thumbShape === "circle" ? "50%" : `${config.thumbRadius}px`;

    return (
        <span
            className="relative block w-[88%]"
            style={{
                height: `${Math.max(config.trackHeight, 4)}px`,
                borderRadius: `${config.trackRadius}px`,
                background: config.fill
                    ? `linear-gradient(to right, ${config.fillColor} 0 ${config.value}%, ${config.trackColor} ${config.value}% 100%)`
                    : config.trackColor,
            }}
        >
            <span
                className="absolute top-1/2 block"
                style={{
                    left: `${config.value}%`,
                    width: `${Math.min(config.thumbSize, 24)}px`,
                    height: `${Math.min(config.thumbSize, 24)}px`,
                    border: `${config.thumbBorderWidth}px solid ${config.thumbBorderColor}`,
                    borderRadius: thumbRadius,
                    background: config.thumbColor,
                    boxShadow: `0 2px ${Math.min(config.thumbShadowBlur, 12)}px rgba(0,0,0,.35)`,
                    transform:
                        config.thumbShape === "diamond"
                            ? "translate(-50%, -50%) rotate(45deg)"
                            : "translate(-50%, -50%)",
                }}
            />
        </span>
    );
};

export const IsGenerator = ({
    config,
    setConfig,
}: {
    config: InputRangeConfig;
    setConfig: Dispatch<SetStateAction<InputRangeConfig>>;
}) => {
    const css = useMemo(() => inputRangeConfigToCss(config), [config]);
    const html = useMemo(() => inputRangeConfigToHtml(config), [config]);

    return (
        <div className="col-stretch-4 w-full">
            <GeneratorWorkspace
                css={css}
                html={html}
                previewClassName="rounded-[30px]"
                floatingPreviewClassName="rounded-[30px]"
                floatingPreview={
                    <div className="flex size-full items-center justify-center p-2" style={{ background: config.surfaceColor }}>
                        <RangePresetPreview config={config} />
                    </div>
                }
                controls={
                    <ConfigInputRange config={config} setConfig={setConfig} />
                }
                preview={
                    <div
                        className="flex w-full flex-col items-center justify-center gap-5 rounded-[24px] px-8 py-14"
                        style={{ background: config.surfaceColor }}
                    >
                        <style>{css}</style>
                        <input
                            className="styled-range"
                            type="range"
                            min={0}
                            max={100}
                            value={config.value}
                            aria-label="Range preview"
                            onChange={(event) =>
                                setConfig((current) => ({
                                    ...current,
                                    value: Number(event.target.value),
                                }))
                            }
                        />
                        <span className="text-xs text-white/60">
                            {config.value}%
                        </span>
                    </div>
                }
            />

            <VisualPresetGallery
                values={inputRangePresets}
                configs={inputRangePresetConfigs}
                currentConfig={config}
                renderPreview={(preset) => (
                    <span
                        className="flex size-full items-center justify-center rounded-[3px]"
                        style={{ background: preset.surfaceColor }}
                    >
                        <RangePresetPreview config={preset} />
                    </span>
                )}
                onSelect={(preset) => setConfig({ ...preset })}
            />
        </div>
    );
};
