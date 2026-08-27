"use client";

import { BlockWithTextarea } from "@/components/blocks/block-with-textarea/BlockWithTextarea";
import { useAppContextValues } from "@/context/appContext";

import {
    DndContext,
    KeyboardSensor,
    PointerSensor,
    closestCenter,
    useSensor,
    useSensors,
    type DragEndEvent,
} from "@dnd-kit/core";

import {
    SortableContext,
    arrayMove,
    rectSortingStrategy,
    sortableKeyboardCoordinates,
    useSortable,
} from "@dnd-kit/sortable";

import { CSS } from "@dnd-kit/utilities";
import { IconGripVertical } from "@tabler/icons-react";
import { motion } from "framer-motion";

import {
    useEffect,
    useMemo,
    useRef,
    useState,
    type CSSProperties,
    type Dispatch,
    type PointerEvent,
    type SetStateAction,
} from "react";

import { ConfigGrid } from "./ConfigGrid";

import type { GridConfig, GridItemConfig } from "./grid.type";

import {
    clamp,
    gridConfigToCss,
    gridConfigToHtml,
    gridItemToStyle,
} from "./grid.utils";

export interface IsGeneratorProps {
    config: GridConfig;

    setConfig: Dispatch<SetStateAction<GridConfig>>;
}

interface SortableGridItemProps {
    item: GridItemConfig;

    index: number;

    selected: boolean;

    onSelect: () => void;
}

type ResizeAxis = "x" | "y" | "xy";

const SortableGridItem = ({
    item,
    index,
    selected,
    onSelect,
}: SortableGridItemProps) => {
    const {
        attributes,
        listeners,

        setNodeRef,
        setActivatorNodeRef,

        transform,
        transition,

        isDragging,
    } = useSortable({
        id: item.id,
    });

    const style: CSSProperties = {
        ...gridItemToStyle(item),

        transform: CSS.Transform.toString(transform),

        transition,

        zIndex: isDragging ? 100 : selected ? 10 : 1,

        opacity: isDragging ? 0.65 : 1,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            onClick={onSelect}
            className={`
                group
                relative

                flex

                min-h-0
                min-w-0

                cursor-pointer
                select-none

                items-center
                justify-center

                overflow-hidden

                rounded-[3px]

                border

                transition-[background-color,border-color,box-shadow,opacity]
                duration-150

                ${
                    selected
                        ? `
                            border-fg
                            bg-fg
                            text-app

                            shadow-md
                            shadow-black/20
                        `
                        : `
                            border-fg/15
                            bg-fg/5
                            text-fg

                            shadow-sm
                            shadow-black/10

                            hover:border-fg/70
                            hover:shadow-black/40
                        `
                }

                ${
                    isDragging
                        ? `
                            shadow-lg
                            shadow-black/30
                        `
                        : ""
                }
            `}
        >
            <span
                className={`
                    pointer-events-none

                    text-[16px]
                    font-semibold
                    leading-none

                    ${selected ? "text-app" : "text-fg"}
                `}
            >
                {index + 1}
            </span>

            <div
                ref={setActivatorNodeRef}
                {...attributes}
                {...listeners}
                onClick={(event) => {
                    event.stopPropagation();
                }}
                className={`
                    absolute
                    top-1
                    right-1
                    z-20

                    flex

                    h-[22px]
                    w-[17px]

                    touch-none
                    cursor-grab

                    items-center
                    justify-center

                    rounded-[2px]

                    border

                    transition-colors
                    duration-150

                    active:cursor-grabbing

                    ${
                        selected
                            ? `
                                border-app/20
                                bg-app/10
                                text-app/70

                                hover:bg-app/20
                                hover:text-app
                            `
                            : `
                                border-fg/15
                                bg-app/60
                                text-fg/60

                                hover:border-fg/40
                                hover:bg-app
                                hover:text-fg
                            `
                    }
                `}
            >
                <IconGripVertical className="size-[13px]" />
            </div>
        </div>
    );
};

