import { CSSProperties } from "react";
import styles from "./Hr.module.css";

interface HrProps extends React.ComponentPropsWithoutRef<"div"> {
    mode: "horizontal" | "vertical";
    size?: number;
}

export const Hr = ({ mode, size = 1, ...rest }: HrProps) => {
    return (
        <div
            className={`w-[8px] relative h-full bg-[rgba(0,0,0,.25)] ${styles["hr"]} ${styles[mode]}`}
            style={{ "--size": `${size}px` } as CSSProperties}
            {...rest}
        ></div>
    );
};
