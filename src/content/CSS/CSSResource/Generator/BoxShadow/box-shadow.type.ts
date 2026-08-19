import { Dispatch, SetStateAction } from "react";

export interface BoxShadowLayer {
    id: string;
    offsetX: number;
    offsetY: number;
    blur: number;
    spread: number;
    color: string;
    inset: boolean;
}

export interface BoxShadowConfig {
    canvasColor: string;
    boxColor: string;
    boxWidth: number;
    boxHeight: number;
    shadows: BoxShadowLayer[];
}

export const defaultBoxShadowConfig: BoxShadowConfig = {
    canvasColor: "#f3f4f6",
    boxColor: "#ffffff",
    boxWidth: 180,
    boxHeight: 180,
    shadows: [
        {
            id: "shadow-1",
            offsetX: 0,
            offsetY: 10,
            blur: 30,
            spread: -5,
            color: "#00000040",
            inset: false,
        },
    ],
};

export interface IsGeneratorProps {
    config: BoxShadowConfig;
    setConfig: Dispatch<SetStateAction<BoxShadowConfig>>;
}

export interface ShadowEditorProps {
    shadow: BoxShadowLayer;
    index: number;
    total: number;

    updateShadow: (
        id: string,
        values: Partial<Omit<BoxShadowLayer, "id">>,
    ) => void;

    removeShadow: (id: string) => void;

    duplicateShadow: (id: string) => void;
}

export type ResizeAxis = "x" | "y" | "xy";
