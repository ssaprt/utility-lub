"use client";
"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  Tooltip: () => Tooltip,
  TooltipProvider: () => TooltipProvider
});
module.exports = __toCommonJS(index_exports);

// src/components/Tooltip.tsx
var import_react4 = require("react");
var import_react_dom = require("react-dom");

// src/config/presets.ts
var animations = {
  soft: {
    show: "fade",
    hide: "fade",
    speed: "160ms",
    easing: "ease-in-out"
  },
  slide: {
    show: "slide",
    hide: "fade",
    speed: "160ms",
    easing: "ease-out"
  },
  pop: {
    show: "scale",
    hide: "scale",
    speed: "170ms",
    easing: "cubic-bezier(0.22, 1, 0.36, 1)"
  },
  bounce: {
    show: "bounce",
    hide: "scale",
    speed: "240ms",
    easing: "cubic-bezier(0.34, 1.56, 0.64, 1)"
  },
  flip: {
    show: "flip",
    hide: "fade",
    speed: "210ms",
    easing: "cubic-bezier(0.22, 1, 0.36, 1)"
  },
  blur: {
    show: "blur",
    hide: "blur",
    speed: "200ms",
    easing: "ease-out"
  },
  zoom: {
    show: "zoom",
    hide: "zoom",
    speed: "170ms",
    easing: "ease-out"
  },
  snap: {
    show: "zoom",
    hide: "fade",
    speed: "110ms",
    easing: "steps(4, end)"
  },
  instant: {
    show: "none",
    hide: "none",
    speed: "1ms",
    easing: "linear"
  }
};
var createTheme = ({
  background,
  color,
  fontFamily = "Inter, Arial, sans-serif",
  fontSize = "12px",
  fontWeight = 500,
  fontStyle,
  lineHeight = 1.4,
  borderRadius = "7px",
  border,
  filter,
  padding = "7px 12px",
  letterSpacing,
  textShadow,
  textTransform,
  textAlign = "center",
  backdropFilter,
  arrowSize = "7px",
  arrowWidth = "14px",
  animation = animations.slide,
  style
}) => {
  return {
    body: {
      background,
      filter,
      style: {
        color,
        fontFamily,
        fontSize,
        fontWeight,
        fontStyle,
        lineHeight,
        borderRadius,
        border,
        padding,
        letterSpacing,
        textShadow,
        textTransform,
        textAlign,
        backdropFilter,
        WebkitBackdropFilter: backdropFilter,
        ...style
      }
    },
    arrow: {
      size: arrowSize,
      width: arrowWidth
    },
    animation
  };
};
var presets = {
  primary: createTheme({
    background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
    color: "#ffffff",
    filter: "drop-shadow(0 7px 12px rgba(37, 99, 235, 0.38))",
    border: "1px solid rgba(255, 255, 255, 0.18)",
    borderRadius: "8px"
  }),
  secondary: createTheme({
    background: "linear-gradient(135deg, #64748b, #475569)",
    color: "#ffffff",
    filter: "drop-shadow(0 7px 12px rgba(15, 23, 42, 0.3))",
    border: "1px solid rgba(255, 255, 255, 0.15)",
    animation: animations.soft
  }),
  dark: createTheme({
    background: "linear-gradient(145deg, #18181b, #09090b)",
    color: "#fafafa",
    border: "1px solid #3f3f46",
    borderRadius: "10px",
    filter: "drop-shadow(0 11px 18px rgba(0, 0, 0, 0.56))",
    animation: animations.pop
  }),
  light: createTheme({
    background: "linear-gradient(145deg, #ffffff, #f4f4f5)",
    color: "#18181b",
    border: "1px solid #d4d4d8",
    borderRadius: "10px",
    filter: "drop-shadow(0 9px 15px rgba(15, 23, 42, 0.18))",
    animation: animations.soft
  }),
  comic: createTheme({
    background: "#fde047",
    color: "#18181b",
    fontFamily: "Comic Sans MS, Comic Sans, cursive",
    fontSize: "13px",
    fontWeight: 700,
    border: "3px solid #18181b",
    borderRadius: "12px",
    filter: "drop-shadow(5px 5px 0 #18181b)",
    padding: "8px 14px",
    textTransform: "uppercase",
    arrowSize: "9px",
    arrowWidth: "20px",
    animation: animations.bounce
  }),
  manga: createTheme({
    background: "linear-gradient(145deg, #ffffff, #f4f4f5)",
    color: "#000000",
    fontFamily: "Impact, Haettenschweiler, Arial Narrow Bold, sans-serif",
    fontSize: "13px",
    fontWeight: 900,
    border: "3px solid #000000",
    borderRadius: "10px 3px 10px 3px",
    padding: "9px 15px",
    letterSpacing: "0.04em",
    textTransform: "uppercase",
    arrowSize: "10px",
    arrowWidth: "17px",
    animation: animations.pop
  }),
  newspaper: createTheme({
    background: "repeating-linear-gradient(0deg, rgba(68, 64, 60, 0.035) 0, rgba(68, 64, 60, 0.035) 1px, transparent 1px, transparent 4px), #f5f0e6",
    color: "#292524",
    fontFamily: "Times New Roman, Times, serif",
    fontSize: "13px",
    fontWeight: 600,
    border: "2px solid #44403c",
    borderRadius: "1px",
    filter: "drop-shadow(3px 4px 0 rgba(68, 64, 60, 0.28))",
    padding: "9px 15px",
    letterSpacing: "0.02em",
    textAlign: "left",
    arrowSize: "8px",
    arrowWidth: "18px",
    animation: animations.soft,
    style: {
      fontVariantCaps: "small-caps"
    }
  }),
  stickyNote: createTheme({
    background: "linear-gradient(145deg, #fff7a8 0%, #fde96b 70%, #e9cc42 100%)",
    color: "#4a3c00",
    fontFamily: "Comic Sans MS, cursive",
    fontSize: "13px",
    fontWeight: 600,
    border: "1px solid #d6b936",
    borderRadius: "3px 14px 5px 11px",
    filter: "drop-shadow(3px 6px 5px rgba(78, 65, 0, 0.28))",
    padding: "10px 15px",
    textAlign: "left",
    arrowSize: "8px",
    arrowWidth: "19px",
    animation: animations.pop
  }),
  blueprint: createTheme({
    background: "linear-gradient(rgba(147, 197, 253, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(147, 197, 253, 0.15) 1px, transparent 1px), #0c4a6e",
    color: "#e0f2fe",
    fontFamily: "Courier New, Consolas, monospace",
    fontSize: "12px",
    fontWeight: 600,
    border: "2px dashed #7dd3fc",
    borderRadius: "2px",
    filter: "drop-shadow(0 0 7px rgba(56, 189, 248, 0.45))",
    padding: "9px 13px",
    letterSpacing: "0.05em",
    textAlign: "left",
    arrowSize: "8px",
    arrowWidth: "16px",
    animation: animations.flip,
    style: {
      backgroundSize: "12px 12px"
    }
  }),
  terminal: createTheme({
    background: "#020a04",
    color: "#4ade80",
    fontFamily: "Consolas, Monaco, Courier New, monospace",
    fontSize: "12px",
    fontWeight: 600,
    border: "1px solid #22c55e",
    borderRadius: "3px",
    padding: "8px 12px",
    letterSpacing: "0.035em",
    textAlign: "left",
    arrowSize: "7px",
    arrowWidth: "13px",
    animation: animations.soft
  }),
  crt: createTheme({
    background: "linear-gradient(180deg, #07150b, #020804)",
    color: "#86efac",
    fontFamily: "Lucida Console, Monaco, monospace",
    fontSize: "12px",
    fontWeight: 600,
    border: "2px solid #166534",
    borderRadius: "12px",
    padding: "10px 15px",
    arrowSize: "8px",
    arrowWidth: "18px",
    animation: animations.soft
  }),
  pixel: createTheme({
    background: "linear-gradient(135deg, #4c1d95, #581c87)",
    color: "#fef08a",
    fontFamily: "Courier New, monospace",
    fontSize: "10px",
    fontWeight: 700,
    lineHeight: 1.7,
    border: "4px solid #fef08a",
    borderRadius: "0px",
    padding: "10px 14px",
    letterSpacing: "0.03em",
    textTransform: "uppercase",
    arrowSize: "10px",
    arrowWidth: "18px",
    animation: animations.pop
  }),
  arcade: createTheme({
    background: "radial-gradient(circle at 20% 0%, rgba(34, 211, 238, 0.45), transparent 38%), radial-gradient(circle at 90% 100%, rgba(236, 72, 153, 0.55), transparent 45%), #150629",
    color: "#ffffff",
    fontFamily: "Arial Black, Impact, sans-serif",
    fontSize: "12px",
    fontWeight: 900,
    border: "2px solid #22d3ee",
    borderRadius: "12px",
    filter: "drop-shadow(3px 3px 0 #ec4899) drop-shadow(-3px -3px 0 #22d3ee)",
    padding: "9px 15px",
    letterSpacing: "0.07em",
    textShadow: "0 0 6px #22d3ee",
    textTransform: "uppercase",
    arrowSize: "9px",
    arrowWidth: "18px",
    animation: animations.bounce
  }),
  cyberpunk: createTheme({
    background: "repeating-linear-gradient(135deg, rgba(0, 0, 0, 0.12) 0, rgba(0, 0, 0, 0.12) 5px, transparent 5px, transparent 10px), linear-gradient(135deg, #fde047, #facc15)",
    color: "#18181b",
    fontFamily: "Impact, Arial Black, sans-serif",
    fontSize: "12px",
    fontWeight: 900,
    border: "2px solid #22d3ee",
    borderRadius: "1px 12px 1px 12px",
    filter: "drop-shadow(5px 5px 0 #ec4899) drop-shadow(-2px -2px 0 #22d3ee)",
    padding: "9px 15px",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    arrowSize: "10px",
    arrowWidth: "21px",
    animation: animations.flip
  }),
  synthwave: createTheme({
    background: "linear-gradient(180deg, rgba(15, 23, 42, 0.2), rgba(15, 23, 42, 0.75)), linear-gradient(135deg, #7c3aed, #db2777)",
    color: "#fdf4ff",
    fontFamily: "Trebuchet MS, Arial, sans-serif",
    fontSize: "12px",
    fontWeight: 700,
    border: "2px solid #67e8f9",
    borderRadius: "16px 3px 16px 3px",
    filter: "drop-shadow(0 0 7px #ec4899) drop-shadow(0 0 14px rgba(103, 232, 249, 0.5))",
    padding: "9px 15px",
    letterSpacing: "0.07em",
    textShadow: "0 0 6px rgba(255, 255, 255, 0.7)",
    textTransform: "uppercase",
    arrowSize: "9px",
    arrowWidth: "20px",
    animation: animations.zoom
  }),
  vaporwave: createTheme({
    background: "linear-gradient(135deg, rgba(255, 255, 255, 0.2), transparent 50%), linear-gradient(135deg, #67e8f9, #f0abfc 52%, #f9a8d4)",
    color: "#4c1d95",
    fontFamily: "Arial Rounded MT Bold, Arial, sans-serif",
    fontSize: "12px",
    fontWeight: 700,
    border: "2px solid #ffffff",
    borderRadius: "18px",
    filter: "drop-shadow(5px 6px 0 rgba(124, 58, 237, 0.42))",
    padding: "9px 16px",
    letterSpacing: "0.06em",
    textShadow: "1px 1px 0 rgba(255, 255, 255, 0.8)",
    textTransform: "uppercase",
    arrowSize: "9px",
    arrowWidth: "21px",
    animation: animations.bounce
  }),
  hologram: createTheme({
    background: "linear-gradient(115deg, rgba(34, 211, 238, 0.42), rgba(168, 85, 247, 0.35), rgba(236, 72, 153, 0.35), rgba(34, 211, 238, 0.42)), linear-gradient(135deg, #082f49, #312e81)",
    color: "#ecfeff",
    fontFamily: "Segoe UI, Arial, sans-serif",
    fontSize: "12px",
    fontWeight: 600,
    border: "1px solid rgba(165, 243, 252, 0.75)",
    borderRadius: "14px",
    filter: "drop-shadow(0 0 7px rgba(34, 211, 238, 0.75)) drop-shadow(0 0 16px rgba(168, 85, 247, 0.4))",
    padding: "9px 15px",
    letterSpacing: "0.06em",
    arrowSize: "8px",
    arrowWidth: "18px",
    animation: animations.blur
  }),
  glass: createTheme({
    background: "linear-gradient(135deg, rgba(255, 255, 255, 0.22), rgba(255, 255, 255, 0.07)), linear-gradient(135deg, #1e293b, #0f172a)",
    color: "#f8fafc",
    border: "1px solid rgba(255, 255, 255, 0.34)",
    borderRadius: "16px",
    filter: "drop-shadow(0 12px 20px rgba(15, 23, 42, 0.38))",
    padding: "9px 15px",
    arrowSize: "8px",
    arrowWidth: "18px",
    animation: animations.blur
  }),
  frost: createTheme({
    background: "radial-gradient(circle at 15% 20%, rgba(255, 255, 255, 0.85), transparent 35%), linear-gradient(135deg, #e0f2fe, #bae6fd)",
    color: "#075985",
    fontWeight: 600,
    border: "1px solid rgba(125, 211, 252, 0.9)",
    borderRadius: "18px",
    filter: "drop-shadow(0 8px 15px rgba(14, 116, 144, 0.24))",
    padding: "9px 15px",
    textShadow: "0 1px 0 rgba(255, 255, 255, 0.8)",
    arrowSize: "8px",
    arrowWidth: "19px",
    animation: animations.blur
  }),
  clay: createTheme({
    background: "linear-gradient(145deg, #f3d5bc, #d9a77d)",
    color: "#5b2d16",
    fontFamily: "Arial Rounded MT Bold, Arial, sans-serif",
    fontSize: "12px",
    fontWeight: 700,
    border: "1px solid #c78f63",
    borderRadius: "24px",
    filter: "drop-shadow(7px 9px 10px rgba(91, 45, 22, 0.28)) drop-shadow(-3px -3px 5px rgba(255, 242, 229, 0.72))",
    padding: "10px 17px",
    arrowSize: "9px",
    arrowWidth: "22px",
    animation: animations.pop
  }),
  bubblegum: createTheme({
    background: "radial-gradient(circle at 25% 15%, rgba(255, 255, 255, 0.55), transparent 28%), linear-gradient(135deg, #f9a8d4, #f472b6)",
    color: "#831843",
    fontFamily: "Arial Rounded MT Bold, Arial, sans-serif",
    fontSize: "12px",
    fontWeight: 700,
    border: "2px solid #fdf2f8",
    borderRadius: "999px",
    filter: "drop-shadow(0 8px 12px rgba(219, 39, 119, 0.34))",
    padding: "9px 18px",
    textShadow: "0 1px 0 rgba(255, 255, 255, 0.8)",
    arrowSize: "9px",
    arrowWidth: "22px",
    animation: animations.bounce
  }),
  candy: createTheme({
    background: "repeating-linear-gradient(135deg, #ffffff 0, #ffffff 8px, #ef4444 8px, #ef4444 16px)",
    color: "#991b1b",
    fontFamily: "Arial Rounded MT Bold, Arial, sans-serif",
    fontSize: "12px",
    fontWeight: 900,
    border: "3px solid #991b1b",
    borderRadius: "16px",
    filter: "drop-shadow(4px 5px 0 rgba(127, 29, 29, 0.5))",
    padding: "9px 16px",
    textShadow: "1px 1px 0 #ffffff, -1px -1px 0 #ffffff",
    textTransform: "uppercase",
    arrowSize: "10px",
    arrowWidth: "22px",
    animation: animations.bounce
  }),
  watermelon: createTheme({
    background: "radial-gradient(ellipse at 22% 30%, #111827 0 2px, transparent 3px), radial-gradient(ellipse at 72% 68%, #111827 0 2px, transparent 3px), linear-gradient(180deg, #fb7185 0%, #f43f5e 72%, #f8fafc 72%, #f8fafc 82%, #22c55e 82%)",
    color: "#4c0519",
    fontFamily: "Trebuchet MS, sans-serif",
    fontSize: "12px",
    fontWeight: 800,
    border: "2px solid #166534",
    borderRadius: "20px 20px 8px 8px",
    filter: "drop-shadow(0 8px 11px rgba(22, 101, 52, 0.32))",
    padding: "9px 16px 12px",
    arrowSize: "9px",
    arrowWidth: "22px",
    animation: animations.pop
  }),
  lemon: createTheme({
    background: "radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.65), transparent 22%), linear-gradient(135deg, #fef08a, #facc15)",
    color: "#713f12",
    fontFamily: "Arial Rounded MT Bold, Arial, sans-serif",
    fontSize: "12px",
    fontWeight: 800,
    border: "2px dotted #a16207",
    borderRadius: "999px",
    filter: "drop-shadow(0 7px 10px rgba(202, 138, 4, 0.32))",
    padding: "8px 17px",
    arrowSize: "9px",
    arrowWidth: "22px",
    animation: animations.bounce
  }),
  lava: createTheme({
    background: "radial-gradient(circle at 18% 20%, #facc15 0, #f97316 8%, transparent 22%), radial-gradient(circle at 78% 70%, #ef4444 0, #7f1d1d 18%, transparent 34%), linear-gradient(135deg, #450a0a, #09090b)",
    color: "#fef3c7",
    fontFamily: "Impact, Arial Black, sans-serif",
    fontSize: "12px",
    fontWeight: 800,
    border: "2px solid #f97316",
    borderRadius: "14px 4px 18px 6px",
    filter: "drop-shadow(0 0 7px rgba(249, 115, 22, 0.8)) drop-shadow(0 8px 15px rgba(69, 10, 10, 0.6))",
    padding: "9px 15px",
    letterSpacing: "0.04em",
    textShadow: "0 0 5px rgba(253, 186, 116, 0.8)",
    textTransform: "uppercase",
    arrowSize: "10px",
    arrowWidth: "19px",
    animation: animations.zoom
  }),
  ember: createTheme({
    background: "radial-gradient(circle at 15% 40%, rgba(251, 146, 60, 0.72), transparent 22%), radial-gradient(circle at 75% 20%, rgba(239, 68, 68, 0.48), transparent 25%), #291208",
    color: "#fed7aa",
    fontFamily: "Georgia, serif",
    fontSize: "13px",
    fontWeight: 600,
    border: "1px solid #c2410c",
    borderRadius: "8px 18px 8px 18px",
    filter: "drop-shadow(0 0 7px rgba(234, 88, 12, 0.5))",
    padding: "9px 15px",
    textShadow: "0 0 4px rgba(251, 146, 60, 0.7)",
    arrowSize: "9px",
    arrowWidth: "18px",
    animation: animations.blur
  }),
  toxic: createTheme({
    background: "linear-gradient(135deg, #bef264, #84cc16)",
    color: "#1a2e05",
    fontFamily: "Arial Black, Impact, sans-serif",
    fontSize: "12px",
    fontWeight: 900,
    border: "3px solid #1a2e05",
    borderRadius: "3px 10px 3px 10px",
    padding: "9px 14px",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    arrowSize: "10px",
    arrowWidth: "20px",
    animation: animations.pop
  }),
  radioactive: createTheme({
    background: "conic-gradient(from 45deg at 50% 50%, #facc15 0 12.5%, #18181b 12.5% 25%, #facc15 25% 37.5%, #18181b 37.5% 50%, #facc15 50% 62.5%, #18181b 62.5% 75%, #facc15 75% 87.5%, #18181b 87.5%)",
    color: "#ffffff",
    fontFamily: "Arial Black, sans-serif",
    fontSize: "12px",
    fontWeight: 900,
    border: "3px solid #000000",
    borderRadius: "50%",
    filter: "drop-shadow(0 0 8px rgba(250, 204, 21, 0.7))",
    padding: "13px 18px",
    letterSpacing: "0.05em",
    textShadow: "2px 2px 0 #000000, -1px -1px 0 #000000",
    textTransform: "uppercase",
    arrowSize: "11px",
    arrowWidth: "21px",
    animation: animations.zoom
  }),
  hazard: createTheme({
    background: "linear-gradient(135deg, #fb923c, #ea580c)",
    color: "#ffffff",
    fontFamily: "Arial Black, Impact, sans-serif",
    fontSize: "12px",
    fontWeight: 900,
    border: "3px solid #18181b",
    borderRadius: "4px",
    padding: "9px 15px",
    textTransform: "uppercase",
    arrowSize: "10px",
    arrowWidth: "20px",
    animation: animations.pop
  }),
  policeTape: createTheme({
    background: "repeating-linear-gradient(135deg, #f8fafc 0, #f8fafc 11px, #2563eb 11px, #2563eb 22px)",
    color: "#172554",
    fontFamily: "Arial Narrow, Arial, sans-serif",
    fontSize: "12px",
    fontWeight: 900,
    border: "3px solid #1e3a8a",
    borderRadius: "1px",
    filter: "drop-shadow(4px 5px 0 rgba(30, 58, 138, 0.42))",
    padding: "8px 15px",
    letterSpacing: "0.1em",
    textShadow: "1px 1px 0 #ffffff, -1px -1px 0 #ffffff",
    textTransform: "uppercase",
    arrowSize: "9px",
    arrowWidth: "20px",
    animation: animations.slide
  }),
  construction: createTheme({
    background: "repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.045) 0, rgba(255, 255, 255, 0.045) 1px, transparent 1px, transparent 7px), linear-gradient(135deg, #52525b, #27272a)",
    color: "#fed7aa",
    fontFamily: "DIN Condensed, Arial Narrow, sans-serif",
    fontSize: "12px",
    fontWeight: 800,
    border: "3px dashed #f97316",
    borderRadius: "3px",
    filter: "drop-shadow(5px 6px 0 rgba(24, 24, 27, 0.52))",
    padding: "9px 15px",
    letterSpacing: "0.07em",
    textTransform: "uppercase",
    arrowSize: "10px",
    arrowWidth: "20px",
    animation: animations.flip
  }),
  parchment: createTheme({
    background: "radial-gradient(circle at 12% 20%, rgba(120, 83, 36, 0.12), transparent 20%), radial-gradient(circle at 82% 70%, rgba(120, 83, 36, 0.16), transparent 25%), linear-gradient(135deg, #f5deb3, #e7c78e)",
    color: "#5b3716",
    fontFamily: "Garamond, Georgia, serif",
    fontSize: "14px",
    fontWeight: 600,
    border: "2px solid #9a6b32",
    borderRadius: "14px 3px 12px 5px",
    filter: "drop-shadow(4px 6px 5px rgba(91, 55, 22, 0.3))",
    padding: "10px 16px",
    textAlign: "left",
    arrowSize: "9px",
    arrowWidth: "20px",
    animation: animations.soft
  }),
  pirateMap: createTheme({
    background: "radial-gradient(circle at 75% 25%, transparent 0 6px, rgba(127, 29, 29, 0.55) 7px 8px, transparent 9px), repeating-radial-gradient(circle at 15% 85%, rgba(120, 83, 36, 0.08) 0 2px, transparent 2px 9px), #e7c78e",
    color: "#422006",
    fontFamily: "Papyrus, Harrington, Georgia, serif",
    fontSize: "13px",
    fontWeight: 700,
    border: "2px dashed #78350f",
    borderRadius: "5px 17px 7px 12px",
    filter: "drop-shadow(4px 7px 5px rgba(66, 32, 6, 0.36))",
    padding: "10px 16px",
    letterSpacing: "0.025em",
    textAlign: "left",
    arrowSize: "10px",
    arrowWidth: "19px",
    animation: animations.flip
  }),
  royal: createTheme({
    background: "radial-gradient(circle at 50% -20%, rgba(250, 204, 21, 0.5), transparent 46%), linear-gradient(135deg, #581c87, #2e1065)",
    color: "#fef3c7",
    fontFamily: "Palatino Linotype, Book Antiqua, serif",
    fontSize: "13px",
    fontWeight: 700,
    border: "2px solid #facc15",
    borderRadius: "6px 20px 6px 20px",
    filter: "drop-shadow(0 8px 14px rgba(46, 16, 101, 0.55)) drop-shadow(0 0 5px rgba(250, 204, 21, 0.4))",
    padding: "10px 17px",
    letterSpacing: "0.05em",
    textShadow: "0 1px 2px rgba(0, 0, 0, 0.7)",
    arrowSize: "10px",
    arrowWidth: "21px",
    animation: animations.flip,
    style: {
      fontVariantCaps: "small-caps"
    }
  }),
  noir: createTheme({
    background: "linear-gradient(115deg, #000000 0%, #27272a 48%, #09090b 52%, #000000 100%)",
    color: "#ffffff",
    fontFamily: "Helvetica Neue, Arial, sans-serif",
    fontSize: "12px",
    fontWeight: 700,
    border: "1px solid #a1a1aa",
    borderRadius: "0px",
    filter: "drop-shadow(7px 9px 0 rgba(0, 0, 0, 0.6))",
    padding: "9px 15px",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    arrowSize: "9px",
    arrowWidth: "16px",
    animation: animations.soft
  }),
  detective: createTheme({
    background: "repeating-linear-gradient(0deg, rgba(68, 64, 60, 0.05) 0, rgba(68, 64, 60, 0.05) 1px, transparent 1px, transparent 5px), #d6c29f",
    color: "#292524",
    fontFamily: "Courier New, monospace",
    fontSize: "12px",
    fontWeight: 700,
    border: "2px solid #57534e",
    borderRadius: "2px",
    filter: "drop-shadow(5px 7px 0 rgba(68, 64, 60, 0.34))",
    padding: "10px 15px",
    letterSpacing: "0.04em",
    textAlign: "left",
    arrowSize: "8px",
    arrowWidth: "17px",
    animation: animations.slide
  }),
  dossier: createTheme({
    background: "linear-gradient(180deg, #f2e5c8, #dfc99f)",
    color: "#3f2d1d",
    fontFamily: "Courier New, monospace",
    fontSize: "11px",
    fontWeight: 800,
    border: "2px solid #92400e",
    borderRadius: "2px 7px 2px 7px",
    padding: "11px 16px",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    textAlign: "left",
    arrowSize: "8px",
    arrowWidth: "17px",
    animation: animations.soft
  }),
  medical: createTheme({
    background: "linear-gradient(90deg, transparent 44%, rgba(14, 165, 233, 0.08) 44% 56%, transparent 56%), linear-gradient(0deg, transparent 44%, rgba(14, 165, 233, 0.08) 44% 56%, transparent 56%), #f8fafc",
    color: "#075985",
    fontFamily: "Arial, Helvetica, sans-serif",
    fontSize: "12px",
    fontWeight: 700,
    border: "2px solid #38bdf8",
    borderRadius: "10px",
    filter: "drop-shadow(0 8px 12px rgba(14, 165, 233, 0.2))",
    padding: "9px 15px",
    arrowSize: "8px",
    arrowWidth: "18px",
    animation: animations.soft
  }),
  laboratory: createTheme({
    background: "linear-gradient(rgba(34, 211, 238, 0.09) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 211, 238, 0.09) 1px, transparent 1px), linear-gradient(135deg, #082f49, #0f172a)",
    color: "#a5f3fc",
    fontFamily: "Roboto Mono, Consolas, monospace",
    fontSize: "11px",
    fontWeight: 600,
    border: "1px solid #22d3ee",
    borderRadius: "7px",
    filter: "drop-shadow(0 0 7px rgba(34, 211, 238, 0.45))",
    padding: "9px 14px",
    letterSpacing: "0.04em",
    textAlign: "left",
    arrowSize: "8px",
    arrowWidth: "16px",
    animation: animations.blur,
    style: {
      backgroundSize: "10px 10px"
    }
  }),
  circuit: createTheme({
    background: "linear-gradient(135deg, #052e16, #022c22)",
    color: "#bbf7d0",
    fontFamily: "Consolas, monospace",
    fontSize: "11px",
    fontWeight: 700,
    border: "2px solid #22c55e",
    borderRadius: "5px",
    padding: "9px 14px",
    letterSpacing: "0.05em",
    arrowSize: "8px",
    arrowWidth: "16px",
    animation: animations.soft
  }),
  galaxy: createTheme({
    background: "radial-gradient(circle at 12% 25%, #ffffff 0 1px, transparent 1.5px), radial-gradient(circle at 76% 18%, #c4b5fd 0 1px, transparent 1.5px), radial-gradient(circle at 63% 78%, #ffffff 0 1.2px, transparent 1.8px), radial-gradient(circle at 28% 72%, rgba(236, 72, 153, 0.55), transparent 22%), radial-gradient(circle at 70% 20%, rgba(99, 102, 241, 0.55), transparent 32%), #09051f",
    color: "#f5f3ff",
    fontFamily: "Trebuchet MS, sans-serif",
    fontSize: "12px",
    fontWeight: 600,
    border: "1px solid #8b5cf6",
    borderRadius: "18px",
    filter: "drop-shadow(0 0 9px rgba(139, 92, 246, 0.62)) drop-shadow(0 9px 16px rgba(9, 5, 31, 0.6))",
    padding: "10px 16px",
    textShadow: "0 0 5px rgba(196, 181, 253, 0.8)",
    arrowSize: "9px",
    arrowWidth: "20px",
    animation: animations.blur
  }),
  aurora: createTheme({
    background: "radial-gradient(ellipse at 15% 0%, rgba(45, 212, 191, 0.85), transparent 45%), radial-gradient(ellipse at 90% 100%, rgba(217, 70, 239, 0.72), transparent 50%), linear-gradient(135deg, #0f172a, #312e81)",
    color: "#f0fdfa",
    fontFamily: "Segoe UI, Arial, sans-serif",
    fontSize: "12px",
    fontWeight: 600,
    border: "1px solid rgba(153, 246, 228, 0.6)",
    borderRadius: "20px 8px 20px 8px",
    filter: "drop-shadow(0 10px 17px rgba(49, 46, 129, 0.48))",
    padding: "10px 16px",
    arrowSize: "9px",
    arrowWidth: "21px",
    animation: animations.blur
  }),
  oceanDepths: createTheme({
    background: "radial-gradient(circle at 20% 10%, rgba(34, 211, 238, 0.32), transparent 32%), radial-gradient(circle at 80% 90%, rgba(14, 116, 144, 0.42), transparent 36%), linear-gradient(160deg, #083344, #020617)",
    color: "#cffafe",
    fontFamily: "Trebuchet MS, sans-serif",
    fontSize: "12px",
    fontWeight: 600,
    border: "1px solid #0e7490",
    borderRadius: "4px 20px 4px 20px",
    filter: "drop-shadow(0 10px 16px rgba(2, 6, 23, 0.56)) drop-shadow(0 0 6px rgba(34, 211, 238, 0.3))",
    padding: "10px 16px",
    arrowSize: "10px",
    arrowWidth: "19px",
    animation: animations.slide
  }),
  coralReef: createTheme({
    background: "radial-gradient(circle at 15% 100%, rgba(251, 113, 133, 0.75), transparent 30%), radial-gradient(circle at 90% 0%, rgba(45, 212, 191, 0.72), transparent 34%), linear-gradient(135deg, #0e7490, #155e75)",
    color: "#fff7ed",
    fontFamily: "Trebuchet MS, sans-serif",
    fontSize: "12px",
    fontWeight: 700,
    border: "2px solid #fdba74",
    borderRadius: "18px 8px 14px 5px",
    filter: "drop-shadow(0 9px 14px rgba(14, 116, 144, 0.4))",
    padding: "9px 16px",
    textShadow: "0 1px 2px rgba(12, 74, 110, 0.8)",
    arrowSize: "9px",
    arrowWidth: "21px",
    animation: animations.bounce
  }),
  forest: createTheme({
    background: "radial-gradient(ellipse at 20% 20%, rgba(74, 222, 128, 0.18), transparent 30%), repeating-linear-gradient(115deg, rgba(255, 255, 255, 0.025) 0 2px, transparent 2px 7px), linear-gradient(135deg, #14532d, #052e16)",
    color: "#dcfce7",
    fontFamily: "Georgia, serif",
    fontSize: "13px",
    fontWeight: 600,
    border: "2px solid #4d7c0f",
    borderRadius: "13px 4px 17px 6px",
    filter: "drop-shadow(0 9px 14px rgba(5, 46, 22, 0.5))",
    padding: "9px 16px",
    arrowSize: "9px",
    arrowWidth: "19px",
    animation: animations.slide
  }),
  moss: createTheme({
    background: "radial-gradient(circle at 20% 30%, rgba(190, 242, 100, 0.16) 0 3px, transparent 4px), radial-gradient(circle at 72% 65%, rgba(132, 204, 22, 0.14) 0 4px, transparent 5px), linear-gradient(135deg, #3f6212, #1a2e05)",
    color: "#ecfccb",
    fontFamily: "Palatino Linotype, serif",
    fontSize: "13px",
    fontWeight: 600,
    border: "2px dotted #84cc16",
    borderRadius: "18px 7px 14px 10px",
    filter: "drop-shadow(0 8px 13px rgba(26, 46, 5, 0.5))",
    padding: "10px 16px",
    arrowSize: "9px",
    arrowWidth: "20px",
    animation: animations.blur
  }),
  desert: createTheme({
    background: "radial-gradient(ellipse at 20% 120%, #f59e0b 0 35%, transparent 36%), radial-gradient(ellipse at 85% 110%, #d97706 0 40%, transparent 41%), linear-gradient(180deg, #fde68a, #fbbf24)",
    color: "#78350f",
    fontFamily: "Georgia, serif",
    fontSize: "13px",
    fontWeight: 700,
    border: "2px solid #b45309",
    borderRadius: "22px 22px 7px 7px",
    filter: "drop-shadow(0 9px 13px rgba(180, 83, 9, 0.32))",
    padding: "10px 16px",
    arrowSize: "9px",
    arrowWidth: "21px",
    animation: animations.soft
  }),
  snow: createTheme({
    background: "radial-gradient(circle at 15% 25%, #ffffff 0 2px, transparent 2.5px), radial-gradient(circle at 75% 65%, #ffffff 0 1.5px, transparent 2px), linear-gradient(135deg, #e0f2fe, #bae6fd)",
    color: "#0c4a6e",
    fontFamily: "Helvetica Neue, Arial, sans-serif",
    fontSize: "12px",
    fontWeight: 600,
    border: "2px solid #ffffff",
    borderRadius: "20px",
    filter: "drop-shadow(0 8px 13px rgba(14, 116, 144, 0.22))",
    padding: "10px 16px",
    textShadow: "0 1px 0 rgba(255, 255, 255, 0.9)",
    arrowSize: "9px",
    arrowWidth: "20px",
    animation: animations.blur
  }),
  chrome: createTheme({
    background: "linear-gradient(180deg, #ffffff 0%, #a1a1aa 18%, #f4f4f5 38%, #52525b 52%, #d4d4d8 72%, #71717a 100%)",
    color: "#18181b",
    fontFamily: "Arial Black, sans-serif",
    fontSize: "12px",
    fontWeight: 900,
    border: "2px solid #27272a",
    borderRadius: "10px",
    filter: "drop-shadow(0 8px 12px rgba(24, 24, 27, 0.45))",
    padding: "9px 16px",
    letterSpacing: "0.04em",
    textShadow: "0 1px 0 #ffffff",
    textTransform: "uppercase",
    arrowSize: "9px",
    arrowWidth: "20px",
    animation: animations.flip
  }),
  goldFoil: createTheme({
    background: "linear-gradient(115deg, #713f12 0%, #facc15 18%, #fef08a 32%, #ca8a04 52%, #fef9c3 70%, #a16207 100%)",
    color: "#422006",
    fontFamily: "Palatino Linotype, serif",
    fontSize: "13px",
    fontWeight: 800,
    border: "2px solid #713f12",
    borderRadius: "5px 16px 5px 16px",
    filter: "drop-shadow(0 9px 14px rgba(113, 63, 18, 0.45))",
    padding: "10px 17px",
    letterSpacing: "0.04em",
    textShadow: "0 1px 0 rgba(255, 255, 255, 0.55)",
    arrowSize: "10px",
    arrowWidth: "21px",
    animation: animations.flip,
    style: {
      fontVariantCaps: "small-caps"
    }
  }),
  bronze: createTheme({
    background: "repeating-linear-gradient(115deg, rgba(255, 255, 255, 0.08) 0 1px, transparent 1px 5px), linear-gradient(135deg, #d97706, #78350f)",
    color: "#ffedd5",
    fontFamily: "Georgia, serif",
    fontSize: "13px",
    fontWeight: 700,
    border: "2px solid #fdba74",
    borderRadius: "8px",
    filter: "drop-shadow(0 9px 14px rgba(120, 53, 15, 0.5))",
    padding: "9px 16px",
    textShadow: "0 1px 2px rgba(66, 32, 6, 0.8)",
    arrowSize: "9px",
    arrowWidth: "19px",
    animation: animations.pop
  }),
  brutalist: createTheme({
    background: "#ffffff",
    color: "#000000",
    fontFamily: "Arial Black, Helvetica, sans-serif",
    fontSize: "12px",
    fontWeight: 900,
    border: "4px solid #000000",
    borderRadius: "0px",
    padding: "10px 16px",
    letterSpacing: "-0.03em",
    textTransform: "uppercase",
    textAlign: "left",
    arrowSize: "11px",
    arrowWidth: "19px",
    animation: animations.pop
  }),
  chalkboard: createTheme({
    background: "linear-gradient(145deg, #183f30, #102a21)",
    color: "#f5f5dc",
    fontFamily: "Comic Sans MS, Chalkboard, cursive",
    fontSize: "13px",
    fontWeight: 600,
    border: "3px solid #8b5e3c",
    borderRadius: "2px",
    padding: "10px 16px",
    letterSpacing: "0.025em",
    textAlign: "left",
    arrowSize: "9px",
    arrowWidth: "18px",
    animation: animations.soft
  })
};
var presetThemeNames = Object.keys(presets);

