export type RichGeneratorKind =
    | "cubic-bezier"
    | "flip-switch"
    | "glassmorphism"
    | "triangle"
    | "toast"
    | "text-shadow"
    | "text-input"
    | "text-gradient"
    | "sprite"
    | "transform-3d";

export type RichValue = string | number | boolean;

export interface RichConfig {
    kind: RichGeneratorKind;
    values: Record<string, RichValue>;
}

export interface RichControl {
    key: string;
    title: string;
    type: "range" | "color" | "text" | "select" | "toggle";
    min?: number;
    max?: number;
    step?: number;
    unit?: string;
    values?: readonly string[];
    section: string;
}

const common = { surface: "#101017", accent: "#8b5cf6", accent2: "#22d3ee" };

export const defaultRichConfigs: Record<RichGeneratorKind, RichConfig> = {
    "cubic-bezier": { kind: "cubic-bezier", values: { ...common, x1: .22, y1: 1, x2: .36, y2: 1, duration: 1.2, mode: "position", compare: true } },
    "flip-switch": { kind: "flip-switch", values: { ...common, width: 72, height: 38, radius: 19, thumbSize: 30, offset: 4, borderWidth: 1, active: true, labels: true, inactiveColor: "#353542", activeColor: "#8b5cf6", thumbColor: "#ffffff", labelOff: "OFF", labelOn: "ON", speed: .25 } },
    glassmorphism: { kind: "glassmorphism", values: { ...common, blur: 18, opacity: .24, radius: 24, borderWidth: 1, borderOpacity: .3, shadowBlur: 44, shadowSpread: -12, shadowOpacity: .35, cardColor: "#ffffff", backgroundImage: "", backgroundSize: "cover", backgroundPosition: "center", border: true, shadow: true, noise: true } },
    triangle: { kind: "triangle", values: { ...common, method: "clip-path", direction: "top", width: 150, height: 120, rotation: 0, skew: 0, color: "#8b5cf6", radius: 0 } },
    toast: { kind: "toast", values: { ...common, type: "success", title: "Changes saved", message: "Your settings have been updated.", position: "top-right", variant: "soft", width: 340, padding: 16, radius: 14, duration: 4, icon: true, close: true, progress: true } },
    "text-shadow": { kind: "text-shadow", values: { ...common, text: "SHADOW", fontSize: 72, fontWeight: 800, textColor: "#f8fafc", canvas: "#101017", x: 4, y: 6, blur: 12, shadowColor: "#8b5cf6", alpha: .8, layers: 3, layerGap: 3 } },
    "text-input": { kind: "text-input", values: { ...common, placeholder: "Search anything…", inputType: "search", width: 360, fontSize: 14, paddingX: 14, paddingY: 11, radius: 10, background: "#17171f", textColor: "#f8fafc", placeholderColor: "#8b8b98", borderColor: "#353545", focusColor: "#8b5cf6", borderWidth: 1, focusRing: 3, shadowBlur: 12, bottomOnly: false, icon: true, fullWidth: false } },
    "text-gradient": { kind: "text-gradient", values: { ...common, text: "Gradient type", angle: 120, startColor: "#8b5cf6", stopColor: "#22d3ee", endColor: "#f472b6", startPosition: 0, stopPosition: 48, endPosition: 100, fontSize: 64, fontWeight: 800, repeat: false, animated: true, speed: 4 } },
    sprite: { kind: "sprite", values: { ...common, layout: "grid", columns: 4, rows: 3, cellWidth: 48, cellHeight: 48, padding: 4, prefix: "sprite-", imageUrl: "sprite.png", background: "transparent", retina: false } },
    "transform-3d": { kind: "transform-3d", values: { ...common, scaleX: 1, scaleY: 1, scaleZ: 1, rotateX: -18, rotateY: 32, rotateZ: 0, translateX: 0, translateY: 0, translateZ: 0, skewX: 0, skewY: 0, perspective: 700, originX: 50, originY: 50, preserve3d: true, backface: true } },
};

