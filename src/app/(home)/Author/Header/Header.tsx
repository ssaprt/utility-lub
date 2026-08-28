"use client";
import { useState } from "react";
import {
    authorIconAnimationConfig,
    AuthorIconHideAnimation,
    AuthorIconShowAnimation,
} from "./author-icon.config";
import { AuthorIcon } from "./AuthorIcon";
import { Name } from "./Name";

export const authorIconShowAnimations = [
    "snakes",
    "draw",
    "scan",
    "diagonal",
    "unfold",
] as const satisfies readonly AuthorIconShowAnimation[];

export const authorIconHideAnimations = [
    "erase",
    "snakes",
    "scatter",
    "collapse",
    "scan",
    "diagonal",
    "fall",
    "implode",
] as const satisfies readonly AuthorIconHideAnimation[];

type AnimationConfig = {
    show: AuthorIconShowAnimation;
    hide: AuthorIconHideAnimation;
};

const getRandomItem = <T,>(items: readonly T[]): T => {
    return items[Math.floor(Math.random() * items.length)]!;
};

const getCompatibleHideAnimation = (
    show: AuthorIconShowAnimation,
): AuthorIconHideAnimation => {
    const strategy = authorIconAnimationConfig.show[show].strategy;

    const compatibleAnimations = authorIconHideAnimations.filter(
        (animation) =>
            authorIconAnimationConfig.hide[animation].strategy === strategy,
    );

    return getRandomItem(compatibleAnimations);
};

export const Header = () => {
    const [view, setView] = useState(true);

    const [config, setConfig] = useState<AnimationConfig>({
        show: "draw",
        hide: "erase",
    });

    const handleShowEnd = () => {
        setConfig((prev) => ({
            ...prev,
            hide: getCompatibleHideAnimation(prev.show),
        }));

        setView(false);
    };

    const handleHideEnd = () => {
        setConfig((prev) => ({
            ...prev,
            show: getRandomItem(authorIconShowAnimations),
        }));

        setView(true);
    };

    return (
        <div
            className="
                col-center-2
                w-full
                justify-center
                px-3
                py-6
                md:row-center-2
                md:w-auto
            "
        >
            <div
                className="
                    pattern-bg
                    relative
                    col-center-0
                    size-50
                    justify-center
                    overflow-hidden
                    rounded-full
                    border-3
                    border-b-5
                    border-fg/5
                    p-6
                    transition-all
                    duration-200
                    ease-in-out
                "
            >
                <AuthorIcon
                    visible={view}
                    show={config.show}
                    hide={config.hide}
                    duration={1000}
                    showTrigger={false}
                    onShowEnd={handleShowEnd}
                    onHideEnd={handleHideEnd}
                />
            </div>

            <Name />
        </div>
    );
};