// src/hooks/useTooltip.ts
var import_react = require("react");
var DEFAULT_HIDE_DELAY = 120;
var DEFAULT_INTERACTIVE_HIDE_DELAY = 240;
var VIEWPORT_PADDING = 8;
var DEFAULT_ARROW_SIZE = 6;
var DEFAULT_TOOLTIP_GAP = 10;
var ARROW_EDGE_OFFSET = 10;
var INTERACTIVE_DIRECT_PADDING = 4;
var INTERACTIVE_BRIDGE_PADDING = 8;
var INTERACTIVE_BRIDGE_TIMEOUT = 700;
var INTERACTIVE_RECHECK_INTERVAL = 50;
var TOUCH_MOVE_THRESHOLD = 10;
var TOUCH_MAX_TAP_DURATION = 600;
var TOUCH_FOCUS_SUPPRESSION = 700;
var activeTooltipSession = null;
var inputModality = "pointer";
var inputModalitySubscribers = 0;
var handleGlobalPointerDown = () => {
  inputModality = "pointer";
};
var keyboardFocusKeys = /* @__PURE__ */ new Set([
  "Tab",
  "Enter",
  " ",
  "ArrowUp",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "Home",
  "End",
  "PageUp",
  "PageDown"
]);
var handleGlobalKeyDown = (event) => {
  if (event.metaKey || event.ctrlKey || event.altKey || !keyboardFocusKeys.has(event.key)) {
    return;
  }
  inputModality = "keyboard";
};
var subscribeInputModality = () => {
  inputModalitySubscribers += 1;
  if (inputModalitySubscribers !== 1) {
    return;
  }
  document.addEventListener("pointerdown", handleGlobalPointerDown, true);
  document.addEventListener("keydown", handleGlobalKeyDown, true);
};
var unsubscribeInputModality = () => {
  inputModalitySubscribers = Math.max(0, inputModalitySubscribers - 1);
  if (inputModalitySubscribers !== 0) {
    return;
  }
  document.removeEventListener("pointerdown", handleGlobalPointerDown, true);
  document.removeEventListener("keydown", handleGlobalKeyDown, true);
};
var requestTooltipActivation = (session, point) => {
  const currentSession = activeTooltipSession;
  if (currentSession && currentSession.owner !== session.owner) {
    if (point && currentSession.interactive && currentSession.protectsPoint(point)) {
      return false;
    }
    currentSession.close();
  }
  activeTooltipSession = session;
  return true;
};
var clearTooltipActivation = (owner) => {
  if (activeTooltipSession?.owner === owner) {
    activeTooltipSession = null;
  }
};
var oppositePlacement = {
  top: "bottom",
  bottom: "top",
  left: "right",
  right: "left"
};
var clamp = (value, min, max) => {
  const resolvedMax = Math.max(min, max);
  return Math.min(Math.max(value, min), resolvedMax);
};
var isPointInsideRect = (point, rect, padding = 0) => {
  return point.x >= rect.left - padding && point.x <= rect.right + padding && point.y >= rect.top - padding && point.y <= rect.bottom + padding;
};
var isPointOnSegment = (point, start, end) => {
  const cross = (point.y - start.y) * (end.x - start.x) - (point.x - start.x) * (end.y - start.y);
  if (Math.abs(cross) > 1e-3) {
    return false;
  }
  return point.x >= Math.min(start.x, end.x) && point.x <= Math.max(start.x, end.x) && point.y >= Math.min(start.y, end.y) && point.y <= Math.max(start.y, end.y);
};
var isPointInsidePolygon = (point, polygon) => {
  let inside = false;
  for (let currentIndex = 0, previousIndex = polygon.length - 1; currentIndex < polygon.length; previousIndex = currentIndex, currentIndex += 1) {
    const current = polygon[currentIndex];
    const previous = polygon[previousIndex];
    if (isPointOnSegment(point, previous, current)) {
      return true;
    }
    const crosses = current.y > point.y !== previous.y > point.y && point.x < (previous.x - current.x) * (point.y - current.y) / (previous.y - current.y) + current.x;
    if (crosses) {
      inside = !inside;
    }
  }
  return inside;
};
var createInteractiveBridge = (anchorRect, tooltipRect, placement) => {
  const padding = INTERACTIVE_BRIDGE_PADDING;
  if (placement === "top") {
    return [
      {
        x: tooltipRect.left - padding,
        y: tooltipRect.bottom - padding
      },
      {
        x: tooltipRect.right + padding,
        y: tooltipRect.bottom - padding
      },
      {
        x: anchorRect.right + padding,
        y: anchorRect.top + padding
      },
      {
        x: anchorRect.left - padding,
        y: anchorRect.top + padding
      }
    ];
  }
  if (placement === "bottom") {
    return [
      {
        x: anchorRect.left - padding,
        y: anchorRect.bottom - padding
      },
      {
        x: anchorRect.right + padding,
        y: anchorRect.bottom - padding
      },
      {
        x: tooltipRect.right + padding,
        y: tooltipRect.top + padding
      },
      {
        x: tooltipRect.left - padding,
        y: tooltipRect.top + padding
      }
    ];
  }
  if (placement === "left") {
    return [
      {
        x: tooltipRect.right - padding,
        y: tooltipRect.top - padding
      },
      {
        x: anchorRect.left + padding,
        y: anchorRect.top - padding
      },
      {
        x: anchorRect.left + padding,
        y: anchorRect.bottom + padding
      },
      {
        x: tooltipRect.right - padding,
        y: tooltipRect.bottom + padding
      }
    ];
  }
  return [
    {
      x: anchorRect.right - padding,
      y: anchorRect.top - padding
    },
    {
      x: tooltipRect.left + padding,
      y: tooltipRect.top - padding
    },
    {
      x: tooltipRect.left + padding,
      y: tooltipRect.bottom + padding
    },
    {
      x: anchorRect.right - padding,
      y: anchorRect.bottom + padding
    }
  ];
};
var useTooltip = ({
  anchor,
  preferredPlacement,
  disabled = false,
  interactive = false,
  hideDelay
}) => {
  const tooltipRef = (0, import_react.useRef)(null);
  const bodyRef = (0, import_react.useRef)(null);
  const ownerRef = (0, import_react.useRef)(/* @__PURE__ */ Symbol("tooltip"));
  const hideTimerRef = (0, import_react.useRef)(null);
  const firstFrameRef = (0, import_react.useRef)(null);
  const secondFrameRef = (0, import_react.useRef)(null);
  const interactiveFrameRef = (0, import_react.useRef)(null);
  const phaseRef = (0, import_react.useRef)("hidden");
  const pendingHideRef = (0, import_react.useRef)(false);
  const interactiveBridgeDeadlineRef = (0, import_react.useRef)(0);
  const pointerRef = (0, import_react.useRef)({
    x: Number.NaN,
    y: Number.NaN,
    pointerType: ""
  });
  const interactiveAreaAtPointRef = (0, import_react.useRef)(() => "outside");
  const touchGestureRef = (0, import_react.useRef)(null);
  const suppressFocusUntilRef = (0, import_react.useRef)(0);
  const [mounted, setMounted] = (0, import_react.useState)(false);
  const [phase, setPhase] = (0, import_react.useState)("hidden");
  const [placement, setPlacement] = (0, import_react.useState)(preferredPlacement);
  const [showVersion, setShowVersion] = (0, import_react.useState)(0);
  const [position, setPosition] = (0, import_react.useState)({
    top: "0px",
    left: "0px",
    "--tooltip-arrow-offset": "50%"
  });
  const resolvedHideDelay = hideDelay ?? (interactive ? DEFAULT_INTERACTIVE_HIDE_DELAY : DEFAULT_HIDE_DELAY);
  const updatePhase = (0, import_react.useCallback)((nextPhase) => {
    phaseRef.current = nextPhase;
    setPhase(nextPhase);
  }, []);
  const clearHideTimer = (0, import_react.useCallback)(() => {
    if (hideTimerRef.current === null) {
      return;
    }
    window.clearTimeout(hideTimerRef.current);
    hideTimerRef.current = null;
  }, []);
  const clearEnterFrames = (0, import_react.useCallback)(() => {
    if (firstFrameRef.current !== null) {
      window.cancelAnimationFrame(firstFrameRef.current);
      firstFrameRef.current = null;
    }
    if (secondFrameRef.current !== null) {
      window.cancelAnimationFrame(secondFrameRef.current);
      secondFrameRef.current = null;
    }
  }, []);
  const clearInteractiveFrame = (0, import_react.useCallback)(() => {
    if (interactiveFrameRef.current === null) {
      return;
    }
    window.cancelAnimationFrame(interactiveFrameRef.current);
    interactiveFrameRef.current = null;
  }, []);
  const getAvailableSpace = (0, import_react.useCallback)(
    (currentPlacement, rect) => {
      switch (currentPlacement) {
        case "top":
          return rect.top - VIEWPORT_PADDING;
        case "bottom":
          return window.innerHeight - rect.bottom - VIEWPORT_PADDING;
        case "left":
          return rect.left - VIEWPORT_PADDING;
        case "right":
          return window.innerWidth - rect.right - VIEWPORT_PADDING;
      }
    },
    []
  );
  const calculatePosition = (0, import_react.useCallback)(() => {
    const tooltip = tooltipRef.current;
    const body = bodyRef.current;
    if (!anchor || !tooltip || !body) {
      return;
    }
    const rect = anchor.getBoundingClientRect();
    const computedStyle = window.getComputedStyle(tooltip);
    const arrowSize = Number.parseFloat(
      computedStyle.getPropertyValue("--tooltip-arrow-size")
    ) || DEFAULT_ARROW_SIZE;
    const tooltipGap = Number.parseFloat(
      computedStyle.getPropertyValue("--tooltip-gap")
    ) || DEFAULT_TOOLTIP_GAP;
    const bodyWidth = body.offsetWidth;
    const bodyHeight = body.offsetHeight;
    const distance = arrowSize + tooltipGap;
    const opposite = oppositePlacement[preferredPlacement];
    const getRequiredSpace = (currentPlacement) => {
      if (currentPlacement === "top" || currentPlacement === "bottom") {
        return bodyHeight + distance;
      }
      return bodyWidth + distance;
    };
    const preferredAvailable = getAvailableSpace(preferredPlacement, rect);
    const preferredRequired = getRequiredSpace(preferredPlacement);
    let nextPlacement = preferredPlacement;
    if (preferredAvailable < preferredRequired) {
      const oppositeAvailable = getAvailableSpace(opposite, rect);
      const oppositeRequired = getRequiredSpace(opposite);
      if (oppositeAvailable >= oppositeRequired || oppositeAvailable > preferredAvailable) {
        nextPlacement = opposite;
      }
    }
    const anchorCenterX = rect.left + rect.width / 2;
    const anchorCenterY = rect.top + rect.height / 2;
    let top = 0;
    let left = 0;
    let arrowOffset = "50%";
    if (nextPlacement === "top") {
      top = rect.top - bodyHeight - distance;
      left = anchorCenterX - bodyWidth / 2;
    }
    if (nextPlacement === "bottom") {
      top = rect.bottom + distance;
      left = anchorCenterX - bodyWidth / 2;
    }
    if (nextPlacement === "left") {
      top = anchorCenterY - bodyHeight / 2;
      left = rect.left - bodyWidth - distance;
    }
    if (nextPlacement === "right") {
      top = anchorCenterY - bodyHeight / 2;
      left = rect.right + distance;
    }
    const maxLeft = window.innerWidth - bodyWidth - VIEWPORT_PADDING;
    const maxTop = window.innerHeight - bodyHeight - VIEWPORT_PADDING;
    left = clamp(left, VIEWPORT_PADDING, maxLeft);
    top = clamp(top, VIEWPORT_PADDING, maxTop);
    if (nextPlacement === "top" || nextPlacement === "bottom") {
      const offset = clamp(
        anchorCenterX - left,
        ARROW_EDGE_OFFSET,
        bodyWidth - ARROW_EDGE_OFFSET
      );
      arrowOffset = `${offset}px`;
    }
    if (nextPlacement === "left" || nextPlacement === "right") {
      const offset = clamp(
        anchorCenterY - top,
        ARROW_EDGE_OFFSET,
        bodyHeight - ARROW_EDGE_OFFSET
      );
      arrowOffset = `${offset}px`;
    }
    setPlacement(nextPlacement);
    setPosition({
      top: `${top}px`,
      left: `${left}px`,
      "--tooltip-arrow-offset": arrowOffset
    });
  }, [anchor, getAvailableSpace, preferredPlacement]);
  const isFocusInsideTooltipRegion = (0, import_react.useCallback)(() => {
    if (!anchor || typeof document === "undefined" || inputModality !== "keyboard") {
      return false;
    }
    const activeElement = document.activeElement;
    const tooltip = tooltipRef.current;
    if (!(activeElement instanceof Node)) {
      return false;
    }
    return anchor.contains(activeElement) || Boolean(interactive && tooltip?.contains(activeElement));
  }, [anchor, interactive]);
  const getInteractivePointerAreaAtPoint = (0, import_react.useCallback)(
    (point) => {
      if (!interactive || !anchor) {
        return "outside";
      }
      const tooltip = tooltipRef.current;
      if (!tooltip || !Number.isFinite(point.x) || !Number.isFinite(point.y)) {
        return "outside";
      }
      const anchorRect = anchor.getBoundingClientRect();
      const tooltipRect = tooltip.getBoundingClientRect();
      if (isPointInsideRect(
        point,
        anchorRect,
        INTERACTIVE_DIRECT_PADDING
      ) || isPointInsideRect(
        point,
        tooltipRect,
        INTERACTIVE_DIRECT_PADDING
      )) {
        return "direct";
      }
      const bridge = createInteractiveBridge(
        anchorRect,
        tooltipRect,
        placement
      );
      return isPointInsidePolygon(point, bridge) ? "bridge" : "outside";
    },
    [anchor, interactive, placement]
  );
  (0, import_react.useLayoutEffect)(() => {
    interactiveAreaAtPointRef.current = getInteractivePointerAreaAtPoint;
  }, [getInteractivePointerAreaAtPoint]);
  const getInteractivePointerArea = (0, import_react.useCallback)(() => {
    const pointer = pointerRef.current;
    if (pointer.pointerType !== "mouse" && pointer.pointerType !== "pen" || !Number.isFinite(pointer.x) || !Number.isFinite(pointer.y)) {
      return "outside";
    }
    return getInteractivePointerAreaAtPoint({
      x: pointer.x,
      y: pointer.y
    });
  }, [getInteractivePointerAreaAtPoint]);
  const removeTooltip = (0, import_react.useCallback)(() => {
    clearHideTimer();
    clearEnterFrames();
    clearInteractiveFrame();
    pendingHideRef.current = false;
    interactiveBridgeDeadlineRef.current = 0;
    setMounted(false);
    updatePhase("hidden");
  }, [clearEnterFrames, clearHideTimer, clearInteractiveFrame, updatePhase]);
  const runHide = (0, import_react.useCallback)(() => {
    const currentPhase = phaseRef.current;
    if (currentPhase === "hidden" || currentPhase === "leaving") {
      return;
    }
    if (currentPhase === "preparing") {
      removeTooltip();
      return;
    }
    if (currentPhase === "entering") {
      pendingHideRef.current = true;
      return;
    }
    updatePhase("leaving");
  }, [removeTooltip, updatePhase]);
  const hideTooltip = (0, import_react.useCallback)(
    (immediate = false) => {
      if (immediate) {
        clearHideTimer();
        interactiveBridgeDeadlineRef.current = 0;
        runHide();
        return;
      }
      if (hideTimerRef.current !== null) {
        return;
      }
      const attemptHide = () => {
        hideTimerRef.current = null;
        if (isFocusInsideTooltipRegion()) {
          interactiveBridgeDeadlineRef.current = 0;
          return;
        }
        if (interactive) {
          const pointerArea = getInteractivePointerArea();
          if (pointerArea === "direct") {
            interactiveBridgeDeadlineRef.current = 0;
            return;
          }
          if (pointerArea === "bridge") {
            const now = window.performance.now();
            if (interactiveBridgeDeadlineRef.current === 0) {
              interactiveBridgeDeadlineRef.current = now + INTERACTIVE_BRIDGE_TIMEOUT;
            }
            const remaining = interactiveBridgeDeadlineRef.current - now;
            if (remaining > 0) {
              hideTimerRef.current = window.setTimeout(
                attemptHide,
                Math.min(
                  INTERACTIVE_RECHECK_INTERVAL,
                  remaining
                )
              );
              return;
            }
          }
        }
        interactiveBridgeDeadlineRef.current = 0;
        runHide();
      };
      hideTimerRef.current = window.setTimeout(
        attemptHide,
        resolvedHideDelay
      );
    },
    [
      clearHideTimer,
      getInteractivePointerArea,
      interactive,
      isFocusInsideTooltipRegion,
      resolvedHideDelay,
      runHide
    ]
  );
  const showTooltip = (0, import_react.useCallback)(
    (activationPoint) => {
      if (!anchor || disabled) {
        return;
      }
      const activated = requestTooltipActivation(
        {
          owner: ownerRef.current,
          interactive,
          protectsPoint: (point) => {
            if (phaseRef.current === "hidden") {
              return false;
            }
            return interactiveAreaAtPointRef.current(point) !== "outside";
          },
          close: () => {
            hideTooltip(true);
          }
        },
        activationPoint
      );
      if (!activated) {
        return;
      }
      clearHideTimer();
      clearEnterFrames();
      interactiveBridgeDeadlineRef.current = 0;
      pendingHideRef.current = false;
      setMounted(true);
      if (phaseRef.current === "entering" || phaseRef.current === "visible") {
        return;
      }
      updatePhase("preparing");
      setShowVersion((value) => value + 1);
    },
    [
      anchor,
      clearEnterFrames,
      clearHideTimer,
      disabled,
      hideTooltip,
      interactive,
      updatePhase
    ]
  );
  const keepTooltipOpen = (0, import_react.useCallback)(() => {
    if (!interactive || disabled) {
      return;
    }
    clearHideTimer();
    interactiveBridgeDeadlineRef.current = 0;
    pendingHideRef.current = false;
    if (phaseRef.current === "leaving") {
      updatePhase("visible");
    }
  }, [clearHideTimer, disabled, interactive, updatePhase]);
  const processInteractivePointer = (0, import_react.useCallback)(() => {
    if (!interactive || disabled || phaseRef.current === "hidden") {
      return;
    }
    if (isFocusInsideTooltipRegion()) {
      keepTooltipOpen();
      return;
    }
    const pointerArea = getInteractivePointerArea();
    if (pointerArea === "direct") {
      keepTooltipOpen();
      return;
    }
    if (pointerArea === "bridge") {
      if (interactiveBridgeDeadlineRef.current === 0) {
        interactiveBridgeDeadlineRef.current = window.performance.now() + INTERACTIVE_BRIDGE_TIMEOUT;
      }
      hideTooltip(false);
      return;
    }
    interactiveBridgeDeadlineRef.current = 0;
    hideTooltip(false);
  }, [
    disabled,
    getInteractivePointerArea,
    hideTooltip,
    interactive,
    isFocusInsideTooltipRegion,
    keepTooltipOpen
  ]);
  const scheduleInteractivePointerProcessing = (0, import_react.useCallback)(() => {
    if (interactiveFrameRef.current !== null) {
      return;
    }
    interactiveFrameRef.current = window.requestAnimationFrame(() => {
      interactiveFrameRef.current = null;
      processInteractivePointer();
    });
  }, [processInteractivePointer]);
  const onAnimationEnd = (0, import_react.useCallback)(() => {
    const currentPhase = phaseRef.current;
    if (currentPhase === "entering") {
      if (pendingHideRef.current) {
        pendingHideRef.current = false;
        updatePhase("leaving");
        return;
      }
      updatePhase("visible");
      return;
    }
    if (currentPhase === "leaving") {
      removeTooltip();
    }
  }, [removeTooltip, updatePhase]);
  (0, import_react.useLayoutEffect)(() => {
    if (phase !== "preparing" || !anchor) {
      return;
    }
    calculatePosition();
    firstFrameRef.current = window.requestAnimationFrame(() => {
      firstFrameRef.current = null;
      secondFrameRef.current = window.requestAnimationFrame(() => {
        secondFrameRef.current = null;
        if (!anchor || phaseRef.current !== "preparing") {
          return;
        }
        updatePhase("entering");
      });
    });
    return clearEnterFrames;
  }, [
    anchor,
    calculatePosition,
    clearEnterFrames,
    phase,
    showVersion,
    updatePhase
  ]);
  (0, import_react.useEffect)(() => {
    subscribeInputModality();
    return () => {
      unsubscribeInputModality();
      clearTooltipActivation(ownerRef.current);
    };
  }, []);
  (0, import_react.useEffect)(() => {
    if (!anchor) {
      removeTooltip();
      return;
    }
    const updatePointer = (event) => {
      pointerRef.current = {
        x: event.clientX,
        y: event.clientY,
        pointerType: event.pointerType
      };
    };
    const onPointerEnter = (event) => {
      updatePointer(event);
      if (event.pointerType === "touch") {
        return;
      }
      showTooltip({
        x: event.clientX,
        y: event.clientY
      });
    };
    const onPointerLeave = (event) => {
      updatePointer(event);
      if (event.pointerType === "touch") {
        return;
      }
      if (interactive) {
        interactiveBridgeDeadlineRef.current = window.performance.now() + INTERACTIVE_BRIDGE_TIMEOUT;
        hideTooltip(false);
        scheduleInteractivePointerProcessing();
        return;
      }
      hideTooltip(false);
    };
    const onPointerDown = (event) => {
      updatePointer(event);
      if (event.pointerType !== "touch") {
        return;
      }
      const now = window.performance.now();
      touchGestureRef.current = {
        pointerId: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
        startedAt: now,
        moved: false,
        cancelled: false
      };
      suppressFocusUntilRef.current = now + TOUCH_FOCUS_SUPPRESSION;
    };
    const onPointerMove = (event) => {
      updatePointer(event);
      if (event.pointerType !== "touch") {
        return;
      }
      const gesture = touchGestureRef.current;
      if (!gesture || gesture.pointerId !== event.pointerId) {
        return;
      }
      const distance = Math.hypot(
        event.clientX - gesture.startX,
        event.clientY - gesture.startY
      );
      if (distance <= TOUCH_MOVE_THRESHOLD) {
        return;
      }
      gesture.moved = true;
      suppressFocusUntilRef.current = window.performance.now() + TOUCH_FOCUS_SUPPRESSION;
      hideTooltip(true);
    };
    const onPointerUp = (event) => {
      updatePointer(event);
      if (event.pointerType !== "touch") {
        return;
      }
      const gesture = touchGestureRef.current;
      touchGestureRef.current = null;
      if (!gesture || gesture.pointerId !== event.pointerId) {
        return;
      }
      const now = window.performance.now();
      const distance = Math.hypot(
        event.clientX - gesture.startX,
        event.clientY - gesture.startY
      );
      const duration = now - gesture.startedAt;
      suppressFocusUntilRef.current = now + TOUCH_FOCUS_SUPPRESSION;
      if (gesture.cancelled || gesture.moved || distance > TOUCH_MOVE_THRESHOLD || duration > TOUCH_MAX_TAP_DURATION) {
        return;
      }
      if (phaseRef.current === "hidden" || phaseRef.current === "leaving") {
        showTooltip({
          x: event.clientX,
          y: event.clientY
        });
      } else {
        hideTooltip(true);
      }
    };
    const onPointerCancel = (event) => {
      if (event.pointerType !== "touch") {
        return;
      }
      const gesture = touchGestureRef.current;
      if (!gesture || gesture.pointerId !== event.pointerId) {
        return;
      }
      gesture.cancelled = true;
      touchGestureRef.current = null;
      suppressFocusUntilRef.current = window.performance.now() + TOUCH_FOCUS_SUPPRESSION;
      hideTooltip(true);
    };
    const onFocusIn = () => {
      if (window.performance.now() < suppressFocusUntilRef.current) {
        return;
      }
      showTooltip();
    };
    const onFocusOut = (event) => {
      const relatedTarget = event.relatedTarget;
      const tooltip = tooltipRef.current;
      if (relatedTarget instanceof Node && (anchor.contains(relatedTarget) || interactive && tooltip?.contains(relatedTarget))) {
        return;
      }
      hideTooltip(false);
    };
    anchor.addEventListener("pointerenter", onPointerEnter);
    anchor.addEventListener("pointerleave", onPointerLeave);
    anchor.addEventListener("pointerdown", onPointerDown);
    anchor.addEventListener("pointermove", onPointerMove);
    anchor.addEventListener("pointerup", onPointerUp);
    anchor.addEventListener("pointercancel", onPointerCancel);
    anchor.addEventListener("focusin", onFocusIn);
    anchor.addEventListener("focusout", onFocusOut);
    return () => {
      anchor.removeEventListener("pointerenter", onPointerEnter);
      anchor.removeEventListener("pointerleave", onPointerLeave);
      anchor.removeEventListener("pointerdown", onPointerDown);
      anchor.removeEventListener("pointermove", onPointerMove);
      anchor.removeEventListener("pointerup", onPointerUp);
      anchor.removeEventListener("pointercancel", onPointerCancel);
      anchor.removeEventListener("focusin", onFocusIn);
      anchor.removeEventListener("focusout", onFocusOut);
      touchGestureRef.current = null;
      clearHideTimer();
      clearEnterFrames();
      clearInteractiveFrame();
    };
  }, [
    anchor,
    clearEnterFrames,
    clearHideTimer,
    clearInteractiveFrame,
    hideTooltip,
    interactive,
    removeTooltip,
    scheduleInteractivePointerProcessing,
    showTooltip
  ]);
  (0, import_react.useEffect)(() => {
    if (!interactive || phase === "hidden") {
      return;
    }
    const tooltip = tooltipRef.current;
    if (!tooltip) {
      return;
    }
    const updatePointer = (event) => {
      pointerRef.current = {
        x: event.clientX,
        y: event.clientY,
        pointerType: event.pointerType
      };
    };
    const onPointerEnter = (event) => {
      updatePointer(event);
      if (event.pointerType === "touch") {
        return;
      }
      keepTooltipOpen();
    };
    const onPointerLeave = (event) => {
      updatePointer(event);
      if (event.pointerType === "touch") {
        return;
      }
      interactiveBridgeDeadlineRef.current = window.performance.now() + INTERACTIVE_BRIDGE_TIMEOUT;
      hideTooltip(false);
      scheduleInteractivePointerProcessing();
    };
    const onFocusIn = () => {
      if (inputModality === "keyboard") {
        keepTooltipOpen();
      }
    };
    const onFocusOut = (event) => {
      const relatedTarget = event.relatedTarget;
      if (relatedTarget instanceof Node && (tooltip.contains(relatedTarget) || anchor?.contains(relatedTarget))) {
        return;
      }
      hideTooltip(false);
    };
    tooltip.addEventListener("pointerenter", onPointerEnter);
    tooltip.addEventListener("pointerleave", onPointerLeave);
    tooltip.addEventListener("focusin", onFocusIn);
    tooltip.addEventListener("focusout", onFocusOut);
    return () => {
      tooltip.removeEventListener("pointerenter", onPointerEnter);
      tooltip.removeEventListener("pointerleave", onPointerLeave);
      tooltip.removeEventListener("focusin", onFocusIn);
      tooltip.removeEventListener("focusout", onFocusOut);
    };
  }, [
    anchor,
    hideTooltip,
    interactive,
    keepTooltipOpen,
    phase,
    scheduleInteractivePointerProcessing
  ]);
  (0, import_react.useEffect)(() => {
    if (!interactive || phase === "hidden") {
      return;
    }
    const onDocumentPointerMove = (event) => {
      if (event.pointerType === "touch") {
        return;
      }
      pointerRef.current = {
        x: event.clientX,
        y: event.clientY,
        pointerType: event.pointerType
      };
      scheduleInteractivePointerProcessing();
    };
    document.addEventListener("pointermove", onDocumentPointerMove, {
      passive: true
    });
    return () => {
      document.removeEventListener("pointermove", onDocumentPointerMove);
      clearInteractiveFrame();
    };
  }, [
    clearInteractiveFrame,
    interactive,
    phase,
    scheduleInteractivePointerProcessing
  ]);
  (0, import_react.useEffect)(() => {
    if (!anchor || phase === "hidden") {
      return;
    }
    const onDocumentPointerDown = (event) => {
      const target = event.target;
      const tooltip = tooltipRef.current;
      if (target instanceof Node && (anchor.contains(target) || interactive && tooltip?.contains(target))) {
        return;
      }
      touchGestureRef.current = null;
      hideTooltip(true);
    };
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        hideTooltip(true);
      }
    };
    document.addEventListener("pointerdown", onDocumentPointerDown, true);
    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", calculatePosition);
    window.addEventListener("scroll", calculatePosition, true);
    return () => {
      document.removeEventListener(
        "pointerdown",
        onDocumentPointerDown,
        true
      );
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", calculatePosition);
      window.removeEventListener("scroll", calculatePosition, true);
    };
  }, [anchor, calculatePosition, hideTooltip, interactive, phase]);
  (0, import_react.useLayoutEffect)(() => {
    if (phase === "hidden") {
      return;
    }
    const body = bodyRef.current;
    if (!body) {
      return;
    }
    const resizeObserver = new ResizeObserver(calculatePosition);
    resizeObserver.observe(body);
    return () => {
      resizeObserver.disconnect();
    };
  }, [calculatePosition, phase]);
  (0, import_react.useEffect)(() => {
    if (!disabled) {
      return;
    }
    hideTooltip(true);
  }, [disabled, hideTooltip]);
  return {
    shouldRender: mounted,
    phase,
    placement,
    position,
    tooltipRef,
    bodyRef,
    calculatePosition,
    onAnimationEnd
  };
};

