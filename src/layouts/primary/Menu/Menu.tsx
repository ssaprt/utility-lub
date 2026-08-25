import { useAppContextValues } from "@/context/appContext";
import { motion } from "framer-motion";
import { useRef } from "react";

import { Hr } from "@/components/hr/Hr/Hr";
import { useBreakpoint } from "@/hooks/useBreakPoint";
import { HeaderTitle } from "../../../components/HeaderTitle/HeaderTitle";
import { Scroll } from "../Scroll";
import { CSS } from "./CSS/CSS";
import { CSSUtils } from "./CSS/CSSUtils/CSSUtils";
import styles from "./Menu.module.css";
import { OpenData } from "./OpenData/OpenData";
import { ReactAndNext } from "./ReactAndNext/ReactAndNext";
import { References } from "./References/References";

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
                    <Scroll
                        boundaryOffset="2px 1px"
                        thumb={{
                            inactive: {
                                className: "bg-fg/20! rounded-md!",
                            },

                            hover: {
                                className: "bg-fg/30! rounded-md!",
                            },

                            active: {
                                className: "bg-fg/40! rounded-md!",
                            },
                        }}
                        scrollBar={{
                            inactive: {
                                className: "bg-fg/0!",
                            },
                            hover: {
                                className: "bg-fg/0!",
                            },
                            active: {
                                className: "bg-fg/0!",
                            },
                        }}
                        scrollWidth="6px"

                        imposition="after"
                        positionMode="after"
                        paddingReservationMode="scrollbar-only"
                    />

                    <div
                        className="
                            relative
                            flex
                            w-full
                            min-w-0
                            flex-1
                            flex-col
                            gap-1
                        "
                    >
                        <div className="mt-2"></div>
                        <ReactAndNext />
                        <OpenData />
                        <CSS />
                        <CSSUtils />
                        <References />
                        <div className="my-5"></div>
                        {/* <Author /> */}
                    </div>
                </div>
            </div>
        </div>
    );
};
