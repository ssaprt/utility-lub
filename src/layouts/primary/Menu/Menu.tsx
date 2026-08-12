import { useAppContextValues } from "@/context/appContext";
import { motion } from "framer-motion";
import { useRef } from "react";

import { Hr } from "@/components/hr/Hr/Hr";
import { useBreakpoint } from "@/hooks/useBreakPoint";
import { Scroll } from "../Scroll";
import { HeaderTitle } from "./HeaderTitle/HeaderTitle";
import styles from "./Menu.module.css";
import { OpenData } from "./ReactAndNext/OpenData/OpenData";
import { ReactAndNext } from "./ReactAndNext/ReactAndNext";

export const Menu = () => {
    const contentRef = useRef<HTMLDivElement>(null);
    const { menu } = useAppContextValues();
    const { noneAnimationMenu, openMenu } = menu;
    const isDesktop = useBreakpoint("lg");

    return (
        <div
            className={`
                ${styles.menu}
                ${openMenu ? styles.open : ""}
                 
            `}
            style={{
                transition: noneAnimationMenu
                    ? "none"
                    : "width 0.35s ease, margin-left 0.35s ease-out",
            }}
        >
            <div className={styles.panel}>
                {!isDesktop ? (
                    <>
                        <motion.div
                            className="ml-4 lg:ml-0 w-[120px]"
                            animate={{
                                opacity: openMenu ? 1 : 0,
                            }}
                            transition={{
                                opacity: {
                                    duration: 0.3,
                                },
                            }}
                        >
                            <HeaderTitle />
                        </motion.div>

                        <Hr mode="horizontal" size={0} />
                    </>
                ) : (
                    <HeaderTitle />
                )}

                <div
                    ref={contentRef}
                    className={`${styles.content} px-4 lg:px-2`}
                >
                    <Scroll />

                    <div
                        className="
                            relative
                            flex
                            w-full
                            min-w-0
                            flex-1
                            flex-col
                            gap-1
                            pr-0
                            lg:pr-3
                        "
                    >
                        <div className="mt-2"></div>
                        <ReactAndNext />

                        {/*<div className="my-2 h-px shrink-0 border-b-1 border-pink-300/10" />

                       <CSSGenerator /> */}
                        <OpenData />
                    </div>
                </div>
            </div>
        </div>
    );
};
