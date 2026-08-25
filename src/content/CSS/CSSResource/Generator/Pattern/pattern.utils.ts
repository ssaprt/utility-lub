import type { CSSProperties } from "react";
import type { PatternConfig } from "./pattern.types";

const clamp = (value: number, min: number, max: number) => {
    return Math.min(Math.max(value, min), max);
};

const round = (value: number) => {
    return Math.round(value * 100) / 100;
};

const escapeXml = (value: string) => {
    return value
        .replaceAll("&", "&amp;")
        .replaceAll('"', "&quot;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;");
};

const hexToRgb = (hex: string) => {
    const value = hex.replace("#", "");

    if (!/^[0-9a-fA-F]{6}$/.test(value)) {
        return hex;
    }

    const red = parseInt(value.slice(0, 2), 16);
    const green = parseInt(value.slice(2, 4), 16);
    const blue = parseInt(value.slice(4, 6), 16);

    return `rgb(${red},${green},${blue})`;
};

const createStarPoints = (
    cx: number,
    cy: number,
    outerRadius: number,
    innerRadius: number,
) => {
    return Array.from({ length: 10 }, (_, index) => {
        const radius = index % 2 === 0 ? outerRadius : innerRadius;
        const angle = -Math.PI / 2 + (index * Math.PI) / 5;
        const x = cx + Math.cos(angle) * radius;
        const y = cy + Math.sin(angle) * radius;

        return `${round(x)},${round(y)}`;
    }).join(" ");
};

