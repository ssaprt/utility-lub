import type { CSSProperties } from "react";

import styles from "./Loader.module.scss";

export type LoaderMode =
    | "fall"
    | "rise"
    | "space"
    | "diagonal"
    | "twinkle"
    | "wave";

type LoaderProps = {
    mode: LoaderMode;
    visible: boolean;
    onTransitionEnd?: () => void;
};

type SparkStyle = CSSProperties & {
    "--spark-left": string;
    "--spark-top": string;
    "--spark-size": string;
    "--spark-duration": string;
    "--spark-delay": string;
    "--spark-drift-x": string;
    "--spark-drift-y": string;
    "--spark-rotation": string;
    "--spark-opacity": string;
    "--spark-scale": string;
};

const SPARKS_COUNT = 80;

const randomBySeed = (seed: number): number => {
    let value = seed | 0;

    value = Math.imul(value ^ (value >>> 16), 0x21f0aaad);
    value = Math.imul(value ^ (value >>> 15), 0x735a2d97);
    value ^= value >>> 15;

    return (value >>> 0) / 4294967296;
};

const fixed = (value: number, digits = 2): string => {
    return value.toFixed(digits);
};

const sparks: SparkStyle[] = Array.from(
    { length: SPARKS_COUNT },
    (_, index) => {
        const random = (offset: number): number =>
            randomBySeed(index * 31 + offset + 1);

        return {
            "--spark-left": `${fixed(random(1) * 100)}%`,
            "--spark-top": `${fixed(random(2) * 100)}%`,
            "--spark-size": `${fixed(4 + random(3) * 10)}px`,
            "--spark-duration": `${fixed(2.5 + random(4) * 4)}s`,
            "--spark-delay": `${fixed(-(random(5) * 7))}s`,
            "--spark-drift-x": `${fixed(-100 + random(6) * 200)}px`,
            "--spark-drift-y": `${fixed(-60 + random(7) * 120)}px`,
            "--spark-rotation": `${fixed(random(8) * 360, 1)}deg`,
            "--spark-opacity": fixed(0.35 + random(9) * 0.65, 2),
            "--spark-scale": fixed(0.6 + random(10) * 0.8, 2),
        };
    },
);

const modeClasses: Record<LoaderMode, string> = {
    fall: styles.fall,
    rise: styles.rise,
    space: styles.space,
    diagonal: styles.diagonal,
    twinkle: styles.twinkle,
    wave: styles.wave,
};

export const Loader = ({ mode, visible, onTransitionEnd }: LoaderProps) => {
    return (
        <div
            aria-hidden="true"
            className={`
                ${styles.loader}
                ${modeClasses[mode]}
                ${visible ? styles.visible : styles.hidden}
            `}
            onTransitionEnd={(event) => {
                if (event.target !== event.currentTarget) {
                    return;
                }

                if (event.propertyName !== "opacity") {
                    return;
                }

                if (visible) {
                    return;
                }

                onTransitionEnd?.();
            }}
        >
            {sparks.map((style, index) => (
                <span key={index} className={styles.spark} style={style} />
            ))}
        </div>
    );
};
