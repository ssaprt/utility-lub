"use client";

import { IconFileUpload } from "@tabler/icons-react";
import NextImage from "next/image";
import { useEffect, useId, type ChangeEvent, type Dispatch, type SetStateAction } from "react";
import type { RichConfig } from "./rich-generator.type";
import type { ImagePreviewHook } from "./SpriteUploader";

type PreviewResult = {
    file?: File | null;
    preview?: string | null;
    change?: (event: ChangeEvent<HTMLInputElement>) => void;
    clear?: () => void;
    type?: "image" | "video" | null;
};

export const GlassImageUploader = ({
    setConfig,
    usePreview,
}: {
    setConfig: Dispatch<SetStateAction<RichConfig>>;
    usePreview: ImagePreviewHook;
}) => {
    const inputId = useId();
    const result = usePreview();
    const previewResult = typeof result === "object" && result !== null
        ? result as PreviewResult
        : null;
    const preview = previewResult?.preview ?? null;

    useEffect(() => {
        if (!preview) return;
        setConfig((current) => {
            if (current.values.backgroundImage === preview) return current;
            return {
                ...current,
                values: { ...current.values, backgroundImage: preview },
            };
        });
    }, [preview, setConfig]);

    const clear = () => {
        previewResult?.clear?.();
        setConfig((current) => ({
            ...current,
            values: { ...current.values, backgroundImage: "" },
        }));
    };

    return (
        <div className="col-stretch-1 rounded-md border border-dashed border-fg/15 bg-fg/5 p-2">
            <span className="text-[10px] text-fg/60">Preview background image</span>
            <div className="row-center-2 min-w-0">
                {preview && (
                    <NextImage
                        src={preview}
                        width={80}
                        height={80}
                        alt="Glass background preview"
                        unoptimized
                        className="size-9 shrink-0 rounded-[5px] border border-fg/10 object-cover"
                    />
                )}
                <input
                    id={inputId}
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={(event) => previewResult?.change?.(event)}
                />
                <label
                    htmlFor={inputId}
                    className="row-center-1 w-full justify-between rounded-md bg-fg/5 px-2 py-2 hover:cursor-pointer hover:bg-fg/15"
                >
                    <span className="text-[12px]">Choose background</span>
                    <IconFileUpload className="size-4 text-fg" />
                </label>
                {previewResult?.file && (
                    <button
                        type="button"
                        onClick={clear}
                        className="shrink-0 rounded-[5px] bg-fg/5 px-2 py-1.5 text-[10px] transition-colors hover:cursor-pointer hover:bg-fg/10"
                    >
                        Clear
                    </button>
                )}
            </div>
        </div>
    );
};