const createPatternSvg = (config: PatternConfig) => {
    const size = Math.max(4, config.size);
    const tileWidth = Math.max(1, size + Math.max(0, config.gapX));
    const tileHeight = Math.max(1, size + Math.max(0, config.gapY));
    const cx = tileWidth / 2;
    const cy = tileHeight / 2;
    const half = size / 2;
    const quarter = size / 4;
    const thickness = clamp(config.thickness, 0.5, Math.max(0.5, size / 2));
    const opacity = clamp(config.opacity, 0, 100) / 100;
    const primary = hexToRgb(config.patternColor);
    const secondary = hexToRgb(config.secondaryColor);
    const scaleX = Math.max(0.05, config.scaleX / 100);
    const scaleY = Math.max(0.05, config.scaleY / 100);
    const angle = config.angle;
    const offsetX = config.elementOffsetX;
    const offsetY = config.elementOffsetY;
    const left = cx - half;
    const top = cy - half;
    const right = cx + half;
    const bottom = cy + half;
    const transform = `translate(${round(cx + offsetX)} ${round(cy + offsetY)}) rotate(${round(angle)}) scale(${round(scaleX)} ${round(scaleY)}) translate(${-round(cx)} ${-round(cy)})`;

    const stroke = `stroke="${primary}" stroke-width="${round(thickness)}" stroke-linecap="round" stroke-linejoin="round" fill="none"`;
    const secondaryStroke = `stroke="${secondary}" stroke-width="${round(thickness)}" stroke-linecap="round" stroke-linejoin="round" fill="none"`;

    let content = "";

    switch (config.patternType) {
        case "dots":
            content = `<circle cx="${round(cx)}" cy="${round(cy)}" r="${round(thickness)}" fill="${primary}" />`;
            break;

        case "polkaDots":
            content = `
                <circle cx="${round(cx - quarter)}" cy="${round(cy - quarter)}" r="${round(thickness * 1.4)}" fill="${primary}" />
                <circle cx="${round(cx + quarter)}" cy="${round(cy + quarter)}" r="${round(thickness * 1.4)}" fill="${secondary}" />
            `;
            break;

        case "grid":
            content = `
                <path d="M ${round(left)} ${round(top)} H ${round(right)} M ${round(left)} ${round(top)} V ${round(bottom)}" ${stroke} />
                <path d="M ${round(left)} ${round(bottom)} H ${round(right)} M ${round(right)} ${round(top)} V ${round(bottom)}" ${secondaryStroke} />
            `;
            break;

        case "diagonal":
            content = `
                <path d="M ${round(left - size)} ${round(bottom)} L ${round(right)} ${round(top - size)} M ${round(left)} ${round(bottom + size)} L ${round(right + size)} ${round(top)}" ${stroke} />
            `;
            break;

        case "horizontal":
            content = `<path d="M ${round(left)} ${round(cy)} H ${round(right)}" ${stroke} />`;
            break;

        case "vertical":
            content = `<path d="M ${round(cx)} ${round(top)} V ${round(bottom)}" ${stroke} />`;
            break;

        case "checker":
            content = `
                <rect x="${round(left)}" y="${round(top)}" width="${round(half)}" height="${round(half)}" fill="${primary}" />
                <rect x="${round(cx)}" y="${round(cy)}" width="${round(half)}" height="${round(half)}" fill="${primary}" />
                <rect x="${round(cx)}" y="${round(top)}" width="${round(half)}" height="${round(half)}" fill="${secondary}" />
                <rect x="${round(left)}" y="${round(cy)}" width="${round(half)}" height="${round(half)}" fill="${secondary}" />
            `;
            break;

        case "diamonds":
            content = `
                <polygon points="${round(cx)},${round(top)} ${round(right)},${round(cy)} ${round(cx)},${round(bottom)} ${round(left)},${round(cy)}" fill="${primary}" />
                <polygon points="${round(cx)},${round(cy - quarter)} ${round(cx + quarter)},${round(cy)} ${round(cx)},${round(cy + quarter)} ${round(cx - quarter)},${round(cy)}" fill="${secondary}" />
            `;
            break;

        case "honeycomb":
        case "hexagons": {
            const radius = size * 0.46;
            const h = radius * 0.8660254;
            const points = [
                [cx - radius, cy],
                [cx - radius / 2, cy - h],
                [cx + radius / 2, cy - h],
                [cx + radius, cy],
                [cx + radius / 2, cy + h],
                [cx - radius / 2, cy + h],
            ]
                .map(([x, y]) => `${round(x)},${round(y)}`)
                .join(" ");

            content = `<polygon points="${points}" ${stroke} />`;

            if (config.patternType === "honeycomb") {
                content += `<circle cx="${round(cx)}" cy="${round(cy)}" r="${round(Math.max(1, thickness))}" fill="${secondary}" />`;
            }
            break;
        }

        case "crosshatch":
            content = `
                <path d="M ${round(left)} ${round(top)} L ${round(right)} ${round(bottom)}" ${stroke} />
                <path d="M ${round(right)} ${round(top)} L ${round(left)} ${round(bottom)}" ${secondaryStroke} />
            `;
            break;

        case "rings":
            content = `<circle cx="${round(cx)}" cy="${round(cy)}" r="${round(size * 0.34)}" ${stroke} />`;
            break;

        case "bubbles":
            content = `
                <circle cx="${round(cx - size * 0.12)}" cy="${round(cy + size * 0.1)}" r="${round(size * 0.28)}" ${stroke} />
                <circle cx="${round(cx + size * 0.22)}" cy="${round(cy - size * 0.2)}" r="${round(size * 0.14)}" ${secondaryStroke} />
            `;
            break;

        case "waves":
            content = `
                <path d="M ${round(left - quarter)} ${round(cy)} C ${round(left + quarter)} ${round(cy - quarter)}, ${round(cx - quarter)} ${round(cy - quarter)}, ${round(cx)} ${round(cy)} S ${round(right - quarter)} ${round(cy + quarter)}, ${round(right + quarter)} ${round(cy)}" ${stroke} />
                <path d="M ${round(left - quarter)} ${round(cy + quarter)} C ${round(left + quarter)} ${round(cy)}, ${round(cx - quarter)} ${round(cy)}, ${round(cx)} ${round(cy + quarter)} S ${round(right - quarter)} ${round(cy + half)}, ${round(right + quarter)} ${round(cy + quarter)}" ${secondaryStroke} />
            `;
            break;

        case "scales":
            content = `
                <path d="M ${round(left)} ${round(cy)} Q ${round(cx - quarter)} ${round(top)}, ${round(cx)} ${round(cy)} Q ${round(cx + quarter)} ${round(top)}, ${round(right)} ${round(cy)}" ${stroke} />
                <path d="M ${round(left)} ${round(bottom)} Q ${round(cx - quarter)} ${round(cy)}, ${round(cx)} ${round(bottom)} Q ${round(cx + quarter)} ${round(cy)}, ${round(right)} ${round(bottom)}" ${secondaryStroke} />
            `;
            break;

        case "clouds":
            content = `
                <circle cx="${round(cx - quarter)}" cy="${round(cy + thickness)}" r="${round(size * 0.2)}" fill="${primary}" />
                <circle cx="${round(cx)}" cy="${round(cy - size * 0.1)}" r="${round(size * 0.27)}" fill="${primary}" />
                <circle cx="${round(cx + quarter)}" cy="${round(cy + thickness)}" r="${round(size * 0.19)}" fill="${secondary}" />
                <rect x="${round(cx - size * 0.36)}" y="${round(cy)}" width="${round(size * 0.72)}" height="${round(size * 0.2)}" rx="${round(size * 0.1)}" fill="${primary}" />
            `;
            break;

        case "triangles":
            content = `
                <polygon points="${round(cx)},${round(top)} ${round(right)},${round(bottom)} ${round(left)},${round(bottom)}" ${stroke} />
                <polygon points="${round(cx)},${round(cy - quarter)} ${round(cx + quarter)},${round(cy + quarter)} ${round(cx - quarter)},${round(cy + quarter)}" fill="${secondary}" />
            `;
            break;

        case "zigzag":
            content = `<polyline points="${round(left)},${round(cy + quarter)} ${round(cx - quarter)},${round(cy - quarter)} ${round(cx + quarter)},${round(cy + quarter)} ${round(right)},${round(cy - quarter)}" ${stroke} />`;
            break;

        case "chevron":
            content = `
                <polyline points="${round(left)},${round(cy - quarter)} ${round(cx)},${round(cy + quarter)} ${round(right)},${round(cy - quarter)}" ${stroke} />
                <polyline points="${round(left)},${round(cy + quarter)} ${round(cx)},${round(cy - quarter)} ${round(right)},${round(cy + quarter)}" ${secondaryStroke} />
            `;
            break;

        case "bricks":
            content = `
                <path d="M ${round(left)} ${round(cy)} H ${round(right)} M ${round(cx)} ${round(top)} V ${round(cy)} M ${round(left + quarter)} ${round(cy)} V ${round(bottom)} M ${round(right - quarter)} ${round(cy)} V ${round(bottom)}" ${stroke} />
            `;
            break;

        case "tiles":
            content = `
                <rect x="${round(left + thickness / 2)}" y="${round(top + thickness / 2)}" width="${round(size - thickness)}" height="${round(size - thickness)}" ${stroke} />
                <rect x="${round(cx - quarter)}" y="${round(cy - quarter)}" width="${round(half)}" height="${round(half)}" ${secondaryStroke} />
            `;
            break;

        case "circles":
            content = `
                <circle cx="${round(cx)}" cy="${round(cy)}" r="${round(size * 0.38)}" ${stroke} />
                <circle cx="${round(cx)}" cy="${round(cy)}" r="${round(size * 0.18)}" ${secondaryStroke} />
            `;
            break;

        case "confetti":
            content = `
                <path d="M ${round(cx - size * 0.32)} ${round(cy - size * 0.22)} l ${round(size * 0.18)} ${round(size * 0.1)}" ${stroke} />
                <path d="M ${round(cx + size * 0.1)} ${round(cy - size * 0.28)} l ${round(size * 0.08)} ${round(size * 0.18)}" ${secondaryStroke} />
                <circle cx="${round(cx + size * 0.27)}" cy="${round(cy + size * 0.2)}" r="${round(Math.max(1, thickness))}" fill="${primary}" />
                <circle cx="${round(cx - size * 0.18)}" cy="${round(cy + size * 0.28)}" r="${round(Math.max(1, thickness * 0.8))}" fill="${secondary}" />
            `;
            break;

        case "stars":
            content = `<polygon points="${createStarPoints(cx, cy, size * 0.42, size * 0.18)}" fill="${primary}" />`;
            break;

        case "plus":
            content = `
                <path d="M ${round(cx - quarter)} ${round(cy)} H ${round(cx + quarter)} M ${round(cx)} ${round(cy - quarter)} V ${round(cy + quarter)}" ${stroke} />
                <path d="M ${round(left + quarter * 0.5)} ${round(top + quarter * 0.5)} h ${round(quarter)} M ${round(left + quarter)} ${round(top)} v ${round(quarter)}" ${secondaryStroke} />
            `;
            break;

        case "weave":
            content = `
                <rect x="${round(left)}" y="${round(cy - thickness)}" width="${round(size)}" height="${round(thickness * 2)}" rx="${round(thickness)}" fill="${primary}" />
                <rect x="${round(cx - thickness)}" y="${round(top)}" width="${round(thickness * 2)}" height="${round(size)}" rx="${round(thickness)}" fill="${secondary}" />
                <rect x="${round(cx - thickness)}" y="${round(cy - thickness)}" width="${round(thickness * 2)}" height="${round(thickness * 2)}" fill="${primary}" />
            `;
            break;
    }

    const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="${round(tileWidth)}" height="${round(tileHeight)}" viewBox="0 0 ${round(tileWidth)} ${round(tileHeight)}">
            <g opacity="${round(opacity)}" transform="${transform}">
                ${content}
            </g>
        </svg>
    `
        .replace(/\s{2,}/g, " ")
        .trim();

    return {
        svg,
        tileWidth,
        tileHeight,
    };
};

const svgToDataUrl = (svg: string) => {
    const normalized = svg.replace(/\s+/g, " ").trim().replaceAll('"', "'");

    return `data:image/svg+xml,${normalized}`;
};

export const defaultPatternConfig: PatternConfig = {
    patternType: "dots",
    backgroundColor: "#0f172a",
    patternColor: "#8b5cf6",
    secondaryColor: "#ec4899",
    size: 32,
    gapX: 0,
    gapY: 0,
    thickness: 2,
    opacity: 70,
    angle: 0,
    positionX: 0,
    positionY: 0,
    elementOffsetX: 0,
    elementOffsetY: 0,
    scaleX: 100,
    scaleY: 100,
};

export const isValidHex = (value: string) => {
    return /^#[0-9a-fA-F]{6}$/.test(value);
};

export const patternConfigToStyle = (config: PatternConfig): CSSProperties => {
    const { svg, tileWidth, tileHeight } = createPatternSvg(config);

    return {
        backgroundColor: config.backgroundColor,
        backgroundImage: `url("${svgToDataUrl(svg)}")`,
        backgroundRepeat: "repeat",
        backgroundSize: `${round(tileWidth)}px ${round(tileHeight)}px`,
        backgroundPosition: `${round(config.positionX)}px ${round(config.positionY)}px`,
    };
};

export const patternConfigToCss = (config: PatternConfig) => {
    const style = patternConfigToStyle(config);

    return [
        `background-color: ${style.backgroundColor};`,
        `background-image: ${style.backgroundImage};`,
        `background-repeat: repeat;`,
        `background-size: ${style.backgroundSize};`,
        `background-position: ${style.backgroundPosition};`,
    ].join("\n");
};
