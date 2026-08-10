import { IconCaretDownFilled } from "@tabler/icons-react";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import styles from "./TransitionDropDown.module.scss";

//use any styles parameters from interface TransitionDropDownPropsCss
//use any styles parameters from interface TransitionDropDownPropsCss
//use any styles parameters from interface TransitionDropDownPropsCss
//use any styles parameters from interface TransitionDropDownPropsCss
//use any styles parameters from interface TransitionDropDownPropsCss

interface TransitionDropDownPropsCss {
    "--bgPrimaryContainer"?: string;
    "--bgPrimaryContainerShow"?: string;
    "--BoxShadowPrimaryContainer"?:
        | `${number}px ${number}px ${number}px ${number}px ${string}`
        | "none";
    "--BoxShadowPrimaryContainerShow"?:
        | `${number}px ${number}px ${number}px ${number}px ${string}`
        | "none";
    "--bgTitleBlock"?: string;
    "--bgTitleBlockShow"?: string;
    "--BoxShadowTitleBlock"?:
        | `${number}px ${number}px ${number}px ${number}px ${string}`
        | "none";
    "--BoxShadowTitleBlockShow"?:
        | `${number}px ${number}px ${number}px ${number}px ${string}`
        | "none";
    "--colorTitleBlock"?: string;
    "--colorTitleBlockShow"?: string;
    "--fillTitleBlockIcon"?: string;
    "--fillTitleBlockIconShow"?: string;
    "--bgContentBlock"?: string;
    "--bgContentBlockShow"?: string;
    "--BoxShadowContentBlock"?: `${number}px ${number}px ${number}px ${number}px ${string}`;
    "--BoxShadowContentBlockShow"?: `${number}px ${number}px ${number}px ${number}px ${string}`;
    "--primaryAnimationTime"?: `${number}ms`;
    "--pl"?: `${number}px`;
}

interface TransitionDropDownProps {
    children: React.ReactNode;
    title: string;
    icon?: React.ReactElement | null;
    style?: TransitionDropDownPropsCss;
    className?: string;
}

export const TransitionDropDown = ({
    children,
    title,
    icon,
    style,
    className,
}: TransitionDropDownProps) => {
    const [view, setView] = useState(false);
    const [maxHeight, setMaxHeight] = useState(0);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (contentRef.current && view) {
            setMaxHeight(contentRef.current.scrollHeight + 12);
        } else {
            setMaxHeight(0);
        }
    }, [view, children]);

    return (
        <div
            style={style as CSSProperties}
            className={`${styles.transitionDropDown} ${view ? styles.active : ""} ${className}`}
        >
            <div className={styles.titleBlock} onClick={() => setView(!view)}>
                <span>{title}</span>
                {icon ? icon : <IconCaretDownFilled />}
            </div>
            <div
                ref={contentRef}
                style={{ height: `${maxHeight}px` }}
                className={styles.bodyDropDown}
            >
                {children}
            </div>
        </div>
    );
};
