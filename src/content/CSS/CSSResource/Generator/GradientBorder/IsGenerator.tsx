"use client";

import { useMemo, type Dispatch, type SetStateAction } from "react";
import { GeneratorWorkspace } from "../_shared/GeneratorUI";
import { VisualPresetGallery } from "../_shared/VisualPresetGallery";
import { ConfigGradientBorder } from "./ConfigGradientBorder";
import {
    gradientBorderPresetConfigs,
    gradientBorderPresets,
    type GradientBorderConfig,
} from "./gradient-border.type";
import {
    gradientBorderConfigToCss,
    gradientBorderConfigToHtml,
    gradientBorderValue,
} from "./gradient-border.utils";

const GradientBorderPresetPreview = ({
    config,
}: {
    config: GradientBorderConfig;
}) => (
    <span
        className="grid h-[72px] w-[88%] place-items-center text-[10px] font-medium"
        style={{
            boxSizing: "border-box",
            border: `${Math.min(config.borderWidth, 6)}px solid transparent`,
            borderRadius: `${Math.min(config.radius, 24)}px`,
            background: `linear-gradient(${config.backgroundColor}, ${config.backgroundColor}) padding-box, ${gradientBorderValue(config)} border-box`,
            color: config.textColor,
            boxShadow: config.glow
                ? `0 0 ${Math.min(config.glowBlur, 24)}px color-mix(in srgb, ${config.colorB} 40%, transparent)`
                : "none",
        }}
    >
        Border
    </span>
);

export const IsGenerator = ({
    config,
    setConfig,
}: {
    config: GradientBorderConfig;
    setConfig: Dispatch<SetStateAction<GradientBorderConfig>>;
}) => {
    const css = useMemo(() => gradientBorderConfigToCss(config), [config]);
    const html = useMemo(() => gradientBorderConfigToHtml(), []);

    return (
        <div className="col-stretch-4 w-full">
            <GeneratorWorkspace
                css={css}
                html={html}
                previewClassName="rounded-[24px]"
                floatingPreviewClassName="rounded-[24px]"
                floatingPreview={
                    <div className="flex size-full items-center justify-center bg-black/30 p-2">
                        <GradientBorderPresetPreview config={config} />
                    </div>
                }
                controls={
                    <ConfigGradientBorder
                        config={config}
                        setConfig={setConfig}
                    />
                }
                preview={
                    <div className="flex w-full items-center justify-center rounded-[18px] bg-black/30 px-8 py-12">
                        <style>{css}</style>
                        <div className="gradient-border text-center text-sm font-medium">
                            Gradient
                            <br />
                            border
                        </div>
                    </div>
                }
            />

            <VisualPresetGallery
                values={gradientBorderPresets}
                configs={gradientBorderPresetConfigs}
                currentConfig={config}
                renderPreview={(preset) => (
                    <GradientBorderPresetPreview config={preset} />
                )}
                onSelect={(preset) => setConfig({ ...preset })}
            />
        </div>
    );
};