const PreviewGridItem = ({
    item,
    index,
}: {
    item: GridItemConfig;

    index: number;
}) => {
    return (
        <div
            style={{
                ...gridItemToStyle(item),
            }}
            className="
                flex
                min-h-0
                min-w-0

                items-center
                justify-center

                overflow-hidden

                border
                border-fg/20

                bg-fg
                text-app
            "
        >
            <span
                className="
                    text-[16px]
                    font-semibold
                    leading-none
                "
            >
                {index + 1}
            </span>
        </div>
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

        startWidth: config.containerWidth,

        startHeight: config.containerHeight,
    });

    const [selectedItemId, setSelectedItemId] = useState<string | null>(
        config.items[0]?.id ?? null,
    );

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5,
            },
        }),

        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    );

    const { header } = useAppContextValues();

    const { isScrolled } = header || {};

    const scroll = (isScrolled?.scroll.scrollTop ?? 0) > 380;

    useEffect(() => {
        if (config.items.length === 0) {
            if (selectedItemId !== null) {
                //eslint-disable-next-line
                setSelectedItemId(null);
            }

            return;
        }

        const exists = config.items.some((item) => item.id === selectedItemId);

        if (!exists) {
            setSelectedItemId(config.items[0].id);
        }
    }, [config.items, selectedItemId]);

    const css = useMemo(() => {
        return gridConfigToCss(config);
    }, [config]);

    const html = useMemo(() => {
        return gridConfigToHtml(config);
    }, [config]);

    const handleDragEnd = ({ active, over }: DragEndEvent) => {
        if (!over) {
            return;
        }

        setSelectedItemId(String(active.id));

        if (active.id === over.id) {
            return;
        }

        setConfig((current) => {
            const oldIndex = current.items.findIndex(
                (item) => item.id === active.id,
            );

            const newIndex = current.items.findIndex(
                (item) => item.id === over.id,
            );

            if (oldIndex === -1 || newIndex === -1) {
                return current;
            }

            return {
                ...current,

                items: arrayMove(current.items, oldIndex, newIndex),
            };
        });
    };

    const getResizeLimits = () => {
        const preview = previewRef.current;

        if (!preview) {
            return {
                maxWidth: 800,

                maxHeight: 600,
            };
        }

        return {
            maxWidth: Math.max(
                200,

                Math.min(800, preview.clientWidth),
            ),

            maxHeight: Math.max(
                160,

                Math.min(600, preview.clientHeight),
            ),
        };
    };

    const handleResizeStart = (
        event: PointerEvent<HTMLDivElement>,

        axis: ResizeAxis,
    ) => {
        event.preventDefault();

        event.currentTarget.setPointerCapture(event.pointerId);

        resizeState.current = {
            axis,

            startX: event.clientX,

            startY: event.clientY,

            startWidth: config.containerWidth,

            startHeight: config.containerHeight,
        };
    };

    const handleResizeMove = (event: PointerEvent<HTMLDivElement>) => {
        if (!event.currentTarget.hasPointerCapture(event.pointerId)) {
            return;
        }

        const {
            axis,

            startX,
            startY,

            startWidth,
            startHeight,
        } = resizeState.current;

        const { maxWidth, maxHeight } = getResizeLimits();

        const deltaX = event.clientX - startX;

        const deltaY = event.clientY - startY;

        const nextWidth =
            axis === "x" || axis === "xy"
                ? clamp(
                      Math.round(startWidth + deltaX * 2),

                      200,

                      maxWidth,
                  )
                : config.containerWidth;

        const nextHeight =
            axis === "y" || axis === "xy"
                ? clamp(
                      Math.round(startHeight + deltaY * 2),

                      160,

                      maxHeight,
                  )
                : config.containerHeight;

        setConfig((current) => ({
            ...current,

            containerWidth:
                axis === "x" || axis === "xy"
                    ? nextWidth
                    : current.containerWidth,

            containerHeight:
                axis === "y" || axis === "xy"
                    ? nextHeight
                    : current.containerHeight,
        }));
    };

    const handleResizeEnd = (event: PointerEvent<HTMLDivElement>) => {
        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId);
        }
    };

    const floatingScale = Math.min(
        84 / config.containerWidth,

        84 / config.containerHeight,
    );

    return (
        <div
            className="
                relative
                col-stretch-1
                w-full

                lg:row-stretch-4
            "
        >
            <div
                ref={previewRef}
                className="
                    relative
                    z-2

                    flex
                    
                    h-[460px]
                    w-full

                    items-center
                    justify-center

                    overflow-visible

                    lg:sticky
                    lg:top-0
                    lg:min-w-[400px]
                    lg:w-1/2
                "
            >
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                >
                    <SortableContext
                        items={config.items.map((item) => item.id)}
                        strategy={rectSortingStrategy}
                    >
                        <div
                            className="
                                relative
                                shrink-0
                            "
                            style={{
                                width: `${config.containerWidth}px`,

                                height: `${config.containerHeight}px`,

                                maxWidth: "100%",

                                maxHeight: "100%",
                            }}
                        >
                            <div
                                className="
                                    absolute
                                    inset-0
                                    p-2
                                    overflow-auto

                                    border
                                    border-fg/10

                                    shadow-md
                                    shadow-black/10
                                "
                                style={{
                                    display: "grid",

                                    gridTemplateColumns: `repeat(${config.columns}, minmax(0, 1fr))`,

                                    gridTemplateRows: `repeat(${config.rows}, minmax(0, 1fr))`,

                                    gridAutoFlow: config.autoFlow,

                                    justifyItems: config.justifyItems,

                                    alignItems: config.alignItems,

                                    rowGap: `${config.rowGap}px`,

                                    columnGap: `${config.columnGap}px`,
                                }}
                            >
                                {config.items.map((item, index) => (
                                    <SortableGridItem
                                        key={item.id}
                                        item={item}
                                        index={index}
                                        selected={selectedItemId === item.id}
                                        onSelect={() =>
                                            setSelectedItemId(item.id)
                                        }
                                    />
                                ))}
                            </div>

                            <div
                                role="slider"
                                tabIndex={0}
                                aria-label="Resize grid width"
                                onPointerDown={(event) =>
                                    handleResizeStart(event, "x")
                                }
                                onPointerMove={handleResizeMove}
                                onPointerUp={handleResizeEnd}
                                onPointerCancel={handleResizeEnd}
                                className="
                                    absolute
                                    top-1/2
                                    right-0
                                    z-50

                                    h-8
                                    w-[5px]

                                    -translate-y-1/2

                                    touch-none
                                    cursor-ew-resize

                                    bg-fg/50

                                    transition-[width,background-color]
                                    duration-150

                                    hover:w-[7px]
                                    hover:bg-fg
                                "
                            />

                            <div
                                role="slider"
                                tabIndex={0}
                                aria-label="Resize grid height"
                                onPointerDown={(event) =>
                                    handleResizeStart(event, "y")
                                }
                                onPointerMove={handleResizeMove}
                                onPointerUp={handleResizeEnd}
                                onPointerCancel={handleResizeEnd}
                                className="
                                    absolute
                                    bottom-0
                                    left-1/2
                                    z-50

                                    h-[5px]
                                    w-8

                                    -translate-x-1/2

                                    touch-none
                                    cursor-ns-resize

                                    bg-fg/50

                                    transition-[height,background-color]
                                    duration-150

                                    hover:h-[7px]
                                    hover:bg-fg
                                "
                            />

                            <div
                                role="slider"
                                tabIndex={0}
                                aria-label="Resize grid"
                                onPointerDown={(event) =>
                                    handleResizeStart(event, "xy")
                                }
                                onPointerMove={handleResizeMove}
                                onPointerUp={handleResizeEnd}
                                onPointerCancel={handleResizeEnd}
                                className="
                                    absolute
                                    right-0
                                    bottom-0
                                    z-[60]

                                    size-[10px]

                                    touch-none
                                    cursor-nwse-resize

                                    bg-fg
                                "
                            />

                            <div
                                className="
                                    pointer-events-none

                                    absolute
                                    bottom-1
                                    left-1
                                    z-40

                                    bg-black/40

                                    px-1
                                    py-0.5

                                    text-[8px]
                                    text-white/80
                                "
                            >
                                {config.containerWidth}

                                {" × "}

                                {config.containerHeight}
                            </div>
                        </div>
                    </SortableContext>
                </DndContext>

                <motion.div
                    onClick={() =>
                        isScrolled?.main?.scrollTo({
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
                        z-[100]

                        h-[100px]
                        w-[100px]

                        cursor-pointer

                        overflow-hidden

                        border
                        border-fg/10

                        bg-app

                        shadow-lg
                        shadow-black/80
                    "
                    style={{
                        right: "20px",

                        top: "90px",

                        pointerEvents: scroll ? "auto" : "none",
                    }}
                >
                    <div
                        className="
                            relative

                            flex

                            size-full

                            items-center
                            justify-center

                            overflow-hidden
                        "
                    >
                        <div
                            className="
                                absolute

                                border
                                border-fg/10
                            "
                            style={{
                                width: `${config.containerWidth}px`,

                                height: `${config.containerHeight}px`,

                                display: "grid",

                                gridTemplateColumns: `repeat(${config.columns}, minmax(0, 1fr))`,

                                gridTemplateRows: `repeat(${config.rows}, minmax(0, 1fr))`,

                                gridAutoFlow: config.autoFlow,

                                justifyItems: config.justifyItems,

                                alignItems: config.alignItems,

                                rowGap: `${config.rowGap}px`,

                                columnGap: `${config.columnGap}px`,

                                transform: `scale(${floatingScale})`,

                                transformOrigin: "center center",
                            }}
                        >
                            {config.items.map((item, index) => (
                                <PreviewGridItem
                                    key={item.id}
                                    item={item}
                                    index={index}
                                />
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>

            <div
                className="
                    col-center-2
                    min-w-0
                    flex-1
                "
            >
                <ConfigGrid
                    config={config}
                    setConfig={setConfig}
                    selectedItemId={selectedItemId}
                    setSelectedItemId={setSelectedItemId}
                />

                <div
                    className="
                        col-stretch-2
                        w-full

                    "
                >
                    <BlockWithTextarea
                        title="CSS"
                        placeholder="Generated grid CSS"
                        copy
                        result={css}
                    />

                    <BlockWithTextarea
                        title="HTML"
                        placeholder="Generated HTML"
                        copy
                        result={html}
                    />
                </div>
            </div>
        </div>
    );
};
