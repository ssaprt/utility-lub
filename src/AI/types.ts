export type AIControlKind =
    | "button"
    | "range"
    | "number"
    | "color"
    | "text"
    | "checkbox"
    | "radio"
    | "select"
    | "textarea"
    | "contenteditable"
    | "unknown";

export interface AISelectOption {
    value: string;
    label: string;
    selected: boolean;
}

export interface AIPageControl {
    id: string;
    tag: string;
    kind: AIControlKind;

    text?: string;
    label?: string;

    group?: string;
    section?: string[];

    context?: string;

    value?: string | number | boolean;
    checked?: boolean;

    min?: number;
    max?: number;
    step?: number;

    options?: AISelectOption[];

    disabled: boolean;

    role?: string;

    ariaPressed?: boolean;
    ariaSelected?: boolean;
    ariaCurrent?: string;

    dataState?: string;

    relatedControls?: string[];
}

export interface AIPageSnapshot {
    url: string;
    pathname: string;
    title: string;
    heading?: string;
    controls: AIPageControl[];
}

export interface AIClickAction {
    type: "click";
    target: string;
}

export interface AISetAction {
    type: "set";
    target: string;
    value: string | number | boolean;
}

export type AIAction = AIClickAction | AISetAction;

export interface AIPlannerActionsDecision {
    type: "actions";
    actions: AIAction[];
    observeAfter: boolean;
    reason?: string;
    message?: string;
}

export interface AIPlannerDoneDecision {
    type: "done";
    message?: string;
}

export type AIPlannerDecision =
    | AIPlannerActionsDecision
    | AIPlannerDoneDecision;

export interface AIActionResult {
    success: boolean;
    action: AIAction;
    message?: string;
}

export interface AIAgentStep {
    step: number;
    decision: AIPlannerDecision;
    success?: boolean;
}

export interface AIAgentResult {
    success: boolean;
    steps: AIAgentStep[];
    message?: string;
}
