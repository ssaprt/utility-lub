import { IconAlertCircleFilled } from "@tabler/icons-react";
import {
    forwardRef,
    useEffect,
    useState,
    type ChangeEvent,
    type FocusEvent,
} from "react";

type InputSize = "2xs" | "xs" | "sm" | "md" | "lg";

type InputType = {
    value?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
    type?: "text" | "password" | "email" | "number";
    name: string;
    placeholder?: string;
    disabled?: boolean;
    label?: string;
    error?: string;
    required?: boolean;
    size?: InputSize;
    className?: string;
    inputClassName?: string;
};

const sizeStyles: Record<
    InputSize,
    {
        wrapper: string;
        input: string;
        labelActive: string;
        labelInactive: string;
        labelLeft: string;
        requiredRight: string;
        icon: string;
        error: string;
    }
> = {
    "2xs": {
        wrapper: "h-[24px] py-[1px]",
        input: "h-full px-[5px] py-0 lg:!text-[10px]",
        labelActive: "top-[1px] text-[7px] px-[2px] py-0",
        labelInactive: "top-1/2 text-[9px] px-[2px] py-0",
        labelLeft: "left-[3px]",
        requiredRight: "right-[5px]",
        icon: "w-[10px] h-[10px]",
        error: "text-[8px]",
    },
    xs: {
        wrapper: "h-[30px] py-[2px]",
        input: "h-full px-[7px] py-[1px] lg:!text-[11px]",
        labelActive: "top-[2px] text-[7px] px-[3px] py-0",
        labelInactive: "top-1/2 text-[10px] px-[3px] py-0",
        labelLeft: "left-[6px]",
        requiredRight: "right-[8px]",
        icon: "w-[11px] h-[11px]",
        error: "text-[9px]",
    },
    sm: {
        wrapper: "h-[40px] py-[4px]",
        input: "h-full px-[9px] py-[2px] lg:!text-[12px]",
        labelActive: "top-[3px] text-[8px] px-[4px] py-[1px]",
        labelInactive: "top-1/2 text-[11px] px-[4px] py-[1px]",
        labelLeft: "left-[9px]",
        requiredRight: "right-[12px]",
        icon: "w-[13px] h-[13px]",
        error: "text-[10px]",
    },
    md: {
        wrapper: "h-[48px] py-[6px]",
        input: "h-full px-[11px] py-[3px] lg:!text-[13px]",
        labelActive: "top-[4px] text-[9px] px-[5px] py-[1px]",
        labelInactive: "top-1/2 text-[12px] px-[5px] py-[1px]",
        labelLeft: "left-[9px]",
        requiredRight: "right-[15px]",
        icon: "w-[15px] h-[15px]",
        error: "text-[11px]",
    },
    lg: {
        wrapper: "h-[56px] py-[8px]",
        input: "h-full px-[13px] py-[4px] lg:!text-[14px]",
        labelActive: "top-[5px] text-[10px] px-[6px] py-[2px]",
        labelInactive: "top-1/2 text-[13px] px-[6px] py-[2px]",
        labelLeft: "left-[15px]",
        requiredRight: "right-[19px]",
        icon: "w-[17px] h-[17px]",
        error: "text-[12px]",
    },
};

export const Input = forwardRef<HTMLInputElement, InputType>(
    (
        {
            value = "",
            onChange,
            onBlur,
            type = "text",
            name,
            placeholder,
            disabled,
            label,
            error,
            required = false,
            size = "sm",
            className = "",
            inputClassName = "",
        },
        ref,
    ) => {
        const [val, setVal] = useState(value);
        const styles = sizeStyles[size];
        const active = val.length > 0;

        useEffect(() => {
            setVal(value);
        }, [value]);

        return (
            <div
                className={`
                    relative
                    flex 
                    overflow-visible 
                    shrink-0
                    ${styles.wrapper}
                    ${className}
                `}
            >
                {label && (
                    <label
                        htmlFor={name}
                        className={`
                            absolute
                            z-10
                            flex
                            -translate-y-1/2
                            flex-row
                            items-center 
                            text-fg/50
                            gap-[2px]
                            rounded-[3px]
                            font-[var(--font-inner)]
                            pointer-events-none
                            transition-all
                            duration-100
                            ease-in-out
                            ${styles.labelLeft}
                            ${
                                active
                                    ? `${styles.labelActive} bg-fg !text-app`
                                    : `${styles.labelInactive} bg-transparent text-fg`
                            }
                        `}
                    >
                        {label}
                    </label>
                )}

                {required && (
                    <div
                        className={`
                            absolute
                            z-10
                            flex
                            -translate-y-1/2
                            flex-row
                            items-center
                            gap-[2px]
                            rounded-[3px]
                            font-[var(--font-inner)]
                            pointer-events-none
                            transition-all
                            duration-100
                            ease-in-out
                            ${styles.requiredRight}
                            ${
                                active
                                    ? `${styles.labelActive} bg-fg !text-app`
                                    : `${styles.labelInactive} bg-transparent text-fg`
                            }
                        `}
                    >
                        <IconAlertCircleFilled className={styles.icon} />
                        required
                    </div>
                )}

                <input
                    id={name}
                    name={name}
                    ref={ref}
                    type={type}
                    value={val}
                    placeholder={placeholder}
                    required={required}
                    disabled={disabled}
                    onChange={(event) => {
                        setVal(event.target.value);
                        onChange?.(event);
                    }}
                    onBlur={onBlur}
                    className={`
                        min-w-0
                        w-full
                        rounded-[4px]
                        border
                        border-fg/10
                        bg-fg/10
                        shadow-[inset_0px_0px_5px_0px]
                        shadow-app/30
                        focus:outline-none
                        focus:ring-1
                        focus:ringfg/50
                        disabled:cursor-not-allowed
                        disabled:bg-fg/20
                        disabled:text-fg/50
                        placeholder:text-[inherit]
                        ${styles.input}
                        ${inputClassName}
                    `}
                />

                {error && (
                    <span
                        className={`
                            absolute
                            top-full
                            left-[4px]
                            mt-[2px]
                            text-red-400
                            ${styles.error}
                        `}
                    >
                        {error}
                    </span>
                )}
            </div>
        );
    },
);

Input.displayName = "Input";
