import styles from "./Search.module.scss";

export const Input = ({
    onChange,
    value,
}: {
    onChange: (val: string) => void;
    value: string;
}) => {
    return (
        <input
            type="text"
            name="search"
            placeholder="Search..."
            value={value}
            className={`${styles["search-box__input"]} !text-[14px] lg:!text-[16px]`}
            onChange={(e) => onChange(e.target.value)}
        />
    );
};
