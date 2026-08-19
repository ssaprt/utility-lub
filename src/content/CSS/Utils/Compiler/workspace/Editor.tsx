"use client";

import { BlockWithTextarea } from "@/components/blocks/block-with-textarea/BlockWithTextarea";
import { GeneralButton } from "@/components/button/GeneralButton/GeneralButton";
import { useDelayAfterLoad } from "@/hooks/useDelayAfterLoad";
import { IconLoader2 } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { useState } from "react";

import { getCompilerErrorMessage } from "../common/get-error-message";
import { useCompilerMutation } from "../hooks/useCompilerMutation";
import { type UniversalCSSCompilerTypeApiList } from "../types/compiler.types";

import { ValidationResult } from "./ValidationResult";

type EditorProps = {
    selectFromConfig: UniversalCSSCompilerTypeApiList;
};

export const Editor = ({ selectFromConfig }: EditorProps) => {
    const [value, setValue] = useState("");

    const { convert, reset, isLoading, data, error, isError } =
        useCompilerMutation(selectFromConfig);

    const { delayLoad } = useDelayAfterLoad({
        isLoading,
        delay: 1000,
    });

    const isValidation =
        selectFromConfig.requestNameFunction === "useValidateStylesMutation";

    const validationFailed =
        isValidation && data?.success === true && data.valid === false;

    const responseFailed = data?.success === false;

    const hasError =
        !delayLoad && (isError || responseFailed || validationFailed);

    const hasSuccess =
        !delayLoad &&
        !hasError &&
        data?.success === true &&
        (!isValidation || data.valid === true);

    const errorMessage = getCompilerErrorMessage(data, error);

    const result = !isValidation && hasSuccess ? (data?.result ?? "") : null;

    const handleSourceChange = (nextValue: string) => {
        setValue(nextValue);
        reset();
    };

    const handleConvert = () => {
        void convert(value);
    };

    const sourceLoaderMode = {
        loading: delayLoad,
        error: isValidation && hasError,
        success: isValidation && hasSuccess,
    };

    const resultLoaderMode = {
        loading: delayLoad,
        error: !isValidation && hasError,
        success: !isValidation && hasSuccess,
    };

    const resultPlaceholder = hasError
        ? errorMessage
        : hasSuccess && !result
          ? "Completed successfully"
          : "Result will be here";

    return (
        <>
            {isValidation ? (
                <div className="col-stretch-3 w-full">
                    <BlockWithTextarea
                        name="source"
                        placeholder={selectFromConfig.placeholder}
                        clear
                        title="Source Code"
                        dataLoaderMode={sourceLoaderMode}
                        returnValue={handleSourceChange}
                    />

                    <ValidationResult
                        language={selectFromConfig.language}
                        loading={delayLoad}
                        success={hasSuccess}
                        error={hasError}
                        errorMessage={errorMessage}
                    />
                </div>
            ) : (
                <div className="col-stretch-5 md:row-stretch-5 w-full">
                    <BlockWithTextarea
                        name="source"
                        placeholder={selectFromConfig.placeholder}
                        clear
                        title="Source Code"
                        dataLoaderMode={{
                            loading: delayLoad,
                            error: false,
                            success: false,
                        }}
                        returnValue={handleSourceChange}
                    />

                    <BlockWithTextarea
                        name="result"
                        placeholder={resultPlaceholder}
                        copy
                        readOnly
                        title="Result Code"
                        dataLoaderMode={resultLoaderMode}
                        result={result}
                    />
                </div>
            )}

            <div className="row-center-2">
                <GeneralButton
                    className="rounded-[4px]!"
                    variant="aurora"
                    disabled={delayLoad || !value.trim()}
                    icon={
                        <motion.div
                            animate={{
                                opacity: delayLoad ? 1 : 0,
                                width: delayLoad ? "14px" : 0,
                                height: delayLoad ? "14px" : 0,
                                marginRight: delayLoad ? 0 : "-10px",
                            }}
                            transition={{
                                duration: 0.5,
                                opacity: {
                                    duration: 0.2,
                                },
                            }}
                        >
                            <IconLoader2 className="w-full aspect-square animate-spin" />
                        </motion.div>
                    }
                    textButton={selectFromConfig.actionButtonText}
                    handleAction={handleConvert}
                />
            </div>
        </>
    );
};
