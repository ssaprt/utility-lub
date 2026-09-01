import type { SkeletonCardType, SkeletonLoaderConfig } from "./skeleton-loader.type";

const sizeValues = {
    compact: { padding: 10, image: 82, avatar: 38 },
    medium: { padding: 14, image: 118, avatar: 48 },
    large: { padding: 18, image: 160, avatar: 62 },
} as const;

const cardMarkup = (type: SkeletonCardType) => {
    if (type === "profile") return `        <div class="skeleton-row">
            <div class="skeleton-block skeleton-avatar"></div>
            <div class="skeleton-copy">
                <div class="skeleton-block skeleton-line skeleton-line-short"></div>
                <div class="skeleton-block skeleton-line skeleton-line-tiny"></div>
            </div>
        </div>
        <div class="skeleton-block skeleton-line"></div>
        <div class="skeleton-block skeleton-line skeleton-line-short"></div>`;
    if (type === "product") return `        <div class="skeleton-block skeleton-image"></div>
        <div class="skeleton-block skeleton-line skeleton-line-short"></div>
        <div class="skeleton-row">
            <div class="skeleton-block skeleton-line skeleton-line-tiny"></div>
            <div class="skeleton-block skeleton-button"></div>
        </div>`;
    if (type === "list") return `        <div class="skeleton-row">
            <div class="skeleton-block skeleton-avatar"></div>
            <div class="skeleton-copy">
                <div class="skeleton-block skeleton-line"></div>
                <div class="skeleton-block skeleton-line skeleton-line-short"></div>
            </div>
        </div>`;
    return `        <div class="skeleton-block skeleton-image"></div>
        <div class="skeleton-block skeleton-line"></div>
        <div class="skeleton-block skeleton-line"></div>
        <div class="skeleton-block skeleton-line skeleton-line-short"></div>`;
};

export const skeletonLoaderConfigToCss = (config: SkeletonLoaderConfig) => {
    const size = sizeValues[config.size];
    const animation = config.animation === "shimmer"
        ? `position: relative; background: ${config.baseColor};`
        : config.animation === "pulse"
          ? `background: ${config.baseColor}; animation: skeleton-pulse ${config.speed}s ease-in-out infinite;`
          : `background: ${config.baseColor};`;

    return `.skeleton-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: ${config.gap}px;
    padding: ${config.gap}px;
    background: ${config.backgroundColor};
}

.skeleton-card {
    display: flex;
    flex-direction: column;
    gap: ${Math.max(7, config.gap * 0.65)}px;
    min-width: 0;
    padding: ${size.padding}px;
    border-radius: ${config.radius}px;
    background: ${config.cardColor};
}

.skeleton-block {
    overflow: hidden;
    border-radius: ${Math.max(3, config.radius * 0.55)}px;
    ${animation}
}

${config.animation === "shimmer" ? `.skeleton-block::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: linear-gradient(90deg, transparent 0%, ${config.shineColor} 50%, transparent 100%);
    transform: translateX(-110%);
    animation: skeleton-shimmer ${config.speed}s ease-in-out infinite;
    will-change: transform;
}` : ""}

.skeleton-image { width: 100%; height: ${size.image}px; }
.skeleton-avatar { width: ${size.avatar}px; height: ${size.avatar}px; flex: 0 0 auto; border-radius: 50%; }
.skeleton-line { width: 100%; height: 11px; }
.skeleton-line-short { width: 68%; }
.skeleton-line-tiny { width: 42%; }
.skeleton-button { width: 58px; height: 25px; margin-left: auto; }
.skeleton-row { display: flex; align-items: center; gap: 10px; }
.skeleton-copy { display: flex; flex: 1; flex-direction: column; gap: 8px; min-width: 0; }

@keyframes skeleton-shimmer {
    0% { transform: translateX(-110%); }
    100% { transform: translateX(110%); }
}
@keyframes skeleton-pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.45; }
}

@media (prefers-reduced-motion: reduce) {
    .skeleton-block,
    .skeleton-block::after { animation: none; }
}`;
};

export const skeletonLoaderConfigToHtml = (config: SkeletonLoaderConfig) => `<div class="skeleton-grid" aria-label="Loading content">
${Array.from({ length: config.quantity }, () => `    <div class="skeleton-card" aria-hidden="true">\n${cardMarkup(config.cardType)}\n    </div>`).join("\n")}
</div>`;
