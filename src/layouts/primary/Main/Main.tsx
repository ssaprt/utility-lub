"use client";
import { AIAvailability } from "@/AI/getAvalibility";
import { FeedBack } from "@/components/feed-back/FeedBack";
import { MainOverlay } from "@/components/loader/MainOverlay";
import { GeneratorRouteComponent } from "@/config/GeneratorRouteComponent";
import {
    useAppContextActions,
    useAppContextValues,
} from "@/context/appContext";
import clsx from "clsx";
import React, { useEffect } from "react";
import { Breadcrumbs } from "../Breadcrumbs/Breadcrumbs";
import { Footer } from "../Footer/Footer";
import { Scroll } from "../Scroll";
import styles from "./Main.module.css";

export const Main = ({
    children,
    ai,
}: {
    children: React.ReactNode;
    ai: AIAvailability | null;
}) => {
    const { menu, animationsReady } = useAppContextValues();
    const pending = menu.pending;

    const { menu: menuActions } = useAppContextActions();

    useEffect(() => {
        menuActions.setVisibleAgent(ai?.available ?? false);
    }, [ai]);

    return (
        <main
            className={clsx(
                styles.main,
                pending && styles.pending,
                animationsReady && styles["animations-ready"],
            )}
            id="main"
        >
            <MainOverlay />
            <div className={styles.anim}>
                <Breadcrumbs />
                <GeneratorRouteComponent />

                {children}
                <Breadcrumbs />
                <div className="my-5"></div>

                <FeedBack subject="Form Feedback" />

                <Footer />
            </div>
            <Scroll
                paddingReservationMode="scrollbar-only"
                boundaryOffset="8px 2px"
                imposition="over"
            />
        </main>
    );
};
