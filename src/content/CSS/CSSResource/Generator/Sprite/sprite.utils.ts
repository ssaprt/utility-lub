import type { SpriteAsset, SpriteConfig, SpriteMetrics } from "./sprite.type";

export const getSpriteMetrics = (
    count: number,
    config: SpriteConfig,
): SpriteMetrics => {
    if (count === 0) {
        return {
            columns: 0,
            rows: 0,
            width: 0,
            height: 0,
            placements: [],
        };
    }

    const columns =
        config.layout === "vertical"
            ? 1
            : config.layout === "horizontal"
              ? count
              : Math.min(Math.max(1, config.columns), count);

    const rows = Math.ceil(count / columns);

    const width =
        columns * config.cellWidth + Math.max(0, columns - 1) * config.gap;

    const height =
        rows * config.cellHeight + Math.max(0, rows - 1) * config.gap;

    return {
        columns,
        rows,
        width,
        height,
        placements: Array.from({ length: count }, (_, index) => {
            const column = index % columns;
            const row = Math.floor(index / columns);

            return {
                index,
                column,
                row,
                x: column * (config.cellWidth + config.gap),
                y: row * (config.cellHeight + config.gap),
            };
        }),
    };
};

const normalizeClassName = (value: string, fallback: string) => {
    const normalized = value
        .replace(/\.[^/.]+$/, "")
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9_-]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .replace(/-{2,}/g, "-");

    return normalized || fallback;
};

export const getSpriteClassNames = (assets: SpriteAsset[], prefix: string) => {
    const normalizedPrefix = normalizeClassName(prefix, "sprite");

    const used = new Map<string, number>();

    return assets.map((asset, index) => {
        const base = normalizeClassName(asset.name, `item-${index + 1}`);

        const occurrence = (used.get(base) ?? 0) + 1;

        used.set(base, occurrence);

        return `${normalizedPrefix}--${base}${
            occurrence > 1 ? `-${occurrence}` : ""
        }`;
    });
};

const negativePosition = (value: number) => (value === 0 ? "0" : `-${value}px`);

const escapeHtml = (value: string) =>
    value
        .replace(/&/g, "&amp;")
        .replace(/"/g, "&quot;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

export const createSpriteCss = (
    assets: SpriteAsset[],
    config: SpriteConfig,
    metrics: SpriteMetrics,
) => {
    if (assets.length === 0) return "";

    const baseClass = normalizeClassName(config.prefix, "sprite");

    const classNames = getSpriteClassNames(assets, baseClass);

    const imageRendering =
        config.rendering === "pixelated"
            ? "\n    image-rendering: pixelated;"
            : "";

    const base = `.${baseClass} {
    display: inline-block;
    width: ${config.cellWidth}px;
    height: ${config.cellHeight}px;
    background-image: url("./sprite.png");
    background-repeat: no-repeat;
    background-size: ${metrics.width}px ${metrics.height}px;${imageRendering}
}`;

    const items = metrics.placements

        .map(
            (placement, index) => `.${classNames[index]} {
    background-position: ${negativePosition(
        placement.x,
    )} ${negativePosition(placement.y)};
}`,
        )
        .join("\n\n");

    return `${base}\n\n${items}`;
};

export const createSpriteHtml = (
    assets: SpriteAsset[],
    config: SpriteConfig,
) => {
    if (assets.length === 0) return "";

    const baseClass = normalizeClassName(config.prefix, "sprite");

    const classNames = getSpriteClassNames(assets, baseClass);

    return assets
        .map((asset, index) => {
            const label =
                asset.name.replace(/\.[^/.]+$/, "") || `Sprite ${index + 1}`;

            return `<i class="${baseClass} ${classNames[index]}" role="img" aria-label="${escapeHtml(label)}"></i>`;
        })
        .join("\n");
};
