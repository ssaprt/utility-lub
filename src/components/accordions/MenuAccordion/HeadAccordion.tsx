import { IconChevronRight } from "@tabler/icons-react";
import type { ReactNode } from "react";
import styles from "./MenuAccordion.module.scss";

type HeadAccordionProps = {
    icon?: ReactNode;
    title: string;
    isOpen: boolean;
    isActive: boolean;
    onClick: () => void;
};

export const HeadAccordion = ({
    icon,
    title,
    isOpen,
    isActive,
    onClick,
}: HeadAccordionProps) => {
    return (
        <button
            type="button"
            aria-expanded={isOpen}
            onClick={onClick}
            className={`${styles.head} ${
                isActive ? styles.headActive : ""
            } p-[12px_18px] 
            lg:p-[6px_8px] 
            rounded-[4px] 
            lg:rounded-[24px]`}
        >
            {icon && <span className={styles.headIcon}>{icon}</span>}

            <span className={styles.headTitle}>{title}</span>

            <IconChevronRight aria-hidden="true" className={styles.chevron} />
        </button>
    );
};
