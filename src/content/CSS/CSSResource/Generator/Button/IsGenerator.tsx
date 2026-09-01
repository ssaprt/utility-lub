"use client";

import { useMemo, type Dispatch, type SetStateAction } from "react";
import { GeneratorWorkspace } from "../_shared/GeneratorUI";
import { VisualPresetGallery } from "../_shared/VisualPresetGallery";
import { ConfigButton } from "./ConfigButton";
import {
    buttonPresetConfigs,
    buttonPresets,
    type ButtonConfig,
} from "./button.type";
import { buttonConfigToCss, buttonConfigToHtml } from "./button.utils";

const ButtonPresetPreview = ({ config }: { config: ButtonConfig }) => {
    const background =
        config.backgroundType === "gradient"
            ? `linear-gradient(${config.gradientAngle}deg, ${config.gradientStart}, ${config.gradientEnd})`
            : config.backgroundColor;

    return (
        <span
            className="inline-flex max-w-full items-center justify-center truncate"
            style={{
                padding: `${Math.max(5, config.paddingY * 0.55)}px ${Math.max(10, config.paddingX * 0.55)}px`,
                border: `${config.borderWidth}px solid ${config.borderColor}`,
                borderRadius: `${config.radius}px`,
                background,
                color: config.textColor,
                boxShadow: `${config.shadowX * 0.5}px ${config.shadowY * 0.5}px ${Math.min(config.shadowBlur, 18)}px ${config.shadowSpread * 0.25}px ${config.shadowColor}`,
                fontSize: `${Math.min(config.fontSize, 13)}px`,
                fontWeight: config.fontWeight,
                letterSpacing: `${config.letterSpacing}px`,
            }}
        >
            {config.text}
        </span>
    );
};

export const IsGenerator = ({
    config,
    setConfig,
}: {
    config: ButtonConfig;
    setConfig: Dispatch<SetStateAction<ButtonConfig>>;
}) => {
    const css = useMemo(() => buttonConfigToCss(config), [config]);
    const html = useMemo(() => buttonConfigToHtml(config), [config]);

    return (
        <div className="col-stretch-4 w-full">
            <GeneratorWorkspace
                css={css}
                html={html}
                previewClassName="rounded-[18px]"
                floatingPreviewClassName="rounded-[18px]"
                floatingPreview={
                    <div className="flex size-full items-center justify-center bg-fg/5 p-2">
                        <ButtonPresetPreview config={config} />
                    </div>
                }
                controls={
                    <ConfigButton config={config} setConfig={setConfig} />
                }
                preview={
                    <div className="flex w-full items-center justify-center rounded-[12px] bg-fg/5 px-6 py-16">
                        <style>{css}</style>
                        <button className="generated-button" type="button">
                            {config.text}
                        </button>
                    </div>
                }
            />

            <VisualPresetGallery
                values={buttonPresets}
                configs={buttonPresetConfigs}
                currentConfig={config}
                renderPreview={(preset) => (
                    <ButtonPresetPreview config={preset} />
                )}
                onSelect={(preset) => setConfig({ ...preset })}
            />
        </div>
    );
};
