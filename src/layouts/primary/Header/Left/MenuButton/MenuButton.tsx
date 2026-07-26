import {
    useAppContextActions,
    useAppContextValues,
} from "@/context/appContext";
import { useMemo } from "react";
import styles from "./MenuButton.module.css";

export const MenuButton = () => {
    const { menu: menuValues } = useAppContextValues();
    const { menu: menuActions } = useAppContextActions();

    const { openMenu } = menuValues;
    const { setOpenMenu } = menuActions;

    const createDotes = useMemo(() => {
        let line = -1;
        let position = 0;
        const gap = 8;
        const size = 8;

        return [...Array(9)].map((_, i) => {
            const isEveryFourch = i % 3 === 0;
            position++;
            if (isEveryFourch) {
                line++;
                position = 0;
            }

            return (
                <rect
                    key={i}
                    width={size}
                    height={size}
                    rx={size}
                    ry={size}
                    y={line * gap * 2}
                    x={position * gap * 2}
                    className={`${styles.dotes}`}
                />
            );
        });
    }, []);
    return (
        <button
            onClick={() => setOpenMenu((prev) => !prev)}
            className={`${styles.overlay} ${openMenu ? styles.active : ""} 
            absolute 
            ${openMenu ? "-left-[70px]" : "left-[10px]"} 
            top-1/2 -translate-y-1/2

            lg:top-auto
            lg:translate-y-0
            lg:relative
            lg:left-auto`}
        >
            <svg className={styles.svg} viewBox="0 0 40 40">
                {createDotes}
            </svg>
        </button>
    );
};
