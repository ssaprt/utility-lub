"use client";

import { IconCopy, IconCopyCheckFilled } from "@tabler/icons-react";
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
            aria-pressed={typeof active === "boolean" ? active : undefined}
            ref={buttonRef}
            type={type}
            key={typeof textButton === "string" ? textButton : undefined}
            className={`
                row-center-2
                shrink-0
                px-2
                py-1
                select-none
                hover:cursor-pointer

                ${variantStyles.base}

                ${active ? variantStyles.active : ""}

                ${active ? "pointer-events-none" : ""}

                ${className ?? ""}
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
