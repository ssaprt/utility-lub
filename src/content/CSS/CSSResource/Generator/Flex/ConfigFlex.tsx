"use client";

import { GeneralButton } from "@/components/button/GeneralButton/GeneralButton";
import { NumberInput } from "@/components/input/Number/Number";
import { Range } from "@/components/input/range/Range";
import { IconPlus, IconRestore, IconTrash } from "@tabler/icons-react";
import type { Dispatch, SetStateAction } from "react";

import {
    alignContentValues,
    alignItemsValues,
    alignSelfValues,
    createDefaultFlexConfig,
    createFlexItem,
    flexBasisUnits,
    flexDirections,
    flexWraps,
    justifyContents,
    type FlexConfig,
    type FlexItemConfig,
} from "./flex.type";

import { createId, normalizeColor } from "./flex.utils";

interface ConfigFlexProps {
    config: FlexConfig;

    setConfig: Dispatch<SetStateAction<FlexConfig>>;

    selectedItemId: string | null;

    setSelectedItemId: Dispatch<SetStateAction<string | null>>;
}

const CompactTitle = ({
    children,
    value,
}: {
    children: React.ReactNode;
    value?: React.ReactNode;
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

export const ConfigFlex = ({
    config,
    setConfig,
    selectedItemId,
    setSelectedItemId,
}: ConfigFlexProps) => {
    const selectedItem =
        config.items.find((item) => item.id === selectedItemId) ?? null;

    const selectedIndex = config.items.findIndex(
        (item) => item.id === selectedItemId,
    );

    const updateConfig = <K extends keyof FlexConfig>(
        key: K,
        value: FlexConfig[K],
    ) => {
        setConfig((current) => ({
            ...current,
            [key]: value,
        }));
    };

    const updateItem = (values: Partial<Omit<FlexItemConfig, "id">>) => {
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

    const addItem = () => {
        const id = createId();

        setConfig((current) => ({
            ...current,

            items: [...current.items, createFlexItem(id, current.items.length)],
        }));

        setSelectedItemId(id);
    };

    const removeItem = () => {
        if (!selectedItemId || config.items.length <= 1) {
            return;
        }

        const currentIndex = config.items.findIndex(
            (item) => item.id === selectedItemId,
        );

        const nextItems = config.items.filter(
            (item) => item.id !== selectedItemId,
        );

        const nextSelectedIndex = Math.min(
            Math.max(currentIndex - 1, 0),
            nextItems.length - 1,
        );

        setConfig((current) => ({
            ...current,

            items: current.items.filter((item) => item.id !== selectedItemId),
        }));

        setSelectedItemId(nextItems[nextSelectedIndex]?.id ?? null);
    };

    const clear = () => {
        const next = createDefaultFlexConfig();

        setConfig(next);

        setSelectedItemId(next.items[0]?.id ?? null);
    };

    return (
        <div className="col-stretch-2 w-full">
            <div
                className="
                    row-center-2
                    w-full
                    rounded-md
                    bg-fg/5
                    p-1.5
                "
            >
                <span className="pl-1 text-[12px] font-medium">Flexbox</span>

                <span className="text-[10px] text-fg/40">
                    {config.items.length} blocks
                </span>

                <div
                    className="
                        ml-auto
                        row-center-1
                        w-fit
                        rounded-[6px]
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
                        row-center-2
                        rounded-md
                        border
                        border-fg/5
                        bg-fg/5
                        p-1.5
                    "
                >
                    <span className="text-[11px] text-fg/70">Preview</span>

                    <input
                        type="color"
                        aria-label="Preview color"
                        value={normalizeColor(config.canvasColor)}
                        onChange={(event) =>
                            updateConfig("canvasColor", event.target.value)
                        }
                        className="
                            ml-auto
                            size-7
                            shrink-0
                            cursor-pointer
                            rounded-[5px]
                            border-0
                            bg-transparent
                            p-0
                        "
                    />

                    <input
                        type="text"
                        aria-label="Preview color value"
                        value={config.canvasColor}
                        onChange={(event) =>
                            updateConfig("canvasColor", event.target.value)
                        }
                        className="
                            w-20
                            rounded-[5px]
                            bg-fg/5
                            px-1.5
                            py-1
                            text-[10px]
                            outline-none
                            transition-colors
                            hover:bg-fg/10
                            focus:bg-fg/10
                        "
                    />
                </div>

                <div
                    className="
                        row-center-2
                        rounded-md
                        border
                        border-fg/5
                        bg-fg/5
                        p-1.5
                    "
                >
                    <span className="text-[11px] text-fg/70">Container</span>

                    <input
                        type="color"
                        aria-label="Container color"
                        value={normalizeColor(config.containerColor)}
                        onChange={(event) =>
                            updateConfig("containerColor", event.target.value)
                        }
                        className="
                            ml-auto
                            size-7
                            shrink-0
                            cursor-pointer
                            rounded-[5px]
                            border-0
                            bg-transparent
                            p-0
                        "
                    />

                    <input
                        type="text"
                        aria-label="Container color value"
                        value={config.containerColor}
                        onChange={(event) =>
                            updateConfig("containerColor", event.target.value)
                        }
                        className="
                            w-20
                            rounded-[5px]
                            bg-fg/5
                            px-1.5
                            py-1
                            text-[10px]
                            outline-none
                            transition-colors
                            hover:bg-fg/10
                            focus:bg-fg/10
                        "
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
                        rounded-md
                        border
                        border-fg/5
                        bg-fg/5
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
                        ariaLabel="Container width"
                        onChange={(value) =>
                            updateConfig("containerWidth", value)
                        }
                    />
                </div>

                <div
                    className="
                        col-stretch-1
                        rounded-md
                        border
                        border-fg/5
                        bg-fg/5
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
                        ariaLabel="Container height"
                        onChange={(value) =>
                            updateConfig("containerHeight", value)
                        }
                    />
                </div>
            </div>

            <div
                className="
                    col-stretch-1
                    rounded-md
                    border
                    border-fg/5
                    bg-fg/5
                    p-2
                "
            >
                <CompactTitle>Direction</CompactTitle>

                <div
                    className="
                        row-center-1
                        w-fit
                        max-w-full
                        flex-wrap
                        rounded-[6px]
                        bg-fg/5
                        p-0.5
                    "
                >
                    {flexDirections.map((value) => (
                        <GeneralButton
                            key={value}
                            textButton={value}
                            variant="ghost"
                            active={config.flexDirection === value}
                            handleAction={() =>
                                updateConfig("flexDirection", value)
                            }
                        />
                    ))}
                </div>
            </div>

            <div
                className="
                    col-stretch-1
                    rounded-md
                    border
                    border-fg/5
                    bg-fg/5
                    p-2
                "
            >
                <CompactTitle>Wrap</CompactTitle>

                <div
                    className="
                        row-center-1
                        w-fit
                        max-w-full
                        flex-wrap
                        rounded-[6px]
                        bg-fg/5
                        p-0.5
                    "
                >
                    {flexWraps.map((value) => (
                        <GeneralButton
                            key={value}
                            textButton={value}
                            variant="ghost"
                            active={config.flexWrap === value}
                            handleAction={() => updateConfig("flexWrap", value)}
                        />
                    ))}
                </div>
            </div>

            <div
                className="
                    col-stretch-1
                    rounded-md
                    border
                    border-fg/5
                    bg-fg/5
                    p-2
                "
            >
                <CompactTitle>Justify content</CompactTitle>

                <div
                    className="
                        row-center-1
                        w-fit
                        max-w-full
                        flex-wrap
                        rounded-[6px]
                        bg-fg/5
                        p-0.5
                    "
                >
                    {justifyContents.map((value) => (
                        <GeneralButton
                            key={value}
                            textButton={value}
                            variant="ghost"
                            active={config.justifyContent === value}
                            handleAction={() =>
                                updateConfig("justifyContent", value)
                            }
                        />
                    ))}
                </div>
            </div>

            <div
                className="
                    grid
                    grid-cols-1
                    gap-1.5
                    md:grid-cols-2
                "
            >
                <div
                    className="
                        col-stretch-1
                        rounded-md
                        border
                        border-fg/5
                        bg-fg/5
                        p-2
                    "
                >
                    <CompactTitle>Align items</CompactTitle>

                    <div
                        className="
                            row-center-1
                            w-fit
                            max-w-full
                            flex-wrap
                            rounded-[6px]
                            bg-fg/5
                            p-0.5
                        "
                    >
                        {alignItemsValues.map((value) => (
                            <GeneralButton
                                key={value}
                                textButton={value}
                                variant="ghost"
                                active={config.alignItems === value}
                                handleAction={() =>
                                    updateConfig("alignItems", value)
                                }
                            />
                        ))}
                    </div>
                </div>

                <div
                    className="
                        col-stretch-1
                        rounded-md
                        border
                        border-fg/5
                        bg-fg/5
                        p-2
                    "
                >
                    <CompactTitle>Align content</CompactTitle>

                    <div
                        className="
                            row-center-1
                            w-fit
                            max-w-full
                            flex-wrap
                            rounded-[6px]
                            bg-fg/5
                            p-0.5
                        "
                    >
                        {alignContentValues.map((value) => (
                            <GeneralButton
                                key={value}
                                textButton={value}
                                variant="ghost"
                                active={config.alignContent === value}
                                handleAction={() =>
                                    updateConfig("alignContent", value)
                                }
                            />
                        ))}
                    </div>
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
                        rounded-md
                        border
                        border-fg/5
                        bg-fg/5
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
                        ariaLabel="Row gap"
                        onChange={(value) => updateConfig("rowGap", value)}
                    />
                </div>

                <div
                    className="
                        col-stretch-1
                        rounded-md
                        border
                        border-fg/5
                        bg-fg/5
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
                        ariaLabel="Column gap"
                        onChange={(value) => updateConfig("columnGap", value)}
                    />
                </div>
            </div>

            {selectedItem && (
                <div
                    className="
                        col-stretch-2
                        rounded-md
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
                                    rounded-[5px]
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
                                rounded-[6px]
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
                        <div className="col-stretch-1 rounded-md bg-fg/3 p-2">
                            <CompactTitle value={`${selectedItem.width}px`}>
                                Preview width
                            </CompactTitle>

                            <Range
                                value={selectedItem.width}
                                min={30}
                                max={300}
                                step={1}
                                onChange={(value) =>
                                    updateItem({
                                        width: value,
                                    })
                                }
                            />

                            <NumberInput
                                value={selectedItem.width}
                                min={30}
                                max={300}
                                ariaLabel="Block width"
                                onChange={(value) =>
                                    updateItem({
                                        width: value,
                                    })
                                }
                            />
                        </div>

                        <div className="col-stretch-1 rounded-md bg-fg/3 p-2">
                            <CompactTitle value={`${selectedItem.height}px`}>
                                Preview height
                            </CompactTitle>

                            <Range
                                value={selectedItem.height}
                                min={30}
                                max={300}
                                step={1}
                                onChange={(value) =>
                                    updateItem({
                                        height: value,
                                    })
                                }
                            />

                            <NumberInput
                                value={selectedItem.height}
                                min={30}
                                max={300}
                                ariaLabel="Block height"
                                onChange={(value) =>
                                    updateItem({
                                        height: value,
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
                        <div className="col-stretch-1 rounded-md bg-fg/3 p-2">
                            <CompactTitle value={selectedItem.flexGrow}>
                                Flex grow
                            </CompactTitle>

                            <Range
                                value={selectedItem.flexGrow}
                                min={0}
                                max={10}
                                step={1}
                                onChange={(value) =>
                                    updateItem({
                                        flexGrow: value,
                                    })
                                }
                            />

                            <NumberInput
                                value={selectedItem.flexGrow}
                                min={0}
                                max={10}
                                ariaLabel="Flex grow"
                                onChange={(value) =>
                                    updateItem({
                                        flexGrow: value,
                                    })
                                }
                            />
                        </div>

                        <div className="col-stretch-1 rounded-md bg-fg/3 p-2">
                            <CompactTitle value={selectedItem.flexShrink}>
                                Flex shrink
                            </CompactTitle>

                            <Range
                                value={selectedItem.flexShrink}
                                min={0}
                                max={10}
                                step={1}
                                onChange={(value) =>
                                    updateItem({
                                        flexShrink: value,
                                    })
                                }
                            />

                            <NumberInput
                                value={selectedItem.flexShrink}
                                min={0}
                                max={10}
                                ariaLabel="Flex shrink"
                                onChange={(value) =>
                                    updateItem({
                                        flexShrink: value,
                                    })
                                }
                            />
                        </div>
                    </div>

                    <div
                        className="
                            col-stretch-1
                            rounded-md
                            bg-fg/3
                            p-2
                        "
                    >
                        <CompactTitle>Flex basis</CompactTitle>

                        <div
                            className="
                                row-center-1
                                w-fit
                                rounded-[6px]
                                bg-fg/5
                                p-0.5
                            "
                        >
                            {flexBasisUnits.map((unit) => (
                                <GeneralButton
                                    key={unit}
                                    variant="ghost"
                                    textButton={unit}
                                    active={selectedItem.flexBasisUnit === unit}
                                    handleAction={() =>
                                        updateItem({
                                            flexBasisUnit: unit,
                                        })
                                    }
                                />
                            ))}
                        </div>

                        {selectedItem.flexBasisUnit !== "auto" && (
                            <div className="col-stretch-1 pt-1">
                                <CompactTitle
                                    value={`${selectedItem.flexBasis}${selectedItem.flexBasisUnit}`}
                                >
                                    Value
                                </CompactTitle>

                                <Range
                                    value={selectedItem.flexBasis}
                                    min={0}
                                    max={
                                        selectedItem.flexBasisUnit === "%"
                                            ? 100
                                            : 500
                                    }
                                    step={1}
                                    onChange={(value) =>
                                        updateItem({
                                            flexBasis: value,
                                        })
                                    }
                                />

                                <NumberInput
                                    value={selectedItem.flexBasis}
                                    min={0}
                                    max={
                                        selectedItem.flexBasisUnit === "%"
                                            ? 100
                                            : 500
                                    }
                                    ariaLabel="Flex basis"
                                    onChange={(value) =>
                                        updateItem({
                                            flexBasis: value,
                                        })
                                    }
                                />
                            </div>
                        )}
                    </div>

                    <div
                        className="
                            col-stretch-1
                            rounded-md
                            bg-fg/3
                            p-2
                        "
                    >
                        <CompactTitle>Align self</CompactTitle>

                        <div
                            className="
                                row-center-1
                                w-fit
                                max-w-full
                                flex-wrap
                                rounded-[6px]
                                bg-fg/5
                                p-0.5
                            "
                        >
                            {alignSelfValues.map((value) => (
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
                        </div>
                    </div>

                    <div
                        className="
                            col-stretch-1
                            rounded-md
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
                            ariaLabel="Flex order"
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
