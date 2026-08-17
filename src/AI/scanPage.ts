import type {
    AIControlKind,
    AIPageControl,
    AIPageSnapshot,
    AISelectOption,
} from "./types";

const CONTROL_SELECTOR = [
    "button",
    "input",
    "select",
    "textarea",
    '[role="button"]',
    '[role="slider"]',
    '[role="tab"]',
    '[role="switch"]',
    '[role="checkbox"]',
    '[role="radio"]',
    "[aria-pressed]",
    '[contenteditable="true"]',
].join(",");

const normalizeText = (value?: string | null) => {
    if (!value) {
        return undefined;
    }

    const normalized = value.replace(/\s+/g, " ").trim();

    return normalized || undefined;
};

const toNumber = (value?: string | null) => {
    if (value === undefined || value === null || value === "") {
        return undefined;
    }

    const number = Number(value);

    return Number.isFinite(number) ? number : undefined;
};

const ensureAIId = (element: HTMLElement) => {
    if (element.dataset.aiId) {
        return element.dataset.aiId;
    }

    const id = crypto.randomUUID();

    element.dataset.aiId = id;

    return id;
};

const isVisible = (element: HTMLElement) => {
    const style = window.getComputedStyle(element);

    if (style.display === "none") {
        return false;
    }

    if (style.visibility === "hidden") {
        return false;
    }

    if (element.getClientRects().length === 0) {
        return false;
    }

    return true;
};

const isIgnored = (element: HTMLElement) => {
    return Boolean(
        element.closest('[data-ai-ignore="true"], [aria-hidden="true"]'),
    );
};

const getBooleanAttribute = (element: HTMLElement, attribute: string) => {
    const value = element.getAttribute(attribute);

    if (value === "true") {
        return true;
    }

    if (value === "false") {
        return false;
    }

    return undefined;
};

const getAriaCurrent = (element: HTMLElement) => {
    const value = element.getAttribute("aria-current");

    if (!value || value === "false") {
        return undefined;
    }

    return value;
};

const resolveKind = (element: HTMLElement): AIControlKind => {
    if (element instanceof HTMLButtonElement) {
        return "button";
    }

    if (element instanceof HTMLSelectElement) {
        return "select";
    }

    if (element instanceof HTMLTextAreaElement) {
        return "textarea";
    }

    if (element instanceof HTMLInputElement) {
        switch (element.type) {
            case "range":
                return "range";

            case "number":
                return "number";

            case "color":
                return "color";

            case "checkbox":
                return "checkbox";

            case "radio":
                return "radio";

            case "text":
            case "email":
            case "search":
            case "url":
            case "tel":
                return "text";

            default:
                return "unknown";
        }
    }

    if (element.isContentEditable) {
        return "contenteditable";
    }

    const role = element.getAttribute("role");

    switch (role) {
        case "button":
        case "tab":
            return "button";

        case "slider":
            return "range";

        case "switch":
        case "checkbox":
            return "checkbox";

        case "radio":
            return "radio";

        default:
            return "unknown";
    }
};

const getLabelledBy = (element: HTMLElement) => {
    const labelledBy = element.getAttribute("aria-labelledby");

    if (!labelledBy) {
        return undefined;
    }

    const text = labelledBy
        .split(/\s+/)
        .map((id) => normalizeText(document.getElementById(id)?.textContent))
        .filter((value): value is string => Boolean(value))
        .join(" ");

    return text || undefined;
};

const getNativeLabel = (
    element: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement,
) => {
    const labels = element.labels;

    if (labels && labels.length > 0) {
        const text = normalizeText(labels[0].textContent);

        if (text) {
            return text;
        }
    }

    if (element.id) {
        const label = document.querySelector<HTMLLabelElement>(
            `label[for="${CSS.escape(element.id)}"]`,
        );

        const text = normalizeText(label?.textContent);

        if (text) {
            return text;
        }
    }

    return undefined;
};

const getAccessibleLabel = (element: HTMLElement) => {
    const ariaLabel = normalizeText(element.getAttribute("aria-label"));

    if (ariaLabel) {
        return ariaLabel;
    }

    const labelledBy = getLabelledBy(element);

    if (labelledBy) {
        return labelledBy;
    }

    if (
        element instanceof HTMLInputElement ||
        element instanceof HTMLSelectElement ||
        element instanceof HTMLTextAreaElement
    ) {
        const nativeLabel = getNativeLabel(element);

        if (nativeLabel) {
            return nativeLabel;
        }

        const placeholder = normalizeText(element.getAttribute("placeholder"));

        if (placeholder) {
            return placeholder;
        }
    }

    const title = normalizeText(element.getAttribute("title"));

    if (title) {
        return title;
    }

    return undefined;
};

