"use client";

import { GeneralButton } from "@/components/button/GeneralButton/GeneralButton";
import { NumberInput } from "@/components/input/Number/Number";
import { Range } from "@/components/input/range/Range";

import { IconPlus, IconRestore, IconTrash } from "@tabler/icons-react";

import type { Dispatch, ReactNode, SetStateAction } from "react";

import {
    createDefaultGridConfig,
    createGridItem,
    gridAlignItemsValues,
    gridAlignSelfValues,
    gridAutoFlowValues,
    gridJustifyItemsValues,
    gridJustifySelfValues,
    type GridConfig,
    type GridItemConfig,
} from "./grid.type";

import { createId } from "./grid.utils";

interface ConfigGridProps {
    config: GridConfig;

    setConfig: Dispatch<SetStateAction<GridConfig>>;

    selectedItemId: string | null;

    setSelectedItemId: Dispatch<SetStateAction<string | null>>;
}

const CompactTitle = ({
    children,
    value,
}: {
    children: ReactNode;

    value?: ReactNode;
}) => {
    return (
        <div className="row-center-2 min-h-5">
            <span className="text-[11px] text-fg/80">{children}</span>

            {value !== undefined && (
                <span className="ml-auto text-[10px] text-fg/45">{value}</span>
            )}
        </div>
    );
};

const ButtonGroup = ({ children }: { children: ReactNode }) => {
    return (
        <div
            className="
                row-center-1
                w-fit
                max-w-full
                flex-wrap
                rounded-[4px]
                bg-fg/5
                p-0.5
            "
        >
            {children}
        </div>
    );
};

