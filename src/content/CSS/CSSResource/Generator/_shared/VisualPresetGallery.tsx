"use client";

import { TitleWithItemsBlock } from "@/components/blocks/TitleWithItemsBlock/TitleWithItemsBlock";
import { GeneralButton } from "@/components/button/GeneralButton/GeneralButton";
import { IconMenuOrder, IconPlayerPlay } from "@tabler/icons-react";
import { useState, type ReactNode } from "react";

export const presetLabel = (value: string) => {
    return value
        .split("-")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ");
};

export const samePreset = <Config,>(current: Config, preset: Config) => {
    return JSON.stringify(current) === JSON.stringify(preset);
};

export function VisualPresetGallery<Name extends string, Config>({
    values,
    configs,
    currentConfig,
    renderPreview,
    onSelect,
    isActive,
}: {
    values: readonly Name[];
    configs: Record<Name, Config>;
    currentConfig: Config;
    renderPreview: (config: Config, name: Name) => ReactNode;
    onSelect: (config: Config, name: Name) => void;
    isActive?: (current: Config, preset: Config, name: Name) => boolean;
}) {
    const [expanded, setExpanded] = useState(false);
    const visibleValues = expanded ? values : values.slice(0, 10);

    return (
        <TitleWithItemsBlock title="Just click on the desired preset">
            <div className="col-stretch-2 mt-4 w-full">
                <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-2">
                    {visibleValues.map((name) => {
                        const preset = configs[name];
                        const active = isActive
                            ? isActive(currentConfig, preset, name)
                            : samePreset(currentConfig, preset);

                        return (
                            <div
                                key={name}
                                className={`
                                    col-stretch-2 min-w-0 rounded-md border p-2
                                    shadow-md shadow-black/10 transition-all
                                    duration-200 hover:-translate-y-[2px]
                                    hover:bg-fg/10 hover:shadow-lg
                                    hover:shadow-black/30
                                    ${
                                        active
                                            ? "border-fg/50 bg-fg/5 shadow-lg shadow-black/20"
                                            : "border-fg/10"
                                    }
                                `}
                            >
                                <div className="row-center-2 min-w-0">
                                    <span className="truncate text-[11px] font-medium text-fg">
                                        {presetLabel(name)}
                                    </span>

                                    {active && (
                                        <span className="ml-auto shrink-0 rounded-[3px] bg-fg px-1 py-0.5 text-[8px] text-app">
                                            Selected
                                        </span>
                                    )}
                                </div>

                                <button
                                    type="button"
                                    aria-pressed={active}
                                    aria-label={`Apply ${presetLabel(name)} preset`}
                                    onClick={() => onSelect(preset, name)}
                                    className="relative flex h-[112px] w-full cursor-pointer items-center justify-center overflow-hidden rounded-[4px] border border-fg/10 bg-fg/5 p-2 outline-none transition-all hover:border-fg/30 focus-visible:ring-2 focus-visible:ring-fg/40"
                                >
                                    {renderPreview(preset, name)}
                                </button>

                                <GeneralButton
                                    variant="dashed"
                                    active={active}
                                    icon={<IconPlayerPlay className="size-4" />}
                                    textButton={active ? "Selected" : "Select"}
                                    handleAction={() => onSelect(preset, name)}
                                />
                            </div>
                        );
                    })}
                </div>

                {values.length > 10 && (
                    <div className="w-fit rounded-[6px] bg-fg/5 p-0.5">
                        <GeneralButton
                            variant="minimal"
                            icon={<IconMenuOrder className="size-4" />}
                            textButton={expanded ? "Show less" : "Show more"}
                            handleAction={() =>
                                setExpanded((current) => !current)
                            }
                        />
                    </div>
                )}
            </div>
        </TitleWithItemsBlock>
    );
}
