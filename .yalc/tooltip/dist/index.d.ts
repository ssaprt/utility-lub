import * as react from 'react';
import { CSSProperties, ReactNode, ReactElement } from 'react';

type TooltipAnimationType = "fade" | "slide" | "scale" | "zoom" | "blur" | "flip" | "bounce" | "none";
type TooltipAnimationSpeed = `${number}ms` | `${number}s`;
type TooltipAnimationOptions = {
    show?: TooltipAnimationType;
    hide?: TooltipAnimationType;
    speed?: TooltipAnimationSpeed;
    easing?: CSSProperties["animationTimingFunction"];
};

type TooltipSize = `${number}px` | `${number}rem` | `${number}em` | `calc(${string})`;
type ThemeType = {
    body?: {
        background?: CSSProperties["background"];
        filter?: CSSProperties["filter"];
        style?: CSSProperties;
        className?: string;
    };
    arrow?: {
        size?: TooltipSize;
        width?: TooltipSize;
    };
    animation?: TooltipAnimationOptions;
};

declare const presets: {
    primary: ThemeType;
    secondary: ThemeType;
    dark: ThemeType;
    light: ThemeType;
    comic: ThemeType;
    manga: ThemeType;
    newspaper: ThemeType;
    stickyNote: ThemeType;
    blueprint: ThemeType;
    terminal: ThemeType;
    crt: ThemeType;
    pixel: ThemeType;
    arcade: ThemeType;
    cyberpunk: ThemeType;
    synthwave: ThemeType;
    vaporwave: ThemeType;
    hologram: ThemeType;
    glass: ThemeType;
    frost: ThemeType;
    clay: ThemeType;
    bubblegum: ThemeType;
    candy: ThemeType;
    watermelon: ThemeType;
    lemon: ThemeType;
    lava: ThemeType;
    ember: ThemeType;
    toxic: ThemeType;
    radioactive: ThemeType;
    hazard: ThemeType;
    policeTape: ThemeType;
    construction: ThemeType;
    parchment: ThemeType;
    pirateMap: ThemeType;
    royal: ThemeType;
    noir: ThemeType;
    detective: ThemeType;
    dossier: ThemeType;
    medical: ThemeType;
    laboratory: ThemeType;
    circuit: ThemeType;
    galaxy: ThemeType;
    aurora: ThemeType;
    oceanDepths: ThemeType;
    coralReef: ThemeType;
    forest: ThemeType;
    moss: ThemeType;
    desert: ThemeType;
    snow: ThemeType;
    chrome: ThemeType;
    goldFoil: ThemeType;
    bronze: ThemeType;
    brutalist: ThemeType;
    chalkboard: ThemeType;
};
type PresetsThemeType$1 = keyof typeof presets;

type PresetsThemeType = keyof typeof presets;

type TooltipPlacement = "top" | "bottom" | "left" | "right";
interface TooltipProviderInterface {
    defaultRenderPosition?: TooltipPlacement;
    selectTheme?: PresetsThemeType;
    customTheme?: ThemeType;
    animation?: TooltipAnimationOptions;
}
interface TooltipInterface {
    content: ReactNode;
    children?: ReactElement;
    position?: TooltipPlacement;
    selectTheme?: PresetsThemeType;
    customTheme?: ThemeType;
    animation?: TooltipAnimationOptions;
    disabled?: boolean;
    interactive?: boolean;
    hideDelay?: number;
}

declare const Tooltip: ({ content, children, position, selectTheme, customTheme, animation, disabled, interactive, hideDelay, }: TooltipInterface) => react.JSX.Element;

type TooltipProviderProps = {
    children: ReactNode;
    defaultRenderPosition?: TooltipPlacement;
    selectTheme?: PresetsThemeType$1;
    customTheme?: ThemeType;
    animation?: TooltipAnimationOptions;
};
declare const TooltipProvider: ({ children, defaultRenderPosition, selectTheme, customTheme, animation, }: TooltipProviderProps) => react.JSX.Element;

export { type PresetsThemeType, type ThemeType, Tooltip, type TooltipAnimationOptions, type TooltipAnimationSpeed, type TooltipAnimationType, type TooltipInterface, type TooltipPlacement, TooltipProvider, type TooltipProviderInterface, type TooltipSize };