export const ConfigGrid = ({
    config,
    setConfig,

    selectedItemId,
    setSelectedItemId,
}: ConfigGridProps) => {
    const selectedItem =
        config.items.find((item) => item.id === selectedItemId) ?? null;

    const selectedIndex = config.items.findIndex(
        (item) => item.id === selectedItemId,
    );

    const updateConfig = <K extends keyof GridConfig>(
        key: K,
        value: GridConfig[K],
    ) => {
        setConfig((current) => ({
            ...current,

            [key]: value,
        }));
    };

    const updateItem = (values: Partial<Omit<GridItemConfig, "id">>) => {
        if (!selectedItemId) {
            return;
        }

        setConfig((current) => ({
            ...current,

            items: current.items.map((item) =>
                item.id === selectedItemId
                    ? {
                          ...item,
                          ...values,
                      }
                    : item,
            ),
        }));
    };

    const updateColumns = (value: number) => {
        setConfig((current) => ({
            ...current,

            columns: value,

            items: current.items.map((item) => ({
                ...item,

                columnStart:
                    item.columnStart === null
                        ? null
                        : Math.min(item.columnStart, value),

                columnSpan: Math.min(item.columnSpan, value),
            })),
        }));
    };

    const updateRows = (value: number) => {
        setConfig((current) => ({
            ...current,

            rows: value,

            items: current.items.map((item) => ({
                ...item,

                rowStart:
                    item.rowStart === null
                        ? null
                        : Math.min(item.rowStart, value),

                rowSpan: Math.min(item.rowSpan, value),
            })),
        }));
    };

    const addItem = () => {
        const id = createId();

        setConfig((current) => ({
            ...current,

            items: [...current.items, createGridItem(id)],
        }));

        setSelectedItemId(id);
    };

    const removeItem = () => {
        if (!selectedItemId || config.items.length <= 1) {
            return;
        }

        const index = config.items.findIndex(
            (item) => item.id === selectedItemId,
        );

        const nextItems = config.items.filter(
            (item) => item.id !== selectedItemId,
        );

        const nextIndex = Math.min(
            Math.max(index - 1, 0),

            nextItems.length - 1,
        );

        setConfig((current) => ({
            ...current,

            items: current.items.filter((item) => item.id !== selectedItemId),
        }));

        setSelectedItemId(nextItems[nextIndex]?.id ?? null);
    };

    const clear = () => {
        const next = createDefaultGridConfig();

        setConfig(next);

        setSelectedItemId(next.items[0]?.id ?? null);
    };

    return (
        <div className="col-stretch-2 w-full">
            <div
                className="
                    row-center-2
                    w-full
                    rounded-[5px]
                    bg-fg/5
                    p-1.5
                "
            >
                <span className="pl-1 text-[12px] font-medium">Grid</span>

                <span className="text-[10px] text-fg/40">
                    {config.items.length} blocks
                </span>

                <div
                    className="
                        ml-auto
                        row-center-1
                        w-fit
                        rounded-[4px]
                        bg-fg/5
                        p-0.5
                    "
                >
                    <GeneralButton
                        variant="ghost"
                        icon={<IconPlus className="size-4" />}
                        textButton="Add"
                        handleAction={addItem}
                    />

                    <GeneralButton
                        variant="ghost"
                        icon={<IconRestore className="size-4" />}
                        textButton="Clear"
                        handleAction={clear}
                    />
                </div>
            </div>

            <div
                className="
                    grid
                    grid-cols-1
                    gap-1.5

                    sm:grid-cols-2
                "
            >
                <div
                    className="
                        col-stretch-1
                        rounded-[5px]
                        border
                        border-fg/5
                        bg-fg/10
                        p-2
                    "
                >
                    <CompactTitle value={`${config.containerWidth}px`}>
                        Width
                    </CompactTitle>

                    <Range
                        value={config.containerWidth}
                        min={200}
                        max={800}
                        step={1}
                        onChange={(value) =>
                            updateConfig("containerWidth", value)
                        }
                    />

                    <NumberInput
                        value={config.containerWidth}
                        min={200}
                        max={800}
                        ariaLabel="Grid width"
                        onChange={(value) =>
                            updateConfig("containerWidth", value)
                        }
                    />
                </div>

                <div
                    className="
                        col-stretch-1
                        rounded-[5px]
                        border
                        border-fg/5
                        bg-fg/10
                        p-2
                    "
                >
                    <CompactTitle value={`${config.containerHeight}px`}>
                        Height
                    </CompactTitle>

                    <Range
                        value={config.containerHeight}
                        min={160}
                        max={600}
                        step={1}
                        onChange={(value) =>
                            updateConfig("containerHeight", value)
                        }
                    />

                    <NumberInput
                        value={config.containerHeight}
                        min={160}
                        max={600}
                        ariaLabel="Grid height"
                        onChange={(value) =>
                            updateConfig("containerHeight", value)
                        }
                    />
                </div>
            </div>

            <div
                className="
                    grid
                    grid-cols-1
                    gap-1.5

                    sm:grid-cols-2
                "
            >
                <div
                    className="
                        col-stretch-1
                        rounded-[5px]
                        border
                        border-fg/5
                        bg-fg/10
                        p-2
                    "
                >
                    <CompactTitle value={config.columns}>Columns</CompactTitle>

                    <Range
                        value={config.columns}
                        min={1}
                        max={8}
                        step={1}
                        onChange={updateColumns}
                    />

                    <NumberInput
                        value={config.columns}
                        min={1}
                        max={8}
                        ariaLabel="Grid columns"
                        onChange={updateColumns}
                    />
                </div>

                <div
                    className="
                        col-stretch-1
                        rounded-[5px]
                        border
                        border-fg/5
                        bg-fg/10
                        p-2
                    "
                >
                    <CompactTitle value={config.rows}>Rows</CompactTitle>

                    <Range
                        value={config.rows}
                        min={1}
                        max={8}
                        step={1}
                        onChange={updateRows}
                    />

                    <NumberInput
                        value={config.rows}
                        min={1}
                        max={8}
                        ariaLabel="Grid rows"
                        onChange={updateRows}
                    />
                </div>
            </div>

            <div
                className="
                    col-stretch-1
                    rounded-[5px]
                    border
                    border-fg/5
                    bg-fg/10
                    p-2
                "
            >
                <CompactTitle>Auto flow</CompactTitle>

                <ButtonGroup>
                    {gridAutoFlowValues.map((value) => (
                        <GeneralButton
                            key={value}
                            variant="ghost"
                            textButton={value}
                            active={config.autoFlow === value}
                            handleAction={() => updateConfig("autoFlow", value)}
                        />
                    ))}
                </ButtonGroup>
            </div>

            <div
                className="
                    grid
                    grid-cols-1
                    gap-1.5

                    lg:grid-cols-2
                "
            >
                <div
                    className="
                        col-stretch-1
                        rounded-[5px]
                        border
                        border-fg/5
                        bg-fg/10
                        p-2
                    "
                >
                    <CompactTitle>Justify items</CompactTitle>

                    <ButtonGroup>
                        {gridJustifyItemsValues.map((value) => (
                            <GeneralButton
                                key={value}
                                variant="ghost"
                                textButton={value}
                                active={config.justifyItems === value}
                                handleAction={() =>
                                    updateConfig("justifyItems", value)
                                }
                            />
                        ))}
                    </ButtonGroup>
                </div>

                <div
                    className="
                        col-stretch-1
                        rounded-[5px]
                        border
                        border-fg/5
                        bg-fg/10
                        p-2
                    "
                >
                    <CompactTitle>Align items</CompactTitle>

                    <ButtonGroup>
                        {gridAlignItemsValues.map((value) => (
                            <GeneralButton
                                key={value}
                                variant="ghost"
                                textButton={value}
                                active={config.alignItems === value}
                                handleAction={() =>
                                    updateConfig("alignItems", value)
                                }
                            />
                        ))}
                    </ButtonGroup>
                </div>
            </div>

            <div
                className="
                    grid
                    grid-cols-1
                    gap-1.5

                    sm:grid-cols-2
                "
            >
                <div
                    className="
                        col-stretch-1
                        rounded-[5px]
                        border
                        border-fg/5
                        bg-fg/10
                        p-2
                    "
                >
                    <CompactTitle value={`${config.rowGap}px`}>
                        Row gap
                    </CompactTitle>

                    <Range
                        value={config.rowGap}
                        min={0}
                        max={80}
                        step={1}
                        onChange={(value) => updateConfig("rowGap", value)}
                    />

                    <NumberInput
                        value={config.rowGap}
                        min={0}
                        max={80}
                        ariaLabel="Grid row gap"
                        onChange={(value) => updateConfig("rowGap", value)}
                    />
                </div>

                <div
                    className="
                        col-stretch-1
                        rounded-[5px]
                        border
                        border-fg/5
                        bg-fg/10
                        p-2
                    "
                >
                    <CompactTitle value={`${config.columnGap}px`}>
                        Column gap
                    </CompactTitle>

                    <Range
                        value={config.columnGap}
                        min={0}
                        max={80}
                        step={1}
                        onChange={(value) => updateConfig("columnGap", value)}
                    />

                    <NumberInput
                        value={config.columnGap}
                        min={0}
                        max={80}
                        ariaLabel="Grid column gap"
                        onChange={(value) => updateConfig("columnGap", value)}
                    />
                </div>
            </div>

            {selectedItem && (
                <div
                    className="
                        col-stretch-2
                        rounded-[5px]
                        border
                        border-fg/10
                        p-2
                    "
                >
                    <div className="row-center-2">
                        <div className="row-center-1">
                            <span
                                className="
                                    row-center-0
                                    size-6
                                    rounded-[3px]
                                    bg-fg
                                    text-[10px]
                                    font-semibold
                                    text-app
                                    justify-center
                                "
                            >
                                {selectedIndex + 1}
                            </span>

                            <span className="text-[12px] font-medium">
                                Selected block
                            </span>
                        </div>

                        <div
                            className="
                                ml-auto
                                w-fit
                                rounded-[4px]
                                bg-fg/5
                                p-0.5
                            "
                        >
                            <GeneralButton
                                variant="ghost"
                                icon={<IconTrash className="size-4" />}
                                textButton="Remove"
                                disabled={config.items.length <= 1}
                                handleAction={removeItem}
                            />
                        </div>
                    </div>

                    <div
                        className="
                            grid
                            grid-cols-1
                            gap-1.5

                            sm:grid-cols-2
                        "
                    >
                        <div
                            className="
                                col-stretch-2
                                rounded-[5px]
                                bg-fg/3
                                p-2
                            "
                        >
                            <CompactTitle>Column start</CompactTitle>

                            <ButtonGroup>
                                <GeneralButton
                                    variant="ghost"
                                    textButton="Auto"
                                    active={selectedItem.columnStart === null}
                                    handleAction={() =>
                                        updateItem({
                                            columnStart: null,
                                        })
                                    }
                                />

                                <GeneralButton
                                    variant="ghost"
                                    textButton="Custom"
                                    active={selectedItem.columnStart !== null}
                                    handleAction={() =>
                                        updateItem({
                                            columnStart:
                                                selectedItem.columnStart ?? 1,
                                        })
                                    }
                                />
                            </ButtonGroup>

                            {selectedItem.columnStart !== null && (
                                <NumberInput
                                    value={selectedItem.columnStart}
                                    min={1}
                                    max={config.columns}
                                    ariaLabel="Column start"
                                    onChange={(value) =>
                                        updateItem({
                                            columnStart: value,
                                        })
                                    }
                                />
                            )}
                        </div>

                        <div
                            className="
                                col-stretch-1
                                rounded-[5px]
                                bg-fg/3
                                p-2
                            "
                        >
                            <CompactTitle value={selectedItem.columnSpan}>
                                Column span
                            </CompactTitle>

                            <Range
                                value={selectedItem.columnSpan}
                                min={1}
                                max={config.columns}
                                step={1}
                                onChange={(value) =>
                                    updateItem({
                                        columnSpan: value,
                                    })
                                }
                            />

                            <NumberInput
                                value={selectedItem.columnSpan}
                                min={1}
                                max={config.columns}
                                ariaLabel="Column span"
                                onChange={(value) =>
                                    updateItem({
                                        columnSpan: value,
                                    })
                                }
                            />
                        </div>
                    </div>

                    <div
                        className="
                            grid
                            grid-cols-1
                            gap-1.5

                            sm:grid-cols-2
                        "
                    >
                        <div
                            className="
                                col-stretch-2
                                rounded-[5px]
                                bg-fg/3
                                p-2
                            "
                        >
                            <CompactTitle>Row start</CompactTitle>

                            <ButtonGroup>
                                <GeneralButton
                                    variant="ghost"
                                    textButton="Auto"
                                    active={selectedItem.rowStart === null}
                                    handleAction={() =>
                                        updateItem({
                                            rowStart: null,
                                        })
                                    }
                                />

                                <GeneralButton
                                    variant="ghost"
                                    textButton="Custom"
                                    active={selectedItem.rowStart !== null}
                                    handleAction={() =>
                                        updateItem({
                                            rowStart:
                                                selectedItem.rowStart ?? 1,
                                        })
                                    }
                                />
                            </ButtonGroup>

                            {selectedItem.rowStart !== null && (
                                <NumberInput
                                    value={selectedItem.rowStart}
                                    min={1}
                                    max={config.rows}
                                    ariaLabel="Row start"
                                    onChange={(value) =>
                                        updateItem({
                                            rowStart: value,
                                        })
                                    }
                                />
                            )}
                        </div>

                        <div
                            className="
                                col-stretch-1
                                rounded-[5px]
                                bg-fg/3
                                p-2
                            "
                        >
                            <CompactTitle value={selectedItem.rowSpan}>
                                Row span
                            </CompactTitle>

                            <Range
                                value={selectedItem.rowSpan}
                                min={1}
                                max={config.rows}
                                step={1}
                                onChange={(value) =>
                                    updateItem({
                                        rowSpan: value,
                                    })
                                }
                            />

                            <NumberInput
                                value={selectedItem.rowSpan}
                                min={1}
                                max={config.rows}
                                ariaLabel="Row span"
                                onChange={(value) =>
                                    updateItem({
                                        rowSpan: value,
                                    })
                                }
                            />
                        </div>
                    </div>

                    <div
                        className="
                            col-stretch-1
                            rounded-[5px]
                            bg-fg/3
                            p-2
                        "
                    >
                        <CompactTitle>Justify self</CompactTitle>

                        <ButtonGroup>
                            {gridJustifySelfValues.map((value) => (
                                <GeneralButton
                                    key={value}
                                    variant="ghost"
                                    textButton={value}
                                    active={selectedItem.justifySelf === value}
                                    handleAction={() =>
                                        updateItem({
                                            justifySelf: value,
                                        })
                                    }
                                />
                            ))}
                        </ButtonGroup>
                    </div>

                    <div
                        className="
                            col-stretch-1
                            rounded-[5px]
                            bg-fg/3
                            p-2
                        "
                    >
                        <CompactTitle>Align self</CompactTitle>

                        <ButtonGroup>
                            {gridAlignSelfValues.map((value) => (
                                <GeneralButton
                                    key={value}
                                    variant="ghost"
                                    textButton={value}
                                    active={selectedItem.alignSelf === value}
                                    handleAction={() =>
                                        updateItem({
                                            alignSelf: value,
                                        })
                                    }
                                />
                            ))}
                        </ButtonGroup>
                    </div>

                    <div
                        className="
                            col-stretch-1
                            rounded-[5px]
                            bg-fg/3
                            p-2
                        "
                    >
                        <CompactTitle value={selectedItem.order}>
                            Order
                        </CompactTitle>

                        <Range
                            value={selectedItem.order}
                            min={-10}
                            max={10}
                            step={1}
                            onChange={(value) =>
                                updateItem({
                                    order: value,
                                })
                            }
                        />

                        <NumberInput
                            value={selectedItem.order}
                            min={-10}
                            max={10}
                            ariaLabel="Grid item order"
                            onChange={(value) =>
                                updateItem({
                                    order: value,
                                })
                            }
                        />
                    </div>
                </div>
            )}
        </div>
    );
};
