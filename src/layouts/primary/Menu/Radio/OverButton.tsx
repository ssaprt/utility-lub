import { useAppContextValues } from "@/context/appContext";
import { AnimatePresence, motion } from "framer-motion";
import { CLOSE_DURATION, FULL_DURATION } from "./config";
import { useRadioContext } from "./context/RadioContext";

export const OverButton = () => {
    const { viewRadioController } = useAppContextValues();
    const { transitionMode, toLarge } = useRadioContext();

    const isClosing = transitionMode === "closing";

    return (
        <AnimatePresence>
            {viewRadioController === "full" && (
                <motion.button
                    type="button"
                    aria-label="Collapse radio"
                    onClick={() => {
                        if (!isClosing) {
                            toLarge();
                        }
                    }}
                    initial={{
                        opacity: 0,
                        backdropFilter: "blur(0px)",
                    }}
                    animate={{
                        opacity: isClosing ? 0 : 1,
                        backdropFilter: isClosing ? "blur(0px)" : "blur(2px)",
                    }}
                    exit={{
                        opacity: 0,
                        backdropFilter: "blur(0px)",
                    }}
                    transition={{
                        opacity: {
                            duration: isClosing
                                ? CLOSE_DURATION
                                : FULL_DURATION,
                            ease: [0.22, 1, 0.36, 1],
                        },
                        backdropFilter: {
                            duration: isClosing
                                ? CLOSE_DURATION
                                : FULL_DURATION,
                            ease: [0.22, 1, 0.36, 1],
                        },
                    }}
                    className="
                fixed
                inset-0
                z-[1002]
                border-0
                bg-black/60
                cursor-pointer
                transition-all
                duration-200
                ease-in-out
                hover:bg-black/50
                pointer-events-auto
                touch-none
            "
                />
            )}
        </AnimatePresence>
    );
};
