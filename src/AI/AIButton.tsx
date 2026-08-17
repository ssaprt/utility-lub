import { motion, useAnimate } from "framer-motion";
import { useEffect, useMemo, useRef } from "react";

import { AIAgentResult } from "./types";

const size = 300;

const cx = size / 2;
const cy = size / 2;

const pointsCount = 14;

const idleRadius = size / 2 - 5;
const blobRadius = size * 0.4;

const minRadius = size * 0.3;
const maxRadius = size / 2 - 4;

const morphDuration = 0.4;

interface Point {
    x: number;
    y: number;
}

const clamp = (value: number, min: number, max: number) => {
    return Math.min(max, Math.max(min, value));
};

const round = (value: number) => {
    return Number(value.toFixed(3));
};

const smoothRadii = (radii: number[], iterations = 2) => {
    let result = [...radii];

    for (let pass = 0; pass < iterations; pass += 1) {
        const source = [...result];

        result = source.map((radius, index) => {
            const previous =
                source[(index - 1 + source.length) % source.length];

            const next = source[(index + 1) % source.length];

            return previous * 0.2 + radius * 0.6 + next * 0.2;
        });
    }

    return result;
};

const radiiToPoints = (radii: number[]): Point[] => {
    return radii.map((radius, index) => {
        const angle = (Math.PI * 2 * index) / radii.length - Math.PI / 2;

        return {
            x: round(cx + Math.cos(angle) * radius),
            y: round(cy + Math.sin(angle) * radius),
        };
    });
};

const pointsToPath = (points: Point[]) => {
    const count = points.length;

    const first = points[0];

    let d = `M ${round(first.x)} ${round(first.y)}`;

    for (let index = 0; index < count; index += 1) {
        const previous = points[(index - 1 + count) % count];

        const current = points[index];

        const next = points[(index + 1) % count];

        const afterNext = points[(index + 2) % count];

        const cp1x = round(current.x + (next.x - previous.x) / 6);

        const cp1y = round(current.y + (next.y - previous.y) / 6);

        const cp2x = round(next.x - (afterNext.x - current.x) / 6);

        const cp2y = round(next.y - (afterNext.y - current.y) / 6);

        d +=
            ` C ${cp1x} ${cp1y}` +
            ` ${cp2x} ${cp2y}` +
            ` ${round(next.x)} ${round(next.y)}`;
    }

    return `${d} Z`;
};

const radiiToPath = (radii: number[]) => {
    return pointsToPath(radiiToPoints(radii));
};

const createCircleRadii = () => {
    return Array.from(
        {
            length: pointsCount,
        },
        () => idleRadius,
    );
};

const createInitialBlobRadii = () => {
    const radii = Array.from(
        {
            length: pointsCount,
        },
        (_, index) => {
            const angle = (Math.PI * 2 * index) / pointsCount;

            const wave = Math.sin(angle * 2 + Math.random() * Math.PI) * 18;

            const noise = (Math.random() * 2 - 1) * 9;

            return clamp(blobRadius + wave + noise, minRadius, maxRadius);
        },
    );

    return smoothRadii(radii, 2);
};

const createNextRadii = (current: number[]) => {
    const phase = Math.random() * Math.PI * 2;

    const frequency = 1 + Math.floor(Math.random() * 2);

    const amplitude = 18 + Math.random() * 20;

    const globalShift = (Math.random() * 2 - 1) * 5;

    const next = current.map((radius, index) => {
        const angle = (Math.PI * 2 * index) / pointsCount;

        const wave = Math.sin(angle * frequency + phase) * amplitude;

        const secondWave =
            Math.cos(angle * (frequency + 1) - phase * 0.7) * amplitude * 0.35;

        const noise = (Math.random() * 2 - 1) * 7;

        const desired = blobRadius + globalShift + wave + secondWave + noise;

        return clamp(radius * 0.3 + desired * 0.7, minRadius, maxRadius);
    });

    return smoothRadii(next, 2);
};