const containsInteractiveElement = (element: Element) => {
    return Boolean(element.querySelector(CONTROL_SELECTOR));
};

const isProbablyValue = (value: string) => {
    return /^-?\d+(?:\.\d+)?\s*(?:%|px|rem|em|deg|°|s|ms)?$/i.test(value);
};

const getStaticElementText = (element: Element | null) => {
    if (!element) {
        return undefined;
    }

    if (element.matches(CONTROL_SELECTOR)) {
        return undefined;
    }

    if (containsInteractiveElement(element)) {
        return undefined;
    }

    const text = normalizeText(element.textContent);

    if (!text || text.length > 80 || isProbablyValue(text)) {
        return undefined;
    }

    return text;
};

const getNearbyLabel = (element: HTMLElement) => {
    let previous = element.previousElementSibling;

    for (let i = 0; i < 3 && previous; i += 1) {
        const text = getStaticElementText(previous);

        if (text) {
            return text;
        }

        previous = previous.previousElementSibling;
    }

    const parent = element.parentElement;

    if (!parent) {
        return undefined;
    }

    for (const child of Array.from(parent.children)) {
        if (child === element) {
            continue;
        }

        const text = getStaticElementText(child);

        if (text) {
            return text;
        }
    }

    const parentPrevious = parent.previousElementSibling;

    const parentPreviousText = getStaticElementText(parentPrevious);

    if (parentPreviousText) {
        return parentPreviousText;
    }

    return undefined;
};

const getRoleGroupLabel = (element: HTMLElement) => {
    const group = element.closest<HTMLElement>(
        '[role="group"], [role="radiogroup"]',
    );

    if (!group) {
        return undefined;
    }

    return getAccessibleLabel(group);
};

const getFieldsetLabel = (element: HTMLElement) => {
    const fieldset = element.closest("fieldset");

    if (!fieldset) {
        return undefined;
    }

    const legend = fieldset.querySelector(":scope > legend");

    return normalizeText(legend?.textContent);
};

const getDirectHeading = (element: HTMLElement) => {
    const heading = element.querySelector<HTMLElement>(
        ":scope > h1, :scope > h2, :scope > h3, :scope > h4, :scope > h5, :scope > h6, :scope > [role='heading']",
    );

    const text = normalizeText(heading?.textContent);

    if (text && text.length <= 100) {
        return text;
    }

    return undefined;
};

const getSemanticWrapperLabel = (element: HTMLElement) => {
    let current = element.parentElement;

    for (let depth = 0; depth < 5 && current; depth += 1) {
        const controls = current.querySelectorAll(CONTROL_SELECTOR);

        if (controls.length >= 2 && controls.length <= 10) {
            const heading = getDirectHeading(current);

            if (heading) {
                return heading;
            }

            const previous = current.previousElementSibling;

            const previousText = getStaticElementText(previous);

            if (previousText) {
                return previousText;
            }
        }

        current = current.parentElement;
    }

    return undefined;
};

const getGroupLabel = (element: HTMLElement, label?: string) => {
    const candidates = [
        getFieldsetLabel(element),
        getRoleGroupLabel(element),
        getSemanticWrapperLabel(element),
    ];

    return candidates.find((candidate) => candidate && candidate !== label);
};

const getSectionPath = (element: HTMLElement, root: HTMLElement) => {
    const result: string[] = [];

    let current: HTMLElement | null = element.parentElement;

    for (let depth = 0; depth < 8 && current; depth += 1) {
        const heading = getDirectHeading(current);

        if (heading && !result.includes(heading)) {
            result.unshift(heading);
        }

        if (current === root) {
            break;
        }

        current = current.parentElement;
    }

    return result.length ? result : undefined;
};

const getText = (element: HTMLElement) => {
    const role = element.getAttribute("role");

    const shouldHaveText =
        element instanceof HTMLButtonElement ||
        role === "button" ||
        role === "tab" ||
        role === "radio" ||
        role === "checkbox" ||
        role === "switch";

    if (!shouldHaveText) {
        return undefined;
    }

    const text = normalizeText(element.textContent);

    if (!text || text.length > 100) {
        return undefined;
    }

    return text;
};

const getValue = (
    element: HTMLElement,
): string | number | boolean | undefined => {
    if (element instanceof HTMLInputElement) {
        if (element.type === "checkbox" || element.type === "radio") {
            return element.checked;
        }

        if (element.type === "range" || element.type === "number") {
            return toNumber(element.value);
        }

        return element.value;
    }

    if (element instanceof HTMLSelectElement) {
        return element.value;
    }

    if (element instanceof HTMLTextAreaElement) {
        return element.value;
    }

    if (element.isContentEditable) {
        return normalizeText(element.textContent);
    }

    const role = element.getAttribute("role");

    if (role === "slider") {
        const value = element.getAttribute("aria-valuenow");

        return toNumber(value) ?? normalizeText(value);
    }

    if (role === "checkbox" || role === "switch" || role === "radio") {
        return getBooleanAttribute(element, "aria-checked");
    }

    return undefined;
};

