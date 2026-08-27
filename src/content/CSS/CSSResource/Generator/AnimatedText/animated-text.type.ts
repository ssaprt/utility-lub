export const animatedTextFonts = [
    {
        label: "Arial",
        value: "Arial, sans-serif",
    },
    {
        label: "Verdana",
        value: "Verdana, sans-serif",
    },
    {
        label: "Georgia",
        value: "Georgia, serif",
    },
    {
        label: "Times New Roman",
        value: '"Times New Roman", serif',
    },
    {
        label: "Courier New",
        value: '"Courier New", monospace',
    },
    {
        label: "Impact",
        value: "Impact, sans-serif",
    },
    {
        label: "Trebuchet MS",
        value: '"Trebuchet MS", sans-serif',
    },
    {
        label: "Inter",
        value: "Inter, sans-serif",
    },
    {
        label: "Manrope",
        value: "Manrope, sans-serif",
    },
    {
        label: "Outfit",
        value: "Outfit, sans-serif",
    },
    {
        label: "JetBrains Mono",
        value: '"JetBrains Mono", monospace',
    },
] as const;

export const animatedTextAnimations = [
    {
        label: "Stroke",
        value: "stroke",
    },
    {
        label: "Draw",
        value: "draw",
    },
    {
        label: "Fill",
        value: "fill",
    },
    {
        label: "Glow",
        value: "glow",
    },
    {
        label: "Pulse",
        value: "pulse",
    },
    {
        label: "Flicker",
        value: "flicker",
    },
    {
        label: "Tracking",
        value: "tracking",
    },
    {
        label: "Blur In",
        value: "blur-in",
    },
    {
        label: "Float",
        value: "float",
    },
    {
        label: "Zoom",
        value: "zoom",
    },
    {
        label: "Slide",
        value: "slide",
    },
    {
        label: "Wave",
        value: "wave",
    },
    {
        label: "Glitch",
        value: "glitch",
    },
    {
        label: "Neon",
        value: "neon-flicker",
    },
    {
        label: "Dash",
        value: "dash",
    },
    {
        label: "Focus",
        value: "focus",
    },
] as const;

export type AnimatedTextAnimation =
    (typeof animatedTextAnimations)[number]["value"];

export interface AnimatedTextConfig {
    text: string;

    fontFamily: string;

    fontSize: number;

    animation: AnimatedTextAnimation;

    animationSpeed: number;

    backgroundColor: string;

    strokeColor: string;

    fillColor: string;
}

export const createDefaultAnimatedTextConfig = (): AnimatedTextConfig => {
    return {
        text: "Animated Text",

        fontFamily: "Inter, sans-serif",

        fontSize: 100,

        animation: "stroke",

        animationSpeed: 5,

        backgroundColor: "#111111",

        strokeColor: "#6366f1",

        fillColor: "#ffffff",
    };
};

export const defaultAnimatedTextConfig = createDefaultAnimatedTextConfig();
