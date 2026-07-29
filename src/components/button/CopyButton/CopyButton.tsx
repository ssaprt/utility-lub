import { IconCopy, IconSquareCheck } from "@tabler/icons-react";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export const CopyButton = ({
    textToCopy,
    currentValue,
    returnValue,
    copy = true,
    className,
    children,
}: {
    textToCopy?: string;

    returnValue?: () => void;
    //eslint-disable-next-line
    currentValue?: any;
    copy?: boolean;
    className?: string;
    children?: string;
}) => {
    const [copied, setCopied] = useState(false);

    const controls = useAnimation();

    const copiedTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleClick = async () => {
        returnValue?.();
        if (!copy) return;
        if (copiedTimerRef.current) {
            clearTimeout(copiedTimerRef.current);
        }

        await controls.set("idle");

        const animationPromise = controls.start("pulse");

        try {
            await navigator.clipboard.writeText(textToCopy || "");

            setCopied(true);

            copiedTimerRef.current = setTimeout(() => {
                setCopied(false);
                copiedTimerRef.current = null;
            }, 1000);
        } catch {
            setCopied(false);
        }

        await animationPromise;
    };

    useEffect(() => {
        return () => {
            if (copiedTimerRef.current) {
                clearTimeout(copiedTimerRef.current);
            }
        };
    }, []);
    return (
        <motion.div
            initial="idle"
            animate={controls}
            variants={{
                idle: {
                    scale: 1,
                    rotate: 0,
                },
                pulse: {
                    scale: [1, 1.1, 0.96, 1],
                    rotate: [0, -3, 3, 0],
                    transition: {
                        type: "tween",
                        duration: 0.45,
                        times: [0, 0.35, 0.7, 1],
                        ease: ["easeOut", "easeInOut", "easeOut"],
                    },
                },
            }}
            onClick={() => {
                handleClick();
            }}
            className={`${className} flex cursor-pointer select-none flex-row items-center gap-2 rounded border p-2 hover:bg-pink-400/10 hover:text-pink-400 ${currentValue === children && "bg-pink-400/30"}`}
        >
            <span className="text-[14px]">{children || textToCopy}</span>

            {copy && (copied ? <IconSquareCheck /> : <IconCopy />)}
        </motion.div>
    );
};
