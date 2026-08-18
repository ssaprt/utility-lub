import { NumberInput } from "@/components/input/Number/Number";
import { Range } from "@/components/input/range/Range";
import { BoxShadowConfig } from "./box-shadow.type";
import { normalizeColor } from "./box-shadow.utils";
import { IsGeneratorProps } from "./IsGenerator";

export const ConfigShadow = ({ config, setConfig }: IsGeneratorProps) => {
    const updateConfig = <K extends keyof BoxShadowConfig>(
        key: K,
        value: BoxShadowConfig[K],
    ) => {
        setConfig((current) => ({
            ...current,
            [key]: value,
        }));
    };

    return (
        <div className="col-stretch-2 w-full">
            <div
                className="
                        row-center-1
                        rounded-[8px]
                        bg-fg/5
                        p-1
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
                        p-1
                    "
            >
                <label htmlFor="box-shadow-box-color" className="text-[12px]">
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
        </div>
    );
};
