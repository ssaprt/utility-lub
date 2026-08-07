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

interface AnimationZ {
    press: number;
    pop: number;
}

const PERSPECTIVE = 600;

const PRESS_DISTANCE = 3;
const POP_DISTANCE = 2;

const MIN_PRESS_Z = -35;
const MAX_PRESS_Z = -4;

const MIN_POP_Z = 3;
const MAX_POP_Z = 24;

const getZForPixelChange = (
    size: number,
    pixels: number,
    perspective: number,
): number => {
    if (size <= 0) {
        return 0;
    }

    const targetSize = Math.max(1, size + pixels * 2);

    const scale = targetSize / size;

    return perspective * (1 - 1 / scale);
};

const getAnimationZ = (width: number): AnimationZ => {
    const calculatedPress = getZForPixelChange(
        width,
        -PRESS_DISTANCE,
        PERSPECTIVE,
    );

    const calculatedPop = getZForPixelChange(width, POP_DISTANCE, PERSPECTIVE);

    return {
        press: Math.max(MIN_PRESS_Z, Math.min(MAX_PRESS_Z, calculatedPress)),

        pop: Math.max(MIN_POP_Z, Math.min(MAX_POP_Z, calculatedPop)),
    };
};

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

    const [animationZ, setAnimationZ] = useState<AnimationZ>({
        press: -12,
        pop: 8,
    });

    const buttonRef = useRef<HTMLButtonElement>(null);

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
            await controls.start({
                z: [0, animationZ.press, animationZ.pop, 0],

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
        const element = buttonRef.current;

        if (!element) {
            return;
        }

        const updateAnimationZ = () => {
            const { width } = element.getBoundingClientRect();

            setAnimationZ(getAnimationZ(width));
        };

        updateAnimationZ();

        const resizeObserver = new ResizeObserver(updateAnimationZ);

        resizeObserver.observe(element);

        return () => {
            resizeObserver.disconnect();
        };
    }, []);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return (
        <motion.button
            ref={buttonRef}
            type={type}
            key={textButton}
            className={`
                ${className ?? ""}
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
                ${
                    active
                        ? "pointer-events-none bg-black/40 shadow-md shadow-black/60"
                        : ""
                }
            `}
            initial={false}
            style={{
                transformPerspective: PERSPECTIVE,
                transformStyle: "preserve-3d",
            }}
            animate={
                active !== undefined
                    ? active
                        ? {
                              z: [0, animationZ.press, animationZ.pop, 0],
                          }
                        : {
                              z: 0,
                          }
                    : controls
            }
            transition={
                active !== undefined
                    ? {
                          z: {
                              duration: 0.25,
                              times: [0, 0.25, 0.9, 1],
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
