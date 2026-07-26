"use client";

import Image from "next/image";
import { useRef, useState, type DragEvent } from "react";
import { useImagePreview } from "use-image-preview";

export const ImageDropZone = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const { file, preview, clear, change, type } = useImagePreview();

    const [isDragging, setIsDragging] = useState(false);

    const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "copy";

        setIsDragging(true);
    };

    const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
        if (event.currentTarget.contains(event.relatedTarget as Node | null)) {
            return;
        }

        setIsDragging(false);
    };

    return (
        <div className="flex w-full flex-col gap-2">
            <input
                ref={inputRef}
                type="file"
                accept="image/*, video/*"
                onChange={change}
                className="hidden"
            />

            <div
                role="button"
                tabIndex={0}
                onClick={() => inputRef.current?.click()}
                onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        inputRef.current?.click();
                    }
                }}
                onDragEnter={(event) => {
                    event.preventDefault();
                    setIsDragging(true);
                }}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={change}
                className={`
                    relative
                    flex
                    min-h-56
                    w-full
                    cursor-pointer
                    items-center
                    justify-center
                    overflow-hidden
                    rounded-xl
                    border-2
                    border-dashed
                    transition-colors

                    ${
                        isDragging
                            ? "border-pink-300 bg-pink-300/15"
                            : "border-pink-300/40 bg-pink-300/5"
                    }
                `}
            >
                {preview ? (
                    type == "image" ? (
                        <Image
                            fill
                            unoptimized
                            src={preview}
                            alt="Предпросмотр загруженного изображения"
                            className="
                            h-full
                            max-h-80
                            w-full
                            object-contain
                        "
                        />
                    ) : (
                        <video
                            src={preview}
                            controls
                            className="h-full max-h-80 w-full object-contain"
                        />
                    )
                ) : (
                    <div className="flex flex-col items-center gap-2 p-6 text-center">
                        <span className="text-sm">
                            Drag and drop your image/video
                        </span>

                        <span className="text-xs opacity-60">
                            or click to upload
                        </span>
                    </div>
                )}
            </div>

            {file && (
                <div className="flex items-center justify-between gap-2">
                    <span className="min-w-0 truncate text-sm">
                        {file.name}
                    </span>

                    <button
                        type="button"
                        onClick={clear}
                        className="
                            shrink-0
                            rounded-md
                            bg-pink-300/15
                            px-3
                            py-1
                            text-sm 
                            cursor-pointer
                            hover:bg-pink-300/30
                        "
                    >
                        Удалить
                    </button>
                </div>
            )}
        </div>
    );
};
