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
  Popup: () => Popup,
  popupPresets: () => popupPresets
});
module.exports = __toCommonJS(index_exports);

// src/components/Popup.tsx
var import_react = require("react");
var import_react_dom = require("react-dom");

// src/config/presets.ts
var createPreset = ({
  animation,
  layerBackground,
  layerBlur = "0px",
  background,
  color,
  border = "1px solid transparent",
  borderRadius = "18px",
  boxShadow = "0 24px 70px rgba(0, 0, 0, 0.3)",
  closeBackground = "rgba(255, 255, 255, 0.12)",
  closeColor,
  closeBorder = "1px solid rgba(255, 255, 255, 0.14)",
  closeShadow = "0 6px 20px rgba(0, 0, 0, 0.16)",
  containerStyle,
  headerStyle,
  bodyStyle
}) => {
  const resolvedCloseColor = closeColor ?? color;
  return {
    animation,
    layer: {
      backgroundColor: layerBackground,
      blur: layerBlur
    },
    close: {
      style: {
        color: resolvedCloseColor,
        background: closeBackground,
        border: closeBorder,
        boxShadow: closeShadow,
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)"
      },
      timer: {
        style: {
          color: resolvedCloseColor,
          background: closeBackground
        }
      }
    },
    customStyle: {
      container: {
        style: {
          color,
          background,
          border,
          borderRadius,
          boxShadow,
          ...containerStyle
        }
      },
      header: {
        style: {
          color,
          ...headerStyle
        }
      },
      body: {
        style: {
          color,
          ...bodyStyle
        }
      }
    }
  };
};
var popupPresets = {
  glass: createPreset({
    animation: {
      open: {
        animationName: "blur-in"
      },
      close: {
        animationName: "blur-out"
      }
    },
    layerBackground: "rgba(6, 8, 18, 0.45)",
    layerBlur: "8px",
    background: "rgba(24, 27, 40, 0.7)",
    color: "#ffffff",
    border: "1px solid rgba(255, 255, 255, 0.16)",
    borderRadius: "22px",
    boxShadow: "0 30px 80px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
    closeBackground: "rgba(255, 255, 255, 0.1)",
    containerStyle: {
      backdropFilter: "blur(28px) saturate(145%)",
      WebkitBackdropFilter: "blur(28px) saturate(145%)"
    }
  }),
  frosted: createPreset({
    animation: {
      open: {
        animationName: "float-in"
      },
      close: {
        animationName: "float-out"
      }
    },
    layerBackground: "rgba(224, 232, 244, 0.35)",
    layerBlur: "14px",
    background: "rgba(255, 255, 255, 0.68)",
    color: "#172033",
    border: "1px solid rgba(255, 255, 255, 0.75)",
    borderRadius: "24px",
    boxShadow: "0 30px 80px rgba(38, 54, 84, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.9)",
    closeBackground: "rgba(255, 255, 255, 0.55)",
    closeBorder: "1px solid rgba(71, 85, 105, 0.12)",
    containerStyle: {
      backdropFilter: "blur(30px) saturate(140%)",
      WebkitBackdropFilter: "blur(30px) saturate(140%)"
    }
  }),
  midnight: createPreset({
    animation: {
      open: {
        animationName: "zoom-in"
      },
      close: {
        animationName: "zoom-out"
      }
    },
    layerBackground: "rgba(1, 5, 18, 0.78)",
    layerBlur: "5px",
    background: "linear-gradient(145deg, #111827 0%, #0b1120 48%, #020617 100%)",
    color: "#e2e8f0",
    border: "1px solid rgba(100, 116, 139, 0.24)",
    boxShadow: "0 30px 90px rgba(0, 0, 0, 0.65), 0 0 60px rgba(30, 64, 175, 0.08)",
    closeBackground: "rgba(148, 163, 184, 0.1)",
    closeBorder: "1px solid rgba(148, 163, 184, 0.16)"
  }),
  graphite: createPreset({
    animation: {
      open: {
        animationName: "fade-in"
      },
      close: {
        animationName: "fade-out"
      }
    },
    layerBackground: "rgba(12, 12, 14, 0.72)",
    layerBlur: "3px",
    background: "linear-gradient(145deg, #303035 0%, #222226 55%, #18181b 100%)",
    color: "#f4f4f5",
    border: "1px solid rgba(255, 255, 255, 0.07)",
    borderRadius: "14px",
    boxShadow: "0 24px 70px rgba(0, 0, 0, 0.55)",
    closeBackground: "rgba(255, 255, 255, 0.07)"
  }),
  obsidian: createPreset({
    animation: {
      open: {
        animationName: "pop-in"
      },
      close: {
        animationName: "pop-out"
      }
    },
    layerBackground: "rgba(0, 0, 0, 0.82)",
    layerBlur: "2px",
    background: "linear-gradient(135deg, #111111 0%, #050505 55%, #000000 100%)",
    color: "#fafafa",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "16px",
    boxShadow: "0 34px 100px rgba(0, 0, 0, 0.85), inset 0 1px 0 rgba(255, 255, 255, 0.06)",
    closeBackground: "#111111",
    closeBorder: "1px solid #27272a"
  }),
  snow: createPreset({
    animation: {
      open: {
        animationName: "slide-up-in"
      },
      close: {
        animationName: "slide-up-out"
      }
    },
    layerBackground: "rgba(226, 232, 240, 0.72)",
    layerBlur: "4px",
    background: "#ffffff",
    color: "#0f172a",
    border: "1px solid #e2e8f0",
    borderRadius: "18px",
    boxShadow: "0 25px 70px rgba(15, 23, 42, 0.16)",
    closeBackground: "#f1f5f9",
    closeBorder: "1px solid #e2e8f0"
  }),
  ivory: createPreset({
    animation: {
      open: {
        animationName: "breathe-in"
      },
      close: {
        animationName: "breathe-out"
      }
    },
    layerBackground: "rgba(73, 57, 39, 0.3)",
    layerBlur: "5px",
    background: "linear-gradient(145deg, #fffdf7 0%, #faf4e8 55%, #f6eddd 100%)",
    color: "#43372d",
    border: "1px solid rgba(120, 96, 68, 0.16)",
    borderRadius: "20px",
    boxShadow: "0 26px 70px rgba(83, 63, 43, 0.2)",
    closeBackground: "rgba(120, 96, 68, 0.08)",
    closeBorder: "1px solid rgba(120, 96, 68, 0.14)"
  }),
  ocean: createPreset({
    animation: {
      open: {
        animationName: "slide-up-in"
      },
      close: {
        animationName: "slide-down-out"
      }
    },
    layerBackground: "rgba(3, 22, 46, 0.62)",
    layerBlur: "7px",
    background: "linear-gradient(145deg, #0ea5e9 0%, #2563eb 48%, #1e3a8a 100%)",
    color: "#ffffff",
    border: "1px solid rgba(186, 230, 253, 0.2)",
    borderRadius: "22px",
    boxShadow: "0 30px 90px rgba(3, 105, 161, 0.45), 0 0 55px rgba(56, 189, 248, 0.16)",
    closeBackground: "rgba(255, 255, 255, 0.13)"
  }),
  aqua: createPreset({
    animation: {
      open: {
        animationName: "float-in"
      },
      close: {
        animationName: "float-out"
      }
    },
    layerBackground: "rgba(6, 78, 89, 0.45)",
    layerBlur: "8px",
    background: "linear-gradient(145deg, #22d3ee 0%, #06b6d4 45%, #0891b2 100%)",
    color: "#083344",
    border: "1px solid rgba(207, 250, 254, 0.45)",
    borderRadius: "24px",
    boxShadow: "0 28px 80px rgba(8, 145, 178, 0.38)",
    closeBackground: "rgba(236, 254, 255, 0.4)",
    closeBorder: "1px solid rgba(8, 51, 68, 0.12)"
  }),
  emerald: createPreset({
    animation: {
      open: {
        animationName: "zoom-in"
      },
      close: {
        animationName: "zoom-out"
      }
    },
    layerBackground: "rgba(2, 44, 34, 0.62)",
    layerBlur: "5px",
    background: "linear-gradient(145deg, #10b981 0%, #059669 48%, #065f46 100%)",
    color: "#ecfdf5",
    border: "1px solid rgba(167, 243, 208, 0.22)",
    borderRadius: "20px",
    boxShadow: "0 30px 80px rgba(5, 150, 105, 0.38)",
    closeBackground: "rgba(236, 253, 245, 0.12)"
  }),
  forest: createPreset({
    animation: {
      open: {
        animationName: "slide-right-in"
      },
      close: {
        animationName: "slide-right-out"
      }
    },
    layerBackground: "rgba(4, 27, 20, 0.7)",
    layerBlur: "5px",
    background: "linear-gradient(145deg, #214e34 0%, #153c28 50%, #0d2818 100%)",
    color: "#dcfce7",
    border: "1px solid rgba(134, 239, 172, 0.15)",
    borderRadius: "18px",
    boxShadow: "0 28px 85px rgba(0, 0, 0, 0.48)",
    closeBackground: "rgba(187, 247, 208, 0.08)"
  }),
  mint: createPreset({
    animation: {
      open: {
        animationName: "breathe-in"
      },
      close: {
        animationName: "breathe-out"
      }
    },
    layerBackground: "rgba(110, 231, 183, 0.22)",
    layerBlur: "10px",
    background: "linear-gradient(145deg, #ecfdf5 0%, #d1fae5 50%, #a7f3d0 100%)",
    color: "#064e3b",
    border: "1px solid rgba(5, 150, 105, 0.16)",
    borderRadius: "26px",
    boxShadow: "0 26px 75px rgba(6, 95, 70, 0.2)",
    closeBackground: "rgba(255, 255, 255, 0.48)",
    closeBorder: "1px solid rgba(6, 95, 70, 0.12)"
  }),
  amber: createPreset({
    animation: {
      open: {
        animationName: "pop-in"
      },
      close: {
        animationName: "pop-out"
      }
    },
    layerBackground: "rgba(69, 39, 5, 0.48)",
    layerBlur: "5px",
    background: "linear-gradient(145deg, #fbbf24 0%, #f59e0b 52%, #d97706 100%)",
    color: "#451a03",
    border: "1px solid rgba(255, 251, 235, 0.4)",
    borderRadius: "20px",
    boxShadow: "0 30px 85px rgba(217, 119, 6, 0.4)",
    closeBackground: "rgba(255, 255, 255, 0.28)",
    closeBorder: "1px solid rgba(69, 26, 3, 0.1)"
  }),
  sunset: createPreset({
    animation: {
      open: {
        animationName: "drop-in"
      },
      close: {
        animationName: "drop-out"
      }
    },
    layerBackground: "rgba(65, 20, 35, 0.56)",
    layerBlur: "6px",
    background: "linear-gradient(135deg, #fb7185 0%, #f97316 48%, #f59e0b 100%)",
    color: "#ffffff",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    borderRadius: "24px",
    boxShadow: "0 30px 90px rgba(190, 24, 93, 0.32), 0 0 55px rgba(249, 115, 22, 0.2)",
    closeBackground: "rgba(255, 255, 255, 0.15)"
  }),
  coral: createPreset({
    animation: {
      open: {
        animationName: "bounce-in"
      },
      close: {
        animationName: "bounce-out"
      }
    },
    layerBackground: "rgba(105, 41, 41, 0.38)",
    layerBlur: "5px",
    background: "linear-gradient(145deg, #fb7185 0%, #f87171 55%, #ef4444 100%)",
    color: "#ffffff",
    border: "1px solid rgba(255, 255, 255, 0.22)",
    borderRadius: "26px",
    boxShadow: "0 28px 80px rgba(239, 68, 68, 0.35)",
    closeBackground: "rgba(255, 255, 255, 0.16)"
  }),
  rose: createPreset({
    animation: {
      open: {
        animationName: "pulse-in"
      },
      close: {
        animationName: "pulse-out"
      }
    },
    layerBackground: "rgba(136, 19, 55, 0.24)",
    layerBlur: "8px",
    background: "linear-gradient(145deg, #fff1f2 0%, #ffe4e6 50%, #fecdd3 100%)",
    color: "#881337",
    border: "1px solid rgba(190, 18, 60, 0.12)",
    borderRadius: "28px",
    boxShadow: "0 30px 80px rgba(190, 18, 60, 0.2)",
    closeBackground: "rgba(255, 255, 255, 0.5)",
    closeBorder: "1px solid rgba(190, 18, 60, 0.12)"
  }),
  ruby: createPreset({
    animation: {
      open: {
        animationName: "heartbeat-in"
      },
      close: {
        animationName: "heartbeat-out"
      }
    },
    layerBackground: "rgba(50, 4, 13, 0.7)",
    layerBlur: "4px",
    background: "linear-gradient(145deg, #e11d48 0%, #be123c 48%, #881337 100%)",
    color: "#fff1f2",
    border: "1px solid rgba(254, 205, 211, 0.18)",
    borderRadius: "20px",
    boxShadow: "0 30px 90px rgba(136, 19, 55, 0.5)",
    closeBackground: "rgba(255, 241, 242, 0.12)"
  }),
  wine: createPreset({
    animation: {
      open: {
        animationName: "slide-down-in"
      },
      close: {
        animationName: "slide-down-out"
      }
    },
    layerBackground: "rgba(36, 7, 17, 0.74)",
    layerBlur: "6px",
    background: "linear-gradient(145deg, #701a3f 0%, #4c1630 52%, #2d0a1b 100%)",
    color: "#fce7f3",
    border: "1px solid rgba(251, 207, 232, 0.14)",
    borderRadius: "18px",
    boxShadow: "0 30px 90px rgba(30, 5, 15, 0.62)",
    closeBackground: "rgba(251, 207, 232, 0.08)"
  }),
  violet: createPreset({
    animation: {
      open: {
        animationName: "zoom-in"
      },
      close: {
        animationName: "zoom-out"
      }
    },
    layerBackground: "rgba(33, 14, 62, 0.6)",
    layerBlur: "7px",
    background: "linear-gradient(145deg, #8b5cf6 0%, #7c3aed 48%, #5b21b6 100%)",
    color: "#ffffff",
    border: "1px solid rgba(237, 233, 254, 0.2)",
    borderRadius: "22px",
    boxShadow: "0 32px 90px rgba(91, 33, 182, 0.48), 0 0 60px rgba(139, 92, 246, 0.18)",
    closeBackground: "rgba(255, 255, 255, 0.13)"
  }),
  lavender: createPreset({
    animation: {
      open: {
        animationName: "float-in"
      },
      close: {
        animationName: "float-out"
      }
    },
    layerBackground: "rgba(139, 92, 246, 0.2)",
    layerBlur: "10px",
    background: "linear-gradient(145deg, #f5f3ff 0%, #ede9fe 52%, #ddd6fe 100%)",
    color: "#4c1d95",
    border: "1px solid rgba(124, 58, 237, 0.12)",
    borderRadius: "28px",
    boxShadow: "0 30px 85px rgba(91, 33, 182, 0.2)",
    closeBackground: "rgba(255, 255, 255, 0.55)",
    closeBorder: "1px solid rgba(91, 33, 182, 0.12)"
  }),
  aurora: createPreset({
    animation: {
      open: {
        animationName: "glow-in"
      },
      close: {
        animationName: "glow-out"
      }
    },
    layerBackground: "rgba(8, 15, 30, 0.66)",
    layerBlur: "10px",
    background: "linear-gradient(135deg, #06b6d4 0%, #8b5cf6 48%, #ec4899 100%)",
    color: "#ffffff",
    border: "1px solid rgba(255, 255, 255, 0.22)",
    borderRadius: "26px",
    boxShadow: "0 30px 90px rgba(139, 92, 246, 0.4), 0 0 70px rgba(6, 182, 212, 0.2)",
    closeBackground: "rgba(255, 255, 255, 0.14)"
  }),
  cosmic: createPreset({
    animation: {
      open: {
        animationName: "tilt-in"
      },
      close: {
        animationName: "tilt-out"
      }
    },
    layerBackground: "rgba(2, 0, 16, 0.82)",
    layerBlur: "7px",
    background: "radial-gradient(circle at 20% 15%, rgba(168, 85, 247, 0.55), transparent 34%), radial-gradient(circle at 85% 80%, rgba(59, 130, 246, 0.42), transparent 38%), linear-gradient(145deg, #170b35 0%, #090418 100%)",
    color: "#f5f3ff",
    border: "1px solid rgba(196, 181, 253, 0.18)",
    borderRadius: "24px",
    boxShadow: "0 34px 100px rgba(0, 0, 0, 0.7), 0 0 65px rgba(124, 58, 237, 0.22)",
    closeBackground: "rgba(196, 181, 253, 0.1)"
  }),
  neon: createPreset({
    animation: {
      open: {
        animationName: "glow-in"
      },
      close: {
        animationName: "glow-out"
      }
    },
    layerBackground: "rgba(0, 0, 0, 0.88)",
    layerBlur: "2px",
    background: "#050607",
    color: "#67e8f9",
    border: "1px solid #22d3ee",
    borderRadius: "10px",
    boxShadow: "0 0 8px rgba(34, 211, 238, 0.6), 0 0 30px rgba(34, 211, 238, 0.3), 0 0 70px rgba(217, 70, 239, 0.18)",
    closeBackground: "rgba(34, 211, 238, 0.08)",
    closeBorder: "1px solid #22d3ee",
    closeShadow: "0 0 14px rgba(34, 211, 238, 0.32)"
  }),
  cyber: createPreset({
    animation: {
      open: {
        animationName: "glitch-in"
      },
      close: {
        animationName: "glitch-out"
      }
    },
    layerBackground: "rgba(4, 3, 12, 0.9)",
    layerBlur: "1px",
    background: "linear-gradient(135deg, #070611 0%, #111028 60%, #170d26 100%)",
    color: "#f0fdf4",
    border: "1px solid #d946ef",
    borderRadius: "4px",
    boxShadow: "8px 8px 0 rgba(34, 211, 238, 0.35), -8px -8px 0 rgba(217, 70, 239, 0.24), 0 30px 80px rgba(0, 0, 0, 0.62)",
    closeBackground: "#111028",
    closeColor: "#22d3ee",
    closeBorder: "1px solid #22d3ee"
  }),
  terminal: createPreset({
    animation: {
      open: {
        animationName: "press-in"
      },
      close: {
        animationName: "press-out"
      }
    },
    layerBackground: "rgba(0, 0, 0, 0.9)",
    layerBlur: "0px",
    background: "#06110a",
    color: "#4ade80",
    border: "1px solid #22c55e",
    borderRadius: "6px",
    boxShadow: "0 0 28px rgba(34, 197, 94, 0.14), 0 28px 80px rgba(0, 0, 0, 0.68)",
    closeBackground: "#0b1d10",
    closeColor: "#4ade80",
    closeBorder: "1px solid rgba(74, 222, 128, 0.5)",
    containerStyle: {
      fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
    }
  }),
  steel: createPreset({
    animation: {
      open: {
        animationName: "slide-left-in"
      },
      close: {
        animationName: "slide-left-out"
      }
    },
    layerBackground: "rgba(15, 23, 42, 0.68)",
    layerBlur: "5px",
    background: "linear-gradient(145deg, #64748b 0%, #475569 48%, #334155 100%)",
    color: "#f8fafc",
    border: "1px solid rgba(226, 232, 240, 0.22)",
    borderRadius: "14px",
    boxShadow: "0 28px 80px rgba(15, 23, 42, 0.52), inset 0 1px 0 rgba(255, 255, 255, 0.12)",
    closeBackground: "rgba(226, 232, 240, 0.1)"
  }),
  chrome: createPreset({
    animation: {
      open: {
        animationName: "flip-y-in"
      },
      close: {
        animationName: "flip-y-out"
      }
    },
    layerBackground: "rgba(30, 41, 59, 0.5)",
    layerBlur: "6px",
    background: "linear-gradient(135deg, #f8fafc 0%, #cbd5e1 18%, #f8fafc 38%, #94a3b8 60%, #e2e8f0 80%, #f8fafc 100%)",
    color: "#0f172a",
    border: "1px solid rgba(255, 255, 255, 0.8)",
    borderRadius: "16px",
    boxShadow: "0 30px 80px rgba(15, 23, 42, 0.3), inset 0 1px 1px rgba(255, 255, 255, 0.9)",
    closeBackground: "linear-gradient(145deg, rgba(255,255,255,.8), rgba(148,163,184,.35))",
    closeBorder: "1px solid rgba(71, 85, 105, 0.22)"
  }),
  paper: createPreset({
    animation: {
      open: {
        animationName: "slide-up-in"
      },
      close: {
        animationName: "slide-up-out"
      }
    },
    layerBackground: "rgba(68, 64, 60, 0.34)",
    layerBlur: "3px",
    background: "#f8f4e8",
    color: "#292524",
    border: "1px solid #ded7c6",
    borderRadius: "3px",
    boxShadow: "0 3px 5px rgba(41, 37, 36, 0.08), 0 25px 60px rgba(41, 37, 36, 0.2)",
    closeBackground: "#eee8da",
    closeBorder: "1px solid #d6cebc"
  }),
  clay: createPreset({
    animation: {
      open: {
        animationName: "bounce-in"
      },
      close: {
        animationName: "bounce-out"
      }
    },
    layerBackground: "rgba(78, 45, 34, 0.34)",
    layerBlur: "6px",
    background: "linear-gradient(145deg, #db9b80 0%, #c97d60 50%, #b66348 100%)",
    color: "#3d1f16",
    border: "1px solid rgba(255, 236, 226, 0.3)",
    borderRadius: "32px",
    boxShadow: "14px 14px 32px rgba(106, 55, 38, 0.28), -8px -8px 24px rgba(255, 210, 191, 0.16)",
    closeBackground: "rgba(255, 224, 211, 0.26)",
    closeBorder: "1px solid rgba(75, 37, 25, 0.12)"
  }),
  minimal: createPreset({
    animation: {
      open: {
        animationName: "fade-in",
        duration: 300
      },
      close: {
        animationName: "fade-out",
        duration: 250
      }
    },
    layerBackground: "rgba(15, 23, 42, 0.3)",
    layerBlur: "2px",
    background: "#ffffff",
    color: "#18181b",
    border: "1px solid #e4e4e7",
    borderRadius: "12px",
    boxShadow: "0 18px 50px rgba(24, 24, 27, 0.12)",
    closeBackground: "transparent",
    closeBorder: "1px solid transparent",
    closeShadow: "none"
  })
};