// src/utils/tooltipTheme.ts
var BORDER_STYLE_VALUES = /* @__PURE__ */ new Set([
  "none",
  "hidden",
  "dotted",
  "dashed",
  "solid",
  "double",
  "groove",
  "ridge",
  "inset",
  "outset",
  "inherit",
  "initial",
  "revert",
  "revert-layer",
  "unset"
]);
var splitCssTokens = (value) => {
  const tokens = [];
  let current = "";
  let depth = 0;
  for (const character of value.trim()) {
    if (character === "(") {
      depth += 1;
    }
    if (character === ")") {
      depth = Math.max(0, depth - 1);
    }
    if (/\s/.test(character) && depth === 0) {
      if (current.trim()) {
        tokens.push(current.trim());
      }
      current = "";
      continue;
    }
    current += character;
  }
  if (current.trim()) {
    tokens.push(current.trim());
  }
  return tokens;
};
var splitOutsideParentheses = (value, separator) => {
  const result = [];
  let current = "";
  let depth = 0;
  for (const character of value) {
    if (character === "(") {
      depth += 1;
    }
    if (character === ")") {
      depth = Math.max(0, depth - 1);
    }
    if (character === separator && depth === 0) {
      if (current.trim()) {
        result.push(current.trim());
      }
      current = "";
      continue;
    }
    current += character;
  }
  if (current.trim()) {
    result.push(current.trim());
  }
  return result;
};
var expandQuad = (values) => {
  if (values.length === 0) {
    return [void 0, void 0, void 0, void 0];
  }
  if (values.length === 1) {
    return [values[0], values[0], values[0], values[0]];
  }
  if (values.length === 2) {
    return [values[0], values[1], values[0], values[1]];
  }
  if (values.length === 3) {
    return [values[0], values[1], values[2], values[1]];
  }
  return [values[0], values[1], values[2], values[3]];
};
var isBorderWidthToken = (value) => {
  return value === "thin" || value === "medium" || value === "thick" || value === "0" || value === "inherit" || value === "initial" || value === "revert" || value === "revert-layer" || value === "unset" || /^-?(?:\d+|\d*\.\d+)(?:px|rem|em|vh|vw|vmin|vmax|%)?$/.test(value) || value.startsWith("calc(") || value.startsWith("var(");
};
var isBorderStyleToken = (value) => {
  return BORDER_STYLE_VALUES.has(value);
};
var parseBorder = (value) => {
  if (typeof value !== "string" || !value.trim()) {
    return {};
  }
  const tokens = splitCssTokens(value);
  const widthToken = tokens.find(isBorderWidthToken);
  const styleToken = tokens.find(isBorderStyleToken);
  const colorTokens = tokens.filter((token) => {
    return token !== widthToken && token !== styleToken;
  });
  return {
    width: widthToken ? widthToken : void 0,
    style: styleToken,
    color: colorTokens.length ? colorTokens.join(" ") : void 0
  };
};
var expandBorderWidths = (value) => {
  if (value === void 0) {
    return [void 0, void 0, void 0, void 0];
  }
  if (typeof value === "number") {
    return [value, value, value, value];
  }
  return expandQuad(
    splitCssTokens(String(value)).map((token) => token)
  );
};
var expandBorderStyles = (value) => {
  if (value === void 0) {
    return [void 0, void 0, void 0, void 0];
  }
  return expandQuad(splitCssTokens(String(value)).filter(isBorderStyleToken));
};
var expandBorderColors = (value) => {
  if (value === void 0) {
    return [void 0, void 0, void 0, void 0];
  }
  return expandQuad(
    splitCssTokens(String(value)).map((token) => token)
  );
};
var expandBorderRadii = (value) => {
  if (value === void 0) {
    return [void 0, void 0, void 0, void 0];
  }
  if (typeof value === "number") {
    return [value, value, value, value];
  }
  const parts = splitOutsideParentheses(String(value), "/");
  const horizontal = expandQuad(
    splitCssTokens(parts[0] ?? "").map(
      (token) => token
    )
  );
  if (!parts[1]) {
    return horizontal;
  }
  const vertical = expandQuad(
    splitCssTokens(parts[1]).map((token) => token)
  );
  return horizontal.map((horizontalRadius, index) => {
    const verticalRadius = vertical[index];
    if (horizontalRadius === void 0) {
      return void 0;
    }
    if (verticalRadius === void 0 || verticalRadius === horizontalRadius) {
      return horizontalRadius;
    }
    return `${horizontalRadius} ${verticalRadius}`;
  });
};
var resolveSurfaceStyle = (style) => {
  const border = parseBorder(style.border);
  const borderTop = parseBorder(style.borderTop);
  const borderRight = parseBorder(style.borderRight);
  const borderBottom = parseBorder(style.borderBottom);
  const borderLeft = parseBorder(style.borderLeft);
  const widths = expandBorderWidths(style.borderWidth ?? border.width);
  const styles = expandBorderStyles(style.borderStyle ?? border.style);
  const colors = expandBorderColors(style.borderColor ?? border.color);
  const radii = expandBorderRadii(style.borderRadius);
  return {
    borderTopWidth: style.borderTopWidth ?? borderTop.width ?? widths[0],
    borderRightWidth: style.borderRightWidth ?? borderRight.width ?? widths[1],
    borderBottomWidth: style.borderBottomWidth ?? borderBottom.width ?? widths[2],
    borderLeftWidth: style.borderLeftWidth ?? borderLeft.width ?? widths[3],
    borderTopStyle: style.borderTopStyle ?? borderTop.style ?? styles[0],
    borderRightStyle: style.borderRightStyle ?? borderRight.style ?? styles[1],
    borderBottomStyle: style.borderBottomStyle ?? borderBottom.style ?? styles[2],
    borderLeftStyle: style.borderLeftStyle ?? borderLeft.style ?? styles[3],
    borderTopColor: style.borderTopColor ?? borderTop.color ?? colors[0],
    borderRightColor: style.borderRightColor ?? borderRight.color ?? colors[1],
    borderBottomColor: style.borderBottomColor ?? borderBottom.color ?? colors[2],
    borderLeftColor: style.borderLeftColor ?? borderLeft.color ?? colors[3],
    borderTopLeftRadius: style.borderTopLeftRadius ?? radii[0],
    borderTopRightRadius: style.borderTopRightRadius ?? radii[1],
    borderBottomRightRadius: style.borderBottomRightRadius ?? radii[2],
    borderBottomLeftRadius: style.borderBottomLeftRadius ?? radii[3]
  };
};
var splitShadowTokens = (value) => {
  const tokens = [];
  let current = "";
  let depth = 0;
  for (const character of value.trim()) {
    if (character === "(") {
      depth += 1;
    }
    if (character === ")") {
      depth = Math.max(0, depth - 1);
    }
    if (/\s/.test(character) && depth === 0) {
      if (current.trim()) {
        tokens.push(current.trim());
      }
      current = "";
      continue;
    }
    current += character;
  }
  if (current.trim()) {
    tokens.push(current.trim());
  }
  return tokens;
};
var isShadowLengthToken = (value) => {
  return value === "0" || /^-?(?:\d+|\d*\.\d+)(?:px|rem|em|vh|vw|vmin|vmax|%)?$/.test(value) || value.startsWith("calc(") || value.startsWith("var(");
};
var isShadowColorToken = (value) => {
  return value.startsWith("#") || value.startsWith("rgb(") || value.startsWith("rgba(") || value.startsWith("hsl(") || value.startsWith("hsla(") || value.startsWith("oklch(") || value.startsWith("oklab(") || value.startsWith("lab(") || value.startsWith("lch(") || value.startsWith("color(") || value.startsWith("color-mix(") || value.startsWith("var(") || /^[a-zA-Z]+$/.test(value);
};
var boxShadowToDropShadow = (boxShadow) => {
  if (typeof boxShadow !== "string" || !boxShadow.trim() || boxShadow.trim() === "none") {
    return void 0;
  }
  const shadows = splitOutsideParentheses(boxShadow, ",");
  const filters = shadows.map((shadow) => {
    const tokens = splitShadowTokens(shadow);
    if (tokens.includes("inset")) {
      return null;
    }
    const lengths = tokens.filter(isShadowLengthToken);
    if (lengths.length < 2) {
      return null;
    }
    const color = tokens.find((token) => {
      return token !== "inset" && !isShadowLengthToken(token) && isShadowColorToken(token);
    });
    const offsetX = lengths[0];
    const offsetY = lengths[1];
    const blur = lengths[2] ?? "0px";
    return `drop-shadow(${offsetX} ${offsetY} ${blur} ${color ?? "rgba(0, 0, 0, 0.25)"})`;
  }).filter((value) => {
    return value !== null;
  });
  return filters.length ? filters.join(" ") : void 0;
};
var mergeThemes = (presetTheme, customTheme) => {
  if (!customTheme) {
    return presetTheme;
  }
  return {
    ...presetTheme,
    ...customTheme,
    body: {
      ...presetTheme.body,
      ...customTheme.body,
      style: {
        ...presetTheme.body?.style,
        ...customTheme.body?.style
      },
      background: customTheme.body?.background ?? presetTheme.body?.background,
      filter: customTheme.body?.filter ?? presetTheme.body?.filter,
      className: customTheme.body?.className ?? presetTheme.body?.className
    },
    arrow: {
      ...presetTheme.arrow,
      ...customTheme.arrow
    },
    animation: {
      ...presetTheme.animation,
      ...customTheme.animation
    }
  };
};
var resolveThemeStyles = (theme) => {
  const bodyStyle = theme.body?.style ?? {};
  const surfaceStyle = resolveSurfaceStyle(bodyStyle);
  const {
    background,
    backgroundColor,
    backgroundImage,
    border,
    borderTop,
    borderRight,
    borderBottom,
    borderLeft,
    borderWidth,
    borderStyle,
    borderColor,
    borderTopWidth,
    borderRightWidth,
    borderBottomWidth,
    borderLeftWidth,
    borderTopStyle,
    borderRightStyle,
    borderBottomStyle,
    borderLeftStyle,
    borderTopColor,
    borderRightColor,
    borderBottomColor,
    borderLeftColor,
    borderRadius,
    borderTopLeftRadius,
    borderTopRightRadius,
    borderBottomRightRadius,
    borderBottomLeftRadius,
    boxShadow,
    filter,
    backdropFilter,
    WebkitBackdropFilter,
    color,
    ...contentStyle
  } = bodyStyle;
  const resolvedBackground = theme.body?.background ?? background ?? backgroundImage ?? backgroundColor ?? "var(--global-color-link)";
  const resolvedColor = color ?? "var(--global-bg-color)";
  const resolvedFilter = theme.body?.filter ?? filter ?? boxShadowToDropShadow(boxShadow);
  return {
    background: resolvedBackground,
    color: resolvedColor,
    contentStyle,
    surfaceStyle,
    fillStyle: {
      backdropFilter,
      WebkitBackdropFilter
    },
    filter: resolvedFilter
  };
};