export const richControls: Record<RichGeneratorKind, RichControl[]> = {
    "cubic-bezier": [
        { key: "x1", title: "P1 X", type: "range", min: 0, max: 1, step: .01, section: "Curve" }, { key: "y1", title: "P1 Y", type: "range", min: -2, max: 3, step: .01, section: "Curve" },
        { key: "x2", title: "P2 X", type: "range", min: 0, max: 1, step: .01, section: "Curve" }, { key: "y2", title: "P2 Y", type: "range", min: -2, max: 3, step: .01, section: "Curve" },
        { key: "duration", title: "Duration", type: "range", min: .1, max: 5, step: .1, unit: "s", section: "Preview" }, { key: "mode", title: "Preview mode", type: "select", values: ["position", "width", "opacity", "scale"], section: "Preview" }, { key: "compare", title: "Compare with linear", type: "toggle", section: "Preview" },
    ],
    "flip-switch": [
        { key: "active", title: "Checked", type: "toggle", section: "State" }, { key: "labels", title: "Labels", type: "toggle", section: "State" }, { key: "labelOff", title: "Off label", type: "text", section: "State" }, { key: "labelOn", title: "On label", type: "text", section: "State" },
        { key: "width", title: "Track width", type: "range", min: 42, max: 140, unit: "px", section: "Track" }, { key: "height", title: "Track height", type: "range", min: 22, max: 72, unit: "px", section: "Track" }, { key: "radius", title: "Track radius", type: "range", min: 0, max: 40, unit: "px", section: "Track" }, { key: "borderWidth", title: "Border", type: "range", min: 0, max: 6, unit: "px", section: "Track" },
        { key: "thumbSize", title: "Thumb size", type: "range", min: 14, max: 62, unit: "px", section: "Thumb" }, { key: "offset", title: "Thumb offset", type: "range", min: 0, max: 12, unit: "px", section: "Thumb" }, { key: "speed", title: "Transition", type: "range", min: .05, max: 1, step: .05, unit: "s", section: "Thumb" },
        { key: "inactiveColor", title: "Inactive", type: "color", section: "Colors" }, { key: "activeColor", title: "Active", type: "color", section: "Colors" }, { key: "thumbColor", title: "Thumb", type: "color", section: "Colors" },
    ],
    glassmorphism: [
        { key: "backgroundSize", title: "Image fit", type: "select", values: ["cover", "contain", "auto"], section: "Background" }, { key: "backgroundPosition", title: "Image position", type: "select", values: ["center", "top", "bottom", "left", "right"], section: "Background" },
        { key: "blur", title: "Backdrop blur", type: "range", min: 0, max: 60, unit: "px", section: "Glass" }, { key: "opacity", title: "Fill opacity", type: "range", min: 0, max: 1, step: .01, section: "Glass" }, { key: "radius", title: "Radius", type: "range", min: 0, max: 48, unit: "px", section: "Glass" }, { key: "cardColor", title: "Card tint", type: "color", section: "Glass" }, { key: "noise", title: "Subtle texture", type: "toggle", section: "Glass" },
        { key: "border", title: "Border", type: "toggle", section: "Border" }, { key: "borderWidth", title: "Width", type: "range", min: 0, max: 5, unit: "px", section: "Border" }, { key: "borderOpacity", title: "Opacity", type: "range", min: 0, max: 1, step: .01, section: "Border" },
        { key: "shadow", title: "Shadow", type: "toggle", section: "Shadow" }, { key: "shadowBlur", title: "Blur", type: "range", min: 0, max: 100, unit: "px", section: "Shadow" }, { key: "shadowSpread", title: "Spread", type: "range", min: -40, max: 30, unit: "px", section: "Shadow" }, { key: "shadowOpacity", title: "Opacity", type: "range", min: 0, max: 1, step: .01, section: "Shadow" },
    ],
    triangle: [
        { key: "method", title: "Output method", type: "select", values: ["clip-path", "border", "svg", "pseudo"], section: "Shape" }, { key: "direction", title: "Direction", type: "select", values: ["top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left", "top-left"], section: "Shape" }, { key: "width", title: "Width", type: "range", min: 10, max: 320, unit: "px", section: "Shape" }, { key: "height", title: "Height", type: "range", min: 10, max: 260, unit: "px", section: "Shape" }, { key: "rotation", title: "Rotation", type: "range", min: -180, max: 180, unit: "deg", section: "Transform" }, { key: "skew", title: "Skew", type: "range", min: -60, max: 60, unit: "deg", section: "Transform" }, { key: "radius", title: "Corner softness", type: "range", min: 0, max: 32, unit: "px", section: "Transform" }, { key: "color", title: "Color", type: "color", section: "Color" },
    ],
    toast: [
        { key: "type", title: "Type", type: "select", values: ["success", "error", "warning", "info"], section: "Content" }, { key: "title", title: "Title", type: "text", section: "Content" }, { key: "message", title: "Message", type: "text", section: "Content" }, { key: "variant", title: "Variant", type: "select", values: ["soft", "solid", "outline", "glass"], section: "Appearance" }, { key: "position", title: "Position", type: "select", values: ["top-left", "top-center", "top-right", "bottom-left", "bottom-center", "bottom-right"], section: "Behavior" }, { key: "width", title: "Width", type: "range", min: 240, max: 520, unit: "px", section: "Appearance" }, { key: "padding", title: "Padding", type: "range", min: 8, max: 30, unit: "px", section: "Appearance" }, { key: "radius", title: "Radius", type: "range", min: 0, max: 32, unit: "px", section: "Appearance" }, { key: "duration", title: "Duration", type: "range", min: 1, max: 12, step: .5, unit: "s", section: "Behavior" }, { key: "icon", title: "Icon", type: "toggle", section: "Behavior" }, { key: "close", title: "Close button", type: "toggle", section: "Behavior" }, { key: "progress", title: "Progress", type: "toggle", section: "Behavior" },
    ],
    "text-shadow": [
        { key: "text", title: "Text", type: "text", section: "Typography" }, { key: "fontSize", title: "Size", type: "range", min: 18, max: 140, unit: "px", section: "Typography" }, { key: "fontWeight", title: "Weight", type: "range", min: 100, max: 900, step: 100, section: "Typography" }, { key: "textColor", title: "Text", type: "color", section: "Typography" }, { key: "canvas", title: "Canvas", type: "color", section: "Typography" },
        { key: "x", title: "Horizontal", type: "range", min: -40, max: 40, unit: "px", section: "Shadow layers" }, { key: "y", title: "Vertical", type: "range", min: -40, max: 40, unit: "px", section: "Shadow layers" }, { key: "blur", title: "Blur", type: "range", min: 0, max: 60, unit: "px", section: "Shadow layers" }, { key: "alpha", title: "Alpha", type: "range", min: 0, max: 1, step: .01, section: "Shadow layers" }, { key: "layers", title: "Layers", type: "range", min: 1, max: 10, section: "Shadow layers" }, { key: "layerGap", title: "Layer gap", type: "range", min: 0, max: 12, unit: "px", section: "Shadow layers" }, { key: "shadowColor", title: "Shadow", type: "color", section: "Shadow layers" },
    ],
    "text-input": [
        { key: "placeholder", title: "Placeholder", type: "text", section: "Content" }, { key: "inputType", title: "Input type", type: "select", values: ["text", "search", "email", "password", "url"], section: "Content" }, { key: "width", title: "Width", type: "range", min: 180, max: 640, unit: "px", section: "Size & shape" }, { key: "fontSize", title: "Font size", type: "range", min: 10, max: 28, unit: "px", section: "Size & shape" }, { key: "paddingX", title: "Padding X", type: "range", min: 4, max: 32, unit: "px", section: "Size & shape" }, { key: "paddingY", title: "Padding Y", type: "range", min: 4, max: 24, unit: "px", section: "Size & shape" }, { key: "radius", title: "Radius", type: "range", min: 0, max: 40, unit: "px", section: "Size & shape" },
        { key: "background", title: "Background", type: "color", section: "Colors" }, { key: "textColor", title: "Text", type: "color", section: "Colors" }, { key: "placeholderColor", title: "Placeholder", type: "color", section: "Colors" }, { key: "borderColor", title: "Border", type: "color", section: "Border & focus" }, { key: "focusColor", title: "Focus", type: "color", section: "Border & focus" }, { key: "borderWidth", title: "Border width", type: "range", min: 0, max: 6, unit: "px", section: "Border & focus" }, { key: "focusRing", title: "Focus ring", type: "range", min: 0, max: 8, unit: "px", section: "Border & focus" }, { key: "shadowBlur", title: "Shadow blur", type: "range", min: 0, max: 50, unit: "px", section: "Border & focus" }, { key: "bottomOnly", title: "Bottom only", type: "toggle", section: "Extras" }, { key: "icon", title: "Search icon", type: "toggle", section: "Extras" }, { key: "fullWidth", title: "Full width", type: "toggle", section: "Extras" },
    ],
    "text-gradient": [
        { key: "text", title: "Preview text", type: "text", section: "Typography" }, { key: "fontSize", title: "Size", type: "range", min: 18, max: 140, unit: "px", section: "Typography" }, { key: "fontWeight", title: "Weight", type: "range", min: 100, max: 900, step: 100, section: "Typography" }, { key: "angle", title: "Orientation", type: "range", min: 0, max: 360, unit: "deg", section: "Gradient" }, { key: "startPosition", title: "Start", type: "range", min: 0, max: 100, unit: "%", section: "Gradient" }, { key: "stopPosition", title: "Stop", type: "range", min: 0, max: 100, unit: "%", section: "Gradient" }, { key: "endPosition", title: "End", type: "range", min: 0, max: 100, unit: "%", section: "Gradient" }, { key: "startColor", title: "Start color", type: "color", section: "Colors" }, { key: "stopColor", title: "Stop color", type: "color", section: "Colors" }, { key: "endColor", title: "End color", type: "color", section: "Colors" }, { key: "repeat", title: "Repeat", type: "toggle", section: "Motion" }, { key: "animated", title: "Animated", type: "toggle", section: "Motion" }, { key: "speed", title: "Speed", type: "range", min: 1, max: 15, unit: "s", section: "Motion" },
    ],
    sprite: [
        { key: "imageUrl", title: "Sprite image URL", type: "text", section: "Source" }, { key: "prefix", title: "Class prefix", type: "text", section: "Source" }, { key: "layout", title: "Layout", type: "select", values: ["grid", "horizontal", "vertical"], section: "Layout" }, { key: "columns", title: "Columns", type: "range", min: 1, max: 12, section: "Layout" }, { key: "rows", title: "Rows", type: "range", min: 1, max: 12, section: "Layout" }, { key: "cellWidth", title: "Cell width", type: "range", min: 12, max: 160, unit: "px", section: "Layout" }, { key: "cellHeight", title: "Cell height", type: "range", min: 12, max: 160, unit: "px", section: "Layout" }, { key: "padding", title: "Padding", type: "range", min: 0, max: 24, unit: "px", section: "Layout" }, { key: "background", title: "Background", type: "text", section: "Export" }, { key: "retina", title: "Retina @2x", type: "toggle", section: "Export" },
    ],
    "transform-3d": [
        { key: "scaleX", title: "Scale X", type: "range", min: .2, max: 2.5, step: .05, section: "Scale" }, { key: "scaleY", title: "Scale Y", type: "range", min: .2, max: 2.5, step: .05, section: "Scale" }, { key: "scaleZ", title: "Scale Z", type: "range", min: .2, max: 2.5, step: .05, section: "Scale" }, { key: "rotateX", title: "Rotate X", type: "range", min: -180, max: 180, unit: "deg", section: "Rotate" }, { key: "rotateY", title: "Rotate Y", type: "range", min: -180, max: 180, unit: "deg", section: "Rotate" }, { key: "rotateZ", title: "Rotate Z", type: "range", min: -180, max: 180, unit: "deg", section: "Rotate" }, { key: "translateX", title: "Translate X", type: "range", min: -160, max: 160, unit: "px", section: "Translate" }, { key: "translateY", title: "Translate Y", type: "range", min: -160, max: 160, unit: "px", section: "Translate" }, { key: "translateZ", title: "Translate Z", type: "range", min: -240, max: 240, unit: "px", section: "Translate" }, { key: "skewX", title: "Skew X", type: "range", min: -60, max: 60, unit: "deg", section: "Skew & scene" }, { key: "skewY", title: "Skew Y", type: "range", min: -60, max: 60, unit: "deg", section: "Skew & scene" }, { key: "perspective", title: "Perspective", type: "range", min: 200, max: 2000, unit: "px", section: "Skew & scene" }, { key: "originX", title: "Origin X", type: "range", min: 0, max: 100, unit: "%", section: "Skew & scene" }, { key: "originY", title: "Origin Y", type: "range", min: 0, max: 100, unit: "%", section: "Skew & scene" }, { key: "preserve3d", title: "Preserve 3D", type: "toggle", section: "Rendering" }, { key: "backface", title: "Backface visible", type: "toggle", section: "Rendering" },
    ],
};

