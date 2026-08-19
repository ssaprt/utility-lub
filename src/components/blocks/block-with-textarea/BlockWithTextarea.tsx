"use client";

import { GeneralButton } from "@/components/button/GeneralButton/GeneralButton";
import { TextAreaWithScrollBar } from "@/components/textarea/TextAreaWithScrollBar";
import clsx from "clsx";
import { useState } from "react";

type BlockWithTextareaProps = {
    name?: string;
    title?: string;
    placeholder?: string;
    clear?: boolean;
    copy?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    dataLoaderMode?: {
        loading: boolean;
        error: boolean;
        success?: boolean;
    };
    result?: string | null;
    returnValue?: (value: string) => void;
};

export const BlockWithTextarea = ({
    name = "source",
    placeholder,
    title,
    copy,
    clear,
    disabled,
    readOnly,
    dataLoaderMode,
    result,
    returnValue,
}: BlockWithTextareaProps) => {
    const [value, setValue] = useState("");

    const hasExternalResult = result !== undefined;

    const displayValue = hasExternalResult ? (result ?? "") : value;

    const status = dataLoaderMode?.loading
        ? "Loading"
        : dataLoaderMode?.error
          ? "Error"
          : dataLoaderMode?.success
            ? "Success"
            : null;

    const handleValue = (nextValue: string) => {
        setValue(nextValue);
        returnValue?.(nextValue);
    };

    const handleClear = () => {
        setValue("");
        returnValue?.("");
    };

    return (
        <div className="col-stretch-2 h-[400px] w-full">
            <div className="row-center-1 justify-between pl-2">
                <div className="row-center-2 min-w-0">
                    <span className="text-[12px] text-fg">
                        {title || "Code"}
                    </span>

                    {status && (
                        <span
                            className={clsx(
                                "text-[10px] transition-colors duration-200",
                                dataLoaderMode?.loading && "text-fg/40",
                                !dataLoaderMode?.loading &&
                                    dataLoaderMode?.success &&
                                    "text-emerald-400",
                                !dataLoaderMode?.loading &&
                                    dataLoaderMode?.error &&
                                    "text-red-400",
                            )}
                        >
                            {status}
                        </span>
                    )}
                </div>

                <div className="row-center-1">
                    {copy && (
                        <GeneralButton
                            disabled={dataLoaderMode?.loading || !displayValue}
                            copy={{
                                copyItem: displayValue,
                            }}
                            textButton="Copy"
                            variant="ghost"
                        />
                    )}

                    {clear && (
                        <GeneralButton
                            disabled={dataLoaderMode?.loading}
                            textButton="Clear"
                            variant="ghost"
                            handleAction={handleClear}
                        />
                    )}
                </div>
            </div>

            <TextAreaWithScrollBar
                dataLoadingMode={dataLoaderMode}
                disabled={disabled}
                readOnly={readOnly}
                name={name}
                backValue={handleValue}
                placeholder={placeholder || "Type here..."}
            >
                {displayValue}
            </TextAreaWithScrollBar>
        </div>
    );
};
