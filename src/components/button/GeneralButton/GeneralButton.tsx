import { IconCopy, IconCopyCheckFilled } from "@tabler/icons-react";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface GeneralButtonProps {
    textButton: string;
    active?: boolean;
    copy?: {
        copyItem: string;
    };
    handleAction?: () => void;
}

export const GeneralButton = ({
    textButton,
    active,
    copy,
    handleAction,
}: GeneralButtonProps) => {
    const controls = useAnimation();
    const [copied, setCopied] = useState(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleClick = async () => {
        if (copy) {
            await navigator.clipboard.writeText(copy.copyItem);
            setCopied(true);

            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            timeoutRef.current = setTimeout(() => {
                setCopied(false);
            }, 1500);
        }

        if (active === undefined) {
            controls.start({
                scale: [1, 0.85, 1.05, 1],
                transition: {
                    duration: 0.25,
                    times: [0, 0.25, 0.9, 1],
                },
            });
        }

        handleAction?.();
    };

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return (
        <motion.button
            type="button"
            key={textButton}
            className={`flex 
                flex-row 
                gap-2 
                items-center 
                px-2 
                py-1 
                rounded-[6px] 
                ${active ? "bg-black/40 pointer-events-none" : ""} 
                border-2
                border-pink-300/80 
                shadow-md 

                hover:bg-black/25
                hover:cursor-pointer
                hover:shadow-xl
            `}
            initial={false}
            animate={
                active !== undefined
                    ? {
                          scale: active ? [1, 0.92, 1.05, 1] : 1,
                      }
                    : controls
            }
            transition={
                active !== undefined
                    ? {
                          scale: {
                              duration: 0.25,
                              times: [0, 0.45, 0.9, 1],
                          },
                      }
                    : undefined
            }
            onClick={handleClick}
        >
            <span className="text-[12px]">{textButton}</span>
            {copy &&
                (copied ? (
                    <IconCopyCheckFilled className="w-4 h-4" />
                ) : (
                    <IconCopy className="w-4 h-4" />
                ))}
        </motion.button>
    );
};
