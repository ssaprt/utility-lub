"use client";

import { GeneralButton } from "@/components/button/GeneralButton/GeneralButton";
import { IconGripVertical, IconTrash, IconUpload } from "@tabler/icons-react";
import NextImage from "next/image";
import {
    useId,
    useRef,
    useState,
    type ChangeEvent,
    type Dispatch,
    type DragEvent,
    type SetStateAction,
} from "react";

import type { SpriteAsset } from "./sprite.type";

const createAssetId = () =>
    typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

export const SpriteUploader = ({
    assets,
    setAssets,
}: {
    assets: SpriteAsset[];
    setAssets: Dispatch<SetStateAction<SpriteAsset[]>>;
}) => {
    const inputId = useId();
    const inputRef = useRef<HTMLInputElement>(null);

    const [draggedId, setDraggedId] = useState<string | null>(null);

    const addFiles = (event: ChangeEvent<HTMLInputElement>) => {
        const files = (
            Array.from(event.currentTarget.files ?? []) as File[]
        ).filter((file) => file.type.startsWith("image/"));

        if (files.length === 0) return;

        const nextAssets = files.map((file) => ({
            id: createAssetId(),
            file,
            url: URL.createObjectURL(file),
            name: file.name.replace(/\.[^/.]+$/, ""),
        }));

        setAssets((current) => [...current, ...nextAssets]);

        event.currentTarget.value = "";
    };

    const removeAsset = (id: string) => {
        setAssets((current) => {
            const target = current.find((asset) => asset.id === id);

            if (target) {
                URL.revokeObjectURL(target.url);
            }

            return current.filter((asset) => asset.id !== id);
        });
    };

    const clearAssets = () => {
        setAssets((current) => {
            current.forEach((asset) => URL.revokeObjectURL(asset.url));

            return [];
        });
    };

    const renameAsset = (id: string, name: string) => {
        setAssets((current) =>
            current.map((asset) =>
                asset.id === id ? { ...asset, name } : asset,
            ),
        );
    };

    const dropAsset = (event: DragEvent<HTMLDivElement>, targetId: string) => {
        event.preventDefault();

        if (!draggedId || draggedId === targetId) {
            return;
        }

        setAssets((current) => {
            const from = current.findIndex((asset) => asset.id === draggedId);

            const to = current.findIndex((asset) => asset.id === targetId);

            if (from < 0 || to < 0) {
                return current;
            }

            const next = [...current];
            const [moved] = next.splice(from, 1);

            next.splice(to, 0, moved);

            return next;
        });

        setDraggedId(null);
    };

    return (
        <div className="col-stretch-2 w-full">
            <input
                ref={inputRef}
                id={inputId}
                type="file"
                hidden
                multiple
                accept="image/png,image/jpeg,image/webp,image/gif"
                onChange={addFiles}
            />

            <div className="row-center-1 w-fit max-w-full flex-wrap rounded-[6px] bg-fg/5 p-0.5">
                <GeneralButton
                    variant="ghost"
                    icon={<IconUpload className="size-4" />}
                    textButton="Add images"
                    handleAction={() => inputRef.current?.click()}
                />

                {assets.length > 0 && (
                    <GeneralButton
                        variant="ghost"
                        icon={<IconTrash className="size-4" />}
                        textButton="Clear"
                        handleAction={clearAssets}
                    />
                )}
            </div>

            {assets.length === 0 ? (
                <label
                    htmlFor={inputId}
                    className="grid min-h-32 cursor-pointer place-items-center rounded-[10px] border border-dashed border-fg/15 bg-fg/3 p-4 text-center transition-colors hover:bg-fg/6"
                >
                    <span className="col-center-1">
                        <IconUpload className="size-6 text-fg/50" />

                        <span className="text-[11px] text-fg/60">
                            Choose images
                        </span>

                        <span className="text-[9px] text-fg/35">
                            PNG, JPEG, WebP or GIF
                        </span>
                    </span>
                </label>
            ) : (
                <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-1.5 rounded-[10px] border border-fg/8 bg-fg/3 p-1.5">
                    {assets.map((asset, index) => (
                        <div
                            key={asset.id}
                            draggable
                            onDragStart={() => setDraggedId(asset.id)}
                            onDragEnd={() => setDraggedId(null)}
                            onDragOver={(event) => event.preventDefault()}
                            onDrop={(event) => dropAsset(event, asset.id)}
                            className={`row-center-1 min-w-0 rounded-[7px] border bg-fg/4 p-1 transition-all ${
                                draggedId === asset.id
                                    ? "border-fg/35 opacity-45"
                                    : "border-fg/7"
                            }`}
                        >
                            <IconGripVertical className="size-4 shrink-0 cursor-grab text-fg/35 active:cursor-grabbing" />

                            <span className="relative size-10 shrink-0 overflow-hidden rounded-[5px] bg-fg/8">
                                <NextImage
                                    src={asset.url}
                                    alt={asset.name}
                                    fill
                                    unoptimized
                                    className="object-contain"
                                />

                                <span className="absolute left-0.5 top-0.5 grid size-4 place-items-center rounded-full bg-app/80 text-[8px] text-fg">
                                    {index + 1}
                                </span>
                            </span>

                            <input
                                type="text"
                                value={asset.name}
                                aria-label={`CSS class name for image ${index + 1}`}
                                onChange={(event) =>
                                    renameAsset(asset.id, event.target.value)
                                }
                                className="min-w-0 flex-1 rounded-[5px] bg-fg/5 px-1.5 py-1 text-[10px] outline-none focus:bg-fg/10"
                            />

                            <button
                                type="button"
                                aria-label={`Remove ${asset.name}`}
                                onClick={() => removeAsset(asset.id)}
                                className="grid size-6 shrink-0 cursor-pointer place-items-center rounded-[5px] text-fg/40 transition-colors hover:bg-fg/10 hover:text-fg"
                            >
                                <IconTrash className="size-3.5" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
