import { useAppContextValues } from "@/context/appContext";
import clsx from "clsx";
import React from "react";
import { Scroll } from "../Scroll";
import styles from "./Main.module.css";

export const Main = ({ children }: { children: React.ReactNode }) => {
    const { menu } = useAppContextValues();
    const pending = menu.pending;

    return (
        <main
            className={clsx(styles.main, pending && styles.pending)}
            id="main"
        >
            <Scroll />
            {children}
        </main>
    );
};
