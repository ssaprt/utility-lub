"use client";

import { GeneralButton } from "@/components/button/GeneralButton/GeneralButton";
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
} from "@dnd-kit/sortable";

import { IconPlus } from "@tabler/icons-react";
import { motion } from "framer-motion";

import {
    useMemo,
    useRef,
    type Dispatch,
    type PointerEvent,
    type SetStateAction,
} from "react";

import type { BoxShadowConfig, BoxShadowLayer } from "./box-shadow.type";

import { boxShadowConfigToCss, clamp, createId } from "./box-shadow.utils";

import { ConfigShadow } from "./ConfigShadow";
import { ShadowEditor } from "./ShadowEditor";

export interface IsGeneratorProps {
    config: BoxShadowConfig;
    setConfig: Dispatch<SetStateAction<BoxShadowConfig>>;
}

export interface ShadowEditorProps {
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

type ResizeAxis = "x" | "y" | "xy";

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

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 6,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    );

    const { header } = useAppContextValues();

    const { isScrolled } = header || {};

    const boxShadow = useMemo(() => {
        return boxShadowConfigToCss(config);
    }, [config]);

    const css = useMemo(() => {
        return `box-shadow: ${boxShadow};`;
    }, [boxShadow]);

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

    const handleDragEnd = ({ active, over }: DragEndEvent) => {
        if (!over) {
            return;
        }

        if (active.id === over.id) {
            return;
        }

        setConfig((current) => {
            const oldIndex = current.shadows.findIndex(
                (shadow) => shadow.id === active.id,
            );

            const newIndex = current.shadows.findIndex(
                (shadow) => shadow.id === over.id,
            );

            if (oldIndex === -1 || newIndex === -1) {
                return current;
            }

            return {
                ...current,

                shadows: arrayMove(current.shadows, oldIndex, newIndex),
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
        <div className="col-stretch-1 lg:row-stretch-4 w-full relative">
            <div
                ref={previewRef}
                className="
                    relative
                    lg:sticky
                    lg:top-0
                    flex
                    h-[420px]
                    w-full
                    lg:w-1/3
                    items-center
                    justify-center
                    overflow-hidden
                    rounded-xl
                    shadow-inner
                    shadow-black/10
                      z-22222
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

                    <motion.div
                        onClick={() =>
                            document
                                .querySelector<HTMLElement>("#main")
                                ?.scrollTo({
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
                </div>
            </div>

            <div className="col-center-1 flex-1">
                <ConfigShadow config={config} setConfig={setConfig} />

                <div className="col-stretch-2 w-full">
                    <div className="row-center-2 p-2 bg-fg/5 rounded-xl justify-between">
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

                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd}
                    >
                        <SortableContext
                            items={config.shadows.map((shadow) => shadow.id)}
                            strategy={rectSortingStrategy}
                        >
                            <div
                                className="
                                    col-stretch-2
                                    lg:grid
                                    lg:grid-cols-2
                                    lg:gap-2
                                "
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
                            </div>
                        </SortableContext>
                    </DndContext>

                    <div className="col-start-2 w-full p-2 rounded-xl bg-fg/10">
                        <GeneralButton
                            textButton="Copy CSS"
                            copy={{
                                copyItem: css,
                            }}
                            variant="soft"
                        />

                        <div
                            className="
                                p-3
                                transition-colors
                                duration-200
                                hover:bg-black/25
                                w-full
                                rounded-xl
                            "
                        >
                            <code className="text-[12px] break-all">{css}</code>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
