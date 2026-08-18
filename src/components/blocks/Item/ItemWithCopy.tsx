"use client";

import {
    IconCopy,
    IconCopyCheck,
    IconCopyCheckFilled,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import {
    CSSProperties,
    isValidElement,
    useEffect,
    useRef,
    useState,
} from "react";
import { cssPropertiesToString } from "./css-to-string";

const isCSSProperties = (
    value: React.ReactNode | CSSProperties,
): value is CSSProperties => {
    return (
        typeof value === "object" &&
        value !== null &&
        !Array.isArray(value) &&
        !isValidElement(value)
    );
};

export const ItemWithCopy = ({
    handleAction,
    item,
}: {
    item: {
        id: string;
        title: string;
        content: React.ReactNode | CSSProperties;
        copyContent?: string;
    };
    handleAction?: () => void;
}) => {
    const [copied, setCopied] = useState(false);
    const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [time, setTime] = useState(1500);

    const style: CSSProperties | undefined = isCSSProperties(item.content)
        ? item.content
        : typeof item.content === "string"
          ? {
                background: item.content,
            }
          : undefined;

    const forCopy =
        item.copyContent ??
        (isCSSProperties(item.content)
            ? cssPropertiesToString(item.content)
            : typeof item.content === "string"
              ? item.content
              : "");

    const contentNode =
        !isCSSProperties(item.content) && typeof item.content !== "string"
            ? item.content
            : null;

    useEffect(() => {
        if (!copied) {
            return;
        }

        if (timer.current) {
            clearTimeout(timer.current);
        }

        timer.current = setTimeout(() => {
            setCopied(false);
        }, time);

        return () => {
            if (timer.current) {
                clearTimeout(timer.current);
            }
        };
    }, [copied, time]);

    const handleCopy = async () => {
        handleAction?.();

        await navigator.clipboard.writeText(forCopy);

        setTime(1500);
        setCopied(true);
    };

    return (
        <motion.div
            whileHover={{
                scale: 1.02,
                boxShadow: "0 4px 12px var(--shadow-color)",
            }}
            whileTap={{
                scale: 0.98,
                y: -1,
            }}
            whileFocus={{
                scale: 1.02,
            }}
            transition={{
                duration: 0.13,
            }}
            onClick={handleCopy}
            className="
                relative
                isolate
                aspect-square
                w-full
                overflow-visible
                rounded-[12px]
                border-1
                border-fg
                col-stretch-0

                hover:cursor-pointer

                hover:[&>div:first-of-type:before]:bg-fg/100
                hover:[&>div:first-of-type>span]:text-app
                hover:[&>div:first-of-type>svg]:text-app
            "
        >
            <div
                className="
                    row-center-1
                    relative
                    w-full
                    flex-nowrap
                    justify-between
                    overflow-hidden
                    rounded-[10px_10px_0_0]
                    px-[6px]
                    py-[4px]

                    before:absolute
                    before:top-0
                    before:left-0
                    before:z-[-1]
                    before:size-full
                    before:overflow-hidden
                    before:rounded-inherit
                    before:bg-fg/0
                    before:transition-[background]
                    before:duration-300
                    before:ease-out
                "
            >
                <span className="overflow-hidden text-[10px] text-ellipsis whitespace-nowrap text-fg transition-colors duration-300 ease-out">
                    {item.title}
                </span>

                {!copied && (
                    <IconCopy className="h-4 w-4 shrink-0 text-fg transition-colors duration-300 ease-out" />
                )}

                {copied && (
                    <IconCopyCheck className="h-4 w-4 shrink-0 text-fg transition-colors duration-300 ease-out" />
                )}
            </div>

            <div
                style={style}
                className="
                    w-full
                    flex-1
                    shrink-0
                    overflow-hidden
                    rounded-[0_0_12px_12px]
                "
            >
                {contentNode}
            </div>

            <motion.div
                initial={false}
                animate={{
                    opacity: copied ? 1 : 0,
                    x: "-50%",
                    y: copied ? -12 : 0,
                    scale: copied ? 1 : 0.96,
                }}
                transition={{
                    duration: 0.18,
                    ease: "easeOut",
                }}
                style={{
                    visibility: copied ? "visible" : "hidden",
                }}
                className="
                    row-center-1
                    pointer-events-none
                    absolute
                    bottom-full
                    left-1/2
                    z-50
                    w-max
                    min-w-max
                    transform-gpu
                    flex-nowrap
                    whitespace-nowrap
                    rounded-[8px]
                    border
                    border-fg
                    bg-app
                    px-2
                    py-1
                    text-fg
                    shadow-lg
                    shadow-black/20
                "
            >
                <span className="shrink-0 text-[10px] whitespace-nowrap">
                    Copied!
                </span>

                <IconCopyCheckFilled className="h-4 w-4 shrink-0 text-fg" />
            </motion.div>
        </motion.div>
    );
};
