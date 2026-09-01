"use client";

import { IconLoader2 } from "@tabler/icons-react";
import { useState } from "react";
import { GeneratorPage } from "../_shared/GeneratorUI";
import { IsGenerator } from "./IsGenerator";
import { createDefaultLoaderConfig, type LoaderConfig } from "./loader.type";

export const Loader = () => {
    const [config, setConfig] = useState<LoaderConfig>(createDefaultLoaderConfig);
    return <GeneratorPage title="CSS Loader Generator" description="Create a lightweight ring, dots, bars, orbit or pulse loader with accessible markup" icon={IconLoader2}><IsGenerator config={config} setConfig={setConfig} /></GeneratorPage>;
};
