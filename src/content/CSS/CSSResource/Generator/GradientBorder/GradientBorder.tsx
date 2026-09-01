"use client";

import { IconBorderStyle2 } from "@tabler/icons-react";
import { useState } from "react";
import { GeneratorPage } from "../_shared/GeneratorUI";
import { IsGenerator } from "./IsGenerator";
import { createDefaultGradientBorderConfig, type GradientBorderConfig } from "./gradient-border.type";

export const GradientBorder = () => {
    const [config, setConfig] = useState<GradientBorderConfig>(createDefaultGradientBorderConfig);
    return <GeneratorPage title="CSS Gradient Border Generator" description="Create rounded linear, conic or radial borders with precise stops and an optional soft glow" icon={IconBorderStyle2}><IsGenerator config={config} setConfig={setConfig} /></GeneratorPage>;
};
