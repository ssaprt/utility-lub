import { FeedBack } from "@/components/feed-back/FeedBack";
import { PendingLoader } from "@/components/loader/PendingLoader";
import { useAppContextValues } from "@/context/appContext";
import clsx from "clsx";
import React from "react";
import { Breadcrumbs } from "../Breadcrumbs/Breadcrumbs";
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
            <PendingLoader />
            <Breadcrumbs />
            <Scroll />
            {children}
            <div className="my-5"></div>
            <Breadcrumbs />
            <FeedBack subject="Form Feedback" />

            {/* <Footer /> */}
        </main>
    );
};
