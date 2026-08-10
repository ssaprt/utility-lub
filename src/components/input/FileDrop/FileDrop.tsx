"use client";

import { IconFile, IconUpload, IconX } from "@tabler/icons-react";
import {
    type ChangeEvent,
    type DragEvent,
    type KeyboardEvent,
    useRef,
    useState,
} from "react";

interface FileDropProps {
    name?: string;
    accept?: string;
    maxSizeMb?: number;
    disabled?: boolean;
    onFileChange?: (file: File | null) => void;
}

const formatFileSize = (size: number) => {
    if (size < 1024) {
        return `${size} B`;
    }

    if (size < 1024 * 1024) {
        return `${(size / 1024).toFixed(1)} KB`;
    }

    return `${(size / 1024 / 1024).toFixed(1)} MB`;
};

export const FileDrop = ({
    name = "file",
    accept,
    maxSizeMb = 15,
    disabled = false,
    onFileChange,
}: FileDropProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const selectFile = (nextFile: File) => {
        if (disabled) {
            return;
        }

        const maxSize = maxSizeMb * 1024 * 1024;

        if (nextFile.size > maxSize) {
            setError(`Maximum file size is ${maxSizeMb} MB`);
            return;
        }

        const input = inputRef.current;

        if (!input) {
            return;
        }

        const transfer = new DataTransfer();

        transfer.items.add(nextFile);
        input.files = transfer.files;

        setFile(nextFile);
        setError(null);
        onFileChange?.(nextFile);
    };

    const clearFile = () => {
        if (inputRef.current) {
            inputRef.current.value = "";
        }

        setFile(null);
        setError(null);
        onFileChange?.(null);
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];

        if (selectedFile) {
            selectFile(selectedFile);
        }
    };

    const handleDrop = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(false);

        const selectedFile = event.dataTransfer.files[0];

        if (selectedFile) {
            selectFile(selectedFile);
        }
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key !== "Enter" && event.key !== " ") {
            return;
        }

        event.preventDefault();
        inputRef.current?.click();
    };

    return (
        <div className="flex w-full flex-col gap-2">
            <input
                ref={inputRef}
                name={name}
                type="file"
                accept={accept}
                disabled={disabled}
                className="hidden"
                onChange={handleInputChange}
            />

            <div
                role="button"
                tabIndex={disabled ? -1 : 0}
                aria-disabled={disabled}
                onClick={() => {
                    if (!disabled && !file) {
                        inputRef.current?.click();
                    }
                }}
                onKeyDown={handleKeyDown}
                onDragEnter={(event) => {
                    event.preventDefault();

                    if (!disabled) {
                        setIsDragging(true);
                    }
                }}
                onDragOver={(event) => {
                    event.preventDefault();

                    if (!disabled) {
                        event.dataTransfer.dropEffect = "copy";
                    }
                }}
                onDragLeave={(event) => {
                    event.preventDefault();

                    if (
                        !event.currentTarget.contains(
                            event.relatedTarget as Node,
                        )
                    ) {
                        setIsDragging(false);
                    }
                }}
                onDrop={handleDrop}
                className={`
                    flex
                    min-h-[110px]
                    w-full
                    items-center
                    justify-center
                    rounded-[8px]
                    border
                    border-dashed
                    p-4
                    transition-all
                    duration-150
                    ${
                        disabled
                            ? "cursor-not-allowed border-white/10 bg-white/5 opacity-50"
                            : "cursor-pointer border-fg/40 bg-black/20 hover:border-fg hover:bg-fg/10"
                    }
                    ${isDragging ? "scale-[1.01] border-fg bg-fg/20" : ""}
                `}
            >
                {file ? (
                    <div className="flex w-full items-center gap-3">
                        <IconFile className="h-8 w-8 shrink-0 text-fg" />

                        <div className="flex min-w-0 flex-1 flex-col">
                            <span className="truncate text-sm">
                                {file.name}
                            </span>

                            <span className="text-xs opacity-60">
                                {formatFileSize(file.size)}
                            </span>
                        </div>

                        <button
                            type="button"
                            aria-label="Remove file"
                            onClick={(event) => {
                                event.stopPropagation();
                                clearFile();
                            }}
                            className="
                                flex
                                h-8
                                w-8
                                shrink-0
                                items-center
                                justify-center
                                rounded-full
                                text-fg
                                transition-colors
                                hover:bg-fg/20
                            "
                        >
                            <IconX className="h-5 w-5" />
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-2 text-center">
                        <IconUpload className="h-8 w-8 text-fg" />

                        <span className="text-sm">
                            Drop a file here or click to select
                        </span>

                        <span className="text-xs opacity-60">
                            Maximum size: {maxSizeMb} MB
                        </span>
                    </div>
                )}
            </div>

            {error && <span className="text-xs text-red-400">{error}</span>}
        </div>
    );
};
