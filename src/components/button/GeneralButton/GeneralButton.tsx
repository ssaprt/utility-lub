"use client";

import { IconCheck, IconCopy } from "@tabler/icons-react";
import { motion, useAnimation } from "framer-motion";
import {
    cloneElement,
    ReactNode,
    useEffect,
    useRef,
    useState,
    type ReactElement,
} from "react";
import {
    DEFAULT_GENERAL_BUTTON_STYLE,
    GeneralButtonStyle,
    generalButtonStyles,
} from "./styles";

interface GeneralButtonProps {
    textButton: ReactNode | string;
    active?: boolean;
    className?: string;
    variant?: GeneralButtonStyle;
    download?: {
        path: string;
        fileName: string;
    };
    icon?: ReactElement<{
        className?: string;
    }>;
    type?: "button" | "submit" | "reset";
    copy?: {
        copyItem: string;
    };
    handleAction?: () => void;
    disabled?: boolean;
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
    variant = DEFAULT_GENERAL_BUTTON_STYLE,
    download,
    type = "button",
    copy,
    icon,
    handleAction,
    disabled,
}: GeneralButtonProps) => {
    const controls = useAnimation();

    const [copied, setCopied] = useState(false);

    const [animationZ, setAnimationZ] = useState<AnimationZ>({
        press: -12,
        pop: 8,
    });

    const buttonRef = useRef<HTMLButtonElement>(null);

    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const variantStyles = generalButtonStyles[variant];

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
                scale: copy ? [1, 0.96, 1.035, 0.99, 1] : 1,
                transition: {
                    z: {
                        duration: 0.25,
                        times: [0, 0.25, 0.9, 1],
                    },
                    scale: copy
                        ? {
                              duration: 0.38,
                              times: [0, 0.18, 0.48, 0.75, 1],
                              ease: [0.22, 1, 0.36, 1],
                          }
                        : {
                              duration: 0,
                          },
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
            disabled={disabled}
            aria-pressed={typeof active === "boolean" ? active : undefined}
            ref={buttonRef}
            type={type}
            key={typeof textButton === "string" ? textButton : undefined}
            className={`
                row-center-2
                relative
                isolate
                shrink-0
                overflow-hidden
                px-2
                py-1
                select-none
                hover:cursor-pointer

                ${variantStyles.base}

                ${active ? variantStyles.active : ""}

                ${active ? "pointer-events-none" : ""}

                ${className ?? ""}

                ${disabled ? "cursor-not-allowed! opacity-40!" : ""}
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

            <span className="relative z-1 text-[12px]">{textButton}</span>

            {copy && (
                <span className="relative z-1 size-4 shrink-0">
                    <motion.span
                        className="absolute inset-0"
                        initial={false}
                        animate={{
                            opacity: copied ? 0 : 1,
                            scale: copied ? 0.7 : 1,
                        }}
                        transition={{
                            duration: 0.14,
                            ease: [0.4, 0, 0.2, 1],
                        }}
                    >
                        <IconCopy className="size-4" />
                    </motion.span>

                    <motion.span
                        className="absolute inset-0"
                        initial={false}
                        animate={
                            copied
                                ? {
                                      opacity: 1,
                                      scale: [0.65, 1.18, 1],
                                  }
                                : {
                                      opacity: 0,
                                      scale: 0.7,
                                  }
                        }
                        transition={
                            copied
                                ? {
                                      opacity: {
                                          duration: 0.1,
                                      },
                                      scale: {
                                          duration: 0.28,
                                          times: [0, 0.65, 1],
                                          ease: [0.22, 1, 0.36, 1],
                                      },
                                  }
                                : {
                                      duration: 0.14,
                                      ease: [0.4, 0, 0.2, 1],
                                  }
                        }
                    >
                        <IconCheck className="size-4" />
                    </motion.span>
                </span>
            )}
        </motion.button>
    );
};

GeneralButton.displayName = "GeneralButton";
