"use client";

import { IconStack2 } from "@tabler/icons-react";
import { useState } from "react";
import { GeneratorPage } from "../_shared/GeneratorUI";
import { IsGenerator } from "./IsGenerator";
import { createDefaultSkeletonLoaderConfig, type SkeletonLoaderConfig } from "./skeleton-loader.type";

export const SkeletonLoader = () => {
    const [config, setConfig] = useState<SkeletonLoaderConfig>(createDefaultSkeletonLoaderConfig);
    return <GeneratorPage title="CSS Skeleton Loader Generator" description="Build profile, article, product or list placeholders with shimmer, pulse and reduced-motion support" icon={IconStack2}><IsGenerator config={config} setConfig={setConfig} /></GeneratorPage>;
};
