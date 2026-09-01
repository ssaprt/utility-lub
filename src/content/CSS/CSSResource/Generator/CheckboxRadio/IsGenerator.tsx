"use client";

import { useMemo, type Dispatch, type SetStateAction } from "react";
import { GeneratorWorkspace } from "../_shared/GeneratorUI";
import { VisualPresetGallery } from "../_shared/VisualPresetGallery";
import { ConfigCheckboxRadio } from "./ConfigCheckboxRadio";
import {
    checkboxRadioPresetConfigs,
    choicePresets,
    type CheckboxRadioConfig,
} from "./checkbox-radio.type";
import {
    checkboxRadioConfigToCss,
    checkboxRadioConfigToHtml,
} from "./checkbox-radio.utils";

const ChoicePresetPreview = ({ config }: { config: CheckboxRadioConfig }) => {
    const controlRadius =
        config.type === "radio" ? "50%" : `${config.radius}px`;

    return (
        <span
            className="inline-flex items-center"
            style={{
                gap: `${Math.min(config.gap, 10)}px`,
                color: config.fontColor,
            }}
        >
            <span
                className="relative grid shrink-0 place-items-center"
                style={{
                    width: `${Math.min(config.size, 24)}px`,
                    height: `${Math.min(config.size, 24)}px`,
                    border: `${config.borderWidth}px solid ${config.checkedBorder}`,
                    borderRadius: controlRadius,
                    background: config.checkedBackground,
                }}
            >
                {config.type === "radio" ? (
                    <span
                        className="rounded-full"
                        style={{
                            width: `${Math.min(config.markSize, 11)}px`,
                            height: `${Math.min(config.markSize, 11)}px`,
                            background: config.markColor,
                        }}
                    />
                ) : (
                    <span
                        className="block rotate-45 border-r-2 border-b-2"
                        style={{
                            width: "6px",
                            height: "11px",
                            borderColor: config.markColor,
                            background:
                                config.checkmarkStyle === "fill"
                                    ? config.markColor
                                    : "transparent",
                        }}
                    />
                )}
            </span>
            <span style={{ fontSize: `${Math.min(config.fontSize, 13)}px` }}>
                Selected option
            </span>
        </span>
    );
};

export const IsGenerator = ({
    config,
    setConfig,
}: {
    config: CheckboxRadioConfig;
    setConfig: Dispatch<SetStateAction<CheckboxRadioConfig>>;
}) => {
    const css = useMemo(() => checkboxRadioConfigToCss(config), [config]);
    const html = useMemo(() => checkboxRadioConfigToHtml(config), [config]);

    return (
        <div className="col-stretch-4 w-full">
            <GeneratorWorkspace
                css={css}
                html={html}
                previewClassName="rounded-[14px]"
                floatingPreviewClassName="rounded-[14px]"
                floatingPreview={
                    <div className="flex size-full items-center justify-center overflow-hidden bg-[#111116]">
                        <div className="scale-75">
                            <ChoicePresetPreview config={config} />
                        </div>
                    </div>
                }
                controls={
                    <ConfigCheckboxRadio
                        config={config}
                        setConfig={setConfig}
                    />
                }
                preview={
                    <div className="flex w-full items-center justify-center rounded-[9px] bg-[#111116] px-8 py-14">
                        <style>{css}</style>
                        <div className="choice-list">
                            {["Interface", "Motion", "Accessibility"].map(
                                (label, index) => (
                                    <label className="choice-label" key={label}>
                                        <input
                                            className="choice-input"
                                            type={config.type}
                                            name="generator-choice"
                                            defaultChecked={index === 0}
                                            disabled={index === 2}
                                        />
                                        <span
                                            className="choice-control"
                                            aria-hidden="true"
                                        />
                                        <span>{label}</span>
                                    </label>
                                ),
                            )}
                        </div>
                    </div>
                }
            />

            <VisualPresetGallery
                values={choicePresets}
                configs={checkboxRadioPresetConfigs}
                currentConfig={config}
                renderPreview={(preset) => (
                    <ChoicePresetPreview config={preset} />
                )}
                onSelect={(preset) => setConfig({ ...preset })}
            />
        </div>
    );
};
