"use client";

import { GeneralButton } from "@/components/button/GeneralButton/GeneralButton";
import { IconRestore } from "@tabler/icons-react";
import type { Dispatch, SetStateAction } from "react";
import {
    ColorControl,
    ConfigPanel,
    ControlGrid,
    RangeControl,
    SegmentedControl,
} from "../_shared/GeneratorUI";
import {
    checkmarkStyles,
    choiceTypes,
    createDefaultCheckboxRadioConfig,
    type CheckboxRadioConfig,
} from "./checkbox-radio.type";

export const ConfigCheckboxRadio = ({
    config,
    setConfig,
}: {
    config: CheckboxRadioConfig;
    setConfig: Dispatch<SetStateAction<CheckboxRadioConfig>>;
}) => {
    const update = <K extends keyof CheckboxRadioConfig>(
        key: K,
        value: CheckboxRadioConfig[K],
    ) => setConfig((current) => ({ ...current, [key]: value }));

    return (
        <ConfigPanel
            title="Choice control"
            action={
                <div className="rounded-[6px] bg-fg/5 p-0.5">
                    <GeneralButton
                        variant="ghost"
                        icon={<IconRestore className="size-4" />}
                        textButton="Reset"
                        handleAction={() =>
                            setConfig(createDefaultCheckboxRadioConfig())
                        }
                    />
                </div>
            }
        >
            <SegmentedControl
                title="Element"
                value={config.type}
                values={choiceTypes}
                onChange={(value) => update("type", value)}
            />

            {config.type === "checkbox" && (
                <SegmentedControl
                    title="Checkmark"
                    value={config.checkmarkStyle}
                    values={checkmarkStyles}
                    onChange={(value) => update("checkmarkStyle", value)}
                />
            )}

            <ControlGrid>
                <RangeControl
                    title="Control size"
                    value={config.size}
                    min={14}
                    max={42}
                    unit="px"
                    onChange={(value) => update("size", value)}
                />
                <RangeControl
                    title="Mark size"
                    value={config.markSize}
                    min={4}
                    max={24}
                    unit="px"
                    onChange={(value) => update("markSize", value)}
                />
                <RangeControl
                    title="Border width"
                    value={config.borderWidth}
                    min={1}
                    max={6}
                    unit="px"
                    onChange={(value) => update("borderWidth", value)}
                />
                <RangeControl
                    title="Radius"
                    value={config.radius}
                    min={0}
                    max={20}
                    unit="px"
                    onChange={(value) => update("radius", value)}
                />
                <RangeControl
                    title="Label gap"
                    value={config.gap}
                    min={2}
                    max={30}
                    unit="px"
                    onChange={(value) => update("gap", value)}
                />
                <RangeControl
                    title="Row gap"
                    value={config.rowGap}
                    min={2}
                    max={30}
                    unit="px"
                    onChange={(value) => update("rowGap", value)}
                />
            </ControlGrid>

            <ControlGrid>
                <ColorControl
                    title="Unchecked fill"
                    value={config.uncheckedBackground}
                    onChange={(value) => update("uncheckedBackground", value)}
                />
                <ColorControl
                    title="Unchecked border"
                    value={config.uncheckedBorder}
                    onChange={(value) => update("uncheckedBorder", value)}
                />
                <ColorControl
                    title="Checked fill"
                    value={config.checkedBackground}
                    onChange={(value) => update("checkedBackground", value)}
                />
                <ColorControl
                    title="Checked border"
                    value={config.checkedBorder}
                    onChange={(value) => update("checkedBorder", value)}
                />
                <ColorControl
                    title="Mark"
                    value={config.markColor}
                    onChange={(value) => update("markColor", value)}
                />
                <ColorControl
                    title="Label"
                    value={config.fontColor}
                    onChange={(value) => update("fontColor", value)}
                />
            </ControlGrid>

        </ConfigPanel>
    );
};
