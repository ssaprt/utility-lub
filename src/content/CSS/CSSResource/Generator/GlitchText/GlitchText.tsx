"use client";

import { IconTextRecognition } from "@tabler/icons-react";
import { useState } from "react";
import { GeneratorPage } from "../_shared/GeneratorUI";
import { IsGenerator } from "./IsGenerator";
import { createDefaultGlitchTextConfig, type GlitchTextConfig } from "./glitch-text.type";

export const GlitchText = () => {
    const [config, setConfig] = useState<GlitchTextConfig>(createDefaultGlitchTextConfig);
    return <GeneratorPage title="CSS Glitch Text Generator" description="Build a restrained chromatic, signal or fragmented text distortion with reduced-motion support" icon={IconTextRecognition}><IsGenerator config={config} setConfig={setConfig} /></GeneratorPage>;
};
