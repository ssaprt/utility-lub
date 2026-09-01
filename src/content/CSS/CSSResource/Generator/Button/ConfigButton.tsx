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
    TextControl,
} from "../_shared/GeneratorUI";
import {
    buttonBackgroundTypes,
    buttonHoverEffects,
    buttonWeights,
    createDefaultButtonConfig,
    type ButtonConfig,
} from "./button.type";

export const ConfigButton = ({
    config,
    setConfig,
}: {
    config: ButtonConfig;
    setConfig: Dispatch<SetStateAction<ButtonConfig>>;
}) => {
    const update = <K extends keyof ButtonConfig>(
        key: K,
        value: ButtonConfig[K],
    ) => setConfig((current) => ({ ...current, [key]: value }));

    return (
        <ConfigPanel
            title="Button"
            action={
                <div className="rounded-[6px] bg-fg/5 p-0.5">
                    <GeneralButton
                        variant="ghost"
                        icon={<IconRestore className="size-4" />}
                        textButton="Reset"
                        handleAction={() => setConfig(createDefaultButtonConfig())}
                    />
                </div>
            }
        >
            <TextControl
                title="Label"
                value={config.text}
                onChange={(value) => update("text", value)}
            />

            <SegmentedControl
                title="Background"
                value={config.backgroundType}
                values={buttonBackgroundTypes}
                onChange={(value) => update("backgroundType", value)}
            />

            <ControlGrid>
                {config.backgroundType === "solid" ? (
                    <ColorControl
                        title="Background"
                        value={config.backgroundColor}
                        onChange={(value) => update("backgroundColor", value)}
                    />
                ) : (
                    <>
                        <ColorControl
                            title="Gradient start"
                            value={config.gradientStart}
                            onChange={(value) => update("gradientStart", value)}
                        />
                        <ColorControl
                            title="Gradient end"
                            value={config.gradientEnd}
                            onChange={(value) => update("gradientEnd", value)}
                        />
                    </>
                )}
                <ColorControl
                    title="Text"
                    value={config.textColor}
                    onChange={(value) => update("textColor", value)}
                />
                <ColorControl
                    title="Hover"
                    value={config.hoverColor}
                    onChange={(value) => update("hoverColor", value)}
                />
            </ControlGrid>

            {config.backgroundType === "gradient" && (
                <RangeControl
                    title="Gradient angle"
                    value={config.gradientAngle}
                    min={0}
                    max={360}
                    unit="°"
                    onChange={(value) => update("gradientAngle", value)}
                />
            )}

            <ControlGrid>
                <RangeControl
                    title="Font size"
                    value={config.fontSize}
                    min={10}
                    max={36}
                    unit="px"
                    onChange={(value) => update("fontSize", value)}
                />
                <SegmentedControl
                    title="Weight"
                    value={String(config.fontWeight)}
                    values={buttonWeights.map(String)}
                    onChange={(value) => update("fontWeight", Number(value))}
                />
                <RangeControl
                    title="Horizontal padding"
                    value={config.paddingX}
                    min={4}
                    max={64}
                    unit="px"
                    onChange={(value) => update("paddingX", value)}
                />
                <RangeControl
                    title="Vertical padding"
                    value={config.paddingY}
                    min={4}
                    max={32}
                    unit="px"
                    onChange={(value) => update("paddingY", value)}
                />
                <RangeControl
                    title="Radius"
                    value={config.radius}
                    min={0}
                    max={40}
                    unit="px"
                    onChange={(value) => update("radius", value)}
                />
                <RangeControl
                    title="Border"
                    value={config.borderWidth}
                    min={0}
                    max={8}
                    unit="px"
                    onChange={(value) => update("borderWidth", value)}
                />
                <RangeControl
                    title="Shadow blur"
                    value={config.shadowBlur}
                    min={0}
                    max={60}
                    unit="px"
                    onChange={(value) => update("shadowBlur", value)}
                />
                <RangeControl
                    title="Shadow Y"
                    value={config.shadowY}
                    min={-20}
                    max={30}
                    unit="px"
                    onChange={(value) => update("shadowY", value)}
                />
            </ControlGrid>

            <SegmentedControl
                title="Hover motion"
                value={config.hoverEffect}
                values={buttonHoverEffects}
                onChange={(value) => update("hoverEffect", value)}
            />

        </ConfigPanel>
    );
};