// src/components/TooltipProvider.tsx
var import_react2 = require("react");
var import_jsx_runtime = require("react/jsx-runtime");
var DEFAULT_TOOLTIP_VALUES = {
  defaultRenderPosition: "top",
  selectTheme: "primary",
  interactive: false
};
var TooltipContext = (0, import_react2.createContext)(DEFAULT_TOOLTIP_VALUES);
var TooltipProvider = ({
  children,
  defaultRenderPosition = DEFAULT_TOOLTIP_VALUES.defaultRenderPosition,
  selectTheme = DEFAULT_TOOLTIP_VALUES.selectTheme,
  customTheme,
  animation,
  interactive = DEFAULT_TOOLTIP_VALUES.interactive,
  hideDelay
}) => {
  const value = (0, import_react2.useMemo)(() => {
    return {
      defaultRenderPosition,
      selectTheme,
      customTheme,
      animation,
      interactive,
      hideDelay
    };
  }, [
    animation,
    customTheme,
    defaultRenderPosition,
    hideDelay,
    interactive,
    selectTheme
  ]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipContext.Provider, { value, children });
};
var useTooltipDefaults = () => {
  return (0, import_react2.useContext)(TooltipContext);
};

// src/components/TooltipSurface.tsx
var import_react3 = require("react");
var import_jsx_runtime2 = require("react/jsx-runtime");
var EMPTY_METRICS = {
  width: 0,
  height: 0,
  left: 0,
  top: 0,
  path: "",
  background: "",
  strokeWidth: 0,
  strokeColor: "transparent"
};
var clamp2 = (value, min, max) => {
  return Math.min(Math.max(value, min), Math.max(min, max));
};
var resolveCssLength = (value, base) => {
  const normalized = value.trim();
  if (!normalized) {
    return 0;
  }
  if (normalized.endsWith("%")) {
    return base * (Number.parseFloat(normalized) / 100);
  }
  const parsed = Number.parseFloat(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
};
var resolveCornerRadius = (value, width, height) => {
  const parts = value.trim().split(/\s+/).filter(Boolean);
  const horizontal = resolveCssLength(parts[0] ?? "0", width);
  const vertical = resolveCssLength(parts[1] ?? parts[0] ?? "0", height);
  return Math.min(horizontal, vertical);
};
var normalizeRadii = (radii, width, height) => {
  const top = radii.topLeft + radii.topRight;
  const bottom = radii.bottomLeft + radii.bottomRight;
  const left = radii.topLeft + radii.bottomLeft;
  const right = radii.topRight + radii.bottomRight;
  const scale = Math.min(
    1,
    top > 0 ? width / top : 1,
    bottom > 0 ? width / bottom : 1,
    left > 0 ? height / left : 1,
    right > 0 ? height / right : 1
  );
  return {
    topLeft: radii.topLeft * scale,
    topRight: radii.topRight * scale,
    bottomRight: radii.bottomRight * scale,
    bottomLeft: radii.bottomLeft * scale
  };
};
var resolveArrowOffset = (value, edgeLength) => {
  const normalized = value.trim();
  if (normalized.endsWith("%")) {
    return edgeLength * (Number.parseFloat(normalized) / 100);
  }
  const parsed = Number.parseFloat(normalized);
  return Number.isFinite(parsed) ? parsed : edgeLength / 2;
};
var createSurfacePath = ({
  placement,
  bodyWidth,
  bodyHeight,
  arrowHeight,
  arrowWidth,
  requestedArrowOffset,
  radii
}) => {
  let x0 = 0;
  let y0 = 0;
  let x1 = bodyWidth;
  let y1 = bodyHeight;
  let width = bodyWidth;
  let height = bodyHeight;
  let left = 0;
  let top = 0;
  if (placement === "top") {
    height += arrowHeight;
  }
  if (placement === "bottom") {
    y0 = arrowHeight;
    y1 = arrowHeight + bodyHeight;
    height += arrowHeight;
    top = -arrowHeight;
  }
  if (placement === "left") {
    width += arrowHeight;
  }
  if (placement === "right") {
    x0 = arrowHeight;
    x1 = arrowHeight + bodyWidth;
    width += arrowHeight;
    left = -arrowHeight;
  }
  let edgeLength = bodyWidth;
  let edgeStartRadius = radii.bottomLeft;
  let edgeEndRadius = radii.bottomRight;
  if (placement === "bottom") {
    edgeStartRadius = radii.topLeft;
    edgeEndRadius = radii.topRight;
  }
  if (placement === "left") {
    edgeLength = bodyHeight;
    edgeStartRadius = radii.topRight;
    edgeEndRadius = radii.bottomRight;
  }
  if (placement === "right") {
    edgeLength = bodyHeight;
    edgeStartRadius = radii.topLeft;
    edgeEndRadius = radii.bottomLeft;
  }
  const availableStraightEdge = Math.max(
    0,
    edgeLength - edgeStartRadius - edgeEndRadius - 2
  );
  const arrowHalf = Math.min(arrowWidth / 2, availableStraightEdge / 2);
  const minArrowCenter = edgeStartRadius + arrowHalf + 1;
  const maxArrowCenter = edgeLength - edgeEndRadius - arrowHalf - 1;
  const arrowCenter = minArrowCenter <= maxArrowCenter ? clamp2(requestedArrowOffset, minArrowCenter, maxArrowCenter) : edgeLength / 2;
  const tl = radii.topLeft;
  const tr = radii.topRight;
  const br = radii.bottomRight;
  const bl = radii.bottomLeft;
  let path = "";
  if (placement === "top") {
    path = [
      `M ${x0 + tl} ${y0}`,
      `H ${x1 - tr}`,
      `Q ${x1} ${y0} ${x1} ${y0 + tr}`,
      `V ${y1 - br}`,
      `Q ${x1} ${y1} ${x1 - br} ${y1}`,
      `H ${arrowCenter + arrowHalf}`,
      `L ${arrowCenter} ${y1 + arrowHeight}`,
      `L ${arrowCenter - arrowHalf} ${y1}`,
      `H ${x0 + bl}`,
      `Q ${x0} ${y1} ${x0} ${y1 - bl}`,
      `V ${y0 + tl}`,
      `Q ${x0} ${y0} ${x0 + tl} ${y0}`,
      "Z"
    ].join(" ");
  }
  if (placement === "bottom") {
    path = [
      `M ${x0 + tl} ${y0}`,
      `H ${arrowCenter - arrowHalf}`,
      `L ${arrowCenter} ${y0 - arrowHeight}`,
      `L ${arrowCenter + arrowHalf} ${y0}`,
      `H ${x1 - tr}`,
      `Q ${x1} ${y0} ${x1} ${y0 + tr}`,
      `V ${y1 - br}`,
      `Q ${x1} ${y1} ${x1 - br} ${y1}`,
      `H ${x0 + bl}`,
      `Q ${x0} ${y1} ${x0} ${y1 - bl}`,
      `V ${y0 + tl}`,
      `Q ${x0} ${y0} ${x0 + tl} ${y0}`,
      "Z"
    ].join(" ");
  }
  if (placement === "left") {
    path = [
      `M ${x0 + tl} ${y0}`,
      `H ${x1 - tr}`,
      `Q ${x1} ${y0} ${x1} ${y0 + tr}`,
      `V ${arrowCenter - arrowHalf}`,
      `L ${x1 + arrowHeight} ${arrowCenter}`,
      `L ${x1} ${arrowCenter + arrowHalf}`,
      `V ${y1 - br}`,
      `Q ${x1} ${y1} ${x1 - br} ${y1}`,
      `H ${x0 + bl}`,
      `Q ${x0} ${y1} ${x0} ${y1 - bl}`,
      `V ${y0 + tl}`,
      `Q ${x0} ${y0} ${x0 + tl} ${y0}`,
      "Z"
    ].join(" ");
  }
  if (placement === "right") {
    path = [
      `M ${x0 + tl} ${y0}`,
      `H ${x1 - tr}`,
      `Q ${x1} ${y0} ${x1} ${y0 + tr}`,
      `V ${y1 - br}`,
      `Q ${x1} ${y1} ${x1 - br} ${y1}`,
      `H ${x0 + bl}`,
      `Q ${x0} ${y1} ${x0} ${y1 - bl}`,
      `V ${arrowCenter + arrowHalf}`,
      `L ${x0 - arrowHeight} ${arrowCenter}`,
      `L ${x0} ${arrowCenter - arrowHalf}`,
      `V ${y0 + tl}`,
      `Q ${x0} ${y0} ${x0 + tl} ${y0}`,
      "Z"
    ].join(" ");
  }
  return {
    width,
    height,
    left,
    top,
    path
  };
};
var getStrokeConfig = (computedStyle) => {
  const widths = [
    Number.parseFloat(computedStyle.borderTopWidth) || 0,
    Number.parseFloat(computedStyle.borderRightWidth) || 0,
    Number.parseFloat(computedStyle.borderBottomWidth) || 0,
    Number.parseFloat(computedStyle.borderLeftWidth) || 0
  ];
  const styles = [
    computedStyle.borderTopStyle,
    computedStyle.borderRightStyle,
    computedStyle.borderBottomStyle,
    computedStyle.borderLeftStyle
  ];
  const colors = [
    computedStyle.borderTopColor,
    computedStyle.borderRightColor,
    computedStyle.borderBottomColor,
    computedStyle.borderLeftColor
  ];
  const activeIndexes = widths.map((width, index) => ({
    width,
    index
  })).filter(({ width, index }) => {
    return width > 0 && styles[index] !== "none" && styles[index] !== "hidden";
  });
  if (!activeIndexes.length) {
    return {
      strokeWidth: 0,
      strokeColor: "transparent",
      strokeDasharray: void 0,
      strokeLinecap: void 0
    };
  }
  const active = activeIndexes.reduce((largest, current) => {
    return current.width > largest.width ? current : largest;
  });
  const strokeWidth = active.width;
  const strokeStyle = styles[active.index];
  const strokeColor = colors[active.index];
  if (strokeStyle === "dashed") {
    return {
      strokeWidth,
      strokeColor,
      strokeDasharray: `${strokeWidth * 3} ${strokeWidth * 2}`,
      strokeLinecap: "butt"
    };
  }
  if (strokeStyle === "dotted") {
    return {
      strokeWidth,
      strokeColor,
      strokeDasharray: `${strokeWidth} ${strokeWidth * 1.6}`,
      strokeLinecap: "round"
    };
  }
  return {
    strokeWidth,
    strokeColor,
    strokeDasharray: void 0,
    strokeLinecap: "round"
  };
};
var createMaskImage = (width, height, path) => {
  const svg = [
    '<svg xmlns="http://www.w3.org/2000/svg"',
    ` viewBox="0 0 ${width} ${height}"`,
    ` width="${width}"`,
    ` height="${height}">`,
    `<path fill="white" d="${path}"/>`,
    "</svg>"
  ].join("");
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
};
var TooltipSurface = ({
  placement,
  arrowOffset,
  surfaceStyle,
  fillStyle,
  surfaceClassName,
  filter
}) => {
  const surfaceProbeRef = (0, import_react3.useRef)(null);
  const arrowProbeRef = (0, import_react3.useRef)(null);
  const [metrics, setMetrics] = (0, import_react3.useState)(EMPTY_METRICS);
  const surfaceProbeStyle = {
    "--tooltip-surface-border-top-width": surfaceStyle?.borderTopWidth,
    "--tooltip-surface-border-right-width": surfaceStyle?.borderRightWidth,
    "--tooltip-surface-border-bottom-width": surfaceStyle?.borderBottomWidth,
    "--tooltip-surface-border-left-width": surfaceStyle?.borderLeftWidth,
    "--tooltip-surface-border-top-style": surfaceStyle?.borderTopStyle,
    "--tooltip-surface-border-right-style": surfaceStyle?.borderRightStyle,
    "--tooltip-surface-border-bottom-style": surfaceStyle?.borderBottomStyle,
    "--tooltip-surface-border-left-style": surfaceStyle?.borderLeftStyle,
    "--tooltip-surface-border-top-color": surfaceStyle?.borderTopColor,
    "--tooltip-surface-border-right-color": surfaceStyle?.borderRightColor,
    "--tooltip-surface-border-bottom-color": surfaceStyle?.borderBottomColor,
    "--tooltip-surface-border-left-color": surfaceStyle?.borderLeftColor,
    "--tooltip-surface-border-top-left-radius": surfaceStyle?.borderTopLeftRadius,
    "--tooltip-surface-border-top-right-radius": surfaceStyle?.borderTopRightRadius,
    "--tooltip-surface-border-bottom-right-radius": surfaceStyle?.borderBottomRightRadius,
    "--tooltip-surface-border-bottom-left-radius": surfaceStyle?.borderBottomLeftRadius
  };
  (0, import_react3.useLayoutEffect)(() => {
    const surfaceProbe = surfaceProbeRef.current;
    const arrowProbe = arrowProbeRef.current;
    if (!surfaceProbe || !arrowProbe) {
      return;
    }
    const body = surfaceProbe.parentElement;
    if (!body) {
      return;
    }
    const update = () => {
      const bodyWidth = body.offsetWidth;
      const bodyHeight = body.offsetHeight;
      if (bodyWidth <= 0 || bodyHeight <= 0) {
        return;
      }
      surfaceProbe.style.width = `${bodyWidth}px`;
      surfaceProbe.style.height = `${bodyHeight}px`;
      const surfaceComputedStyle = window.getComputedStyle(surfaceProbe);
      const background = surfaceComputedStyle.background;
      const arrowComputedStyle = window.getComputedStyle(arrowProbe);
      const arrowHeight = Number.parseFloat(arrowComputedStyle.height) || 6;
      const arrowWidth = Number.parseFloat(arrowComputedStyle.width) || arrowHeight * 2;
      const radii = normalizeRadii(
        {
          topLeft: resolveCornerRadius(
            surfaceComputedStyle.borderTopLeftRadius,
            bodyWidth,
            bodyHeight
          ),
          topRight: resolveCornerRadius(
            surfaceComputedStyle.borderTopRightRadius,
            bodyWidth,
            bodyHeight
          ),
          bottomRight: resolveCornerRadius(
            surfaceComputedStyle.borderBottomRightRadius,
            bodyWidth,
            bodyHeight
          ),
          bottomLeft: resolveCornerRadius(
            surfaceComputedStyle.borderBottomLeftRadius,
            bodyWidth,
            bodyHeight
          )
        },
        bodyWidth,
        bodyHeight
      );
      const requestedArrowOffset = resolveArrowOffset(
        arrowOffset,
        placement === "top" || placement === "bottom" ? bodyWidth : bodyHeight
      );
      const surface = createSurfacePath({
        placement,
        bodyWidth,
        bodyHeight,
        arrowHeight,
        arrowWidth,
        requestedArrowOffset,
        radii
      });
      const stroke = getStrokeConfig(surfaceComputedStyle);
      const nextMetrics = {
        ...surface,
        ...stroke,
        background
      };
      setMetrics((current) => {
        if (current.width === nextMetrics.width && current.height === nextMetrics.height && current.left === nextMetrics.left && current.top === nextMetrics.top && current.path === nextMetrics.path && current.background === nextMetrics.background && current.strokeWidth === nextMetrics.strokeWidth && current.strokeColor === nextMetrics.strokeColor && current.strokeDasharray === nextMetrics.strokeDasharray && current.strokeLinecap === nextMetrics.strokeLinecap) {
          return current;
        }
        return nextMetrics;
      });
    };
    update();
    const resizeObserver = new ResizeObserver(update);
    resizeObserver.observe(body);
    window.addEventListener("resize", update);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [arrowOffset, placement, surfaceStyle, surfaceClassName]);
  const maskImage = metrics.path ? createMaskImage(metrics.width, metrics.height, metrics.path) : void 0;
  const resolvedFillStyle = {
    ...fillStyle,
    background: metrics.background || "var(--tooltip-bg)",
    maskImage,
    maskPosition: "0 0",
    maskRepeat: "no-repeat",
    maskSize: "100% 100%",
    WebkitMaskImage: maskImage,
    WebkitMaskPosition: "0 0",
    WebkitMaskRepeat: "no-repeat",
    WebkitMaskSize: "100% 100%"
  };
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      "div",
      {
        ref: surfaceProbeRef,
        className: ["tooltip-surface-probe", surfaceClassName].filter(Boolean).join(" "),
        style: surfaceProbeStyle
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { ref: arrowProbeRef, className: "tooltip-arrow-probe" }),
    metrics.path ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
      "div",
      {
        className: "tooltip-surface",
        style: {
          width: metrics.width,
          height: metrics.height,
          left: metrics.left,
          top: metrics.top,
          filter
        },
        "aria-hidden": "true",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            "div",
            {
              className: "tooltip-surface__fill",
              style: resolvedFillStyle
            }
          ),
          metrics.strokeWidth > 0 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            "svg",
            {
              className: "tooltip-surface__stroke",
              width: metrics.width,
              height: metrics.height,
              viewBox: `0 0 ${metrics.width} ${metrics.height}`,
              children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                "path",
                {
                  d: metrics.path,
                  fill: "none",
                  stroke: metrics.strokeColor,
                  strokeWidth: metrics.strokeWidth,
                  strokeDasharray: metrics.strokeDasharray,
                  strokeLinecap: metrics.strokeLinecap,
                  strokeLinejoin: "round",
                  vectorEffect: "non-scaling-stroke"
                }
              )
            }
          ) : null
        ]
      }
    ) : null
  ] });
};

