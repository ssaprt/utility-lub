import { useAppContextValues } from "@/context/appContext";
import { motion } from "framer-motion";
import { HeaderTitle } from "../../../../components/HeaderTitle/HeaderTitle";
import styles from "../Header.module.css";
import { FadeTitle } from "./FadeTitle";
import { MenuButton } from "./MenuButton/MenuButton";

export const Left = () => {
    const { header } = useAppContextValues();
    const { isScrolled, titleHeader } = header ?? {};
    const scrolled = isScrolled?.scroll.scrolled;

    const pageTitleVisible = Boolean(scrolled && titleHeader?.length);

    return (
        <div
            className={`
                ${styles.left}
                min-w-0
                flex-1
            `}
        >
            <MenuButton />

            <div
                className="
                    relative
                    min-w-0
                    flex-1
                    self-stretch
                    overflow-hidden
                "
            >
                <motion.div
                    initial={false}
                    animate={{
                        opacity: pageTitleVisible ? 0 : 1,
                        x: pageTitleVisible ? 0 : -8,
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
                        ml-[60px]
                        mt-1
                        min-w-0
                        lg:hidden
                    "
                >
                    <HeaderTitle />
                </motion.div>

                <FadeTitle />
            </div>
        </div>
    );
};
