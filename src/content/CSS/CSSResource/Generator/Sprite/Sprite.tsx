"use client";
import { GeneralButton } from "@/components/button/GeneralButton/GeneralButton";
import { IconDownload, IconPhoto, IconRestore } from "@tabler/icons-react";
import NextImage from "next/image";
import {
    useEffect,
    useMemo,
    useRef,
    useState,
    type CSSProperties,
} from "react";
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
import {
    defaultSpriteConfig,
    type SpriteAsset,
    type SpriteConfig,
    type SpriteFit,
    type SpriteLayout,
    type SpriteRendering,
} from "./sprite.type";
import {
    createSpriteCss,
    createSpriteHtml,
    getSpriteMetrics,
} from "./sprite.utils";
import { SpritePresets } from "./SpritePresets";
import { SpriteUploader } from "./SpriteUploader";

const drawImageInCell = (
    context: CanvasRenderingContext2D,
    image: HTMLImageElement,
    x: number,
    y: number,
    config: SpriteConfig,
) => {
    const sourceWidth = image.naturalWidth;
    const sourceHeight = image.naturalHeight;

    if (config.fit === "stretch") {
        context.drawImage(image, x, y, config.cellWidth, config.cellHeight);
        return;
    }

    const ratio =
        config.fit === "cover"
            ? Math.max(
                  config.cellWidth / sourceWidth,
                  config.cellHeight / sourceHeight,
              )
            : Math.min(
                  config.cellWidth / sourceWidth,
                  config.cellHeight / sourceHeight,
              );
    const width = sourceWidth * ratio;
    const height = sourceHeight * ratio;
    const offsetX = (config.cellWidth - width) / 2;
    const offsetY = (config.cellHeight - height) / 2;

    context.save();
    context.beginPath();
    context.rect(x, y, config.cellWidth, config.cellHeight);
    context.clip();
    context.drawImage(image, x + offsetX, y + offsetY, width, height);
    context.restore();
};

