import type { AnimatedTextConfig } from "./animated-text.type";

export interface AnimatedTextEffect {
    textCss: string;

    keyframes: string;
}

export const getAnimatedTextEffect = (
    config: AnimatedTextConfig,
    keyframeName = "animated-text-effect",
): AnimatedTextEffect => {
    const { animation, animationSpeed, strokeColor, fillColor } = config;

    const duration = `${animationSpeed}s`;

    const base = `
    transform-box: fill-box;
    transform-origin: center;
    paint-order: stroke fill;
`;

    switch (animation) {
        case "draw":
            return {
                textCss: `
${base}
    fill: transparent;
    stroke: ${strokeColor};
    stroke-width: 2;
    stroke-dasharray: 900;
    stroke-dashoffset: 900;
    animation: ${keyframeName} ${duration} ease-in-out infinite alternate;
`,

                keyframes: `
@keyframes ${keyframeName} {
    0% {
        fill: transparent;
        stroke-dashoffset: 900;
    }

    70% {
        fill: transparent;
    }

    100% {
        fill: ${fillColor};
        stroke: ${strokeColor};
        stroke-dashoffset: 0;
    }
}`,
            };

        case "fill":
            return {
                textCss: `
${base}
    fill: transparent;
    stroke: ${strokeColor};
    stroke-width: 2;
    animation: ${keyframeName} ${duration} ease-in-out infinite alternate;
`,

                keyframes: `
@keyframes ${keyframeName} {
    0% {
        fill: transparent;
        stroke-width: 2;
    }

    50% {
        fill: transparent;
        stroke: ${strokeColor};
    }

    100% {
        fill: ${fillColor};
        stroke: ${strokeColor};
        stroke-width: 0;
    }
}`,
            };

        case "glow":
            return {
                textCss: `
${base}
    fill: ${fillColor};
    stroke: ${strokeColor};
    stroke-width: 1;
    animation: ${keyframeName} ${duration} ease-in-out infinite alternate;
`,

                keyframes: `
@keyframes ${keyframeName} {
    0% {
        filter:
            drop-shadow(0 0 0 ${strokeColor})
            brightness(.9);
    }

    100% {
        filter:
            drop-shadow(0 0 6px ${strokeColor})
            drop-shadow(0 0 18px ${strokeColor})
            brightness(1.3);
    }
}`,
            };

        case "pulse":
            return {
                textCss: `
${base}
    fill: ${fillColor};
    stroke: ${strokeColor};
    stroke-width: 1;
    animation: ${keyframeName} ${duration} ease-in-out infinite;
`,

                keyframes: `
@keyframes ${keyframeName} {
    0%,
    100% {
        transform: scale(1);
        opacity: 1;
    }

    50% {
        transform: scale(1.08);
        opacity: .75;
    }
}`,
            };

        case "flicker":
            return {
                textCss: `
${base}
    fill: ${fillColor};
    stroke: ${strokeColor};
    stroke-width: 1;
    animation: ${keyframeName} ${duration} linear infinite;
`,

                keyframes: `
@keyframes ${keyframeName} {
    0%,
    18%,
    22%,
    25%,
    53%,
    57%,
    100% {
        opacity: 1;
    }

    20%,
    24%,
    55% {
        opacity: .15;
    }
}`,
            };

        case "tracking":
            return {
                textCss: `
${base}
    fill: ${fillColor};
    stroke: ${strokeColor};
    stroke-width: 1;
    animation: ${keyframeName} ${duration} ease-in-out infinite alternate;
`,

                keyframes: `
@keyframes ${keyframeName} {
    0% {
        letter-spacing: .38em;
        opacity: 0;
    }

    100% {
        letter-spacing: 0;
        opacity: 1;
    }
}`,
            };

        case "blur-in":
            return {
                textCss: `
${base}
    fill: ${fillColor};
    stroke: ${strokeColor};
    stroke-width: 1;
    animation: ${keyframeName} ${duration} ease-in-out infinite alternate;
`,

                keyframes: `
@keyframes ${keyframeName} {
    0% {
        filter: blur(14px);
        opacity: 0;
        transform: scale(.92);
    }

    100% {
        filter: blur(0);
        opacity: 1;
        transform: scale(1);
    }
}`,
            };

        case "float":
            return {
                textCss: `
${base}
    fill: ${fillColor};
    stroke: ${strokeColor};
    stroke-width: 1;
    animation: ${keyframeName} ${duration} ease-in-out infinite alternate;
`,

                keyframes: `
@keyframes ${keyframeName} {
    0% {
        transform: translateY(14px);
    }

    100% {
        transform: translateY(-14px);
    }
}`,
            };

        case "zoom":
            return {
                textCss: `
${base}
    fill: ${fillColor};
    stroke: ${strokeColor};
    stroke-width: 1;
    animation: ${keyframeName} ${duration} cubic-bezier(.22,1,.36,1) infinite alternate;
`,

                keyframes: `
@keyframes ${keyframeName} {
    0% {
        transform: scale(.65);
        opacity: 0;
    }

    70% {
        transform: scale(1.08);
        opacity: 1;
    }

    100% {
        transform: scale(1);
        opacity: 1;
    }
}`,
            };

        case "slide":
            return {
                textCss: `
${base}
    fill: ${fillColor};
    stroke: ${strokeColor};
    stroke-width: 1;
    animation: ${keyframeName} ${duration} ease-in-out infinite alternate;
`,

                keyframes: `
@keyframes ${keyframeName} {
    0% {
        transform: translateX(-15%);
        opacity: 0;
    }

    100% {
        transform: translateX(0);
        opacity: 1;
    }
}`,
            };

        case "wave":
            return {
                textCss: `
${base}
    fill: ${fillColor};
    stroke: ${strokeColor};
    stroke-width: 1;
    animation: ${keyframeName} ${duration} ease-in-out infinite;
`,

                keyframes: `
@keyframes ${keyframeName} {
    0%,
    100% {
        transform:
            translateY(0)
            rotate(0deg);
    }

    25% {
        transform:
            translateY(-10px)
            rotate(-1deg);
    }

    75% {
        transform:
            translateY(10px)
            rotate(1deg);
    }
}`,
            };

        case "glitch":
            return {
                textCss: `
${base}
    fill: ${fillColor};
    stroke: ${strokeColor};
    stroke-width: 1;
    animation: ${keyframeName} ${duration} steps(1, end) infinite;
`,

                keyframes: `
@keyframes ${keyframeName} {
    0%,
    90%,
    100% {
        transform: translate(0);
        filter: none;
    }

    92% {
        transform: translate(-6px, 2px) skewX(4deg);
        filter: drop-shadow(5px 0 ${strokeColor});
    }

    94% {
        transform: translate(5px, -2px) skewX(-3deg);
        filter: drop-shadow(-5px 0 ${fillColor});
    }

    96% {
        transform: translate(-3px, 1px);
    }

    98% {
        transform: translate(3px, -1px);
    }
}`,
            };

        case "neon-flicker":
            return {
                textCss: `
${base}
    fill: ${fillColor};
    stroke: ${strokeColor};
    stroke-width: 1;
    animation: ${keyframeName} ${duration} linear infinite;
`,

                keyframes: `
@keyframes ${keyframeName} {
    0%,
    19%,
    21%,
    23%,
    25%,
    54%,
    56%,
    100% {
        opacity: 1;
        filter:
            drop-shadow(0 0 4px ${strokeColor})
            drop-shadow(0 0 12px ${strokeColor})
            drop-shadow(0 0 24px ${strokeColor});
    }

    20%,
    24%,
    55% {
        opacity: .25;
        filter: none;
    }
}`,
            };

        case "dash":
            return {
                textCss: `
${base}
    fill: transparent;
    stroke: ${strokeColor};
    stroke-width: 2;
    stroke-dasharray: 10 12;
    animation: ${keyframeName} ${duration} linear infinite;
`,

                keyframes: `
@keyframes ${keyframeName} {
    0% {
        stroke-dashoffset: 0;
        fill: transparent;
    }

    50% {
        fill: transparent;
    }

    100% {
        stroke-dashoffset: -220;
        fill: ${fillColor};
    }
}`,
            };

        case "focus":
            return {
                textCss: `
${base}
    fill: ${fillColor};
    stroke: ${strokeColor};
    stroke-width: 1;
    animation: ${keyframeName} ${duration} ease-in-out infinite alternate;
`,

                keyframes: `
@keyframes ${keyframeName} {
    0% {
        filter: blur(10px);
        letter-spacing: .25em;
        opacity: 0;
    }

    100% {
        filter: blur(0);
        letter-spacing: 0;
        opacity: 1;
    }
}`,
            };

        case "stroke":
        default:
            return {
                textCss: `
${base}
    fill: transparent;
    stroke: ${strokeColor};
    stroke-width: 2;
    animation: ${keyframeName} ${duration} ease-in-out infinite alternate;
`,

                keyframes: `
@keyframes ${keyframeName} {
    0% {
        fill: transparent;
        stroke: ${strokeColor};
        stroke-dashoffset: 25%;
        stroke-dasharray: 0 50%;
        stroke-width: 2;
    }

    70% {
        fill: transparent;
        stroke: ${strokeColor};
    }

    80% {
        fill: transparent;
        stroke: ${strokeColor};
        stroke-width: 3;
    }

    100% {
        fill: ${fillColor};
        stroke: transparent;
        stroke-dashoffset: -25%;
        stroke-dasharray: 50% 0;
        stroke-width: 0;
    }
}`,
            };
    }
};
