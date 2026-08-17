import type { AIAction, AIActionResult } from "./types";

const findTarget = (id: string) => {
    return document.querySelector<HTMLElement>(
        `[data-ai-id="${CSS.escape(id)}"]`,
    );
};

const dispatchValueEvents = (element: HTMLElement) => {
    element.dispatchEvent(
        new Event("input", {
            bubbles: true,
        }),
    );

    element.dispatchEvent(
        new Event("change", {
            bubbles: true,
        }),
    );
};

const isDisabled = (element: HTMLElement) => {
    if (
        element instanceof HTMLButtonElement ||
        element instanceof HTMLInputElement ||
        element instanceof HTMLSelectElement ||
        element instanceof HTMLTextAreaElement
    ) {
        return element.disabled;
    }

    return element.getAttribute("aria-disabled") === "true";
};

const setInputValue = (
    element: HTMLInputElement,
    value: string | number | boolean,
) => {
    if (element.type === "checkbox" || element.type === "radio") {
        const checked = Boolean(value);

        if (element.checked !== checked) {
            element.click();
        }

        return;
    }

    const descriptor = Object.getOwnPropertyDescriptor(
        HTMLInputElement.prototype,
        "value",
    );

    descriptor?.set?.call(element, String(value));

    dispatchValueEvents(element);
};

const setTextareaValue = (
    element: HTMLTextAreaElement,
    value: string | number | boolean,
) => {
    const descriptor = Object.getOwnPropertyDescriptor(
        HTMLTextAreaElement.prototype,
        "value",
    );

    descriptor?.set?.call(element, String(value));

    dispatchValueEvents(element);
};

const setSelectValue = (
    element: HTMLSelectElement,
    value: string | number | boolean,
) => {
    const descriptor = Object.getOwnPropertyDescriptor(
        HTMLSelectElement.prototype,
        "value",
    );

    descriptor?.set?.call(element, String(value));

    dispatchValueEvents(element);
};

const setContentEditableValue = (
    element: HTMLElement,
    value: string | number | boolean,
) => {
    element.textContent = String(value);

    element.dispatchEvent(
        new InputEvent("input", {
            bubbles: true,
            inputType: "insertText",
            data: String(value),
        }),
    );
};

const setCustomBooleanControl = (
    element: HTMLElement,
    value: string | number | boolean,
) => {
    const desired = Boolean(value);

    const current = element.getAttribute("aria-checked") === "true";

    if (current !== desired) {
        element.click();
    }
};

export const executeAction = (action: AIAction): AIActionResult => {
    const element = findTarget(action.target);

    if (!element) {
        return {
            success: false,
            action,
            message: "Target element not found",
        };
    }

    if (element.closest('[data-ai-ignore="true"]')) {
        return {
            success: false,
            action,
            message: "Target is excluded from AI control",
        };
    }

    if (isDisabled(element)) {
        return {
            success: false,
            action,
            message: "Target is disabled",
        };
    }

    if (action.type === "click") {
        element.click();

        return {
            success: true,
            action,
        };
    }

    if (element instanceof HTMLInputElement) {
        setInputValue(element, action.value);

        return {
            success: true,
            action,
        };
    }

    if (element instanceof HTMLTextAreaElement) {
        setTextareaValue(element, action.value);

        return {
            success: true,
            action,
        };
    }

    if (element instanceof HTMLSelectElement) {
        setSelectValue(element, action.value);

        return {
            success: true,
            action,
        };
    }

    if (element.isContentEditable) {
        setContentEditableValue(element, action.value);

        return {
            success: true,
            action,
        };
    }

    const role = element.getAttribute("role");

    if (role === "switch" || role === "checkbox" || role === "radio") {
        setCustomBooleanControl(element, action.value);

        return {
            success: true,
            action,
        };
    }

    return {
        success: false,
        action,
        message: `Element does not support set action: ${element.tagName}`,
    };
};
