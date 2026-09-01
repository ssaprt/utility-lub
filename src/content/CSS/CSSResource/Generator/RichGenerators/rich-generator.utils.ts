import type { RichConfig } from "./rich-generator.type";

const n = (v: unknown) => Number(v);
const s = (v: unknown) => String(v);
const b = (v: unknown) => Boolean(v);
const hexToRgba = (hex: string, alpha: number) => {
    const value = hex.replace("#", "");
    const normalized = value.length === 3 ? value.split("").map((x) => x + x).join("") : value;
    const parsed = Number.parseInt(normalized, 16);
    return `rgba(${(parsed >> 16) & 255}, ${(parsed >> 8) & 255}, ${parsed & 255}, ${alpha})`;
};

export const richConfigToCss = ({ kind, values: v }: RichConfig) => {
    if (kind === "cubic-bezier") return `.animated-element {
    transition: transform ${n(v.duration)}s cubic-bezier(${n(v.x1)}, ${n(v.y1)}, ${n(v.x2)}, ${n(v.y2)});
}
.animated-element:hover { transform: translateX(240px); }`;
    if (kind === "flip-switch") return `.flip-switch { --track: ${s(v.inactiveColor)}; --active: ${s(v.activeColor)}; position: relative; display: inline-flex; width: ${n(v.width)}px; height: ${n(v.height)}px; overflow: hidden; cursor: pointer; }
.flip-switch input { position: absolute; opacity: 0; }
.flip-switch__track { width: 100%; height: 100%; border: ${n(v.borderWidth)}px solid color-mix(in srgb, var(--track) 75%, white); border-radius: ${n(v.radius)}px; background: var(--track); transition: ${n(v.speed)}s ease; }
.flip-switch__thumb { position: absolute; left: ${n(v.offset)}px; top: 50%; width: ${n(v.thumbSize)}px; height: ${n(v.thumbSize)}px; border-radius: 50%; background: ${s(v.thumbColor)}; transform: translateY(-50%); transition: ${n(v.speed)}s cubic-bezier(.2,.8,.2,1); box-shadow: 0 3px 10px rgb(0 0 0 / .3); }
.flip-switch input:checked ~ .flip-switch__track { background: var(--active); }
.flip-switch input:checked ~ .flip-switch__thumb { transform: translate(${Math.max(0, n(v.width) - n(v.thumbSize) - n(v.offset) * 2)}px, -50%); }
.flip-switch__label { position: absolute; top: 50%; transform: translateY(-50%); color: rgb(255 255 255 / .72); font: 700 9px/1 sans-serif; pointer-events: none; }
.flip-switch__label--off { left: 12%; } .flip-switch__label--on { right: 12%; }`;
    if (kind === "glassmorphism") return `.glass-card {
    background: ${hexToRgba(s(v.cardColor), n(v.opacity))};
    backdrop-filter: blur(${n(v.blur)}px) saturate(135%);
    -webkit-backdrop-filter: blur(${n(v.blur)}px) saturate(135%);
    border: ${b(v.border) ? `${n(v.borderWidth)}px solid ${hexToRgba("#ffffff", n(v.borderOpacity))}` : "none"};
    border-radius: ${n(v.radius)}px;
    box-shadow: ${b(v.shadow) ? `0 24px ${n(v.shadowBlur)}px ${n(v.shadowSpread)}px rgb(0 0 0 / ${n(v.shadowOpacity)})` : "none"};
}`;
    if (kind === "triangle") {
        const points: Record<string, string> = { top: "50% 0,100% 100%,0 100%", "top-right": "100% 0,100% 100%,0 0", right: "100% 50%,0 100%,0 0", "bottom-right": "100% 100%,0 100%,100% 0", bottom: "50% 100%,0 0,100% 0", "bottom-left": "0 100%,0 0,100% 100%", left: "0 50%,100% 0,100% 100%", "top-left": "0 0,100% 0,0 100%" };
        if (v.method === "border") return `.css-triangle { width: 0; height: 0; border-left: ${n(v.width) / 2}px solid transparent; border-right: ${n(v.width) / 2}px solid transparent; border-bottom: ${n(v.height)}px solid ${s(v.color)}; transform: rotate(${n(v.rotation)}deg) skewX(${n(v.skew)}deg); }`;
        if (v.method === "pseudo") return `.triangle-host::before { content: ""; display: block; width: ${n(v.width)}px; height: ${n(v.height)}px; background: ${s(v.color)}; clip-path: polygon(${points[s(v.direction)]}); transform: rotate(${n(v.rotation)}deg) skewX(${n(v.skew)}deg); }`;
        if (v.method === "svg") return `.triangle-svg { width: ${n(v.width)}px; height: ${n(v.height)}px; color: ${s(v.color)}; transform: rotate(${n(v.rotation)}deg) skewX(${n(v.skew)}deg); } .triangle-svg polygon { fill: currentColor; }`;
        return `.css-triangle { width: ${n(v.width)}px; height: ${n(v.height)}px; background: ${s(v.color)}; clip-path: polygon(${points[s(v.direction)]}); transform: rotate(${n(v.rotation)}deg) skewX(${n(v.skew)}deg); border-radius: ${n(v.radius)}px; }`;
    }
    if (kind === "toast") return `.toast { width: min(${n(v.width)}px, calc(100vw - 32px)); display: grid; grid-template-columns: auto 1fr auto; gap: 12px; padding: ${n(v.padding)}px; border-radius: ${n(v.radius)}px; background: color-mix(in srgb, ${s(v.accent)} 16%, #111119); border: 1px solid color-mix(in srgb, ${s(v.accent)} 45%, transparent); color: #f8fafc; box-shadow: 0 16px 50px rgb(0 0 0 / .35); }
.toast__progress { height: 3px; background: ${s(v.accent)}; transform-origin: left; animation: toast-progress ${n(v.duration)}s linear forwards; }
@keyframes toast-progress { to { transform: scaleX(0); } }`;
    if (kind === "text-shadow") {
        const shadows = Array.from({ length: n(v.layers) }, (_, i) => `${n(v.x) + i * n(v.layerGap)}px ${n(v.y) + i * n(v.layerGap)}px ${n(v.blur)}px ${hexToRgba(s(v.shadowColor), Math.max(.08, n(v.alpha) - i * .06))}`).join(",\n        ");
        return `.shadow-text { color: ${s(v.textColor)}; font-size: ${n(v.fontSize)}px; font-weight: ${n(v.fontWeight)}; text-shadow: ${shadows}; }`;
    }
    if (kind === "text-input") return `.generated-input-wrap { position: relative; display: block; width: ${b(v.fullWidth) ? "100%" : `min(${n(v.width)}px, 100%)`}; }
.generated-input-wrap__icon { position: absolute; z-index: 1; left: ${n(v.paddingX)}px; top: 50%; width: ${n(v.fontSize) + 2}px; height: ${n(v.fontSize) + 2}px; color: ${s(v.placeholderColor)}; transform: translateY(-50%); pointer-events: none; }
.generated-input { box-sizing: border-box; display: block; width: 100%; padding: ${n(v.paddingY)}px ${n(v.paddingX)}px; ${b(v.icon) ? `padding-left: ${n(v.paddingX) + n(v.fontSize) + 10}px;` : ""} font-size: ${n(v.fontSize)}px; line-height: 1.4; color: ${s(v.textColor)}; background: ${s(v.background)}; border: ${b(v.bottomOnly) ? "0" : `${n(v.borderWidth)}px solid ${s(v.borderColor)}`}; border-bottom: ${n(v.borderWidth)}px solid ${s(v.borderColor)}; border-radius: ${b(v.bottomOnly) ? 0 : `${n(v.radius)}px`}; box-shadow: 0 8px ${n(v.shadowBlur)}px rgb(0 0 0 / .16); outline: none; transition: .2s ease; }
.generated-input::placeholder { color: ${s(v.placeholderColor)}; }
.generated-input:focus { border-color: ${s(v.focusColor)}; box-shadow: 0 0 0 ${n(v.focusRing)}px color-mix(in srgb, ${s(v.focusColor)} 24%, transparent); }`;
    if (kind === "text-gradient") return `.gradient-text { background: ${b(v.repeat) ? "repeating-" : ""}linear-gradient(${n(v.angle)}deg, ${s(v.startColor)} ${n(v.startPosition)}%, ${s(v.stopColor)} ${n(v.stopPosition)}%, ${s(v.endColor)} ${n(v.endPosition)}%); background-size: ${b(v.animated) ? "220% 220%" : "100% 100%"}; -webkit-background-clip: text; background-clip: text; color: transparent; font-size: ${n(v.fontSize)}px; font-weight: ${n(v.fontWeight)}; ${b(v.animated) ? `animation: gradient-flow ${n(v.speed)}s ease infinite;` : ""} }
@keyframes gradient-flow { 0%,100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }`;
    if (kind === "sprite") {
        const count = Math.min(144, n(v.columns) * n(v.rows));
        const scale = b(v.retina) ? .5 : 1;
        const source = s(v.imageUrl).startsWith("data:") ? "sprite.png" : s(v.imageUrl);
        return Array.from({ length: count }, (_, i) => `.${s(v.prefix)}${i + 1} { width: ${n(v.cellWidth) * scale}px; height: ${n(v.cellHeight) * scale}px; background: url('${source}') -${(i % n(v.columns)) * (n(v.cellWidth) + n(v.padding)) * scale}px -${Math.floor(i / n(v.columns)) * (n(v.cellHeight) + n(v.padding)) * scale}px / ${n(v.columns) * (n(v.cellWidth) + n(v.padding)) * scale}px auto no-repeat; }`).join("\n");
    }
    return `.scene { perspective: ${n(v.perspective)}px; perspective-origin: ${n(v.originX)}% ${n(v.originY)}%; }
.cube { transform-style: ${b(v.preserve3d) ? "preserve-3d" : "flat"}; transform: translate3d(${n(v.translateX)}px, ${n(v.translateY)}px, ${n(v.translateZ)}px) rotateX(${n(v.rotateX)}deg) rotateY(${n(v.rotateY)}deg) rotateZ(${n(v.rotateZ)}deg) skew(${n(v.skewX)}deg, ${n(v.skewY)}deg) scale3d(${n(v.scaleX)}, ${n(v.scaleY)}, ${n(v.scaleZ)}); }
.cube__face { backface-visibility: ${b(v.backface) ? "visible" : "hidden"}; }`;
};

