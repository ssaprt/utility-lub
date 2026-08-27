import type { CSSProperties } from "react";

import styles from "./Loader.module.scss";

export type LoaderMode =
    | "fall"
    | "rise"
    | "space"
    | "diagonal"
    | "twinkle"
    | "wave"
    | "bounce"
    | "orbit"
    | "spiral"
    | "vortex"
    | "explode"
    | "implode"
    | "fountain"
    | "rain"
    | "zigzag"
    | "pulse"
    | "comet"
    | "crosswind";

type LoaderProps = {
    mode: LoaderMode;
    visible: boolean;
    onTransitionEnd?: () => void;
};

type SparkStyle = CSSProperties & {
    "--spark-left": string;
    "--spark-top": string;

    "--spark-size": string;
    "--spark-height": string;

    "--spark-duration": string;
    "--spark-delay": string;

    "--spark-drift-x": string;
    "--spark-drift-y": string;

    "--spark-rotation": string;

    "--spark-opacity": string;
    "--spark-opacity-soft": string;
    "--spark-opacity-mid": string;

    "--spark-scale": string;
    "--spark-scale-small": string;
    "--spark-scale-large": string;

    "--spark-bounce-x": string;
    "--spark-bounce-y": string;

    "--spark-explode-x": string;
    "--spark-explode-y": string;

    "--spark-orbit-radius": string;
    "--spark-orbit-angle": string;

    "--spark-zigzag-y": string;

    "--spark-comet-length": string;
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
    {
        length: SPARKS_COUNT,
    },
    (_, index) => {
        const random = (offset: number): number =>
            randomBySeed(index * 31 + offset + 1);

        const size = 4 + random(3) * 10;

        const opacity = 0.35 + random(9) * 0.65;

        const scale = 0.6 + random(10) * 0.8;

        const horizontalDirection = random(11) > 0.5 ? 1 : -1;

        const verticalDirection = random(12) > 0.5 ? 1 : -1;

        const bounceX = horizontalDirection * (70 + random(13) * 320);

        const bounceY = -(180 + random(14) * 420);

        const explodeX = horizontalDirection * (80 + random(15) * 420);

        const explodeY = verticalDirection * (80 + random(16) * 360);

        const orbitPower = Math.pow(random(17), 1.7);

        const orbitRadius = 15 + orbitPower * 190;

        const orbitAngle = random(18) * 360;

        const zigzagY = 50 + random(19) * 180;

        const cometLength = 30 + random(20) * 90;

        return {
            "--spark-left": `${fixed(random(1) * 100)}%`,

            "--spark-top": `${fixed(random(2) * 100)}%`,

            "--spark-size": `${fixed(size)}px`,

            "--spark-height": `${fixed(size * 1.15)}px`,

            "--spark-duration": `${fixed(2.5 + random(4) * 4)}s`,

            "--spark-delay": `${fixed(-(random(5) * 7))}s`,

            "--spark-drift-x": `${fixed(-100 + random(6) * 200)}px`,

            "--spark-drift-y": `${fixed(-60 + random(7) * 120)}px`,

            "--spark-rotation": `${fixed(random(8) * 360, 1)}deg`,

            "--spark-opacity": fixed(opacity, 2),

            "--spark-opacity-soft": fixed(opacity * 0.35, 2),

            "--spark-opacity-mid": fixed(opacity * 0.65, 2),

            "--spark-scale": fixed(scale, 2),

            "--spark-scale-small": fixed(scale * 0.45, 2),

            "--spark-scale-large": fixed(scale * 1.35, 2),

            "--spark-bounce-x": `${fixed(bounceX)}px`,

            "--spark-bounce-y": `${fixed(bounceY)}px`,

            "--spark-explode-x": `${fixed(explodeX)}px`,

            "--spark-explode-y": `${fixed(explodeY)}px`,

            "--spark-orbit-radius": `${fixed(orbitRadius)}px`,

            "--spark-orbit-angle": `${fixed(orbitAngle, 1)}deg`,

            "--spark-zigzag-y": `${fixed(zigzagY)}px`,

            "--spark-comet-length": `${fixed(cometLength)}px`,
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

    bounce: styles.bounce,
    orbit: styles.orbit,

    spiral: styles.spiral,
    vortex: styles.vortex,

    explode: styles.explode,
    implode: styles.implode,

    fountain: styles.fountain,
    rain: styles.rain,

    zigzag: styles.zigzag,
    pulse: styles.pulse,

    comet: styles.comet,
    crosswind: styles.crosswind,
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
