"use client";

import { IconAward } from "@tabler/icons-react";
import { useState } from "react";
import { GeneratorPage } from "../_shared/GeneratorUI";
import { IsGenerator } from "./IsGenerator";
import { createDefaultRibbonConfig, type RibbonConfig } from "./ribbon.type";

export const Ribbon = () => {
    const [config, setConfig] = useState<RibbonConfig>(createDefaultRibbonConfig);
    return <GeneratorPage title="CSS Ribbon Generator" description="Create corner, folded and edge ribbons with clean HTML and a single decorative element" icon={IconAward}><IsGenerator config={config} setConfig={setConfig} /></GeneratorPage>;
};
