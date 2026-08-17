"use client";

import { GeneralButton } from "@/components/button/GeneralButton/GeneralButton";
import { Range } from "@/components/input/range/Range";
import { useAppContextValues } from "@/context/appContext";

import {
    IconChevronDown,
    IconChevronUp,
    IconCopy,
    IconGripVertical,
    IconPlus,
    IconTrash,
} from "@tabler/icons-react";

import { Reorder, motion, useDragControls } from "framer-motion";

import {
    useMemo,
    useRef,
    type Dispatch,
    type PointerEvent,
    type SetStateAction,
} from "react";

import type { BoxShadowConfig, BoxShadowLayer } from "./box-shadow.type";

import { boxShadowConfigToCss } from "./box-shadow.utils";

interface IsGeneratorProps {
    config: BoxShadowConfig;
    setConfig: Dispatch<SetStateAction<BoxShadowConfig>>;
}

interface ShadowEditorProps {
    shadow: BoxShadowLayer;
    index: number;
    total: number;

    updateShadow: (
        id: string,
        values: Partial<Omit<BoxShadowLayer, "id">>,
    ) => void;

    removeShadow: (id: string) => void;

    duplicateShadow: (id: string) => void;
}

interface NumberInputProps {
    value: number;
    min: number;
    max: number;
    step?: number;
    ariaLabel: string;
    onChange: (value: number) => void;
}

type ResizeAxis = "x" | "y" | "xy";

const clamp = (value: number, min: number, max: number) => {
    return Math.min(Math.max(value, min), max);
};

