"use client";

import { motion } from "framer-motion";

import { useRadioContext } from "../context/RadioContext";

const PAUSE = "M11 10 L17 10 L17 26 L11 26 " + "M20 10 L26 10 L26 26 L20 26";

const PLAY =
    "M11 10 L18 13.74 L18 22.28 L11 26 " + "M18 13.74 L26 18 L26 18 L18 22.28";

export const PlayPauseButton = ({ className }: { className?: string }) => {
    const { player } = useRadioContext();

    const isPlaying = player.play === "play";

    return (
        <svg
            viewBox="0 0 36 36"
            className={`size-7 shrink-0 overflow-visible ${className}`}
            aria-hidden="true"
        >
            <motion.path
                initial={false}
                animate={{
                    d: isPlaying ? PAUSE : PLAY,
                    x: isPlaying ? 0 : 2,
                }}
                transition={{
                    duration: 0.1,
                    ease: [0.4, 0, 1, 1],
                }}
                className="fill-fg"
            />
        </svg>
    );
};
