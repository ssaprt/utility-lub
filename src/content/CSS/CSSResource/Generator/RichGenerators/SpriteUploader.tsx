"use client";

import { GeneralButton } from "@/components/button/GeneralButton/GeneralButton";
import { IconUpload } from "@tabler/icons-react";
import {
    useId,
    useRef,
    type ChangeEvent,
    type Dispatch,
    type SetStateAction,
} from "react";

import type { RichConfig } from "./rich-generator.type";

export type ImagePreviewHook =
    typeof import("use-image-preview").useImagePreview;

const readFile = (file: File) =>
    new Promise<string>((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => resolve(String(reader.result));
        reader.onerror = () => reject(reader.error);

        reader.readAsDataURL(file);
    });

const loadImage = (src: string) =>
    new Promise<HTMLImageElement>((resolve, reject) => {
        const image = document.createElement("img");

        image.onload = () => resolve(image);
        image.onerror = () =>
            reject(new Error("Unable to load the selected image"));

        image.src = src;
    });

const buildSpriteSheet = async (files: File[], config: RichConfig) => {
    const sources = await Promise.all(files.map(readFile));
    const images = await Promise.all(sources.map(loadImage));

    const v = config.values;

    const padding = Number(v.padding);
    const cellWidth = Number(v.cellWidth);
    const cellHeight = Number(v.cellHeight);

    const columns =
        v.layout === "vertical"
            ? 1
            : v.layout === "horizontal"
              ? images.length
              : Math.min(Number(v.columns), images.length);

    const rows = Math.ceil(images.length / columns);

    const canvas = document.createElement("canvas");

    canvas.width = columns * cellWidth + Math.max(0, columns - 1) * padding;

    canvas.height = rows * cellHeight + Math.max(0, rows - 1) * padding;

    const context = canvas.getContext("2d");

    if (!context) {
        throw new Error("Canvas 2D context is unavailable");
    }

    if (v.background !== "transparent") {
        context.fillStyle = String(v.background);

        context.fillRect(0, 0, canvas.width, canvas.height);
    }

    images.forEach((image, index) => {
        const column = index % columns;
        const row = Math.floor(index / columns);

        const x = column * (cellWidth + padding);
        const y = row * (cellHeight + padding);

        const ratio = Math.min(
            cellWidth / image.naturalWidth,
            cellHeight / image.naturalHeight,
        );

        const width = image.naturalWidth * ratio;
        const height = image.naturalHeight * ratio;

        const offsetX = (cellWidth - width) / 2;
        const offsetY = (cellHeight - height) / 2;

        context.drawImage(image, x + offsetX, y + offsetY, width, height);
    });

    return {
        url: canvas.toDataURL("image/png"),
        columns,
        rows,
        count: images.length,
    };
};

export const SpriteUploader = ({
    config,
    setConfig,
    usePreview,
}: {
    config: RichConfig;
    setConfig: Dispatch<SetStateAction<RichConfig>>;
    usePreview: ImagePreviewHook;
}) => {
    const inputId = useId();
    const inputRef = useRef<HTMLInputElement>(null);

    const { file, preview, change, clear } = usePreview();

    const generatedSprite = String(config.values.imageUrl ?? "");

    const hasGeneratedSprite = generatedSprite.startsWith("data:image");

    const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.currentTarget.files ?? []);

        change(event);

        if (files.length === 0) return;

        try {
            const sheet = await buildSpriteSheet(files, config);

            setConfig((current) => ({
                ...current,
                values: {
                    ...current.values,
                    imageUrl: sheet.url,
                    columns: sheet.columns,
                    rows: sheet.rows,
                    imageCount: sheet.count,
                },
            }));
        } catch (error) {
            console.error("Unable to generate sprite sheet", error);
        }
    };

    const handleClear = () => {
        clear();

        if (inputRef.current) {
            inputRef.current.value = "";
        }

        setConfig((current) => ({
            ...current,
            values: {
                ...current.values,
                imageUrl: "",
                imageCount: 0,
            },
        }));
    };

    return (
        <div className="col-stretch-1 rounded-md border border-dashed border-fg/15 bg-fg/5 p-2">
            <span className="text-[10px] text-fg/60">
                Select PNG, JPEG, GIF or WebP images. Processing stays in the
                browser.
            </span>

            <div className="row-center-2 min-w-0">
                {preview && (
                    <img
                        src={preview}
                        alt={file?.name ?? "Selected image preview"}
                        className="size-10 shrink-0 rounded-[5px] border border-fg/10 object-cover"
                    />
                )}

                <input
                    ref={inputRef}
                    id={inputId}
                    type="file"
                    hidden
                    accept="image/*"
                    multiple
                    onChange={handleChange}
                />

                <label
                    htmlFor={inputId}
                    className="row-center-1 justify-between rounded-md bg-fg/5 px-4 py-2 transition-colors hover:cursor-pointer hover:bg-fg/15"
                >
                    <span className="select-none text-[12px]">
                        Choose images
                    </span>

                    <IconUpload className="size-5 text-fg!" />
                </label>

                {(file || preview || hasGeneratedSprite) && (
                    <GeneralButton
                        textButton="Clear"
                        variant="aurora"
                        handleAction={handleClear}
                    />
                )}
            </div>

            {hasGeneratedSprite && (
                <a
                    href={generatedSprite}
                    download="sprite.png"
                    className="w-fit rounded-[5px] bg-fg px-2 py-1 text-[10px] font-medium text-app"
                >
                    Download sprite PNG
                </a>
            )}
        </div>
    );
};
