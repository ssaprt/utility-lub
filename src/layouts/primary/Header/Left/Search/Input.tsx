import { forwardRef, type InputHTMLAttributes } from "react";

import styles from "./Search.module.scss";

type InputProps = Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "value" | "onChange"
> & {
    value: string;
    onChange: (value: string) => void;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ onChange, value, type = "text", className, ...props }, ref) => {
        return (
            <input
                ref={ref}
                {...props}
                type={type}
                name="search"
                placeholder={props.placeholder ?? "Search..."}
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
    },
);

Input.displayName = "Input";
