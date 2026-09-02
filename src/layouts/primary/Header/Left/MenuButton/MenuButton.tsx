"use client";

import {
    useAppContextActions,
    useAppContextValues,
} from "@/context/appContext";

import type { CSSProperties } from "react";
import { useMemo } from "react";

import styles from "./MenuButton.module.css";

export const MenuButton = () => {
    const { menu: menuValues } = useAppContextValues();
    const { menu: menuActions } = useAppContextActions();

    const { openMenu, noneAnimationMenu } = menuValues;
    const { setOpenMenu } = menuActions;

    const createDots = useMemo(() => {
        const gap = 8;
        const size = 8;

        return Array.from({ length: 9 }, (_, index) => {
            const column = index % 3;
            const row = Math.floor(index / 3);

            return (
                <rect
                    key={index}
                    width={size}
                    height={size}
                    rx={size}
                    ry={size}
                    x={column * gap * 2}
                    y={row * gap * 2}
                    className={styles.dotes}
                />
            );
        });
    }, []);

    return (
        <button
            type="button"
            aria-label={openMenu ? "Close menu" : "Open menu"}
            aria-expanded={openMenu}
            onClick={() => setOpenMenu((previous) => !previous)}
            className={`
                ${styles.overlay}
                ${openMenu ? styles.active : ""}
                absolute
                ${openMenu ? "-left-[50px]" : "left-[10px]"}
                top-1/2
                z-2
                -translate-y-1/2
                pointer-events-auto
                lg:relative
                lg:top-auto
                lg:left-auto
                lg:translate-y-0
            `}
            style={
                {
                    "--none-trans": noneAnimationMenu ? "none" : undefined,
                    transitionDelay: noneAnimationMenu ? "0s" : ".2s",
                } as CSSProperties
            }
        >
            <svg className={styles.svg} viewBox="0 0 40 40" aria-hidden="true">
                {createDots}
            </svg>
        </button>
    );
};
