"use client";

import { useAppContextValues } from "@/context/appContext";
import { motion } from "framer-motion";

export const FadeTitle = () => {
    const { header } = useAppContextValues();
    const { iconHeader, titleHeader, isScrolled } = header ?? {};
    const scrolled = isScrolled?.scroll.scrolled;

    const visible = Boolean(scrolled && titleHeader?.length);

    return (
        <motion.div
            initial={false}
            animate={{
                opacity: visible ? 1 : 0,
                x: visible ? 0 : 8,
            }}
            transition={{
                opacity: {
                    duration: 0.14,
                },
                x: {
                    type: "spring",
                    stiffness: 220,
                    damping: 14,
                },
            }}
            className="
                absolute
                inset-y-0
                right-0
                left-[60px]

                flex
                min-w-0
                items-center
                gap-1
                overflow-hidden

                lg:left-0
            "
            style={{
                pointerEvents: visible ? "auto" : "none",
            }}
            aria-hidden={!visible}
        >
            {iconHeader && (
                <span
                    className="
                        flex
                        shrink-0
                        items-center
                        justify-center
                    "
                >
                    {iconHeader}
                </span>
            )}

            <span
                className="
                    min-w-0
                    overflow-hidden
                    text-ellipsis
                    whitespace-nowrap
                    text-fg
                "
            >
                {titleHeader}
            </span>
        </motion.div>
    );
};
