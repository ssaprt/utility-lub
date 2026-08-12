import { CSSProperties } from "react";
import styles from "./Hr.module.scss";

interface HrProps extends React.ComponentPropsWithoutRef<"div"> {
    mode: "horizontal" | "vertical";
    size?: number;
}

export const Hr = ({ mode, size = 1, ...rest }: HrProps) => {
    return (
        <div
            className={`w-[8px] relative h-full bg-fg/15 ${styles["hr"]} ${styles[mode]}`}
            style={{ "--size": `${size}px` } as CSSProperties}
            {...rest}
        ></div>
    );
};