export const AIButton = ({
    forButton,
    className,
}: {
    forButton: {
        promt: string;
        running: boolean;
        result: AIAgentResult | null;
        error: string | null;
    };
    className?: string;
}) => {
    const [scope, animate] = useAnimate();

    const animationIdRef = useRef(0);

    const circleRadii = useMemo(() => createCircleRadii(), []);

    const circlePath = useMemo(() => radiiToPath(circleRadii), [circleRadii]);

    const currentRadiiRef = useRef<number[]>(circleRadii);

    const hasPrompt = forButton.promt.trim().length > 0;

    const waiting = forButton.running && !forButton.result && !forButton.error;

    const passive = !hasPrompt && !waiting;

    useEffect(() => {
        animationIdRef.current += 1;

        const animationId = animationIdRef.current;

        const isCurrent = () => animationIdRef.current === animationId;

        const run = async () => {
            await animate(
                ".ai-play",
                {
                    opacity: 0,
                    scale: 0.65,
                },
                {
                    duration: 0.25,
                    ease: "easeOut",
                },
            );

            if (!isCurrent()) {
                return;
            }

            const initialBlob = createInitialBlobRadii();

            currentRadiiRef.current = initialBlob;

            await animate(
                ".ai-substance",
                {
                    d: radiiToPath(initialBlob),
                },
                {
                    duration: 0.65,
                    ease: [0.4, 0, 0.2, 1],
                },
            );

            if (!isCurrent()) {
                return;
            }

            while (isCurrent()) {
                const nextRadii = createNextRadii(currentRadiiRef.current);

                await animate(
                    ".ai-substance",
                    {
                        d: radiiToPath(nextRadii),
                    },
                    {
                        duration: morphDuration,
                        ease: "linear",
                    },
                );

                if (!isCurrent()) {
                    return;
                }

                currentRadiiRef.current = nextRadii;
            }
        };

        const reset = async () => {
            currentRadiiRef.current = circleRadii;

            await animate(
                ".ai-substance",
                {
                    d: circlePath,
                },
                {
                    duration: 0.65,
                    ease: [0.4, 0, 0.2, 1],
                },
            );

            if (!isCurrent()) {
                return;
            }

            await animate(
                ".ai-play",
                {
                    opacity: 1,
                    scale: 1,
                },
                {
                    duration: 0.25,
                    ease: "easeOut",
                },
            );
        };

        if (waiting) {
            void run();
        } else {
            void reset();
        }

        return () => {
            animationIdRef.current += 1;
        };
    }, [animate, waiting, circlePath, circleRadii]);

    return (
        <motion.svg
            ref={scope}
            viewBox={`0 0 ${size} ${size}`}
            animate={{
                opacity: passive ? 0.4 : 1,
            }}
            transition={{
                opacity: {
                    duration: 0.2,
                },
            }}
            className={`
                overflow-visible
                cursor-pointer
                ${className}`}
        >
            <motion.path
                className={`
                    ai-substance

                    ${
                        waiting
                            ? `
                                fill-fg/30
                            `
                            : `
                                fill-fg/10
                                drop-shadow-[0_2px_2px_rgba(0,0,0,0.4)]
                            `
                    }
                `}
                initial={{
                    d: circlePath,
                }}
            />

            <g transform="translate(65 55) scale(4)">
                <motion.g
                    className="ai-play"
                    initial={false}
                    style={{
                        transformBox: "fill-box",
                        transformOrigin: "center",
                    }}
                >
                    <path
                        className="fill-fg/60"
                        d="M11.396484 4.1113281C9.1042001 4.2020187 7 6.0721788 7 8.5917969L7 39.408203C7 42.767694 10.742758 44.971891 13.681641 43.34375L41.490234 27.935547C44.513674 26.260259 44.513674 21.739741 41.490234 20.064453L13.681641 4.65625C12.94692 4.2492148 12.160579 4.0810979 11.396484 4.1113281 z"
                    />
                </motion.g>
            </g>
        </motion.svg>
    );
};
