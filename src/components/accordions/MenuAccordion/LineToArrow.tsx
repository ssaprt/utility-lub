"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export const LineToArrow = ({ active }: { active?: boolean }) => {
    const ref = useRef<SVGSVGElement>(null);
    const [hovered, setHovered] = useState(false);

    useEffect(() => {
        const parent = ref.current?.parentElement;

        if (!parent) return;

        const enter = () => setHovered(true);
        const leave = () => setHovered(false);

        parent.addEventListener("mouseenter", enter);
        parent.addEventListener("mouseleave", leave);

        return () => {
            parent.removeEventListener("mouseenter", enter);
            parent.removeEventListener("mouseleave", leave);
        };
    }, []);

    return (
        <svg
            ref={ref}
            viewBox="0 0 100 100"
            className="size-5 overflow-visible text-fg"
        >
            <motion.line
                y1="50"
                x2="80"
                y2="50"
                stroke="currentColor"
                strokeWidth={7}
                strokeLinecap="round"
                initial={false}
                animate={{
                    x1: hovered || active ? 40 : 20,
                }}
                transition={{
                    duration: 0.3,
                    ease: [0.22, 1, 0.36, 1],
                }}
            />

            <motion.path
                d="M 80 50 L 62 32"
                fill="none"
                stroke="currentColor"
                strokeWidth={7}
                strokeLinecap="round"
                initial={false}
                animate={{
                    pathLength: hovered || active ? 1 : 0,
                    opacity: hovered || active ? 1 : 0,
                }}
                transition={{
                    pathLength: {
                        duration: 0.3,
                        ease: [0.22, 1, 0.36, 1],
                    },
                    opacity: {
                        duration: 0.08,
                    },
                }}
            />

            <motion.path
                d="M 80 50 L 62 68"
                fill="none"
                stroke="currentColor"
                strokeWidth={7}
                strokeLinecap="round"
                initial={false}
                animate={{
                    pathLength: hovered || active ? 1 : 0,
                    opacity: hovered || active ? 1 : 0,
                }}
                transition={{
                    pathLength: {
                        duration: 0.3,
                        ease: [0.22, 1, 0.36, 1],
                    },
                    opacity: {
                        duration: 0.08,
                    },
                }}
            />
        </svg>
    );
};