const createId = () => {
    return crypto.randomUUID();
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

const ShadowEditor = ({
    shadow,
    index,
    total,
    updateShadow,
    removeShadow,
    duplicateShadow,
}: ShadowEditorProps) => {
    const dragControls = useDragControls();

    return (
        <Reorder.Item
            value={shadow}
            dragListener={false}
            dragControls={dragControls}
            layout
            className="
                col-stretch-3
                rounded-[8px]
                border
                border-fg/8
                bg-fg/5
                p-3
                shadow-sm
                shadow-black/5
            "
        >
            <div className="row-center-2 w-full">
                <button
                    type="button"
                    aria-label={`Reorder shadow ${index + 1}`}
                    onPointerDown={(event) => dragControls.start(event)}
                    className="
                        row-center-0
                        shrink-0
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
                        <span className="text-[12px]">Offset X</span>

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
                        <span className="text-[12px]">Offset Y</span>

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
                        <span className="text-[12px]">Blur</span>

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
                        <span className="text-[12px]">Spread</span>

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
        </Reorder.Item>
    );
};

export const IsGenerator = ({ config, setConfig }: IsGeneratorProps) => {
    const previewRef = useRef<HTMLDivElement>(null);

    const resizeState = useRef<{
        axis: ResizeAxis;
        startX: number;
        startY: number;
        startWidth: number;
        startHeight: number;
    }>({
        axis: "xy",
        startX: 0,
        startY: 0,
        startWidth: config.boxWidth,
        startHeight: config.boxHeight,
    });

    const { header } = useAppContextValues();

    const { isScrolled } = header || {};

    const boxShadow = useMemo(() => {
        return boxShadowConfigToCss(config);
    }, [config]);

    const css = useMemo(() => {
        return `box-shadow: ${boxShadow};`;
    }, [boxShadow]);

    const updateConfig = <K extends keyof BoxShadowConfig>(
        key: K,
        value: BoxShadowConfig[K],
    ) => {
        setConfig((current) => ({
            ...current,
            [key]: value,
        }));
    };

    const updateShadow = (
        id: string,
        values: Partial<Omit<BoxShadowLayer, "id">>,
    ) => {
        setConfig((current) => ({
            ...current,

            shadows: current.shadows.map((shadow) =>
                shadow.id === id
                    ? {
                          ...shadow,
                          ...values,
                      }
                    : shadow,
            ),
        }));
    };

    const addShadow = () => {
        setConfig((current) => ({
            ...current,

            shadows: [
                ...current.shadows,
                {
                    id: createId(),
                    offsetX: 0,
                    offsetY: 10,
                    blur: 25,
                    spread: -5,
                    color: "#00000040",
                    inset: false,
                },
            ],
        }));
    };

    const duplicateShadow = (id: string) => {
        setConfig((current) => {
            const index = current.shadows.findIndex(
                (shadow) => shadow.id === id,
            );

            if (index === -1) {
                return current;
            }

            const next = [...current.shadows];

            next.splice(index + 1, 0, {
                ...current.shadows[index],
                id: createId(),
            });

            return {
                ...current,
                shadows: next,
            };
        });
    };

    const removeShadow = (id: string) => {
        setConfig((current) => {
            if (current.shadows.length <= 1) {
                return current;
            }

            return {
                ...current,

                shadows: current.shadows.filter((shadow) => shadow.id !== id),
            };
        });
    };

    const getResizeLimits = () => {
        const preview = previewRef.current;

        if (!preview) {
            return {
                maxWidth: 340,
                maxHeight: 340,
            };
        }

        return {
            maxWidth: Math.max(80, preview.clientWidth - 60),

            maxHeight: Math.max(80, preview.clientHeight - 60),
        };
    };

    const handleResizeStart = (
        event: PointerEvent<HTMLButtonElement>,
        axis: ResizeAxis,
    ) => {
        event.currentTarget.setPointerCapture(event.pointerId);

        resizeState.current = {
            axis,
            startX: event.clientX,
            startY: event.clientY,
            startWidth: config.boxWidth,
            startHeight: config.boxHeight,
        };
    };

    const handleResizeMove = (event: PointerEvent<HTMLButtonElement>) => {
        if (!event.currentTarget.hasPointerCapture(event.pointerId)) {
            return;
        }

        const { axis, startX, startY, startWidth, startHeight } =
            resizeState.current;

        const { maxWidth, maxHeight } = getResizeLimits();

        const deltaX = event.clientX - startX;

        const deltaY = event.clientY - startY;

        const nextWidth =
            axis === "x" || axis === "xy"
                ? clamp(Math.round(startWidth + deltaX * 2), 80, maxWidth)
                : config.boxWidth;

        const nextHeight =
            axis === "y" || axis === "xy"
                ? clamp(Math.round(startHeight + deltaY * 2), 80, maxHeight)
                : config.boxHeight;

        setConfig((current) => ({
            ...current,

            boxWidth:
                axis === "x" || axis === "xy" ? nextWidth : current.boxWidth,

            boxHeight:
                axis === "y" || axis === "xy" ? nextHeight : current.boxHeight,
        }));
    };

    const handleResizeEnd = (event: PointerEvent<HTMLButtonElement>) => {
        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId);
        }
    };

    const scroll = (isScrolled?.scroll.scrollTop ?? 0) > 380;

    return (
        <div className="col-stretch-4 w-full">
            <div
                ref={previewRef}
                className="
                    relative
                    flex
                    h-[420px]
                    w-full
                    items-center
                    justify-center
                    overflow-hidden
                    rounded-xl
                    shadow-inner
                    shadow-black/10
                "
                style={{
                    backgroundColor: config.canvasColor,
                }}
            >
                <div
                    className="
                        relative
                        shrink-0
                        transition-[background-color,box-shadow]
                        duration-200
                    "
                    style={{
                        width: `${config.boxWidth}px`,
                        height: `${config.boxHeight}px`,

                        maxWidth: "calc(100% - 60px)",

                        maxHeight: "calc(100% - 60px)",

                        backgroundColor: config.boxColor,

                        boxShadow,
                    }}
                >
                    <button
                        type="button"
                        aria-label="Resize width"
                        onPointerDown={(event) => handleResizeStart(event, "x")}
                        onPointerMove={handleResizeMove}
                        onPointerUp={handleResizeEnd}
                        onPointerCancel={handleResizeEnd}
                        className="
                            absolute
                            top-1/2
                            right-[-5px]
                            z-2
                            h-10
                            w-[7px]
                            -translate-y-1/2
                            touch-none
                            cursor-ew-resize
                            rounded-[2px]
                            border
                            border-fg
                            bg-app
                            shadow-sm
                            shadow-black/20
                            transition-[width,background,color]
                            duration-150
                            hover:w-[9px]
                            hover:bg-fg
                            hover:text-app
                        "
                    />

                    <button
                        type="button"
                        aria-label="Resize height"
                        onPointerDown={(event) => handleResizeStart(event, "y")}
                        onPointerMove={handleResizeMove}
                        onPointerUp={handleResizeEnd}
                        onPointerCancel={handleResizeEnd}
                        className="
                            absolute
                            bottom-[-5px]
                            left-1/2
                            z-2
                            h-[7px]
                            w-10
                            -translate-x-1/2
                            touch-none
                            cursor-ns-resize
                            rounded-[2px]
                            border
                            border-fg
                            bg-app
                            shadow-sm
                            shadow-black/20
                            transition-[height,background,color]
                            duration-150
                            hover:h-[9px]
                            hover:bg-fg
                            hover:text-app
                        "
                    />

                    <button
                        type="button"
                        aria-label="Resize width and height"
                        onPointerDown={(event) =>
                            handleResizeStart(event, "xy")
                        }
                        onPointerMove={handleResizeMove}
                        onPointerUp={handleResizeEnd}
                        onPointerCancel={handleResizeEnd}
                        className="
                            absolute
                            right-[-5px]
                            bottom-[-5px]
                            z-3
                            size-[11px]
                            touch-none
                            cursor-nwse-resize
                            rounded-[2px]
                            border
                            border-fg
                            bg-app
                            shadow-sm
                            shadow-black/25
                            transition-[transform,background]
                            duration-150
                            hover:scale-125
                            hover:bg-fg
                        "
                    />
                </div>

                <div
                    className="
                        absolute
                        bottom-3
                        left-3
                        rounded-[6px]
                        bg-black/40
                        px-2
                        py-1
                        text-[10px]
                        text-white
                        backdrop-blur-sm
                    "
                >
                    {config.boxWidth}
                    {" × "}
                    {config.boxHeight}
                    px
                </div>
            </div>

            <motion.div
                onClick={() =>
                    document.querySelector<HTMLElement>("#main")?.scrollTo({
                        top: 0,
                        behavior: "smooth",
                    })
                }
                animate={{
                    opacity: scroll ? 1 : 0,

                    x: scroll ? 0 : "100%",
                }}
                transition={{
                    type: "spring",

                    stiffness: scroll ? 100 : 500,

                    damping: scroll ? 8 : 24,

                    mass: 0.4,
                }}
                className="
                    fixed
                    z-2
                    flex
                    size-[100px]
                    cursor-pointer
                    items-center
                    justify-center
                    overflow-hidden
                    rounded-xl
                    shadow-lg
                    shadow-black/80
                "
                style={{
                    right: "20px",
                    top: "90px",

                    backgroundColor: config.canvasColor,
                }}
            >
                <div
                    className="size-[50px]"
                    style={{
                        backgroundColor: config.boxColor,

                        boxShadow,
                    }}
                />
            </motion.div>

            <div
                className="
                    grid
                    grid-cols-1
                    gap-3
                    sm:grid-cols-2
                "
            >
                <div
                    className="
                        row-center-2
                        rounded-[8px]
                        bg-fg/5
                        p-3
                    "
                >
                    <label
                        htmlFor="box-shadow-canvas-color"
                        className="text-[12px]"
                    >
                        Background color
                    </label>

                    <input
                        id="box-shadow-canvas-color"
                        type="color"
                        value={normalizeColor(config.canvasColor)}
                        onChange={(event) =>
                            updateConfig("canvasColor", event.target.value)
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
                        "
                    />

                    <input
                        type="text"
                        aria-label="Background color value"
                        value={config.canvasColor}
                        onChange={(event) =>
                            updateConfig("canvasColor", event.target.value)
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

                <div
                    className="
                        row-center-2
                        rounded-[8px]
                        bg-fg/5
                        p-3
                    "
                >
                    <label
                        htmlFor="box-shadow-box-color"
                        className="text-[12px]"
                    >
                        Block color
                    </label>

                    <input
                        id="box-shadow-box-color"
                        type="color"
                        value={normalizeColor(config.boxColor)}
                        onChange={(event) =>
                            updateConfig("boxColor", event.target.value)
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
                        "
                    />

                    <input
                        type="text"
                        aria-label="Block color value"
                        value={config.boxColor}
                        onChange={(event) =>
                            updateConfig("boxColor", event.target.value)
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

            <div
                className="
                    grid
                    grid-cols-1
                    gap-3
                    sm:grid-cols-2
                "
            >
                <div
                    className="
                        col-stretch-2
                        rounded-[8px]
                        bg-fg/5
                        p-3
                    "
                >
                    <div className="row-center-2">
                        <span className="text-[12px]">Width</span>

                        <span className="ml-auto text-[10px] text-fg/60">
                            {config.boxWidth}
                            px
                        </span>
                    </div>

                    <Range
                        value={config.boxWidth}
                        min={80}
                        max={340}
                        step={1}
                        onChange={(value) => updateConfig("boxWidth", value)}
                    />

                    <NumberInput
                        value={config.boxWidth}
                        min={80}
                        max={340}
                        ariaLabel="Block width"
                        onChange={(value) => updateConfig("boxWidth", value)}
                    />
                </div>

                <div
                    className="
                        col-stretch-2
                        rounded-[8px]
                        bg-fg/5
                        p-3
                    "
                >
                    <div className="row-center-2">
                        <span className="text-[12px]">Height</span>

                        <span className="ml-auto text-[10px] text-fg/60">
                            {config.boxHeight}
                            px
                        </span>
                    </div>

                    <Range
                        value={config.boxHeight}
                        min={80}
                        max={340}
                        step={1}
                        onChange={(value) => updateConfig("boxHeight", value)}
                    />

                    <NumberInput
                        value={config.boxHeight}
                        min={80}
                        max={340}
                        ariaLabel="Block height"
                        onChange={(value) => updateConfig("boxHeight", value)}
                    />
                </div>
            </div>

            <div className="col-stretch-2">
                <div className="row-center-2">
                    <span className="text-[12px]">
                        Shadows ({config.shadows.length})
                    </span>

                    <GeneralButton
                        icon={<IconPlus />}
                        textButton="Add shadow"
                        variant="soft"
                        handleAction={addShadow}
                    />
                </div>

                <Reorder.Group
                    axis="y"
                    values={config.shadows}
                    onReorder={(shadows) => updateConfig("shadows", shadows)}
                    className="col-stretch-2"
                >
                    {config.shadows.map((shadow, index) => (
                        <ShadowEditor
                            key={shadow.id}
                            shadow={shadow}
                            index={index}
                            total={config.shadows.length}
                            updateShadow={updateShadow}
                            removeShadow={removeShadow}
                            duplicateShadow={duplicateShadow}
                        />
                    ))}
                </Reorder.Group>
            </div>

            <div className="row-center-2 flex-wrap">
                <GeneralButton
                    textButton="Copy CSS"
                    copy={{
                        copyItem: css,
                    }}
                    variant="soft"
                />
            </div>

            <div
                className="
                    rounded-lg
                    bg-black/20
                    p-3
                    transition-colors
                    duration-200
                    hover:bg-black/25
                "
            >
                <code className="text-[12px] break-all">{css}</code>
            </div>
        </div>
    );
};