const getChecked = (element: HTMLElement) => {
    if (
        element instanceof HTMLInputElement &&
        (element.type === "checkbox" || element.type === "radio")
    ) {
        return element.checked;
    }

    return getBooleanAttribute(element, "aria-checked");
};

const getMin = (element: HTMLElement) => {
    if (element instanceof HTMLInputElement) {
        return toNumber(element.min);
    }

    return toNumber(element.getAttribute("aria-valuemin"));
};

const getMax = (element: HTMLElement) => {
    if (element instanceof HTMLInputElement) {
        return toNumber(element.max);
    }

    return toNumber(element.getAttribute("aria-valuemax"));
};

const getStep = (element: HTMLElement) => {
    if (element instanceof HTMLInputElement) {
        return toNumber(element.step);
    }

    return undefined;
};

const getOptions = (element: HTMLElement): AISelectOption[] | undefined => {
    if (!(element instanceof HTMLSelectElement)) {
        return undefined;
    }

    return Array.from(element.options).map((option) => ({
        value: option.value,
        label: normalizeText(option.textContent) ?? option.value,
        selected: option.selected,
    }));
};

const getDisabled = (element: HTMLElement) => {
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

const buildContext = ({
    section,
    group,
    label,
    text,
}: {
    section?: string[];
    group?: string;
    label?: string;
    text?: string;
}) => {
    const parts = [...(section ?? []), group, label, text].filter(
        (value): value is string => Boolean(value),
    );

    const unique = [...new Set(parts)];

    const context = unique.join(" > ");

    return context || undefined;
};

const getControl = (element: HTMLElement, root: HTMLElement): AIPageControl => {
    const accessibleLabel = getAccessibleLabel(element);

    const nearbyLabel = accessibleLabel ? undefined : getNearbyLabel(element);

    const label = accessibleLabel ?? nearbyLabel;

    const text = getText(element);

    const group = getGroupLabel(element, label);

    const section = getSectionPath(element, root);

    return {
        id: ensureAIId(element),

        tag: element.tagName.toLowerCase(),

        kind: resolveKind(element),

        text,

        label,

        group,

        section,

        context: buildContext({
            section,
            group,
            label,
            text,
        }),

        value: getValue(element),

        checked: getChecked(element),

        min: getMin(element),

        max: getMax(element),

        step: getStep(element),

        options: getOptions(element),

        disabled: getDisabled(element),

        role: element.getAttribute("role") || undefined,

        ariaPressed: getBooleanAttribute(element, "aria-pressed"),

        ariaSelected: getBooleanAttribute(element, "aria-selected"),

        ariaCurrent: getAriaCurrent(element),

        dataState: element.dataset.state || undefined,
    };
};

const valuesEqual = (
    left: AIPageControl["value"],
    right: AIPageControl["value"],
) => {
    return left === right;
};

const sectionsEqual = (left?: string[], right?: string[]) => {
    return JSON.stringify(left ?? []) === JSON.stringify(right ?? []);
};

const attachRelations = (controls: AIPageControl[]) => {
    return controls.map((control) => {
        if (!control.label) {
            return control;
        }

        const related = controls
            .filter(
                (candidate) =>
                    candidate.id !== control.id &&
                    candidate.kind !== control.kind &&
                    candidate.label === control.label &&
                    candidate.group === control.group &&
                    sectionsEqual(candidate.section, control.section) &&
                    valuesEqual(candidate.value, control.value),
            )
            .map((candidate) => candidate.id);

        if (!related.length) {
            return control;
        }

        return {
            ...control,
            relatedControls: related,
        };
    });
};

export const scanPage = (root?: HTMLElement): AIPageSnapshot => {
    const scanRoot =
        root ?? document.querySelector<HTMLElement>("#main") ?? document.body;

    const elements = [
        ...new Set(
            Array.from(
                scanRoot.querySelectorAll<HTMLElement>(CONTROL_SELECTOR),
            ),
        ),
    ];

    const controls = attachRelations(
        elements
            .filter(isVisible)
            .filter((element) => !isIgnored(element))
            .map((element) => getControl(element, scanRoot)),
    );

    const heading = normalizeText(
        scanRoot.querySelector("h1, h2")?.textContent,
    );

    return {
        url: window.location.href,
        pathname: window.location.pathname,
        title: document.title,
        heading,
        controls,
    };
};
