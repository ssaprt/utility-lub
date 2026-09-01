"use client";

import { GeneralButton } from "@/components/button/GeneralButton/GeneralButton";
import { IconAdjustmentsHorizontal, IconRestore } from "@tabler/icons-react";
import { useEffect, useMemo, useState, type CSSProperties } from "react";
import {
    ColorControl,
    ConfigPanel,
    ControlGrid,
    GeneratorPage,
    GeneratorWorkspace,
    RangeControl,
    SelectControl,
    TextControl,
    ToggleControl,
} from "../_shared/GeneratorUI";
import { VisualPresetGallery } from "../_shared/VisualPresetGallery";
import { GlassImageUploader } from "./GlassImageUploader";
import {
    BezierPreview,
    FlipSwitchPreview,
    GlassPreview,
    SpritePreview,
    TextInputPreview,
    ToastPreview,
} from "./InteractivePreviews";
import {
    createRichPresets,
    defaultRichConfigs,
    richControls,
    type RichConfig,
    type RichControl,
    type RichGeneratorKind,
    type RichValue,
} from "./rich-generator.type";
import { richConfigToCss, richConfigToHtml } from "./rich-generator.utils";
import { SpriteUploader, type ImagePreviewHook } from "./SpriteUploader";

const value = (config: RichConfig, key: string) => config.values[key];
const rgba = (hex: string, alpha: number) => {
    const v = Number.parseInt(hex.replace("#", ""), 16);
    return `rgba(${v >> 16}, ${(v >> 8) & 255}, ${v & 255}, ${alpha})`;
};

const Preview = ({
    config,
    mini = false,
    onToggle,
    onBezierChange,
    onToastClose,
}: {
    config: RichConfig;
    mini?: boolean;
    onToggle?: () => void;
    onBezierChange?: (point: 1 | 2, x: number, y: number) => void;
    onToastClose?: () => void;
}) => {
    const v = config.values;
    const scale = mini ? 0.55 : 1;
    if (config.kind === "cubic-bezier")
        return (
            <BezierPreview
                config={config}
                mini={mini}
                onChange={onBezierChange}
            />
        );
    if (config.kind === "flip-switch")
        return (
            <FlipSwitchPreview
                config={config}
                mini={mini}
                onToggle={onToggle}
            />
        );
    if (config.kind === "glassmorphism")
        return <GlassPreview config={config} mini={mini} />;
    if (config.kind === "triangle") {
        const points: Record<string, string> = {
            top: "50% 0,100% 100%,0 100%",
            "top-right": "100% 0,100% 100%,0 0",
            right: "100% 50%,0 100%,0 0",
            "bottom-right": "100% 100%,0 100%,100% 0",
            bottom: "50% 100%,0 0,100% 0",
            "bottom-left": "0 100%,0 0,100% 100%",
            left: "0 50%,100% 0,100% 100%",
            "top-left": "0 0,100% 0,0 100%",
        };
        return (
            <span
                style={{
                    width: Number(v.width) * scale,
                    height: Number(v.height) * scale,
                    background: String(v.color),
                    clipPath: `polygon(${points[String(v.direction)]})`,
                    transform: `rotate(${v.rotation}deg) skewX(${v.skew}deg)`,
                    borderRadius: Number(v.radius) * scale,
                }}
            />
        );
    }
    if (config.kind === "toast")
        return (
            <ToastPreview config={config} mini={mini} onClose={onToastClose} />
        );
    if (config.kind === "text-shadow") {
        const shadows = Array.from(
            { length: Number(v.layers) },
            (_, i) =>
                `${Number(v.x) + i * Number(v.layerGap)}px ${Number(v.y) + i * Number(v.layerGap)}px ${Number(v.blur)}px ${rgba(String(v.shadowColor), Math.max(0.08, Number(v.alpha) - i * 0.06))}`,
        ).join(",");
        return (
            <div
                className="grid w-full place-items-center overflow-hidden px-4 py-12"
                style={{ background: String(v.canvas) }}
            >
                <span
                    className="max-w-full truncate text-center leading-none"
                    style={{
                        color: String(v.textColor),
                        fontSize: mini
                            ? Math.min(30, Number(v.fontSize) * 0.45)
                            : Number(v.fontSize),
                        fontWeight: Number(v.fontWeight),
                        textShadow: shadows,
                    }}
                >
                    {String(v.text)}
                </span>
            </div>
        );
    }
    if (config.kind === "text-input")
        return <TextInputPreview config={config} mini={mini} />;
    if (config.kind === "text-gradient")
        return (
            <span
                className="max-w-full truncate px-3 py-8 text-center leading-none"
                style={{
                    fontSize: mini ? 28 : Number(v.fontSize),
                    fontWeight: Number(v.fontWeight),
                    background: `${Boolean(v.repeat) ? "repeating-" : ""}linear-gradient(${v.angle}deg,${v.startColor} ${v.startPosition}%,${v.stopColor} ${v.stopPosition}%,${v.endColor} ${v.endPosition}%)`,
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                }}
            >
                {String(v.text)}
            </span>
        );
    if (config.kind === "sprite")
        return <SpritePreview config={config} mini={mini} />;
    const face = (name: string, style: CSSProperties) => (
        <span
            className="absolute grid size-24 place-items-center border border-white/20 text-[10px] font-semibold text-white"
            style={{
                ...style,
                background: `color-mix(in srgb, ${v.accent} 72%, ${v.accent2})`,
            }}
        >
            {name}
        </span>
    );
    const sceneStyle: CSSProperties = {
        perspective: Number(v.perspective),
        perspectiveOrigin: `${Number(v.originX)}% ${Number(v.originY)}%`,
        transform: `scale(${mini ? 0.52 : 1})`,
    };
    const transform3d: string = [
        `translate3d(${Number(v.translateX)}px, ${Number(v.translateY)}px, ${Number(v.translateZ)}px)`,
        `rotateX(${Number(v.rotateX)}deg)`,
        `rotateY(${Number(v.rotateY)}deg)`,
        `rotateZ(${Number(v.rotateZ)}deg)`,
        `skew(${Number(v.skewX)}deg, ${Number(v.skewY)}deg)`,
        `scale3d(${Number(v.scaleX)}, ${Number(v.scaleY)}, ${Number(v.scaleZ)})`,
    ].join(" ");
    const cubeStyle: CSSProperties = {
        transformStyle: Boolean(v.preserve3d) ? "preserve-3d" : "flat",
        transform: transform3d,
        transition: ".25s ease",
    };
    return (
        <div
            className="grid size-[220px] place-items-center"
            style={sceneStyle}
        >
            <div className="relative size-24" style={cubeStyle}>
                {face("Front", { transform: "translateZ(48px)" })}
                {face("Back", {
                    transform: "rotateY(180deg) translateZ(48px)",
                })}
                {face("Right", {
                    transform: "rotateY(90deg) translateZ(48px)",
                })}
                {face("Left", {
                    transform: "rotateY(-90deg) translateZ(48px)",
                })}
                {face("Top", { transform: "rotateX(90deg) translateZ(48px)" })}
                {face("Bottom", {
                    transform: "rotateX(-90deg) translateZ(48px)",
                })}
            </div>
        </div>
    );
};

