"use client";

import { Scroll } from "@/layouts/primary/Scroll";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import {
    type ChangeEvent,
    type HTMLAttributes,
    type ReactNode,
    useRef,
    useState,
} from "react";

import { Loader } from "../animationIcons/Loader/Loader";
import styles from "./TextAreaWithScrollBar.module.scss";

interface Props extends Omit<
    HTMLAttributes<HTMLDivElement>,
    "children" | "onChange"
> {
    children?: ReactNode;
    name: string;
    placeholder?: string;
    emoji?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    backValue: (value: string) => void;
    dataLoadingMode?: {
        loading: boolean;
        error: boolean;
        success?: boolean;
    };
}

const getTextValue = (value: ReactNode): string => {
    if (typeof value === "string" || typeof value === "number") {
        return String(value);
    }

    return "";
};

export const TextAreaWithScrollBar = ({
    children,
    name,
    placeholder,
    backValue,
    emoji = false,
    className,
    style,
    dataLoadingMode,
    disabled = false,
    readOnly = false,
    ...props
}: Props) => {
    const ref = useRef<HTMLTextAreaElement>(null);

    const containerRef = useRef<HTMLDivElement>(null);

    const [internalValue, setInternalValue] = useState(() =>
        getTextValue(children),
    );

    const hasExternalValue = children !== undefined;

    const externalValue = getTextValue(children);

    const value = hasExternalValue ? externalValue : internalValue;

    const loading = dataLoadingMode?.loading === true;

    const error = !loading && dataLoadingMode?.error === true;

    const success = !loading && !error && dataLoadingMode?.success === true;

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        const text = event.currentTarget.value;

        setInternalValue(text);
        backValue(text);
    };

    return (
        <div
            ref={containerRef}
            className={clsx(
                styles.textareaOverlay,
                className,
                `
                    border
                    border-fg/10
                    shadow-[inset_0px_0px_5px_0px]
                    shadow-black/55
                    rounded-lg
                    outline
                    outline-1
                    transition-[outline-color,background-color]
                    duration-200
                `,
                disabled ? "bg-fg/20 cursor-not-allowed" : "bg-fg/5",
                loading && "outline-fg/15",
                !loading && !error && !success && "outline-transparent",
                error && "outline-red-400/70",
                success && "outline-emerald-400/60",
            )}
            style={style}
            {...props}
        >
            <AnimatePresence>
                {loading && (
                    <motion.div
                        initial={{
                            opacity: 0,
                        }}
                        animate={{
                            opacity: 1,
                        }}
                        exit={{
                            opacity: 0,
                        }}
                        transition={{
                            duration: 0.15,
                        }}
                        className="
                            absolute
                            left-0
                            top-0
                            z-2
                            h-full
                            w-full
                            cursor-wait
                            rounded-[4px]
                            bg-app/60
                            backdrop-blur-[1px]
                        "
                    >
                        <Loader mode="wave" visible />
                    </motion.div>
                )}
            </AnimatePresence>

            <textarea
                disabled={disabled}
                readOnly={readOnly}
                ref={ref}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={handleChange}
                aria-invalid={error}
                aria-readonly={readOnly}
                className={clsx(
                    styles.textarea,
                    emoji && styles.emoji,
                    `
                        text-[16px]
                        lg:text-xs
                        focus:outline-fg/40!
                        focus-visible:outline-fg/40!
                    `,
                    disabled && "cursor-not-allowed",
                    readOnly && "cursor-default",
                    error &&
                        `
                            placeholder:text-red-400!
                            focus:outline-red-400/70!
                            focus-visible:outline-red-400/70!
                        `,
                    success &&
                        `
                            placeholder:text-emerald-400!
                            focus:outline-emerald-400/60!
                            focus-visible:outline-emerald-400/60!
                        `,
                )}
            />

            <Scroll target={ref} />
        </div>
    );
};

TextAreaWithScrollBar.displayName = "TextAreaWithScrollBar";
