"use client";

import { IconPointer } from "@tabler/icons-react";
import { useState } from "react";
import { GeneratorPage } from "../_shared/GeneratorUI";
import { IsGenerator } from "./IsGenerator";
import { createDefaultButtonConfig, type ButtonConfig } from "./button.type";

export const Button = () => {
    const [config, setConfig] = useState<ButtonConfig>(createDefaultButtonConfig);

    return (
        <GeneratorPage
            title="CSS Button Generator"
            description="Design a compact, accessible button with gradients, borders, shadows and responsive interaction states"
            icon={IconPointer}
        >
            <IsGenerator config={config} setConfig={setConfig} />
        </GeneratorPage>
    );
};
