"use client";

import { useMemo, type Dispatch, type SetStateAction } from "react";
import { GeneratorWorkspace } from "../_shared/GeneratorUI";
import { VisualPresetGallery } from "../_shared/VisualPresetGallery";
import { ConfigLoader } from "./ConfigLoader";
import { loaderPresetConfigs, loaderPresets, loaderUsesChildren, type LoaderConfig } from "./loader.type";
import { loaderConfigToCss, loaderConfigToHtml } from "./loader.utils";

const LoaderLivePreview = ({ config, scope }: { config: LoaderConfig; scope: string }) => {
    const safe = `loader-${scope.replace(/[^a-z0-9-]/gi, "-")}`;
    let css = loaderConfigToCss(config).replaceAll(".css-loader", `.${safe}`);
    ["loader-points", "loader-bars", "grid-pulse", "loader-spin", "loader-pulse", "hourglass", "square-spin", "flip-cube", "loader-progress"].forEach((name) => { css = css.replaceAll(name, `${safe}-${name}`); });
    const spans = loaderUsesChildren(config.type) ? Array.from({ length: config.count }, (_, index) => <span key={index} />) : null;
    return <span className="flex size-full items-center justify-center"><style>{css}</style><span className={safe}>{spans}</span></span>;
};

export const IsGenerator = ({ config, setConfig }: { config: LoaderConfig; setConfig: Dispatch<SetStateAction<LoaderConfig>> }) => {
    const css = useMemo(() => loaderConfigToCss(config), [config]);
    const html = useMemo(() => loaderConfigToHtml(config), [config]);
    const spans = loaderUsesChildren(config.type) ? Array.from({ length: config.count }, (_, index) => <span key={index} />) : null;

    return (
        <div className="col-stretch-4 w-full">
            <GeneratorWorkspace
                css={css}
                html={html}
                previewClassName="rounded-[28px]"
                floatingPreviewClassName="rounded-[28px]"
                floatingPreview={
                    <div className="flex size-full items-center justify-center" style={{ background: config.surfaceColor }}>
                        <LoaderLivePreview config={config} scope="floating" />
                    </div>
                }
                controls={<ConfigLoader config={config} setConfig={setConfig} />}
                preview={<div className="flex w-full items-center justify-center rounded-[22px] px-8 py-16" style={{ background: config.surfaceColor }}><style>{css}</style><div className="css-loader" role="status" aria-label="Loading">{spans}</div></div>}
            />

            <VisualPresetGallery
                values={loaderPresets}
                configs={loaderPresetConfigs}
                currentConfig={config}
                renderPreview={(preset, name) => <span className="flex h-full w-full items-center justify-center rounded-[4px]" style={{ background: preset.surfaceColor }}><LoaderLivePreview config={preset} scope={name} /></span>}
                onSelect={(preset) => setConfig({ ...preset })}
            />
        </div>
    );
};
