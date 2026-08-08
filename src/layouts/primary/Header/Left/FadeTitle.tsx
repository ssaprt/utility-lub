"use client";

import { useAppContextValues } from "@/context/appContext";
import { motion } from "framer-motion";

export const FadeTitle = () => {
    const { header } = useAppContextValues();
    const { iconHeader, titleHeader, isScrolled } = header ?? {};

    return (
        <motion.div
            initial={false}
            animate={{
                opacity: isScrolled && titleHeader?.length ? 1 : 0,
                x: isScrolled && titleHeader?.length ? 0 : 8,
            }}
            transition={{
                opacity: {
                    duration: isScrolled && titleHeader?.length ? 0.14 : 0.14,
                },
                x: {
                    type: "spring",
                    stiffness: 220,
                    damping: 14,
                },
            }}
            className="
                flex
                flex-row
                items-center
                gap-1 
                absolute 
                top-1/2  
                -translate-y-1/2
                left-[60px]
              
            "
            style={{
                pointerEvents:
                    isScrolled && titleHeader?.length ? "auto" : "none",
            }}
            aria-hidden={!isScrolled && !titleHeader?.length}
        >
            {iconHeader}
            <span className="text-pink-300">{titleHeader}</span>
        </motion.div>
    );
};
