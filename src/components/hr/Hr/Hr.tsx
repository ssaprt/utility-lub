import styles from "./Hr.module.css";

export const Hr = ({ mode }: { mode: "horizontal" | "vertical" }) => {
    return (
        <div
            className={`w-[8px] relative h-full bg-[rgba(0,0,0,.25)] ${styles["hr"]} ${styles[mode]}`}
        ></div>
    );
};
