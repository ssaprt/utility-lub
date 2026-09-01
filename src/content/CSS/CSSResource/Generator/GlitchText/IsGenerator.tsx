"use client";

import { useMemo, type Dispatch, type SetStateAction } from "react";
import { GeneratorWorkspace } from "../_shared/GeneratorUI";
import { VisualPresetGallery } from "../_shared/VisualPresetGallery";
import { ConfigGlitchText } from "./ConfigGlitchText";
import {
    glitchPresetConfigs,
    glitchPresets,
    type GlitchTextConfig,
} from "./glitch-text.type";
import {
    glitchTextConfigToCss,
    glitchTextConfigToHtml,
} from "./glitch-text.utils";

const presetFrames = (config: GlitchTextConfig, name: string) => {
    const distance = Math.min(config.intensity, 6);
    if (config.motion === "stutter") return `@keyframes glitch-preview-${name} { 0%,12%,18%,25%,100%{transform:translate(0);opacity:.15} 13%{transform:translate(${distance}px,-2px);opacity:1} 20%{transform:translate(-${distance}px,1px);opacity:.55} }`;
    if (config.motion === "drift") return `@keyframes glitch-preview-${name} { 0%,100%{transform:translate(-${distance}px,-1px);opacity:.2} 50%{transform:translate(${distance}px,2px) skew(${config.skew}deg);opacity:.85} }`;
    if (config.motion === "scanner") return `@keyframes glitch-preview-${name} { 0%{clip-path:inset(0 0 88% 0);transform:translateX(${distance}px)} 50%{clip-path:inset(46% 0 42% 0);transform:translateX(-${distance}px)} 100%{clip-path:inset(88% 0 0 0);transform:translateX(${distance}px)} }`;
    return `@keyframes glitch-preview-${name} { 0%,70%,100%{transform:translate(0);opacity:0} 74%{transform:translate(${distance}px,-2px);opacity:1} 82%{transform:translate(-${distance}px,2px);opacity:.55} 88%{transform:translate(${distance / 2}px,0);opacity:.9} }`;
};

const GlitchPresetPreview = ({ config, name }: { config: GlitchTextConfig; name: string }) => (
    <span
        className="relative flex size-full items-center justify-center overflow-hidden rounded-[2px]"
        style={{ background: config.backgroundColor }}
    >
        <style>{presetFrames(config, name)}</style>
        <span
            className="absolute font-black tracking-wider"
            style={{
                color: config.accentA,
                fontSize: "18px",
                animation: `glitch-preview-${name} ${config.duration}s ${config.motion === "drift" ? "ease-in-out" : "steps(1,end)"} infinite`,
                clipPath: config.effect === "fragment" ? "polygon(0 0,100% 0,100% 48%,55% 48%,50% 100%,0 100%)" : "inset(0 0 50% 0)",
                mixBlendMode: config.effect === "chromatic" ? "screen" : "normal",
            }}
        >
            GLITCH
        </span>
        <span
            className="absolute font-black tracking-wider"
            style={{
                color: config.accentB,
                fontSize: "18px",
                animation: `glitch-preview-${name} ${config.duration * 0.87}s ${config.motion === "drift" ? "ease-in-out" : "steps(1,end)"} infinite reverse`,
                clipPath: "inset(50% 0 0 0)",
                mixBlendMode: config.effect === "chromatic" ? "screen" : "normal",
            }}
        >
            GLITCH
        </span>
        <span
            className="relative font-black tracking-wider"
            style={{ color: config.textColor, fontSize: "18px" }}
        >
            GLITCH
        </span>
    </span>
);

export const IsGenerator = ({
    config,
    setConfig,
}: {
    config: GlitchTextConfig;
    setConfig: Dispatch<SetStateAction<GlitchTextConfig>>;
}) => {
    const css = useMemo(() => glitchTextConfigToCss(config), [config]);
    const html = useMemo(() => glitchTextConfigToHtml(config), [config]);

    return (
        <div className="col-stretch-4 w-full">
            <GeneratorWorkspace
                css={css}
                html={html}
                previewClassName="rounded-[3px]"
                floatingPreviewClassName="rounded-[3px]"
                floatingPreview={
                    <GlitchPresetPreview config={config} name="current" />
                }
                controls={
                    <ConfigGlitchText config={config} setConfig={setConfig} />
                }
                preview={
                    <div className="w-full overflow-hidden rounded-[1px]">
                        <style>{css}</style>
                        <div className="glitch-stage w-full">
                            <h2
                                className="glitch-text"
                                data-text={config.text}
                            >
                                {config.text}
                            </h2>
                        </div>
                    </div>
                }
            />

            <VisualPresetGallery
                values={glitchPresets}
                configs={glitchPresetConfigs}
                currentConfig={config}
                renderPreview={(preset, name) => (
                    <GlitchPresetPreview config={preset} name={name} />
                )}
                onSelect={(preset) => setConfig({ ...preset })}
            />
        </div>
    );
};