const palettes = [
    ["#8b5cf6", "#22d3ee", "#f472b6"], ["#10b981", "#a7f3d0", "#fbbf24"], ["#f97316", "#fb7185", "#fde047"], ["#3b82f6", "#818cf8", "#06b6d4"],
    ["#e11d48", "#f43f5e", "#fda4af"], ["#f8fafc", "#94a3b8", "#334155"], ["#84cc16", "#14b8a6", "#0ea5e9"], ["#d946ef", "#8b5cf6", "#6366f1"],
] as const;

export const createRichPresets = (kind: RichGeneratorKind) => {
    const switchNames = [
        "compact-pill", "compact-square", "ios-light", "ios-dark",
        "android-mint", "android-ocean", "neon-violet", "neon-cyan",
        "labeled-wide", "labeled-compact", "bordered-clean", "bordered-bold",
        "soft-lavender", "soft-rose", "mono-light", "mono-dark",
        "inset-blue", "inset-lime", "glass-violet", "glass-sky",
        "candy-pink", "candy-orange", "terminal-green", "danger-red",
        "slate-small", "slate-wide", "high-contrast", "warm-sun",
        "cold-ice", "rounded-labels", "square-labels", "minimal-dot",
    ];
    const names = kind === "flip-switch"
        ? switchNames
        : Array.from({ length: 32 }, (_, index) => `${["minimal", "soft", "bold", "glass", "neon", "mono", "warm", "ocean"][index % 8]}-${Math.floor(index / 8) + 1}`);
    const configs = Object.fromEntries(names.map((name, index) => {
        const base = defaultRichConfigs[kind];
        const colors = palettes[index % palettes.length];
        const v = { ...base.values, accent: colors[0], accent2: colors[1] };
        const intensity = Math.floor(index / 8);
        if (kind === "cubic-bezier") Object.assign(v, [{ x1: .25, y1: .1, x2: .25, y2: 1 }, { x1: .68, y1: -.55, x2: .27, y2: 1.55 }, { x1: .17, y1: .89, x2: .32, y2: 1.28 }, { x1: .87, y1: 0, x2: .13, y2: 1 }][index % 4]);
        if (kind === "flip-switch") {
            const height = [24, 28, 32, 36, 40, 44][index % 6];
            const offset = 2 + (index % 3);
            const labels = index % 7 === 1 || index % 7 === 4 || index >= 29;
            const width = labels
                ? Math.max(76, height * 2.35 + (index % 3) * 8)
                : Math.max(44, height * 1.8 + (index % 4) * 4);
            Object.assign(v, {
                width,
                height,
                offset,
                thumbSize: height - offset * 2,
                radius: index % 5 === 1 ? 5 + (index % 3) * 2 : height / 2,
                borderWidth: index % 6 === 2 ? 2 : index % 9 === 0 ? 1 : 0,
                active: index % 4 !== 1,
                labels,
                inactiveColor: index % 4 === 0 ? "#252530" : colors[2],
                activeColor: colors[0],
                thumbColor: index % 5 === 3 ? colors[1] : index % 6 === 5 ? "#111118" : "#ffffff",
                labelOff: index % 2 ? "NO" : "OFF",
                labelOn: index % 2 ? "YES" : "ON",
                speed: .16 + (index % 5) * .06,
            });
        }
        if (kind === "glassmorphism") Object.assign(v, { blur: 8 + (index % 8) * 5, opacity: .08 + intensity * .08, radius: 6 + (index % 6) * 6, cardColor: colors[index % 3], borderOpacity: .15 + (index % 5) * .12, shadowBlur: 18 + intensity * 18 });
        if (kind === "triangle") Object.assign(v, { direction: ["top", "right", "bottom", "left", "top-right", "bottom-right", "bottom-left", "top-left"][index % 8], method: ["clip-path", "border", "svg", "pseudo"][intensity], width: 80 + (index % 5) * 22, height: 70 + intensity * 18, rotation: intensity * 9, skew: (index % 3 - 1) * 12, color: colors[0] });
        if (kind === "toast") Object.assign(v, { type: ["success", "error", "warning", "info"][index % 4], variant: ["soft", "solid", "outline", "glass"][intensity], position: ["top-left", "top-center", "top-right", "bottom-left", "bottom-center", "bottom-right"][index % 6], radius: 4 + (index % 6) * 5, accent: colors[0] });
        if (kind === "text-shadow") Object.assign(v, { x: (index % 5 - 2) * 4, y: (index % 4) * 3, blur: (index % 7) * 5, layers: 1 + (index % 8), layerGap: 1 + intensity * 2, textColor: colors[2], shadowColor: colors[0], canvas: index % 2 ? "#0b0b12" : "#f3f4f6" });
        if (kind === "text-input") Object.assign(v, { radius: [0, 6, 14, 99][intensity], background: index % 2 ? "#111827" : "#f8fafc", textColor: index % 2 ? "#f8fafc" : "#111827", borderColor: colors[1], focusColor: colors[0], bottomOnly: index % 8 === 4, icon: index % 3 !== 0, shadowBlur: intensity * 8 });
        if (kind === "text-gradient") Object.assign(v, { angle: (index * 37) % 360, startColor: colors[0], stopColor: colors[1], endColor: colors[2], stopPosition: 25 + (index % 6) * 10, animated: index % 3 !== 0, repeat: intensity === 3 });
        if (kind === "sprite") Object.assign(v, { layout: ["grid", "horizontal", "vertical"][index % 3], columns: 2 + index % 7, rows: 2 + intensity, cellWidth: 24 + (index % 6) * 8, cellHeight: 24 + (index % 5) * 10, padding: index % 9, retina: index % 2 === 0, accent: colors[0], accent2: colors[1] });
        if (kind === "transform-3d") Object.assign(v, { rotateX: -50 + (index * 23) % 100, rotateY: -70 + (index * 37) % 140, rotateZ: (index % 5 - 2) * 12, scaleX: .75 + intensity * .12, scaleY: .75 + (index % 4) * .12, translateZ: (index % 5 - 2) * 24, perspective: 400 + (index % 8) * 150, accent: colors[0], accent2: colors[1] });
        return [name, { kind, values: v } as RichConfig];
    })) as Record<string, RichConfig>;
    return { names, configs };
};
