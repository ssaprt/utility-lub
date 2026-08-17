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
        if (!copied) return;

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
                scale: 1.05,
                boxShadow: "0 4px 12px var(--shadow-color)",
            }}
            whileTap={{
                scale: 0.98,
                y: -6,
            }}
            whileFocus={{
                scale: 1.02,
            }}
            transition={{
                duration: 0.13,
            }}
            onClick={handleCopy}
            className={`
                relative
                aspect-square
                w-full
                rounded-[12px]
                overflow-visible
                col-stretch-0
                border-1
                border-fg

                hover:cursor-pointer

                hover:[&>div:first-of-type:before]:bg-fg/100
                hover:[&>div:first-of-type>span]:text-app
                hover:[&>div:first-of-type>svg]:text-app
            `}
        >
            <div
                className={`
                    row-center-1
                    justify-between
                    flex-nowrap
                    w-full
                    py-[4px]
                    px-[6px]
                    overflow-hidden

                    before:transition-[background]
                    before:duration-300
                    before:ease-out
                    before:absolute
                    before:size-full
                    before:bg-fg/0
                    before:overflow-hidden
                    before:rounded-inherit
                    before:z-[-1]
                    before:left-0
                    before:top-0

                    rounded-[10px_10px_0_0]
                `}
            >
                <span className="text-[10px] text-fg transition-colors duration-300 ease-out text-ellipsis overflow-hidden whitespace-nowrap">
                    {item.title}
                </span>

                {!copied && (
                    <IconCopy className="text-fg w-4 h-4 shrink-0 transition-colors duration-300 ease-out" />
                )}

                {copied && (
                    <IconCopyCheck className="text-fg w-4 h-4 shrink-0 transition-colors duration-300 ease-out" />
                )}
            </div>

            <div
                style={style}
                className="
        flex-1
        shrink-0
        w-full
        rounded-[0_0_12px_12px]
        overflow-hidden
    "
            >
                {contentNode}
            </div>

            <motion.div
                animate={{
                    opacity: copied ? 1 : 0,
                    translateY: copied ? -12 : 0,
                }}
                transition={{
                    duration: 0.2,
                }}
                className={`
                    row-center-1
                    py-1
                    px-2
                    absolute
                    bottom-full
                    rounded-[12px]
                    left-1/2
                    translate-x-[-50%]
                    border-1
                    border-fg
                    bg-app
                    transition-[background]
                    duration-300
                    ease-out
                `}
            >
                <span className="text-[10px]">Copied!</span>

                <IconCopyCheckFilled className="w-4 h-4 text-fg shrink-0" />
            </motion.div>
        </motion.div>
    );
};
