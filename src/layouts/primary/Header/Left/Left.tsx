import { useAppContextValues } from "@/context/appContext";
import { motion } from "framer-motion";
import { HeaderTitle } from "../../Menu/HeaderTitle/HeaderTitle";
import styles from "../Header.module.css";
import { FadeTitle } from "./FadeTitle";

import { MenuButton } from "./MenuButton/MenuButton";

export const Left = () => {
    const { header } = useAppContextValues() ?? {};
    const { isScrolled, titleHeader } = header ?? {};

    return (
        <div className={styles.left}>
            <MenuButton />

            <div className="block lg:hidden">
                <motion.div
                    initial={false}
                    animate={{
                        opacity: isScrolled && titleHeader?.length ? 0 : 1,
                        x: isScrolled && titleHeader?.length ? 0 : -8,
                    }}
                    transition={{
                        opacity: {
                            duration:
                                isScrolled && titleHeader?.length ? 0.14 : 0.14,
                        },
                        x: {
                            type: "spring",
                            stiffness: 220,
                            damping: 14,
                        },
                    }}
                    className="ml-[60px] mt-1"
                >
                    <HeaderTitle />
                </motion.div>
                <FadeTitle />
            </div>

            <div className="hidden lg:block">
                <FadeTitle />
            </div>
        </div>
    );
};