// src/config/styles-config.ts
var stylesConfig = {
  index: 99999,
  animation: {
    open: {
      animationName: "fade-in",
      duration: 0,
      easing: "linear"
    },
    close: {
      animationName: "fade-out",
      duration: 0,
      easing: "linear"
    }
  },
  layer: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    blur: "0px",
    className: "",
    style: {}
  },
  close: {
    className: "",
    style: {},
    timer: {
      className: "",
      style: {}
    }
  },
  customStyle: {
    container: {
      className: "",
      style: {}
    },
    header: {
      className: "",
      style: {}
    },
    body: {
      className: "",
      style: {}
    }
  }
};

// src/utils/merge.ts
var resolveTime = (value) => {
  if (typeof value === "number") {
    if (!Number.isFinite(value)) {
      return "0ms";
    }
    return `${Math.max(0, value)}ms`;
  }
  return value;
};
var resolveOptionalTime = (value) => {
  if (value === void 0) {
    return void 0;
  }
  return resolveTime(value);
};
var resolveBlur = (value) => {
  if (typeof value === "number") {
    if (!Number.isFinite(value)) {
      return "0px";
    }
    return `${Math.max(0, value)}px`;
  }
  return value;
};
var resolveAnimation = (defaults, presetAnimation, presetPhaseAnimation, animation, phaseAnimation) => {
  return {
    animationName: phaseAnimation?.animationName ?? animation?.animationName ?? presetPhaseAnimation?.animationName ?? presetAnimation?.animationName ?? defaults.animationName,
    duration: resolveTime(
      phaseAnimation?.duration ?? animation?.duration ?? presetPhaseAnimation?.duration ?? presetAnimation?.duration ?? defaults.duration
    ),
    easing: phaseAnimation?.easing ?? animation?.easing ?? presetPhaseAnimation?.easing ?? presetAnimation?.easing ?? defaults.easing
  };
};
var resolveSizeVars = (size, prefix) => {
  if (size === void 0) {
    return {};
  }
  let width;
  let height;
  if (typeof size === "number") {
    width = size;
    height = size;
  } else if (typeof size === "object") {
    width = size.w;
    height = size.h;
  } else {
    const [w, h = w] = size.trim().split(/\s+/);
    width = w;
    height = h;
  }
  return {
    [`${prefix}-width`]: String(width),
    [`${prefix}-height`]: String(height)
  };
};
var mergeClassNames = (...classNames) => {
  return classNames.filter((className) => Boolean(className?.trim())).join(" ");
};
var toThemeVars = (style, prefix) => {
  if (!style) {
    return {};
  }
  const keyMap = [
    ["color", `${prefix}-color`],
    ["background", `${prefix}-background`],
    ["border", `${prefix}-border`],
    ["borderRadius", `${prefix}-border-radius`],
    ["boxShadow", `${prefix}-box-shadow`],
    ["fontFamily", `${prefix}-font-family`],
    ["backdropFilter", `${prefix}-backdrop-filter`],
    ["WebkitBackdropFilter", `${prefix}-webkit-backdrop-filter`]
  ];
  const vars = {};
  for (const [key, varName] of keyMap) {
    const value = style[key];
    if (value !== void 0) {
      vars[varName] = String(value);
    }
  }
  return vars;
};
var merge = ({
  preset,
  index,
  animation,
  layer,
  close,
  customStyle,
  size
}) => {
  const selectedPreset = preset ? popupPresets[preset] : void 0;
  const presetContainerStyle = selectedPreset?.customStyle?.container?.style;
  const presetHeaderStyle = selectedPreset?.customStyle?.header?.style;
  const presetBodyStyle = selectedPreset?.customStyle?.body?.style;
  const presetCloseStyle = selectedPreset?.close?.style;
  const presetCloseTimerStyle = selectedPreset?.close?.timer?.style;
  return {
    index: index ?? stylesConfig.index,
    animation: {
      open: resolveAnimation(
        stylesConfig.animation.open,
        selectedPreset?.animation,
        selectedPreset?.animation?.open,
        animation,
        animation?.open
      ),
      close: resolveAnimation(
        stylesConfig.animation.close,
        selectedPreset?.animation,
        selectedPreset?.animation?.close,
        animation,
        animation?.close
      )
    },
    layer: {
      backgroundColor: layer?.backgroundColor ?? selectedPreset?.layer?.backgroundColor ?? stylesConfig.layer.backgroundColor,
      blur: resolveBlur(
        layer?.blur ?? selectedPreset?.layer?.blur ?? stylesConfig.layer.blur
      ),
      style: layer?.style ?? {},
      className: mergeClassNames(
        stylesConfig.layer.className,
        selectedPreset?.layer?.className,
        layer?.className
      )
    },
    close: {
      icon: close?.icon,
      render: close?.render,
      timeOutShow: resolveOptionalTime(
        close?.timeOutShow ?? stylesConfig.close.timeOutShow
      ),
      style: {
        ...toThemeVars(presetCloseStyle, "--ssaprt-popup-close"),
        ...resolveSizeVars(
          selectedPreset?.close?.size,
          "--ssaprt-popup-close"
        ),
        ...resolveSizeVars(close?.size, "--ssaprt-popup-close"),
        ...close?.style
      },
      className: mergeClassNames(
        stylesConfig.close.className,
        selectedPreset?.close?.className,
        close?.className
      ),
      timer: {
        render: close?.timer?.render,
        style: {
          ...toThemeVars(
            presetCloseTimerStyle,
            "--ssaprt-popup-close-timer"
          ),
          ...close?.timer?.style
        },
        className: mergeClassNames(
          stylesConfig.close.timer.className,
          selectedPreset?.close?.timer?.className,
          close?.timer?.className
        )
      }
    },
    customStyle: {
      container: {
        style: {
          ...toThemeVars(
            presetContainerStyle,
            "--ssaprt-popup-container"
          ),
          ...resolveSizeVars(
            selectedPreset?.size,
            "--ssaprt-popup-container"
          ),
          ...resolveSizeVars(size, "--ssaprt-popup-container"),
          ...customStyle?.container?.style
        },
        className: mergeClassNames(
          stylesConfig.customStyle.container.className,
          selectedPreset?.customStyle?.container?.className,
          customStyle?.container?.className
        )
      },
      header: {
        style: {
          ...toThemeVars(presetHeaderStyle, "--ssaprt-popup-header"),
          ...customStyle?.header?.style
        },
        className: mergeClassNames(
          stylesConfig.customStyle.header.className,
          selectedPreset?.customStyle?.header?.className,
          customStyle?.header?.className
        )
      },
      body: {
        style: {
          ...toThemeVars(presetBodyStyle, "--ssaprt-popup-body"),
          ...customStyle?.body?.style
        },
        className: mergeClassNames(
          stylesConfig.customStyle.body.className,
          selectedPreset?.customStyle?.body?.className,
          customStyle?.body?.className
        )
      }
    }
  };
};

