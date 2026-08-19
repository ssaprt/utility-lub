import type {
    StylesConverterResponse,
    StyleValidationIssue,
} from "@/services/StylesConverter/styles-converter.api";

const isRecord = (value: unknown): value is Record<string, unknown> => {
    return typeof value === "object" && value !== null;
};

const isValidationIssue = (value: unknown): value is StyleValidationIssue => {
    return (
        isRecord(value) &&
        typeof value.message === "string" &&
        (value.line === undefined || typeof value.line === "number") &&
        (value.column === undefined || typeof value.column === "number")
    );
};

const getIssues = (value: unknown): StyleValidationIssue[] => {
    if (!isRecord(value)) {
        return [];
    }

    const errors = value.errors;

    if (!Array.isArray(errors)) {
        return [];
    }

    return errors.filter(isValidationIssue);
};

const formatIssues = (issues: StyleValidationIssue[]): string => {
    return issues
        .map((item) => {
            const position =
                item.line !== undefined
                    ? `Line ${item.line}${
                          item.column !== undefined ? `:${item.column}` : ""
                      }`
                    : "";

            return position ? `${position} — ${item.message}` : item.message;
        })
        .join("\n");
};

const getErrorData = (error: unknown): unknown => {
    if (!isRecord(error)) {
        return undefined;
    }

    if ("data" in error) {
        return error.data;
    }

    return undefined;
};

export const getCompilerErrorMessage = (
    data?: StylesConverterResponse,
    error?: unknown,
): string => {
    const responseIssues = data?.errors?.filter(isValidationIssue) ?? [];

    if (responseIssues.length) {
        return formatIssues(responseIssues);
    }

    const errorData = getErrorData(error);

    const errorIssues = getIssues(errorData);

    if (errorIssues.length) {
        return formatIssues(errorIssues);
    }

    if (isRecord(errorData)) {
        if (typeof errorData.message === "string") {
            return errorData.message;
        }

        if (Array.isArray(errorData.message)) {
            const messages = errorData.message.filter(
                (item): item is string => typeof item === "string",
            );

            if (messages.length) {
                return messages.join("\n");
            }
        }

        if ("error" in errorData && typeof errorData.error === "string") {
            return errorData.error;
        }
    }

    if (isRecord(error)) {
        if ("error" in error && typeof error.error === "string") {
            return error.error;
        }

        if ("message" in error && typeof error.message === "string") {
            return error.message;
        }
    }

    return "Unable to process the code";
};