// src/components/Tooltip.tsx
var import_jsx_runtime3 = require("react/jsx-runtime");
var DEFAULT_SHOW_ANIMATION = "slide";
var DEFAULT_HIDE_ANIMATION = "fade";
var assignRef = (ref, value) => {
  if (typeof ref === "function") {
    ref(value);
    return;
  }
  if (ref) {
    ref.current = value;
  }
};
var Tooltip = ({
  content,
  children,
  position,
  selectTheme,
  customTheme,
  animation,
  disabled = false,
  interactive,
  hideDelay
}) => {
  const defaults = useTooltipDefaults();
  const markerRef = (0, import_react4.useRef)(null);
  const [anchor, setAnchor] = (0, import_react4.useState)(null);
  const trigger = children ? import_react4.Children.only(children) : null;
  const triggerRef = trigger?.props.ref;
  const setTriggerRef = (0, import_react4.useCallback)(
    (node) => {
      assignRef(triggerRef, node);
      setAnchor(node);
    },
    [triggerRef]
  );
  (0, import_react4.useLayoutEffect)(() => {
    if (trigger) {
      return;
    }
    const marker = markerRef.current;
    const parent = marker?.parentElement ?? null;
    setAnchor(parent);
    return () => {
      setAnchor(null);
    };
  }, [trigger]);
  const inheritedTheme = (0, import_react4.useMemo)(() => {
    return mergeThemes(presets[defaults.selectTheme], defaults.customTheme);
  }, [defaults.customTheme, defaults.selectTheme]);
  const theme = (0, import_react4.useMemo)(() => {
    if (selectTheme) {
      return mergeThemes(presets[selectTheme], customTheme);
    }
    return mergeThemes(inheritedTheme, customTheme);
  }, [customTheme, inheritedTheme, selectTheme]);
  const resolvedThemeStyles = (0, import_react4.useMemo)(() => {
    return resolveThemeStyles(theme);
  }, [theme]);
  const localThemeAnimation = selectTheme ? theme.animation : customTheme?.animation;
  const showAnimation = animation?.show ?? localThemeAnimation?.show ?? defaults.animation?.show ?? inheritedTheme.animation?.show ?? DEFAULT_SHOW_ANIMATION;
  const hideAnimation = animation?.hide ?? localThemeAnimation?.hide ?? defaults.animation?.hide ?? inheritedTheme.animation?.hide ?? DEFAULT_HIDE_ANIMATION;
  const animationSpeed = animation?.speed ?? localThemeAnimation?.speed ?? defaults.animation?.speed ?? inheritedTheme.animation?.speed ?? "120ms";
  const animationEasing = animation?.easing ?? localThemeAnimation?.easing ?? defaults.animation?.easing ?? inheritedTheme.animation?.easing ?? "ease-in-out";
  const preferredPlacement = position ?? defaults.defaultRenderPosition;
  const resolvedInteractive = interactive ?? defaults.interactive;
  const resolvedHideDelay = hideDelay ?? defaults.hideDelay;
  const {
    shouldRender,
    phase,
    placement,
    position: tooltipPosition,
    tooltipRef,
    bodyRef,
    onAnimationEnd
  } = useTooltip({
    anchor,
    preferredPlacement,
    disabled: disabled || content === null || content === void 0,
    interactive: resolvedInteractive,
    hideDelay: resolvedHideDelay
  });
  const arrowSize = theme.arrow?.size ?? "6px";
  const arrowWidth = theme.arrow?.width ?? `calc(${arrowSize} * 2)`;
  const containerStyle = {
    "--tooltip-bg": resolvedThemeStyles.background,
    "--tooltip-color": resolvedThemeStyles.color,
    "--tooltip-arrow-size": arrowSize,
    "--tooltip-arrow-width": arrowWidth,
    "--tooltip-animation-speed": animationSpeed,
    "--tooltip-animation-easing": animationEasing,
    ...tooltipPosition
  };
  const arrowOffset = String(
    tooltipPosition["--tooltip-arrow-offset"] ?? "50%"
  );
  const handleAnimationEnd = (event) => {
    if (event.target !== event.currentTarget) {
      return;
    }
    onAnimationEnd();
  };
  const triggerElement = trigger ? (0, import_react4.cloneElement)(trigger, {
    ref: setTriggerRef
  }) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { ref: markerRef, hidden: true, "aria-hidden": "true" });
  const portal = shouldRender && typeof document !== "undefined" ? (0, import_react_dom.createPortal)(
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
      "div",
      {
        ref: tooltipRef,
        className: [
          "tooltip-container",
          `tooltip-container--${placement}`,
          `tooltip-container--phase-${phase}`,
          `tooltip-container--show-${showAnimation}`,
          `tooltip-container--hide-${hideAnimation}`,
          resolvedInteractive ? "tooltip-container--interactive" : null
        ].filter(Boolean).join(" "),
        style: containerStyle,
        children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
          "div",
          {
            ref: bodyRef,
            className: "tooltip-body",
            onAnimationEnd: handleAnimationEnd,
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                TooltipSurface,
                {
                  placement,
                  surfaceClassName: theme.body?.className,
                  arrowOffset,
                  surfaceStyle: resolvedThemeStyles.surfaceStyle,
                  fillStyle: resolvedThemeStyles.fillStyle,
                  filter: resolvedThemeStyles.filter
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                "div",
                {
                  className: [
                    "tooltip-body__content",
                    theme.body?.className
                  ].filter(Boolean).join(" "),
                  style: {
                    ...resolvedThemeStyles.contentStyle,
                    background: "transparent",
                    border: 0
                  },
                  children: content
                }
              )
            ]
          }
        )
      }
    ),
    document.body
  ) : null;
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_jsx_runtime3.Fragment, { children: [
    triggerElement,
    portal
  ] });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Tooltip,
  TooltipProvider
});
//# sourceMappingURL=index.js.map