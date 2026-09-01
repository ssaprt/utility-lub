"use client";

import { IconAdjustmentsHorizontal } from "@tabler/icons-react";
import { useState } from "react";
import { GeneratorPage } from "../_shared/GeneratorUI";
import { IsGenerator } from "./IsGenerator";
import { createDefaultInputRangeConfig, type InputRangeConfig } from "./input-range.type";

export const InputRange = () => {
    const [config, setConfig] = useState<InputRangeConfig>(createDefaultInputRangeConfig);
    return <GeneratorPage title="CSS Input Range Generator" description="Style the thumb, track and progress fill with matched WebKit and Firefox output" icon={IconAdjustmentsHorizontal}><IsGenerator config={config} setConfig={setConfig} /></GeneratorPage>;
};
