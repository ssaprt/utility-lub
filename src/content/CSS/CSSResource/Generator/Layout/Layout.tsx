"use client";

import { IconLayoutDashboard } from "@tabler/icons-react";
import { useState } from "react";
import { GeneratorPage } from "../_shared/GeneratorUI";
import { IsGenerator } from "./IsGenerator";
import { createDefaultLayoutConfig, type LayoutConfig } from "./layout.type";

export const Layout = () => {
    const [config, setConfig] = useState<LayoutConfig>(createDefaultLayoutConfig);
    return <GeneratorPage title="CSS Layout Generator" description="Compose a semantic responsive page shell and export only the sections that are enabled" icon={IconLayoutDashboard}><IsGenerator config={config} setConfig={setConfig} /></GeneratorPage>;
};
