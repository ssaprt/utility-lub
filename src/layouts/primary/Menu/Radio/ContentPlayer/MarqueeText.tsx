"use client";

import { motion } from "framer-motion";

import { ReactNode, useEffect, useRef, useState } from "react";

type MarqueeTextProps = {
    children: ReactNode;
    className?: string;
    duration?: number;
    gap?: number;
    align?: "start" | "center";
};

export const MarqueeText = ({
    children,
    className = "",
    duration = 12,
    gap = 24,
    align = "start",
}: MarqueeTextProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLSpanElement>(null);

    const [isOverflowing, setIsOverflowing] = useState(false);
    const [distance, setDistance] = useState(0);

    useEffect(() => {
        const container = containerRef.current;
        const content = contentRef.current;

        if (!container || !content) return;

        let frame = 0;

        const update = () => {
            cancelAnimationFrame(frame);

            frame = requestAnimationFrame(() => {
                const containerWidth = container.getBoundingClientRect().width;

                const contentWidth = content.getBoundingClientRect().width;

                setIsOverflowing(contentWidth > containerWidth + 1);

                setDistance(contentWidth + gap);
            });
        };

        update();

        const observer = new ResizeObserver(update);

        observer.observe(container);
        observer.observe(content);

        return () => {
            cancelAnimationFrame(frame);
            observer.disconnect();
        };
    }, [children, gap]);

    return (
        <div
            ref={containerRef}
            className={`
                min-w-0
                overflow-hidden
                whitespace-nowrap
                ${className}
            `}
        >
            <motion.div
                initial={false}
                animate={
                    isOverflowing
                        ? {
                              x: [0, -distance],
                          }
                        : {
                              x: 0,
                          }
                }
                transition={
                    isOverflowing
                        ? {
                              duration,
                              ease: "linear",
                              repeat: Infinity,
                          }
                        : {
                              duration: 0,
                          }
                }
                className={`
                    flex
                    items-center
                    ${
                        isOverflowing
                            ? "w-max"
                            : `w-full ${
                                  align === "center"
                                      ? "justify-center"
                                      : "justify-start"
                              }`
                    }
                `}
                style={{
                    gap: `${gap}px`,
                }}
            >
                <span
                    ref={contentRef}
                    className="block w-max shrink-0 whitespace-nowrap"
                >
                    {children}
                </span>

                {isOverflowing && (
                    <span
                        aria-hidden="true"
                        className="block w-max shrink-0 whitespace-nowrap"
                    >
                        {children}
                    </span>
                )}
            </motion.div>
        </div>
    );
};