export const Sprite = () => {
    const [assets, setAssets] = useState<SpriteAsset[]>([]);
    const [config, setConfig] = useState<SpriteConfig>(defaultSpriteConfig);
    const [spriteUrl, setSpriteUrl] = useState("");
    const [renderError, setRenderError] = useState("");
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const assetsRef = useRef<SpriteAsset[]>([]);
    const imageCache = useRef(new Map<string, HTMLImageElement>());

    const metrics = useMemo(
        () => getSpriteMetrics(assets.length, config),
        [assets.length, config],
    );
    const css = useMemo(
        () => createSpriteCss(assets, config, metrics),
        [assets, config, metrics],
    );
    const html = useMemo(
        () => createSpriteHtml(assets, config),
        [assets, config],
    );

    useEffect(() => {
        assetsRef.current = assets;
    }, [assets]);

    useEffect(() => {
        return () => {
            assetsRef.current.forEach((asset) =>
                URL.revokeObjectURL(asset.url),
            );
        };
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;

        if (!canvas) return;

        if (assets.length === 0) {
            canvas.width = 1;
            canvas.height = 1;
            //eslint-disable-next-line
            setSpriteUrl("");
            setRenderError("");
            return;
        }

        let cancelled = false;

        const loadImage = (asset: SpriteAsset) => {
            const cached = imageCache.current.get(asset.url);

            if (cached) return Promise.resolve(cached);

            return new Promise<HTMLImageElement>((resolve, reject) => {
                const image = document.createElement("img");

                image.onload = () => {
                    imageCache.current.set(asset.url, image);
                    resolve(image);
                };
                image.onerror = () =>
                    reject(new Error(`Unable to load ${asset.file.name}`));
                image.src = asset.url;
            });
        };

        const render = async () => {
            try {
                const images = await Promise.all(assets.map(loadImage));

                if (cancelled) return;

                const scale = Math.max(1, config.scale);
                const context = canvas.getContext("2d");

                if (!context) {
                    throw new Error("Canvas 2D context is unavailable");
                }

                canvas.width = Math.max(1, metrics.width * scale);
                canvas.height = Math.max(1, metrics.height * scale);

                context.setTransform(scale, 0, 0, scale, 0, 0);
                context.clearRect(0, 0, metrics.width, metrics.height);
                context.imageSmoothingEnabled = config.rendering === "smooth";

                if (!config.transparent) {
                    context.fillStyle = config.backgroundColor;
                    context.fillRect(0, 0, metrics.width, metrics.height);
                }

                metrics.placements.forEach((placement, index) => {
                    drawImageInCell(
                        context,
                        images[index],
                        placement.x,
                        placement.y,
                        config,
                    );
                });

                setSpriteUrl(canvas.toDataURL("image/png"));
                setRenderError("");
            } catch (error) {
                if (cancelled) return;

                setRenderError(
                    error instanceof Error
                        ? error.message
                        : "Unable to render sprite",
                );
                setSpriteUrl("");
            }
        };

        void render();

        return () => {
            cancelled = true;
        };
    }, [assets, config, metrics]);

    const reset = () => setConfig(defaultSpriteConfig);

    const download = () => {
        if (!spriteUrl) return;

        const link = document.createElement("a");

        link.href = spriteUrl;
        link.download = "sprite.png";
        link.click();
    };

    const canvasStyle: CSSProperties = {
        width: metrics.width || 1,
        height: metrics.height || 1,
        imageRendering: config.rendering === "pixelated" ? "pixelated" : "auto",
    };

    const preview = (
        <div
            className="grid max-h-[440px] min-h-52 w-full place-items-center overflow-auto rounded-[12px] border border-fg/8 p-5"
            style={{
                backgroundColor:
                    "color-mix(in srgb, var(--foreground) 3%, transparent)",
                backgroundImage:
                    "linear-gradient(45deg, color-mix(in srgb, var(--foreground) 8%, transparent) 25%, transparent 25%), linear-gradient(-45deg, color-mix(in srgb, var(--foreground) 8%, transparent) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, color-mix(in srgb, var(--foreground) 8%, transparent) 75%), linear-gradient(-45deg, transparent 75%, color-mix(in srgb, var(--foreground) 8%, transparent) 75%)",
                backgroundPosition: "0 0, 0 8px, 8px -8px, -8px 0",
                backgroundSize: "16px 16px",
            }}
        >
            {assets.length === 0 ? (
                <span className="text-[11px] text-fg/40">
                    Add images to generate a sprite sheet
                </span>
            ) : (
                <canvas
                    ref={canvasRef}
                    style={canvasStyle}
                    className="max-w-none"
                />
            )}

            {assets.length === 0 && (
                <canvas ref={canvasRef} className="hidden" />
            )}
        </div>
    );

    return (
        <GeneratorPage
            title="CSS Sprite Generator"
            description="Combine images into a downloadable sprite sheet and generate exact CSS background positions"
            icon={IconPhoto}
        >
            <div className="col-stretch-4 w-full">
                <GeneratorWorkspace
                    css={css}
                    html={html}
                    preview={preview}
                    previewClassName="rounded-[18px]"
                    floatingPreviewClassName="rounded-[14px]"
                    floatingPreview={
                        spriteUrl ? (
                            <NextImage
                                src={spriteUrl}
                                width={Math.max(1, metrics.width)}
                                height={Math.max(1, metrics.height)}
                                alt="Generated sprite sheet"
                                unoptimized
                                className="max-h-full max-w-full object-contain"
                            />
                        ) : undefined
                    }
                    controls={
                        <ConfigPanel
                            title="Sprite settings"
                            action={
                                <div className="row-center-1 rounded-[6px] bg-fg/5 p-0.5">
                                    {spriteUrl && (
                                        <GeneralButton
                                            variant="ghost"
                                            icon={
                                                <IconDownload className="size-4" />
                                            }
                                            textButton="PNG"
                                            handleAction={download}
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
                            <SpriteUploader
                                assets={assets}
                                setAssets={setAssets}
                            />

                            <ControlGrid>
                                <SelectControl
                                    title="Layout"
                                    value={config.layout}
                                    values={["grid", "horizontal", "vertical"]}
                                    onChange={(layout) =>
                                        setConfig((current) => ({
                                            ...current,
                                            layout: layout as SpriteLayout,
                                        }))
                                    }
                                />

                                {config.layout === "grid" && (
                                    <RangeControl
                                        title="Columns"
                                        value={config.columns}
                                        min={1}
                                        max={16}
                                        onChange={(columns) =>
                                            setConfig((current) => ({
                                                ...current,
                                                columns,
                                            }))
                                        }
                                    />
                                )}

                                <RangeControl
                                    title="Cell width"
                                    value={config.cellWidth}
                                    min={8}
                                    max={256}
                                    unit="px"
                                    onChange={(cellWidth) =>
                                        setConfig((current) => ({
                                            ...current,
                                            cellWidth,
                                        }))
                                    }
                                />

                                <RangeControl
                                    title="Cell height"
                                    value={config.cellHeight}
                                    min={8}
                                    max={256}
                                    unit="px"
                                    onChange={(cellHeight) =>
                                        setConfig((current) => ({
                                            ...current,
                                            cellHeight,
                                        }))
                                    }
                                />

                                <RangeControl
                                    title="Gap"
                                    value={config.gap}
                                    min={0}
                                    max={32}
                                    unit="px"
                                    onChange={(gap) =>
                                        setConfig((current) => ({
                                            ...current,
                                            gap,
                                        }))
                                    }
                                />

                                <SelectControl
                                    title="Image fit"
                                    value={config.fit}
                                    values={["contain", "cover", "stretch"]}
                                    onChange={(fit) =>
                                        setConfig((current) => ({
                                            ...current,
                                            fit: fit as SpriteFit,
                                        }))
                                    }
                                />

                                <SelectControl
                                    title="Export scale"
                                    value={String(config.scale)}
                                    values={["1", "2", "3", "4"]}
                                    onChange={(scale) =>
                                        setConfig((current) => ({
                                            ...current,
                                            scale: Number(scale),
                                        }))
                                    }
                                />

                                <SelectControl
                                    title="Rendering"
                                    value={config.rendering}
                                    values={["smooth", "pixelated"]}
                                    onChange={(rendering) =>
                                        setConfig((current) => ({
                                            ...current,
                                            rendering:
                                                rendering as SpriteRendering,
                                        }))
                                    }
                                />

                                <ToggleControl
                                    title="Transparent background"
                                    checked={config.transparent}
                                    onChange={(transparent) =>
                                        setConfig((current) => ({
                                            ...current,
                                            transparent,
                                        }))
                                    }
                                />

                                {!config.transparent && (
                                    <ColorControl
                                        title="Background"
                                        value={config.backgroundColor}
                                        onChange={(backgroundColor) =>
                                            setConfig((current) => ({
                                                ...current,
                                                backgroundColor,
                                            }))
                                        }
                                    />
                                )}

                                <TextControl
                                    title="CSS class prefix"
                                    value={config.prefix}
                                    onChange={(prefix) =>
                                        setConfig((current) => ({
                                            ...current,
                                            prefix,
                                        }))
                                    }
                                />
                            </ControlGrid>

                            {renderError && (
                                <span className="rounded-[6px] bg-red-500/10 px-2 py-1.5 text-[10px] text-red-400">
                                    {renderError}
                                </span>
                            )}
                        </ConfigPanel>
                    }
                />

                <SpritePresets
                    config={config}
                    onSelect={(preset) =>
                        setConfig((current) => ({
                            ...current,
                            ...preset,
                        }))
                    }
                />
            </div>
        </GeneratorPage>
    );
};
