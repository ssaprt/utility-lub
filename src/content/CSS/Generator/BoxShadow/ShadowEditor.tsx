"use client";

import { GeneralButton } from "@/components/button/GeneralButton/GeneralButton";
import { Range } from "@/components/input/range/Range";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import {
    IconChevronDown,
    IconChevronUp,
    IconCopy,
    IconGripVertical,
    IconTrash,
} from "@tabler/icons-react";

import type { CSSProperties } from "react";

import type { ShadowEditorProps } from "./IsGenerator";

interface NumberInputProps {
    value: number;
    min: number;
    max: number;
    step?: number;
    ariaLabel: string;
    onChange: (value: number) => void;
}

const clamp = (value: number, min: number, max: number) => {
    return Math.min(Math.max(value, min), max);
};

const normalizeColor = (color: string) => {
    return /^#[0-9a-fA-F]{6}$/.test(color) ? color : "#000000";
};

const NumberInput = ({
    value,
    min,
    max,
    step = 1,
    ariaLabel,
    onChange,
}: NumberInputProps) => {
    const changeValue = (direction: 1 | -1) => {
        const nextValue = Number((value + step * direction).toFixed(6));

        onChange(clamp(nextValue, min, max));
    };

    return (
        <div className="relative w-full">
            <input
                type="number"
                aria-label={ariaLabel}
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(event) => {
                    const nextValue = Number(event.target.value);

                    if (Number.isNaN(nextValue)) {
                        return;
                    }

                    onChange(clamp(nextValue, min, max));
                }}
                className="
                    w-full
                    rounded-[4px]
                    bg-fg/10
                    py-1.5
                    pr-8
                    pl-2
                    text-[12px]
                    text-fg
                    outline-none
                    transition-colors
                    duration-200
                    hover:bg-fg/15
                    focus:bg-fg/15

                    [appearance:textfield]
                    [&::-webkit-inner-spin-button]:appearance-none
                    [&::-webkit-outer-spin-button]:appearance-none
                "
            />

            <div
                className="
                    absolute
                    top-0
                    right-0
                    bottom-0
                    grid
                    w-7
                    grid-rows-2
                    overflow-hidden
                    rounded-r-[4px]
                    border-l
                    border-fg/10
                "
            >
                <button
                    type="button"
                    aria-label={`${ariaLabel} increase`}
                    onPointerDown={(event) => event.stopPropagation()}
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => changeValue(1)}
                    className="
                        flex
                        cursor-pointer
                        items-center
                        justify-center
                        bg-app
                        text-fg
                        transition-colors
                        duration-150
                        hover:bg-fg
                        hover:text-app
                        active:bg-fg/80
                    "
                >
                    <IconChevronUp className="size-3" />
                </button>

                <button
                    type="button"
                    aria-label={`${ariaLabel} decrease`}
                    onPointerDown={(event) => event.stopPropagation()}
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => changeValue(-1)}
                    className="
                        flex
                        cursor-pointer
                        items-center
                        justify-center
                        border-t
                        border-fg/10
                        bg-app
                        text-fg
                        transition-colors
                        duration-150
                        hover:bg-fg
                        hover:text-app
                        active:bg-fg/80
                    "
                >
                    <IconChevronDown className="size-3" />
                </button>
            </div>
        </div>
    );
};