export const richConfigToHtml = ({ kind, values: v }: RichConfig) => {
    if (kind === "cubic-bezier") return `<div class="animated-element"></div>`;
    if (kind === "flip-switch") return `<label class="flip-switch"><input type="checkbox" ${b(v.active) ? "checked" : ""}><span class="flip-switch__track"></span>${b(v.labels) ? `<span class="flip-switch__label flip-switch__label--off">${s(v.labelOff)}</span><span class="flip-switch__label flip-switch__label--on">${s(v.labelOn)}</span>` : ""}<span class="flip-switch__thumb"></span></label>`;
    if (kind === "glassmorphism") return `<article class="glass-card">Glass surface</article>`;
    if (kind === "triangle") return v.method === "svg" ? `<svg class="triangle-svg" viewBox="0 0 100 100"><polygon points="50,0 100,100 0,100" /></svg>` : v.method === "pseudo" ? `<div class="triangle-host"></div>` : `<div class="css-triangle"></div>`;
    if (kind === "toast") return `<div class="toast" role="status"><strong>${s(v.title)}</strong><p>${s(v.message)}</p><div class="toast__progress"></div></div>`;
    if (kind === "text-shadow") return `<h2 class="shadow-text">${s(v.text)}</h2>`;
    if (kind === "text-input") return `<label class="generated-input-wrap">${b(v.icon) ? `<svg class="generated-input-wrap__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.8-3.8"/></svg>` : ""}<input class="generated-input" type="${s(v.inputType)}" placeholder="${s(v.placeholder)}"></label>`;
    if (kind === "text-gradient") return `<h2 class="gradient-text">${s(v.text)}</h2>`;
    if (kind === "sprite") return `<i class="${s(v.prefix)}1" aria-hidden="true"></i>`;
    return `<div class="scene"><div class="cube">…six faces…</div></div>`;
};
