import type { InputHTMLAttributes } from "react";

import styles from "./Search.module.scss";

type InputProps = Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "value" | "onChange"
> & {
    value: string;
    onChange: (value: string) => void;
};

export const Input = ({
    onChange,
    value,
    type = "text",
    className,
    ...props
}: InputProps) => {
    return (
        <input
            {...props}
            type={type}
            name="search"
            placeholder="Search..."
            value={value}
            className={`
                ${styles["search-box__input"]}
                !text-[14px]
                lg:!text-[16px]
                ${className ?? ""}
            `}
            onChange={(event) => onChange(event.target.value)}
        />
    );
};