export const ShadowEditor = ({
    shadow,
    index,
    total,
    updateShadow,
    removeShadow,
    duplicateShadow,
}: ShadowEditorProps) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        setActivatorNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: shadow.id,
    });

    const style: CSSProperties = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 50 : undefined,
        opacity: isDragging ? 0.88 : 1,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`
                relative
                col-stretch-3
                self-start
                w-full
                rounded-[8px]
                border
                border-fg/8
                bg-fg/5
                p-3
                shadow-sm
                shadow-black/5
                ${isDragging ? "shadow-xl shadow-black/25" : ""}
            `}
        >
            <div className="row-center-2 w-full">
                <button
                    ref={setActivatorNodeRef}
                    type="button"
                    aria-label={`Reorder shadow ${index + 1}`}
                    {...attributes}
                    {...listeners}
                    className="
                        row-center-0
                        shrink-0
                        touch-none
                        cursor-grab
                        rounded-[4px]
                        p-1
                        text-fg/50
                        transition-colors
                        hover:bg-fg/10
                        hover:text-fg
                        active:cursor-grabbing
                    "
                >
                    <IconGripVertical className="size-5" />
                </button>

                <span className="text-[12px]">Shadow {index + 1}</span>

                <div
                    className="
                        ml-auto
                        size-5
                        rounded-full
                        border
                        border-fg/20
                    "
                    style={{
                        backgroundColor: normalizeColor(shadow.color),
                    }}
                />

                <GeneralButton
                    textButton="Inset"
                    variant="minimal"
                    active={shadow.inset}
                    handleAction={() =>
                        updateShadow(shadow.id, {
                            inset: !shadow.inset,
                        })
                    }
                />

                <button
                    type="button"
                    aria-label={`Duplicate shadow ${index + 1}`}
                    onClick={() => duplicateShadow(shadow.id)}
                    className="
                        row-center-0
                        cursor-pointer
                        rounded-[4px]
                        p-1
                        text-fg/60
                        transition-colors
                        hover:bg-fg/10
                        hover:text-fg
                    "
                >
                    <IconCopy className="size-5" />
                </button>

                <button
                    type="button"
                    aria-label={`Delete shadow ${index + 1}`}
                    disabled={total <= 1}
                    onClick={() => removeShadow(shadow.id)}
                    className="
                        row-center-0
                        cursor-pointer
                        rounded-[4px]
                        p-1
                        text-fg/60
                        transition-colors
                        hover:bg-fg/10
                        hover:text-red-500
                        disabled:pointer-events-none
                        disabled:opacity-30
                    "
                >
                    <IconTrash className="size-5" />
                </button>
            </div>

            <div
                className="
                    grid
                    grid-cols-1
                    gap-3
                    md:grid-cols-2
                "
            >
                <div className="col-stretch-1">
                    <div className="row-center-2">
                        <label
                            htmlFor={`shadow-${shadow.id}-x`}
                            className="text-[12px]"
                        >
                            Offset X
                        </label>

                        <span className="ml-auto text-[10px] text-fg/60">
                            {shadow.offsetX}
                            px
                        </span>
                    </div>

                    <Range
                        value={shadow.offsetX}
                        min={-100}
                        max={100}
                        step={1}
                        onChange={(value) =>
                            updateShadow(shadow.id, {
                                offsetX: value,
                            })
                        }
                    />

                    <NumberInput
                        value={shadow.offsetX}
                        min={-100}
                        max={100}
                        ariaLabel={`Shadow ${index + 1} offset X`}
                        onChange={(value) =>
                            updateShadow(shadow.id, {
                                offsetX: value,
                            })
                        }
                    />
                </div>

                <div className="col-stretch-1">
                    <div className="row-center-2">
                        <label
                            htmlFor={`shadow-${shadow.id}-y`}
                            className="text-[12px]"
                        >
                            Offset Y
                        </label>

                        <span className="ml-auto text-[10px] text-fg/60">
                            {shadow.offsetY}
                            px
                        </span>
                    </div>

                    <Range
                        value={shadow.offsetY}
                        min={-100}
                        max={100}
                        step={1}
                        onChange={(value) =>
                            updateShadow(shadow.id, {
                                offsetY: value,
                            })
                        }
                    />

                    <NumberInput
                        value={shadow.offsetY}
                        min={-100}
                        max={100}
                        ariaLabel={`Shadow ${index + 1} offset Y`}
                        onChange={(value) =>
                            updateShadow(shadow.id, {
                                offsetY: value,
                            })
                        }
                    />
                </div>

                <div className="col-stretch-1">
                    <div className="row-center-2">
                        <label
                            htmlFor={`shadow-${shadow.id}-blur`}
                            className="text-[12px]"
                        >
                            Blur
                        </label>

                        <span className="ml-auto text-[10px] text-fg/60">
                            {shadow.blur}
                            px
                        </span>
                    </div>

                    <Range
                        value={shadow.blur}
                        min={0}
                        max={150}
                        step={1}
                        onChange={(value) =>
                            updateShadow(shadow.id, {
                                blur: value,
                            })
                        }
                    />

                    <NumberInput
                        value={shadow.blur}
                        min={0}
                        max={150}
                        ariaLabel={`Shadow ${index + 1} blur`}
                        onChange={(value) =>
                            updateShadow(shadow.id, {
                                blur: value,
                            })
                        }
                    />
                </div>

                <div className="col-stretch-1">
                    <div className="row-center-2">
                        <label
                            htmlFor={`shadow-${shadow.id}-spread`}
                            className="text-[12px]"
                        >
                            Spread
                        </label>

                        <span className="ml-auto text-[10px] text-fg/60">
                            {shadow.spread}
                            px
                        </span>
                    </div>

                    <Range
                        value={shadow.spread}
                        min={-100}
                        max={100}
                        step={1}
                        onChange={(value) =>
                            updateShadow(shadow.id, {
                                spread: value,
                            })
                        }
                    />

                    <NumberInput
                        value={shadow.spread}
                        min={-100}
                        max={100}
                        ariaLabel={`Shadow ${index + 1} spread`}
                        onChange={(value) =>
                            updateShadow(shadow.id, {
                                spread: value,
                            })
                        }
                    />
                </div>
            </div>

            <div className="row-center-2">
                <label
                    htmlFor={`shadow-${shadow.id}-color`}
                    className="text-[12px]"
                >
                    Shadow color
                </label>

                <input
                    id={`shadow-${shadow.id}-color`}
                    type="color"
                    aria-label={`Shadow ${index + 1} color`}
                    value={normalizeColor(shadow.color)}
                    onChange={(event) =>
                        updateShadow(shadow.id, {
                            color: event.target.value,
                        })
                    }
                    className="
                        ml-auto
                        h-9
                        w-12
                        cursor-pointer
                        rounded-md
                        border-0
                        bg-transparent
                        p-0
                        outline-none
                    "
                />

                <input
                    type="text"
                    aria-label={`Shadow ${index + 1} color value`}
                    value={shadow.color}
                    onChange={(event) =>
                        updateShadow(shadow.id, {
                            color: event.target.value,
                        })
                    }
                    className="
                        w-28
                        rounded-[4px]
                        bg-fg/10
                        px-2
                        py-1.5
                        text-[12px]
                        outline-none
                        transition-colors
                        hover:bg-fg/15
                        focus:bg-fg/15
                    "
                />
            </div>
        </div>
    );
};
