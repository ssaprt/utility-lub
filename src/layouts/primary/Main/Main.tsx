"use client";
import { AIAvailability } from "@/AI/getAvalibility";
import { FeedBack } from "@/components/feed-back/FeedBack";
import { PendingLoader } from "@/components/loader/PendingLoader";
import { GeneratorRouteComponent } from "@/config/GeneratorRouteComponent";
import {
    useAppContextActions,
    useAppContextValues,
} from "@/context/appContext";
import clsx from "clsx";
import React, { useEffect } from "react";
import { Breadcrumbs } from "../Breadcrumbs/Breadcrumbs";
import { Scroll } from "../Scroll";
import styles from "./Main.module.css";

export const Main = ({
    children,
    ai,
}: {
    children: React.ReactNode;
    ai: AIAvailability | null;
}) => {
    const { menu } = useAppContextValues();
    const pending = menu.pending;

    const { menu: menuActions } = useAppContextActions();

    useEffect(() => {
        menuActions.setVisibleAgent(ai?.available ?? false);
    }, [ai]);

    return (
        <main
            className={clsx(styles.main, pending && styles.pending)}
            id="main"
        >
            <PendingLoader />

            <Breadcrumbs />
            <GeneratorRouteComponent />
            <Scroll />
            {children}
            <Breadcrumbs />
            <div className="my-5"></div>

            <FeedBack subject="Form Feedback" />

            {/* <Footer /> */}
        </main>
    );
};