// src/components/Popup.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var parseTime = (value) => {
  if (!value) {
    return 0;
  }
  const parsedValue = Number.parseFloat(value);
  if (!Number.isFinite(parsedValue)) {
    return 0;
  }
  return value.endsWith("ms") ? parsedValue : parsedValue * 1e3;
};
var CloseTimer = (0, import_react.memo)(
  ({
    duration,
    render: TimerComponent,
    style,
    className,
    onComplete
  }) => {
    const [timerState, setTimerState] = (0, import_react.useState)({
      remainingMs: duration,
      progress: 1
    });
    const completedRef = (0, import_react.useRef)(false);
    const animationFrameRef = (0, import_react.useRef)(null);
    (0, import_react.useEffect)(() => {
      completedRef.current = false;
      if (duration <= 0) {
        onComplete();
        return;
      }
      const startedAt = performance.now();
      const updateTimer = (currentTime) => {
        const elapsed = currentTime - startedAt;
        const remainingMs = Math.max(0, duration - elapsed);
        const progress = Math.max(
          0,
          Math.min(1, remainingMs / duration)
        );
        setTimerState({
          remainingMs,
          progress
        });
        if (remainingMs <= 0) {
          if (!completedRef.current) {
            completedRef.current = true;
            onComplete();
          }
          animationFrameRef.current = null;
          return;
        }
        animationFrameRef.current = requestAnimationFrame(updateTimer);
      };
      animationFrameRef.current = requestAnimationFrame(updateTimer);
      return () => {
        if (animationFrameRef.current === null) {
          return;
        }
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      };
    }, [duration, onComplete]);
    const seconds = Math.max(0, Math.ceil(timerState.remainingMs / 1e3));
    if (TimerComponent) {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        TimerComponent,
        {
          seconds,
          remainingMs: timerState.remainingMs,
          duration,
          progress: timerState.progress,
          style,
          className
        }
      );
    }
    const strokeDashoffset = 1 - timerState.progress;
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "div",
      {
        role: "timer",
        "aria-live": "off",
        "aria-label": `${seconds} seconds before close button appears`,
        className: ["ssaprt-popup__close-timer", className].filter(Boolean).join(" "),
        style,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
            "svg",
            {
              className: "ssaprt-popup__close-timer-svg",
              viewBox: "0 0 40 40",
              "aria-hidden": "true",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  "circle",
                  {
                    className: "ssaprt-popup__close-timer-track",
                    cx: "20",
                    cy: "20",
                    r: "17"
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  "circle",
                  {
                    className: "ssaprt-popup__close-timer-progress",
                    cx: "20",
                    cy: "20",
                    r: "17",
                    pathLength: 1,
                    strokeDasharray: "1 1",
                    strokeDashoffset,
                    style: {
                      vectorEffect: "none"
                    }
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "ssaprt-popup__close-timer-value", children: seconds })
        ]
      }
    );
  }
);
CloseTimer.displayName = "CloseTimer";
var Popup = (0, import_react.forwardRef)(
  ({
    children,
    preset,
    isOpen,
    open,
    index,
    animation,
    layer,
    close,
    customStyle,
    size,
    header
  }, ref) => {
    const [body, setBody] = (0, import_react.useState)(null);
    const [phase, setPhase] = (0, import_react.useState)("hidden");
    const [closeUnlocked, setCloseUnlocked] = (0, import_react.useState)(false);
    const layerRef = (0, import_react.useRef)(null);
    const config = (0, import_react.useMemo)(
      () => merge({
        index,
        animation,
        layer,
        preset,
        close,
        customStyle,
        size
      }),
      [index, animation, layer, close, customStyle, size, preset]
    );
    const isOpening = phase === "opening";
    const isClosing = phase === "closing";
    const isAnimating = isOpening || isClosing;
    const currentAnimation = isClosing ? config.animation.close : config.animation.open;
    const closeTimerDuration = parseTime(config.close.timeOutShow);
    const hasCloseTimer = closeTimerDuration > 0;
    const showTimer = hasCloseTimer && !closeUnlocked && !isClosing;
    const showCloseButton = closeUnlocked && !isClosing;
    const handleTimerComplete = (0, import_react.useCallback)(() => {
      setCloseUnlocked(true);
    }, []);
    (0, import_react.useEffect)(() => {
      const bodyElement = document.querySelector(
        "body"
      );
      if (!bodyElement) {
        return;
      }
      setBody(bodyElement);
    }, []);
    (0, import_react.useEffect)(() => {
      if (isOpen) {
        setCloseUnlocked(!hasCloseTimer);
        setPhase((currentPhase) => {
          if (currentPhase === "hidden" || currentPhase === "closing") {
            return "opening";
          }
          return currentPhase;
        });
        return;
      }
      setPhase((currentPhase) => {
        if (currentPhase === "opening" || currentPhase === "open") {
          return "closing";
        }
        return currentPhase;
      });
    }, [isOpen, hasCloseTimer, closeTimerDuration]);
    const handleClose = () => {
      if (phase === "hidden" || phase === "closing" || !closeUnlocked) {
        return;
      }
      setPhase("closing");
    };
    const handleAnimationEnd = (event) => {
      if (event.target !== event.currentTarget) {
        return;
      }
      if (phase === "opening") {
        setPhase("open");
        return;
      }
      if (phase !== "closing") {
        return;
      }
      layerRef.current?.style.setProperty("pointer-events", "none");
      (0, import_react_dom.flushSync)(() => {
        setPhase("hidden");
        open?.(false);
      });
    };
    if (!body || phase === "hidden") {
      return null;
    }
    const CloseComponent = config.close.render;
    const TimerComponent = config.close.timer.render;
    const layerClassName = [
      "ssaprt-popup__layer",
      isOpening ? "ssaprt-popup__layer--opening" : "",
      isClosing ? "ssaprt-popup__layer--closing" : "",
      config.layer.className
    ].filter(Boolean).join(" ");
    const containerClassName = [
      "ssaprt-popup__container",
      isAnimating ? "animate" : "",
      isAnimating ? `ssaprt-popup--animate-${currentAnimation.animationName}` : "",
      config.customStyle.container.className
    ].filter(Boolean).join(" ");
    const closeClassName = [
      "ssaprt-popup__close",
      !isClosing ? "ssaprt-popup__close--visible" : "",
      showTimer ? "ssaprt-popup__close--timer" : "",
      config.close.className
    ].filter(Boolean).join(" ");
    return (0, import_react_dom.createPortal)(
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "div",
        {
          ref: layerRef,
          className: layerClassName,
          style: {
            ...config.layer.style,
            zIndex: config.index,
            "--ssaprt-popup-layer-background": config.layer.backgroundColor,
            "--ssaprt-popup-layer-blur": config.layer.blur,
            "--ssaprt-popup-layer-duration": currentAnimation.duration,
            "--ssaprt-popup-layer-easing": currentAnimation.easing
          },
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
            "div",
            {
              className: containerClassName,
              ref,
              style: {
                ...config.customStyle.container.style,
                "--animation-duration": currentAnimation.duration,
                "--animation-easing": currentAnimation.easing
              },
              onAnimationEnd: handleAnimationEnd,
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: closeClassName, style: config.close.style, children: [
                  showTimer && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                    CloseTimer,
                    {
                      duration: closeTimerDuration,
                      render: TimerComponent,
                      style: config.close.timer.style,
                      className: config.close.timer.className,
                      onComplete: handleTimerComplete
                    },
                    closeTimerDuration
                  ),
                  showCloseButton && (CloseComponent ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloseComponent, { close: handleClose }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                    "button",
                    {
                      type: "button",
                      "aria-label": "Close popup",
                      className: "ssaprt-popup__close-button",
                      onClick: handleClose,
                      children: config.close.icon ?? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                        "span",
                        {
                          className: "ssaprt-popup__close-icon",
                          "aria-hidden": "true",
                          children: "\xD7"
                        }
                      )
                    }
                  ))
                ] }),
                header && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  "div",
                  {
                    className: [
                      "ssaprt-popup__header",
                      config.customStyle.header.className
                    ].filter(Boolean).join(" "),
                    style: config.customStyle.header.style,
                    children: header.content
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  "div",
                  {
                    className: [
                      "ssaprt-popup__body",
                      config.customStyle.body.className
                    ].filter(Boolean).join(" "),
                    style: config.customStyle.body.style,
                    children
                  }
                )
              ]
            }
          )
        }
      ),
      body
    );
  }
);
Popup.displayName = "Popup";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Popup,
  popupPresets
});
//# sourceMappingURL=index.js.map