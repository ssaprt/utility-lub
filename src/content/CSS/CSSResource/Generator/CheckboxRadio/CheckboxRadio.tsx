"use client";

import { IconCheckbox } from "@tabler/icons-react";
import { useState } from "react";
import { GeneratorPage } from "../_shared/GeneratorUI";
import { IsGenerator } from "./IsGenerator";
import {
    createDefaultCheckboxRadioConfig,
    type CheckboxRadioConfig,
} from "./checkbox-radio.type";

export const CheckboxRadio = () => {
    const [config, setConfig] = useState<CheckboxRadioConfig>(
        createDefaultCheckboxRadioConfig,
    );

    return (
        <GeneratorPage
            title="CSS Checkbox & Radio Generator"
            description="Create accessible checkbox and radio controls with custom checked, hover, focus and disabled states"
            icon={IconCheckbox}
        >
            <IsGenerator config={config} setConfig={setConfig} />
        </GeneratorPage>
    );
};