const Control = ({
    control,
    config,
    update,
}: {
    key?: string;
    control: RichControl;
    config: RichConfig;
    update: (key: string, value: RichValue) => void;
}) => {
    const current = value(config, control.key);
    if (control.type === "range")
        return (
            <RangeControl
                title={control.title}
                value={Number(current)}
                min={control.min ?? 0}
                max={control.max ?? 100}
                step={control.step}
                unit={control.unit}
                onChange={(v) => update(control.key, v)}
            />
        );
    if (control.type === "color")
        return (
            <ColorControl
                title={control.title}
                value={String(current)}
                onChange={(v) => update(control.key, v)}
            />
        );
    if (control.type === "text")
        return (
            <TextControl
                title={control.title}
                value={String(current)}
                onChange={(v) => update(control.key, v)}
            />
        );
    if (control.type === "toggle")
        return (
            <ToggleControl
                title={control.title}
                checked={Boolean(current)}
                onChange={(v) => update(control.key, v)}
            />
        );
    return (
        <SelectControl
            title={control.title}
            value={String(current)}
            values={control.values ?? []}
            onChange={(v) => update(control.key, v)}
        />
    );
};

export const RichGeneratorPage = ({
    kind,
    title,
    description,
    imagePreviewHook,
}: {
    kind: RichGeneratorKind;
    title: string;
    description: string;
    imagePreviewHook?: ImagePreviewHook;
}) => {
    const [config, setConfig] = useState<RichConfig>(() => ({
        kind,
        values: { ...defaultRichConfigs[kind].values },
    }));
    const [toastDemo, setToastDemo] = useState(0);
    const presets = useMemo(() => createRichPresets(kind), [kind]);
    const css = useMemo(() => richConfigToCss(config), [config]);
    const html = useMemo(() => richConfigToHtml(config), [config]);
    const sections = useMemo(
        () =>
            Array.from(
                new Set(richControls[kind].map((control) => control.section)),
            ),
        [kind],
    );
    const toastDuration = Number(config.values.duration);

    useEffect(() => {
        if (kind !== "toast" || toastDemo === 0) return;
        const timer = window.setTimeout(
            () => setToastDemo(0),
            toastDuration * 1000,
        );
        return () => window.clearTimeout(timer);
    }, [kind, toastDemo, toastDuration]);

    const update = (key: string, next: RichValue) =>
        setConfig((current) => {
            const values = { ...current.values, [key]: next };
            if (kind === "flip-switch") {
                const height = Number(values.height);
                const offset = Math.min(
                    Number(values.offset),
                    Math.max(1, height / 4),
                );
                const thumbSize = Math.min(
                    Number(values.thumbSize),
                    Math.max(8, height - offset * 2),
                );
                values.offset = offset;
                values.thumbSize = thumbSize;
                values.width = Math.max(
                    Number(values.width),
                    thumbSize + offset * 2 + 8,
                );
                values.radius = Math.min(Number(values.radius), height / 2);
            }
            return { ...current, values };
        });

    const reset = () => {
        setConfig({ kind, values: { ...defaultRichConfigs[kind].values } });
        setToastDemo(0);
    };

    const mainPreview = (
        <Preview
            config={config}
            onToggle={
                kind === "flip-switch"
                    ? () => update("active", !Boolean(config.values.active))
                    : undefined
            }
            onBezierChange={
                kind === "cubic-bezier"
                    ? (point, x, y) =>
                          setConfig((current) => ({
                              ...current,
                              values: {
                                  ...current.values,
                                  ...(point === 1
                                      ? { x1: x, y1: y }
                                      : { x2: x, y2: y }),
                              },
                          }))
                    : undefined
            }
        />
    );

    return (
        <GeneratorPage
            title={title}
            description={description}
            icon={IconAdjustmentsHorizontal}
        >
            <div className="col-stretch-4 w-full">
                <style>{`@keyframes rich-move{to{transform:translateX(460px)}} @keyframes toast-demo-progress{to{transform:scaleX(0)}} @keyframes toast-demo-in{from{opacity:0;transform:translate3d(24px,-8px,0) scale(.96)}to{opacity:1;transform:none}}`}</style>
                <GeneratorWorkspace
                    css={css}
                    html={html}
                    previewClassName="rounded-[18px]"
                    floatingPreviewClassName="rounded-[18px]"
                    preview={
                        <div className="flex w-full items-center justify-center overflow-hidden rounded-[12px] bg-fg/5 px-4 py-10">
                            {mainPreview}
                        </div>
                    }
                    floatingPreview={
                        <div className="flex size-full items-center justify-center overflow-hidden bg-fg/5 p-2">
                            <Preview config={config} mini />
                        </div>
                    }
                    controls={
                        <ConfigPanel
                            title={title}
                            action={
                                <div className="row-center-1 rounded-[6px] bg-fg/5 p-0.5">
                                    {kind === "toast" && (
                                        <GeneralButton
                                            variant="ghost"
                                            textButton="Run demo"
                                            handleAction={() =>
                                                setToastDemo(
                                                    (current) => current + 1,
                                                )
                                            }
                                        />
                                    )}
                                    <GeneralButton
                                        variant="ghost"
                                        icon={
                                            <IconRestore className="size-4" />
                                        }
                                        textButton="Reset"
                                        handleAction={reset}
                                    />
                                </div>
                            }
                        >
                            {kind === "sprite" && imagePreviewHook && (
                                <SpriteUploader
                                    config={config}
                                    setConfig={setConfig}
                                    usePreview={imagePreviewHook}
                                />
                            )}
                            {kind === "glassmorphism" && imagePreviewHook && (
                                <GlassImageUploader
                                    setConfig={setConfig}
                                    usePreview={imagePreviewHook}
                                />
                            )}
                            {sections.map((section) => (
                                <div key={section} className="col-stretch-1">
                                    <span className="px-1 text-[10px] font-medium text-fg/55">
                                        {section}
                                    </span>
                                    <ControlGrid>
                                        {richControls[kind]
                                            .filter(
                                                (control) =>
                                                    control.section === section,
                                            )
                                            .map((control) => (
                                                <Control
                                                    key={control.key}
                                                    control={control}
                                                    config={config}
                                                    update={update}
                                                />
                                            ))}
                                    </ControlGrid>
                                </div>
                            ))}
                        </ConfigPanel>
                    }
                />

                <VisualPresetGallery
                    values={presets.names}
                    configs={presets.configs}
                    currentConfig={config}
                    renderPreview={(preset) => <Preview config={preset} mini />}
                    onSelect={(preset) =>
                        setConfig({
                            kind,
                            values: {
                                ...preset.values,
                                ...(kind === "glassmorphism" &&
                                config.values.backgroundImage
                                    ? {
                                          backgroundImage:
                                              config.values.backgroundImage,
                                      }
                                    : {}),
                            },
                        })
                    }
                />

                {kind === "toast" && toastDemo > 0 && (
                    <div
                        key={toastDemo}
                        role="status"
                        aria-live="polite"
                        className="pointer-events-auto fixed right-5 top-5 z-[99999] animate-[toast-demo-in_.24s_ease-out]"
                    >
                        <ToastPreview
                            config={config}
                            onClose={() => setToastDemo(0)}
                        />
                    </div>
                )}
            </div>
        </GeneratorPage>
    );
};
