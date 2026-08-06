"use client";

import { IconCopy, IconCopyCheckFilled } from "@tabler/icons-react";
import { motion, useAnimation } from "framer-motion";
import { cloneElement, useEffect, useRef, useState } from "react";

interface GeneralButtonProps {
    textButton: string;
    active?: boolean;
    className?: string;
    download?: {
        path: string;
        fileName: string;
    };
    icon?: React.ReactElement<{
        className?: string;
    }>;
    type?: "button" | "submit" | "reset";
    copy?: {
        copyItem: string;
    };
    handleAction?: () => void;
}

export const GeneralButton = ({
    textButton,
    className,
    active,
    download,
    type = "button",
    copy,
    icon,
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

        if (download) {
            const normalizedPath = download.path.replace(/^\/+/, "");

            const element = document.createElement("a");

            element.href = `/${normalizedPath}`;
            element.download = download.fileName;
            element.style.display = "none";

            document.body.appendChild(element);
            element.click();
            element.remove();
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
            type={type}
            key={textButton}
            className={`
                ${className} 
                flex
                flex-row
                items-center
                gap-2
                rounded-[6px]
                border-2
                border-pink-300/80
                px-2
                py-1
                shadow-md
                hover:cursor-pointer
                hover:bg-black/25
                select-none
                hover:shadow-md
                hover:shadow-black/60
                ${active ? "pointer-events-none bg-black/40 shadow-md shadow-black/60" : ""}
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
            {icon &&
                cloneElement(icon, {
                    className: icon.props.className || "h-4 w-4",
                })}

            <span className="text-[12px]">{textButton}</span>

            {copy &&
                (copied ? (
                    <IconCopyCheckFilled className="h-4 w-4" />
                ) : (
                    <IconCopy className="h-4 w-4" />
                ))}
        </motion.button>
    );
};

GeneralButton.displayName = "GeneralButton";
