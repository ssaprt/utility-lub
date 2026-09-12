"use client";

import { DynamicSvgIcon } from "@/components/svg/DynamicSVGIcon";

import { motion } from "framer-motion";

import { useEffect } from "react";

import type { ReactNode } from "react";

type SelectWindowProps = {
    title: string;
    children: ReactNode;
    onClose: () => void;
};

export const SelectWindow = ({
    title,
    children,
    onClose,
}: SelectWindowProps) => {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [onClose]);

    return (
        <div
            className="
                fixed
                inset-0
                z-1003!
                flex
                items-center
                justify-center
                bg-black/40
                p-2
                sm:p-4
            "
            onClick={onClose}
        >
            <motion.div
                layout
                transition={{
                    layout: {
                        duration: 0.3,
                        ease: [0.22, 1, 0.36, 1],
                    },
                }}
                className="
                    flex
                    w-[min(680px,calc(100vw-16px))]
                    max-h-[calc(100dvh-16px)]
                    min-h-0
                    flex-col
                    overflow-hidden
                    rounded-xl
                    border
                    border-fg/10
                    bg-app
                    shadow-2xl
                    sm:w-[min(680px,calc(100vw-32px))]
                    sm:max-h-[calc(100dvh-32px)]
                "
                onClick={(event) => event.stopPropagation()}
            >
                <div
                    className="
                        row-center-1
                        shrink-0
                        w-full
                        justify-between
                        px-3
                        py-2
                        border-b
                        border-fg/10
                    "
                >
                    <span className="text-sm">{title}</span>

                    <button
                        onClick={onClose}
                        className="
                            rounded-[4px]
                            bg-fg/10
                            p-1
                            hover:cursor-pointer
                            hover:bg-fg/20
                        "
                    >
                        <DynamicSvgIcon
                            name="close.svg"
                            className="w-4 h-4 fill-fg"
                        />
                    </button>
                </div>

                <motion.div
                    layout
                    transition={{
                        layout: {
                            duration: 0.3,
                            ease: [0.22, 1, 0.36, 1],
                        },
                    }}
                    className="
                        min-h-0
                        w-full
                        overflow-y-auto
                        p-2
                        sm:p-3
                    "
                >
                    {children}
                </motion.div>
            </motion.div>
        </div>
    );
};
