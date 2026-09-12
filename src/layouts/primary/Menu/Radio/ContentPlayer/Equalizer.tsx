"use client";

import { useAppContextValues } from "@/context/appContext";

import { useEffect, useRef } from "react";

import { useRadioContext } from "../context/RadioContext";

const BAR_WIDTH = 4;
const BAR_GAP = 2;
const REST_HEIGHT = 1;

const getMaxBars = (view: string) => {
    switch (view) {
        case "compact":
            return 2000;

        case "full":
            return 2000;

        default:
            return 2000;
    }
};

export const Equalizer = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const { viewRadioController } = useAppContextValues();

    const { player, getAudioAnalyser } = useRadioContext();

    const playerRef = useRef(player);
    const viewRef = useRef(viewRadioController);

    useEffect(() => {
        playerRef.current = player;
    }, [player]);

    useEffect(() => {
        viewRef.current = viewRadioController;
    }, [viewRadioController]);

    useEffect(() => {
        const canvas = canvasRef.current;

        if (!canvas) {
            return;
        }

        const context = canvas.getContext("2d");

        if (!context) {
            return;
        }

        let frame = 0;
        let width = 0;
        let height = 0;
        let frequencyData = new Uint8Array(0);
        let levels = new Float32Array(0);

        const resize = () => {
            const rect = canvas.getBoundingClientRect();
            const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

            width = rect.width;
            height = rect.height;

            const nextWidth = Math.max(1, Math.round(width * pixelRatio));
            const nextHeight = Math.max(1, Math.round(height * pixelRatio));

            if (canvas.width !== nextWidth || canvas.height !== nextHeight) {
                canvas.width = nextWidth;
                canvas.height = nextHeight;

                context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
            }
        };

        const observer = new ResizeObserver(resize);

        observer.observe(canvas);
        resize();

        const draw = () => {
            context.clearRect(0, 0, width, height);

            if (width <= 0 || height <= 0) {
                frame = window.requestAnimationFrame(draw);

                return;
            }

            const availableBars = Math.max(
                1,
                Math.floor((width + BAR_GAP) / (BAR_WIDTH + BAR_GAP)),
            );

            const barCount = Math.min(
                availableBars,
                getMaxBars(viewRef.current),
            );

            if (levels.length !== barCount) {
                const nextLevels = new Float32Array(barCount);
                const copyLength = Math.min(levels.length, nextLevels.length);

                nextLevels.set(levels.subarray(0, copyLength));
                levels = nextLevels;
            }

            const analyser = getAudioAnalyser();
            const currentPlayer = playerRef.current;
            const active =
                currentPlayer.play === "play" &&
                !currentPlayer.isLoading &&
                analyser !== null;

            if (active && analyser) {
                if (frequencyData.length !== analyser.frequencyBinCount) {
                    frequencyData = new Uint8Array(analyser.frequencyBinCount);
                }

                analyser.getByteFrequencyData(frequencyData);
            }

            const usableBins = active
                ? Math.max(1, Math.floor(frequencyData.length * 0.68))
                : 0;

            for (let index = 0; index < barCount; index += 1) {
                let target = 0;

                if (active && usableBins > 0) {
                    const startProgress = index / barCount;
                    const endProgress = (index + 1) / barCount;

                    const startBin = Math.min(
                        usableBins - 1,
                        Math.floor(Math.pow(startProgress, 1.7) * usableBins),
                    );

                    const endBin = Math.max(
                        startBin + 1,
                        Math.min(
                            usableBins,
                            Math.ceil(Math.pow(endProgress, 1.7) * usableBins),
                        ),
                    );

                    let sum = 0;
                    let peak = 0;

                    for (let bin = startBin; bin < endBin; bin += 1) {
                        const value = frequencyData[bin] ?? 0;

                        sum += value;
                        peak = Math.max(peak, value);
                    }

                    const average = sum / Math.max(1, endBin - startBin);
                    const energy = average * 0.68 + peak * 0.32;

                    target = Math.min(
                        1,
                        Math.pow(Math.max(0, energy) / 255, 0.72) * 1.05,
                    );
                }

                if (target > levels[index]) {
                    levels[index] += (target - levels[index]) * 0.62;
                } else if (active) {
                    levels[index] += (target - levels[index]) * 0.2;
                } else {
                    levels[index] *= 0.965;
                }
            }

            const totalWidth =
                barCount * BAR_WIDTH + Math.max(0, barCount - 1) * BAR_GAP;
            const startX = Math.max(0, (width - totalWidth) / 2);

            context.fillStyle = getComputedStyle(canvas).color;

            for (let index = 0; index < barCount; index += 1) {
                const value = levels[index];
                const barHeight = Math.max(REST_HEIGHT, value * height);
                const x = startX + index * (BAR_WIDTH + BAR_GAP);
                const y = height - barHeight;

                context.fillRect(x, y, BAR_WIDTH, barHeight);
            }

            frame = window.requestAnimationFrame(draw);
        };

        frame = window.requestAnimationFrame(draw);

        return () => {
            observer.disconnect();
            window.cancelAnimationFrame(frame);
        };
    }, [getAudioAnalyser]);

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="
                pointer-events-none
                absolute
                inset-x-0
                bottom-0
                z-1
                h-1/2
                w-full
                text-fg
                opacity-5
            "
        />
    );
};
