"use client";

import { IconMailFast } from "@tabler/icons-react";
import { type FormEvent, type ReactNode, useRef, useState } from "react";
import { Loader } from "../animationIcons/Loader/Loader";
import {
    collectionMessageComponents,
    ControllerMessages,
} from "../api-messages/ControllerMessages";
import { GeneralButton } from "../button/GeneralButton/GeneralButton";

interface ContactFormProps {
    children?: ReactNode;
    title?: string;
    headers?: Record<string, string>;
    url?: string;
    method?: "POST" | "PUT" | "PATCH";
    fileFieldName?: string;
    preserveFieldsWithFile?: string[];
    onClear?: () => void;
}

interface SubmitResponse {
    success: boolean;
    message: string;
}

type OverlayState = "idle" | "loading" | "result";

type ControllerCode = keyof typeof collectionMessageComponents;

const wait = (duration: number): Promise<void> => {
    return new Promise((resolve) => {
        setTimeout(resolve, duration);
    });
};

const waitForMinimumLoader = async (
    startedAt: number,
    minimumDuration: number,
): Promise<void> => {
    const elapsed = performance.now() - startedAt;
    const remaining = minimumDuration - elapsed;

    if (remaining > 0) {
        await wait(remaining);
    }
};

const normalizeControllerCode = (status: number): ControllerCode => {
    switch (status) {
        case 201:
        case 400:
        case 413:
        case 429:
        case 500:
            return status;
        default:
            if (status >= 200 && status < 300) {
                return 201;
            }

            if (status >= 500) {
                return 500;
            }

            return 400;
    }
};

const parseSubmitResponse = (
    value: unknown,
    response: Response,
    responseText: string,
): SubmitResponse => {
    let success = response.ok;
    let message =
        responseText ||
        (response.ok
            ? "Request completed successfully"
            : "Server request failed");

    if (typeof value !== "object" || value === null) {
        return {
            success,
            message,
        };
    }

    const record = value as Record<string, unknown>;

    if (typeof record.success === "boolean") {
        success = record.success;
    }

    if (typeof record.message === "string") {
        message = record.message;
    }

    if (
        Array.isArray(record.message) &&
        record.message.every((item): item is string => typeof item === "string")
    ) {
        message = record.message.join("\n");
    }

    return {
        success,
        message,
    };
};

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

if (!apiUrl) {
    throw new Error("NEXT_PUBLIC_API_URL is not defined");
}

const defaultMailerUrl = `${apiUrl.replace(/\/$/, "")}/mailer`;

export default function ContactForm({
    children,
    title,
    headers,
    url = defaultMailerUrl,
    method = "POST",
    fileFieldName,
    preserveFieldsWithFile = ["name", "from"],
    onClear,
}: ContactFormProps) {
    const formRef = useRef<HTMLFormElement>(null);

    const [overlayState, setOverlayState] = useState<OverlayState>("idle");

    const [code, setCode] = useState<ControllerCode | null>(null);
    const [message, setMessage] = useState("");
    const [formVersion, setFormVersion] = useState(0);

    const isSubmitting = overlayState === "loading";
    const overlayVisible = overlayState !== "idle";

    const closeOverlay = () => {
        formRef.current?.reset();
        onClear?.();

        setOverlayState("idle");
        setCode(null);
        setMessage("");
        setFormVersion((current) => current + 1);
    };

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (overlayState !== "idle") {
            return;
        }

        const startedAt = performance.now();
        const form = event.currentTarget;
        const sourceFormData = new FormData(form);

        const selectedFile = fileFieldName
            ? sourceFormData
                  .getAll(fileFieldName)
                  .find(
                      (value): value is File =>
                          value instanceof File && value.size > 0,
                  )
            : undefined;

        const requestBody = new FormData();

        if (fileFieldName && selectedFile) {
            preserveFieldsWithFile.forEach((fieldName) => {
                sourceFormData.getAll(fieldName).forEach((value) => {
                    if (typeof value === "string") {
                        requestBody.append(fieldName, value);
                    }
                });
            });

            requestBody.set(fileFieldName, selectedFile, selectedFile.name);
        } else {
            sourceFormData.forEach((value, key) => {
                if (value instanceof File) {
                    return;
                }

                requestBody.append(key, value);
            });
        }

        requestBody.set("subject", title || "Contact form Utility Lab");

        const requestHeaders = new Headers(headers);

        requestHeaders.delete("Content-Type");

        setCode(null);
        setMessage("");
        setOverlayState("loading");

        try {
            const response = await fetch(url, {
                method,
                headers: requestHeaders,
                body: requestBody,
            });

            const responseText = await response.text();

            let parsedResponse: unknown = null;

            if (responseText) {
                try {
                    parsedResponse = JSON.parse(responseText);
                } catch {
                    parsedResponse = null;
                }
            }

            const result = parseSubmitResponse(
                parsedResponse,
                response,
                responseText,
            );

            await waitForMinimumLoader(startedAt, 300);

            const status =
                !result.success && response.ok ? 400 : response.status;

            setCode(normalizeControllerCode(status));
            setMessage(result.message);
            setOverlayState("result");
        } catch (error: unknown) {
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : "Incorrect server response";

            await waitForMinimumLoader(startedAt, 300);

            setCode(500);
            setMessage(errorMessage);
            setOverlayState("result");
        }
    };

    return (
        <form
            key={formVersion}
            ref={formRef}
            onSubmit={onSubmit}
            encType="multipart/form-data"
            className="
                relative
                flex
                flex-col
                flex-wrap
                items-center
                gap-4
                overflow-visible
                p-2
            "
        >
            {overlayVisible && (
                <div
                    className="
                        absolute
                        inset-0
                        z-[55]
                        flex
                        min-h-full
                        items-center
                        justify-center
                        overflow-hidden
                        [background:var(--background)]
                    "
                >
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Loader visible mode="wave" />
                    </div>

                    {overlayState === "result" && code !== null && (
                        <div
                            className="
                                    relative
                                    z-10
                                    flex
                                    max-w-[90%]
                                    flex-col
                                    items-center
                                    gap-4
                                "
                        >
                            <ControllerMessages code={code} message={message} />

                            <GeneralButton
                                type="button"
                                textButton="Close"
                                className=" py-2 px-3 !border-1 !border-black/10 bg-black/30 shadow-md shadow-black/40 rounded-[4px]"
                                handleAction={closeOverlay}
                            />
                        </div>
                    )}
                </div>
            )}

            {children}

            <GeneralButton
                icon={<IconMailFast className="h-6 w-6" />}
                className="!p-2 !px-3"
                textButton="Send form information"
                type="submit"
                active={isSubmitting}
            />
        </form>
    );
}
