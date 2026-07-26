import type { ReactNode } from "react";
import styles from "./MenuAccordion.module.scss";

export const BodyAccordion = ({ children }: { children: ReactNode }) => {
    return (
        <div className={styles.body}>
            <div className={`${styles.bodyInner} pt-1 lg:pt-[2px]`}>
                <div className={`${styles.bodyContent} gap-2 lg:gap-1`}>
                    {children}
                </div>
            </div>
        </div>
    );
};
