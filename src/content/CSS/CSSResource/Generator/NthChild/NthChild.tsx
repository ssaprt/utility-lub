"use client";

import { IconBracketsAngle } from "@tabler/icons-react";
import { useState } from "react";
import { GeneratorPage } from "../_shared/GeneratorUI";
import { IsGenerator } from "./IsGenerator";
import { createDefaultNthChildConfig, type NthChildConfig } from "./nth-child.type";

export const NthChild = () => {
    const [config, setConfig] = useState<NthChildConfig>(createDefaultNthChildConfig);
    return <GeneratorPage title="CSS nth-child Tester" description="See An+B, ranges, reverse counting and negation against a live numbered collection" icon={IconBracketsAngle}><IsGenerator config={config} setConfig={setConfig} /></GeneratorPage>;
};
