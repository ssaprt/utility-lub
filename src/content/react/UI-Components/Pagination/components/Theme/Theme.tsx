/***
    list: unknown[];
    selectTheme?: PresetsType;
    navigation?: "full" | "start" | "end";
    mode?: "horizontal" | "vertical";
    arrowStart?: boolean;
    arrowEnd?: boolean;
 */

import { Blue } from "./Blue";
import { Dark } from "./Dark";
import { LightBlue } from "./LightBlue";
import { RoundedAbyssalTheme } from "./RoundedAbyssalTheme";
import { RoundedAuroraNebula } from "./RoundedAuroraNebula";

import { RoundedDeepSpaceVoidTheme } from "./RoundedDeepSpaceVoidTheme";

import { RoundedOceanDepths } from "./RoundedOceanDepths";
import { RoundedRich } from "./RoundedRich";
import { RoundedSpace } from "./RoundedSpace";
import { SquaredCyberpunkNeon } from "./SquaredCyberpunkNeon";
import { SquaredForestMoss } from "./SquaredForestMoss";
import { White } from "./White";

export const Theme = () => {
    return (
        <div className="flex flex-col gap-4">
            <RoundedRich />
            <White />
            <RoundedSpace />
            <RoundedAuroraNebula />
            <RoundedDeepSpaceVoidTheme />
            <RoundedAbyssalTheme />
            <RoundedOceanDepths />
            <SquaredForestMoss />
            <SquaredCyberpunkNeon />

            <LightBlue />
            <Dark />
            <Blue />
        </div>
    );
};
